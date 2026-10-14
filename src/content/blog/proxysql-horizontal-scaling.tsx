import { CodeBlock } from "@/components/blog/article-elements";

export default function ProxySqlHorizontalScaling() {
  return (
    <>
      <p>
        There is a particular kind of database outage that confuses people the first time they see it. The primary is
        refusing connections, the application is throwing <code>Too many connections</code>, and yet the server&apos;s
        CPU is sitting at forty percent. Nothing is slow. The database simply has more clients than it is willing to
        talk to.
      </p>
      <p>
        We hit exactly this on a set of EdTech and SaaS platforms, and the fix ended up being an extra hop in the
        network rather than a change to any application. This article explains why the problem happens, why the usual
        remedies work poorly for PHP and Knex-based services, and how ProxySQL addresses it. Most of the ideas apply to
        any connection-heavy system, whether or not you end up using ProxySQL.
      </p>

      <h2>Connections are not the same thing as load</h2>
      <p>
        Start with a small calculation, because it explains everything that follows. Suppose you run twelve application
        pods on PHP-FPM, each configured with <code>pm.max_children = 40</code>. Every FPM child holds its own database
        connection while it works, so the fleet can open 480 connections. Add twenty Node.js pods whose Knex pools allow
        ten connections each, and you are at 680.
      </p>
      <p>
        Now ask a different question: how many queries are actually <em>executing</em> at any instant? Little&apos;s Law
        gives the answer directly. The average number of items in a system equals the arrival rate multiplied by the
        time each item spends inside it. If the database receives 2,000 queries per second and the average query takes 5
        milliseconds, then on average 2,000 × 0.005 = 10 queries are in flight.
      </p>
      <p>
        So the server is maintaining 680 connections in order to do the work of roughly ten. The rest are idle, but they
        are not free. MySQL by default dedicates a thread to each connection, every thread has its own stack, and
        several per-session buffers are allocated as queries need them. More importantly, <code>max_connections</code>{" "}
        is a hard ceiling. When a traffic spike causes autoscaling to add pods, connection count rises with the number
        of processes, not with the amount of work. You run out of connections long before you run out of database.
      </p>
      <p>
        That was the first of our two problems. The second was more ordinary: every read went to the primary. We had
        replicas, but almost nothing used them.
      </p>

      <h2>Why the application layer is the wrong place to fix this</h2>
      <p>
        The textbook remedy for the first problem is a connection pool, and for the second, read/write splitting in the
        data-access layer. Both are harder than they sound in a polyglot estate.
      </p>
      <p>
        PHP-FPM uses a shared-nothing process model. Each worker is a separate operating-system process, and processes
        cannot share sockets. PDO&apos;s persistent connections let a worker reuse its <em>own</em> connection across
        requests, which saves the handshake, but the count is still one connection per worker. There is no pool to speak
        of.
      </p>
      <p>
        Knex does pool connections, but each Knex instance talks to a single configured host. You can create one
        instance for writes and another for reads, but then you still need to decide which replica each read goes to,
        stop sending reads to a replica that is lagging, and notice when a replica disappears. That logic would have to
        be written, tested and kept consistent in every Node service, and separately again in every PHP service.
      </p>
      <p>
        When the same infrastructure concern has to be reimplemented in every codebase and every language, it usually
        belongs in the infrastructure.
      </p>

      <h2>What a protocol-aware proxy can do</h2>
      <p>
        ProxySQL sits between the applications and MySQL and speaks the MySQL wire protocol on both sides. To an
        application it looks exactly like a MySQL server, so no driver or ORM changes are needed. Because it parses each
        query, it can make decisions a plain TCP load balancer cannot.
      </p>
      <p>
        The first is <strong>multiplexing</strong>. ProxySQL keeps a pool of connections to each backend and lends one
        to a client only for the duration of a query, or of a transaction if one is open. Hundreds of idle client
        connections terminate at the proxy, where they are cheap, and the backend sees a number of connections much
        closer to the Little&apos;s Law figure.
      </p>
      <p>
        The second is <strong>routing</strong>. Backends are organised into hostgroups, and query rules decide which
        hostgroup serves each statement. Rules can match on the normalised form of a query (its <em>digest</em>), on the
        user, on the schema, and more.
      </p>
      <p>
        The third is <strong>health awareness</strong>. A monitor module continuously checks each backend: can it be
        reached, how far behind is replication, and is <code>read_only</code> set? Those checks feed back into routing
        without anyone touching configuration.
      </p>

      <h2>A minimal working configuration</h2>
      <p>
        ProxySQL is configured through an admin interface that itself speaks SQL. Changes are written to in-memory
        tables, promoted to the running configuration, and then persisted to disk. It is an unusual model, but a very
        safe one, because nothing takes effect until you explicitly load it.
      </p>
      <p>
        Two hostgroups are enough to start with: 10 for the writer and 20 for readers. Declaring them as a replication
        hostgroup pair tells ProxySQL to place each server according to its <code>read_only</code> flag, and this is
        what makes failover work. When a replica is promoted and <code>read_only</code> is cleared, ProxySQL moves it
        into the writer group on its own.
      </p>
      <CodeBlock language="sql" title="ProxySQL admin: servers and replication hostgroups">{`
INSERT INTO mysql_servers (hostgroup_id, hostname, port, max_connections, max_replication_lag) VALUES
  (10, 'mysql-primary',   3306, 300, 0),
  (20, 'mysql-replica-1', 3306, 300, 5),
  (20, 'mysql-replica-2', 3306, 300, 5);

INSERT INTO mysql_replication_hostgroups (writer_hostgroup, reader_hostgroup, comment)
VALUES (10, 20, 'main cluster');

LOAD MYSQL SERVERS TO RUNTIME;
SAVE MYSQL SERVERS TO DISK;
`}</CodeBlock>
      <p>
        The <code>max_replication_lag</code> value of five seconds means a replica that falls further behind than that
        is temporarily shunned and receives no reads until it catches up.
      </p>
      <p>
        Routing comes next. I strongly prefer a design in which the <em>default</em> is the primary and reads are moved
        away from it by explicit rules. If a rule is missing or wrong, the cost is a busier primary rather than a user
        seeing stale data.
      </p>
      <CodeBlock language="sql" title="ProxySQL admin: users and query rules">{`
INSERT INTO mysql_users (username, password, default_hostgroup, transaction_persistent)
VALUES ('app', '<secret>', 10, 1);

INSERT INTO mysql_query_rules (rule_id, active, match_digest, destination_hostgroup, apply) VALUES
  (1, 1, '^SELECT .* FOR UPDATE', 10, 1),
  (2, 1, '^SELECT',               20, 1);

LOAD MYSQL USERS TO RUNTIME;       SAVE MYSQL USERS TO DISK;
LOAD MYSQL QUERY RULES TO RUNTIME; SAVE MYSQL QUERY RULES TO DISK;
`}</CodeBlock>
      <p>
        Rules are evaluated in order of <code>rule_id</code>. Locking reads match the first rule and stay on the
        primary; every other <code>SELECT</code> goes to the replicas. The <code>transaction_persistent</code> flag on
        the user ensures that once a transaction begins, every statement in it goes to the same backend, so a
        transaction is never split across machines.
      </p>

      <h2>The consistency question you cannot skip</h2>
      <p>
        MySQL replication is asynchronous. Splitting reads from writes therefore changes the semantics of your
        application in one important way: a client can write a row and, a few milliseconds later, fail to read it back.
      </p>
      <p>
        The classic case is a form submission followed by a redirect. The <code>INSERT</code> goes to the primary, the
        browser follows the redirect, and the page that displays the new record reads from a replica that has not yet
        applied the change. The user sees their data vanish, refreshes, and it reappears.
      </p>
      <p>
        There is no universal fix, only a choice of where to pay. You can keep the read inside the same transaction as
        the write. You can add a query rule that sends a specific digest to the primary. Or you can give
        consistency-sensitive code paths a separate database user whose default hostgroup is the writer and that has no
        read rules. In practice we used a mixture. Whatever you choose, list these flows explicitly before turning
        splitting on, rather than discovering them from support tickets.
      </p>

      <h2>When multiplexing quietly switches itself off</h2>
      <p>
        Multiplexing is only safe if the backend connection carries no state that belongs to one particular client.
        ProxySQL is careful about this. When a session does something that creates state on the server, ProxySQL pins
        that client to its backend connection, and the benefit disappears for that session.
      </p>
      <p>
        The common culprits are session variables that ProxySQL does not track, temporary tables, named locks taken with{" "}
        <code>GET_LOCK()</code>, and transactions that application code leaves open for too long. None of these is an
        error, so nothing alerts you. A single <code>SET</code> statement in a shared bootstrap library can undo most of
        the gains across an entire fleet.
      </p>
      <p>
        The answer is to measure. ProxySQL exposes its internals as tables: <code>stats_mysql_connection_pool</code>{" "}
        shows how many backend connections are in use per server, and <code>stats_mysql_query_digest</code> shows which
        query shapes dominate and where they were routed. Reading those two tables for a day under real traffic is the
        most reliable way to find the code paths that are defeating the proxy.
      </p>

      <h2>Don&apos;t replace one bottleneck with another</h2>
      <p>
        Putting a proxy in the data path makes the proxy part of your availability story. Run more than one instance,
        keep their configuration identical (ProxySQL Cluster can synchronise it), and put them behind a stable service
        address so instances can be replaced without the applications noticing. Give the monitor module its own
        low-privilege MySQL user, and tune its check intervals deliberately: slow checks delay failover, while
        aggressive ones add noise to every backend.
      </p>

      <h2>What changed</h2>
      <p>
        The effect on connection count was the most visible. Backend connections fell by roughly 90%, which is what the
        arithmetic above predicts once idle client connections stop reaching MySQL. The <code>max_connections</code>{" "}
        incidents during traffic spikes stopped.
      </p>
      <p>
        Read capacity became a provisioning decision. Adding a replica means starting the server and inserting one row
        into <code>mysql_servers</code>; no application is redeployed. And because ProxySQL continuously watches
        replication lag and <code>read_only</code>, unhealthy replicas leave rotation and a promoted primary is picked
        up without anyone editing configuration under pressure.
      </p>
      <p>
        The broader lesson is about where a problem lives. Connection exhaustion looked like a database problem, and it
        is often treated as one, with bigger instances and higher limits. It was really a mismatch between how many
        processes we ran and how much work they did, and the cheapest place to resolve that mismatch was in between.
      </p>

      <h2>Further reading</h2>
      <ul>
        <li>ProxySQL documentation, particularly the sections on query rules, multiplexing and the monitor module.</li>
        <li>MySQL Reference Manual, &quot;How MySQL Uses Memory&quot;, for what each connection costs the server.</li>
        <li>
          John D. C. Little, &quot;A Proof for the Queuing Formula: L = λW&quot;, <em>Operations Research</em>, 1961.
        </li>
      </ul>
    </>
  );
}
