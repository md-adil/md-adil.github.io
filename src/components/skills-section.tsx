"use client";

import { Terminal, Globe, Cpu, Layout, GitBranch, Server, Database, Shield } from "lucide-react";
import { SectionId, skills } from "@/data";
import { SectionHeading } from "./section-heading";

export function SkillsSection() {
  const getIcon = (category: string) => {
    const lower = category.toLowerCase();
    if (lower.includes("orchestration") || lower.includes("container")) return <Cpu className="w-6 h-6" />;
    if (lower.includes("infrastructure") || lower.includes("cloud")) return <Globe className="w-6 h-6" />;
    if (lower.includes("stack") || lower.includes("web") || lower.includes("frontend") || lower.includes("full")) return <Layout className="w-6 h-6" />;
    if (lower.includes("observability") || lower.includes("devops")) return <Terminal className="w-6 h-6" />;
    if (lower.includes("ci/cd")) return <GitBranch className="w-6 h-6" />;
    if (lower.includes("data") || lower.includes("database")) return <Database className="w-6 h-6" />;
    if (lower.includes("security")) return <Shield className="w-6 h-6" />;
    return <Server className="w-6 h-6" />;
  };

  return (
    <section id={SectionId.SKILLS} className="py-24 bg-slate-50">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading title="Technical Expertise" subtitle="A comprehensive toolkit for building scalable, resilient systems." />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((category, idx) => (
            <div key={String(idx)} className="bg-white p-8 rounded-none border-l-4 border-slate-200 hover:border-blue-600 shadow-sm transition-all duration-300 group">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-slate-50 rounded-full text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors border border-slate-100">
                  {getIcon(category.category)}
                </div>
                <h3 className="text-xl font-serif font-bold text-slate-900">{category.category}</h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-4 py-2 bg-slate-50 text-slate-700 text-sm font-medium border border-slate-100 group-hover:border-slate-200 group-hover:bg-slate-100 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
