"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { capabilities } from "@/data/capabilities";
import { EASE, DUR, viewportOnce } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";

/**
 * §5.3 — Capabilities / Craft. Editorial asymmetric grid (not a 3-card row).
 * Image scales 1.0→1.05 on hover. Shows range without bragging.
 */
const spanFor: Record<string, string> = {
  lg: "md:col-span-7 aspect-[16/10]",
  md: "md:col-span-5 aspect-[4/3]",
  sm: "md:col-span-6 aspect-[3/2]",
};

export default function Capabilities() {
  const reduced = usePrefersReducedMotion();

  return (
    <section id="craft" className="cv-auto mx-auto max-w-[1600px] px-6 py-28 md:px-12 md:py-40">
      <div className="mb-14 flex flex-col justify-between gap-6 md:mb-20 md:flex-row md:items-end">
        <div className="flex flex-col gap-5">
          <span className="label text-walnut">What we make</span>
          <h2 className="font-display max-w-[16ch] text-[clamp(2rem,5vw,4.5rem)] font-light leading-[1.02] text-ink">
            A full range, held to one standard.
          </h2>
        </div>
        <p className="max-w-[36ch] text-ink/65 md:text-right">
          From a single island to the joinery of an entire home — designed, built and
          installed by one studio.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-12 md:gap-y-20">
        {capabilities.map((c, i) => (
          <motion.article
            key={c.label}
            data-cursor="view"
            className={cn("group flex flex-col gap-5", spanFor[c.size])}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: DUR.base, ease: EASE.out, delay: (i % 2) * 0.08 }}
          >
            <div className="relative w-full flex-1 overflow-hidden bg-mist">
              <Image
                src={c.image}
                alt={c.label}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
              />
              <span className="label absolute left-4 top-4 text-bone mix-blend-difference">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-t border-mist pt-4">
              <h3 className="font-display text-[clamp(1.3rem,2vw,1.9rem)] font-light text-ink">
                {c.label}
              </h3>
              <p className="hidden max-w-[28ch] text-right text-sm text-ink/60 md:block">
                {c.blurb}
              </p>
            </div>
            <p className="-mt-2 max-w-[40ch] text-sm text-ink/60 md:hidden">{c.blurb}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
