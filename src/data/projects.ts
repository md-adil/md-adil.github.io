import { Project } from "./types";

export const projects: Project[] = [
  {
    id: "high-performance-on-demand-image-service",
    title: "High-Performance On-Demand Image Service",
    description: `High-concurrency Go service handling 100K req/min. Real-time resizing and format conversion (WebP, AVIF). CDN-cached for millions of requests with minimal origin load.`,
    technologies: ["Go", "Kubernetes", "CDN"],
    metric: "100K req/min",
    github: "https://github.com/md-adil/image-optimizer",
  },
  {
    id: "scalable-video-streaming-platform",
    title: "Scalable Video Streaming Platform (Live & VOD)",
    description: `Video platform supporting 400+ concurrent live streams for millions of users. RTMP/NGINX ingestion with HLS adaptive delivery, DRM protection, and token-based CDN auth. Kubernetes-powered horizontal scaling.`,
    technologies: ["RTMP", "Nginx", "Docker", "Kubernetes", "CDN"],
    metric: "400+ live streams",
  },
  {
    id: "yet-another-chatting-software",
    title: "YACS (Yet Another Chatting Software)",
    description:
      "Chat with anyone without sharing contacts - built during lockdown. PWA with smooth animations and offline support.",
    technologies: ["React", "TypeScript", "WebRTC", "WebSocket", "Node.js", "MongoDB", "Protobuf", "PWA"],
    metric: "Native-Smooth Performance",
    link: "https://yacs.in",
  },
  {
    id: "os2",
    title: "react-read-otp",
    description: "React hook for automatic OTP input handling. Used by 1.2k+ projects weekly.",
    technologies: ["React", "TypeScript", "WebOTP API"],
    metric: "1.2k+ Weekly Downloads",
    npm: "https://www.npmjs.com/package/react-read-otp",
    github: "https://github.com/md-adil/react-read-otp",
  },
  {
    id: "os3",
    title: "Minima.js – Lightweight Node.js Framework",
    description: "Lightweight Node.js framework built for speed. TypeScript-first, functional approach.",
    technologies: ["Node.js", "TypeScript", "Functional Programming"],
    metric: "High Throughput / Open Source",
    link: "https://minima-js.github.io",
    github: "https://github.com/minima-js/minimajs",
  },
  {
    id: "os4-ebx",
    title: "ebx",
    description: "Fast TypeScript/ESM compiler. Zero config, just works.",
    technologies: ["TypeScript", "ESBuild", "ESM"],
    metric: "Zero Config",
    npm: "https://www.npmjs.com/package/ebx",
    github: "https://github.com/md-adil/ebx",
  },
];
