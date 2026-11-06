"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useContact } from "@/components/ContactProvider";
import { site } from "@/data/site";

export default function Navbar() {
  const { openContact } = useContact();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  // highlight the section currently in view
  useEffect(() => {
    const ids = site.nav.map((n) => n.href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [menu]);

  return (
    <>
      <motion.div
        aria-hidden
        className="line-grad fixed inset-x-0 top-0 z-[60] h-[2px] origin-left"
        style={{ scaleX: progress }}
      />
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background,border-color,backdrop-filter] duration-300 ${
          scrolled ? "border-b border-line/70 bg-bg/70 backdrop-blur-xl" : "border-b border-transparent"
        }`}
      >
        <nav aria-label="Main" className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:h-[72px] md:px-8">
          <a
            href="#hero"
            data-build="1"
            data-build-tool="text"
            className="font-display text-base tracking-tight text-ink md:text-lg"
          >
            Paseem&apos;s Portfolio<span className="text-accent">.</span>
          </a>

          <ul className="hidden items-center gap-1 rounded-full border border-line/80 bg-surface/50 px-2 py-1.5 backdrop-blur md:flex">
            {site.nav.map((n, i) => {
              const on = active === n.href.slice(1);
              return (
                <li key={n.href} className="flex items-center">
                  {i > 0 && <span aria-hidden className="px-1 text-muted/50">·</span>}
                  <a
                    href={n.href}
                    aria-current={on ? "true" : undefined}
                    className={`relative px-3 py-1 text-sm transition-colors ${on ? "text-ink" : "text-muted hover:text-ink"}`}
                  >
                    {n.label}
                    <span
                      aria-hidden
                      className={`absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-accent transition-transform duration-300 ${
                        on ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              data-build="9"
              data-build-tool="shape"
              onClick={() => openContact()}
              className="btn-accent hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold sm:inline-flex"
            >
              <span className="animate-pulse-dot text-[10px]">●</span> Let&apos;s talk
            </button>
            <button
              type="button"
              onClick={() => setMenu(true)}
              aria-label="Open menu"
              aria-expanded={menu}
              className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink md:hidden"
            >
              <Menu size={18} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="bg-grid fixed inset-0 z-[70] flex flex-col bg-bg px-6 pb-10 pt-5 md:hidden"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.55, ease: [0.65, 0, 0.25, 1] }}
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-base">
                Paseem&apos;s Portfolio<span className="text-accent">.</span>
              </span>
              <button
                type="button"
                onClick={() => setMenu(false)}
                aria-label="Close menu"
                className="grid h-10 w-10 place-items-center rounded-full border border-line"
              >
                <X size={18} />
              </button>
            </div>
            <ul className="mt-16 flex flex-col gap-2">
              {site.nav.map((n, i) => (
                <motion.li
                  key={n.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.06 }}
                >
                  <a href={n.href} onClick={() => setMenu(false)} className="font-display text-5xl leading-tight text-ink">
                    {n.label}
                    <span className="text-accent">.</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => {
                setMenu(false);
                openContact();
              }}
              className="btn-accent mt-auto rounded-full px-6 py-4 font-semibold"
            >
              ● Let&apos;s talk
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
