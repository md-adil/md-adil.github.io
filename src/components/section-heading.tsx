interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  light?: boolean;
}

export function SectionHeading({ title, subtitle, light = false }: SectionHeadingProps) {
  return (
    <div className="mb-16">
      <h2 className={`text-4xl md:text-5xl font-serif font-bold mb-4 ${light ? 'text-white' : 'text-slate-900'}`}>
        {title}
      </h2>
      <div className={`h-1 w-20 mb-6 ${light ? 'bg-blue-500' : 'bg-slate-900'}`}></div>
      {subtitle && (
        <p className={`max-w-2xl text-lg leading-relaxed ${light ? 'text-slate-300' : 'text-slate-600'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
