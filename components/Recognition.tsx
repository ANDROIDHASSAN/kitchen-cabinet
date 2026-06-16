"use client";

import { recognition } from "@/data/stats";
import Marquee from "@/components/ui/Marquee";
import Reveal from "@/components/Reveal";

/**
 * §5.9 — Recognition / Press. Slow marquee of awards & publications, greyscale
 * voice → brass on hover. Borrowed authority.
 */
export default function Recognition() {
  return (
    <section id="recognition" className="cv-auto bg-bone py-20 md:py-28">
      <Reveal className="mx-auto mb-12 max-w-[1600px] px-6 md:px-12">
        <span className="label text-walnut">Recognition &amp; press</span>
      </Reveal>

      <Marquee speed={38}>
        {recognition.map((name) => (
          <span
            key={name}
            className="label mx-10 text-ink/35 transition-colors duration-500 hover:text-brass md:mx-16"
          >
            {name}
          </span>
        ))}
      </Marquee>
      <Marquee speed={52} reverse className="mt-8 opacity-90">
        {recognition
          .slice()
          .reverse()
          .map((name) => (
            <span
              key={name}
              className="font-display mx-10 text-[clamp(1.4rem,2.4vw,2.2rem)] font-light text-ink/15 md:mx-16"
            >
              {name}
            </span>
          ))}
      </Marquee>
    </section>
  );
}
