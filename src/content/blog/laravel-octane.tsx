import { CodeBlock } from "@/components/blog/article-elements";

export default function LaravelOctane() {
  return (
    <>
      <p>
        When a web application is slow, the instinct is to look at the code that handles the request: the controller,
        the queries, the templates. That instinct is usually right. But on a mature Laravel application running under
        PHP-FPM, a surprising amount of every request is spent before your code runs at all, rebuilding an application
        that was already built, in identical form, for the previous request.
      </p>
      <p>
        On our EdTech platforms, average response time had drifted to around 800 milliseconds, and the only lever we
        seemed to have was adding servers. Moving to Laravel Octane on Swoole, together with a round of database work,
        brought the average down to 40–60 milliseconds. This article explains the execution model that made the old
        numbers inevitable, what Octane changes about it, and the class of bugs you have to remove before the change is
        safe.
      </p>

      <h2>The cost of starting from nothing</h2>
      <p>
        PHP-FPM is built on a <em>shared-nothing</em> model. A pool of worker processes waits for requests; each request
        is handled by one worker, and when it finishes, everything the request created is thrown away. Nothing leaks
        from one request to the next because nothing survives.
      </p>
      <p>
        For a framework, that means booting from scratch every time. Laravel loads the autoloader, reads configuration,
        constructs the service container, registers and boots every service provider, loads routes, builds the
        middleware stack and opens connections to MySQL and Redis. Only then does it dispatch to your controller.
      </p>
      <p>
        OPcache helps, but it is worth being precise about what it caches. OPcache stores <em>compiled bytecode</em>, so
        PHP doesn&apos;t re-parse files. It does not store the objects your code creates when it runs. The container,
        the providers and the router are still constructed anew on every request. Laravel&apos;s{" "}
        <code>config:cache</code> and <code>route:cache</code> reduce the work of finding that information, but not the
        work of building the application from it.
      </p>
      <p>
        In a small application this is a few milliseconds and nobody cares. In an application with dozens of providers
        and packages, it becomes a fixed tax paid by every request, including the trivial ones. And because it is fixed,
        no amount of optimising a particular endpoint makes it go away.
      </p>

      <h2>Booting once</h2>
      <p>
        Octane inverts the model. Each worker boots the application <em>once</em> and keeps it in memory. When a request
        arrives, Octane hands it to the already-initialised application, along with a fresh copy of the request-scoped
        state, and resets that state afterwards. Swoole supplies the long-running server and the worker processes.
        Octane also supports RoadRunner and FrankenPHP; Swoole additionally offers concurrent tasks, timers and shared
        in-memory tables, which is why many teams choose it.
      </p>
      <p>
        Two things disappear from the request path at once: the bootstrap, and the connection handshakes, because
        database and Redis connections now live as long as the worker does.
      </p>
      <p>
        It is worth separating the two quantities people care about here. <em>Latency</em> is how long one request
        takes. <em>Throughput</em> is how many requests a server completes per second. A synchronous worker that takes
        800 ms per request can complete at most 1.25 requests per second; one that takes 50 ms can complete 20. Real
        systems never see the full ratio, because other limits (CPU, the database, the network) start to bind. But this
        is why a latency improvement of this kind tends to show up on the infrastructure bill as well.
      </p>

      <h2>The price: your process now has a memory</h2>
      <p>
        The shared-nothing model was doing a job you probably never thought about. It was cleaning up after you. Once
        the application outlives the request, anything that holds on to request-specific data becomes a bug, and the
        bugs are of the worst kind: intermittent, dependent on which worker served which user, and invisible in local
        development where you are the only user.
      </p>
      <p>The most common form is a singleton that captures the request when it is first resolved.</p>
      <CodeBlock language="php" title="AppServiceProvider.php">{`
// Under FPM this is harmless: the process dies after one request.
// Under Octane, every later request on this worker sees the first tenant.
$this->app->singleton(TenantResolver::class, function ($app) {
    return new TenantResolver($app['request']);
});

// A scoped binding is flushed by Octane at the end of every request.
$this->app->scoped(TenantResolver::class, function ($app) {
    return new TenantResolver($app['request']);
});
`}</CodeBlock>
      <p>
        The same reasoning applies to static properties used as caches, arrays that are appended to on each request and
        never cleared, and objects that copy the current user or configuration into a constructor. Third-party packages
        deserve the same scrutiny as your own code, because many were written assuming a fresh process. Octane&apos;s
        configuration lets you register listeners that reset a package&apos;s state between requests, and its{" "}
        <code>flush</code> list lets you discard specific bindings.
      </p>
      <p>
        I would not attempt this migration without first auditing the code for these patterns. The audit is tedious and
        is most of the work. It is also the reason the migration is safe.
      </p>

      <h2>Configuring the server</h2>
      <CodeBlock language="bash" title="terminal">{`
composer require laravel/octane
php artisan octane:install --server=swoole

php artisan octane:start --workers=8 --task-workers=4 --max-requests=500
`}</CodeBlock>
      <p>
        One worker per CPU core is a sensible starting point, refined by load testing. You will need far fewer workers
        than you had FPM children, because each one is busy for a much shorter time per request.
      </p>
      <p>
        The <code>--max-requests</code> flag deserves a word. It recycles a worker after a fixed number of requests. It
        is not a substitute for fixing leaks, but it bounds the damage of a slow leak in code you don&apos;t control,
        and it costs almost nothing. Pair it with container memory limits and readiness probes so a misbehaving worker
        is replaced rather than left to degrade.
      </p>

      <h2>Then the database becomes visible</h2>
      <p>
        Remove a large fixed cost and the variable costs come into focus. For most web applications, the largest
        remaining one is the database, and the commonest pattern there is the N+1 query.
      </p>
      <p>
        A page that lists fifty courses and shows each course&apos;s instructor will, written naively, run one query for
        the list and then one query per course for its instructor: 51 round trips. Eager loading with{" "}
        <code>Course::with(&apos;instructor&apos;)</code> turns that into two queries regardless of the list&apos;s
        length. Under FPM, the bootstrap cost often hid this; after Octane, it dominates the profile.
      </p>
      <p>
        Alongside eager loading, the useful work was unglamorous: composite indexes matching the filters and sort orders
        of the most frequent queries, and caching rarely-changing reads such as course metadata in Redis.
      </p>
      <p>
        One interaction is worth planning for. Persistent per-worker connections are much cheaper than connecting per
        request, but the connection count now scales with workers across the fleet. A pooling proxy in front of MySQL
        handles that well; I wrote about the approach in{" "}
        <a href="/blog/proxysql-horizontal-scaling/">Scaling MySQL Reads Horizontally with ProxySQL</a>.
      </p>

      <h2>Rolling it out</h2>
      <p>
        Two habits make this kind of migration uneventful. First, load-test both stacks with realistic traffic and
        compare percentiles rather than averages, because an average can improve while the slowest one percent of
        requests gets worse. Run the tests long enough to see worker memory over time, since that is where leaks show
        themselves. Second, introduce the new servers behind the same load balancer as the old ones and move traffic
        across gradually. A state leak you missed will then affect a small slice of users and can be reversed in
        seconds.
      </p>

      <h2>What changed</h2>
      <p>
        Average response time fell from about 800 ms to 40–60 ms, roughly 85% faster. Each server handled about five
        times as many concurrent requests, so the same traffic needed fewer servers, and infrastructure costs fell by
        30–40%.
      </p>
      <p>
        It would be misleading to credit all of that to Octane alone. Octane removed the fixed cost of each request; the
        database work removed much of the variable cost. Each made the other more visible and more valuable.
      </p>
      <p>
        If you are considering the same move, the question to ask is where your time actually goes. If your requests are
        dominated by slow queries or calls to external services, fix those first, because a resident application cannot
        make a two-second query faster. If profiling shows a large, constant overhead before your code runs, a
        long-running server is one of the most effective changes available to a PHP team.
      </p>

      <h2>Further reading</h2>
      <ul>
        <li>Laravel documentation, &quot;Octane&quot;, especially the section on dependency injection and Octane.</li>
        <li>
          PHP Manual, &quot;OPcache&quot; and &quot;Preloading&quot;, for what bytecode caching does and does not do.
        </li>
        <li>Swoole documentation on its process model, coroutines and server options.</li>
      </ul>
    </>
  );
}
