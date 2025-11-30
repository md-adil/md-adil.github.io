import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { domain, experienceYears } from "@/config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Adil - Sr. Software Architect | Backend, Cloud & DevOps Expert",
  description: `Sr. Software Architect specializing in scalable backend systems, cloud infrastructure (Kubernetes, AWS, Azure), and DevOps. ${experienceYears} years experience in PHP, Laravel, Node.js, Go, and microservices architecture. Creator of react-read-otp (1.2k+ weekly downloads).`,
  keywords: [
    "Software Architect",
    "Backend Developer",
    "DevOps Engineer",
    "Kubernetes",
    "Laravel",
    "Node.js",
    "Microservices",
    "Cloud Infrastructure",
    "Terraform",
    "PHP Developer",
    "TypeScript",
    "React",
    "GitOps",
    "ArgoCD",
    "Performance Optimization",
  ],
  authors: [{ name: "Adil", url: "https://github.com/md-adil" }],
  creator: "Adil",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Adil - Sr. Software Architect | Backend, Cloud & DevOps Expert",
    description: `Sr. Software Architect specializing in scalable backend systems, cloud infrastructure, and DevOps. Expert in Laravel, Node.js, Kubernetes, and microservices. ${experienceYears} years experience.`,
    type: "website",
    url: domain,
    siteName: "Adil - Software Architect Portfolio",
    images: [
      {
        url: `${domain}/images/adil-portrait.jpg`,
        width: 1200,
        height: 630,
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
    images: [`${domain}/images/adil-portrait.jpg`],
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
