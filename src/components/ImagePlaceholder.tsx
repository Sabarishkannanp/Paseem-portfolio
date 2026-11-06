import { ImageIcon } from "lucide-react";

/** Styled stand-in shown when an image file is missing from /public. */
export default function ImagePlaceholder({ label, path, className = "" }: { label: string; path?: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`bg-grid relative flex h-full w-full flex-col items-center justify-center gap-2 overflow-hidden bg-surface text-muted ${className}`}
    >
      <div aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
      <div aria-hidden className="absolute -bottom-12 -left-8 h-40 w-40 rounded-full bg-accent-deep/20 blur-3xl" />
      <svg aria-hidden viewBox="0 0 120 40" className="absolute bottom-4 left-4 right-4 h-10 w-[calc(100%-2rem)] opacity-40" fill="none" preserveAspectRatio="none">
        <path d="M0 36 L20 30 L40 32 L60 22 L80 24 L100 10 L120 4" stroke="#C6FF3D" strokeWidth="1.5" />
      </svg>
      <ImageIcon size={22} className="relative text-accent/70" />
      <span className="relative font-mono text-[10px] uppercase tracking-[0.2em]">{label}</span>
      {path && <span className="relative font-mono text-[9px] text-muted/60">{path}</span>}
    </div>
  );
}
