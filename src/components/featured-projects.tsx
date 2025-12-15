"use client";

import { ArrowUpRight } from "lucide-react";
import { projects, SectionId } from "@/data";
import { SectionHeading } from "./section-heading";

export function FeaturedProjects() {
  return (
    <section id={SectionId.PROJECTS} className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading title="Selected Works" subtitle="Key projects that demonstrate capability in large-scale system architecture." />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-white p-8 rounded-none border-l-4 border-slate-200 hover:border-secondary shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border-t border-r border-b border-t-slate-100 border-r-slate-100 border-b-slate-100"
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-serif font-bold text-primary group-hover:text-blue-700 transition-colors leading-tight">{project.title}</h3>
                <ArrowUpRight className="text-slate-300 group-hover:text-secondary transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-1" size={24} />
              </div>

              <p className="text-slate-600 mb-8 leading-relaxed flex-grow">{project.description}</p>

              <div className="space-y-6 mt-auto">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-50 text-slate-600 text-xs font-bold uppercase tracking-wide border border-slate-100">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-6 border-t border-slate-50">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Impact</p>
                  <p className="text-xl font-bold text-primary">{project.metric}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
