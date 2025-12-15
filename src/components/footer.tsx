"use client";

import { personalInfo } from "@/data";

export function Footer() {
  return (
    <footer className="py-6 bg-white border-t border-slate-100">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
