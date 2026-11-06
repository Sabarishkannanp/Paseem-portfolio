import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import SectionHeading from "@/components/SectionHeading";
import { cases, industries } from "@/data/cases";
import { publicFileExists } from "@/lib/public-file";

export default function Results() {
  return (
    <section
      id="results"
      data-build-section
      aria-labelledby="results-title"
      className="mx-auto max-w-[1440px] px-5 py-24 md:px-8 md:py-32"
    >
      <SectionHeading id="results-title" eyebrow="Selected case studies" lines={["Where strategy", "meets results"]} />

      <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {cases.map((c, i) => {
          const hasImg = publicFileExists(c.image);
          return (
            <li key={c.slug} data-build={i + 2} >
              <article className="card-grad group flex h-full flex-col overflow-hidden rounded-3xl bg-surface">
                <div className="relative aspect-[16/10] overflow-hidden">
                  {hasImg ? (
                    <Image
                      src={c.image}
                      alt={`${c.title} — ${c.industry} case study cover`}
                      fill
                      sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <ImagePlaceholder label={c.industry} path={c.image} />
                  )}
                  <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-bg/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-accent backdrop-blur">
                    {c.industry}
                  </span>
                  <span className="absolute right-4 top-4 font-mono text-[10px] text-muted">0{i + 1}</span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-2xl leading-[1.05] text-ink">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{c.challenge}</p>
                  <dl className="mt-5 grid grid-cols-3 gap-2 border-y border-line py-4">
                    {c.results.map((r) => (
                      <div key={r.label}>
                        <dd className="font-mono text-lg font-semibold text-accent">{r.value}</dd>
                        <dt className="mt-0.5 text-[11px] leading-tight text-muted">{r.label}</dt>
                      </div>
                    ))}
                  </dl>
                  <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tools used">
                    {c.tools.map((t) => (
                      <li key={t} className="inline-flex items-center gap-1.5 rounded-full border border-line py-1 pl-1.5 pr-2.5 font-mono text-[10px] text-muted">
                        <BrandLogo name={t} size={13} />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </li>
          );
        })}
      </ul>

      <div data-build={cases.length + 2} className="mt-20">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">More industries</p>
        <ul className="border-t border-line">
          {industries.map((ind, i) => (
            <li
              key={ind}
              className="group flex items-center justify-between border-b border-line py-4 transition-colors hover:bg-[linear-gradient(90deg,rgba(198,255,61,.08),transparent)] md:py-5"
            >
              <span className="flex items-baseline gap-5">
                <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-2xl text-ink transition-colors group-hover:text-accent md:text-4xl">{ind}</span>
              </span>
              <ArrowUpRight
                size={22}
                aria-hidden
                className="text-muted transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
