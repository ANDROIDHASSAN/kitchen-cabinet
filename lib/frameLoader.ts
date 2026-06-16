// lib/frameLoader.ts
// Module-level singleton that preloads the hero frame sequence ONCE and exposes
// real load progress. The Preloader subscribes to drive its 0→100 counter; the
// HeroFrames canvas consumes the same images for the scrub.

import framesJson from "@/data/frames.json";

const FRAMES = framesJson as string[];

type Listener = (loaded: number, total: number) => void;

let started = false;
// Using a sparse array to hold images as they load in progressive order
const images: (HTMLImageElement | null)[] = new Array(FRAMES.length).fill(null);
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

export function getImages(): (HTMLImageElement | null)[] {
  return images;
}

/**
 * Computes a progressive loading order:
 * 1. Frame 0 and the final frame.
 * 2. Every 8th frame.
 * 3. Every 4th frame.
 * 4. Every 2nd frame.
 * 5. All remaining frames.
 */
export function getLoadingOrder(length: number): number[] {
  const order: number[] = [];
  const visited = new Set<number>();

  const add = (idx: number) => {
    if (idx >= 0 && idx < length && !visited.has(idx)) {
      visited.add(idx);
      order.push(idx);
    }
  };

  // 1. Core anchors
  add(0);
  add(length - 1);

  // 2. Coarse sequence (every 8th frame)
  for (let i = 0; i < length; i += 8) {
    add(i);
  }

  // 3. Medium-coarse sequence (every 4th frame)
  for (let i = 0; i < length; i += 4) {
    add(i);
  }

  // 4. Medium-fine sequence (every 2nd frame)
  for (let i = 0; i < length; i += 2) {
    add(i);
  }

  // 5. Fine sequence (all remaining frames)
  for (let i = 0; i < length; i++) {
    add(i);
  }

  return order;
}

/** Begin progressive, throttled preloading. */
export function startPreload(): { images: (HTMLImageElement | null)[]; done: Promise<void> } {
  if (started || typeof window === "undefined") return { images, done: donePromise };
  started = true;

  if (FRAMES.length === 0) {
    resolveDone();
    return { images, done: donePromise };
  }

  const order = getLoadingOrder(FRAMES.length);
  const CONCURRENCY = 6; // Limit active connections
  let nextQueueIdx = 0;

  function loadNext() {
    if (nextQueueIdx >= order.length) return;

    const targetIdx = order[nextQueueIdx++];
    const src = FRAMES[targetIdx];

    const img = new Image();
    img.decoding = "async";

    const onSettle = () => {
      images[targetIdx] = img;
      loadedCount += 1;
      emit();
      if (loadedCount >= FRAMES.length) {
        resolveDone();
      }
      loadNext(); // Pull next image from queue
    };

    img.onload = onSettle;
    img.onerror = onSettle; // missing/failed frames shouldn't block the sequence
    img.src = src;
  }

  // Spawn initial concurrent loaders
  const startLimit = Math.min(CONCURRENCY, order.length);
  for (let i = 0; i < startLimit; i++) {
    loadNext();
  }

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
