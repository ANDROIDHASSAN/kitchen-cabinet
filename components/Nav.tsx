"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/data/site";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Fixed top nav. Transparent over the dark hero (bone text), then condenses to a
 * bone bar with ink text once past the hero. Mobile → full-screen sheet.
 */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const light = !scrolled && !open; // light = over hero, use bone text

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[100] transition-colors duration-500",
          scrolled
            ? "border-b border-mist/60 bg-bone/85 backdrop-blur-md"
            : "bg-transparent"
        )}
      >
        <nav className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6 md:h-20 md:px-12">
          <a
            href="#hero"
            className={cn(
              "font-display text-lg tracking-tight transition-colors md:text-xl",
              light ? "text-bone" : "text-ink"
            )}
            data-cursor="action"
          >
            {site.brand}
          </a>

          <div
            className={cn(
              "hidden items-center gap-8 md:flex",
              light ? "text-bone/90" : "text-ink/80"
            )}
          >
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="label link-underline transition-colors hover:text-brass"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className={cn(
                "label border px-4 py-2 transition-colors",
                light
                  ? "border-bone/40 text-bone hover:border-brass hover:text-brass"
                  : "border-ink/30 text-ink hover:border-brass hover:text-brass"
              )}
              data-cursor="action"
            >
              Enquire
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "label flex items-center gap-2 md:hidden",
              light ? "text-bone" : "text-ink"
            )}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            {open ? "Close" : "Menu"}
          </button>
        </nav>
      </header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[99] flex flex-col bg-forest px-6 pb-10 pt-24 text-bone md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: EASE.inOut }}
          >
            <div className="mt-6 flex flex-col gap-2">
              {site.nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-4xl text-bone"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: EASE.out }}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
            <div className="mt-auto flex flex-col gap-1">
              <span className="label text-brass">{site.cta.eyebrow}</span>
              <a href={`mailto:${site.cta.email}`} className="label text-bone/70">
                {site.cta.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
