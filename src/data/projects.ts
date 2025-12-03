import { Project } from "./types";

export const projects: Project[] = [];

export const openSourceProjects: Project[] = [
  {
    id: "os1",
    title: "YACS (Yet Another Chatting Software)",
    description:
      "Talk to anyone without sharing contacts - A lockdown project. High-performance PWA application with near-native user experience, smooth animations and offline capabilities.",
    technologies: [
      "React",
      "TypeScript",
      "WebRTC",
      "WebSocket",
      "Node.js",
      "MongoDB",
      "Protobuf",
      "PWA",
    ],
    metric: "Native-Smooth Performance",
    link: "https://yacs.in",
  },
  {
    id: "os2",
    title: "react-read-otp",
    description:
      "A specialized React hook/component for automatic OTP handling and input formatting. Featured on npm with consistent weekly downloads.",
    technologies: ["React", "TypeScript", "WebOTP API"],
    metric: "1.2k+ Weekly Downloads",
    npm: "https://www.npmjs.com/package/react-read-otp",
    github: "https://github.com/md-adil/react-read-otp",
  },
  {
    id: "os3",
    title: "minima-js",
    description:
      "A lightweight Node.js backend framework prioritized for development speed and a TypeScript-first approach.",
    technologies: ["Node.js", "TypeScript", "Functional Programming"],
    metric: "High Throughput",
    link: "https://minima-js.github.io",
    github: "https://github.com/minima-js/minimajs",
  },
  {
    id: "os4-ebx",
    title: "ebx",
    description:
      "A modern TypeScript / ES Module compiler designed for speed and standards compliance.",
    technologies: ["TypeScript", "ESBuild", "ESM"],
    metric: "Zero Config",
    npm: "https://www.npmjs.com/package/ebx",
    github: "https://github.com/md-adil/ebx",
  },
];
