// scripts/gen-frames.mjs
// Generates data/frames.json — a sorted manifest of the hero frame sequence.
// The source frames are NON-CONTIGUOUS (002, 003, 005, 007, 016 …); we never
// assume a numeric range. Drop new frames into public/images and re-run:
//     node scripts/gen-frames.mjs
import { readdirSync, writeFileSync } from "fs";

// The hero SCROLL sequence is served from /images2 (set via FRAME_DIR if you
// move it). Section imagery lives separately in /images.
const FRAME_DIR = "images2";
const dir = `public/${FRAME_DIR}`;
const frames = readdirSync(dir)
  .filter((f) => /^frame_\d+\.(jpg|jpeg|png|webp)$/i.test(f))
  .sort((a, b) => parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]))
  .map((f) => `/${FRAME_DIR}/${f}`);

writeFileSync("data/frames.json", JSON.stringify(frames, null, 2));
console.log(`Wrote ${frames.length} frames to data/frames.json`);
