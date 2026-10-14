import { CodeBlock } from "@/components/blog/article-elements";

export default function Microservices() {
  return (
    <>
      <p>
        Monoliths rarely fail because of their code. They fail because of their calendar. As more teams work in one
        deployable unit, every release becomes a negotiation: whose changes are ready, who has to rerun which tests, who
        is on call if it goes wrong. The system still works, but shipping a change now costs more in coordination than
        in engineering.
      </p>
      <p>
        That was the state of the platform we set out to break up. This article is about how to do that without betting
        the company on a rewrite. The approach is old and well documented, but the details that decide whether it
        succeeds are mostly about data and failure, not about services.
      </p>

      <h2>Why not just rewrite it?</h2>
      <p>
        The tempting plan is to build the new system alongside the old one and switch over when it is ready. It almost
        never goes well, for reasons that have been understood for decades. The old system encodes years of decisions,
        edge cases and bug fixes that nobody wrote down. The new one has to rediscover them while the old one keeps
        changing underneath it. Meanwhile the business receives no value until the switch, and the switch itself is a
        single high-risk event. Joel Spolsky called rewriting from scratch &quot;the single worst strategic mistake that
        any software company can make&quot;, and the failure modes he described in 2000 are still the ones people hit
        today.
      </p>

      <h2>The strangler fig</h2>
      <p>
        Martin Fowler named the alternative after a vine that germinates in the branches of a host tree, grows roots
        down to the ground and, over many years, replaces the tree it started on. In software, the pattern has three
        moves. Put a routing layer in front of the existing system. Build a new component for one capability and send
        that capability&apos;s traffic to it. Repeat until the old system does nothing worth keeping.
      </p>
      <p>
        Its great virtue is that the system is working, in production, at every step. Each extraction can be released on
        its own, measured on its own, and, if something goes wrong, reversed by changing a route.
      </p>
      <p>
        On Kubernetes the ingress layer is the natural place for that routing. Everything goes to the monolith by
        default, and paths are peeled off as their new homes become ready.
      </p>
      <CodeBlock language="yaml" title="ingress.yaml">{`
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: platform
spec:
  ingressClassName: nginx
  rules:
    - host: api.example.com
      http:
        paths:
          # Capabilities that have been extracted go to their own services...
          - path: /notifications
            pathType: Prefix
            backend:
              service: { name: notifications, port: { number: 80 } }
          # ...and everything else still goes to the monolith.
          - path: /
            pathType: Prefix
            backend:
              service: { name: monolith, port: { number: 80 } }
`}</CodeBlock>

      <h2>Where to cut</h2>
      <p>
        The hardest decision is the first one: which capability moves first? The right answer is usually something with
        few inbound dependencies, a clear owner, and a concrete reason to be separate. That reason might be a different
        scaling profile, a different release cadence, or a history of incidents that take everything else down with
        them. Notification delivery, search and file processing are common first candidates because they sit at the edge
        of the domain rather than its centre.
      </p>
      <p>
        It is equally important to choose something <em>modest</em>. The first extraction is mostly about building the
        path that every later one will follow: the pipeline, the deployment template, the monitoring, the on-call rota.
        Learning all of that on the most central part of the domain is a poor bargain.
      </p>
      <p>
        Beyond the first few, Domain-Driven Design gives a useful vocabulary. A <em>bounded context</em> is a part of
        the system within which a term like &quot;enrolment&quot; or &quot;payment&quot; has one precise meaning. Those
        boundaries are usually better service boundaries than technical layers or database tables.
      </p>

      <h2>The data problem</h2>
      <p>
        Here is the point where most migrations quietly fail. A team extracts the code for a capability into a new
        service, deploys it separately, and leaves it reading and writing the monolith&apos;s tables. On a diagram there
        are now two systems. In reality there is still one, coupled through the schema: a column rename in either
        codebase can break the other, and neither can change its storage without coordinating. This is what people mean
        by a <em>distributed monolith</em>: all the operational cost of microservices with none of the independence.
      </p>
      <p>
        The rule that prevents it is simple to state and hard to follow: each service owns its data, and nothing else
        touches that data directly. Other components that need it either ask the owner through an API, when they need a
        current answer, or subscribe to events the owner publishes and keep their own copy, when slightly stale data is
        acceptable.
      </p>
      <p>
        During an extraction, the data has to move too, and it can&apos;t move in one step. The workable sequence is to
        create the new store, keep it synchronised with the old tables while both are in use, move reads to the new
        service, then move writes, and only then retire the old path. Eric Evans&apos; <em>anti-corruption layer</em>, a
        thin translation layer between the old model and the new, keeps the monolith&apos;s accumulated quirks from
        leaking into the new service&apos;s design. It also gives you a single, obvious thing to delete when the move is
        finished.
      </p>

      <h2>Failure becomes arithmetic</h2>
      <p>A monolith fails as a whole. A distributed system fails in parts, and the parts multiply.</p>
      <p>
        Suppose a request has to call five services synchronously, and each is available 99.9% of the time. The request
        succeeds only if all five do: 0.999<sup>5</sup> ≈ 0.995. Five individually excellent services have produced a
        99.5% request, roughly five times the downtime of any one of them. This is the strongest argument against long
        synchronous call chains, and the best argument for asynchronous events wherever immediate consistency is not
        genuinely required.
      </p>
      <p>
        Retries need the same care. If each of three layers retries a failing call three times, a single failure at the
        bottom can turn into 4 × 4 × 4 = 64 attempts. That is exactly the load a struggling service doesn&apos;t need.
        Retry at one layer, with exponential backoff and jitter, and only for idempotent operations. Put a timeout on
        every network call, because a call without one can hang a thread forever. Use circuit breakers so that a failing
        dependency degrades a feature quickly instead of exhausting the caller&apos;s resources.
      </p>

      <h2>A platform, not a collection of services</h2>
      <p>
        Every new service brings operational work: building, deploying, monitoring, scaling, securing. Unless that work
        is standardised, each service reinvents it slightly differently, and the organisation pays for that difference
        forever.
      </p>
      <p>
        Our answer was a thin but firm platform contract. Every service is a Docker image, deployed to Kubernetes
        through a shared Helm chart that supplies health probes, resource requests and limits, and autoscaling. Each
        service has its own Jenkins pipeline, so it can be built, tested and released independently. Within that
        contract, teams chose the language that suited the workload: Go for high-throughput services, Node.js for
        I/O-heavy integration work, Laravel where a rich framework made business logic quicker to write. The contract,
        not the language, is what keeps a polyglot estate operable.
      </p>

      <h2>The organisation is part of the architecture</h2>
      <p>
        Melvin Conway observed in 1968 that organisations design systems that mirror their own communication structure.
        The observation cuts both ways. If several teams share a service, its boundaries will blur to match their
        negotiations. If one team owns a service end to end (code, deployments, data, on-call), the service tends to
        stay coherent, and the team can release on its own schedule. That ownership, more than any technology, is what
        turns a migration into a faster organisation.
      </p>

      <h2>What changed</h2>
      <p>
        Failures became local. A crash or a memory leak in one service now stays in that service, contained by
        Kubernetes restarts and by timeouts and circuit breakers in its callers, rather than taking the whole platform
        down. Teams own their services from code to production. And each service, with its own database, can be scaled
        according to its own load instead of scaling the entire application to satisfy its busiest part.
      </p>
      <p>
        If I had to compress the experience into one piece of advice, it would be to start coarser than feels natural. A
        service that turns out to be too large can be split later with the same techniques. Two services that turn out
        to share a single concept are much harder to put back together. Distributed tracing also belongs in the plan
        from the beginning, because debugging across services without it is miserable; I described our approach in{" "}
        <a href="/blog/observability/">Cutting MTTR from Hours to Minutes</a>.
      </p>

      <h2>Further reading</h2>
      <ul>
        <li>Martin Fowler, &quot;Strangler Fig Application&quot;, martinfowler.com.</li>
        <li>
          Sam Newman, <em>Monolith to Microservices</em>, O&apos;Reilly, 2019.
        </li>
        <li>
          Eric Evans, <em>Domain-Driven Design</em>, Addison-Wesley, 2003.
        </li>
        <li>
          Melvin E. Conway, &quot;How Do Committees Invent?&quot;, <em>Datamation</em>, 1968.
        </li>
        <li>Joel Spolsky, &quot;Things You Should Never Do, Part I&quot;, Joel on Software, 2000.</li>
      </ul>
    </>
  );
}
