"use client";

import { CheckCircle2 } from "lucide-react";
import { caseStudies, SectionId } from "@/data";
import { SectionHeading } from "./section-heading";

export function CaseStudies() {
  return (
    <section id={SectionId.CASE_STUDIES} className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading title="Case Studies" subtitle="Deep dives into complex system challenges and delivered solutions." />

        <div className="space-y-16">
          {caseStudies.map((study) => (
            <div key={study.id} className="flex flex-col lg:flex-row gap-8 lg:gap-16 border-t border-slate-100 pt-12 first:border-0 first:pt-0">
              {/* Left Column: Context */}
              <div className="lg:w-1/3">
                <h3 className="text-2xl font-serif font-bold text-primary mb-2">{study.title}</h3>
                <p className="text-secondary font-medium mb-6">{study.client}</p>
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {study.technologies.map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-bold">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Details */}
              <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-slate-50 p-6 rounded border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all">
                  <h4 className="text-sm font-bold text-primary uppercase tracking-widest mb-3 flex items-center gap-2">The Challenge</h4>
                  <p className="text-slate-600 leading-relaxed text-sm">{study.challenge}</p>
                </div>

                <div className="bg-slate-50 p-6 rounded border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all">
                  <h4 className="text-sm font-bold text-primary uppercase tracking-widest mb-3 flex items-center gap-2">The Solution</h4>
                  <p className="text-slate-600 leading-relaxed text-sm">{study.solution}</p>
                </div>

                <div className="md:col-span-2">
                  <h4 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">Key Outcomes</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {study.results.map((result, rIdx) => (
                      <div key={rIdx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700 text-sm font-medium">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
