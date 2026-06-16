"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { materials, type Material } from "@/data/materials";
import { EASE, DUR } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * §5.4 — Materials & Finishes Lab. The SECOND signature, interactive.
 * Large preview crossfades on selection; the whole section's accent shifts
 * toward the chosen material's tone. Tactile control = "I can customise this."
 */
const types = ["Wood", "Lacquer", "Stone", "Metal"] as const;

export default function MaterialsLab() {
  const [activeId, setActiveId] = useState(materials[0].id);
  const active = useMemo<Material>(
    () => materials.find((m) => m.id === activeId) ?? materials[0],
    [activeId]
  );

  return (
    <section
      id="materials"
      className="cv-auto relative overflow-hidden py-28 transition-colors duration-700 md:py-40"
      style={{ backgroundColor: active.tone }}
    >
      {/* subtle wash so dark/light tones both read */}
      <div className="pointer-events-none absolute inset-0 bg-ink/25" />

      <div className="relative mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="mb-12 flex flex-col gap-5 md:mb-16">
          <span className="label text-bone/70">The Materials Lab</span>
          <h2 className="font-display max-w-[18ch] text-[clamp(2rem,5vw,4.5rem)] font-light leading-[1.03] text-bone">
            Feel the kitchen before it exists.
          </h2>
          <p className="max-w-[44ch] text-bone/70">
            Every finish we work in, side by side. Select a material — the studio
            shifts to its tone, the way a room shifts to its light.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:gap-12">
          {/* Preview pane */}
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink/40 md:aspect-[5/4]">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={active.id}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: DUR.slow, ease: EASE.out }}
              >
                <Image
                  src={active.preview}
                  alt={`${active.name} — ${active.spec}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>

            {/* spec-sheet readout */}
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between bg-gradient-to-t from-ink/80 to-transparent p-5 md:p-7">
              <div className="flex flex-col gap-2">
                <span className="label text-brass">{active.type}</span>
                <span className="font-display text-[clamp(1.6rem,3vw,2.6rem)] font-light leading-none text-bone">
                  {active.name}
                </span>
              </div>
              <span className="label max-w-[20ch] text-right text-bone/75">
                {active.spec}
              </span>
            </div>
          </div>

          {/* Swatch column */}
          <div className="flex flex-col gap-8">
            {types.map((type) => (
              <div key={type} className="flex flex-col gap-3">
                <span className="label text-bone/50">{type}</span>
                <div className="flex flex-wrap gap-3">
                  {materials
                    .filter((m) => m.type === type)
                    .map((m) => {
                      const selected = m.id === active.id;
                      return (
                        <button
                          key={m.id}
                          onClick={() => setActiveId(m.id)}
                          data-cursor="action"
                          aria-pressed={selected}
                          aria-label={`${m.name} — ${m.spec}`}
                          className={cn(
                            "group relative flex items-center gap-3 border px-3 py-2 transition-all duration-500",
                            selected
                              ? "border-brass bg-bone/10"
                              : "border-bone/20 hover:border-bone/50"
                          )}
                        >
                          <span
                            className="h-7 w-7 shrink-0 border border-bone/20"
                            style={{ backgroundColor: m.swatch }}
                          />
                          <span
                            className={cn(
                              "label whitespace-nowrap transition-colors",
                              selected ? "text-bone" : "text-bone/70"
                            )}
                          >
                            {m.name}
                          </span>
                        </button>
                      );
                    })}
                </div>
              </div>
            ))}

            <p className="mt-2 max-w-[34ch] border-t border-bone/15 pt-5 text-sm text-bone/55">
              Hundreds more woods, lacquers and stones are available on commission.
              These are a starting point.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
