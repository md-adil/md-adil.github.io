"use client";

import { GraduationCap, Award } from "lucide-react";
import { certifications, education, SectionId } from "@/data";
import { SectionHeading } from "./section-heading";

export function EducationSection() {
  return (
    <section id={SectionId.EDUCATION} className="bg-white py-24">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading
          title="Education & Credentials"
          subtitle="Academic foundation and industry-recognized certifications."
        />

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Academic Degrees */}
          <div>
            <div className="mb-8 flex items-center gap-3">
              <GraduationCap className="text-secondary h-6 w-6" />
              <h3 className="text-primary text-xl font-bold tracking-widest uppercase">Academic</h3>
            </div>

            <div className="space-y-10">
              {education.map((edu) => (
                <div key={edu.id} className="relative border-l-2 border-slate-100 pl-6">
                  <div className="absolute top-2 -left-[5px] h-2.5 w-2.5 rounded-full bg-slate-300"></div>
                  <h4 className="text-primary mb-1 font-serif text-xl font-bold">{edu.institution}</h4>
                  <p className="mb-1 text-lg font-medium text-slate-700">{edu.degree}</p>
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span>{edu.year}</span>
                    {edu.details && <span className="italic">{edu.details}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <div className="mb-8 flex items-center gap-3">
              <Award className="text-secondary h-6 w-6" />
              <h3 className="text-primary text-xl font-bold tracking-widest uppercase">Certifications</h3>
            </div>

            <div className="grid gap-6">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="border border-slate-100 bg-slate-50 p-6 transition-colors hover:border-blue-200"
                >
                  <h4 className="text-primary mb-2 text-lg font-bold">{cert.degree}</h4>
                  <div className="flex items-center justify-between text-sm text-slate-500">
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
