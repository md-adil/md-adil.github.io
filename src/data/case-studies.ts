import { CaseStudy } from "./types";

export const caseStudies: CaseStudy[] = [
  {
    id: "proxysql-horizontal-scaling",
    title: "ProxySQL for Horizontal Database Scaling",
    client: "EdTech & SaaS Platforms",
    challenge:
      "ORMs like Knex don't natively support multiple read replicas. PHP services lack connection pooling. Database became a bottleneck under high load.",
    solution:
      "Implemented ProxySQL as database proxy layer. Enabled connection multiplexing, read/write splitting, query routing, and automatic failover across multiple read replicas.",
    results: [
      "Unlimited horizontal scaling with read replicas",
      "90% reduction in database connections via multiplexing",
      "Zero-downtime failover and replica health monitoring",
    ],
    technologies: ["ProxySQL", "MySQL", "Connection Pooling", "Load Balancing", "High Availability"],
  },
  {
    id: "laravel-octane",
    title: "PHP-FPM → Laravel Octane Migration",
    client: "EdTech Platforms",
    challenge: "Platform was slow - 800ms average response time. PHP-FPM couldn't handle the load as users grew.",
    solution: "Migrated to Laravel Octane + Swoole. Added connection pooling and optimized queries.",
    results: [
      "Response time: 800ms → 40-60ms (85% faster)",
      "5× more concurrent requests",
      "Cut infrastructure costs by 30-40%",
    ],
    technologies: ["Laravel Octane", "Swoole", "Redis", "MySQL", "PHP"],
  },
  {
    id: "microservices",
    title: "Monolith to Microservices Migration",
    client: "EdTech & SaaS Platforms",
    challenge: "Monolith was blocking deployments and making it hard to ship features fast.",
    solution: "Used strangler-fig pattern to break down monolith into microservices on Kubernetes.",
    results: [
      "Services fail independently - one crash doesn't take down everything",
      "Teams own their services end-to-end",
      "Each service scales its database independently",
    ],
    technologies: ["Kubernetes", "Docker", "Node.js", "Go", "Laravel", "Jenkins"],
  },
  {
    id: "observability",
    title: "Real-time Observability Platform",
    client: "Clients",
    challenge: "No visibility into distributed systems. Took 4+ hours to debug production issues.",
    solution:
      "Built observability stack with distributed tracing, centralized logs, and real-time metrics using Grafana and ELK.",
    results: ["MTTR: 4+ hours → 30 minutes", "Reached 99.99% uptime", "Catch issues before users notice"],
    technologies: ["Grafana", "ELK Stack", "Loki", "Tempo", "Prometheus", "Kubernetes"],
  },
  {
    id: "argocd-gitops",
    title: "ArgoCD GitOps for 600+ Microservices",
    client: "Bajaj Finserv Health",
    challenge:
      "Managing 600+ microservices with Helm + Azure Pipelines was chaos. No deployment history, manual rollbacks, zero visibility.",
    solution:
      "Implemented ArgoCD GitOps - Git as source of truth. Built Azure DevOps integration, auto-sync, self-healing, and SSO-based RBAC.",
    results: [
      "Deployment history saved in Git forever",
      "Auto-healing prevents config drift",
      "Full visibility in ArgoCD UI - no more kubectl/Lens",
    ],
    technologies: ["ArgoCD", "Kubernetes", "Azure DevOps", "GitOps", "Helm"],
  },
  {
    id: "capsule-design-system",
    title: "Capsule Design System",
    client: "Bajaj Finserv Health",
    challenge: "Inconsistent UI across apps. Slow frontend dev cycles. Bad Lighthouse scores.",
    solution:
      "Built design system with React and Storybook. Unified design tokens, reusable hooks, accessibility-first components.",
    results: ["2-3× faster UI development", "Used across entire org", "99% Lighthouse score"],
    technologies: ["React", "Storybook", "TypeScript", "Emotion", "A11Y", "Performance Optimization"],
  },
];
