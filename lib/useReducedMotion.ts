"use client";
import { useEffect, useState } from "react";

// Single source of truth for prefers-reduced-motion across the app.
// Returns true when the user wants reduced motion → callers disable scrub,
// show static frames, fade instead of move.
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}
