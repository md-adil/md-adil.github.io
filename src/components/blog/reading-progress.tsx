"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Thin bar under the header that fills as the reader scrolls through the article. */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="bg-secondary fixed top-0 right-0 left-0 z-50 h-0.5 origin-left"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
