// lib/motion.ts
// The "expensive" feel comes from long durations + heavy easing. No springs, no bounce.
// These tokens are shared by GSAP (string eases) and Framer Motion (cubic-bezier arrays).

import type { Variants } from "framer-motion";

// Cubic-bezier control points
export const EASE = {
  out: [0.16, 1, 0.3, 1] as const, // expo-out: slow settle = luxury
  inOut: [0.83, 0, 0.17, 1] as const, // dramatic, for big reveals
  cubic: "cubic-bezier(0.16,1,0.3,1)",
};

export const DUR = { fast: 0.4, base: 0.8, slow: 1.2, hero: 1.6 } as const;

// GSAP equivalents: "expo.out", "power4.out", "power3.inOut"
export const GSAP_EASE = {
  out: "expo.out",
  power: "power4.out",
  inOut: "power3.inOut",
};

// ---- Framer Motion reusable variants ----

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DUR.base, ease: EASE.out, delay: i * 0.08 },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DUR.slow, ease: EASE.out } },
};

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

// Shared viewport config so reveals are choreographed, not random.
export const viewportOnce = { once: true, margin: "0px 0px -12% 0px" } as const;
