"use client";

import { Calendar, Briefcase } from "lucide-react";
import { experiences, SectionId } from "@/data";
import { SectionHeading } from "./section-heading";
import { Expandable } from "./ui/expandable";

export function ExperienceSection() {
  return (
    <section id={SectionId.EXPERIENCE} className="bg-white py-24">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading
          title="Professional Experience"
          subtitle="A track record of delivering scalable solutions in complex environments."
        />

        <Expandable title="Experiences" initialCount={3} className="space-y-12 pl-3">
          {experiences.map((exp) => (
            <div key={exp.id} className="group relative border-l-2 border-slate-100 pb-2 pl-8 last:pb-0 md:pl-12">
              {/* Timeline Dot */}
              <div className="absolute top-0 -left-2.25 h-4 w-4 rounded-full border-4 border-slate-200 bg-white transition-colors group-hover:border-blue-500"></div>

              <div className="mb-4 flex flex-col justify-between gap-4 md:flex-row md:items-start">
                <div>
                  <h3 className="text-primary font-serif text-2xl font-bold transition-colors group-hover:text-blue-700">
                    {exp.role}
                  </h3>
                  <div className="mt-1 flex items-center gap-2 text-lg font-medium text-slate-600">
                    <Briefcase size={16} /> {exp.company}
                  </div>
                </div>
                <div className="flex items-center gap-2 self-start rounded-full bg-slate-50 px-3 py-1 font-medium text-slate-500">
                  <Calendar size={14} />
                  <span className="text-sm">{exp.period}</span>
                </div>
              </div>

              <p className="mb-6 max-w-4xl text-lg leading-relaxed text-slate-600">{exp.description}</p>

              <div className="space-y-3">
                {exp.highlights.map((highlight, hIndex) => (
                  <div key={hIndex} className="flex items-start gap-3 text-slate-700">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500"></span>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

              {exp.technologies.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {exp.technologies.map((tech, tIndex) => (
                    <span
                      key={tIndex}
                      className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-sm text-slate-700 transition-colors hover:bg-slate-100"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </Expandable>
      </div>
    </section>
  );
}
