"use client";

import { motion } from "framer-motion";
import { testimonials, clientNames } from "@/data/testimonials";
import { EASE, DUR, viewportOnce } from "@/lib/motion";
import Marquee from "@/components/ui/Marquee";

/**
 * §5.8 — Testimonials. Large serif pull-quotes, mono attribution, quiet reveal.
 * A slow marquee of client/partner names beneath. Peer proof (architects) lands.
 */
export default function Testimonials() {
  return (
    <section id="studio" className="cv-auto bg-forest py-28 text-bone md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <span className="label mb-16 block text-bone/55 md:mb-24">In their words</span>

        <div className="grid gap-x-12 gap-y-16 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.author}
              className="flex flex-col gap-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: DUR.slow, ease: EASE.out, delay: i * 0.1 }}
            >
              <span className="font-display text-3xl leading-none text-brass">&ldquo;</span>
              <blockquote className="font-display text-[clamp(1.35rem,2vw,1.9rem)] font-light leading-[1.25] text-bone">
                {t.quote}
              </blockquote>
              <figcaption className="mt-auto flex flex-col gap-1 border-t border-bone/15 pt-4">
                <span className="label text-bone">{t.author}</span>
                <span className="label text-bone/50">{t.role}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>

      <div className="mt-24 border-y border-bone/15 py-6 md:mt-32">
        <Marquee speed={48} className="gap-x-12">
          {clientNames.map((name) => (
            <span
              key={name}
              className="font-display mx-8 text-[clamp(1.6rem,3vw,2.6rem)] font-light text-bone/35"
            >
              {name}
              <span className="mx-8 text-brass">·</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
