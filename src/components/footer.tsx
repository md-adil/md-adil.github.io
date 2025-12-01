"use client";

import { PORTFOLIO_DATA } from '@/data/portfolio-data';

export function Footer() {
  return (
    <footer className="py-6 bg-white border-t border-slate-100">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <p className="text-sm text-slate-400">
          © {new Date().getFullYear()} {PORTFOLIO_DATA.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
