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
        className={`text-sm font-medium transition-all duration-200 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm ${isActive ? "text-primary font-bold" : "text-muted hover:text-primary"}`}
      >
        {children}
      </a>
    );
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${
        scrolled ? "bg-white/90 backdrop-blur-md border-slate-200 py-4 shadow-sm" : "bg-transparent border-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#hero" className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm" aria-label="Go to top">
          <Layers className="w-6 h-6 text-primary" aria-hidden="true" />
          <span className="text-xl font-serif font-bold text-primary tracking-tight hidden sm:inline">{personalInfo.name}</span>
          <span className="text-xl font-serif font-bold text-primary tracking-tight sm:hidden">
            {personalInfo.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          <NavLink to={SectionId.ABOUT}>About</NavLink>
          <NavLink to={SectionId.CASE_STUDIES}>Case Studies</NavLink>
          <NavLink to={SectionId.SKILLS}>Skills</NavLink>
          <NavLink to={SectionId.EXPERIENCE}>Experience</NavLink>
          <NavLink to={SectionId.PROJECTS}>Projects / Open Source</NavLink>
          <NavLink to={SectionId.EDUCATION}>Education</NavLink>
          <Button asChild className="ml-2 shadow-lg hover:shadow-xl transition-all">
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
        <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 p-6 lg:hidden flex flex-col gap-6 shadow-xl items-center max-h-[80vh] overflow-y-auto">
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
