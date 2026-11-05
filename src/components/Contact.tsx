"use client";

import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { useContact } from "@/components/ContactProvider";
import Magnetic from "@/components/Magnetic";
import SocialLinks from "@/components/SocialLinks";
import { site } from "@/data/site";

export default function Contact() {
  const { openContact } = useContact();
  return (
    <section
      id="contact"
      data-build-section
      aria-labelledby="contact-title"
      className="bg-grid relative overflow-hidden border-t border-line"
    >
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl" style={{ background: "var(--grad-glow)" }} />
      <div className="relative mx-auto flex max-w-[1440px] flex-col items-center px-5 py-28 text-center md:px-8 md:py-40">
        <p data-build="1" className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
          <span className="animate-pulse-dot text-lime">●</span> Open to new brands & roles
        </p>
        <h2 id="contact-title" data-build="2" data-build-tool="text" className="font-display mt-6 leading-[0.86]">
          <span className="block text-[clamp(3rem,11vw,11rem)] text-ink">Let&apos;s grow</span>
          <span className="text-grad-hero block text-[clamp(3rem,11vw,11rem)]">Together.</span>
        </h2>

        <div data-build="3" data-build-tool="shape" className="mt-12">
          <Magnetic strength={0.4}>
            <button
              type="button"
              onClick={() => openContact()}
              className="btn-lime group relative grid h-40 w-40 place-items-center rounded-full text-lg font-semibold shadow-[0_0_80px_rgba(198,255,61,.35)] md:h-48 md:w-48 md:text-xl"
            >
              <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-lime/20 [animation-duration:2.6s]" />
              <span className="relative flex flex-col items-center gap-1">
                <ArrowUpRight size={28} className="transition-transform duration-300 group-hover:rotate-45" />
                Let&apos;s talk
              </span>
            </button>
          </Magnetic>
        </div>

        <div data-build="4" data-build-tool="shape" className="mt-12">
          <SocialLinks size="lg" className="justify-center" />
        </div>

        <div data-build="5" className="mt-8 flex flex-wrap justify-center gap-3 text-sm">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-bg/50 px-5 py-2.5 text-ink backdrop-blur transition-colors hover:border-lime hover:text-lime"
          >
            <Mail size={15} /> {site.email}
          </a>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-bg/50 px-5 py-2.5 text-ink backdrop-blur transition-colors hover:border-lime hover:text-lime"
          >
            <MessageCircle size={15} /> WhatsApp
          </a>
          <button
            type="button"
            onClick={() => openContact("form")}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-bg/50 px-5 py-2.5 text-ink backdrop-blur transition-colors hover:border-lime hover:text-lime"
          >
            Send a message →
          </button>
        </div>
      </div>
    </section>
  );
}
