"use client";

import { RevealLines } from "@/components/RevealText";
import MagneticButton from "@/components/MagneticButton";
import { site } from "@/data/site";

/**
 * §5.10 — CTA. Full-bleed --ink. Huge serif line + magnetic primary button +
 * mono contact line. End on a single, confident ask.
 */
export default function CTA() {
  return (
    <section
      id="cta"
      className="relative flex min-h-[88vh] flex-col items-center justify-center overflow-hidden bg-ink px-6 py-28 text-bone"
    >
      {/* faint brass vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(166,130,76,0.10),transparent_60%)]" />

      <div className="relative flex flex-col items-center text-center">
        <span className="label mb-8 text-brass">{site.cta.eyebrow}</span>

        <RevealLines
          as="h2"
          className="font-display text-[clamp(2.6rem,9vw,8.5rem)] font-light leading-[0.98] text-bone"
          lineClassName="whitespace-nowrap"
          lines={["Let's build", "your kitchen."]}
        />

        <div className="mt-14">
          <MagneticButton
            href="#contact"
            strength={0.5}
            aria-label={site.cta.button}
            className="border border-brass/60 bg-brass px-10 py-5 text-ink transition-colors duration-500 hover:bg-transparent hover:text-brass"
          >
            <span className="label">{site.cta.button} →</span>
          </MagneticButton>
        </div>

        <div className="mt-12 flex flex-col items-center gap-2 md:flex-row md:gap-8">
          <a
            href={`mailto:${site.cta.email}`}
            className="label link-underline text-bone/70 hover:text-bone"
            data-cursor="action"
          >
            {site.cta.email}
          </a>
          <span className="hidden text-bone/30 md:inline">·</span>
          <a
            href={`tel:${site.cta.phone.replace(/\s/g, "")}`}
            className="label link-underline text-bone/70 hover:text-bone"
            data-cursor="action"
          >
            {site.cta.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
