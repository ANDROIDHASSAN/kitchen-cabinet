"use client";

import { motion } from "framer-motion";
import { EASE, DUR, viewportOnce } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/utils";

type Tag = "h1" | "h2" | "h3" | "p" | "span" | "div";

/**
 * Line-based clip reveal — each line sits in an overflow-hidden mask and slides
 * up from below. The signature headline motion. Pass `lines` as an array of
 * strings (you control the line breaks for typographic control).
 */
export function RevealLines({
  lines,
  as = "h2",
  className,
  lineClassName,
  stagger = 0.09,
  delay = 0,
  start = false,
}: {
  lines: string[];
  as?: Tag;
  className?: string;
  lineClassName?: string;
  stagger?: number;
  delay?: number;
  start?: boolean; // animate on mount instead of in-view (hero)
  }) {
  const reduced = usePrefersReducedMotion();
  const Comp = motion[as];

  const animateProps = start
    ? { animate: "show" }
    : { whileInView: "show", viewport: viewportOnce };

  return (
    <Comp
      className={cn(className)}
      initial="hidden"
      {...animateProps}
      variants={{ show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {lines.map((line, i) => (
        <span key={i} className="reveal-mask">
          <motion.span
            className={cn("block", lineClassName)}
            variants={{
              hidden: reduced ? { opacity: 0 } : { y: "110%" },
              show: reduced
                ? { opacity: 1, transition: { duration: DUR.base } }
                : { y: "0%", transition: { duration: DUR.slow, ease: EASE.out } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Comp>
  );
}

/**
 * Word-by-word stagger — used for the manifesto. Highlighted words (passed as
 * `accentWords`) render in brass.
 */
export function RevealWords({
  text,
  as = "p",
  className,
  accentWords = [],
  stagger = 0.04,
}: {
  text: string;
  as?: Tag;
  className?: string;
  accentWords?: string[];
  stagger?: number;
}) {
  const reduced = usePrefersReducedMotion();
  const Comp = motion[as];
  const words = text.split(" ");
  const accentSet = new Set(accentWords.map((w) => w.toLowerCase().replace(/[.,]/g, "")));

  return (
    <Comp
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={{ show: { transition: { staggerChildren: stagger } } }}
    >
      {words.map((word, i) => {
        const isAccent = accentSet.has(word.toLowerCase().replace(/[.,]/g, ""));
        return (
          <span key={i} className="inline-block overflow-hidden align-bottom">
            <motion.span
              className={cn("inline-block", isAccent && "text-brass italic")}
              variants={{
                hidden: reduced ? { opacity: 0 } : { y: "100%", opacity: 0 },
                show: reduced
                  ? { opacity: 1, transition: { duration: 0.5 } }
                  : { y: "0%", opacity: 1, transition: { duration: DUR.base, ease: EASE.out } },
              }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </Comp>
  );
}
