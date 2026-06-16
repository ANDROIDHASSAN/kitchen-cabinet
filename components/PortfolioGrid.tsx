"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { portfolio, portfolioFilters } from "@/data/portfolio";
import { EASE, DUR, viewportOnce } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import Lightbox from "@/components/ui/Lightbox";
import { cn } from "@/lib/utils";

/**
 * §5.7 — Portfolio Grid. Filterable masonry; images reveal with clip/scale on
 * scroll-in; hover lifts + shows the name; click → accessible lightbox.
 */
export default function PortfolioGrid() {
  const reduced = usePrefersReducedMotion();
  const [filter, setFilter] = useState<(typeof portfolioFilters)[number]>("All");
  const [lightbox, setLightbox] = useState<{ src: string; alt: string; cap: string } | null>(
    null
  );

  const items = portfolio.filter((p) => filter === "All" || p.style === filter);

  return (
    <section id="portfolio" className="cv-auto mx-auto max-w-[1600px] px-6 py-28 md:px-12 md:py-40">
      <div className="mb-10 flex flex-col justify-between gap-8 md:mb-16 md:flex-row md:items-end">
        <div className="flex flex-col gap-5">
          <span className="label text-walnut">The archive</span>
          <h2 className="font-display max-w-[14ch] text-[clamp(2rem,5vw,4.5rem)] font-light leading-[1.02] text-ink">
            A portfolio, by style.
          </h2>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2">
          {portfolioFilters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              data-cursor="action"
              aria-pressed={filter === f}
              className={cn(
                "label border px-4 py-2 transition-colors duration-400",
                filter === f
                  ? "border-ink bg-ink text-bone"
                  : "border-mist text-ink/60 hover:border-ink hover:text-ink"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        <AnimatePresence mode="popLayout">
          {items.map((p, i) => (
            <motion.figure
              key={p.id}
              layout
              data-cursor="view"
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24, clipPath: "inset(8% 0 0 0)" }}
              whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
              exit={{ opacity: 0, scale: 0.98 }}
              viewport={viewportOnce}
              transition={{ duration: DUR.base, ease: EASE.out, delay: (i % 3) * 0.06 }}
              className="group relative block w-full cursor-pointer break-inside-avoid overflow-hidden bg-mist"
              onClick={() =>
                setLightbox({ src: p.image, alt: p.name, cap: `${p.name} · ${p.location} · ${p.style}` })
              }
            >
              <div
                className={cn(
                  "relative w-full overflow-hidden",
                  p.span === "tall" ? "aspect-[3/4]" : p.span === "wide" ? "aspect-[3/2]" : "aspect-[4/5]"
                )}
              >
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/25" />
              </div>
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-4 opacity-0 transition-all duration-500 group-hover:opacity-100">
                <span className="font-display text-xl font-light text-bone">{p.name}</span>
                <span className="label text-bone/80">{p.location}</span>
              </figcaption>
            </motion.figure>
          ))}
        </AnimatePresence>
      </motion.div>

      <Lightbox
        open={!!lightbox}
        onOpenChange={(v) => !v && setLightbox(null)}
        src={lightbox?.src ?? null}
        alt={lightbox?.alt ?? ""}
        caption={lightbox?.cap}
      />
    </section>
  );
}
