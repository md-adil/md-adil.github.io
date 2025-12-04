import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import "./globals.css";
import { domain, experienceYears } from "@/config";
import { personalInfo } from "@/data";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Adil - Sr. Software Architect | Backend, Cloud & DevOps Expert",
  description: `Sr. Software Architect specializing in scalable backend systems, cloud infrastructure (Kubernetes, AWS, Azure), and DevOps. ${personalInfo.stats.years} years experience in PHP, Laravel, Node.js, Go, and microservices architecture. Creator of react-read-otp (1.2k+ weekly downloads).`,
  keywords: [
    "Software Architect",
    "Backend Developer",
    "DevOps Engineer",
    "Kubernetes",
    "Laravel",
    "Node.js",
    "Go",
    "Golang",
    "Microservices",
    "Cloud Infrastructure",
    "AWS",
    "Azure",
    "PHP Developer",
    "TypeScript",
    "React",
    "GitOps",
    "ArgoCD",
    "CI/CD",
    "Docker",
    "Jenkins",
    "System Design",
    "Performance Optimization",
    "Agentic AI",
    "Technical Leadership",
    "Grafana",
    "ELK Stack",
    "Laravel Octane",
    "Swoole",
    "Real-time Systems",
  ],
  authors: [{ name: "Adil", url: "https://github.com/md-adil" }],
  creator: "Adil",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Adil — Senior Software Architect for Backend, Cloud & Kubernetes",
    description: `Building scalable backend systems, cloud infrastructure, Kubernetes platforms, CI/CD pipelines, and microservices. Skilled in PHP, Laravel, Node.js, Go, Docker.`,
    type: "website",
    url: domain,
    siteName: "Adil - Software Architect Portfolio",
    images: [
      {
        url: `${domain}/images/portrait.png`,
        width: 1080,
        height: 720,
        alt: "Adil - Sr. Software Architect",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@_MdAdil",
    creator: "@_MdAdil",
    title: "Adil - Sr. Software Architect | Backend, Cloud & DevOps Expert",
    description: `Specializing in scalable backend systems, cloud infrastructure (Kubernetes, AWS, Azure), and DevOps. ${experienceYears} years experience.`,
    images: [`${domain}/images/portrait.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: domain,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <GoogleTagManager gtmId="GTM-WPLM73C" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        <>{children}</>
      </body>
    </html>
  );
}
