"use client";

import { Mail, Linkedin, Github, Phone, MapPin, Hexagon as IconNode, MessageCircle as ChatIcon } from "lucide-react";
import { SectionId } from "@/data";
import { ReactNode } from "react";

interface SocialIconProps {
  href: string;
  icon: ReactNode;
  name: string;
}
function SocialIcon({ href, name, icon }: SocialIconProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary hover:text-body focus:ring-primary flex items-center gap-2 rounded-xs font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-hidden"
    >
      {icon} {name}
    </a>
  );
}

export function ContactSection() {
  return (
    <section id={SectionId.CONTACT} className="bg-slate-50 py-24" aria-labelledby="contact-heading">
      <div className="container mx-auto max-w-3xl px-6 text-center md:px-12">
        <h2 id="contact-heading" className="mb-6 font-serif text-3xl font-bold text-slate-900 md:text-5xl">
          Let's Build Something Durable.
        </h2>
        {/* <p className="text-slate-600 text-lg mb-10">I am currently open to consulting engagements and senior leadership roles.</p> */}
        <div className="mb-12 flex flex-wrap justify-center gap-6">
          <a
            href="mailto:adil.sudo@gmail.com"
            className="text-primary hover:text-body focus:ring-primary flex items-center gap-2 rounded-xs font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-hidden"
          >
            <Mail size={20} aria-hidden="true" /> adil.sudo@gmail.com
          </a>
          <a
            href="tel:+919818128797"
            className="text-primary hover:text-body focus:ring-primary flex items-center gap-2 rounded-xs font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-hidden"
          >
            <Phone size={20} aria-hidden="true" /> +91 98 18 128797
          </a>
          <a
            href="https://linkedin.com/in/md-adil"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-body focus:ring-primary flex items-center gap-2 rounded-xs font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-hidden"
          >
            <Linkedin size={20} aria-hidden="true" /> LinkedIn
          </a>
          <a
            href="https://github.com/md-adil"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-body focus:ring-primary flex items-center gap-2 rounded-xs font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-hidden"
          >
            <Github size={20} aria-hidden="true" /> GitHub
          </a>
          <SocialIcon
            href="https://www.npmjs.com/~adil.sudo"
            icon={<IconNode size={20} aria-hidden="true" />}
            name="NpmJS"
          />
          <SocialIcon href="https://yacs.in/@/admin" icon={<ChatIcon size={20} aria-hidden="true" />} name="Chat" />
        </div>
        <p className="text-muted text-sm">
          <MapPin size={14} className="mr-1 inline" aria-hidden="true" />
          Pune Maharashtra, India
        </p>
      </div>
    </section>
  );
}
