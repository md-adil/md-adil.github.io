"use client";

import { ArrowRight, ChevronDown, Server, Users, Clock } from "lucide-react";
import { personalInfo, SectionId } from "@/data";
import { ResumeButton } from "@/components/resume-button";
import { Button } from "./ui/button";

export function HeroSection() {
  return (
    <section id={SectionId.HERO} className="min-h-screen flex items-center pt-20 bg-slate-50 relative overflow-hidden" aria-label="Hero introduction">
      {/* Background Pattern - Dot Grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(#0f172a 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      ></div>

      {/* Abstract decorative shapes */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-slate-100/90 -skew-x-12 transform translate-x-1/3 z-0"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-blue-50/90 skew-y-12 transform -translate-x-20 z-0"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Left Column: Text Content */}
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-bold tracking-wide animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Exploring Innovative Teams
            </div>

            <h1 className="text-4xl py-4 md:text-5xl font-serif font-bold text-primary leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
              Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-indigo-600">scalable systems</span> and cloud-native platforms.
            </h1>

            <p className="text-xl text-body leading-relaxed mb-10 font-light max-w-xl">{personalInfo.tagline}</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all px-8 py-4 h-auto">
                <a href="#case-studies">
                  View Case Studies <ArrowRight size={18} />
                </a>
              </Button>

              <ResumeButton filename="Adil_Senior_Software_Architect_Resume.pdf" url="https://md-adil.github.io/resume/software-architect.pdf" />
            </div>
          </div>

          {/* Right Column: Visual Stats Cards */}
          <div className="lg:w-1/2 w-full relative">
            {/* Decorative background circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/40 rounded-full blur-3xl -z-10"></div>

            <div className="grid grid-cols-2 gap-4 relative">
              {/* Card 1: Experience - Pushed down via margin for stagger effect */}
              <div className="relative bg-white p-4 md:p-8  rounded-2xl shadow-xl border border-slate-100 lg:mt-12 hover:-translate-y-1 hover:z-10 transition-all duration-300">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 text-secondary">
                  <Clock size={24} aria-hidden="true" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">{personalInfo.stats.years} </div>
                <div className="text-sm text-muted font-bold uppercase tracking-wider">Years Experience</div>
                <p className="text-sm text-muted mt-2">Delivering scalable engineering solutions.</p>
              </div>

              {/* Card 2: Uptime (Dark themed) */}
              <div className="relative bg-primary p-4 md:p-8 rounded-2xl shadow-xl hover:-translate-y-1 hover:z-10 transition-all duration-300 text-white">
                <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-4 text-blue-400">
                  <Server size={24} aria-hidden="true" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{personalInfo.stats.uptime}</div>
                <div className="text-sm text-muted font-bold uppercase tracking-wider">System Uptime</div>
                <p className="text-sm text-muted mt-2">Maintaining critical infrastructure stability.</p>
              </div>

              {/* Card 3: Users (Spans full width) */}
              <div className="relative mb-4 col-span-2 bg-white p-4 md:p-8 rounded-2xl shadow-xl border border-slate-100 hover:-translate-y-1 hover:z-10 transition-all duration-300 flex items-center justify-between">
                <div>
                  <div className="text-4xl font-bold text-primary mb-1">{personalInfo.stats.users}</div>
                  <div className="text-sm text-muted font-bold uppercase tracking-wider">Users Served</div>
                </div>
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-secondary">
                  <Users size={32} aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-muted">
        <ChevronDown size={24} aria-hidden="true" />
      </div>
    </section>
  );
}
