"use client";

import { ArrowUpRight } from "lucide-react";
import { projects, SectionId } from "@/data";
import { SectionHeading } from "./section-heading";
import { ShowMore } from "./ui/show-more";

export function FeaturedProjects() {
  return (
    <section id={SectionId.PROJECTS} className="bg-white py-24">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading
          title="Selected Works"
          subtitle="Key projects that demonstrate capability in large-scale system architecture."
        />

        <ShowMore initialCount={6} className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group flex h-full flex-col rounded-none border-b border-l-4 border-r border-t border-slate-200 border-b-slate-100 border-r-slate-100 border-t-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:border-secondary hover:shadow-xl"
            >
              <div className="mb-6 flex items-start justify-between">
                <h3 className="font-serif text-2xl font-bold leading-tight text-primary transition-colors group-hover:text-blue-700">
                  {project.title}
                </h3>
                <ArrowUpRight
                  className="transform text-slate-300 transition-colors group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-secondary"
                  size={24}
                />
              </div>

              <p className="mb-8 flex-grow leading-relaxed text-slate-600">{project.description}</p>

              <div className="mt-auto space-y-6">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="border border-slate-100 bg-slate-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="border-t border-slate-50 pt-6">
                  <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">Impact</p>
                  <p className="text-xl font-bold text-primary">{project.metric}</p>
                </div>
              </div>
            </div>
          ))}
        </ShowMore>
      </div>
    </section>
  );
}
