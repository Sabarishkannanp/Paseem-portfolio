"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/** Lenis smooth scroll. Pauses while the cursor intro builds the hero. */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, anchors: { offset: -72 }, lerp: 0.1 });
    const stop = () => lenis.stop();
    const start = () => lenis.start();
    window.addEventListener("build-intro:start", stop);
    window.addEventListener("build-intro:end", start);
    return () => {
      window.removeEventListener("build-intro:start", stop);
      window.removeEventListener("build-intro:end", start);
      lenis.destroy();
    };
  }, []);
  return null;
}
