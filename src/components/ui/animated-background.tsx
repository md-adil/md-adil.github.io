"use client";

import { motion } from "motion/react";

/**
 * Animated dot grid background with floating light orbs.
 * Use as a child of a section with `position: relative` and `overflow: hidden`.
 */
export function AnimatedBackground({
  variant = "dots",
  className = "",
}: {
  variant?: "dots" | "grid";
  className?: string;
}) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {variant === "dots" && <DotGrid />}
      {variant === "grid" && <LineGrid />}
    </div>
  );
}

function DotGrid() {
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      style={{
        backgroundImage: `radial-gradient(circle, rgba(148, 163, 184, 0.5) 1px, transparent 1px)`,
        backgroundSize: "32px 32px",
      }}
    />
  );
}

function LineGrid() {
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* Horizontal lines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(148, 163, 184, 0.15) 1px, transparent 1px)`,
          backgroundSize: "1px 64px",
        }}
      />
      {/* Vertical lines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(148, 163, 184, 0.15) 1px, transparent 1px)`,
          backgroundSize: "64px 1px",
        }}
      />
    </motion.div>
  );
}

/**
 * Minimal floating particles that drift upward — use sparingly.
 */
export function FloatingParticles({ count = 6 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-blue-400/20"
          style={{
            left: `${15 + (i * 70) / count}%`,
            top: `${80 + Math.random() * 20}%`,
          }}
          animate={{
            y: [0, -400 - Math.random() * 200],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 6,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
