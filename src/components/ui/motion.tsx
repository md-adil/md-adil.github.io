"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "motion/react";

/**
 * Shared animation variants for consistent scroll-reveal across the site.
 * Uses framer-motion's useInView — no extra wrapper divs, no layout breakage.
 */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const defaultTransition = {
  duration: 0.5,
  ease: [0.25, 0.1, 0.25, 1] as const,
};

/**
 * Hook that returns { ref, inView } for triggering scroll animations.
 * Use with motion components: `animate={inView ? "visible" : "hidden"}`
 */
export function useScrollReveal(options?: { once?: boolean; margin?: string; amount?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: options?.once ?? true,
    margin: (options?.margin ?? "0px 0px -80px 0px") as `${number}px ${number}px ${number}px ${number}px`,
    amount: options?.amount ?? 0.1,
  });
  return { ref, inView };
}

/**
 * Pre-configured motion.div for section-level scroll reveal.
 * Just replaces <div> — no extra wrapper.
 */
export function MotionSection({
  children,
  className,
  variants = fadeUp,
}: {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
}) {
  const { ref, inView } = useScrollReveal();
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={defaultTransition}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger container — wrap a grid/list, children use fadeUp variants.
 */
export function StaggerGroup({
  children,
  className,
  slow = false,
}: {
  children: React.ReactNode;
  className?: string;
  slow?: boolean;
}) {
  const { ref, inView } = useScrollReveal();
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={slow ? staggerContainerSlow : staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * A stagger child — use inside StaggerGroup. Just a motion.div with fadeUp.
 */
export function StaggerItem({
  children,
  className,
  variants = fadeUp,
}: {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
}) {
  return (
    <motion.div variants={variants} transition={defaultTransition} className={className}>
      {children}
    </motion.div>
  );
}

export { motion, defaultTransition };
