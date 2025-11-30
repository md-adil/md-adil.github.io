import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

const domain = "https://md-adil.github.io";

export const metadata: Metadata = {
  title: "Adil - Sr. Software Architect | Portfolio",
  description:
    "Sr. Software Architect passionate about building scalable solutions. Expert in React, TypeScript, PHP, and cloud technologies.",
  authors: [{ name: "Adil" }],
  openGraph: {
    title: "Adil - Sr. Software Architect | Portfolio",
    description:
      "Sr. Software Architect passionate about building scalable solutions. Expert in React, TypeScript, PHP, and cloud technologies.",
    type: "website",
    images: [`${domain}/images/adil-portrait.jpg`],
  },
  twitter: {
    card: "summary_large_image",
    site: "@_MdAdil",
    images: [`${domain}/images/adil-portrait.jpg`],
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
