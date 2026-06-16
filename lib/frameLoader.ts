// lib/frameLoader.ts
// Module-level singleton that preloads the hero frame sequence ONCE and exposes
// real load progress. The Preloader subscribes to drive its 0→100 counter; the
// HeroFrames canvas consumes the same decoded Image[] for the scrub. Loading the
// sequence here (behind the preloader overlay) is what hides the heavy fetch.

import framesJson from "@/data/frames.json";

const FRAMES = framesJson as string[];

type Listener = (loaded: number, total: number) => void;

let started = false;
const images: HTMLImageElement[] = [];
let loadedCount = 0;
const listeners = new Set<Listener>();

let resolveDone: () => void;
const donePromise = new Promise<void>((r) => {
  resolveDone = r;
});

function emit() {
  for (const l of listeners) l(loadedCount, FRAMES.length);
}

export function getFrameList(): string[] {
  return FRAMES;
}

export function getImages(): HTMLImageElement[] {
  return images;
}

/** Begin (idempotent) preloading. Safe to call from multiple components. */
export function startPreload(): { images: HTMLImageElement[]; done: Promise<void> } {
  if (started || typeof window === "undefined") return { images, done: donePromise };
  started = true;

  FRAMES.forEach((src, i) => {
    const img = new Image();
    img.decoding = "async";
    const onSettle = () => {
      loadedCount += 1;
      emit();
      if (loadedCount >= FRAMES.length) resolveDone();
    };
    img.onload = onSettle;
    img.onerror = onSettle; // a missing frame must never block the sequence
    img.src = src;
    images[i] = img;
  });

  // Edge case: empty manifest
  if (FRAMES.length === 0) resolveDone();

  return { images, done: donePromise };
}

export function subscribeProgress(cb: Listener): () => void {
  listeners.add(cb);
  cb(loadedCount, FRAMES.length);
  return () => listeners.delete(cb);
}

export function framesReady(): Promise<void> {
  return donePromise;
}
