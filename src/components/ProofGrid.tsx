"use client";

import Image from "next/image";
import { Expand, Play } from "lucide-react";
import { useState } from "react";
import BrandLogo from "@/components/BrandLogo";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import Modal from "@/components/Modal";
import type { Proof } from "@/data/proof";

type Item = Proof & { file: string | null; video: boolean };

const CHANNEL_LOGO: Record<string, string> = {
  SEO: "Semrush",
  "Local SEO": "Google Business Profile",
  "Meta Ads": "Meta Ads",
  "Google Ads": "Google Ads",
  "Social Media": "Instagram",
  "GMB Ads": "Google Ads",
};

export default function ProofGrid({ items }: { items: Item[] }) {
  const [view, setView] = useState<Item | null>(null);
  return (
    <>
      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p, i) => (
          <li key={p.slug} data-build={i + 2} data-build-tool="image">
            <button
              type="button"
              onClick={() => p.file && setView(p)}
              disabled={!p.file}
              aria-label={p.file ? `Open ${p.channel} proof: ${p.title}` : `${p.channel} proof coming soon`}
              className="card-grad group block w-full overflow-hidden rounded-3xl bg-surface text-left disabled:cursor-default"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-bg">
                {p.file ? (
                  p.video ? (
                    <video src={p.file} muted loop playsInline autoPlay preload="metadata" className="h-full w-full object-cover" />
                  ) : (
                    <Image
                      src={p.file}
                      alt={`${p.channel} — ${p.title}: ${p.note}`}
                      fill
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  )
                ) : (
                  <ImagePlaceholder label={`${p.channel} screenshot`} path={`public/proof/${p.slug}.jpg`} />
                )}
                <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-bg/80 py-1 pl-1.5 pr-3 font-mono text-[10px] uppercase tracking-[0.15em] text-white backdrop-blur">
                  <BrandLogo name={CHANNEL_LOGO[p.channel] ?? ""} size={14} />
                  {p.channel}
                </span>
                {p.file && (
                  <span className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-accent text-white opacity-0 transition-opacity group-hover:opacity-100">
                    {p.video ? <Play size={16} /> : <Expand size={16} />}
                  </span>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-display text-2xl leading-none text-ink">{p.title}</h3>
                <p className="mt-2 text-sm text-muted">{p.note}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>

      <Modal open={!!view} onClose={() => setView(null)} label={view ? `${view.channel} — ${view.title}` : "Proof"} className="max-w-5xl">
        {view?.file && (
          <div className="p-4 pt-16 sm:p-6 sm:pt-16">
            <div className="relative overflow-hidden rounded-2xl border border-line bg-bg">
              {view.video ? (
                <video src={view.file} controls autoPlay playsInline className="max-h-[75svh] w-full" />
              ) : (
                <Image
                  src={view.file}
                  alt={`${view.channel} — ${view.title}: ${view.note}`}
                  width={1600}
                  height={1000}
                  sizes="(min-width:1024px) 960px, 100vw"
                  className="h-auto max-h-[75svh] w-full object-contain"
                />
              )}
            </div>
            <p className="mt-4 font-display text-xl">
              {view.channel} · {view.title}
            </p>
            <p className="text-sm text-muted">{view.note}</p>
          </div>
        )}
      </Modal>
    </>
  );
}
