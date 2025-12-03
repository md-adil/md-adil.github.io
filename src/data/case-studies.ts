import { CaseStudy } from "./types";

export const caseStudies: CaseStudy[] = [
  {
    id: "cs1-laravel-octane",
    title: "PHP-FPM → Laravel Octane Migration",
    client: "EdTech Platforms",
    challenge:
      "The platform was experiencing slow response times (800ms average), poor concurrency handling, and high CPU usage under load. Traditional PHP-FPM architecture couldn't handle the growing user base.",
    solution:
      "Replaced PHP-FPM with Laravel Octane + Swoole for process-level caching and coroutine execution. Implemented connection pooling, optimized database queries.",
    results: [
      "Response time reduced from 800ms to 40-60ms (85% improvement)",
      "5× increase in concurrent request handling",
      "30-40% reduction in infrastructure costs",
    ],
    techStack: ["Laravel Octane", "Swoole", "Redis", "MySQL", "PHP"],
  },
  {
    id: "cs2-microservices",
    title: "Monolith to Microservices Migration",
    client: "EdTech & SaaS Platforms",
    challenge:
      "Legacy monolithic applications were causing deployment bottlenecks, scaling issues, and making it difficult to implement new features rapidly.",
    solution:
      "Architected and executed strangler-fig migration pattern to decompose monolith into microservices. Implemented comprehensive observability stack using Kubernetes.",
    results: [
      "Improved fault isolation - failures in one service don't crash the entire system",
      "Clear service ownership - teams have full autonomy over their services",
      "Independent database scaling - each service can optimize its data storage",
    ],
    techStack: ["Kubernetes", "Docker", "Node.js", "Go", "Laravel", "Jenkins"],
  },
  {
    id: "cs3-observability",
    title: "Real-time Observability Platform",
    client: "Clients",
    challenge:
      "Lack of visibility into distributed systems made debugging production issues extremely difficult. Mean time to resolution (MTTR) was over 4 hours for critical incidents.",
    solution:
      "Designed and deployed comprehensive observability stack with distributed tracing, centralized logging, and real-time metrics. Implemented Grafana dashboards, and ELK Stack for logs",
    results: [
      "MTTR reduced from 4+ hours to <30 minutes",
      "99.99% system availability achieved",
      "Proactive issue detection before customer impact",
    ],
    techStack: [
      "Grafana",
      "ELK Stack",
      "Loki",
      "Tempo",
      "Prometheus",
      "Kubernetes",
    ],
  },
  {
    id: "cs4-argocd-gitops",
    title: "ArgoCD GitOps for 600+ Microservices",
    client: "Bajaj Finserv Health",
    challenge:
      "Deploying 600+ microservices via Helm + Azure Pipelines had zero visibility, required manual rollbacks with Infra/Lens tools, and lost all deployment history if pipelines were deleted—making disaster recovery impossible.",
    solution:
      "Implemented ArgoCD GitOps with Git as single source of truth. Built custom Azure DevOps integration for CI triggers. Configured auto-sync, self-healing, and RBAC with SSO for secure multi-team access.",
    results: [
      "Deployment history preserved in Git forever (disaster recovery ready)",
      "Zero configuration drift with automated self-healing",
      "No need for Infra/Lens - full visibility in ArgoCD UI",
    ],
    techStack: ["ArgoCD", "Kubernetes", "Azure DevOps", "GitOps", "Helm"],
  },
  {
    id: "cs5-capsule-design-system",
    title: "Capsule Design System",
    client: "Bajaj Finserv Health",
    challenge:
      "Inconsistent UI components across applications, slow frontend development cycles, visual design drift, and poor Lighthouse performance scores were impacting user experience and developer productivity.",
    solution:
      "Built a scalable, production-ready design system using React and Storybook. Created unified design tokens, reusable hooks and utilities, accessibility-first component architecture, and performance-optimized bundle strategies.",
    results: [
      "UI development speed increased 2-3×",
      "Adopted by whole organization",
      "99% Lighthouse performance score",
    ],
    techStack: [
      "React",
      "Storybook",
      "TypeScript",
      "Emotion",
      "A11Y",
      "Performance Optimization",
    ],
  },
];
