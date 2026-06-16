"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/**
 * §5.2 — Signature Projects, horizontal pinned scroll. The section pins and a
 * horizontal track translates as the user scrolls vertically (gallery walk).
 * Each panel has subtle inner parallax. Reduced motion → native horizontal
 * scroll-snap row, no pin.
 */
export default function SignatureProjects() {
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;

    const ctx = gsap.context(() => {
      const amount = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -amount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + amount(),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // per-panel inner parallax as each crosses the viewport
      const panels = gsap.utils.toArray<HTMLElement>("[data-panel]");
      panels.forEach((panel) => {
        const img = panel.querySelector("[data-parallax]");
        if (!img) return;
        gsap.fromTo(
          img,
          { xPercent: -8 },
          {
            xPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative overflow-hidden bg-ink text-bone"
    >
      {/* Section intro rail (stays at top of the pinned frame) */}
      <div className="pointer-events-none absolute left-6 top-8 z-20 flex items-center gap-4 md:left-12 md:top-12">
        <span className="label text-bone/60">Selected Work</span>
        <span className="label text-brass">{`01 — 0${projects.length}`}</span>
      </div>

      <div
        ref={trackRef}
        className={
          reduced
            ? "flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 py-24"
            : "flex h-screen items-center gap-4 px-6 will-change-transform md:gap-8 md:px-12"
        }
      >
        {projects.map((p, i) => (
          <article
            key={p.slug}
            data-panel
            data-cursor="view"
            className="group relative flex h-[70vh] w-[82vw] shrink-0 snap-center flex-col justify-end overflow-hidden md:h-[78vh] md:w-[46vw]"
          >
            <div className="absolute inset-0 overflow-hidden bg-forest">
              <div data-parallax className="absolute inset-0 -mx-[8%] w-[116%]">
                <Image
                  src={p.cover}
                  alt={`${p.name} — ${p.materials}`}
                  fill
                  sizes="(max-width: 768px) 82vw, 46vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
            </div>

            <div className="relative z-10 flex items-end justify-between p-6 md:p-8">
              <div className="flex flex-col gap-3">
                <span className="label text-bone/70">
                  {p.location} · {p.year} · {p.style}
                </span>
                <h3 className="font-display text-[clamp(1.8rem,3.4vw,3.2rem)] font-light leading-none text-bone">
                  {p.name}
                </h3>
                <span className="label max-w-[34ch] text-brass">{p.materials}</span>
              </div>
              <span className="label hidden shrink-0 items-center gap-2 text-bone/80 transition-colors group-hover:text-brass md:flex">
                View →
              </span>
            </div>

            <span className="absolute left-6 top-6 z-10 font-display text-sm text-bone/50 md:left-8 md:top-8">
              0{i + 1}
            </span>
          </article>
        ))}

        {/* tail spacer / outro card */}
        <div className="flex h-[70vh] w-[60vw] shrink-0 flex-col justify-center px-6 md:h-[78vh] md:w-[34vw]">
          <span className="label mb-4 text-brass">The full archive</span>
          <p className="font-display text-[clamp(1.6rem,2.6vw,2.4rem)] font-light leading-tight text-bone">
            Every kitchen we have ever built, drawn and finished by the same hands.
          </p>
          <a
            href="#portfolio"
            className="label link-underline mt-6 w-fit text-bone/80 hover:text-brass"
            data-cursor="action"
          >
            View portfolio →
          </a>
        </div>
      </div>
    </section>
  );
}
