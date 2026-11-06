import { Plus } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { faqs } from "@/data/faq";

/** Frequently asked questions (native <details>, so it works without JS and is fully accessible). */
export default function Faq() {
  return (
    <section id="faq" data-build-section aria-labelledby="faq-title" className="border-t border-line">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-8 md:py-32 lg:grid-cols-[1fr_1.4fr]">
        <SectionHeading id="faq-title" eyebrow="FAQ" lines={["Frequently", "asked"]} className="lg:sticky lg:top-28 lg:h-fit" />
        <ul className="border-t border-line">
          {faqs.map((f, i) => (
            <li key={f.q} data-build={i + 2} className="border-b border-line">
              <details className="group" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                  <span className="flex gap-4">
                    <span className="mt-1 font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-accent md:text-xl">{f.q}</h3>
                  </span>
                  <Plus
                    size={22}
                    aria-hidden
                    className="mt-1 shrink-0 text-muted transition-transform duration-300 group-open:rotate-45 group-open:text-accent"
                  />
                </summary>
                <p className="pb-7 pl-9 text-[15px] leading-relaxed text-muted md:max-w-2xl">{f.a}</p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
