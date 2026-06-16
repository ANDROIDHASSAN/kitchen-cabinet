// data/process.ts
// The sticky numbered process (§5.5). It IS a sequence, so numbers earn their place.
// SWAP `image` with real studio/workshop/site photography in /public/process.

export type ProcessStep = {
  step: string;
  title: string;
  body: string;
  image: string;
};

export const process: ProcessStep[] = [
  {
    step: "01",
    title: "Consultation",
    body: "We begin in your space, not a showroom. We measure how you cook, gather and live — then translate it into a brief. No two kitchens share a drawing.",
    image: "/process/consultation.png",
  },
  {
    step: "02",
    title: "Design & 3D Visualization",
    body: "Every joint, reveal and runner is drawn to the millimetre and rendered in full. You walk through the kitchen before a single board is cut.",
    image: "/process/design.png",
  },
  {
    step: "03",
    title: "Fabrication",
    body: "Our cabinetmakers build by hand in the Milan atelier — dovetailed drawers, hand-finished veneers, hardware set to a fraction of a millimetre.",
    image: "/process/fabrication.png",
  },
  {
    step: "04",
    title: "Installation",
    body: "A dedicated team installs on-site over days, not hours, levelling to the room and finishing in place. We leave only when the doors close in silence.",
    image: "/process/installation.png",
  },
];
