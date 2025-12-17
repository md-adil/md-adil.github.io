"use client";

import { Terminal, Globe, Cpu, Layout, GitBranch, Server, Database, Shield } from "lucide-react";
import { SectionId, skills } from "@/data";
import { SectionHeading } from "./section-heading";
import { Chip } from "./ui/chip";
import { Expandable } from "./ui/expandable";

export function SkillsSection() {
  const getIcon = (category: string) => {
    const lower = category.toLowerCase();
    if (lower.includes("orchestration") || lower.includes("container")) return <Cpu className="h-6 w-6" />;
    if (lower.includes("infrastructure") || lower.includes("cloud")) return <Globe className="h-6 w-6" />;
    if (lower.includes("stack") || lower.includes("web") || lower.includes("frontend") || lower.includes("full"))
      return <Layout className="h-6 w-6" />;
    if (lower.includes("observability") || lower.includes("devops")) return <Terminal className="h-6 w-6" />;
    if (lower.includes("ci/cd")) return <GitBranch className="h-6 w-6" />;
    if (lower.includes("data") || lower.includes("database")) return <Database className="h-6 w-6" />;
    if (lower.includes("security")) return <Shield className="h-6 w-6" />;
    return <Server className="h-6 w-6" />;
  };

  return (
    <section id={SectionId.SKILLS} className="bg-slate-50 py-24">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading
          title="Technical Expertise"
          subtitle="A comprehensive toolkit for building scalable, resilient systems."
        />

        <Expandable
          title="Technical Expertise"
          modalClassName="bg-slate-50"
          count={4}
          className="grid grid-cols-1 gap-8 md:grid-cols-2"
        >
          {skills.map((category, idx) => (
            <div
              key={String(idx)}
              className="group hover:border-secondary rounded-none border-l-4 border-slate-200 bg-white p-8 shadow-xs transition-all duration-300"
            >
              <div className="mb-8 flex items-center gap-4">
                <div className="group-hover:text-secondary rounded-full border border-slate-100 bg-slate-50 p-3 text-slate-600 transition-colors group-hover:bg-blue-50">
                  {getIcon(category.category)}
                </div>
                <h3 className="text-primary font-serif text-xl font-bold">{category.category}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIdx) => (
                  <Chip key={sIdx}>{skill}</Chip>
                ))}
              </div>
            </div>
          ))}
        </Expandable>
      </div>
    </section>
  );
}
