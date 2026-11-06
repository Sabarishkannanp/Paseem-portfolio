import SocialLinks from "@/components/SocialLinks";
import { site } from "@/data/site";

/** The footer is a build section too: cursors draw the band, name, socials and links. */
export default function Footer() {
  const words = [...site.marquee, ...site.marquee];
  return (
    <footer data-build-section className="relative z-10">
      <div
        data-build="1"
        data-build-tool="frame"
        className="overflow-hidden py-5 text-white md:py-7"
        style={{ background: "var(--grad-band)" }}
        aria-label="Services"
      >
        <div className="animate-marquee flex w-max items-center whitespace-nowrap">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
              {words.map((w, i) => (
                <li key={`${w}-${i}`} className="flex items-center font-display text-3xl md:text-5xl">
                  <span className="px-6">{w}</span>
                  <span aria-hidden className="text-2xl md:text-3xl">
                    ✦
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-5 pb-10 pt-16 md:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p data-build="2" data-build-tool="text" className="font-script text-6xl leading-none text-accent md:text-8xl">
              {site.name}
            </p>
            <div data-build="3" data-build-tool="shape" className="mt-6">
              <SocialLinks />
            </div>
          </div>
          <nav data-build="4" aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
              {site.nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="transition-colors hover:text-accent">
                    {n.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={site.resume} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
                  Resume ↗
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div
          data-build="5"
          className="flex flex-col justify-between gap-2 border-t border-line pt-6 font-mono text-[11px] text-muted md:flex-row"
        >
          <p>© 2026 {site.name}</p>
          <p>
            {site.role} · {site.location}, {site.country}
          </p>
        </div>
      </div>
    </footer>
  );
}
