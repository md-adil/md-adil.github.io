import { Button } from "@/components/ui/button";
import { Github, Mail, Download, ExternalLink } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";
import profileImage from "@/assets/adil-portrait.jpg";

const HeroSection = () => {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-secondary/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-accent/20 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Profile Image */}
          <div className="mb-8 relative inline-block">
            <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-primary/50 shadow-2xl animate-pulse-glow">
              <img 
                src={profileImage} 
                alt="Adil's Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full animate-pulse"></div>
          </div>

          {/* Name & Title */}
          <h1 className="text-6xl md:text-8xl font-bold mb-4 gradient-text animate-gradient">
            Hi, I am Adil
          </h1>
          
          <h2 className="text-2xl md:text-4xl font-light mb-6 text-muted-foreground">
            Sr. Software Architect
          </h2>

          {/* Tagline */}
          <div className="mb-8 space-y-2">
            <p className="text-xl md:text-2xl font-medium text-primary">
              Love to code.
            </p>
            <p className="text-lg md:text-xl text-foreground/80">
              Degree don't define skills.
            </p>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Self taught Computer Programmer, Motivated and Dedicated to Computer and Science, 
              Code Enthusiasts, Philanthropist, Tech Junkie and Gymnast.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="group bg-gradient-to-r from-primary to-secondary hover:from-primary-glow hover:to-secondary text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Github className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              View My Work
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="group glass-effect hover:bg-white/10 border-primary/50 hover:border-primary text-foreground hover:text-primary transition-all duration-300"
            >
              <Download className="mr-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
              Download Resume
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="group glass-effect hover:bg-white/10 border-accent/50 hover:border-accent text-foreground hover:text-accent transition-all duration-300"
            >
              <Mail className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Get In Touch
            </Button>
          </div>

          {/* Featured Projects */}
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="glass-effect rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group hover:scale-105">
              <h3 className="font-semibold text-primary mb-2 flex items-center">
                <ExternalLink className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                YACS
              </h3>
              <p className="text-sm text-muted-foreground">
                Talk to anyone without sharing contacts - A lockdown project
              </p>
            </div>
            
            <div className="glass-effect rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group hover:scale-105">
              <h3 className="font-semibold text-secondary mb-2 flex items-center">
                <ExternalLink className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                react-read-otp
              </h3>
              <p className="text-sm text-muted-foreground">
                1.2k+ weekly downloads React & TypeScript package
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;