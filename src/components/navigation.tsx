"use client";

import { useState, useEffect } from "react";
import { Menu, X, Layers } from "lucide-react";
import { SectionId, PORTFOLIO_DATA } from "@/data/portfolio-data";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>(SectionId.HERO);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section
      const sections = Object.values(SectionId);
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= -100 && rect.top <= 400) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: SectionId) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const NavLink = ({ to, children }: { to: SectionId; children: React.ReactNode }) => {
    const isActive = activeSection === to;
    return (
      <button
        onClick={() => scrollToSection(to)}
        className={`text-sm font-medium transition-all duration-200 whitespace-nowrap ${isActive ? "text-slate-900 font-bold" : "text-slate-500 hover:text-slate-900"}`}
      >
        {children}
      </button>
    );
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${
        scrolled ? "bg-white/90 backdrop-blur-md border-slate-200 py-4 shadow-sm" : "bg-transparent border-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2">
          <Layers className="w-6 h-6 text-slate-900" />
          <span className="text-xl font-serif font-bold text-slate-900 tracking-tight hidden sm:inline">{PORTFOLIO_DATA.name}</span>
          <span className="text-xl font-serif font-bold text-slate-900 tracking-tight sm:hidden">
            {PORTFOLIO_DATA.name
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
          <NavLink to={SectionId.OPEN_SOURCE}>Open Source</NavLink>
          <NavLink to={SectionId.EDUCATION}>Education</NavLink>
          <button
            onClick={() => scrollToSection(SectionId.CONTACT)}
            className="px-5 py-2.5 bg-slate-900 text-white text-sm font-medium rounded hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl ml-2"
          >
            Contact
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="lg:hidden text-slate-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 p-6 lg:hidden flex flex-col gap-6 shadow-xl items-center max-h-[80vh] overflow-y-auto">
          <NavLink to={SectionId.ABOUT}>About</NavLink>
          <NavLink to={SectionId.CASE_STUDIES}>Case Studies</NavLink>
          <NavLink to={SectionId.SKILLS}>Skills</NavLink>
          <NavLink to={SectionId.EXPERIENCE}>Experience</NavLink>
          <NavLink to={SectionId.EDUCATION}>Education</NavLink>
          <NavLink to={SectionId.OPEN_SOURCE}>Open Source</NavLink>
          <NavLink to={SectionId.CONTACT}>Contact</NavLink>
        </div>
      )}
    </nav>
  );
}
