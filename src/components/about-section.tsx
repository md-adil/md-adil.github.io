"use client";

import { Layers, ShieldCheck, Server, Code } from "lucide-react";
import { personalInfo, SectionId } from "@/data";
import { SectionHeading } from "./section-heading";

export function AboutSection() {
  return (
    <section id={SectionId.ABOUT} className="bg-slate-50 py-24" aria-labelledby="philosophy-heading">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading title="Philosophy" subtitle="Simplicity is the ultimate sophistication in system design." />

        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          <div>
            <p className="mb-6 text-lg leading-relaxed text-body">{personalInfo.about}</p>
            <p className="text-lg leading-relaxed text-body">
              I believe great system design comes from understanding trade-offs — consistency, availability, partition
              tolerance — and choosing what matters most for the business.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {[
              {
                icon: Layers,
                title: "Modular",
                desc: "Decoupled systems for independent scalability.",
              },
              {
                icon: ShieldCheck,
                title: "Resilient",
                desc: "Design for failure, recover automatically.",
              },
              {
                icon: Server,
                title: "Scalable",
                desc: "Elastic infrastructure that grows with demand.",
              },
              {
                icon: Code,
                title: "Pragmatic",
                desc: "Right tool for the right job, no dogma.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <item.icon className="mb-4 h-8 w-8 text-slate-800" />
                <h3 className="mb-2 font-serif font-bold text-primary">{item.title}</h3>
                <p className="text-sm text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
