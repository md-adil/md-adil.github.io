"use client";

import { Layers, ShieldCheck, Server, Code } from 'lucide-react';
import { PORTFOLIO_DATA, SectionId } from '@/data/portfolio-data';
import { SectionHeading } from './section-heading';

export function AboutSection() {
  return (
    <section id={SectionId.ABOUT} className="py-24 bg-slate-50">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading
          title="Philosophy"
          subtitle="Simplicity is the ultimate sophistication in system design."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              {PORTFOLIO_DATA.about}
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              I believe that software architecture is not just about choosing the right tools,
              but about understanding the trade-offs between consistency, availability, and
              partition tolerance in the context of specific business goals.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {[
              { icon: Layers, title: "Modular", desc: "Decoupled systems for independent scalability." },
              { icon: ShieldCheck, title: "Resilient", desc: "Design for failure, recover automatically." },
              { icon: Server, title: "Scalable", desc: "Elastic infrastructure that grows with demand." },
              { icon: Code, title: "Pragmatic", desc: "Right tool for the right job, no dogma." },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <item.icon className="w-8 h-8 text-slate-800 mb-4" />
                <h3 className="font-serif font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
