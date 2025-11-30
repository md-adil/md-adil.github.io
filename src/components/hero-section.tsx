"use client";

import { Button } from "@/components/ui/button";
import { Github, Mail, Download, ExternalLink } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(/images/hero-bg-cyberpunk.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute top-3/4 right-1/4 w-48 h-48 bg-secondary/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 right-1/3 w-24 h-24 bg-accent/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Profile Image */}
          <div className="mb-8 relative inline-block">
            <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-primary/50 shadow-2xl animate-pulse-glow">
              <Image
                src="/images/adil-portrait.jpg"
                alt="Adil's Profile"
                width={160}
                height={160}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full animate-pulse"></div>
          </div>

          {/* Name & Title */}
          <h1 className="text-6xl md:text-8xl font-bold mb-4 gradient-text animate-gradient animate-bounce-in">
            Hi, I&apos;m Adil
          </h1>

          <h2
            className="text-2xl md:text-4xl font-light mb-6 text-muted-foreground animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            Sr. Software Architect @ Bajaj Finserv Health
          </h2>

          {/* Tagline */}
          <div
            className="mb-8 space-y-2 animate-fade-in"
            style={{ animationDelay: "0.5s" }}
          >
            <p className="text-xl md:text-2xl font-medium text-primary text-shimmer">
              Building scalable health-tech solutions for 1M+ users
            </p>
            <p
              className="text-lg md:text-xl text-foreground/80 animate-fade-in"
              style={{ animationDelay: "0.7s" }}
            >
              Self-taught developer since 2014 |{" "}
              {new Date().getFullYear() - 2014}+ years of experience
            </p>
            <p
              className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in"
              style={{ animationDelay: "0.9s" }}
            >
              Passionate about clean code, TypeScript, and open source. Creator
              of react-read-otp (1.2k+ weekly downloads) and YACS. Director @
              Bigly Technology. Philanthropist, Tech Junkie, and Gymnast.
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-scale-in"
            style={{ animationDelay: "1.1s" }}
          >
            <Button
              size="lg"
              className="group bg-gradient-to-r from-primary to-secondary hover:from-primary-glow hover:to-secondary text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() =>
                window.open("https://github.com/md-adil/", "_blank")
              }
            >
              <Github className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              View My Work
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="group glass-effect hover:bg-white/10 border-primary/50 hover:border-primary text-foreground hover:text-primary transition-all duration-300"
              onClick={() => window.open("/resume.pdf", "_blank")}
            >
              <Download className="mr-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
              Download Resume
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="group glass-effect hover:bg-white/10 border-accent/50 hover:border-accent text-foreground hover:text-accent transition-all duration-300"
              onClick={() => {
                const element = document.querySelector("#contact");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              <Mail className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Get In Touch
            </Button>
          </div>

          {/* Featured Projects */}
          <div
            className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto animate-fade-in"
            style={{ animationDelay: "1.3s" }}
          >
            <a
              href="https://yacs.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-effect rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group hover-scale hover-glow relative overflow-hidden cursor-pointer"
            >
              <div className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <h3 className="font-semibold text-primary mb-2 flex items-center">
                <ExternalLink className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                YACS
              </h3>
              <p className="text-sm text-muted-foreground">
                Talk to anyone without sharing contacts - A lockdown project
              </p>
            </a>

            <a
              href="https://www.npmjs.com/package/react-read-otp"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-effect rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group hover-scale hover-glow relative overflow-hidden cursor-pointer"
            >
              <div
                className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full animate-pulse"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <h3 className="font-semibold text-secondary mb-2 flex items-center">
                <ExternalLink className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                react-read-otp
              </h3>
              <p className="text-sm text-muted-foreground">
                1.2k+ weekly downloads React & TypeScript package
              </p>
            </a>

            <a
              href="https://github.com/md-adil/"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-effect rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group hover-scale hover-glow relative overflow-hidden cursor-pointer"
            >
              <div
                className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
              <h3 className="font-semibold text-accent mb-2 flex items-center">
                <ExternalLink className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                More Projects
              </h3>
              <p className="text-sm text-muted-foreground">
                Explore 97+ repositories on GitHub
              </p>
            </a>
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
}
