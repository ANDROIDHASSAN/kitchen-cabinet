"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/utils";

/**
 * Cursor-follow magnetic button (§5.10). The element drifts toward the cursor
 * within a small radius, then settles back. Disabled for reduced motion / touch.
 */
export default function MagneticButton({
  children,
  className,
  href,
  onClick,
  strength = 0.4,
  "aria-label": ariaLabel,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  strength?: number;
  "aria-label"?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // weighted settle — soft, no bounce
  const sx = useSpring(x, { stiffness: 150, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 150, damping: 18, mass: 0.6 });

  function onMove(e: React.MouseEvent) {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const mx = e.clientX - (r.left + r.width / 2);
    const my = e.clientY - (r.top + r.height / 2);
    x.set(mx * strength);
    y.set(my * strength);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  const inner = (
    <motion.span
      style={{ x: sx, y: sy }}
      className="inline-flex items-center justify-center"
    >
      {children}
    </motion.span>
  );

  const base = cn(
    "group relative inline-flex items-center justify-center select-none",
    className
  );

  if (href) {
    return (
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        data-cursor="action"
        className="inline-block"
      >
        <a href={href} className={base} aria-label={ariaLabel} onClick={onClick}>
          {inner}
        </a>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      data-cursor="action"
      className="inline-block"
    >
      <button type="button" className={base} aria-label={ariaLabel} onClick={onClick}>
        {inner}
      </button>
    </div>
  );
}
