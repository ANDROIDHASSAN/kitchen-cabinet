"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

/**
 * Tasteful custom cursor: a small brass-ringed dot that scales on interactive
 * elements and flips to a "VIEW" pill over project media. Hidden on touch /
 * coarse pointers and when reduced motion is requested.
 *
 * Targets are opted-in via `data-cursor="action" | "view"` attributes, plus all
 * links/buttons automatically.
 */
export default function Cursor() {
  const reduced = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<"default" | "action" | "view">("default");
  const [hidden, setHidden] = useState(true);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || reduced) {
      document.body.classList.remove("has-cursor");
      setEnabled(false);
      return;
    }
    setEnabled(true);
    document.body.classList.add("has-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);

      const el = (e.target as HTMLElement)?.closest(
        "[data-cursor], a, button, input, [role='button']"
      ) as HTMLElement | null;

      if (!el) {
        setVariant("default");
      } else {
        const c = el.getAttribute("data-cursor");
        setVariant(c === "view" ? "view" : "action");
      }
    };

    const leave = () => setHidden(true);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.body.classList.remove("has-cursor");
    };
  }, [reduced, x, y]);

  if (!enabled) return null;

  const size = variant === "view" ? 76 : variant === "action" ? 44 : 10;

  return (
    <motion.div
      ref={ring}
      className="pointer-events-none fixed left-0 top-0 z-[150] flex items-center justify-center rounded-full mix-blend-difference"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: size,
        height: size,
        opacity: hidden ? 0 : 1,
        backgroundColor: variant === "default" ? "#EDE9E2" : "rgba(237,233,226,0)",
        border: variant === "default" ? "0px solid #A6824C" : "1px solid #EDE9E2",
      }}
      transition={{ type: "spring", stiffness: 350, damping: 30, mass: 0.5 }}
    >
      {variant === "view" && (
        <span
          className="label text-bone"
          style={{ fontSize: 10, letterSpacing: "0.12em" }}
        >
          View
        </span>
      )}
    </motion.div>
  );
}
