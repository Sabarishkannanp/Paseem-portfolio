import { instagramUrl, site } from "@/data/site";

/** Row of round buttons with the ORIGINAL social logos. Entries without an href are skipped. */
export default function SocialLinks({ size = "md", className = "" }: { size?: "sm" | "md" | "lg"; className?: string }) {
  const box = { sm: "h-9 w-9", md: "h-11 w-11", lg: "h-14 w-14" }[size];
  const icon = { sm: 16, md: 20, lg: 26 }[size];
  return (
    <ul className={`flex flex-wrap items-center gap-2.5 ${className}`} aria-label="Social links">
      {site.socials
        .map((s) => (s.name === "Instagram" && !s.href ? { ...s, href: instagramUrl } : s))
        .filter((s) => s.href)
        .map((s) => {
          const external = s.href.startsWith("http");
          return (
            <li key={s.name}>
              <a
                href={s.href}
                aria-label={s.name}
                title={s.name}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`group grid ${box} place-items-center rounded-full border border-line bg-surface/80 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-[#1A1A1D] hover:shadow-[0_10px_30px_rgba(0,0,0,.45)]`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/logos/${s.logo}.svg`}
                  alt=""
                  width={icon}
                  height={icon}
                  className="transition-transform duration-300 group-hover:scale-110"
                  style={{ width: icon, height: icon }}
                />
              </a>
            </li>
          );
        })}
    </ul>
  );
}
