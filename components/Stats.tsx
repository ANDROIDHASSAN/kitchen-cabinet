"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { stats } from "@/data/stats";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

/**
 * §5.6 — By the Numbers. Restrained stats that count up in view. Big serif
 * numerals, mono labels, lots of space. Proof, quietly.
 */
function CountUp({ to, duration = 1.8 }: { to: number; duration?: number }) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setVal(to);
      return;
    }
    let raf = 0;
    let start: number | null = null;
    const ease = (t: number) => 1 - Math.pow(1 - t, 4); // expo-out feel
    const tick = (t: number) => {
      if (start === null) start = t;
      const p = Math.min(1, (t - start) / (duration * 1000));
      setVal(Math.round(ease(p) * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduced]);

  return (
    <span ref={ref} className="tabular-nums">
      {val}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="cv-auto bg-bone py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <span className="label mb-14 block text-walnut md:mb-20">By the numbers</span>
        <div className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-4 md:gap-x-10">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-4 border-t border-mist pt-6">
              <span className="font-display text-[clamp(3rem,8vw,7rem)] font-light leading-none text-ink">
                {s.prefix}
                <CountUp to={s.value} />
                {s.suffix && <span className="text-brass">{s.suffix}</span>}
              </span>
              <span className="label text-ink/55">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
