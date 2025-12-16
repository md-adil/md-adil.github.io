import { Project } from "./types";

export const projects: Project[] = [
  {
    id: "high-performance-on-demand-image-service",
    title: "High-Performance On-Demand Image Service",
    description: `A high-concurrency image processing service in Go handling 100,000 requests per minute. Features real-time resizing via query parameters and automatic format conversion (WebP, AVIF). AWS CDN caching enables millions of requests with minimal origin load through edge delivery of repeated transformations.`,
    technologies: ["Go", "Kubernetes", "CDN"],
    metric: "100K req/min",
    github: "https://github.com/md-adil/image-optimizer",
  },
  {
    id: "scalable-video-streaming-platform",
    title: "Scalable Video Streaming Platform (Live & VOD)",
    description: `A video streaming platform supporting 400+ concurrent live streams for millions of users. Implements RTMP/NGINX ingestion with HLS adaptive delivery, DRM for premium content, and token-based CDN authentication. Kubernetes deployment enables horizontal scaling and high availability under peak traffic.`,
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
