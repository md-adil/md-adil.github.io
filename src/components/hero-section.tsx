"use client";

import { ArrowRight, ChevronDown, Server, Users, Clock } from "lucide-react";
import { PORTFOLIO_DATA, SectionId } from "@/data/portfolio-data";

export function HeroSection() {
  return (
    <section id={SectionId.HERO} className="min-h-screen flex items-center pt-20 bg-slate-50 relative overflow-hidden">
      {/* Background Pattern - Dot Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#0f172a 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>

      {/* Abstract decorative shapes */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-slate-100/50 -skew-x-12 transform translate-x-1/3 z-0"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-blue-50/50 skew-y-12 transform -translate-x-20 z-0"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Left Column: Text Content */}
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-bold tracking-wide animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Available for Hire
            </div>

            <h1 className="text-4xl py-4 md:text-5xl font-serif font-bold text-slate-900 leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
              Building the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Digital Backbone</span> of Modern Enterprise.
            </h1>

            <p className="text-xl text-slate-600 leading-relaxed mb-10 font-light max-w-xl">{PORTFOLIO_DATA.tagline}</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#case-studies"
                className="px-8 py-4 bg-slate-900 text-white font-medium rounded hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                View Case Studies <ArrowRight size={18} />
              </a>
              <a
                href="#contact"
                className="px-8 py-4 bg-white border border-slate-200 text-slate-900 font-medium rounded hover:bg-slate-50 transition-all flex items-center justify-center hover:-translate-y-1"
              >
                Contact Me
              </a>
            </div>
          </div>

          {/* Right Column: Visual Stats Cards */}
          <div className="lg:w-1/2 w-full relative">
            {/* Decorative background circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/40 rounded-full blur-3xl -z-10"></div>

            <div className="grid grid-cols-2 gap-8 relative">
              {/* Card 1: Experience - Pushed down via margin for stagger effect */}
              <div className="relative bg-white p-8 rounded-2xl shadow-xl border border-slate-100 lg:mt-12 hover:-translate-y-1 hover:z-10 transition-all duration-300">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 text-blue-600">
                  <Clock size={24} />
                </div>
                <div className="text-4xl font-bold text-slate-900 mb-2">{PORTFOLIO_DATA.stats.years}</div>
                <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">Experience</div>
                <p className="text-sm text-slate-400 mt-2">Delivering scalable engineering solutions.</p>
              </div>

              {/* Card 2: Uptime (Dark themed) */}
              <div className="relative bg-slate-900 p-8 rounded-2xl shadow-xl hover:-translate-y-1 hover:z-10 transition-all duration-300 text-white">
                <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-4 text-blue-400">
                  <Server size={24} />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{PORTFOLIO_DATA.stats.uptime}</div>
                <div className="text-sm text-slate-400 font-bold uppercase tracking-wider">System Uptime</div>
                <p className="text-sm text-slate-500 mt-2">Maintaining critical infrastructure stability.</p>
              </div>

              {/* Card 3: Users (Spans full width) */}
              <div className="relative col-span-2 bg-white p-8 rounded-2xl shadow-xl border border-slate-100 hover:-translate-y-1 hover:z-10 transition-all duration-300 flex items-center justify-between">
                <div>
                  <div className="text-4xl font-bold text-slate-900 mb-1">{PORTFOLIO_DATA.stats.users}</div>
                  <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">Users Served</div>
                </div>
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                  <Users size={32} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-slate-400">
        <ChevronDown size={24} />
      </div>
    </section>
  );
}
