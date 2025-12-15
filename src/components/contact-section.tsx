"use client";

import {
  Mail,
  Linkedin,
  Github,
  Phone,
  MapPin,
  Hexagon as IconNode,
  MessageCircle as ChatIcon,
} from "lucide-react";
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
      className="flex items-center gap-2 text-primary hover:text-body font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
    >
      {icon} {name}
    </a>
  );
}

export function ContactSection() {
  return (
    <section id={SectionId.CONTACT} className="py-24 bg-slate-50" aria-labelledby="contact-heading">
      <div className="container mx-auto px-6 md:px-12 text-center max-w-3xl">
        <h2 id="contact-heading" className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
          Let's Build Something Durable.
        </h2>
        {/* <p className="text-slate-600 text-lg mb-10">I am currently open to consulting engagements and senior leadership roles.</p> */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <a
            href="mailto:adil.sudo@gmail.com"
            className="flex items-center gap-2 text-primary hover:text-body font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
          >
            <Mail size={20} aria-hidden="true" /> adil.sudo@gmail.com
          </a>
          <a
            href="tel:+919818128797"
            className="flex items-center gap-2 text-primary hover:text-body font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
          >
            <Phone size={20} aria-hidden="true" /> +91 98 18 128797
          </a>
          <a
            href="https://linkedin.com/in/md-adil"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary hover:text-body font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
          >
            <Linkedin size={20} aria-hidden="true" /> LinkedIn
          </a>
          <a
            href="https://github.com/md-adil"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary hover:text-body font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
          >
            <Github size={20} aria-hidden="true" /> GitHub
          </a>
          <SocialIcon
            href="https://www.npmjs.com/~adil.sudo"
            icon={<IconNode size={20} aria-hidden="true" />}
            name="NpmJS"
          />
          <SocialIcon
            href="https://yacs.in/@/admin"
            icon={<ChatIcon size={20} aria-hidden="true" />}
            name="Chat"
          />
        </div>
        <p className="text-sm text-muted">
          <MapPin size={14} className="inline mr-1" aria-hidden="true" />
          Pune Maharashtra, India
        </p>
      </div>
    </section>
  );
}
