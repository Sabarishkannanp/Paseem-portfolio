"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { revealAll, runIntro, shouldAnimate, watchSections } from "@/lib/build-intro";

/**
 * Figma multiplayer-cursor "page builds itself" effect.
 *
 * Usage (in app/page.tsx):
 *   <BuildCursors />            // once, anywhere on the page
 *   <section id="hero"> ... <h1 data-build="2"> ... </section>
 *   <section data-build-section> ... <h2 data-build="1"> ... </section>
 */
export default function BuildCursors({ heroId = "hero", pageCount = 6 }: { heroId?: string; pageCount?: number }) {
  const cancelRef = useRef<() => void>(() => {});
  const [showReplay, setShowReplay] = useState(false);

  const start = useCallback(() => {
    const hero = document.getElementById(heroId);
    if (!hero) {
      revealAll();
      return;
    }
    cancelRef.current();
    setShowReplay(false);
    cancelRef.current = runIntro({
      root: hero,
      pageCount,
      onDone: () => {
        setShowReplay(shouldAnimate());
        try {
          sessionStorage.setItem("introSeen", "1");
        } catch {}
      },
    });
  }, [heroId, pageCount]);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("introSeen") === "1";
    } catch {}

    if (!shouldAnimate()) {
      revealAll();
    } else if (seen) {
      // hero intro already played this tab: show hero + navbar now, sections still build on scroll
      document
        .querySelectorAll<HTMLElement>("[data-build]")
        .forEach((el) => !el.closest("[data-build-section]") && (el.style.opacity = "1"));
      requestAnimationFrame(() => setShowReplay(true));
    } else {
      // wait one frame so fonts/layout settle before measuring
      requestAnimationFrame(() => start());
    }
    // every section gets its own cursor build when scrolled into view — on every visit
    const stopSections = watchSections();
    return () => {
      cancelRef.current();
      stopSections();
    };
  }, [start]);

  const replay = () => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    document.querySelectorAll<HTMLElement>(`#${heroId} [data-build]`).forEach((el) => (el.style.opacity = "0"));
    start();
  };

  if (!showReplay) return null;
  return (
    <button
      type="button"
      onClick={replay}
      className="fixed bottom-5 right-5 z-[9993] rounded-md border border-[#1C2230] bg-[#0E121B]/85 px-3 py-1.5 font-mono text-[11px] font-medium text-[#8B93A6] backdrop-blur transition-colors hover:border-[#C6FF3D] hover:text-[#C6FF3D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C6FF3D]"
    >
      ↻ Replay
    </button>
  );
}
