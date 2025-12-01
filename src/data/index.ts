// Re-export all types
export * from "./types";

// Re-export all data
export { personalInfo } from "./personal-info";
export { experiences } from "./experiences";
export { education, certifications } from "./education";
export { skills } from "./skills";
export { projects, openSourceProjects } from "./projects";
export { caseStudies } from "./case-studies";

// Aggregate all data for convenience
import { personalInfo } from "./personal-info";
import { experiences } from "./experiences";
import { education, certifications } from "./education";
import { skills } from "./skills";
import { projects, openSourceProjects } from "./projects";
import { caseStudies } from "./case-studies";

export const PORTFOLIO_DATA = {
  ...personalInfo,
  experiences,
  education,
  certifications,
  projects,
  openSourceProjects,
  skills,
  caseStudies,
};
