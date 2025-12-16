interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  light?: boolean;
}

export function SectionHeading({ title, subtitle, light = false }: SectionHeadingProps) {
  const headingId = title.toLowerCase().replace(/\s+/g, "-") + "-heading";

  return (
    <div className="mb-16">
      <h2
        id={headingId}
        className={`mb-4 font-serif text-4xl font-bold md:text-5xl ${light ? "text-white" : "text-primary"}`}
      >
        {title}
      </h2>
      <div className={`mb-6 h-1 w-20 ${light ? "bg-blue-500" : "bg-primary"}`} aria-hidden="true"></div>
      {subtitle && (
        <p className={`max-w-2xl text-lg leading-relaxed ${light ? "text-slate-300" : "text-body"}`}>{subtitle}</p>
      )}
    </div>
  );
}
