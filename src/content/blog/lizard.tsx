import { CodeBlock } from "@/components/blog/article-elements";

export default function Lizard() {
  return (
    <>
      <p>
        Microservices split data on purpose. Each service owns its own database, nobody else touches it, and that
        independence is a big part of why the architecture works. But the split has a cost that rarely shows up on
        architecture diagrams. It arrives as an ordinary business question:{" "}
        <em>which customers placed the most orders last month?</em>
      </p>
      <p>
        Customers live in one service&apos;s database and orders in another&apos;s. Neither database can answer the
        question alone. So someone exports two spreadsheets and matches them up by hand, or the question waits for a
        data pipeline that copies everything into a warehouse. Both work. Both are a lot of effort for a question that
        takes one sentence to ask.
      </p>
      <p>
        Lizard is the project I&apos;m building to make that kind of question easy. It&apos;s a console you point at all
        of your databases (Postgres, MySQL and MongoDB, in any mix) and then use as if they were one. This article walks
        through what it does, and the design decisions behind it, especially the one I care about most: how to let AI
        write queries against real databases safely.
      </p>

      <h2>What using it looks like</h2>
      <p>
        You add your databases by pasting in their connection details. From then on, everything works across all of them
        at once.
      </p>
      <ol>
        <li>
          <strong>Browse and edit.</strong> Every table in every database appears in one sidebar, ready to search,
          filter, sort and edit, with nothing to set up first.
        </li>
        <li>
          <strong>Ask in plain English.</strong> Type &quot;top 10 customers by orders last month&quot; and get a table
          of results, along with the exact query that produced them.
        </li>
        <li>
          <strong>Chart it.</strong> Turn any result into a chart with one click, or describe the chart you want in
          words.
        </li>
        <li>
          <strong>Keep it.</strong> Save charts to dashboards. A single chart can combine data from several databases.
        </li>
      </ol>
      <p>The rest of this article explains how each of those works, and why it was built that way.</p>

      <h2>Your database already knows what the screens should look like</h2>
      <p>
        Most teams eventually build an admin panel for their data, one screen at a time. But the database already holds
        most of what those screens need. It knows which fields are dates, which are yes/no values, and which can&apos;t
        be left empty. It knows that <code>orders.customer_id</code> points to a row in <code>customers</code>.
      </p>
      <p>
        Lizard reads that structure and builds the interface from it. A date column gets a date picker. A yes/no column
        gets a toggle. A column that points at another table becomes a searchable dropdown showing the customer&apos;s
        name, not the number 4,817. That&apos;s why connecting a database gives you a usable console straight away, with
        no configuration.
      </p>
      <p>
        The guesses aren&apos;t always right. Should a user be shown by name or by email? So you can rename fields, hide
        them, or change how they&apos;re edited. These tweaks are optional and only refine what Lizard already built.
      </p>
      <p>
        Separate services&apos; databases have one gap: they don&apos;t know about each other. The orders database has a{" "}
        <code>customer_id</code> column, but nothing in it says that the customer lives in a different database. In
        Lizard you can declare that link once, as a <em>virtual relationship</em>. From then on, the order screen shows
        the actual customer, and you can click through to them.
      </p>

      <h2>Joining data across databases</h2>
      <p>
        A normal database can&apos;t join its tables with tables in a different database, and certainly not with a
        database of a different kind, such as Postgres with MySQL. That&apos;s the core of the microservices problem.
      </p>
      <p>
        In Lizard you simply select the databases you want and write a query across them. Each database is referred to
        by the name you gave its connection, so tables from different services join as easily as tables in one database.
      </p>
      <CodeBlock language="sql" title="Top customers by orders, across two services">{`
SELECT c.name, count(*) AS orders
FROM orders_service.public.orders o
JOIN users_service.public.customers c ON c.id = o.customer_id
WHERE o.created_at >= date_trunc('month', current_date) - INTERVAL 1 MONTH
  AND o.created_at <  date_trunc('month', current_date)
GROUP BY c.name
ORDER BY orders DESC
LIMIT 10;
`}</CodeBlock>
      <p>
        Behind the scenes, Lizard runs the query with DuckDB, a small analytical database engine that runs inside Lizard
        itself. DuckDB connects to each selected database with read-only access, fetches only the rows it needs, and
        does the join. Your databases don&apos;t need anything installed or changed. MongoDB works the same way, so a
        collection of documents can be joined with an ordinary table in a single query.
      </p>
      <p>
        I chose this approach over the established alternatives because of what they ask of you. Postgres&apos;s
        built-in option for querying other databases (<code>postgres_fdw</code>) needs setup inside your database, and a
        distributed query engine such as Trino is a whole extra cluster to run.
      </p>
      <p>
        Cross-database queries are read-only. Editing always happens in exactly one database: the one that owns the row.
      </p>

      <h2>Asking questions in plain English</h2>
      <p>
        When you ask a question, you can watch Lizard work it out. It shows which tables it&apos;s looking at, then the
        query it settles on, then the results. You can edit that query and run it again yourself. If it&apos;s heading
        the wrong way, the Stop button cancels everything immediately, including the query running on the database.
      </p>
      <p>
        Under the surface, the AI doesn&apos;t receive your entire database structure up front. Across dozens of
        databases that would be far too much text, and most of it would be irrelevant to any one question, which tends
        to make AI less accurate rather than more. Instead it gets a list of table names and looks up details only as it
        needs them. It can search for tables and columns that match your wording, so a question about
        &quot;subscribers&quot; can still find a table called <code>accounts</code>. It can read one table&apos;s
        details, and it can ask which tables are linked to which.
      </p>
      <p>Two habits make the answers more trustworthy:</p>
      <ul>
        <li>
          <strong>It only joins tables that are actually linked,</strong> either by the database itself or by a virtual
          relationship you declared. It won&apos;t guess that two columns match just because their names look similar. A
          confident wrong answer is worse than no answer.
        </li>
        <li>
          <strong>It tests its query before showing you anything.</strong> Lizard runs the query once, fetching a single
          row. If the database reports an error, such as a misspelled column, the AI sees the database&apos;s own error
          message and gets a couple of attempts to fix it.
        </li>
      </ul>

      <h2>Why it&apos;s safe to let AI write the queries</h2>
      <p>
        This is the part of the design I&apos;d most like readers to take away. Letting AI run queries on a live
        database sounds risky, and it would be if Lizard simply trusted whatever the AI wrote. AI can make mistakes. It
        can also be misled by text it reads, including text stored in your own data.
      </p>
      <p>
        The obvious defence is to check each query and block anything dangerous. I don&apos;t rely on that, because a
        blocklist only catches what its author thought of. SQL is a big language, and an attacker, or an unlucky AI,
        only needs to find one thing that was missed.
      </p>
      <p>
        So Lizard lets the database enforce the rules, because databases are very good at that. When you add a database,
        you give Lizard two logins: one that can only read, and one that can also edit. AI-written queries only ever run
        with the read-only login. The editing login is used only by Lizard&apos;s own edit forms, never by the AI. If
        the AI&apos;s query tries to change something, the database refuses.
      </p>
      <CodeBlock language="sql" title="Creating the read-only login (Postgres)">{`
CREATE ROLE lizard_read LOGIN PASSWORD '...';
GRANT USAGE ON SCHEMA public TO lizard_read;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO lizard_read;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO lizard_read;
`}</CodeBlock>
      <p>A few more safety nets sit on top of that:</p>
      <ul>
        <li>Every AI query runs in read-only mode, so even a misconfigured login can&apos;t be used to write.</li>
        <li>Queries have a time limit, so a runaway query is stopped by the database itself.</li>
        <li>Results are capped at a fixed number of rows, however the query is written.</li>
        <li>
          Cross-database queries open each database read-only, and the query can&apos;t change those settings or reach
          anything else.
        </li>
      </ul>
      <p>
        None of these depends on the AI behaving well. The instructions tell the AI what it <em>should</em> do. The
        database decides what it <em>can</em> do. And because every query is shown to you, can be edited, and is
        recorded in an audit log, nothing happens out of sight.
      </p>

      <h2>Lizard leaves your databases untouched</h2>
      <p>
        One rule shaped more decisions than any other: Lizard never changes the structure of a database it connects to,
        and never stores anything in one. Your connections, settings, virtual relationships, dashboards and audit log
        all live in Lizard&apos;s own small database, kept separately.
      </p>
      <p>
        That rule has a price. Live-updating tables would have been nice, and Postgres can notify listeners when data
        changes, but only if a trigger is added to each table. That would mean changing your database, so Lizard offers
        an optional auto-refresh timer instead. It&apos;s simpler and less clever, but it keeps Lizard what it should
        be: a guest in your systems.
      </p>

      <h2>Being honest about what each protection covers</h2>
      <p>
        Lizard has to store your database passwords so it can reconnect, and it encrypts them. That protects you if the
        file holding them leaks, through a backup or a copied disk. It doesn&apos;t protect against someone who has
        taken over the server Lizard runs on. I think it&apos;s important to say that plainly rather than imply more.
      </p>
      <p>
        The audit log needs similar care. It records every query, and queries often contain real data, such as an email
        address someone searched for. So the log is itself sensitive. That&apos;s why ordinary query history is kept
        only briefly, while the record of who changed what is kept much longer.
      </p>

      <h2>What Lizard isn&apos;t</h2>
      <p>
        Lizard isn&apos;t a data warehouse: nothing is copied out of your databases. It isn&apos;t an app builder: the
        screens are generated, not designed. And it isn&apos;t a database administration tool: there&apos;s no index
        management or tuning. Those are all useful tools. Keeping them out is what keeps Lizard simple.
      </p>

      <h2>Where it stands</h2>
      <p>
        Lizard is in active development. Browsing and editing across Postgres, MySQL and MongoDB works, as do virtual
        relationships, plain-English questions, charts and dashboards that span databases, user roles and the audit log.
        The current work is about depth: better editors for more kinds of data, saved views, and import and export.
      </p>
      <p>
        If one idea runs through all of it, it&apos;s that convenience and safety come from the same place. Lizard is
        easy to start with because your database already describes itself. It&apos;s safe to put AI in front of it
        because your database already knows how to say no.
      </p>

      <h2>Further reading</h2>
      <ul>
        <li>DuckDB documentation on its PostgreSQL and MySQL extensions.</li>
        <li>PostgreSQL documentation, &quot;Privileges&quot; and &quot;SET TRANSACTION&quot;.</li>
        <li>OWASP, &quot;Top 10 for Large Language Model Applications&quot;, especially prompt injection.</li>
      </ul>
    </>
  );
}
