import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Calendar, MapPin, Briefcase, TrendingUp, Zap, Users, Code, Award, ChevronRight } from "lucide-react";
import { experienceSince, experienceYears, learningSince } from "@/config";

const experiences = [
  {
    title: "Independent Consulting & Architecture Work",
    company: "Freelance",
    period: "2022 - Present",
    description:
      "Providing specialized consulting and architecture services to EdTech, Media Streaming, and Enterprise SaaS clients. Delivering end-to-end solutions from infrastructure design to production deployment.",
    responsibilities: [
      "Designed and implemented full DevOps pipeline with Jenkins, Kubernetes, and GitOps",
      "Migrated monolithic Laravel application to microservices (Node.js + Go + Laravel Octane)",
      "Designed infrastructure from scratch: Kubernetes, Terraform, CI/CD, observability stack",
      "Built complete real-time live streaming platform from zero",
      "Set coding guidelines and engineering standards for entire tech teams",
    ],
    type: "current",
    achievements: [
      "Deployed full observability using Grafana, ELK, Loki, Tempo",
      "Implemented performance optimization using Laravel Octane (Swoole)",
      "Successfully migrated legacy monolith to modern microservices architecture",
      "Built production-grade streaming platform with real-time capabilities",
      "Established DevOps best practices and CI/CD pipelines",
    ],
    technologies: ["Kubernetes", "Terraform", "Jenkins", "GitOps", "Laravel Octane", "Swoole", "Node.js", "Go", "Grafana", "ELK Stack", "Loki", "Tempo", "Docker"],
  },
  {
    title: "Sr. Software Architect (Promoted from Sr. Software Engineer)",
    company: "Bajaj Finserv Health",
    period: "October 2020 - Present",
    description:
      "Leading architecture and engineering for India's fastest-growing health-tech platform. Promoted to Sr. Architect in January 2022 for exceptional performance and leadership.",
    responsibilities: [
      "Architecting microservices for healthcare ecosystem",
      "Performance optimization & scalability",
      "Security & compliance",
      "Azure DevOps, Kubernetes & Docker orchestration",
      `Leading and mentoring team of ${experienceYears} engineers`,
    ],
    type: "current",
    achievements: [
      "Scaled platform to 1M+ active users",
      "Reduced API response time by 60%",
      "Built microservices architecture from scratch",
      "Implemented CI/CD reducing deployment time by 75%",
      "Promoted to Sr. Architect within 15 months",
    ],
    technologies: ["React", "Next.js", "Node.js", "TypeScript", "PHP", "Laravel", "Azure", "Kubernetes", "MongoDB", "MySQL", "Redis", "Docker"],
  },
  {
    title: "Director & Tech Lead",
    company: "Bigly Technology Pvt. Ltd.",
    period: "March 2017 - October 2020",
    description: "Co-founded and leading India's premier e-commerce enablement platform for online sellers. Managing complete technology stack and business operations.",
    responsibilities: [
      "Strategic planning & business development",
      "Team management & hiring",
      "Technical architecture & sprint planning",
      "Product roadmap & feature development",
      "Customer success & support",
    ],
    // type: "current",
    achievements: [
      "Grew company from 3 to 25+ team members",
      "Generated ₹10Cr+ in revenue",
      "Serving 1000+ active sellers nationwide",
      "Built complete seller management platform",
    ],
    technologies: ["Laravel", "React", "Vue.js", "AWS", "MySQL", "Redis"],
  },
  {
    title: "Lead Software Engineer",
    company: "BigRadar",
    period: "April 2017 - October 2020",
    description: "Single-handedly built and maintained a modern real-time chat platform serving thousands of concurrent users",
    responsibilities: ["Full-stack development (solo)", "Product architecture & design", "Infrastructure & DevOps", "Performance monitoring & optimization"],
    type: "previous",
    achievements: ["Built entire platform independently", "Achieved 99.9% uptime SLA", "Served 10k+ concurrent users", "Real-time messaging with Socket.IO"],
    technologies: ["Socket.IO", "React", "Node.js", "Redis", "MongoDB"],
  },
];

const milestones = [
  { year: learningSince, event: "Started self-learning programming", icon: Code },
  { year: experienceSince, event: "First professional developer role", icon: Briefcase },
  { year: "2017", event: "Founded Bigly Technology", icon: TrendingUp },
  { year: "2020", event: "Created YACS during lockdown", icon: Zap },
  { year: "2022", event: "Promoted to Sr. Architect", icon: Award },
  { year: "2024", event: "1.2k+ weekly NPM downloads", icon: Users },
];

const education = [
  {
    degree: "Self-Taught Software Engineering",
    institution: "School of Internet",
    period: `${learningSince} - Present`,
    description: "Continuous learning through online resources, documentation, and hands-on projects",
    skills: ["Problem Solving", "Research", "Self-Motivation", "Adaptability"],
    type: "ongoing",
  },
  {
    degree: "Bachelor of Commerce",
    institution: "University of Delhi",
    period: "2009 - 2013",
    description: "Foundation in business principles while pursuing passion for programming",
    skills: ["Business Acumen", "Analytical Thinking", "Communication"],
    type: "completed",
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-secondary/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "4s" }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text animate-gradient">Professional Journey</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {experienceYears} years of building scalable solutions, leading teams, and creating impact in the tech industry
          </p>
        </div>

        {/* Career Timeline */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12 text-shimmer">Career Milestones</h3>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {milestones.map((milestone) => (
              <div key={milestone.year} className="stagger-item flex flex-col items-center text-center group hover-scale">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-3 group-hover:animate-bounce-in">
                  <milestone.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <div className="text-lg font-bold text-primary mb-1">{milestone.year}</div>
                <div className="text-sm text-muted-foreground max-w-24 leading-tight">{milestone.event}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Case Studies Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12 gradient-text">Selected Case Studies</h3>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">Real-world impact across performance, architecture, and infrastructure projects</p>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Case Study 1: Laravel Octane Performance */}
            <Card className="glass-effect border-primary/20 hover:border-primary/40 transition-all duration-300 hover-scale hover-glow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <Badge variant="outline" className="text-xs border-primary/30">
                    Performance
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-primary">PHP-FPM → Laravel Octane (Swoole)</CardTitle>
                <p className="text-xs text-muted-foreground mt-2">85% performance improvement, 5× concurrency</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h5 className="font-semibold text-foreground mb-1 text-sm">Problem</h5>
                  <p className="text-xs text-muted-foreground">Slow responses (800ms), poor concurrency, high CPU usage under load</p>
                </div>
                <div>
                  <h5 className="font-semibold text-foreground mb-1 text-sm">Solution</h5>
                  <ul className="text-xs text-muted-foreground space-y-0.5">
                    <li>• Replaced PHP-FPM with Laravel Octane + Swoole</li>
                    <li>• Process-level caching & coroutine execution</li>
                    <li>• Optimized DB queries & connection pooling</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-foreground mb-1 text-sm">Impact</h5>
                  <p className="text-xs text-muted-foreground">Response time: 800ms → 40–60ms | 5× concurrency | 30–40% cost savings</p>
                </div>
              </CardContent>
            </Card>

            {/* Case Study 2: Microservices Migration */}
            <Card className="glass-effect border-secondary/20 hover:border-secondary/40 transition-all duration-300 hover-scale hover-glow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 rounded-full bg-secondary"></div>
                  <Badge variant="outline" className="text-xs border-secondary/30">
                    Architecture
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-secondary">Microservices Migration</CardTitle>
                <p className="text-xs text-muted-foreground mt-2">Laravel → Node.js + Go | 87% faster, 4× delivery speed</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h5 className="font-semibold text-foreground mb-1 text-sm">Problem</h5>
                  <p className="text-xs text-muted-foreground">Monolithic app with 2–3s latency, poor scaling, rising infra costs</p>
                </div>
                <div>
                  <h5 className="font-semibold text-foreground mb-1 text-sm">Solution</h5>
                  <ul className="text-xs text-muted-foreground space-y-0.5">
                    <li>• Domain-driven microservices architecture</li>
                    <li>• High-traffic modules rebuilt in Node.js + Go</li>
                    <li>• Kafka/Redis event-driven communication</li>
                    <li>• Containerized with Docker + Kubernetes</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-foreground mb-1 text-sm">Impact</h5>
                  <p className="text-xs text-muted-foreground">Response: 250ms → 35ms | Releases: monthly → daily | 60% fewer incidents</p>
                </div>
              </CardContent>
            </Card>

            {/* Case Study 3: DevOps Platform */}
            <Card className="glass-effect border-accent/20 hover:border-accent/40 transition-all duration-300 hover-scale hover-glow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 rounded-full bg-accent"></div>
                  <Badge variant="outline" className="text-xs border-accent/30">
                    DevOps
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-accent">DevOps Pipeline + Kubernetes Platform</CardTitle>
                <p className="text-xs text-muted-foreground mt-2">Built from zero | 99% deployment friction reduction</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h5 className="font-semibold text-foreground mb-1 text-sm">Problem</h5>
                  <p className="text-xs text-muted-foreground">No CI/CD, manual deployments (45 mins), zero observability</p>
                </div>
                <div>
                  <h5 className="font-semibold text-foreground mb-1 text-sm">Solution</h5>
                  <ul className="text-xs text-muted-foreground space-y-0.5">
                    <li>• Built HA Kubernetes cluster</li>
                    <li>• CI/CD with Jenkins + GitHub Actions</li>
                    <li>• GitOps with ArgoCD, IaC via Terraform</li>
                    <li>• Full observability: Grafana + ELK + Tempo</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-foreground mb-1 text-sm">Impact</h5>
                  <p className="text-xs text-muted-foreground">Deployments: 45 mins → &lt;2 mins | 40% cloud cost savings | 99.9% SLO</p>
                </div>
              </CardContent>
            </Card>

            {/* Case Study 4: Capsule Design System */}
            <Card className="glass-effect border-primary/20 hover:border-primary/40 transition-all duration-300 hover-scale hover-glow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <Badge variant="outline" className="text-xs border-primary/30">
                    Bajaj Finserv Health
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-primary">Capsule Design System</CardTitle>
                <p className="text-xs text-muted-foreground mt-2">React + Storybook | 99% Lighthouse Score</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h5 className="font-semibold text-foreground mb-1 text-sm">Problem</h5>
                  <p className="text-xs text-muted-foreground">Inconsistent UI, slow development, visual drift, poor Lighthouse scores</p>
                </div>
                <div>
                  <h5 className="font-semibold text-foreground mb-1 text-sm">Solution</h5>
                  <ul className="text-xs text-muted-foreground space-y-0.5">
                    <li>• Built scalable design system (React + Storybook)</li>
                    <li>• Unified tokens, reusable hooks/utilities</li>
                    <li>• A11Y-first component design</li>
                    <li>• Performance-optimized bundles</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-foreground mb-1 text-sm">Impact</h5>
                  <p className="text-xs text-muted-foreground">UI speed: 2–3× faster | 50–70% dev time reduction | Adopted by 10+ apps</p>
                </div>
              </CardContent>
            </Card>

            {/* Case Study 5: ArgoCD GitOps */}
            <Card className="glass-effect border-secondary/20 hover:border-secondary/40 transition-all duration-300 hover-scale hover-glow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 rounded-full bg-secondary"></div>
                  <Badge variant="outline" className="text-xs border-secondary/30">
                    Bajaj Finserv Health
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-secondary">ArgoCD GitOps for 600+ Microservices</CardTitle>
                <p className="text-xs text-muted-foreground mt-2">Zero drift | 70% manual overhead reduction</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h5 className="font-semibold text-foreground mb-1 text-sm">Problem</h5>
                  <p className="text-xs text-muted-foreground">600+ services deployed manually, frequent mismatches, slow rollbacks</p>
                </div>
                <div>
                  <h5 className="font-semibold text-foreground mb-1 text-sm">Solution</h5>
                  <ul className="text-xs text-muted-foreground space-y-0.5">
                    <li>• GitOps platform with ArgoCD (Git = source of truth)</li>
                    <li>• Custom Azure DevOps Task for sync automation</li>
                    <li>• Auto-sync, self-heal, drift detection policies</li>
                    <li>• RBAC + SSO for multi-team access</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-foreground mb-1 text-sm">Impact</h5>
                  <p className="text-xs text-muted-foreground">Instant rollbacks | Zero drift | 70% less overhead | 2× faster releases</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Experience Cards */}
        <div className="relative mb-20">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary hidden md:block"></div>

          <div className="space-y-12">
            {experiences.map((exp) => (
              <div key={exp.company} className="relative animate-fade-in">
                {/* Timeline dot */}
                <div
                  className={`absolute left-6 w-4 h-4 rounded-full border-4 border-background shadow-lg hidden md:block animate-pulse-glow ${
                    exp.type === "current" ? "bg-primary" : "bg-secondary"
                  }`}
                ></div>

                <Card
                  className={`ml-0 md:ml-16 glass-effect transition-all duration-500 hover-scale hover-glow group ${
                    exp.type === "current" ? "border-primary/40 hover:border-primary" : "border-secondary/20 hover:border-secondary/40"
                  }`}
                >
                  <CardHeader className="pb-4">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-3 h-3 rounded-full ${exp.type === "current" ? "bg-primary animate-pulse" : "bg-secondary"}`}></div>
                          <Badge
                            variant={exp.type === "current" ? "default" : "outline"}
                            className={`text-xs ${exp.type === "current" ? "bg-primary text-primary-foreground" : "border-muted-foreground/30"}`}
                          >
                            {exp.type === "current" ? "Current Role" : "Previous Role"}
                          </Badge>
                        </div>

                        <CardTitle className={`text-2xl font-bold mb-2 ${exp.type === "current" ? "text-primary" : "text-foreground"} group-hover:text-primary transition-colors`}>
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
                    <p className="text-muted-foreground leading-relaxed">{exp.description}</p>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Responsibilities */}
                      <div>
                        <h5 className="font-semibold text-foreground mb-3 flex items-center">
                          <Briefcase className="h-4 w-4 mr-2 text-primary" />
                          Key Responsibilities
                        </h5>
                        <div className="space-y-2">
                          {exp.responsibilities.map((responsibility) => (
                            <div key={responsibility} className="flex items-center gap-2">
                              <ChevronRight className="h-3 w-3 text-accent" />
                              <span className="text-sm text-muted-foreground">{responsibility}</span>
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
                          {exp.achievements.map((achievement) => (
                            <div key={achievement} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-secondary rounded-full"></div>
                              <span className="text-sm text-muted-foreground">{achievement}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h5 className="font-semibold text-foreground mb-3">Technologies Used</h5>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, idx) => (
                          <Badge key={tech} variant="outline" className="text-xs border-accent/30 hover:border-accent hover:bg-accent/10 transition-all duration-300 hover-scale">
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
          <h3 className="text-3xl font-bold text-center mb-12 gradient-text">Education & Learning Philosophy</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {education.map((edu) => (
              <Card
                key={edu.degree}
                className={`glass-effect transition-all duration-300 hover-scale hover-glow ${
                  edu.type === "ongoing" ? "border-primary/30 hover:border-primary/50" : "border-secondary/20 hover:border-secondary/40"
                }`}
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-3 h-3 rounded-full ${edu.type === "ongoing" ? "bg-primary animate-pulse" : "bg-secondary"}`}></div>
                    <Badge variant={edu.type === "ongoing" ? "default" : "outline"} className="text-xs">
                      {edu.type === "ongoing" ? "Ongoing" : "Completed"}
                    </Badge>
                  </div>
                  <CardTitle className={`text-xl font-bold ${edu.type === "ongoing" ? "text-primary" : "text-secondary"}`}>{edu.degree}</CardTitle>
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
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{edu.description}</p>
                  <div>
                    <h5 className="font-semibold text-foreground mb-3">Skills Developed</h5>
                    <div className="flex flex-wrap gap-2">
                      {edu.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-colors">
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
        <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: "1.2s" }}>
          <Card className="glass-effect border-accent/20 hover:border-accent/40 transition-all duration-300 max-w-4xl mx-auto hover-glow">
            <CardContent className="p-8">
              <blockquote className="text-center">
                <p className="text-2xl md:text-3xl font-bold gradient-text mb-4">
                  "The best architecture is the one that solves today's problems while anticipating tomorrow's challenges."
                </p>
                <p className="text-lg text-muted-foreground mb-4">Balancing pragmatism with vision in every system design.</p>
                <footer className="text-sm text-accent font-medium">— Architecting scalable solutions since {experienceSince}</footer>
              </blockquote>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
