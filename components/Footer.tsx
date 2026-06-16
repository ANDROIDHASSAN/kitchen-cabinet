"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { site } from "@/data/site";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

/**
 * §5.11 — Footer. Oversized wordmark that reveals as you reach the bottom,
 * link columns, socials, address, brass hairline, fine-print mono row.
 */
export default function Footer() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["18%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0.2, 1]);

  return (
    <footer ref={ref} className="relative overflow-hidden bg-ink pt-24 text-bone md:pt-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        {/* Columns */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 border-b border-bone/15 pb-16 md:grid-cols-4 md:gap-x-10">
          {site.footer.columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-4">
              <span className="label text-brass">{col.title}</span>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="link-underline text-sm text-bone/65 transition-colors hover:text-bone"
                      data-cursor="action"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Meta row */}
        <div className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-6">
            {site.footer.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="label link-underline text-bone/60 hover:text-brass"
                data-cursor="action"
              >
                {s.label}
              </a>
            ))}
          </div>
          <span className="label text-bone/45">{site.footer.address}</span>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div className="overflow-hidden">
        <motion.div
          style={{ y, opacity }}
          className="select-none px-4 text-center"
          aria-hidden
        >
          <span className="font-display block whitespace-nowrap text-[clamp(3rem,15vw,15rem)] font-light leading-[0.85] text-bone/90">
            {site.footer.wordmark}
          </span>
        </motion.div>
      </div>

      <div className="mx-auto flex max-w-[1600px] flex-col gap-2 border-t border-bone/10 px-6 py-6 md:flex-row md:items-center md:justify-between md:px-12">
        <span className="label text-bone/40">{site.footer.legal}</span>
        <span className="label text-bone/40">
          {site.discipline} · {site.location}
        </span>
      </div>
    </footer>
  );
}
