import Image from "next/image";
import { clients } from "@/data/clients";
import { findPublicFile } from "@/lib/public-file";

/** "Brands I've Managed": two rows of ORIGINAL client logos on light tiles, scrolling in opposite directions (pause on hover). */
export default function Clients() {
  const items = clients.map((c) => ({ ...c, logo: findPublicFile(`/clients/${c.slug}`) }));
  const half = Math.ceil(items.length / 2);
  const rows = [items.slice(0, half), items.slice(half)];

  return (
    <section data-build-section aria-labelledby="clients-title" className="relative overflow-hidden border-y border-line py-16 md:py-20">
      <div className="mx-auto mb-10 flex max-w-[1440px] flex-col gap-3 px-5 md:flex-row md:items-end md:justify-between md:px-8">
        <h2 id="clients-title" data-build="1" data-build-tool="text" className="font-display w-fit text-[clamp(2.2rem,5vw,4.5rem)] leading-[0.9] text-ink">
          Brands I&apos;ve managed<span className="text-accent">.</span>
        </h2>
        <p data-build="2" className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          <span className="text-accent">●</span> {clients.length}+ brands · SEO · Ads · Social
        </p>
      </div>

      <div data-build="3" data-build-tool="frame" className="group/marquee flex flex-col gap-4">
        {rows.map((row, r) => (
          <div
            key={r}
            className="relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
          >
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                aria-hidden={copy === 1}
                className={`flex shrink-0 items-center gap-4 pr-4 group-hover/marquee:[animation-play-state:paused] ${
                  r === 0 ? "animate-scroll-x" : "animate-scroll-x-rev"
                }`}
              >
                {row.map((c) => (
                  <li
                    key={`${c.slug}-${copy}`}
                    className="flex h-20 min-w-[200px] items-center justify-center rounded-2xl bg-[#F4F6F9] px-7 shadow-[inset_0_0_0_1px_rgba(255,255,255,.6)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_2px_#C6FF3D,0_12px_30px_rgba(198,255,61,.18)] md:h-24 md:min-w-[240px]"
                  >
                    {c.logo ? (
                      <Image
                        src={c.logo}
                        alt={copy === 0 ? `${c.name} logo` : ""}
                        width={220}
                        height={80}
                        className={`w-auto max-w-[180px] object-contain ${c.square ? "h-[3.75rem] md:h-[4.5rem]" : "h-11 md:h-14"}`}
                      />
                    ) : (
                      <span className="flex flex-col items-center">
                        <span className="font-display text-center text-2xl leading-none text-[#0B0F19] md:text-3xl">{c.name}</span>
                        {c.industry && (
                          <span className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-[#5B6375]">{c.industry}</span>
                        )}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
