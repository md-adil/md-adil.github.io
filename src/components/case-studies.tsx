"use client";

import { CheckCircle2 } from "lucide-react";
import { caseStudies, SectionId } from "@/data";
import { SectionHeading } from "./section-heading";
import { ShowMore } from "./ui/show-more";
import { useId } from "react";

export function CaseStudies() {
  const id = useId();
  return (
    <section id={SectionId.CASE_STUDIES} className="bg-white py-24">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading
          title="Case Studies"
          subtitle="Deep dives into complex system challenges and delivered solutions."
        />

        <ShowMore initialCount={3} className="space-y-16">
          {caseStudies.map((study) => (
            <div
              id={id + study.id}
              key={study.id}
              className="flex flex-col gap-8 border-t border-slate-100 pt-12 first:border-0 first:pt-0 lg:flex-row lg:gap-16"
            >
              {/* Left Column: Context */}
              <div className="lg:w-1/3">
                <h3 className="mb-2 font-serif text-2xl font-bold text-primary">{study.title}</h3>
                <p className="mb-6 font-medium text-secondary">{study.client}</p>
                <div className="mb-6">
                  <h4 className="mb-3 text-sm font-bold uppercase tracking-widest text-muted">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {study.technologies.map((tech) => (
                      <span key={tech} className="bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Details */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:w-2/3">
                <div className="rounded border border-slate-100 bg-slate-50 p-6 transition-all hover:border-slate-200 hover:shadow-md">
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary">
                    The Challenge
                  </h4>
                  <p className="text-sm leading-relaxed text-body">{study.challenge}</p>
                </div>

                <div className="rounded border border-slate-100 bg-slate-50 p-6 transition-all hover:border-slate-200 hover:shadow-md">
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary">
                    The Solution
                  </h4>
                  <p className="text-sm leading-relaxed text-slate-600">{study.solution}</p>
                </div>

                <div className="md:col-span-2">
                  <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-primary">Key Outcomes</h4>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {study.results.map((result, rIdx) => (
                      <div key={rIdx} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                        <span className="text-sm font-medium text-body">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ShowMore>
      </div>
    </section>
  );
}
