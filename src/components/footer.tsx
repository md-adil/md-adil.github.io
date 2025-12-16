"use client";

import { personalInfo } from "@/data";

export function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white py-6">
      <div className="container mx-auto px-6 text-center md:px-12">
        <p className="text-muted text-sm">
          © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
