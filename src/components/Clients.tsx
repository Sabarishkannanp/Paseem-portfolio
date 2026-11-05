import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { clients } from "@/data/clients";

const EXT = ["svg", "png", "webp", "jpg"];

/** Finds /public/clients/<slug>.<ext> at build time; null if no logo yet. */
function logoFor(slug: string) {
  for (const ext of EXT) {
    const rel = `/clients/${slug}.${ext}`;
    if (fs.existsSync(path.join(process.cwd(), "public", rel))) return rel;
  }
  return null;
}

export default function Clients() {
  return (
    <section data-build-section aria-labelledby="clients-title" className="border-y border-[#1C2230] px-6 py-16 md:px-8">
      <p data-build="1" id="clients-title" className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-[#8B93A6]">
        <span className="text-[#C6FF3D]">●</span> Brands I&apos;ve grown
      </p>
      <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#1C2230] bg-[#1C2230] sm:grid-cols-3 lg:grid-cols-5">
        {clients.map((c, i) => {
          const logo = logoFor(c.slug);
          return (
            <li
              key={c.slug}
              data-build={i + 2}
              className="group relative flex h-32 flex-col items-center justify-center gap-2 bg-[#0E121B] px-4 transition-colors hover:bg-[#121826]"
            >
              {logo ? (
                <Image
                  src={logo}
                  alt={`${c.name} logo`}
                  width={160}
                  height={56}
                  className="h-12 w-auto object-contain"
                />
              ) : (
                <span className="text-center text-lg font-black uppercase leading-tight tracking-tight text-[#EEF1F6] transition-colors group-hover:text-[#C6FF3D]">
                  {c.name}
                </span>
              )}
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#8B93A6]">{c.industry}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
