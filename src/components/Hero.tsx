import Image from "next/image";
import { ArrowDownRight, Download } from "lucide-react";
import CountUp from "@/components/CountUp";
import GlassChart from "@/components/GlassChart";
import SocialLinks from "@/components/SocialLinks";
import Sparkline from "@/components/Sparkline";
import { site } from "@/data/site";

/** Hero modelled on the poster: outlined DIGITAL, glowing MARKETING, cutout in front, glass chart cards. */
export default function Hero() {
  const [top, big] = site.heroWords;
  const [c1, c2, c3] = site.chips;
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="bg-grid relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-20 lg:block lg:pt-0"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_35%,transparent_25%,#07090F_78%)]" />

      {/* giant background words */}
      <div
        aria-hidden
        data-build="5"
        data-build-tool="text"
        className="pointer-events-none relative z-0 select-none text-center lg:absolute lg:inset-x-0 lg:top-[10.5vh]"
      >
        <span className="font-display text-outline-accent block text-[clamp(5rem,23vw,25rem)] leading-[0.8] tracking-[0.06em] lg:text-[min(19vw,32vh)]">
          {top}
        </span>
        <span className="font-display text-grad-hero block text-[clamp(4.4rem,20.5vw,22.5rem)] leading-[0.82] tracking-[0.01em] lg:text-[min(17vw,29vh)]">
          {big}
        </span>
      </div>

      {/* dark wash so the name reads over the glowing word (sits above words, below photo) */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 z-[5] hidden h-[62%] w-[60%] bg-[radial-gradient(ellipse_at_0%_100%,rgba(7,9,15,.95)_25%,rgba(7,9,15,.6)_50%,transparent_75%)] lg:block"
      />

      {/* cutout in front of the words */}
      <div
        data-build="4"
        data-build-tool="image"
        className="relative z-10 mx-auto -mt-[30vw] aspect-[436/848] w-[min(58vw,290px)] lg:absolute lg:bottom-0 lg:left-1/2 lg:mt-0 lg:w-[min(26vw,420px,44vh)] lg:-translate-x-1/2"
      >
        <div aria-hidden className="absolute inset-x-[-30%] top-[0%] -z-10 aspect-square rounded-full blur-2xl" style={{ background: "var(--grad-glow)" }} />
        <div className="hero-rim absolute inset-0">
          <Image
            src={site.heroImage}
            alt={`${site.name}, ${site.role} based in ${site.city}`}
            fill
            preload
            sizes="(min-width:1024px) 26vw, 58vw"
            className="hero-photo object-contain object-bottom"
          />
        </div>

        {/* glass analytics cards, placed like the poster */}
        <GlassChart variant="line" label={c1} className="left-[-38%] top-[30%] w-[48%] lg:left-[-62%] lg:top-[24%] lg:w-[56%]" />
        <GlassChart variant="combo" label={c2} className="right-[-40%] top-[10%] w-[50%] lg:right-[-62%] lg:w-[58%]" delay={-1.6} />
        <GlassChart variant="bars" label={c3} className="bottom-[20%] right-[-36%] w-[46%] lg:right-[-58%] lg:w-[54%]" delay={-3.1} />
      </div>

      {/* name block */}
      <div className="relative z-20 -mt-16 px-5 md:px-8 lg:absolute lg:bottom-[7vh] lg:left-8 lg:mt-0 lg:max-w-[min(36vw,560px)] lg:p-0 xl:left-12">
        <p data-build="2" data-build-tool="text" className="font-script text-3xl text-accent md:text-4xl">
          Hi, I&apos;m {site.shortName}
        </p>
        <h1 data-build="3" data-build-tool="text" className="font-display mt-1 whitespace-nowrap text-[clamp(1.9rem,9.2vw,3.4rem)] leading-[0.95] tracking-[0.01em] text-ink lg:text-[clamp(2.4rem,3.9vw,4.2rem)]">
          Mohammed <span className="text-accent">Paseem.</span>
        </h1>
        <div data-build="6" data-build-tool="text" className="mt-3">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink md:text-sm">
            {site.roleLine.map((r, i) => (
              <span key={r}>
                {i > 0 && <span className="px-1.5 text-accent">|</span>}
                {r}
              </span>
            ))}
          </p>
          <span aria-hidden className="mt-2 block h-[3px] w-12 rounded-full line-grad" />
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">{site.tagline}</p>
        </div>
        <div data-build="7" data-build-tool="shape" className="mt-6 flex flex-wrap items-center gap-3">
          <a href="#results" className="btn-accent inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold">
            See results <ArrowDownRight size={16} />
          </a>
          <a
            href={site.resume}
            download="Mohammed-Paseem-Resume.pdf"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-bg/40 px-6 py-3 text-sm font-medium text-ink backdrop-blur transition-colors hover:border-accent hover:text-accent"
          >
            <Download size={16} /> Download resume
          </a>
          <SocialLinks size="sm" className="lg:hidden" />
        </div>
      </div>

      {/* stats */}
      <dl
        data-build="8"
        data-build-tool="frame"
        className="relative z-20 mx-5 mb-10 mt-10 grid grid-cols-3 gap-3 md:mx-8 lg:absolute lg:bottom-[7vh] lg:right-8 lg:m-0 lg:flex lg:w-48 lg:flex-col lg:gap-3 xl:right-12"
      >
        {site.stats.map((s, i) => (
          <div key={s.label} className="flex flex-col rounded-2xl border border-white/10 bg-surface/70 p-3 backdrop-blur-md md:p-4 lg:px-4 lg:py-3">
            <dt className="order-2 mt-1.5 font-mono text-[10px] uppercase leading-tight tracking-[0.12em] text-muted md:text-[11px]">{s.label}</dt>
            <dd className="order-1 font-display text-4xl leading-none text-ink md:text-5xl lg:text-[2.6rem]">
              <CountUp value={s.value} suffix={s.suffix} />
            </dd>
            <Sparkline variant={i} className="order-3 mt-1.5 hidden md:block" />
          </div>
        ))}
      </dl>
    </section>
  );
}
