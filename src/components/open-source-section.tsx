"use client";

import { Package, Globe, Cpu, ExternalLink } from "lucide-react";
import { projects, SectionId } from "@/data";
import { SectionHeading } from "./section-heading";
import { Button } from "./ui/button";

// SVG for GitHub icon (since lucide's Github is deprecated)
const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

export function OpenSourceSection() {
  const getIcon = (id: string) => {
    if (id.includes("os1")) return <Globe className="w-5 h-5" />;
    if (id.includes("os2")) return <Package className="w-5 h-5" />;
    if (id.includes("os3")) return <Cpu className="w-5 h-5" />;
    return <GithubIcon className="w-5 h-5" />;
  };

  return (
    <section id={SectionId.PROJECTS} className="py-24 bg-slate-50">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading title="Open Source & Personal Projects" subtitle="Building tools and applications to solve real-world developer problems." />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white p-6 rounded border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-100 rounded text-slate-700">{getIcon(project.id)}</div>
                  <h3 className="text-xl font-bold text-primary">{project.title}</h3>
                </div>
                <div className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wide rounded-full">{project.metric}</div>
              </div>

              <p className="text-slate-600 mb-6 flex-grow leading-relaxed">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="px-2 py-1 bg-slate-50 text-slate-500 text-xs font-medium border border-slate-100 rounded">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 mt-auto pt-4 border-t border-slate-100">
                {project.link && (
                  <Button variant="link" size="sm" asChild>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                      Website
                    </a>
                  </Button>
                )}
                {project.github && (
                  <Button variant="link" size="sm" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <GithubIcon className="w-4 h-4" />
                      GitHub
                    </a>
                  </Button>
                )}
                {project.npm && (
                  <Button variant="link" size="sm" asChild>
                    <a href={project.npm} target="_blank" rel="noopener noreferrer">
                      <Package className="w-4 h-4" />
                      NPM
                    </a>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
