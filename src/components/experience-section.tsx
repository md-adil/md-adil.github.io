"use client";

import { Calendar, Briefcase } from "lucide-react";
import { experiences, SectionId } from "@/data";
import { SectionHeading } from "./section-heading";

export function ExperienceSection() {
  return (
    <section id={SectionId.EXPERIENCE} className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading title="Professional Experience" subtitle="A track record of delivering scalable solutions in complex environments." />

        <div className="space-y-12">
          {experiences.map((exp) => (
            <div key={exp.id} className="group relative border-l-2 border-slate-100 pl-8 md:pl-12 pb-2 last:pb-0">
              {/* Timeline Dot */}
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-slate-200 group-hover:border-blue-500 transition-colors"></div>

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-primary group-hover:text-blue-700 transition-colors">{exp.role}</h3>
                  <div className="text-lg text-slate-600 font-medium flex items-center gap-2 mt-1">
                    <Briefcase size={16} /> {exp.company}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-slate-500 font-medium bg-slate-50 px-3 py-1 rounded-full self-start">
                  <Calendar size={14} />
                  <span className="text-sm">{exp.period}</span>
                </div>
              </div>

              <p className="text-slate-600 mb-6 leading-relaxed text-lg max-w-4xl">{exp.description}</p>

              <div className="space-y-3">
                {exp.highlights.map((highlight, hIndex) => (
                  <div key={hIndex} className="flex items-start gap-3 text-slate-700">
                    <span className="mt-2 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

              {exp.technologies.length > 0 && (
                <div className="flex flex-wrap mt-4 gap-1.5">
                  {exp.technologies.map((tech, tIndex) => (
                    <span key={tIndex} className="px-2.5 py-0.5 bg-slate-50 text-slate-700 rounded-full text-sm border border-slate-200 hover:bg-slate-100 transition-colors">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
