"use client";

import { useState, useEffect } from "react";
import { Menu, X, Layers } from "lucide-react";
import { personalInfo, SectionId } from "@/data";
import { Button } from "./ui/button";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = Object.values(SectionId);
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= -100 && rect.top <= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavLink = ({ to, children }: { to: SectionId; children: React.ReactNode }) => {
    const isActive = activeSection === to;
    return (
      <a
        href={`#${to}`}
        onClick={() => setMobileMenuOpen(false)}
        className={`whitespace-nowrap rounded-sm text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${isActive ? "font-bold text-primary" : "text-muted hover:text-primary"}`}
      >
        {children}
      </a>
    );
  };

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-40 border-b transition-all duration-300 ${
        scrolled
          ? "border-slate-200 bg-white/90 py-4 shadow-sm backdrop-blur-md"
          : "border-transparent bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 md:px-12">
        <a
          href="#hero"
          className="flex items-center gap-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="Go to top"
        >
          <Layers className="h-6 w-6 text-primary" aria-hidden="true" />
          <span className="hidden font-serif text-xl font-bold tracking-tight text-primary sm:inline">
            {personalInfo.name}
          </span>
          <span className="font-serif text-xl font-bold tracking-tight text-primary sm:hidden">
            {personalInfo.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-6 lg:flex xl:gap-8">
          <NavLink to={SectionId.ABOUT}>About</NavLink>
          <NavLink to={SectionId.CASE_STUDIES}>Case Studies</NavLink>
          <NavLink to={SectionId.SKILLS}>Skills</NavLink>
          <NavLink to={SectionId.EXPERIENCE}>Experience</NavLink>
          <NavLink to={SectionId.PROJECTS}>Projects / Open Source</NavLink>
          <NavLink to={SectionId.EDUCATION}>Education</NavLink>
          <Button asChild className="ml-2 shadow-lg transition-all hover:shadow-xl">
            <a href={`#${SectionId.CONTACT}`}>Contact</a>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="absolute left-0 right-0 top-full flex max-h-[80vh] flex-col items-center gap-6 overflow-y-auto border-b border-slate-200 bg-white p-6 shadow-xl lg:hidden">
          <NavLink to={SectionId.ABOUT}>About</NavLink>
          <NavLink to={SectionId.CASE_STUDIES}>Case Studies</NavLink>
          <NavLink to={SectionId.SKILLS}>Skills</NavLink>
          <NavLink to={SectionId.EXPERIENCE}>Experience</NavLink>
          <NavLink to={SectionId.EDUCATION}>Education</NavLink>
          <NavLink to={SectionId.PROJECTS}>Projects / Open Source</NavLink>
          <NavLink to={SectionId.CONTACT}>Contact</NavLink>
        </div>
      )}
    </nav>
  );
}
