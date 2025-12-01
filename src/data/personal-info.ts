import { PersonalInfo } from './types';

const experienceSince = 2014;
const experienceYears = `${new Date().getFullYear() - experienceSince}+`;

export const personalInfo: PersonalInfo = {
  name: "Adil",
  title: "Sr. Software Architect | Cloud & DevOps Engineer | System Designer | Open Source Contributor",
  tagline: "I build scalable architectures: microservices, Kubernetes platforms, GitOps pipelines, and real-time systems for high-traffic environments.",
  about: `With ${experienceYears} years across backend engineering, cloud infrastructure, performance optimization, and developer tooling, I specialize in designing and implementing end-to-end solutions that scale. Creator of minima-js, react-read-otp (1.2k+ weekly downloads), ebx, and other open source tools.`,
  stats: {
    years: experienceYears,
    users: "1M+",
    uptime: "99.9%"
  }
};
