import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Database, Cloud, Smartphone, Globe, Zap, Rocket, Star, Heart, Coffee, Download, Users, Award, Network, ExternalLink } from "lucide-react";

// Primary expertise - what defines the role
const primarySkills = [
  {
    title: "Backend & Microservices",
    icon: Code2,
    skills: ["PHP", "Laravel", "Laravel Octane", "Node.js", "Express.js", "Go", "RESTful APIs", "GraphQL", "Microservices Architecture"],
    color: "text-primary",
    delay: "0.1s",
    featured: true,
  },
  {
    title: "Cloud & Infrastructure",
    icon: Cloud,
    skills: ["Kubernetes", "Docker", "Terraform", "Azure", "AWS", "CI/CD", "GitOps", "Jenkins"],
    color: "text-secondary",
    delay: "0.2s",
    featured: true,
  },
  {
    title: "DevOps & Observability",
    icon: Network,
    skills: ["DevOps", "Grafana", "ELK Stack", "Loki", "Tempo", "Monitoring", "Performance Optimization", "System Design"],
    color: "text-accent",
    delay: "0.3s",
    featured: true,
  },
  {
    title: "Databases & Scalability",
    icon: Database,
    skills: ["MySQL", "MongoDB", "Redis", "Database Design", "Query Optimization", "Caching Strategies", "High Availability"],
    color: "text-primary",
    delay: "0.4s",
    featured: true,
  },
];

// Additional skills - breadth of knowledge
const additionalSkills = [
  {
    title: "Frontend Development",
    icon: Globe,
    skills: ["TypeScript", "React", "Next.js", "Vue.js", "Tailwind CSS"],
    color: "text-secondary",
  },
  {
    title: "Real-time & Integration",
    icon: Zap,
    skills: ["Socket.IO", "WebSockets", "Real-time Systems", "Live Streaming", "AI Integration"],
    color: "text-accent",
  },
  {
    title: "Mobile & Emerging Tech",
    icon: Smartphone,
    skills: ["React Native", "IoT Development", "Embedded Systems"],
    color: "text-primary",
  },
];

const achievements = [
  {
    icon: Download,
    title: "NPM Downloads",
    description: "Weekly downloads across packages",
    stat: "1.2k+",
    color: "text-primary",
  },
  {
    icon: Users,
    title: "GitHub Repositories",
    description: "Open source contributions",
    stat: "97",
    color: "text-secondary",
  },
  {
    icon: Coffee,
    title: "Years Experience",
    description: "Self-taught since 2009",
    stat: "15+",
    color: "text-accent",
  },
  {
    icon: Rocket,
    title: "Users Impacted",
    description: "Across all platforms",
    stat: "1M+",
    color: "text-primary",
  },
];

const philosophy = [
  {
    quote: "Love to code.",
    description: "Passion drives perfection in every line of code",
    icon: Heart,
  },
  {
    quote: "Degree don't define skills.",
    description: "Self-taught excellence through dedication and continuous learning",
    icon: Award,
  },
  {
    quote: "Always learning, always growing.",
    description: "Embracing new technologies and connecting with people",
    icon: Star,
  },
];

const featuredProjects = [
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
    tech: ["JavaScript", "TypeScript", "Events"],
    type: "NPM Package",
    status: "Published on NPM",
    icon: Zap,
    link: "https://www.npmjs.com/package/ebx",
    github: "https://github.com/md-adil/ebx",
  },
  {
    name: "ebx",
    description: "Lightweight event bus library for JavaScript applications",
    tech: ["JavaScript", "TypeScript", "Events"],
    type: "NPM Package",
    status: "Published on NPM",
    icon: Zap,
  },
  {
    name: "truecaller-php-sdk",
    description: "Truecaller authentication SDK for PHP & Laravel developers",
    tech: ["PHP", "Laravel", "OAuth"],
    type: "SDK Library",
    status: "Active Development",
    icon: Globe,
    link: "https://github.com/md-adil/truecaller-php-sdk",
    github: "https://github.com/md-adil/truecaller-php-sdk",
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text animate-gradient">Skills & Expertise</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Specialized in building scalable backend systems, cloud infrastructure, and high-performance applications
          </p>
        </div>

        {/* Philosophy Cards */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center mb-8 text-shimmer">Development Philosophy</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {philosophy.map((item, index) => (
              <div key={index} className="stagger-item glass-effect rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover-lift group">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center group-hover:animate-wiggle">
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold mb-2 gradient-text">{item.quote}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Primary Skills - Core Expertise */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8 gradient-text">Core Expertise</h3>
          <div className="grid lg:grid-cols-2 gap-8">
            {primarySkills.map((category, index) => (
              <Card
                key={category.title}
                className="glass-effect border-primary/30 hover:border-primary/50 transition-all duration-300 hover-scale group shadow-lg"
                style={{ animationDelay: category.delay }}
              >
                <CardHeader>
                  <CardTitle className={`text-2xl font-bold ${category.color} flex items-center`}>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center mr-4 group-hover:animate-bounce-in">
                      <category.icon className="h-6 w-6 text-white" />
                    </div>
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="text-sm py-2 px-3 border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300 hover-scale cursor-default"
                        style={{ animationDelay: `${skillIndex * 0.1}s` }}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Additional Skills - Supporting Technologies */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-muted-foreground">Additional Skills</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {additionalSkills.map((category, index) => (
              <Card key={category.title} className="glass-effect border-muted/20 hover:border-muted/40 transition-all duration-300 hover-scale group">
                <CardHeader>
                  <CardTitle className={`text-lg font-semibold ${category.color} flex items-center`}>
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-muted to-muted-foreground/20 flex items-center justify-center mr-3">
                      <category.icon className="h-5 w-5 text-white" />
                    </div>
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs py-1 px-2 border-muted/30 hover:border-muted hover:bg-muted/10 transition-all duration-300">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Achievements Stats */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12 gradient-text">Achievements & Impact</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div key={achievement.title} className="stagger-item text-center p-6 glass-effect rounded-2xl hover:bg-white/10 transition-all duration-300 hover-lift group">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center group-hover:animate-pulse-glow`}>
                  <achievement.icon className="h-8 w-8 text-white" />
                </div>
                <div className={`text-3xl font-bold mb-2 ${achievement.color}`}>{achievement.stat}</div>
                <h4 className="font-semibold text-foreground mb-1">{achievement.title}</h4>
                <p className="text-xs text-muted-foreground">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12 gradient-text">Featured Projects</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <a key={project.name} href={project.link} target="_blank" rel="noopener noreferrer" className="block">
                <Card className="stagger-item glass-effect border-secondary/20 hover:border-secondary/40 transition-all duration-300 hover-scale group hover-glow h-full cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-secondary to-accent flex items-center justify-center group-hover:animate-wiggle">
                        <project.icon className="h-6 w-6 text-white" />
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

        {/* Fun Facts */}
        <div className="text-center glass-effect rounded-2xl p-8 max-w-4xl mx-auto animate-bounce-in">
          <h3 className="text-2xl font-bold mb-6 gradient-text">Did You Know?</h3>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-muted-foreground">Self-taught since 2009 - "School of Internet" graduate</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
                <span className="text-muted-foreground">Philanthropist, Tech Junkie, and Gymnast</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
                <span className="text-muted-foreground">Built songspk-dl CLI tool entirely in PHP</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "1.5s" }}></div>
                <span className="text-muted-foreground">Speaks English, Hindi, and Urdu</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" style={{ animationDelay: "2s" }}></div>
                <span className="text-muted-foreground">Created YACS during lockdown to help people connect</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: "2.5s" }}></div>
                <span className="text-muted-foreground">TypeScript advocate - "thinks TypeScript first"</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
