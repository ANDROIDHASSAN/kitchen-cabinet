"use client";

import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

/**
 * Slow CSS marquee (§5.9). Duplicates children for a seamless loop; pauses on
 * hover. Reduced motion → static, wrapped row. No JS rAF cost.
 */
export default function Marquee({
  children,
  className,
  speed = 40,
  reverse = false,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number; // seconds per loop — higher = slower
  reverse?: boolean;
}) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return (
      <div className={cn("flex flex-wrap gap-x-12 gap-y-4", className)}>{children}</div>
    );
  }

  return (
    <div className={cn("group relative flex overflow-hidden", className)}>
      <div
        className="flex shrink-0 items-center will-change-transform group-hover:[animation-play-state:paused]"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
        aria-hidden={false}
      >
        {children}
      </div>
      <div
        className="flex shrink-0 items-center will-change-transform group-hover:[animation-play-state:paused]"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
        aria-hidden
      >
        {children}
      </div>
      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}
