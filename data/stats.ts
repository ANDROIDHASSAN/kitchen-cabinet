// data/stats.ts
// By the Numbers (§5.6) — restrained proof that counts up in view.

export type Stat = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
};

export const stats: Stat[] = [
  { value: 240, suffix: "+", label: "Kitchens delivered" },
  { value: 17, label: "Years of practice" },
  { value: 9, label: "Cities installed" },
  { value: 100, suffix: "%", label: "Built in-house" },
];

// data/recognition.ts content kept here for convenience — awards & press (§5.9).
export const recognition = [
  "Wallpaper* Design Awards",
  "Elle Decoration",
  "Dezeen",
  "AD100",
  "ICFF Editors' Award",
  "Frame Awards",
  "Salone del Mobile",
  "Monocle",
];
