// data/projects.ts
// Flagship kitchens. SWAP `cover`/`gallery` with real photography in /public/projects.
// Until then we reuse a few hero frames as placeholders so the layout is real.
// `style` is also used by the Portfolio filter (§5.7) — keep values consistent.

export type Project = {
  slug: string;
  name: string;
  location: string;
  year: string;
  style: "Modern" | "Classic" | "Minimal" | "Luxury";
  materials: string;
  cover: string;
  gallery: string[];
};

export const projects: Project[] = [
  {
    slug: "casa-brera",
    name: "Casa Brera",
    location: "Milan, IT",
    year: "2025",
    style: "Modern",
    materials: "Smoked oak · honed marble · brushed brass",
    cover: "/projects/casa-brera.png",
    gallery: ["/projects/casa-brera.png"],
  },
  {
    slug: "the-hampstead-house",
    name: "The Hampstead House",
    location: "London, UK",
    year: "2024",
    style: "Classic",
    materials: "Hand-painted ash · Carrara · aged nickel",
    cover: "/projects/hampstead-house.png",
    gallery: ["/projects/hampstead-house.png"],
  },
  {
    slug: "atelier-noir",
    name: "Atelier Noir",
    location: "Mumbai, IN",
    year: "2025",
    style: "Minimal",
    materials: "Matte lacquer · basalt · blackened steel",
    cover: "/projects/atelier-noir.png",
    gallery: ["/projects/atelier-noir.png"],
  },
  {
    slug: "villa-lucerna",
    name: "Villa Lucerna",
    location: "Como, IT",
    year: "2023",
    style: "Luxury",
    materials: "Walnut burl · onyx · polished brass",
    cover: "/projects/villa-lucerna.png",
    gallery: ["/projects/villa-lucerna.png"],
  },
  {
    slug: "the-mews",
    name: "The Mews",
    location: "London, UK",
    year: "2024",
    style: "Modern",
    materials: "Fumed oak · quartzite · satin brass",
    cover: "/projects/the-mews.png",
    gallery: ["/projects/the-mews.png"],
  },
];
