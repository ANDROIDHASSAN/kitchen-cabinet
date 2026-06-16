"use client";

import { RevealWords } from "@/components/RevealText";
import Reveal from "@/components/Reveal";

/**
 * §5.1 — Manifesto / Thesis. One large editorial statement on --bone, a few
 * brass-accented keywords, word-by-word reveal. Converts spectacle into trust.
 */
export default function Manifesto() {
  return (
    <section
      id="manifesto"
      className="relative mx-auto max-w-[1600px] px-6 py-28 md:px-12 md:py-44"
    >
      <Reveal className="mb-12 flex items-center gap-4 md:mb-20">
        <span className="inline-block h-px w-12 bg-brass" />
        <span className="label text-walnut">Our thesis</span>
      </Reveal>

      <RevealWords
        as="h2"
        className="font-display max-w-[20ch] text-[clamp(1.9rem,4.4vw,4rem)] font-light leading-[1.08] text-ink"
        accentWords={["craft", "permanence", "hand", "patience"]}
        text="We build kitchens the slow way — drawn to the millimetre, made by hand, finished with the patience that turns furniture into permanence. Not a product. A piece of the home, made to be inherited. This is craft, kept deliberately rare."
      />

      <Reveal
        delay={0.1}
        className="mt-16 grid gap-8 border-t border-mist pt-8 md:mt-24 md:grid-cols-3"
      >
        {[
          ["Designed in-house", "Every drawing originates in the Milan atelier."],
          ["Built by hand", "Dovetailed, veneered and finished by our cabinetmakers."],
          ["Made to outlast", "Materials and tolerances chosen for decades, not seasons."],
        ].map(([t, d]) => (
          <div key={t} className="flex flex-col gap-2">
            <span className="label text-brass">{t}</span>
            <p className="max-w-[32ch] text-ink/70">{d}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
