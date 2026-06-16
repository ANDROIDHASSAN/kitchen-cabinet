// data/testimonials.ts
// Quiet social proof (§5.8). Architects matter most to this audience — keep one.

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "They treated our kitchen like a piece of architecture. Five years on, it still feels like the best decision of the build.",
    author: "Eleonora V.",
    role: "Homeowner · Villa Lucerna",
  },
  {
    quote:
      "I specify a lot of joinery. Maison&Noir are the only studio I hand the drawings to and stop worrying.",
    author: "James Harlow",
    role: "Architect · Harlow & Pike",
  },
  {
    quote:
      "The tolerances are absurd in the best way. Every door shuts with the same soft, deliberate weight.",
    author: "Priya N.",
    role: "Homeowner · Atelier Noir",
  },
];

// Slow scroll-velocity marquee of client/partner names (§5.8/§5.9).
export const clientNames = [
  "Harlow & Pike",
  "Studio Lucerna",
  "Foster Residences",
  "Brera Architetti",
  "The Mews Group",
  "Nilsson Interiors",
  "Calloway Homes",
  "Atelier Verde",
];
