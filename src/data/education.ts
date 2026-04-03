import { type Education } from "./types";

const learningSince = 2009;

export const education: Education[] = [
  {
    id: "edu1-internet",
    degree: "Self-Taught Software Engineering",
    institution: "School of Internet",
    year: `${learningSince} - Present`,
    details: "Guided by a fascination with technology, I learned software engineering, system design, and computing fundamentals through self-directed study and hands-on experimentation.",
  },
  {
    id: "edu2-bachelor",
    degree: "Bachelor of Commerce",
    institution: "Delhi University",
    year: "2010 - 2013",
    details: "Business & Commerce",
  },
];

export const certifications: Education[] = [
  {
    id: "cert1",
    degree: "Self-Taught Developer",
    institution: "Internet & Open Source",
    year: learningSince.toString(),
    details: "Problem Solving, Research, Self-Motivation, Adaptability",
  },
];
