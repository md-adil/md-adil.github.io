import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Calendar,
  MapPin,
  ExternalLink,
  Briefcase,
  TrendingUp,
  Zap,
  Users,
  Code,
  Award,
  ChevronRight,
} from "lucide-react";

const experiences = [
  {
    title: "Sr. Software Architect",
    company: "Bajaj Finserv Health",
    period: "2022 January - Present",
    description:
      "Leading architecture and engineering for India's fastest-growing health-tech platform",
    responsibilities: [
      "System Architecture & Design",
      "Performance Optimization",
      "Security Implementation",
      "Azure DevOps & Kubernetes",
      "Team Leadership",
    ],
    type: "current",
    achievements: [
      "Scaled platform to handle 1M+ users",
      "Reduced response time by 60%",
      "Led team of 15+ engineers",
    ],
    technologies: ["React", "Node.js", "Azure", "Kubernetes", "TypeScript"],
  },
  {
    title: "Sr. Software Engineer",
    company: "Bajaj Finserv Health",
    period: "2020 October - 2022 January",
    description: "Architected core systems and led development initiatives",
    responsibilities: [
      "Technical Leadership",
      "System Architecture",
      "Full-stack Development",
    ],
    type: "previous",
    achievements: [
      "Built microservices architecture",
      "Implemented CI/CD pipelines",
      "Mentored junior developers",
    ],
    technologies: ["React", "Laravel", "MongoDB", "Docker"],
  },
  {
    title: "Lead Software Engineer",
    company: "BigRadar",
    period: "2017 April - Oct 2020",
    description: "Built modern chat platform from scratch, single-handedly",
    responsibilities: [
      "Full-stack Development",
      "Product Architecture",
      "Team Leadership",
    ],
    type: "previous",
    achievements: [
      "Built entire platform solo",
      "Achieved 99.9% uptime",
      "Served 10k+ concurrent users",
    ],
    technologies: ["Socket.IO", "React", "Node.js", "Redis"],
  },
  {
    title: "Director & Tech Lead",
    company: "Bigly Technology Pvt. Ltd.",
    period: "2017 March - Present",
    description:
      "Leading India's e-commerce solutions company for online sellers",
    responsibilities: [
      "Strategic Planning",
      "Team Management",
      "Technical Architecture",
      "Sprint Planning",
    ],
    type: "current",
    achievements: [
      "Grew team from 3 to 25+",
      "Generated ₹10Cr+ revenue",
      "Served 1000+ sellers",
    ],
    technologies: ["Laravel", "React", "AWS", "MySQL"],
  },
];

const milestones = [
  { year: "2009", event: "Started self-learning programming", icon: Code },
  { year: "2014", event: "First professional developer role", icon: Briefcase },
  { year: "2017", event: "Founded Bigly Technology", icon: TrendingUp },
  { year: "2020", event: "Created YACS during lockdown", icon: Zap },
  { year: "2022", event: "Promoted to Sr. Architect", icon: Award },
  { year: "2024", event: "1.2k+ weekly NPM downloads", icon: Users },
];

const education = [
  {
    degree: "Self-Taught Software Engineering",
    institution: "School of Internet",
    period: "2009 - Present",
    description:
      "Continuous learning through online resources, documentation, and hands-on projects",
    skills: ["Problem Solving", "Research", "Self-Motivation", "Adaptability"],
    type: "ongoing",
  },
  {
    degree: "Bachelor of Commerce",
    institution: "University of Delhi",
    period: "2009 - 2013",
    description:
      "Foundation in business principles while pursuing passion for programming",
    skills: ["Business Acumen", "Analytical Thinking", "Communication"],
    type: "completed",
  },
];

export const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-secondary/30 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text animate-gradient">
            Professional Journey
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            8+ years of building scalable solutions, leading teams, and creating
            impact in the tech industry
          </p>
        </div>

        {/* Career Timeline */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12 text-shimmer">
            Career Milestones
          </h3>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.year}
                className="stagger-item flex flex-col items-center text-center group hover-scale"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mb-3 group-hover:animate-bounce-in">
                  <milestone.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-lg font-bold text-primary mb-1">
                  {milestone.year}
                </div>
                <div className="text-sm text-muted-foreground max-w-24 leading-tight">
                  {milestone.event}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Cards */}
        <div className="relative mb-20">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent hidden md:block"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="relative animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-6 w-4 h-4 rounded-full border-4 border-background shadow-lg hidden md:block animate-pulse-glow ${
                    exp.type === "current" ? "bg-primary" : "bg-secondary"
                  }`}
                  style={{ animationDelay: `${index * 0.3}s` }}
                ></div>

                <Card
                  className={`ml-0 md:ml-16 glass-effect transition-all duration-500 hover-scale hover-glow group ${
                    exp.type === "current"
                      ? "border-primary/40 hover:border-primary"
                      : "border-secondary/20 hover:border-secondary/40"
                  }`}
                >
                  <CardHeader className="pb-4">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              exp.type === "current"
                                ? "bg-primary animate-pulse"
                                : "bg-secondary"
                            }`}
                          ></div>
                          <Badge
                            variant={
                              exp.type === "current" ? "default" : "outline"
                            }
                            className={`text-xs ${
                              exp.type === "current"
                                ? "bg-primary text-primary-foreground"
                                : "border-muted-foreground/30"
                            }`}
                          >
                            {exp.type === "current"
                              ? "Current Role"
                              : "Previous Role"}
                          </Badge>
                        </div>

                        <CardTitle
                          className={`text-2xl font-bold mb-2 ${
                            exp.type === "current"
                              ? "text-primary"
                              : "text-foreground"
                          } group-hover:text-primary transition-colors`}
                        >
                          {exp.title}
                        </CardTitle>

                        <div className="flex items-center gap-2 text-lg font-semibold text-secondary mb-2">
                          <Building2 className="h-5 w-5" />
                          {exp.company}
                        </div>

                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {exp.period}
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">
                      {exp.description}
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Responsibilities */}
                      <div>
                        <h5 className="font-semibold text-foreground mb-3 flex items-center">
                          <Briefcase className="h-4 w-4 mr-2 text-primary" />
                          Key Responsibilities
                        </h5>
                        <div className="space-y-2">
                          {exp.responsibilities.map((responsibility, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <ChevronRight className="h-3 w-3 text-accent" />
                              <span className="text-sm text-muted-foreground">
                                {responsibility}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Achievements */}
                      <div>
                        <h5 className="font-semibold text-foreground mb-3 flex items-center">
                          <Award className="h-4 w-4 mr-2 text-secondary" />
                          Key Achievements
                        </h5>
                        <div className="space-y-2">
                          {exp.achievements.map((achievement, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-secondary rounded-full"></div>
                              <span className="text-sm text-muted-foreground">
                                {achievement}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h5 className="font-semibold text-foreground mb-3">
                        Technologies Used
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, idx) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="text-xs border-accent/30 hover:border-accent hover:bg-accent/10 transition-all duration-300 hover-scale"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="animate-fade-in" style={{ animationDelay: "1s" }}>
          <h3 className="text-3xl font-bold text-center mb-12 gradient-text">
            Education & Learning Philosophy
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {education.map((edu, index) => (
              <Card
                key={edu.degree}
                className={`glass-effect transition-all duration-300 hover-scale hover-glow ${
                  edu.type === "ongoing"
                    ? "border-primary/30 hover:border-primary/50"
                    : "border-secondary/20 hover:border-secondary/40"
                }`}
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        edu.type === "ongoing"
                          ? "bg-primary animate-pulse"
                          : "bg-secondary"
                      }`}
                    ></div>
                    <Badge
                      variant={edu.type === "ongoing" ? "default" : "outline"}
                      className="text-xs"
                    >
                      {edu.type === "ongoing" ? "Ongoing" : "Completed"}
                    </Badge>
                  </div>
                  <CardTitle
                    className={`text-xl font-bold ${
                      edu.type === "ongoing" ? "text-primary" : "text-secondary"
                    }`}
                  >
                    {edu.degree}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {edu.institution}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {edu.period}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {edu.description}
                  </p>
                  <div>
                    <h5 className="font-semibold text-foreground mb-3">
                      Skills Developed
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {edu.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="text-xs border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-colors"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quote Section */}
        <div
          className="mt-16 text-center animate-fade-in"
          style={{ animationDelay: "1.2s" }}
        >
          <Card className="glass-effect border-accent/20 hover:border-accent/40 transition-all duration-300 max-w-4xl mx-auto hover-glow">
            <CardContent className="p-8">
              <blockquote className="text-center">
                <p className="text-2xl md:text-3xl font-bold gradient-text mb-4">
                  "Teaching yourself how to code isn't something everybody is
                  doing."
                </p>
                <p className="text-lg text-muted-foreground mb-4">
                  It requires lots of dedication and motivation.
                </p>
                <footer className="text-sm text-accent font-medium">
                  — A self-taught developer's journey since 2009
                </footer>
              </blockquote>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
