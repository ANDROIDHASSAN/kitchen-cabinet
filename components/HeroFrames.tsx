"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { RevealLines } from "@/components/RevealText";
import { site } from "@/data/site";
import { getFrameList, getImages, startPreload, framesReady } from "@/lib/frameLoader";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-synced headline narrative. As the scrub progresses (raw timber →
 * built → finished kitchen) the text crossfades through these stages. Each
 * stage owns a progress window: it fades in over `in`, holds, fades out over
 * `out`. Edit copy here. `out: [2, 2]` means "never fade out" (last stage).
 */
const STAGES = [
  {
    lines: ["Kitchens, made", "to outlast trends."],
    caption:
      "A studio of cabinetmakers working in wood, lacquer, stone and brass — one bespoke kitchen at a time.",
    in: [0, 0] as [number, number],
    out: [0.2, 0.3] as [number, number],
    center: 0.06,
  },
  {
    lines: ["Drawn to the", "millimetre."],
    caption: "Every joint, runner and reveal — measured, then made by hand.",
    in: [0.34, 0.44] as [number, number],
    out: [0.56, 0.66] as [number, number],
    center: 0.5,
  },
  {
    lines: ["A kitchen for", "a lifetime."],
    caption: "Finished in place, levelled to the room, built to be inherited.",
    in: [0.7, 0.8] as [number, number],
    out: [2, 2] as [number, number],
    center: 0.86,
  },
];

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

// Opacity of a stage at scroll progress p, given its in/out windows.
function stageOpacity(p: number, s: (typeof STAGES)[number]) {
  if (p < s.in[0]) return 0;
  const rise = s.in[1] === s.in[0] ? 1 : clamp01((p - s.in[0]) / (s.in[1] - s.in[0]));
  const fall = s.out[1] === s.out[0] ? 1 : 1 - clamp01((p - s.out[0]) / (s.out[1] - s.out[0]));
  return Math.min(rise, fall);
}

/**
 * ⭐ THE SIGNATURE. A pinned full-viewport <canvas> scrubs through the JPG frame
 * sequence as the user scrolls. Frames ONLY — no carousels, no video, nothing
 * competes. DPR-aware cover-fit drawing; redraws only on index change + resize.
 * The headline narrative (STAGES) crossfades in sync with the scrub.
 */
export default function HeroFrames() {
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cueRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  // Kick the shared preload (idempotent — Preloader may already have).
  useEffect(() => {
    startPreload();
    framesReady().then(() => setReady(true));
    // also flip ready once the first frame is decodable, so we never wait on all
    const id = setInterval(() => {
      if (getImages()[0]?.complete) {
        setReady(true);
        clearInterval(id);
      }
    }, 60);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const frames = getFrameList();
    const images = getImages();
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const section = sectionRef.current;
    if (!canvas || !wrap || !section || frames.length === 0) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // target = where the scroll wants us; current = eased value we actually render.
    // The gap between them, smoothed every animation frame, is what makes the
    // sequence glide and settle like video instead of snapping per scroll event.
    const state = { target: 0, current: 0, w: 0, h: 0 };
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // GPU-ready bitmaps decoded ONCE up-front. Drawing an ImageBitmap never
    // triggers a synchronous JPEG decode, so every paint during the scrub is
    // instant — this is what removes the per-frame hitching/jank.
    type Frame = ImageBitmap | HTMLImageElement;
    const bitmaps: (ImageBitmap | null)[] = new Array(frames.length).fill(null);

    const decodeAll = () => {
      images.forEach((img, i) => {
        if (bitmaps[i] || !img || !img.complete || img.naturalWidth === 0) return;
        // 'pixelated:false' default; decode at source resolution
        createImageBitmap(img)
          .then((bm) => {
            bitmaps[i] = bm;
          })
          .catch(() => {});
      });
    };

    const dimsOf = (s: Frame): [number, number] =>
      s instanceof ImageBitmap ? [s.width, s.height] : [s.naturalWidth, s.naturalHeight];
    const ok = (s?: Frame | null): s is Frame =>
      !!s && (s instanceof ImageBitmap ? s.width > 0 : s.complete && s.naturalWidth > 0);
    // prefer the decoded bitmap; fall back to the <img> until it's ready
    const frameAt = (i: number): Frame | null => bitmaps[i] ?? images[i] ?? null;

    // cover-fit draw of one frame at the current globalAlpha
    const drawCover = (s: Frame) => {
      const { w, h } = state;
      const [iw, ih] = dimsOf(s);
      const r = Math.max(w / iw, h / ih);
      const nw = iw * r;
      const nh = ih * r;
      ctx.drawImage(s, (w - nw) / 2, (h - nh) / 2, nw, nh);
    };

    // Blend the two frames that straddle the current fractional position so the
    // 31 sparse source frames read as one continuous dissolve — no hard cuts.
    // smoothstep so the dissolve eases in/out at each frame boundary (gentler
    // than a linear crossfade — removes the "ghost at 50%" look).
    const smooth = (t: number) => t * t * (3 - 2 * t);

    const render = () => {
      const { w, h } = state;
      const n = frames.length;
      const fidx = state.current * (n - 1);
      const i0 = Math.max(0, Math.min(n - 1, Math.floor(fidx)));
      const i1 = Math.min(n - 1, i0 + 1);
      const frac = smooth(fidx - i0);

      ctx.fillStyle = "#1B1916";
      ctx.fillRect(0, 0, w, h);

      const a = frameAt(i0);
      const b = frameAt(i1);
      // base frame (fall back to the next one if this one isn't decoded yet)
      ctx.globalAlpha = 1;
      if (ok(a)) drawCover(a);
      else if (ok(b)) drawCover(b);
      // crossfade the next frame over the base
      if (i1 !== i0 && frac > 0.001 && ok(a) && ok(b)) {
        ctx.globalAlpha = frac;
        drawCover(b);
        ctx.globalAlpha = 1;
      }
    };

    // Eased render loop: every animation frame, glide `current` a fraction of the
    // way toward `target` and repaint. Self-stops once settled (no perpetual rAF),
    // and any scroll update revives it. SMOOTH lower = smoother / more inertia.
    const SMOOTH = 0.1;
    let rafId = 0;
    let running = false;
    const tick = () => {
      const diff = state.target - state.current;
      if (Math.abs(diff) < 0.0002) {
        state.current = state.target;
        render();
        running = false;
        rafId = 0;
        return;
      }
      state.current += diff * SMOOTH;
      render();
      rafId = requestAnimationFrame(tick);
    };
    const requestRender = () => {
      if (!running) {
        running = true;
        rafId = requestAnimationFrame(tick);
      }
    };

    // Measure off the viewport — the pinned wrap is always full-viewport, and this
    // avoids stale clientWidth readings before GSAP's pin layout settles.
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      state.w = w;
      state.h = h;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      render();
    };

    resize();
    window.addEventListener("resize", resize);
    // re-measure after pin layout / fonts settle
    ScrollTrigger.addEventListener("refresh", resize);
    requestAnimationFrame(resize);

    // ---- Reduced motion: show the most-resolved (last) frame, no scrub ----
    if (reduced) {
      const settle = () => {
        state.target = 1;
        state.current = 1;
        render();
      };
      framesReady().then(settle);
      settle();
      return () => window.removeEventListener("resize", resize);
    }

    // ---- The scrub ----
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      pin: wrap,
      pinSpacing: true,
      scrub: 0.4,
      onUpdate: (self) => {
        const p = self.progress;
        // feed the eased loop a new target; it glides `current` toward it
        state.target = p;
        requestRender();

        // Crossfade the headline narrative in sync with the build.
        STAGES.forEach((s, k) => {
          const el = stageRefs.current[k];
          if (!el) return;
          const op = stageOpacity(p, s);
          // rise from below when entering, lift away when leaving
          const y = (p < s.center ? 1 : -1) * (1 - op) * 26;
          el.style.opacity = String(op);
          el.style.transform = `translateY(${y}px)`;
          el.style.pointerEvents = op > 0.6 ? "auto" : "none";
        });
        // Eyebrow fades out early so it never lingers over the finished kitchen.
        if (eyebrowRef.current) {
          eyebrowRef.current.style.opacity = String(1 - clamp01((p - 0.05) / 0.13));
        }
        // Scroll cue disappears after any scroll.
        if (cueRef.current) {
          cueRef.current.style.opacity = p > 0.01 ? "0" : "1";
        }
      },
    });

    // Pre-decode everything to GPU bitmaps the moment the JPEGs are ready, then
    // keep trying for any stragglers. Redraw as frames/bitmaps stream in.
    decodeAll();
    framesReady().then(() => {
      decodeAll();
      render();
    });
    const drawId = setInterval(() => {
      decodeAll();
      render();
    }, 150);
    setTimeout(() => clearInterval(drawId), 6000);

    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("resize", resize);
      ScrollTrigger.removeEventListener("refresh", resize);
      clearInterval(drawId);
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      bitmaps.forEach((b) => b?.close());
      st.kill();
    };
  }, [reduced, ready]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-[380vh] bg-ink"
      aria-label="Maison&Noir — a kitchen, built"
    >
      <div ref={wrapRef} className="relative h-screen w-full overflow-hidden">
        {/* The frame sequence */}
        <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />

        {/* Legibility scrim — forest→transparent, top and bottom */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-forest/55 via-transparent to-ink/55" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />

        {/* Overlay — the ONLY text on the frames */}
        <div className="absolute inset-0 flex flex-col justify-between px-6 py-24 text-bone md:px-12 md:py-28">
          <motion.div
            ref={eyebrowRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="label flex items-center gap-3 text-bone/80"
          >
            <span className="inline-block h-px w-10 bg-brass" />
            {site.discipline} · {site.established}
          </motion.div>

          {/* Stacked headline narrative — crossfades with the scrub */}
          <div className="relative flex-1">
            {STAGES.map((stage, k) => (
              <div
                key={k}
                ref={(el) => {
                  stageRefs.current[k] = el;
                }}
                className="absolute bottom-0 left-0 right-0"
                style={{ opacity: k === 0 ? 1 : 0, willChange: "opacity, transform" }}
              >
                {k === 0 ? (
                  <RevealLines
                    as="h1"
                    start
                    delay={0.35}
                    className="font-display text-[clamp(2.25rem,7.4vw,7.5rem)] font-light text-bone"
                    lineClassName="whitespace-nowrap"
                    lines={stage.lines}
                  />
                ) : (
                  <div
                    className="font-display text-[clamp(2.25rem,7.4vw,7.5rem)] font-light leading-[0.98] text-bone"
                    aria-hidden
                  >
                    {stage.lines.map((line, li) => (
                      <span key={li} className="block whitespace-nowrap">
                        {line}
                      </span>
                    ))}
                  </div>
                )}
                <p className="mt-6 max-w-[42ch] text-balance text-bone/75">
                  {stage.caption}
                </p>
              </div>
            ))}
          </div>

          {/* Scroll cue */}
          <div
            ref={cueRef}
            className="mt-8 flex items-center justify-between transition-opacity duration-500"
          >
            <span className="label text-bone/70">Scroll to enter</span>
            <motion.span
              aria-hidden
              className="label text-bone/70"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              ↓
            </motion.span>
          </div>
        </div>

        {/* Loading shim until the first frame is ready (no layout shift) */}
        {!ready && (
          <div className="absolute inset-0 grid place-items-center bg-ink">
            <span className="label text-bone/40">Loading sequence…</span>
          </div>
        )}
      </div>
    </section>
  );
}
