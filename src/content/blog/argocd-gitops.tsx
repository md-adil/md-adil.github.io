import { CodeBlock } from "@/components/blog/article-elements";

export default function ArgoCdGitOps() {
  return (
    <>
      <p>
        Ask an operations team three questions about any service. What version is running in production right now? Who
        changed it last, and why? How do we get back to how it was yesterday? With a handful of services, someone can
        answer from memory. With six hundred, the answers have to come from the system, or they don&apos;t come at all.
      </p>
      <p>
        At Bajaj Finserv Health, more than six hundred microservices were deployed by Azure Pipelines jobs that ended in{" "}
        <code>helm upgrade</code>. Code reached production reliably, but none of those three questions had a quick
        answer. This article explains why that follows from the deployment model itself, and how moving to GitOps with
        ArgoCD changed it.
      </p>

      <h2>Push: the pipeline as the last word</h2>
      <p>
        In a push-based model, the CI pipeline holds credentials for the cluster and changes it directly. The cluster
        then contains whatever the most recent successful run left behind. Nothing compares that state with any
        statement of intent, because there isn&apos;t one. The &quot;desired state&quot; exists only as a sequence of
        past events.
      </p>
      <p>
        Several familiar problems follow from that one fact. Helm does record release revisions, but they live inside
        the cluster, only the last ten are kept by default, and they record <em>what</em> changed, not <em>why</em>.
        Rolling back means finding the right earlier pipeline run, or running <code>helm rollback</code> by hand during
        an incident. A hotfix made with <code>kubectl edit</code> survives until the next deployment silently overwrites
        it, or never gets overwritten and becomes something the running system quietly depends on. And because the
        cluster is the only place the truth lives, the only way to see it is to give many people direct cluster access
        through tools like <code>kubectl</code> or Lens.
      </p>

      <h2>Pull: a control loop instead of a command</h2>
      <p>
        Kubernetes itself is built on a simple idea. You declare the state you want, and controllers continuously
        compare it with the state that exists and act to close the gap. GitOps applies that same idea one level up.
      </p>
      <p>
        The OpenGitOps project, under the CNCF, summarises it in four principles. The desired state is{" "}
        <em>declarative</em>. It is <em>versioned and immutable</em>, which in practice means it lives in Git. It is{" "}
        <em>pulled automatically</em> by an agent rather than pushed by a pipeline. And it is{" "}
        <em>continuously reconciled</em>: the agent keeps comparing and correcting, not just once at deploy time.
      </p>
      <p>
        ArgoCD is such an agent. It runs inside the cluster, watches a Git repository, renders the manifests it finds
        there (in our case Helm charts with per-environment values), and makes the cluster match. Two consequences are
        worth stating plainly. CI no longer needs credentials for production; its job ends when it records a new version
        in Git. And every deployment is now a commit, so every rollback is a revert.
      </p>

      <h2>The shape of the system</h2>
      <p>
        The design splits responsibilities cleanly. Azure Pipelines builds and tests each service, pushes its image, and
        then makes one small commit to a separate GitOps repository that updates the image tag for that service and
        environment. ArgoCD watches the GitOps repository and syncs the change.
      </p>
      <p>
        Keeping that repository separate from application code is a deliberate choice. Its history becomes a clean
        record of deployments rather than being mixed with feature commits. It also lets you control who may change
        production independently of who may merge code.
      </p>
      <CodeBlock language="yaml" title="azure-pipelines.yml (release stage, simplified)">{`
- stage: Release
  jobs:
    - job: PromoteImage
      steps:
        - checkout: gitops
          persistCredentials: true
        - script: |
            yq -i '.image.tag = "$(Build.BuildId)"' production/$(serviceName)/values.yaml
            git add production/$(serviceName)/values.yaml
            git commit -m "deploy($(serviceName)): build $(Build.BuildId) from $(Build.SourceVersion)"
            git push origin HEAD:main
          displayName: Promote image to production
`}</CodeBlock>
      <p>
        The commit message ties the deployment to the source commit and the build that produced it. That small detail is
        what turns <code>git log</code> on the GitOps repository into a searchable history of every production change
        across the platform.
      </p>

      <h2>Six hundred applications without six hundred manifests</h2>
      <p>
        ArgoCD represents each deployed unit as an <code>Application</code> resource. Writing six hundred of them by
        hand would recreate the sprawl we were trying to remove. An <code>ApplicationSet</code> generates them instead:
        a Git directory generator creates one Application for every service directory it finds, so adding a service to
        the platform is a pull request that adds a folder.
      </p>
      <CodeBlock language="yaml" title="applicationset.yaml">{`
apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: services-production
  namespace: argocd
spec:
  goTemplate: true
  generators:
    - git:
        repoURL: https://dev.azure.com/<org>/<project>/_git/gitops
        revision: main
        directories:
          - path: production/*
  template:
    metadata:
      name: "{{.path.basename}}"
    spec:
      project: production
      source:
        repoURL: https://dev.azure.com/<org>/<project>/_git/gitops
        targetRevision: main
        path: "{{.path.path}}"
      destination:
        server: https://kubernetes.default.svc
        namespace: "{{.path.basename}}"
      syncPolicy:
        automated:
          prune: true
          selfHeal: true
        syncOptions:
          - CreateNamespace=true
`}</CodeBlock>
      <p>
        Two fields in the sync policy carry most of the value. <code>prune</code> deletes resources that have been
        removed from Git, so the cluster doesn&apos;t accumulate orphans. <code>selfHeal</code> is the one that ends
        configuration drift. If someone edits a live Deployment by hand, ArgoCD detects that it no longer matches Git
        and puts it back.
      </p>
      <p>
        Self-heal can feel aggressive at first, because it takes away the emergency <code>kubectl edit</code>. That is
        precisely the point. An emergency change now has to be a commit, so it is reviewed, recorded and, crucially,
        still there after the next deployment.
      </p>

      <h2>Visibility without cluster access</h2>
      <p>
        Moving the source of truth into Git only helps people if they can see its effect. ArgoCD&apos;s interface shows,
        for every application, whether it is in sync with Git, whether its resources are healthy, and the full tree of
        objects it manages. We connected it to the organisation&apos;s single sign-on and mapped identity groups to
        roles scoped by ArgoCD project.
      </p>
      <CodeBlock language="yaml" title="argocd-rbac-cm (excerpt)">{`
policy.default: role:readonly
policy.csv: |
  p, role:payments-team, applications, get,  production/payments-*, allow
  p, role:payments-team, applications, sync, production/payments-*, allow
  g, <payments-team-group-id>, role:payments-team
  g, <platform-team-group-id>, role:admin
`}</CodeBlock>
      <p>
        A team can see and sync its own services; the platform team can manage everything; everyone else can look.
        Answering &quot;is my service healthy?&quot; no longer requires a kubeconfig, which is good for convenience and
        better for security.
      </p>

      <h2>Things that matter at this scale</h2>
      <p>
        ArgoCD needs no tuning for a few dozen applications. Six hundred, each rendering a Helm chart, is a different
        workload, and a few design decisions are best made early.
      </p>
      <p>
        By default ArgoCD polls repositories every three minutes. With one large repository and hundreds of
        applications, configuring the Git server to send a webhook on push both speeds up deployments and reduces load.
        Manifest rendering happens in the repo server, so running several replicas of it keeps sync times predictable.
        The application controller can be sharded across replicas so that no single process reconciles the whole fleet.
        And ArgoCD Projects are worth using as guardrails, because they restrict which clusters and namespaces a group
        of applications may deploy into. A mistaken values file then can&apos;t place a service somewhere it
        doesn&apos;t belong.
      </p>
      <p>
        One subject deserves a separate warning: secrets. A Git repository is the wrong place for plaintext credentials,
        however private it is. The usual answers are to store them encrypted (Sealed Secrets, SOPS) or to keep only
        references in Git and fetch values from a secret manager at runtime (External Secrets Operator). Decide this
        before migrating, not after.
      </p>

      <h2>Moving a running fleet</h2>
      <p>
        Nothing about this migration requires a big bang, and it shouldn&apos;t be done as one. ArgoCD can adopt
        resources that are already running. The safe sequence for each group of services is to generate their GitOps
        directories from the Helm values already in use, let ArgoCD adopt them with automated sync turned off, and check
        that it reports no unexpected differences. Only then enable automated sync, and remove the{" "}
        <code>helm upgrade</code> step from those services&apos; pipelines. If the diff shows something surprising, that
        is drift you have just discovered, and it is far better to find it now than during an incident.
      </p>

      <h2>What changed</h2>
      <p>
        The three questions now have immediate answers. What is running is whatever the GitOps repository says, and
        ArgoCD shows whether the cluster agrees. Who changed it and why is in the commit log, linked to a build and a
        source commit. Getting back to yesterday is a <code>git revert</code>, which ArgoCD applies like any other
        change.
      </p>
      <p>
        Drift stopped accumulating, because self-heal removes it as fast as it appears. And day-to-day visibility moved
        out of individual engineers&apos; terminals into a shared interface behind single sign-on.
      </p>
      <p>
        The deeper change is that deployment stopped being an event and became a state. In a push model, production is
        the sum of everything that was ever done to it. In a pull model, it is a function of one versioned document.
        That makes it something you can read, review and reason about, and at six hundred services, that is the only
        kind of production you can manage.
      </p>

      <h2>Further reading</h2>
      <ul>
        <li>OpenGitOps, &quot;GitOps Principles v1.0.0&quot;, opengitops.dev.</li>
        <li>
          Argo CD documentation, especially &quot;ApplicationSet&quot;, &quot;RBAC&quot; and &quot;High
          Availability&quot;.
        </li>
        <li>Kubernetes documentation, &quot;Controllers&quot;, for the reconciliation model GitOps builds on.</li>
      </ul>
    </>
  );
}
