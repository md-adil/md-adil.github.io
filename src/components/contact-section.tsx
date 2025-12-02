"use client";

import { Mail, Linkedin, Github, Phone, MapPin, X as Twitter } from "lucide-react";
import { SectionId } from "@/data";

export function ContactSection() {
  return (
    <section id={SectionId.CONTACT} className="py-24 bg-slate-50">
      <div className="container mx-auto px-6 md:px-12 text-center max-w-3xl">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-6">Let's Build Something Durable.</h2>
        {/* <p className="text-slate-600 text-lg mb-10">I am currently open to consulting engagements and senior leadership roles.</p> */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <a href="mailto:adil.sudo@gmail.com" className="flex items-center gap-2 text-slate-800 hover:text-slate-600 font-medium transition-colors">
            <Mail size={20} /> adil.sudo@gmail.com
          </a>
          <a href="tel:+919818128797" className="flex items-center gap-2 text-slate-800 hover:text-slate-600 font-medium transition-colors">
            <Phone size={20} /> +91 98 18 128797
          </a>
          <a
            href="https://linkedin.com/in/md-adil"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-800 hover:text-slate-600 font-medium transition-colors"
          >
            <Linkedin size={20} /> LinkedIn
          </a>
          <a
            href="https://github.com/md-adil"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-800 hover:text-slate-600 font-medium transition-colors"
          >
            <Github size={20} /> GitHub
          </a>
        </div>
        <p className="text-sm text-slate-400">
          <MapPin size={14} className="inline mr-1" />
          Pune Maharashtra, India
        </p>
      </div>
    </section>
  );
}
