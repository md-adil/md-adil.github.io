import { Education } from "./types";

const learningSince = 2019;

export const education: Education[] = [
  {
    id: "edu1-internet",
    degree: "Self-Taught Software Engineering",
    institution: "School of Internet",
    year: `${learningSince} - Present`,
    details: "Continuous learning through online resources, documentation, and hands-on projects",
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
