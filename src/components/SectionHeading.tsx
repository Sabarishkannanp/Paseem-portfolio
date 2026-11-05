import type { ReactNode } from "react";

/** Eyebrow label + huge uppercase heading ending in a lime full stop. */
export default function SectionHeading({
  id,
  eyebrow,
  lines,
  build = "1",
  className = "",
  children,
}: {
  id: string;
  eyebrow: string;
  lines: string[];
  build?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div data-build={build} data-build-tool="text" className={`w-fit max-w-full ${className}`}>
      <p className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
        <span className="h-px w-8 bg-lime" aria-hidden />
        {eyebrow}
      </p>
      <h2 id={id} className="font-display text-[clamp(2.6rem,7.5vw,7.5rem)] leading-[0.9] text-ink">
        {lines.map((l, i) => (
          <span key={l} className="block">
            {l}
            {i === lines.length - 1 && <span className="text-lime">.</span>}
          </span>
        ))}
      </h2>
      {children}
    </div>
  );
}
