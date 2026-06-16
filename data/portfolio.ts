// data/portfolio.ts
// The filterable masonry grid (§5.7). More entries than the signature set.
// SWAP `image` with real photography in /public/projects; keep `style` values
// in sync with the filter list below.

export type PortfolioItem = {
  id: string;
  name: string;
  location: string;
  style: "Modern" | "Classic" | "Minimal" | "Luxury";
  image: string;
  span?: "tall" | "wide"; // masonry hint
};

export const portfolioFilters = ["All", "Modern", "Classic", "Minimal", "Luxury"] as const;

export const portfolio: PortfolioItem[] = [
  { id: "p1", name: "Casa Brera", location: "Milan", style: "Modern", image: "/projects/casa-brera.png", span: "tall" },
  { id: "p2", name: "The Mews", location: "London", style: "Modern", image: "/projects/the-mews.png" },
  { id: "p3", name: "Hampstead House", location: "London", style: "Classic", image: "/projects/hampstead-house.png", span: "wide" },
  { id: "p4", name: "Atelier Noir", location: "Mumbai", style: "Minimal", image: "/projects/atelier-noir.png" },
  { id: "p5", name: "Villa Lucerna", location: "Como", style: "Luxury", image: "/projects/villa-lucerna.png", span: "tall" },
  { id: "p6", name: "Quartz Loft", location: "Milan", style: "Minimal", image: "/projects/quartz-loft.png" },
  { id: "p7", name: "The Orangery", location: "Surrey", style: "Classic", image: "/projects/the-orangery.png" },
  { id: "p8", name: "Onyx Penthouse", location: "Mumbai", style: "Luxury", image: "/projects/onyx-penthouse.png", span: "wide" },
  { id: "p9", name: "Fumé Kitchen", location: "London", style: "Modern", image: "/projects/fume-kitchen.png" },
];
