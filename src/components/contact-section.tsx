"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  ExternalLink,
  Download,
  MessageCircle,
  Globe,
  Linkedin,
  X,
} from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "+91 98 18 128797",
    href: "tel:+919818128797",
    color: "text-primary",
  },
  {
    icon: Mail,
    label: "Email",
    value: "adil.sudo@gmail.com",
    href: "mailto:adil.sudo@gmail.com",
    color: "text-secondary",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Pune, Maharashtra, India",
    href: "#",
    color: "text-accent",
  },
];

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/md-adil/",
    color: "text-foreground",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/md-adil",
    color: "text-blue-500",
  },
  {
    icon: X,
    label: "Twitter / X",
    href: "https://twitter.com/_MdAdil",
    color: "text-sky-500",
  },
  {
    icon: Globe,
    label: "NPM Profile",
    href: "https://www.npmjs.com/~adil.sudo",
    color: "text-primary",
  },
  {
    icon: ExternalLink,
    label: "Company",
    href: "https://www.bajajfinservhealth.in/",
    color: "text-secondary",
  },
  {
    icon: MessageCircle,
    label: "YACS Chat",
    href: "https://yacs.in/@/admin",
    color: "text-accent",
  },
];

const languages = ["English", "Hindi", "Urdu"];

export function ContactSection() {
  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Let's Connect
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Always enjoy connecting with new people and discussing exciting
            technologies
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="glass-effect border-primary/20 hover:border-primary/40 transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-primary flex items-center">
                  <div className="w-2 h-8 bg-primary rounded-full mr-3"></div>
                  Contact Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {contactInfo.map((contact, index) => (
                    <a
                      key={contact.label}
                      href={contact.href}
                      className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-300 group hover:scale-105"
                    >
                      <div
                        className={`p-3 rounded-full ${contact.color} bg-current/10`}
                      >
                        <contact.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {contact.label}
                        </p>
                        <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {contact.value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="glass-effect border-secondary/20 hover:border-secondary/40 transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-secondary flex items-center">
                  <div className="w-2 h-8 bg-secondary rounded-full mr-3"></div>
                  Find Me Online
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((link, index) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-300 group hover:scale-105"
                    >
                      <link.icon
                        className={`h-5 w-5 ${link.color} group-hover:scale-110 transition-transform`}
                      />
                      <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {link.label}
                      </span>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Languages */}
          <div className="space-y-6">
            <Card className="glass-effect border-accent/20 hover:border-accent/40 transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-accent flex items-center">
                  <div className="w-2 h-8 bg-accent rounded-full mr-3"></div>
                  Quick Actions
                </h3>
                <div className="space-y-4">
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    onClick={() => window.open("/resume.pdf", "_blank")}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full glass-effect hover:bg-white/10 border-primary/50 hover:border-primary text-foreground hover:text-primary transition-all duration-300"
                    onClick={() =>
                      (window.location.href = "mailto:adil.sudo@gmail.com")
                    }
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Send Email
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full glass-effect hover:bg-white/10 border-accent/50 hover:border-accent text-foreground hover:text-accent transition-all duration-300"
                    onClick={() =>
                      window.open("https://yacs.in/@/admin", "_blank")
                    }
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Start Chat
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Languages */}
            <Card className="glass-effect border-primary/20 hover:border-primary/40 transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-primary">
                  Languages
                </h3>
                <div className="space-y-3">
                  {languages.map((language, index) => (
                    <div key={language} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-foreground">{language}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quote */}
            <Card className="glass-effect border-secondary/20 hover:border-secondary/40 transition-all duration-300">
              <CardContent className="p-6">
                <blockquote className="text-center">
                  <p className="text-lg font-medium text-secondary mb-2">
                    "Code is poetry written in logic"
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Building systems that scale, perform, and deliver
                  </p>
                </blockquote>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
