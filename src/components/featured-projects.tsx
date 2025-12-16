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
              className="group hover:border-secondary flex h-full flex-col rounded-none border-t border-r border-b border-l-4 border-slate-200 border-t-slate-100 border-r-slate-100 border-b-slate-100 bg-white p-8 shadow-xs transition-all duration-300 hover:shadow-xl"
            >
              <div className="mb-6 flex items-start justify-between">
                <h3 className="text-primary font-serif text-2xl leading-tight font-bold transition-colors group-hover:text-blue-700">
                  {project.title}
                </h3>
                <ArrowUpRight
                  className="group-hover:text-secondary transform text-slate-300 transition-colors group-hover:translate-x-1 group-hover:-translate-y-1"
                  size={24}
                />
              </div>

              <p className="mb-8 grow leading-relaxed text-slate-600">{project.description}</p>

              <div className="mt-auto space-y-6">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="border border-slate-100 bg-slate-50 px-3 py-1 text-xs font-bold tracking-wide text-slate-600 uppercase"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="border-t border-slate-50 pt-6">
                  <p className="mb-1 text-xs font-bold tracking-widest text-slate-400 uppercase">Impact</p>
                  <p className="text-primary text-xl font-bold">{project.metric}</p>
                </div>
              </div>
            </div>
          ))}
        </ShowMore>
      </div>
    </section>
  );
}
