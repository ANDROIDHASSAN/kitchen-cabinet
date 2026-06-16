# Maison&Noir — Awwwards-tier kitchen cabinet portfolio

A cinematic, motion-led portfolio for a high-end bespoke cabinetry / modular-kitchen
maker. The signature is a **scroll-scrubbed frame sequence** hero (a workshop → finished
kitchen reveal) plus an interactive **Materials Lab**. Built to feel like craftsmanship:
restraint, weight, generous space, one rationed brass accent.

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** (CSS-based `@theme` tokens — no `tailwind.config.js`)
- **Lenis** — momentum smooth scroll, synced to GSAP's ticker
- **GSAP + ScrollTrigger** — hero canvas scrub, horizontal pin, sticky process
- **Framer Motion** — reveals, micro-interactions, page chrome
- **Radix Dialog** — accessible lightbox

## Run

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build (type-checked, static)
npm start
```

## The design system

Tokens live in [`app/globals.css`](app/globals.css) (`@theme`) and motion tokens in
[`lib/motion.ts`](lib/motion.ts).

| Token | Hex | Role |
|---|---|---|
| `bone` | `#EDE9E2` | primary background (gallery plaster) |
| `ink` | `#1B1916` | text / near-black (never pure black) |
| `forest` | `#20342B` | dark sections, hero tint |
| `brass` | `#A6824C` | the single accent — **rationed** |
| `walnut` | `#5B4636` | wood / secondary surfaces |
| `mist` | `#D7D1C7` | hairline dividers |

Type: **Fraunces** (display serif, free PP-Editorial-New fallback), **Geist** (body),
**Geist Mono** (the uppercase "spec-sheet" labels — the brand's structural device).
All self-hosted via `next/font`.

## Everything is swappable (data-driven)

No component hardcodes copy or image paths. Edit the files in [`data/`](data/):

| File | Controls |
|---|---|
| `site.ts` | brand, nav, footer, contact, socials |
| `projects.ts` | signature kitchens (horizontal pinned section) |
| `portfolio.ts` | filterable masonry grid + filter list |
| `materials.ts` | Materials Lab swatches, tones, previews |
| `process.ts` | the 4 sticky process steps |
| `capabilities.ts` | the asymmetric craft grid |
| `testimonials.ts` | quotes + client-name marquee |
| `stats.ts` | count-up numbers + recognition marquee |

Section imagery goes in `public/projects`, `public/materials`, `public/process`.
**Placeholders:** until real photography is supplied, the data files reuse a few hero
frames so the layout is real — search for `/images/frame_` in `data/` to find them.

## The hero frame sequence

Source frames live in [`public/images/`](public/images) as `frame_###.jpg`. They are
**non-contiguous** (002, 003, 005, 007, 016 …) — the manifest never assumes a range.

```bash
npm run frames       # regenerates data/frames.json from whatever is in public/images
```

[`components/HeroFrames.tsx`](components/HeroFrames.tsx) preloads the frames (behind the
preloader, which counts real load progress), then a pinned `<canvas>` scrubs through them
on scroll with DPR-aware cover-fit drawing, redrawing only on frame-index change + resize.

**Performance note:** this sequence is 31 frames at 1280×720, ~3.2 MB total, so a separate
WebP/960px mobile set was intentionally skipped — the whole sequence is lighter than a
single hero photo on most sites. If you swap in a heavier sequence, convert to WebP at
~1600px (desktop) / ~960px (mobile) and re-run `npm run frames`.

## Accessibility & motion

`prefers-reduced-motion` is respected everywhere via
[`lib/useReducedMotion.ts`](lib/useReducedMotion.ts): Lenis is disabled (native scroll),
the hero shows a static finished frame (no scrub/pin), reveals fade instead of move, and
the custom cursor + magnetic button + marquees are disabled. Focus is visible (brass
outline), images have alt text, the lightbox is a focus-trapped Radix dialog.

## Section map

Hero (frames) → Manifesto → Signature Projects (horizontal pin) → Capabilities →
Materials Lab → Process (sticky) → Stats (count-up) → Portfolio (filter + lightbox) →
Testimonials → Recognition → CTA (magnetic) → Footer.
