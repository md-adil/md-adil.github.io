import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { SkillsSection } from "@/components/skills-section";
import { CreativeShowcase } from "@/components/creative-showcase";
import { ExperienceSection } from "@/components/experience-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <div id="home">
          <HeroSection />
        </div>
        <SkillsSection />
        <CreativeShowcase />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
