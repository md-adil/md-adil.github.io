import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Code2, 
  Database, 
  Cloud, 
  Smartphone, 
  Globe, 
  Zap,
  Rocket,
  Star,
  Heart,
  Coffee,
  Download,
  Users,
  Award
} from "lucide-react";

const skillCategories = [
  {
    title: "Frontend Development",
    icon: Globe,
    skills: ["JavaScript", "TypeScript", "React", "Next.js", "Vue.js", "HTML5", "CSS3", "Tailwind"],
    color: "text-primary",
    delay: "0.1s"
  },
  {
    title: "Backend Development", 
    icon: Database,
    skills: ["PHP", "Laravel", "Node.js", "Express.js", "Python", "C++", "RESTful APIs"],
    color: "text-secondary",
    delay: "0.2s"
  },
  {
    title: "Database & Cloud",
    icon: Cloud,
    skills: ["MySQL", "MongoDB", "Docker", "Kubernetes", "Azure", "AWS", "DevOps"],
    color: "text-accent",
    delay: "0.3s"
  },
  {
    title: "Mobile & IoT",
    icon: Smartphone,
    skills: ["React Native", "IoT Development", "FreeRTOS", "Embedded Systems", "Socket.IO"],
    color: "text-primary",
    delay: "0.4s"
  }
];

const achievements = [
  {
    icon: Download,
    title: "1.2k+ Weekly Downloads",
    description: "react-read-otp NPM package",
    stat: "1,200+",
    color: "text-primary"
  },
  {
    icon: Users,
    title: "Open Source Projects",
    description: "Contributing to developer community",
    stat: "10+",
    color: "text-secondary"
  },
  {
    icon: Coffee,
    title: "Years of Experience",
    description: "Building scalable solutions",
    stat: "8+",
    color: "text-accent"
  },
  {
    icon: Rocket,
    title: "Projects Delivered",
    description: "From startups to enterprise",
    stat: "50+",
    color: "text-primary"
  }
];

const philosophy = [
  {
    quote: "Love to code.",
    description: "Passion drives perfection in every line of code",
    icon: Heart
  },
  {
    quote: "Degree don't define skills.",
    description: "Self-taught excellence through dedication and continuous learning",
    icon: Award
  },
  {
    quote: "Always learning, always growing.",
    description: "Embracing new technologies and connecting with people",
    icon: Star
  }
];

const featuredProjects = [
  {
    name: "YACS",
    description: "Anonymous chat platform - Connect without sharing contacts",
    tech: ["React", "Node.js", "Socket.IO", "MongoDB"],
    type: "Web Application",
    status: "Live",
    icon: Zap
  },
  {
    name: "react-read-otp",
    description: "Popular React OTP input component for TypeScript",
    tech: ["React", "TypeScript", "NPM"],
    type: "Open Source",
    status: "1.2k+ downloads/week",
    icon: Code2
  },
  {
    name: "truecaller-php-sdk",
    description: "Unofficial Truecaller authentication SDK for PHP & Laravel",
    tech: ["PHP", "Laravel", "API Integration"],
    type: "SDK",
    status: "Active",
    icon: Globe
  }
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text animate-gradient">
            Skills & Expertise
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A passionate developer's journey through technology, innovation, and continuous learning
          </p>
        </div>

        {/* Philosophy Cards */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center mb-8 text-shimmer">Development Philosophy</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {philosophy.map((item, index) => (
              <div 
                key={index}
                className="stagger-item glass-effect rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover-lift group"
              >
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

        {/* Skills Categories */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <Card 
              key={category.title}
              className="glass-effect border-primary/20 hover:border-primary/40 transition-all duration-300 hover-scale group"
              style={{animationDelay: category.delay}}
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
                      style={{animationDelay: `${skillIndex * 0.1}s`}}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Achievements Stats */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12 gradient-text">Achievements & Impact</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div 
                key={achievement.title}
                className="stagger-item text-center p-6 glass-effect rounded-2xl hover:bg-white/10 transition-all duration-300 hover-lift group"
              >
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
              <Card 
                key={project.name}
                className="stagger-item glass-effect border-secondary/20 hover:border-secondary/40 transition-all duration-300 hover-scale group hover-glow"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-secondary to-accent flex items-center justify-center group-hover:animate-wiggle">
                      <project.icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="outline" className="text-xs border-accent/30 hover:border-accent">
                      {project.type}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-secondary group-hover:text-primary transition-colors">
                    {project.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-sm">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <Badge 
                        key={tech}
                        variant="outline" 
                        className="text-xs border-primary/20 hover:border-primary/40"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-accent font-medium">{project.status}</span>
                    <button className="story-link text-primary text-sm font-medium">
                      Learn More
                    </button>
                  </div>
                </CardContent>
              </Card>
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
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <span className="text-muted-foreground">Philanthropist, Tech Junkie, and Gymnast</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                <span className="text-muted-foreground">Built songspk-dl CLI tool entirely in PHP</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
                <span className="text-muted-foreground">Speaks English, Hindi, and Urdu</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
                <span className="text-muted-foreground">Created YACS during lockdown to help people connect</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{animationDelay: '2.5s'}}></div>
                <span className="text-muted-foreground">TypeScript advocate - "thinks TypeScript first"</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;