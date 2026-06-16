// data/site.ts
// Brand, navigation, footer and contact. EDIT HERE to rebrand the whole site —
// no component hardcodes copy. Swap the wordmark string, nav labels, contact, socials.

export const site = {
  brand: "MAISON&NOIR", // wordmark
  brandShort: "M&N",
  tagline: "Kitchens, made to outlast trends.",
  established: "EST. 2009",
  discipline: "BESPOKE CABINETRY & MODULAR KITCHENS",
  location: "Milan · London · Mumbai",

  nav: [
    { label: "Work", href: "#work" },
    { label: "Craft", href: "#craft" },
    { label: "Materials", href: "#materials" },
    { label: "Process", href: "#process" },
    { label: "Studio", href: "#studio" },
  ],

  cta: {
    eyebrow: "Commissions open for 2026",
    line: "Let's build your kitchen.",
    button: "Start a project",
    email: "studio@maisonnoir.com",
    phone: "+39 02 8736 0090",
  },

  // §Contact — the form + booking block. Wire a real backend / scheduler where
  // noted in Contact.tsx; copy and options are all editable here.
  contact: {
    eyebrow: "Begin a commission",
    heading: ["Tell us about", "your kitchen."],
    intro:
      "Share a few details and a member of the studio will respond within two working days — or book a call and speak with a designer directly.",
    email: "studio@maisonnoir.com",
    phone: "+39 02 8736 0090",
    address: "Via della Spiga 19, 20121 Milano, Italy",
    hours: "Mon–Fri · 09:00–18:00 CET",
    projectTypes: [
      "Full kitchen",
      "Island only",
      "Cabinetry & joinery",
      "Wardrobes",
      "Renovation",
      "Not sure yet",
    ],
    budgets: ["€25k – €50k", "€50k – €100k", "€100k – €250k", "€250k +", "Prefer to discuss"],
    timeSlots: [
      "Morning · 09:00–12:00",
      "Midday · 12:00–14:00",
      "Afternoon · 14:00–17:00",
      "Evening · 17:00–19:00",
    ],
  },

  footer: {
    wordmark: "MAISON&NOIR",
    columns: [
      {
        title: "Studio",
        links: [
          { label: "About", href: "#studio" },
          { label: "Philosophy", href: "#manifesto" },
          { label: "Recognition", href: "#recognition" },
          { label: "Careers", href: "#" },
        ],
      },
      {
        title: "Work",
        links: [
          { label: "Signature Kitchens", href: "#work" },
          { label: "Portfolio", href: "#portfolio" },
          { label: "Process", href: "#process" },
          { label: "Capabilities", href: "#craft" },
        ],
      },
      {
        title: "Materials",
        links: [
          { label: "Woods & Veneers", href: "#materials" },
          { label: "Lacquers", href: "#materials" },
          { label: "Stone", href: "#materials" },
          { label: "Hardware", href: "#materials" },
        ],
      },
      {
        title: "Contact",
        links: [
          { label: "studio@maisonnoir.com", href: "mailto:studio@maisonnoir.com" },
          { label: "+39 02 8736 0090", href: "tel:+390287360090" },
          { label: "Book a call", href: "#contact" },
        ],
      },
    ],
    socials: [
      { label: "Instagram", href: "#" },
      { label: "Pinterest", href: "#" },
      { label: "LinkedIn", href: "#" },
    ],
    address: "Via della Spiga 19, 20121 Milano, Italy",
    legal: "© 2026 Maison&Noir. All rights reserved.",
  },
};

export type Site = typeof site;
