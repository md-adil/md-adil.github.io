import { CodeBlock } from "@/components/blog/article-elements";

export default function MinimaJs() {
  return (
    <>
      <p>
        I wrote Minima.js, so take this article as an author&apos;s account rather than a neutral review. I am not going
        to argue that it is faster or better than anything else. I want to describe four problems I kept running into
        while building Node.js backends, explain why they occur, and show the design choices Minima.js makes in
        response. If you recognise the problems, the choices may interest you. If you don&apos;t, the framework probably
        isn&apos;t solving anything you need solved.
      </p>

      <h2>Problem one: the request object travels everywhere</h2>
      <p>
        In most Node.js frameworks, a request arrives as an object passed to your handler. Anything the handler calls
        that needs to know about the request (the current user, a header, a trace ID, the client&apos;s IP) has to
        receive that object as an argument. So the argument spreads.
      </p>
      <CodeBlock language="typescript" title="The familiar pattern">{`
export async function createTask(req: Request, res: Response) {
  const task = await tasks.create(req.body, req); // the service now needs req
  await audit(req, "task.created", task.id);      // so does the audit log
  res.json(task);
}

async function audit(req: Request, action: string, id: string) {
  const ip = req.headers["x-forwarded-for"];
  const user = req.user;
  // ...
}
`}</CodeBlock>
      <p>
        The cost is not the extra parameter. It is what the parameter does to the design. A service function that
        receives <code>req</code> now depends on the web framework&apos;s request type, so it can&apos;t easily be
        reused from a queue worker or a script. Every function between the handler and the place the data is actually
        needed must accept and forward an argument it never uses itself. React developers call this{" "}
        <em>prop drilling</em>, and it has the same effect on a backend: signatures describe plumbing rather than
        intent.
      </p>
      <p>
        The alternative is to make the current request available <em>implicitly</em>, scoped to the asynchronous work
        that is serving it. Node.js has supported this properly since <code>AsyncLocalStorage</code> stabilised in
        version 16, and Bun implements the same API. A value stored at the start of a request is visible to any code
        that runs as part of that request, through every <code>await</code>, and invisible to every other request.
      </p>
      <p>Minima.js builds its request helpers on that mechanism.</p>
      <CodeBlock language="typescript" title="Reading the request where it is needed">{`
import { request } from "@minimajs/server";

export function auditAction(action: string) {
  const req = request();
  const ip = req.headers.get("x-forwarded-for");
  console.log({ action, ip });
}
`}</CodeBlock>
      <p>
        Request-specific values of your own work the same way. <code>createContext</code> returns a getter and a setter
        whose storage is private to each request.
      </p>
      <CodeBlock language="typescript" title="A request-scoped trace ID">{`
import { createContext, hook } from "@minimajs/server";
import { randomUUID } from "node:crypto";

export const [getTraceId, setTraceId] = createContext<string>("");

// Runs at the start of every request in the scope where it is registered.
export const traceId = hook("request", () => {
  setTraceId(randomUUID());
});
`}</CodeBlock>
      <p>
        This is a trade-off, and it should be described as one. An explicit parameter makes a dependency visible in the
        function signature; an implicit context hides it. A function that calls <code>request()</code> can only run
        inside a request, and Minima.js throws if you call it anywhere else. My view is that the trade is worth making
        for genuinely ambient data such as the current request, the authenticated user and trace identifiers, and not
        for ordinary business inputs, which should still be passed as arguments. Used that way, the business logic stays
        free of HTTP types, and only a few small, well-named helpers know about the request at all.
      </p>

      <h2>Problem two: someone has to wire it all together</h2>
      <p>
        Every growing API has a file that imports every router and registers it with the application. It starts small,
        and it ends up as the one place every feature has to touch, a frequent source of merge conflicts, and a list
        that must be kept in sync with the folders on disk by hand.
      </p>
      <p>
        The folders on disk already describe the structure, so Minima.js reads it from there. Any <code>module.ts</code>{" "}
        file below the entry point is discovered at startup, and its directory becomes its URL prefix.
      </p>
      <CodeBlock language="typescript" title="src/users/module.ts">{`
import { params, type Routes } from "@minimajs/server";

function listUsers() {
  return [{ id: 1, name: "Alice" }];
}

function getUser() {
  return { id: params.get("id", Number) };
}

export const routes: Routes = {
  "GET /list": listUsers, // served at /users/list
  "GET /:id": getUser, //    served at /users/:id
};
`}</CodeBlock>
      <p>
        I want to be precise about what is implicit here and what is not. Which modules exist is inferred from the file
        system. Which routes a module serves is not: each module declares them explicitly in its <code>routes</code>{" "}
        map, so you can open one file and see everything that module is responsible for. Discovery removes the central
        registration list; it does not turn route definitions into a naming convention you have to memorise.
      </p>

      <h2>Problem three: middleware scope is decided by order</h2>
      <p>
        In Express, middleware applies to whatever is registered after it. That is simple, and it is also a common
        source of subtle bugs.
      </p>
      <CodeBlock language="typescript" title="Express: scope by position">{`
app.use("/users", usersRouter);
app.use(requireAuth); // protects only what is registered below this line
app.use("/billing", billingRouter);
`}</CodeBlock>
      <p>
        Whether <code>/users</code> is protected depends on the position of one line in a file, and moving a line while
        tidying up changes the security of the application. As more teams add global middleware for logging, parsing,
        CORS and authentication, the behaviour of any given route becomes something you work out by reading the whole
        registration sequence.
      </p>
      <p>
        Minima.js makes scope structural instead. A module declares its plugins (hooks, middleware, authentication) in
        an exported <code>meta</code> object. They apply to that module and the modules nested beneath it, and to
        nothing else. Sibling modules can&apos;t affect each other, and a child can&apos;t affect its parent. A{" "}
        <code>module.ts</code> at the root of the source tree is the parent of everything, so global behaviour lives
        there and is easy to find.
      </p>
      <CodeBlock language="typescript" title="src/admin/module.ts">{`
import { abort, hook, type Meta, type Routes } from "@minimajs/server";

export const meta: Meta = {
  plugins: [
    // Applies to /admin and every module nested under src/admin/, nowhere else.
    hook("request", ({ request }) => {
      if (!request.headers.get("authorization")) {
        abort("Unauthorized", 401);
      }
    }),
  ],
};

export const routes: Routes = {
  "GET /reports": () => ({ reports: [] }),
};
`}</CodeBlock>
      <p>
        The question &quot;what runs before this route?&quot; now has a mechanical answer: the plugins of this module
        and of each of its ancestors, from the root down. The directory tree is the scope tree.
      </p>
      <p>
        The same structure determines execution order. Hooks that prepare a request run from parent to child, in the
        order they were declared. Hooks that shape or finish a response run in the reverse order, child to parent, much
        as nested <code>try</code>/<code>finally</code> blocks unwind. The innermost scope is the first to see a
        response and the outermost has the last word, which is usually what you want for things like error formatting.
      </p>

      <h2>Problem four: every framework has its own HTTP types</h2>
      <p>
        Node.js predates the Fetch API, so its HTTP server uses its own request and response objects, and most Node
        frameworks wrap those in types of their own. A library that wants to work with several frameworks has to support
        each one&apos;s types or ask users to write adapters. Code that handles uploaded files deals with Node{" "}
        <code>Buffer</code>s on the server and <code>Blob</code>s and <code>File</code>s in the browser.
      </p>
      <p>
        Since then, the web platform has standardised all of these: <code>Request</code>, <code>Response</code>,{" "}
        <code>Headers</code>, <code>File</code>, <code>Blob</code>, streams. Modern runtimes, Node.js included, ship
        them. Minima.js uses those types throughout, rather than introducing its own. A handler may return a standard{" "}
        <code>Response</code> when it wants full control; <code>request()</code> returns a standard <code>Request</code>
        ; uploaded files are standard <code>File</code> objects.
      </p>
      <p>
        The practical consequence is that knowledge transfers. Anyone who has used <code>fetch</code> already knows the
        API for reading headers or a request body, and a helper written against <code>Request</code> or{" "}
        <code>File</code> is not tied to Minima.js. It is the same choice that lets one codebase run on both Node.js and
        Bun: the application imports <code>createApp</code> from <code>@minimajs/server/node</code> or{" "}
        <code>@minimajs/server/bun</code>, and nothing else changes.
      </p>

      <h2>A smaller problem: resources that must be released</h2>
      <p>
        Database pools, queue consumers and caches need to be opened when the server starts and closed when it stops,
        especially in containers, where a deployment sends a termination signal and expects a graceful exit. When setup
        lives in one place and teardown in another, it is easy for them to drift apart. Minima.js pairs them:{" "}
        <code>hook.lifespan</code> takes a setup function that returns its own cleanup.
      </p>
      <CodeBlock language="typescript" title="src/module.ts">{`
import { hook, type Meta } from "@minimajs/server";
import { db } from "./db.js";

export const meta: Meta = {
  prefix: "/api",
  plugins: [
    hook.lifespan(async () => {
      await db.connect();
      return async () => {
        await db.disconnect();
      };
    }),
  ],
};
`}</CodeBlock>
      <p>
        For work that should happen after a response has gone out, such as analytics or notifications,{" "}
        <code>defer()</code> registers a callback that runs once the response has been sent, without making the client
        wait for it.
      </p>

      <h2>Testing without a network</h2>
      <p>
        Because requests and responses are standard objects, a test can build a <code>Request</code>, hand it to the
        application and inspect the <code>Response</code>, with no port, no HTTP client and no server process. The
        request context exists during that call exactly as it would in production, so hooks and context helpers behave
        normally under test.
      </p>
      <CodeBlock language="typescript" title="A test with no server">{`
import { createApp } from "@minimajs/server/bun";
import { createRequest } from "@minimajs/server/mock";
import { params } from "@minimajs/server";

test("returns the requested user", async () => {
  const app = createApp();
  app.get("/users/:id", () => ({ id: params.get("id", Number) }));

  const response = await app.handle(createRequest("/users/42"));
  expect(await response.json()).toEqual({ id: 42 });
});
`}</CodeBlock>

      <h2>When it is the wrong choice</h2>
      <p>
        Every design choice above excludes something, and it is fairer to say so than to leave readers to discover it.
      </p>
      <p>
        Minima.js targets long-running servers on Node.js and Bun. If your application is designed first for edge
        runtimes such as Cloudflare Workers, a framework built for that environment, Hono for example, will fit better.
        If your organisation prefers classes, decorators and dependency injection as its organising principles, NestJS
        provides exactly that, and Minima.js deliberately does not. And if your codebase depends heavily on the Express
        middleware ecosystem, Minima.js can run some Express middleware through a compatibility plugin, but you will be
        working against the grain. The size and maturity of Express&apos;s ecosystem is a real advantage that a young
        framework doesn&apos;t have.
      </p>

      <h2>The idea underneath</h2>
      <p>
        Each of these choices comes from the same principle: the structure of an application should be visible in the
        application itself. The directory tree states which modules exist and where their routes live. A module&apos;s{" "}
        <code>meta</code> states what runs around its handlers. The request context removes plumbing from function
        signatures, so they can describe what the function is for. And the HTTP types are the same ones the rest of the
        platform already uses.
      </p>
      <p>
        None of this is new as an idea. File-based routing, scoped plugins and asynchronous context all exist elsewhere.
        What Minima.js tries to do is combine them in a small, consistent model, so that when a new engineer asks
        &quot;what happens to a request to this URL?&quot;, the answer can be read from the code rather than
        reconstructed from it.
      </p>

      <h2>Further reading</h2>
      <ul>
        <li>
          <a href="https://minimajs.com/intro">Minima.js documentation</a>, especially &quot;Modules&quot;,
          &quot;Context&quot; and the hooks guide.
        </li>
        <li>Node.js documentation, &quot;Asynchronous context tracking&quot; (AsyncLocalStorage).</li>
        <li>WHATWG Fetch Standard, which defines Request, Response and Headers.</li>
        <li>
          Source code: <a href="https://github.com/minima-js/minimajs">github.com/minima-js/minimajs</a>.
        </li>
      </ul>
    </>
  );
}
