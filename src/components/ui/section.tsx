import { PropsWithChildren } from "react";

export interface SectionProps extends PropsWithChildren {
  id: string;
  title: string;
  subtitle: string;
}
export function Section({ id, title, subtitle, children }: SectionProps) {
  return (
    <section id={id} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }}></div>
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text animate-gradient">{title}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        </div>
        {children}
      </div>
    </section>
  );
}

export interface SubSectionProps extends PropsWithChildren {
  title: string;
  muted?: boolean;
}
export function SubSection({ title, children, muted }: SubSectionProps) {
  return (
    <div data-label="sub-section" className="py-8">
      <div>
        {muted ? (
          <div className="text-2xl font-bold text-center mb-8 text-muted-foreground">{title}</div>
        ) : (
          <h3 className="text-3xl font-bold text-center mb-8 text-accent">{title}</h3>
        )}
      </div>
      {children}
    </div>
  );
}
