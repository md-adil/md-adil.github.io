import { type PersonalInfo } from "./types";

const experienceSince = 2014;
const experienceYears = `${new Date().getFullYear() - experienceSince}+`;

export const personalInfo: PersonalInfo = {
  name: "Adil",
  title: "Sr. Software Architect | Cloud & DevOps Engineer | System Designer | Open Source Contributor",
  tagline: "Building microservices, Kubernetes infrastructure, and real-time systems that handle millions of users.",
  about: `${experienceYears} years building backend systems, cloud infrastructure, and developer tools. Created minima-js, react-read-otp (1.2k+ weekly downloads), ebx, and other open source projects used by developers worldwide.`,
  stats: {
    years: experienceYears,
    users: "1M+",
    uptime: "99.9%",
  },
};
