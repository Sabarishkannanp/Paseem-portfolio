"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import { journey } from "@/data/journey";

export default function Journey() {
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 });

  useEffect(() => {
    const items = listRef.current?.querySelectorAll<HTMLElement>("[data-step]");
    if (!items) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step));
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    items.forEach((i) => io.observe(i));
    return () => io.disconnect();
  }, []);

  const year = journey[active]?.year ?? journey[0].year;

  return (
    <section
      id="journey"
      data-build-section
      aria-labelledby="journey-title"
      className="relative border-t border-line bg-[linear-gradient(180deg,#07090F,#0A0D15_50%,#07090F)]"
    >
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-8 md:py-32 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <SectionHeading id="journey-title" eyebrow="Experience & education" lines={["The growth", "The journey"]} />
          {/* soft vertical fade instead of overflow-hidden, so the glow has no hard box edge */}
          <div
            aria-hidden
            className="relative -mx-12 mt-4 hidden h-[calc(clamp(6rem,11vw,11rem)+4rem)] px-12 py-8 [mask-image:linear-gradient(to_bottom,transparent,#000_22%,#000_78%,transparent)] lg:block"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={year}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.65, 0, 0.25, 1] }}
                className="font-display text-grad-hero absolute left-12 top-8 whitespace-nowrap text-[clamp(5rem,10vw,10rem)] leading-none"
              >
                {year}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        <ol ref={listRef} className="relative ml-2 border-l border-line pl-8 md:pl-12">
          <motion.span
            aria-hidden
            className="absolute -left-px top-0 h-full w-[2px] origin-top bg-[linear-gradient(180deg,#C6FF3D,#2EE6C5)] shadow-[0_0_12px_rgba(198,255,61,.6)]"
            style={{ scaleY: fill }}
          />
          {journey.map((j, i) => (
            <li key={j.org} data-step={i} data-build={i + 2} className="relative pb-16 last:pb-0">
              <span
                aria-hidden
                className={`absolute -left-[calc(2rem+7px)] top-1.5 h-3.5 w-3.5 rounded-full border-2 transition-colors duration-300 md:-left-[calc(3rem+7px)] ${
                  i <= active ? "border-accent bg-accent shadow-[0_0_14px_#C6FF3D]" : "border-line bg-bg"
                }`}
              />
              <p className="font-mono text-xs tracking-[0.2em] text-accent">{j.year}</p>
              <h3 className="mt-2 font-display text-2xl leading-tight text-ink md:text-3xl">{j.role}</h3>
              <p className="mt-1 text-sm text-muted">
                {j.org}
                {j.place ? ` · ${j.place}` : ""}
              </p>
              <ul className="mt-5 space-y-2.5">
                {j.points.map((p) => (
                  <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-ink/80">
                    <span aria-hidden className="mt-2.5 h-1 w-3 shrink-0 rounded-full bg-accent/70" />
                    {p}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
