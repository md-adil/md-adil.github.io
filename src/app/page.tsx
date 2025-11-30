import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { SkillsSection } from "@/components/skills-section";
import { FeaturedProjects } from "@/components/featured-projects";
import { CreativeShowcase } from "@/components/creative-showcase";
import { ExperienceSection } from "@/components/experience-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { CaseStudies } from "@/components/case-studies";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <div id="home">
          <HeroSection />
        </div>
        <CaseStudies />
        <SkillsSection />
        <FeaturedProjects />
        <CreativeShowcase />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
