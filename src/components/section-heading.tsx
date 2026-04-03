"use client";

import { MotionSection, motion, fadeUp } from "./ui/motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  light?: boolean;
}

export function SectionHeading({ title, subtitle, light = false }: SectionHeadingProps) {
  const headingId = title.toLowerCase().replace(/\s+/g, "-") + "-heading";

  return (
    <MotionSection className="mb-16" variants={fadeUp}>
      <h2
        id={headingId}
        className={`mb-4 font-serif text-4xl font-bold md:text-5xl ${light ? "text-white" : "text-primary"}`}
      >
        {title}
      </h2>
      <motion.div
        className={`mb-6 h-1 w-20 origin-left ${light ? "bg-blue-500" : "bg-primary"}`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        aria-hidden="true"
      />
      {subtitle && (
        <p className={`max-w-2xl text-lg leading-relaxed ${light ? "text-slate-300" : "text-body"}`}>{subtitle}</p>
      )}
    </MotionSection>
  );
}
