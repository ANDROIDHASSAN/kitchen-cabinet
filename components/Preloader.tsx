"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { site } from "@/data/site";
import { startPreload, subscribeProgress } from "@/lib/frameLoader";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

const SESSION_KEY = "mn_preloaded";

/**
 * Full-screen --ink overlay with a 0→100 count tied to REAL frame preload
 * progress. When frames are ready it wipes up with a clip-path reveal.
 * Shows once per session; covers the heavy frame fetch.
 */
export default function Preloader() {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;

    // Already shown this session → skip immediately.
    const seen = sessionStorage.getItem(SESSION_KEY);
    if (seen) {
      setActive(false);
      // still ensure frames load for the hero
      startPreload();
      return;
    }

    // lock scroll while preloading
    document.documentElement.style.overflow = "hidden";

    const { done } = startPreload();
    let raf = 0;
    let displayed = 0;

    const unsub = subscribeProgress((loaded, total) => {
      const target = total > 0 ? Math.round((loaded / total) * 100) : 100;
      // ease the displayed number toward target so it never snaps
      cancelAnimationFrame(raf);
      const animate = () => {
        displayed += (target - displayed) * 0.2;
        if (Math.abs(target - displayed) < 0.5) displayed = target;
        setCount(Math.round(displayed));
        if (displayed !== target) raf = requestAnimationFrame(animate);
      };
      raf = requestAnimationFrame(animate);
    });

    const minTime = new Promise((r) => setTimeout(r, reduced ? 200 : 900));

    Promise.all([done, minTime]).then(() => {
      setCount(100);
      const finish = () => {
        document.documentElement.style.overflow = "";
        sessionStorage.setItem(SESSION_KEY, "1");
        setActive(false);
      };

      if (reduced || !rootRef.current) {
        finish();
        return;
      }

      gsap
        .timeline({ onComplete: finish })
        .to(rootRef.current.querySelector("[data-count]"), {
          opacity: 0,
          y: -10,
          duration: 0.5,
          ease: "power3.inOut",
        })
        .to(
          rootRef.current,
          {
            clipPath: "inset(0% 0% 100% 0%)",
            duration: 1,
            ease: "power4.inOut",
          },
          "-=0.1"
        );
    });

    return () => {
      cancelAnimationFrame(raf);
      unsub();
      document.documentElement.style.overflow = "";
    };
  }, [mounted, reduced]);

  if (!mounted || !active) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink text-bone"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
      aria-hidden
    >
      <div className="flex flex-col items-center gap-6">
        <span className="label text-brass">{site.discipline}</span>
        <span className="font-display text-[clamp(2.5rem,9vw,6rem)] leading-none">
          {site.brand}
        </span>
      </div>

      <div
        data-count
        className="absolute bottom-8 left-0 right-0 flex items-end justify-between px-6 md:bottom-12 md:px-12"
      >
        <span className="label text-bone/50">{site.established}</span>
        <span className="font-display text-[clamp(3rem,12vw,9rem)] leading-none tabular-nums">
          {count}
          <span className="label align-top text-brass">%</span>
        </span>
      </div>
    </div>
  );
}
