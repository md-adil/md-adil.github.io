import { Experience } from "./types";

export const experiences: Experience[] = [
  {
    id: "exp1-independent",
    role: "Independent Consulting",
    company: "Self-Employed",
    period: "2022 - Present",
    description:
      "Providing specialized consulting and architecture services to EdTech, Media Streaming, and Enterprise SaaS clients. Delivering end-to-end solutions from infrastructure design to production deployment.",
    highlights: [
      "Designed and implemented full DevOps pipeline with Jenkins, Kubernetes, and GitOps",
      "Migrated monolithic Laravel application to microservices (Node.js + Go + Laravel Octane + Swoole)",
      "Designed infrastructure from scratch: Kubernetes, Terraform, CI/CD, observability stack",
      "Set coding guidelines and engineering standards for entire tech teams",
      "Deployed full observability using Grafana, ELK, Loki, Tempo",
      "Built production-grade streaming platform with real-time capabilities",
      "Established DevOps best practices and CI/CD pipelines",
    ],
  },
  {
    id: "exp2-bajaj",
    role: "Sr. Software Architect (Promoted from Sr. Software Engineer)",
    company: "Bajaj Finserv Health",
    period: "October 2020 - Present",
    description:
      "Leading architecture and engineering for India's fastest-growing health-tech platform. Promoted to Sr. Architect in January 2022 for exceptional performance and leadership.",
    highlights: [
      "Implemented CI/CD reducing deployment time by 75%",
      "Leading squad of Smart Reports and OCR with Agentic AI",
      "Performance optimization & scalability",
      "Security & compliance",
      "Azure DevOps, Kubernetes & Docker orchestration",
    ],
  },
  {
    id: "exp3-bigly",
    role: "Director & Tech Lead",
    company: "Bigly Technology Pvt. Ltd.",
    period: "March 2017 - October 2020",
    description: "Co-founded and led e-commerce enablement platform for online sellers. Managing complete technology stack.",
    highlights: [
      "Grew company from 3 to 45+ team members",
      "Generated ₹1Cr+ in revenue",
      "Serving 1000+ active sellers nationwide",
      "Built complete seller management platform",
      "Strategic planning & business development",
      "Team management & hiring",
      "Technical architecture & sprint planning",
      "Product roadmap & feature development",
    ],
  },
  {
    id: "exp4-bigradar",
    role: "Lead Software Engineer",
    company: "BigRadar",
    period: "April 2017 - October 2020",
    description: "Single-handedly built and maintained a modern real-time chat platform serving thousands of concurrent users.",
    highlights: ["Built entire platform independently", "Real-time messaging with Socket.IO", "Full-stack development (solo)", "Product architecture & design"],
  },
];
