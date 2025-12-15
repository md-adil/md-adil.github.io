interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  light?: boolean;
}

export function SectionHeading({ title, subtitle, light = false }: SectionHeadingProps) {
  const headingId = title.toLowerCase().replace(/\s+/g, '-') + '-heading';

  return (
    <div className="mb-16">
      <h2 id={headingId} className={`text-4xl md:text-5xl font-serif font-bold mb-4 ${light ? "text-white" : "text-primary"}`}>{title}</h2>
      <div className={`h-1 w-20 mb-6 ${light ? "bg-blue-500" : "bg-primary"}`} aria-hidden="true"></div>
      {subtitle && <p className={`max-w-2xl text-lg leading-relaxed ${light ? "text-slate-300" : "text-body"}`}>{subtitle}</p>}
    </div>
  );
}
