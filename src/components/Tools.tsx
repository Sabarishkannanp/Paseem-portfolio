import BrandLogo from "@/components/BrandLogo";
import SectionHeading from "@/components/SectionHeading";
import { brandFor } from "@/data/brands";
import { toolGroups } from "@/data/tools";

/** "Tools I've Worked With" — 8 category cards, each tool with its original logo. */
export default function Tools() {
  return (
    <section id="tools" data-build-section aria-labelledby="tools-title" className="border-t border-line">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-8 md:py-32">
        <SectionHeading id="tools-title" eyebrow="Toolkit" lines={["Tools I've", "worked with"]} />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {toolGroups.map((g, i) => (
            <li key={g.title} data-build={i + 2} data-build-tool="frame">
              <article className="card-grad group h-full rounded-3xl bg-surface p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-2xl leading-none text-ink">{g.title}</h3>
                  <span className="font-mono text-[10px] text-muted">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <span aria-hidden className="mt-3 block h-[2px] w-10 rounded-full bg-accent transition-all duration-500 group-hover:w-20" />
                <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${g.title} tools`}>
                  {g.tools.map((t) => (
                    <li
                      key={t}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-bg/70 py-1.5 pl-2 pr-3 text-[13px] text-ink transition-colors hover:border-accent/50"
                    >
                      {brandFor(t) ? (
                        <BrandLogo name={t} size={16} />
                      ) : (
                        <span aria-hidden className="ml-1 h-1.5 w-1.5 rounded-full bg-accent" />
                      )}
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
