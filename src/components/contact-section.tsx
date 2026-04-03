"use client";

import { Mail, Phone, MapPin, MessageCircle as ChatIcon } from "lucide-react";
import { SectionId } from "@/data";
import { type ReactNode } from "react";
import { MotionSection, StaggerGroup, StaggerItem } from "./ui/motion";
import { LinkedinIcon, GithubIcon, NpmIcon } from "./icons";
import { AnimatedBackground } from "./ui/animated-background";

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
  const links = [
    {
      href: "mailto:adil.sudo@gmail.com",
      icon: <Mail size={20} aria-hidden="true" />,
      name: "adil.sudo@gmail.com",
    },
    {
      href: "tel:+919818128797",
      icon: <Phone size={20} aria-hidden="true" />,
      name: "+91 98 18 128797",
    },
    {
      href: "https://linkedin.com/in/md-adil",
      icon: <LinkedinIcon size={20} />,
      name: "LinkedIn",
      external: true,
    },
    {
      href: "https://github.com/md-adil",
      icon: <GithubIcon size={20} />,
      name: "GitHub",
      external: true,
    },
    {
      href: "https://www.npmjs.com/~adil.sudo",
      icon: <NpmIcon size={20} />,
      name: "NpmJS",
      external: true,
    },
    {
      href: "https://yacs.in/@/admin",
      icon: <ChatIcon size={20} aria-hidden="true" />,
      name: "Chat",
      external: true,
    },
  ];

  return (
    <section
      id={SectionId.CONTACT}
      className="relative overflow-hidden bg-slate-50 py-24"
      aria-labelledby="contact-heading"
    >
      <div className="relative z-10 container mx-auto max-w-3xl px-6 text-center md:px-12">
        <MotionSection>
          <h2 id="contact-heading" className="mb-6 font-serif text-3xl font-bold text-slate-900 md:text-5xl">
            Let's Build Something Durable.
          </h2>
        </MotionSection>
        <StaggerGroup className="mb-12 flex flex-wrap justify-center gap-6">
          {links.map((link) => (
            <StaggerItem key={link.name}>
              {link.external ? (
                <SocialIcon href={link.href} icon={link.icon} name={link.name} />
              ) : (
                <a
                  href={link.href}
                  className="text-primary hover:text-body focus:ring-primary flex items-center gap-2 rounded-xs font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-hidden"
                >
                  {link.icon} {link.name}
                </a>
              )}
            </StaggerItem>
          ))}
        </StaggerGroup>
        <MotionSection>
          <p className="text-muted text-sm">
            <MapPin size={14} className="mr-1 inline" aria-hidden="true" />
            Pune Maharashtra, India
          </p>
        </MotionSection>
      </div>
    </section>
  );
}
