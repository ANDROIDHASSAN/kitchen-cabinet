"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { framesReady } from "@/lib/frameLoader";

gsap.registerPlugin(ScrollTrigger);

// Lenis momentum scroll synced to GSAP's ticker so ScrollTrigger and Lenis never
// fight. Reduced motion → skip Lenis entirely (native scroll), but ScrollTrigger
// still works off the native scroller.
export default function SmoothScroll() {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      lerp: 0.1,
      smoothWheel: true,
      // ignore the canvas/forms swallowing wheel; let momentum stay consistent
      syncTouch: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    // single tick fn so add/remove reference the same function
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Recompute every pin/trigger once layout truly settles. Pins are created in
    // child components (hero, horizontal projects) and fonts/images shift heights,
    // so we refresh on load, after the frame sequence is ready, and on a couple of
    // safety timers. Without this the pin math desyncs and scrolling "breaks".
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    framesReady().then(() => requestAnimationFrame(refresh));
    const timers = [600, 1500, 3000].map((t) => window.setTimeout(refresh, t));

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.removeEventListener("load", refresh);
      timers.forEach(clearTimeout);
    };
  }, [reduced]);

  return null;
}
