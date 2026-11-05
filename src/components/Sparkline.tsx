"use client";

import { motion } from "framer-motion";

const PATHS = [
  "M0 18 L10 15 L20 16 L30 11 L40 12 L50 7 L60 8 L70 3",
  "M0 17 L10 16 L20 12 L30 13 L40 9 L50 10 L60 5 L70 2",
  "M0 19 L10 14 L20 15 L30 10 L40 11 L50 6 L60 4 L70 2",
];

/** Tiny decorative upward sparkline that draws itself when visible. */
export default function Sparkline({ variant = 0, className = "" }: { variant?: number; className?: string }) {
  const d = PATHS[variant % PATHS.length];
  return (
    <svg viewBox="0 0 72 22" className={`h-5 w-[72px] ${className}`} aria-hidden fill="none">
      <motion.path
        d={d}
        stroke="#C6FF3D"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
        style={{ filter: "drop-shadow(0 0 4px rgba(198,255,61,.6))" }}
      />
      <circle cx="70" cy={d.trim().split(" ").pop()} r="2" fill="#C6FF3D" />
    </svg>
  );
}
