"use client";

import { ArrowRight, ChevronDown, Server, Users, Clock } from "lucide-react";
import { personalInfo, SectionId } from "@/data";
import { Button, DownloadButton } from "./ui/button";
import { toFullURL } from "@/config";

export function HeroSection() {
  return (
    <section
      id={SectionId.HERO}
      className="relative flex min-h-screen items-center overflow-hidden bg-slate-50 pt-20"
      aria-label="Hero introduction"
    >
      {/* Background Pattern - Dot Grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(#0f172a 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      ></div>

      {/* Abstract decorative shapes */}
      <div className="absolute right-0 top-0 z-0 h-full w-2/3 translate-x-1/3 -skew-x-12 transform bg-slate-100/90"></div>
      <div className="absolute bottom-0 left-0 z-0 h-1/2 w-1/3 -translate-x-20 skew-y-12 transform bg-blue-50/90"></div>

      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:gap-24">
          {/* Left Column: Text Content */}
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-bold tracking-wide text-blue-700 duration-700 animate-in fade-in slide-in-from-bottom-4">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
              </span>
              Exploring Innovative Teams
            </div>

            <h1 className="py-4 font-serif text-4xl font-bold leading-[1.1] text-primary delay-100 duration-700 animate-in fade-in slide-in-from-bottom-6 md:text-5xl">
              Architecting{" "}
              <span className="bg-gradient-to-r from-secondary to-indigo-600 bg-clip-text text-transparent">
                scalable systems
              </span>{" "}
              and cloud-native platforms.
            </h1>

            <p className="mb-10 max-w-xl text-xl font-light leading-relaxed text-body">{personalInfo.tagline}</p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                className="h-auto px-8 py-4 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <a href="#case-studies">
                  View Case Studies <ArrowRight size={18} />
                </a>
              </Button>

              <DownloadButton
                name="Resume"
                filename="Adil_Senior_Software_Architect_Resume.pdf"
                url={toFullURL("/resume/software-architect.pdf")}
              >
                Download Resume
              </DownloadButton>
            </div>
          </div>

          {/* Right Column: Visual Stats Cards */}
          <div className="relative w-full lg:w-1/2">
            {/* Decorative background circle */}
            <div className="absolute left-1/2 top-1/2 -z-10 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 blur-3xl"></div>

            <div className="relative grid grid-cols-2 gap-4">
              {/* Card 1: Experience - Pushed down via margin for stagger effect */}
              <div className="relative rounded-2xl border border-slate-100 bg-white p-4 shadow-xl transition-all duration-300 hover:z-10 hover:-translate-y-1 md:p-8 lg:mt-12">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-secondary">
                  <Clock size={24} aria-hidden="true" />
                </div>
                <div className="mb-2 text-4xl font-bold text-primary">{personalInfo.stats.years} </div>
                <div className="text-sm font-bold uppercase tracking-wider text-muted">Years Experience</div>
                <p className="mt-2 text-sm text-muted">Delivering scalable engineering solutions.</p>
              </div>

              {/* Card 2: Uptime (Dark themed) */}
              <div className="relative rounded-2xl bg-primary p-4 text-white shadow-xl transition-all duration-300 hover:z-10 hover:-translate-y-1 md:p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-blue-400">
                  <Server size={24} aria-hidden="true" />
                </div>
                <div className="mb-2 text-4xl font-bold text-white">{personalInfo.stats.uptime}</div>
                <div className="text-sm font-bold uppercase tracking-wider text-muted">System Uptime</div>
                <p className="mt-2 text-sm text-muted">Maintaining critical infrastructure stability.</p>
              </div>

              {/* Card 3: Users (Spans full width) */}
              <div className="relative col-span-2 mb-4 flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 shadow-xl transition-all duration-300 hover:z-10 hover:-translate-y-1 md:p-8">
                <div>
                  <div className="mb-1 text-4xl font-bold text-primary">{personalInfo.stats.users}</div>
                  <div className="text-sm font-bold uppercase tracking-wider text-muted">Users Served</div>
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-secondary">
                  <Users size={32} aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce text-muted">
        <ChevronDown size={24} aria-hidden="true" />
      </div>
    </section>
  );
}
