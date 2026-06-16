"use client";

import { motion } from "framer-motion";
import { EASE, DUR, viewportOnce } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/utils";

/**
 * Generic weighted scroll reveal. y-translate + fade with expo.out.
 * Reduced motion → fade only, no movement.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "figure" | "span";
}) {
  const reduced = usePrefersReducedMotion();
  const Comp = motion[as];

  return (
    <Comp
      className={cn(className)}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: DUR.base, ease: EASE.out, delay }}
    >
      {children}
    </Comp>
  );
}
