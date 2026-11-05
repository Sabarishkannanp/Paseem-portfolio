/** Floating glass analytics card (like the poster): label + mini line or bar chart. Decorative. */
export default function GlassChart({
  variant,
  label,
  className = "",
  delay = 0,
}: {
  variant: "line" | "bars" | "combo";
  label: string;
  className?: string;
  delay?: number;
}) {
  const id = `gc-${variant}-${label.replace(/\W/g, "")}`;
  return (
    <div
      aria-hidden
      className={`animate-float absolute rounded-xl border border-white/15 bg-white/[0.07] p-2.5 shadow-[0_12px_40px_rgba(0,0,0,.45),inset_0_1px_0_rgba(255,255,255,.12)] backdrop-blur-md md:p-3 ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[9px] leading-none text-ink/85 md:text-[10px]">{label}</span>
        <span className="h-1.5 w-1.5 rounded-full bg-lime shadow-[0_0_8px_#C6FF3D]" />
      </div>
      <div className="mt-1.5 h-[3px] w-1/2 rounded-full bg-white/20" />
      <div className="mt-1 h-[3px] w-1/3 rounded-full bg-white/10" />
      <svg viewBox="0 0 120 54" className="mt-2 h-auto w-full" fill="none">
        <defs>
          <linearGradient id={`${id}-a`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#C6FF3D" stopOpacity=".45" />
            <stop offset="1" stopColor="#C6FF3D" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`${id}-b`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#E8FF8A" />
            <stop offset="1" stopColor="#6FCF0A" stopOpacity=".55" />
          </linearGradient>
        </defs>
        {variant !== "line" &&
          [10, 16, 13, 22, 19, 30, 27, 38, 44].map((h, i) => (
            <rect key={i} x={6 + i * 12.4} y={52 - h} width="7" height={h} rx="1.5" fill={`url(#${id}-b)`} opacity={0.55 + i * 0.05} />
          ))}
        {variant !== "bars" && (
          <>
            {variant === "line" && <path d="M2 46 L18 40 L32 42 L48 30 L62 33 L78 20 L92 23 L108 8 L118 4 L118 54 L2 54Z" fill={`url(#${id}-a)`} />}
            <path
              d="M2 46 L18 40 L32 42 L48 30 L62 33 L78 20 L92 23 L108 8 L118 4"
              stroke="#C6FF3D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ filter: "drop-shadow(0 0 4px rgba(198,255,61,.8))" }}
            />
            <path d="M110 3 L118 4 L115 11" stroke="#C6FF3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </>
        )}
      </svg>
    </div>
  );
}
