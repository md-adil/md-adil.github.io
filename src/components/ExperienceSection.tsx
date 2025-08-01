import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    title: "Sr. Software Architect",
    company: "Bajaj Finserv Health",
    period: "2022 January - Present",
    description: "A health-tech company from Bajaj Finserv group.",
    responsibilities: [
      "System Architect",
      "Performance Optimization", 
      "Security",
      "DevOps (Azure services, Kubernetes, Docker)",
      "Code"
    ],
    type: "current"
  },
  {
    title: "Sr. Software Engineer",
    company: "Bajaj Finserv Health", 
    period: "2020 October - 2022 January",
    description: "A health-tech company from Bajaj Finserv group.",
    responsibilities: [
      "Lead",
      "System Architect",
      "Code"
    ],
    type: "previous"
  },
  {
    title: "Lead Software Engineer",
    company: "BigRadar",
    period: "2017 April - Oct 2020", 
    description: "BigRadar's modern chat experience makes the customers feel like pro support, even if you're away.",
    responsibilities: [
      "Built from scratch single-handed",
      "Lead"
    ],
    type: "previous"
  },
  {
    title: "Lead Software Engineer", 
    company: "FlexiSpaces",
    period: "2018 January - Oct 2020",
    description: "FlexiSpaces is an on-demand platform to book meeting room, meetups, coworking spaces etc.",
    responsibilities: [
      "Lead",
      "Architect", 
      "Code"
    ],
    type: "previous"
  },
  {
    title: "Director and Tech Lead",
    company: "Bigly Technology Pvt. Ltd.",
    period: "2017 March - Present",
    description: "Bigly is India's leading company who knows online seller pain and try to find every possible solutions.",
    responsibilities: [
      "Team Lead",
      "System Architect",
      "Code",
      "Assigning sprints to each team member"
    ],
    type: "current"
  }
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Professional Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Over 8+ years of experience building scalable software solutions across various industries
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent hidden md:block"></div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="relative">
                {/* Timeline dot */}
                <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg hidden md:block animate-pulse-glow" 
                     style={{animationDelay: `${index * 0.2}s`}}>
                </div>

                <Card className={`ml-0 md:ml-16 glass-effect transition-all duration-300 hover:scale-105 
                  ${exp.type === 'current' 
                    ? 'border-primary/40 hover:border-primary' 
                    : 'border-secondary/20 hover:border-secondary/40'
                  }`}>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <CardTitle className={`text-xl font-bold ${
                          exp.type === 'current' ? 'text-primary' : 'text-foreground'
                        }`}>
                          {exp.title}
                        </CardTitle>
                        <div className="flex items-center gap-2 text-lg font-semibold text-secondary mt-1">
                          <Building2 className="h-4 w-4" />
                          {exp.company}
                        </div>
                      </div>
                      <div className="flex flex-col md:items-end gap-2">
                        <Badge 
                          variant={exp.type === 'current' ? 'default' : 'outline'}
                          className={`text-xs ${
                            exp.type === 'current' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'border-muted-foreground/30'
                          }`}
                        >
                          {exp.type === 'current' ? 'Current' : 'Previous'}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {exp.period}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{exp.description}</p>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm text-foreground">Key Responsibilities:</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.responsibilities.map((responsibility, idx) => (
                          <Badge 
                            key={idx} 
                            variant="outline" 
                            className="text-xs border-accent/30 hover:border-accent hover:bg-accent/10 transition-colors"
                          >
                            {responsibility}
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
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center mb-12 gradient-text">Education & Learning</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="glass-effect border-primary/20 hover:border-primary/40 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-primary">Self-Taught Software Engineering</CardTitle>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  2009 - Present
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">School of Internet</p>
                <p className="text-sm">
                  Teaching yourself how to code isn't something everybody is doing. 
                  It requires lots of dedication and motivation.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect border-secondary/20 hover:border-secondary/40 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-secondary">Bachelor of Commerce</CardTitle>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  2009 - 2013
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4" />
                  University of Delhi
                </div>
                <p className="text-sm">
                  Rather than compromising with my passion, I chose to teach myself and learnt how to code.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;