"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { EASE, DUR } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Accessible lightbox built on Radix Dialog (focus trap, ESC, scroll-lock for
 * free) + Framer Motion crossfade. Restyled to brand — square-ish, brass hairline.
 */
export default function Lightbox({
  open,
  onOpenChange,
  src,
  alt,
  caption,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  src: string | null;
  alt: string;
  caption?: string;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && src && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-[120] bg-ink/85 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: DUR.fast, ease: EASE.out }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount aria-describedby={undefined}>
              <motion.div
                className="fixed inset-0 z-[121] flex items-center justify-center p-5 md:p-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: DUR.fast, ease: EASE.out }}
              >
                <Dialog.Title className="sr-only">{alt}</Dialog.Title>
                <motion.figure
                  className="relative w-full max-w-5xl"
                  initial={{ scale: 0.96, y: 16 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.97, y: 8 }}
                  transition={{ duration: DUR.base, ease: EASE.out }}
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-forest">
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 1024px"
                      className="object-cover"
                      priority
                    />
                  </div>
                  {caption && (
                    <figcaption className="label mt-4 flex items-center justify-between text-bone/70">
                      <span>{caption}</span>
                      <span className="text-brass">Maison&amp;Noir</span>
                    </figcaption>
                  )}
                </motion.figure>

                <Dialog.Close
                  className={cn(
                    "label fixed right-5 top-5 z-[122] text-bone/80 transition-colors hover:text-brass md:right-10 md:top-10"
                  )}
                  data-cursor="action"
                  aria-label="Close"
                >
                  Close ✕
                </Dialog.Close>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
