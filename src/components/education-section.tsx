"use client";

import { GraduationCap, Award } from "lucide-react";
import { certifications, education, SectionId } from "@/data";
import { SectionHeading } from "./section-heading";

export function EducationSection() {
  return (
    <section id={SectionId.EDUCATION} className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading title="Education & Credentials" subtitle="Academic foundation and industry-recognized certifications." />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Academic Degrees */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-bold text-slate-900 uppercase tracking-widest">Academic</h3>
            </div>

            <div className="space-y-10">
              {education.map((edu) => (
                <div key={edu.id} className="relative pl-6 border-l-2 border-slate-100">
                  <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                  <h4 className="text-xl font-serif font-bold text-slate-900 mb-1">{edu.institution}</h4>
                  <p className="text-lg text-slate-700 font-medium mb-1">{edu.degree}</p>
                  <div className="flex justify-between items-center text-sm text-slate-500">
                    <span>{edu.year}</span>
                    {edu.details && <span className="italic">{edu.details}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Award className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-bold text-slate-900 uppercase tracking-widest">Certifications</h3>
            </div>

            <div className="grid gap-6">
              {certifications.map((cert) => (
                <div key={cert.id} className="p-6 bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors">
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{cert.degree}</h4>
                  <div className="flex justify-between items-center text-sm text-slate-500">
                    <span>{cert.institution}</span>
                    <span>{cert.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
