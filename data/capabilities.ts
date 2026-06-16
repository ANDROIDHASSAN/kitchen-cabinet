// data/capabilities.ts
// Capabilities / Craft (§5.3) — an editorial asymmetric grid, not a 3-card row.
// `size` drives the asymmetric layout. SWAP `image` in /public/projects.

export type Capability = {
  label: string;
  blurb: string;
  image: string;
  size: "lg" | "md" | "sm";
};

export const capabilities: Capability[] = [
  {
    label: "Modular Kitchens",
    blurb: "Systemised, made bespoke — the efficiency of modular, finished like furniture.",
    image: "/capabilities/modular-kitchens.png",
    size: "lg",
  },
  {
    label: "Bespoke Cabinetry",
    blurb: "One-off cabinets drawn for the room they live in.",
    image: "/capabilities/bespoke-cabinetry.png",
    size: "md",
  },
  {
    label: "Islands",
    blurb: "The social heart — stone, storage and seating as one mass.",
    image: "/capabilities/islands.png",
    size: "sm",
  },
  {
    label: "Tall Units & Pantry",
    blurb: "Full-height storage that disappears into the wall.",
    image: "/capabilities/tall-units.png",
    size: "sm",
  },
  {
    label: "Wardrobes & Joinery",
    blurb: "The same hand carried through the rest of the home.",
    image: "/capabilities/wardrobes.png",
    size: "md",
  },
  {
    label: "Hardware & Finishes",
    blurb: "Brass, steel and lacquer — the details you feel before you see.",
    image: "/capabilities/hardware.png",
    size: "lg",
  },
];
