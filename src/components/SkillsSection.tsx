import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const skills = [
  { name: "JavaScript / TypeScript", level: 80, color: "from-yellow-400 to-orange-500" },
  { name: "PHP / MySQL", level: 90, color: "from-purple-400 to-blue-500" },
  { name: "React", level: 85, color: "from-blue-400 to-cyan-500" },
  { name: "Node.js / MongoDB", level: 70, color: "from-green-400 to-emerald-500" },
  { name: "Vue", level: 65, color: "from-green-300 to-teal-500" },
  { name: "Python", level: 50, color: "from-blue-300 to-indigo-500" },
];

const technologies = [
  "Laravel", "Next.js", "Redux", "Express.js", "Koa", "Mongoose",
  "Docker", "Kubernetes", "Azure", "AWS", "Webpack", "TypeScript",
  "C++", "IoT", "FreeRTOS", "Socket.IO", "Git", "DevOps"
];

const frameworks = [
  { name: "Laravel", description: "Favorite PHP framework with 5+ years experience" },
  { name: "React & Next.js", description: "Preferred frontend with functional components" },
  { name: "Node.js", description: "4 years backend development experience" },
  { name: "TypeScript", description: "Most favorite language for the last 2 years" },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Skills & Expertise
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and experience across various technologies
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Skill Levels */}
          <Card className="glass-effect border-primary/20 hover:border-primary/40 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary flex items-center">
                <div className="w-2 h-8 bg-gradient-to-b from-primary to-secondary rounded-full mr-3"></div>
                Programming Proficiency
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {skills.map((skill, index) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-foreground">{skill.name}</span>
                    <span className="text-sm text-primary font-bold">{skill.level}%</span>
                  </div>
                  <Progress 
                    value={skill.level} 
                    variant="neon"
                    className="h-3"
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Frameworks & Specializations */}
          <Card className="glass-effect border-secondary/20 hover:border-secondary/40 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-secondary flex items-center">
                <div className="w-2 h-8 bg-gradient-to-b from-secondary to-accent rounded-full mr-3"></div>
                Frameworks & Specializations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {frameworks.map((framework, index) => (
                <div key={framework.name} className="p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
                  <h4 className="font-semibold text-lg text-foreground mb-2">{framework.name}</h4>
                  <p className="text-sm text-muted-foreground">{framework.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Technologies */}
        <Card className="glass-effect border-accent/20 hover:border-accent/40 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-accent flex items-center">
              <div className="w-2 h-8 bg-gradient-to-b from-accent to-primary rounded-full mr-3"></div>
              Technologies & Tools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {technologies.map((tech, index) => (
                <Badge 
                  key={tech} 
                  variant="outline" 
                  className="text-sm py-2 px-4 border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Special Projects Highlight */}
        <div className="mt-12 text-center">
          <div className="glass-effect rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 gradient-text">Open Source Contributions</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">react-read-otp</h4>
                <p className="text-sm text-muted-foreground">1.2k+ weekly downloads on NPM</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-secondary">truecaller-php-sdk</h4>
                <p className="text-sm text-muted-foreground">PHP & Laravel authentication SDK</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-accent">embedded-ip-cpp</h4>
                <p className="text-sm text-muted-foreground">IoT networking tools for C++</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;