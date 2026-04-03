"use client";

import { GraduationCap, Award } from "lucide-react";
import { certifications, education, SectionId } from "@/data";
import { SectionHeading } from "./section-heading";
import { MotionSection, StaggerGroup, StaggerItem, fadeLeft } from "./ui/motion";
import { AnimatedBackground } from "./ui/animated-background";

export function EducationSection() {
  return (
    <section id={SectionId.EDUCATION} className="relative overflow-hidden bg-white py-24">
      <AnimatedBackground variant="dots" />
      <div className="relative z-10 container mx-auto px-6 md:px-12">
        <SectionHeading
          title="Education & Credentials"
          subtitle="Academic foundation and industry-recognized certifications."
        />

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Academic Degrees */}
          <div>
            <MotionSection className="mb-8 flex items-center gap-3">
              <GraduationCap className="text-secondary h-6 w-6" />
              <h3 className="text-primary text-xl font-bold tracking-widest uppercase">Academic</h3>
            </MotionSection>

            <div className="space-y-10">
              {education.map((edu) => (
                <MotionSection
                  key={edu.id}
                  variants={fadeLeft}
                  className="group relative border-l-2 border-slate-100 pl-6 transition-colors duration-300 hover:border-blue-200"
                >
                  <div className="absolute top-2 -left-[5px] h-2.5 w-2.5 rounded-full bg-slate-300 transition-all duration-300 group-hover:scale-150 group-hover:bg-blue-500"></div>
                  <h4 className="text-primary mb-1 font-serif text-xl font-bold">{edu.institution}</h4>
                  <p className="mb-2 text-lg font-medium text-slate-700">{edu.degree}</p>
                  <span className="inline-block rounded-full bg-slate-100 px-3 py-0.5 text-xs font-bold tracking-wide text-slate-600">
                    {edu.year}
                  </span>
                  {edu.details && <p className="mt-3 text-sm leading-relaxed text-slate-500 italic">{edu.details}</p>}
                </MotionSection>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <MotionSection className="mb-8 flex items-center gap-3">
              <Award className="text-secondary h-6 w-6" />
              <h3 className="text-primary text-xl font-bold tracking-widest uppercase">Certifications</h3>
            </MotionSection>

            <StaggerGroup className="grid gap-6">
              {certifications.map((cert) => (
                <StaggerItem key={cert.id}>
                  <div className="group border border-slate-100 bg-slate-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md">
                    <h4 className="text-primary mb-2 text-lg font-bold">{cert.degree}</h4>
                    <div className="mb-3 flex items-center justify-between text-sm text-slate-500">
                      <span>{cert.institution}</span>
                      <span className="rounded-full bg-slate-200 px-3 py-0.5 text-xs font-bold text-slate-600">
                        {cert.year}
                      </span>
                    </div>
                    {cert.details && (
                      <div className="flex flex-wrap gap-1.5 border-t border-slate-100 pt-3">
                        {cert.details.split(",").map((detail, i) => (
                          <span
                            key={i}
                            className="rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-xs font-medium text-slate-600"
                          >
                            {detail.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
