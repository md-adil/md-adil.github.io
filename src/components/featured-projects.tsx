import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Globe, Zap, ExternalLink } from "lucide-react";

const featuredProjects = [
  {
    name: "YACS (Yet another chatting software)",
    description: "Talk to anyone without sharing contacts - A lockdown project",
    tech: ["React", "TypeScript", "Web RTC", "Websocket", "Node", "Mongo", "Protobuf"],
    type: "PWA",
    icon: Code2,
    link: "https://yacs.in",
  },
  {
    name: "MinimaJS",
    description:
      "MinimaJS is a cutting-edge Node.js framework meticulously designed to empower developers to construct contemporary web applications with exceptional efficiency and elegance.",
    tech: ["TypeScript", "Node", "Function Programming"],
    type: "NPM Package",
    status: "Published on NPM",
    icon: Code2,
    link: "https://minima-js.github.io",
    github: "https://github.com/minima-js/minimajs",
  },
  {
    name: "react-read-otp",
    description: "Auto-read OTP React hook with 1.2k+ weekly downloads",
    tech: ["React", "TypeScript", "WebOTP API"],
    type: "NPM Package",
    status: "1.2k+ downloads/week",
    icon: Code2,
    link: "https://www.npmjs.com/package/react-read-otp",
    github: "https://github.com/md-adil/react-read-otp",
  },
  {
    name: "ebx",
    description: "A Tool for Building and Running TypeScript Code",
    tech: ["JavaScript", "TypeScript", "ESM"],
    type: "NPM Package",
    status: "Published on NPM",
    icon: Zap,
    link: "https://www.npmjs.com/package/ebx",
    github: "https://github.com/md-adil/ebx",
  },
  {
    name: "truecaller-php-sdk",
    description: "Truecaller authentication SDK for PHP & Laravel developers",
    tech: ["PHP", "Laravel", "OAuth"],
    type: "SDK Library",
    status: "Installs 2589",
    icon: Globe,
    link: "https://packagist.org/packages/md-adil/truecaller-php-sdk",
    github: "https://github.com/md-adil/truecaller-php-sdk",
  },
];

export function FeaturedProjects() {
  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text animate-gradient">Featured Projects</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Open source projects and tools used by thousands of developers worldwide</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <a key={project.name} href={project.link} target="_blank" rel="noopener noreferrer" className="block">
              <Card className="stagger-item glass-effect border-secondary/20 hover:border-secondary/40 transition-all duration-300 hover-scale group hover-glow h-full cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:animate-wiggle">
                      <project.icon className="h-6 w-6 text-secondary-foreground" />
                    </div>
                    <Badge variant="outline" className="text-xs border-accent/30 hover:border-accent">
                      {project.type}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-secondary group-hover:text-primary transition-colors">{project.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-sm">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs border-primary/20 hover:border-primary/40">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-accent font-medium">{project.status}</span>
                    <span className="text-primary text-sm font-medium flex items-center gap-1">
                      View Project
                      <ExternalLink className="h-3 w-3" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
