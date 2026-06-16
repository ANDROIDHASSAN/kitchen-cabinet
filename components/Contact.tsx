"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/data/site";
import { EASE, DUR } from "@/lib/motion";
import { RevealLines } from "@/components/RevealText";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";

/**
 * §Contact — "Send a message" / "Book a call". Client-side only: on submit it
 * shows a confirmation. To make it live, POST `payload` to your API / scheduler
 * inside `handleSubmit` (see the marked line).
 */
const c = site.contact;

type Tab = "message" | "call";

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("flex flex-col gap-2", className)}>
      <span className="label text-ink/50">{label}</span>
      {children}
    </label>
  );
}

const inputCls =
  "w-full border-b border-mist bg-transparent py-3 text-ink placeholder:text-ink/30 transition-colors duration-300 focus:border-brass focus:outline-none";

export default function Contact() {
  const [tab, setTab] = useState<Tab>("message");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const payload = Object.fromEntries(new FormData(e.currentTarget).entries());
    payload.type = tab; // "message" | "call"
    // TODO: send `payload` to your backend / scheduler here.
    // e.g. await fetch("/api/contact", { method: "POST", body: JSON.stringify(payload) })
    console.info("Contact submission", payload);
    setSubmitted(true);
  }

  return (
    <section id="contact" className="cv-auto bg-bone py-28 md:py-40">
      <div className="mx-auto grid max-w-[1600px] gap-14 px-6 md:grid-cols-[0.9fr_1.1fr] md:gap-20 md:px-12">
        {/* Left — intro + studio details */}
        <div className="flex flex-col">
          <Reveal className="mb-6 flex items-center gap-4">
            <span className="inline-block h-px w-12 bg-brass" />
            <span className="label text-walnut">{c.eyebrow}</span>
          </Reveal>

          <RevealLines
            as="h2"
            className="font-display text-[clamp(2rem,5vw,4.5rem)] font-light leading-[1.02] text-ink"
            lines={c.heading}
          />

          <Reveal delay={0.1}>
            <p className="mt-8 max-w-[42ch] text-ink/70">{c.intro}</p>
          </Reveal>

          <Reveal delay={0.15} className="mt-auto pt-12">
            <dl className="flex flex-col">
              {[
                ["Email", c.email, `mailto:${c.email}`],
                ["Telephone", c.phone, `tel:${c.phone.replace(/\s/g, "")}`],
                ["Atelier", c.address, undefined],
                ["Hours", c.hours, undefined],
              ].map(([k, v, href]) => (
                <div
                  key={k}
                  className="flex items-baseline justify-between gap-6 border-t border-mist py-4"
                >
                  <dt className="label text-ink/45">{k}</dt>
                  <dd className="text-right text-ink/80">
                    {href ? (
                      <a
                        href={href as string}
                        className="link-underline hover:text-brass"
                        data-cursor="action"
                      >
                        {v}
                      </a>
                    ) : (
                      v
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Right — the form card */}
        <Reveal delay={0.1} className="relative">
          <div className="border border-mist bg-bone/60 p-6 shadow-[var(--shadow-soft)] md:p-10">
            {/* Tabs */}
            <div className="mb-10 flex gap-1" role="tablist" aria-label="Contact method">
              {(
                [
                  ["message", "Send a message"],
                  ["call", "Book a call"],
                ] as [Tab, string][]
              ).map(([id, lbl]) => (
                <button
                  key={id}
                  role="tab"
                  aria-selected={tab === id}
                  onClick={() => {
                    setTab(id);
                    setSubmitted(false);
                  }}
                  data-cursor="action"
                  className={cn(
                    "label flex-1 border px-4 py-3 transition-colors duration-400",
                    tab === id
                      ? "border-ink bg-ink text-bone"
                      : "border-mist text-ink/55 hover:border-ink hover:text-ink"
                  )}
                >
                  {lbl}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: DUR.base, ease: EASE.out }}
                  className="flex min-h-[360px] flex-col items-start justify-center gap-5"
                >
                  <span className="font-display text-3xl text-brass">✓</span>
                  <h3 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-light text-ink">
                    {tab === "call" ? "Your call is requested." : "Message received."}
                  </h3>
                  <p className="max-w-[40ch] text-ink/65">
                    Thank you — a member of the studio will be in touch within two working
                    days to confirm the details.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="label link-underline mt-2 text-ink/70 hover:text-brass"
                    data-cursor="action"
                  >
                    Send another →
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key={tab}
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: DUR.fast, ease: EASE.out }}
                  className="flex flex-col gap-7"
                >
                  <div className="grid gap-7 sm:grid-cols-2">
                    <Field label="Full name">
                      <input
                        name="name"
                        required
                        autoComplete="name"
                        placeholder="Your name"
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Email">
                      <input
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="you@email.com"
                        className={inputCls}
                      />
                    </Field>
                  </div>

                  <div className="grid gap-7 sm:grid-cols-2">
                    <Field label="Phone">
                      <input
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+39 …"
                        className={inputCls}
                      />
                    </Field>
                    <Field label={tab === "call" ? "Preferred time" : "Project type"}>
                      <select
                        name="detail"
                        required
                        defaultValue=""
                        className={cn(inputCls, "cursor-pointer")}
                      >
                        <option value="" disabled>
                          Select…
                        </option>
                        {(tab === "call" ? c.timeSlots : c.projectTypes).map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  {tab === "call" ? (
                    <Field label="Preferred date">
                      <input name="date" type="date" required className={cn(inputCls, "cursor-pointer")} />
                    </Field>
                  ) : (
                    <Field label="Estimated budget">
                      <select name="budget" defaultValue="" className={cn(inputCls, "cursor-pointer")}>
                        <option value="" disabled>
                          Select…
                        </option>
                        {c.budgets.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </Field>
                  )}

                  <Field label={tab === "call" ? "What would you like to discuss?" : "Tell us more"}>
                    <textarea
                      name="message"
                      rows={3}
                      placeholder={
                        tab === "call"
                          ? "A line on your project so we can prepare…"
                          : "Your space, your timeline, anything that inspires you…"
                      }
                      className={cn(inputCls, "resize-none")}
                    />
                  </Field>

                  <button
                    type="submit"
                    data-cursor="action"
                    className="label group mt-2 flex items-center justify-center gap-3 border border-brass/60 bg-brass px-8 py-4 text-ink transition-colors duration-500 hover:bg-transparent hover:text-brass"
                  >
                    {tab === "call" ? "Request call" : "Send enquiry"}
                    <span className="transition-transform duration-500 group-hover:translate-x-1">
                      →
                    </span>
                  </button>

                  <p className="label text-center text-ink/35">
                    No obligation · Replies within 2 working days
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
