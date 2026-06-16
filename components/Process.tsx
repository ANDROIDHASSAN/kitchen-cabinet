"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { process } from "@/data/process";
import { EASE, DUR, viewportOnce } from "@/lib/motion";

/**
 * §5.5 — Process, sticky numbered steps. Left column sticks with the step;
 * right column scrolls through detail + image. Spec-sheet styling. Process
 * transparency de-risks a high-ticket purchase.
 */
export default function Process() {
  return (
    <section
      id="process"
      className="cv-auto mx-auto max-w-[1600px] px-6 py-28 md:px-12 md:py-40"
    >
      <div className="mb-16 flex flex-col gap-5 md:mb-24">
        <span className="label text-walnut">How a kitchen is made</span>
        <h2 className="font-display max-w-[14ch] text-[clamp(2rem,5vw,4.5rem)] font-light leading-[1.02] text-ink">
          Four stages, one studio.
        </h2>
      </div>

      <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
        {/* Sticky index */}
        <div className="hidden md:block">
          <div className="sticky top-28 flex flex-col gap-1">
            <span className="label mb-6 text-ink/40">The sequence</span>
            {process.map((s) => (
              <div key={s.step} className="flex items-baseline gap-4 border-t border-mist py-4">
                <span className="font-display text-2xl text-brass">{s.step}</span>
                <span className="font-display text-2xl font-light text-ink">{s.title}</span>
              </div>
            ))}
            <p className="mt-8 max-w-[32ch] text-sm text-ink/55">
              Typical commissions run 12–20 weeks from first drawing to the day the
              doors close in silence.
            </p>
          </div>
        </div>

        {/* Scrolling detail */}
        <div className="flex flex-col gap-20 md:gap-32">
          {process.map((s, i) => (
            <motion.article
              key={s.step}
              className="flex flex-col gap-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: DUR.slow, ease: EASE.out }}
            >
              <div className="flex items-baseline justify-between border-b border-mist pb-4">
                <span className="font-display text-[clamp(2.5rem,7vw,5rem)] font-light leading-none text-ink">
                  {s.step}
                </span>
                <span className="label text-brass">Step {i + 1} / {process.length}</span>
              </div>
              <h3 className="font-display text-[clamp(1.6rem,3vw,2.6rem)] font-light text-ink md:hidden">
                {s.title}
              </h3>
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-mist">
                <Image
                  src={s.image}
                  alt={`${s.title} — ${s.body.slice(0, 60)}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  className="object-cover"
                />
              </div>
              <p className="max-w-[46ch] text-ink/70">{s.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
