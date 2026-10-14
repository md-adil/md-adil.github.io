export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  metric: string;
  image?: string;
  link?: string;
  github?: string;
  npm?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
  details?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
}

/** Blog post metadata; the slug is its key in `blogPosts` (and matches a case study id where one exists). */
export interface BlogPost {
  title: string;
  description: string;
  publishedAt: string;
  readingMinutes: number;
  tags: string[];
}

export enum SectionId {
  HERO = "hero",
  ABOUT = "about",
  EXPERIENCE = "experience",
  EDUCATION = "education",
  SKILLS = "skills",
  PROJECTS = "projects",
  CASE_STUDIES = "case-studies",
  CONTACT = "contact",
}

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  about: string;
  stats: {
    years: string;
    users: string;
    uptime: string;
  };
}
