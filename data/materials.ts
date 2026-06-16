// data/materials.ts
// The Materials & Finishes Lab (§5.4) — the second signature, interactive.
// `swatch` is a flat color used for the selectable chip; `tone` is the accent the
// whole section shifts toward when selected; `preview` is the large image.
// SWAP `preview` with real macro photography of each finish in /public/materials.

export type Material = {
  id: string;
  name: string;
  type: "Wood" | "Lacquer" | "Stone" | "Metal";
  spec: string; // spec-sheet line
  swatch: string; // chip color
  tone: string; // section accent shift
  preview: string;
};

export const materials: Material[] = [
  {
    id: "smoked-oak",
    name: "Smoked Oak",
    type: "Wood",
    spec: "Rift-cut · brushed · hard-wax oil",
    swatch: "#6f5740",
    tone: "#5B4636",
    preview: "/materials/smoked-oak.png",
  },
  {
    id: "walnut-burl",
    name: "Walnut Burl",
    type: "Wood",
    spec: "Book-matched · open-pore · satin",
    swatch: "#4b3526",
    tone: "#4b3526",
    preview: "/materials/walnut-burl.png",
  },
  {
    id: "teak",
    name: "Reclaimed Teak",
    type: "Wood",
    spec: "Reclaimed · planed · natural oil",
    swatch: "#8a6a45",
    tone: "#7a5a38",
    preview: "/materials/reclaimed-teak.png",
  },
  {
    id: "matte-lacquer",
    name: "Graphite Lacquer",
    type: "Lacquer",
    spec: "9-layer · matte · anti-fingerprint",
    swatch: "#2a2a2a",
    tone: "#26272a",
    preview: "/materials/graphite-lacquer.png",
  },
  {
    id: "bone-lacquer",
    name: "Bone Gloss",
    type: "Lacquer",
    spec: "High-gloss · hand-polished",
    swatch: "#e3ddd2",
    tone: "#b9ad97",
    preview: "/materials/bone-gloss.png",
  },
  {
    id: "carrara",
    name: "Carrara Marble",
    type: "Stone",
    spec: "Honed · 20mm · mitred edge",
    swatch: "#cfccc4",
    tone: "#9a9488",
    preview: "/materials/carrara-marble.png",
  },
  {
    id: "onyx",
    name: "Green Onyx",
    type: "Stone",
    spec: "Backlit · 12mm · book-matched",
    swatch: "#3c5347",
    tone: "#20342B",
    preview: "/materials/green-onyx.png",
  },
  {
    id: "brass",
    name: "Brushed Brass",
    type: "Metal",
    spec: "Solid · brushed · lacquer-sealed",
    swatch: "#a6824c",
    tone: "#A6824C",
    preview: "/materials/brushed-brass.png",
  },
  {
    id: "blackened-steel",
    name: "Blackened Steel",
    type: "Metal",
    spec: "Hot-rolled · patinated · waxed",
    swatch: "#33312e",
    tone: "#2b2a27",
    preview: "/materials/blackened-steel.png",
  },
];
