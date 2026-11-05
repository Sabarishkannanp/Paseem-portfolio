import { brandFor } from "@/data/brands";

/** Original brand logo (from /public/logos) or a brand-coloured monogram. Returns null for non-brand skills. */
export default function BrandLogo({ name, size = 18, className = "" }: { name: string; size?: number; className?: string }) {
  const b = brandFor(name);
  if (!b) return null;
  if (b.logo) {
    return (
      // plain <img>: tiny local SVGs don't need the image optimizer
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`/logos/${b.logo}.svg`}
        alt=""
        aria-hidden
        width={size}
        height={size}
        loading="lazy"
        className={`shrink-0 object-contain ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      aria-hidden
      className={`grid shrink-0 place-items-center rounded-[5px] font-mono font-bold leading-none ${className}`}
      style={{
        width: size,
        height: size,
        fontSize: size * (b.mono && b.mono.length > 1 ? 0.42 : 0.6),
        color: b.color,
        background: `color-mix(in srgb, ${b.color} 16%, transparent)`,
        boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${b.color} 45%, transparent)`,
      }}
    >
      {b.mono}
    </span>
  );
}
