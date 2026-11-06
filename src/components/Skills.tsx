"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";
import BrandLogo from "@/components/BrandLogo";
import SectionHeading from "@/components/SectionHeading";
import { brandFor } from "@/data/brands";
import { skills } from "@/data/skills";

/**
 * Big outlined rows (reference-portfolio style): hover or tap fills the row with a
 * lime → dark gradient, the word turns solid, tools with original logos slide open,
 * and a lime circle follows the pointer.
 */
export default function Skills() {
  const [open, setOpen] = useState<number | null>(null);
  const [hovering, setHovering] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 26, mass: 0.5 });
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 26, mass: 0.5 });

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const r = listRef.current?.getBoundingClientRect();
    if (!r) return;
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  return (
    <section id="skills" data-build-section aria-labelledby="skills-title" className="relative py-24 md:py-32">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-5 md:flex-row md:items-end md:justify-between md:px-8">
        <SectionHeading id="skills-title" eyebrow="Skills & stack" lines={["What I", "do best"]} />
        <p data-build="2" className="max-w-sm text-muted md:pb-3 md:text-right">
          Hover a row (or tap it) to see the tools behind it.
        </p>
      </div>

      <ul
        ref={listRef}
        onPointerMove={onMove}
        onPointerEnter={(e) => e.pointerType === "mouse" && setHovering(true)}
        onPointerLeave={(e) => {
          if (e.pointerType !== "mouse") return; // touch: keep the tapped row open
          setHovering(false);
          setOpen(null);
        }}
        className="relative mt-14 border-t border-line"
      >
        {skills.map((s, i) => {
          const isOpen = open === i;
          return (
            <li
              key={s.word}
              data-build={i + 3}
              data-build-tool="frame"
              data-open={isOpen || undefined}
              onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(i)}
              className="group relative overflow-hidden border-b border-line"
            >
              {/* lime → olive → dark gradient fill */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-data-[open]:opacity-100"
                style={{ background: "var(--grad-row-dark)" }}
              />
              <div className="relative mx-auto max-w-[1440px] px-5 md:px-8">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`skill-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center gap-5 py-5 text-left md:gap-10 md:py-7"
                >
                  <span className="w-8 shrink-0 font-mono text-xs tabular-nums text-accent transition-colors duration-300 group-data-[open]:text-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-outline flex-1 text-[clamp(2.6rem,9vw,8rem)] leading-[0.95] transition-[color,-webkit-text-stroke-color,transform] duration-500 group-data-[open]:translate-x-2 group-data-[open]:text-ink group-data-[open]:[-webkit-text-stroke-color:transparent]">
                    {s.word}
                  </span>
                  <Plus
                    size={28}
                    aria-hidden
                    className="shrink-0 text-muted transition-transform duration-500 group-data-[open]:rotate-45 group-data-[open]:text-ink"
                  />
                </button>

                <div
                  id={`skill-${i}`}
                  className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[open]:grid-rows-[1fr]"
                >
                  <div className="overflow-hidden">
                    <div className="flex flex-col gap-5 pb-8 pl-[3.25rem] md:flex-row md:items-end md:justify-between md:pl-[4.5rem]">
                      <ul className="flex max-w-3xl flex-wrap gap-2" aria-label={`${s.word} tools`}>
                        {s.tools.map((t) => (
                          <li
                            key={t}
                            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/40 px-3.5 py-1.5 text-sm text-white backdrop-blur"
                          >
                            {brandFor(t) ? (
                              <BrandLogo name={t} size={16} />
                            ) : (
                              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_6px_#C6FF3D]" />
                            )}
                            {t}
                          </li>
                        ))}
                      </ul>
                      <p className="max-w-xs text-sm text-white/85 md:text-right">{s.line}</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}

        {/* lime circle that follows the pointer over the rows (desktop) */}
        <AnimatePresence>
          {hovering && open !== null && (
            <motion.span
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 z-10 -ml-10 -mt-10 hidden h-20 w-20 place-items-center rounded-full bg-accent/90 shadow-[0_0_40px_rgba(198,255,61,.45)] md:grid"
              style={{ x, y }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
            >
              <span className="h-2 w-2 rounded-full bg-bg" />
            </motion.span>
          )}
        </AnimatePresence>
      </ul>
    </section>
  );
}
