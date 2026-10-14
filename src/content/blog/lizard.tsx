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
        Lizard is the project I&apos;m building to make that kind of work easy. It&apos;s a console you point at all of
        your databases (Postgres, MySQL and MongoDB, in any mix) and then use as if they were one. This article walks
        through what it does and the thinking behind it, including the part I care about most: how to let AI work with
        real databases safely.
      </p>

      <h2>What using it looks like</h2>
      <p>
        You add your databases by pasting in their connection details. From then on, everything works across all of them
        at once.
      </p>
      <ul>
        <li>
          <strong>Browse and edit</strong> every table in every database, with screens built automatically from the
          database itself.
        </li>
        <li>
          <strong>Open any record</strong> and see everything connected to it, even when the connected data lives in
          another database.
        </li>
        <li>
          <strong>Link databases together</strong> by declaring relationships they don&apos;t know about, or let the AI
          doctor find them for you.
        </li>
        <li>
          <strong>Ask questions in plain English,</strong> or write SQL yourself and let AI fix it when it breaks.
        </li>
        <li>
          <strong>Describe a dashboard in a sentence</strong> and get a working, Grafana-style dashboard back.
        </li>
      </ul>

      <h2>Screens built from your database</h2>
      <p>
        Most teams eventually build an admin panel for their data, one screen at a time. But the database already holds
        most of what those screens need. It knows which fields are dates, which are yes/no values, and which can&apos;t
        be left empty. It knows that <code>orders.customer_id</code> points to a row in <code>customers</code>.
      </p>
      <p>
        Lizard reads that structure and builds the interface from it. A date column gets a date picker. A yes/no column
        gets a toggle. A column that points at another table becomes a searchable picker showing the customer&apos;s
        name, not the number 4,817. Hover over a reference and a preview of that record pops up. Connecting a database
        gives you a usable console straight away, with no configuration.
      </p>
      <p>
        A table doesn&apos;t have to be a grid, either. Lizard offers other views when your data suits them: a kanban
        board for a status column (drag a card to change its status), a gallery for tables with images, a calendar for
        anything with dates, and a tree for tables where rows have parents. You can save a view with its filters and
        sorting, and come back to it later.
      </p>
      <p>
        The automatic guesses aren&apos;t always right. Should a user be shown by name or by email? So you can rename
        fields, hide them, or change how they&apos;re edited. These tweaks are optional and only refine what Lizard
        already built.
      </p>

      <h2>A record, and everything around it</h2>
      <p>
        Open a single record and Lizard shows you its whole neighbourhood on one page. For an order, that means the
        customer who placed it and the product it was for. It also means everything that points back at the order: its
        payments, its shipments, its support tickets.
      </p>
      <p>
        Each related record appears as its own card, which you can open, edit or follow further. Lists of related rows
        can be filtered right there. Many-to-many links, like products and the categories they belong to, are recognised
        automatically, and you can add or remove links from either side.
      </p>
      <p>
        This works across databases too. If the order lives in the orders service and the customer in the users service,
        the customer card still appears on the order&apos;s page. That depends on the next feature.
      </p>

      <h2>Teaching your databases about each other</h2>
      <p>
        Separate services&apos; databases don&apos;t know about each other. The orders database has a{" "}
        <code>customer_id</code> column, but nothing in it says that the customer lives in a different database. Even
        within one database, plenty of real links were never declared, because the team never added the constraint.
      </p>
      <p>
        In Lizard you can declare those links yourself, as <em>virtual relationships</em>. A virtual relationship is
        stored in Lizard, not in your database, and once it exists, Lizard treats it like a real one. References show
        names instead of numbers, record pages show related cards, and the AI can use it to join tables. Virtual
        relationships can span multiple columns. They can also be written as patterns, so one declaration covers every
        tenant schema in a multi-tenant database.
      </p>
      <h3>The AI doctor</h3>
      <p>
        Declaring relationships by hand across hundreds of tables is tedious, so Lizard has a doctor. Run it on a
        database and it reviews the whole structure, then comes back with suggestions:
      </p>
      <ul>
        <li>
          Friendly names for tables (&quot;Customer Invoices&quot; instead of <code>cust_inv</code>), a short note on
          what each one holds, and tags like <em>billing</em> or <em>auth</em> to group them.
        </li>
        <li>Relationships the database implies but never declared, each with a sentence explaining the evidence.</li>
      </ul>
      <p>
        The important part is what happens before you see a relationship. A column called <code>account_id</code>{" "}
        looking like a link isn&apos;t proof that it is one. So the doctor takes a sample of real rows and checks how
        many of those values actually exist in the table it supposedly points to. Suggestions that don&apos;t hold up
        against the data are dropped. You then review what&apos;s left and apply the ones you agree with. Nothing
        changes until you do.
      </p>

      <h2>Joining across databases</h2>
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
        Cross-database queries are read-only. Editing always happens in exactly one database: the one that owns the row.
      </p>

      <h2>Asking questions in plain English</h2>
      <p>
        When you ask a question, you can watch Lizard work it out. It shows which tables it&apos;s looking at, then the
        query it settles on, then the results. You can edit that query and run it again yourself. If it&apos;s heading
        the wrong way, the Stop button cancels everything immediately, including the query running on the database.
      </p>
      <p>
        The AI doesn&apos;t receive your entire database structure up front. Across dozens of databases that would be
        far too much text, and most of it would be irrelevant to any one question, which tends to make AI less accurate
        rather than more. Instead it gets a list of table names and looks up details only as it needs them. It can
        search for tables and columns that match your wording, so a question about &quot;subscribers&quot; can still
        find a table called <code>accounts</code>.
      </p>
      <p>Two habits make the answers more trustworthy:</p>
      <ul>
        <li>
          <strong>It only joins tables that are actually linked,</strong> either by the database itself or by a virtual
          relationship. It won&apos;t guess that two columns match just because their names look similar. A confident
          wrong answer is worse than no answer.
        </li>
        <li>
          <strong>It tests its query before showing you anything.</strong> Lizard runs the query once, fetching a single
          row. If the database reports an error, the AI sees the database&apos;s own error message and gets a couple of
          attempts to fix it.
        </li>
      </ul>

      <h2>Write SQL yourself, and let AI fix it</h2>
      <p>
        Plenty of people prefer writing SQL, and Lizard has a full SQL editor for that. Queries break for ordinary
        reasons: a column that was renamed, a typo in a table name, a function that works in Postgres but not in MySQL,
        a join on the wrong key.
      </p>
      <p>
        When a query fails, a <strong>Fix with AI</strong> button appears next to the error. It sends the AI your query
        together with the exact error the database returned. The AI looks up whatever it needs (the real column names,
        how a value is actually stored), then puts the corrected query in the editor and runs it. You can watch each
        step it takes, and the fixed query stays in front of you to read or change further. The same button appears on
        any dashboard panel whose query has stopped working.
      </p>

      <h2>Dashboards from a sentence</h2>
      <p>
        Dashboards in Lizard work the way people who use Grafana expect: a grid of panels showing numbers, line charts,
        bar charts, pies and tables, with a date range picker and filters at the top that apply to every panel. Panels
        can each pull from different databases.
      </p>
      <p>
        You can build one by hand, but you can also describe it:{" "}
        <em>&quot;an overview of support tickets by priority, response times and the busiest customers&quot;</em>.
        Lizard then works in two stages.
      </p>
      <p>
        First, a planning step explores your data and designs the dashboard. It picks a chart type and size for each
        panel. Where several panels filter on the same thing, such as status or region, it creates one shared filter
        instead of hardcoding values into each panel. It sets up the date range too, sized to how often your data
        actually arrives: weeks for orders, hours for event logs. An orders dashboard that opens on the last fifteen
        minutes would just be empty.
      </p>
      <p>
        Second, before you see anything, Lizard checks the result. It runs every panel&apos;s query against your real
        databases, using realistic filter values taken from your actual data. Any panel that fails goes to a repair
        step, which fixes the query using the database&apos;s error message. Filters that no panel ended up using are
        removed. What you get back is a dashboard that already works, not a draft full of broken panels.
      </p>
      <p>
        After that, it&apos;s yours to edit. Changes stay a draft until you save. Each save is kept as a version you can
        restore later. Dashboards can be pinned, shared with your team, and exported and imported as files.
      </p>

      <h2>Why it&apos;s safe to let AI near your databases</h2>
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
        you give Lizard two logins: one that can only read, and one that can also edit. Everything the AI writes,
        whether it&apos;s answering a question, fixing a query or building a dashboard, runs with the read-only login.
        The editing login is used only by Lizard&apos;s own edit forms, never by the AI. If an AI-written query tries to
        change something, the database refuses.
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

      <h2>Built for a team</h2>
      <p>
        Lizard is meant to be shared. People work in teams, where each member is a reader, an editor or a manager, and
        each team is given read or write access database by database. The support team can see the support database
        without seeing billing. Every query and every change goes into an audit log showing who did what, and each
        record can carry comments for notes that don&apos;t belong in the data itself.
      </p>
      <p>
        Data moves in and out easily. Any table can be exported to CSV or JSON, including just the rows matching your
        current filters, and rows can be imported from CSV or NDJSON files with a column mapping step. Lizard&apos;s own
        configuration (connections, relationships, dashboards, users) can be backed up and restored as a whole.
      </p>

      <h2>Lizard leaves your databases untouched</h2>
      <p>
        One rule shaped more decisions than any other: Lizard never changes the structure of a database it connects to,
        and never stores anything in one. Your connections, settings, virtual relationships, dashboards, comments and
        audit log all live in Lizard&apos;s own small database, kept separately.
      </p>
      <p>
        That rule has a price. Live-updating tables would have been nice, and Postgres can notify listeners when data
        changes, but only if a trigger is added to each table. That would mean changing your database, so Lizard offers
        an optional auto-refresh timer instead. It&apos;s simpler and less clever, but it keeps Lizard what it should
        be: a guest in your systems.
      </p>
      <p>
        Being a good guest also means being honest about protections. Lizard encrypts the database passwords it stores,
        which protects you if the file holding them leaks through a backup or a copied disk. It doesn&apos;t protect
        against someone who has taken over the server Lizard runs on, and I&apos;d rather say that plainly than imply
        more. The audit log gets similar care: queries often contain real data, such as an email address someone
        searched for, so ordinary query history is kept only briefly, while the record of who changed what is kept much
        longer.
      </p>

      <h2>What Lizard isn&apos;t</h2>
      <p>
        Lizard isn&apos;t a data warehouse: nothing is copied out of your databases. It isn&apos;t an app builder: the
        screens are generated, not designed. And it isn&apos;t a database administration tool: there&apos;s no index
        management or tuning. Those are all useful tools. Keeping them out is what keeps Lizard simple.
      </p>

      <h2>Where it stands</h2>
      <p>
        Lizard is in active development. Everything described here works today across Postgres, MySQL and MongoDB. The
        current work is mostly about depth: better editors for more kinds of data and smoother import and export.
      </p>
      <p>
        If one idea runs through all of it, it&apos;s that convenience and safety come from the same place. Lizard is
        easy to start with because your database already describes itself. The AI features are useful because they check
        their work against your real data. And it&apos;s safe to put AI in front of your databases because your
        databases already know how to say no.
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
