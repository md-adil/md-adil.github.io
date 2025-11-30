import { Badge } from "./ui/badge";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";

export function CaseStudies() {
  return (
    <section id="case-studies" className="py-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }}></div>
      </div>
      <div className="container mx-auto px-6 relative z-10">
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
          <Card className="glass-effect border-quaternary/20 hover:border-quaternary/40 transition-all duration-300 hover-scale hover-glow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full bg-quaternary"></div>
                <Badge variant="outline" className="text-xs border-quaternary/30">
                  Architecture
                </Badge>
              </div>
              <CardTitle className="text-xl font-bold text-quaternary">Microservices Migration</CardTitle>
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
    </section>
  );
}
