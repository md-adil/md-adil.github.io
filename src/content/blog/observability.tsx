import { CodeBlock } from "@/components/blog/article-elements";

export default function Observability() {
  return (
    <>
      <p>
        If you time an incident from the first alert to the final fix and split it into phases, a pattern appears.
        Writing and deploying the fix is usually quick. Detecting the problem is usually quick too, because someone
        complains. The time goes into the middle: working out which component is responsible, and why.
      </p>
      <p>
        On the systems I&apos;m describing here, that middle phase routinely took hours. Engineers logged into machines
        to read log files, compared timestamps by hand across services, and argued about which team&apos;s change was to
        blame. Mean time to resolution (MTTR) was over four hours. After the work described below it was around thirty
        minutes, and almost all of that improvement came from shrinking the diagnosis phase.
      </p>

      <h2>What &quot;observability&quot; means</h2>
      <p>
        The word comes from control theory, where Rudolf Kálmán used it in 1960 to describe whether the internal state
        of a system can be inferred from its outputs. The software meaning is close to the original. A system is
        observable if you can work out what is happening inside it from the signals it emits, including for failures
        nobody anticipated when the dashboards were built.
      </p>
      <p>
        That last clause is the difference from monitoring. Monitoring answers questions you thought of in advance: is
        the CPU high, is the error rate above a threshold? Observability is the ability to ask new questions during an
        incident, without shipping new code to answer them.
      </p>

      <h2>Three signals, three trade-offs</h2>
      <p>
        <strong>Metrics</strong> are numbers aggregated over time: request rate, error count, latency percentiles. They
        are cheap to store and fast to query, which makes them ideal for alerting and trends. The price of aggregation
        is that individual events are gone. A metric can tell you that one request in a hundred is failing, but not
        which one or why.
      </p>
      <p>
        <strong>Logs</strong> record individual events in detail. They answer &quot;what exactly happened&quot;, but
        they are expensive at volume, and a log line from one service says nothing about the request that caused it in
        another.
      </p>
      <p>
        <strong>Traces</strong> follow one request through every service it touches, recording each hop as a timed span.
        They are the only signal that directly answers &quot;where did this request spend its time, and where did it
        fail?&quot;, which in a distributed system is usually the question that matters.
      </p>
      <p>
        Our stack mapped onto these directly, with Grafana as the single place to look. Prometheus collected metrics
        from services, Kubernetes and infrastructure exporters, and evaluated alert rules. Tempo stored traces. Logs
        went to two systems that make different trade-offs: Loki indexes only a small set of labels (service, namespace,
        pod) and stores log content cheaply, while Elasticsearch in the ELK stack indexes the content itself, which
        costs more but supports rich full-text search and analysis.
      </p>

      <h2>Correlation matters more than coverage</h2>
      <p>
        Three good tools with three separate search boxes do not make a system observable. They move the problem from
        &quot;we have no data&quot; to &quot;we have data in three places and no way to join it&quot;. The single most
        valuable change was making every signal point to the others.
      </p>
      <p>
        The mechanism is a trace identifier. When a request enters the system it receives a trace ID, which is
        propagated to every downstream call in a standard header (the W3C Trace Context <code>traceparent</code> header
        is the common choice today). Every log line is written as structured JSON and includes that ID.
      </p>
      <CodeBlock language="json" title="A structured log line">{`
{
  "ts": "2026-03-02T10:41:07.214Z",
  "level": "error",
  "service": "enrolment-api",
  "trace_id": "4bf92f3577b34da6a3ce929d0e0e4736",
  "msg": "payment confirmation timed out",
  "upstream": "payments-service",
  "duration_ms": 5003
}
`}</CodeBlock>
      <p>
        Grafana can then turn the trace ID in a log line into a link to the full trace, and a span in a trace into a
        query for that service&apos;s logs at that moment. Diagnosis becomes a short walk rather than a search. An alert
        says which service is unhealthy. Its dashboard shows which endpoint. An example slow trace from that endpoint
        shows which downstream hop is responsible. That hop&apos;s logs, filtered to the same trace, show the error.
        Each step takes seconds, and the walk does not depend on knowing the system well, which matters at three in the
        morning.
      </p>

      <h2>Choosing what to measure</h2>
      <p>
        Two short methods cover most needs. For anything that serves requests, Tom Wilkie&apos;s <em>RED</em> method:
        Rate, Errors and Duration. For resources such as CPUs, disks and connection pools, Brendan Gregg&apos;s{" "}
        <em>USE</em> method: Utilisation, Saturation and Errors. Building one dashboard template per method, and
        applying it to every service, had a benefit beyond the numbers themselves. Any engineer could open any
        service&apos;s dashboard during an incident and already know where to look.
      </p>
      <p>
        A practical warning about labels. Both Prometheus and Loki create a new time series or stream for every unique
        combination of label values. Put a user ID, a request ID or a raw URL into a label and the number of series
        grows with your traffic, which degrades query performance and inflates cost. High-cardinality values belong in
        the log body or in trace attributes, never in labels.
      </p>

      <h2>Alert on what users feel</h2>
      <p>
        Many alerting setups page on causes: CPU above 80%, a disk filling up, a pod restarting. Most such alerts do not
        correspond to anything a user notices, and a team that is paged for things that don&apos;t matter learns to
        ignore pages. The alternative, set out in Google&apos;s SRE workbook, is to page on symptoms measured against a
        service-level objective.
      </p>
      <p>
        The arithmetic is worth doing once. An availability objective of 99.99% over thirty days allows 0.01% of that
        period as an error budget: 30 × 24 × 60 × 0.0001 ≈ 4.3 minutes. A <em>burn rate</em> describes how fast you are
        spending it. At a burn rate of 1, the budget lasts exactly thirty days. At 14.4, a single hour consumes 14.4 /
        720 = 2% of the monthly budget, which is the threshold the workbook suggests for a page.
      </p>
      <CodeBlock language="yaml" title="prometheus-rules.yaml (excerpt)">{`
groups:
  - name: slo-burn-rate
    rules:
      - alert: HighErrorBudgetBurn
        expr: |
          (
            sum by (service) (rate(http_requests_total{status=~"5.."}[1h]))
            /
            sum by (service) (rate(http_requests_total[1h]))
          ) > (14.4 * 0.0001)
        for: 2m
        labels:
          severity: page
        annotations:
          summary: "{{ $labels.service }} is spending its error budget 14x too fast"
          runbook: "https://runbooks.internal/{{ $labels.service }}/errors"
`}</CodeBlock>
      <p>
        In production you would pair this one-hour window with a short window, so the alert also resolves quickly once
        the problem stops; the workbook describes the multi-window form in detail. Note too that every page links to a
        runbook. An alert that doesn&apos;t tell the responder what to do next is only half an alert.
      </p>

      <h2>Introducing it without a big bang</h2>
      <p>
        Asking every team to instrument everything at once is a reliable way to get nothing instrumented. The order that
        works is to start with what requires no application changes: cluster, node and ingress metrics, and log
        collection from every container. That gives immediate value and builds trust in the tools. Next, put tracing and
        structured logging into the shared libraries and middleware each language stack already uses, so that services
        gain trace propagation by upgrading a dependency rather than by writing code. Then instrument the request paths
        behind the most important user journeys. Define objectives and alert thresholds last, once there is enough real
        data to set them from evidence rather than guesswork.
      </p>

      <h2>What changed</h2>
      <p>
        MTTR fell from more than four hours to about thirty minutes. The platform reached 99.99% uptime. And more
        problems were caught before users noticed them, because a burning error budget or a latency regression after a
        deploy now shows up on a dashboard before it shows up in a support queue.
      </p>
      <p>
        The less measurable change was cultural. Postmortems could point to specific traces instead of reconstructed
        timelines, which made them shorter and more honest. Arguments about whose change caused an incident mostly
        stopped, because the trace usually settled it. Observability is often sold as a tooling purchase. In my
        experience it pays off as a change in how a team reasons about its own system.
      </p>

      <h2>Further reading</h2>
      <ul>
        <li>
          Betsy Beyer et al. (eds.), <em>The Site Reliability Workbook</em>, O&apos;Reilly, 2018, chapter 5,
          &quot;Alerting on SLOs&quot;.
        </li>
        <li>Brendan Gregg, &quot;The USE Method&quot;, brendangregg.com.</li>
        <li>W3C Recommendation, &quot;Trace Context&quot;.</li>
        <li>
          Charity Majors, Liz Fong-Jones and George Miranda, <em>Observability Engineering</em>, O&apos;Reilly, 2022.
        </li>
      </ul>
    </>
  );
}
