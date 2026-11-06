"use client";

import Image from "next/image";
import { Award, Eye } from "lucide-react";
import { useState } from "react";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import Modal from "@/components/Modal";
import type { Cert } from "@/data/certs";

type Item = Cert & { src: string; hasImage: boolean };

export default function CertGrid({ items }: { items: Item[] }) {
  const [view, setView] = useState<Item | null>(null);

  return (
    <>
      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c, i) => (
          <li key={c.slug} data-build={i + 2} >
            <article className="card-grad group flex h-full flex-col rounded-3xl bg-surface p-6">
              <div className="flex items-start justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-accent">
                  <Award size={12} /> {c.issuer}
                </span>
                <span className="font-mono text-[11px] text-muted">{c.year}</span>
              </div>
              <h3 className="mt-6 font-display text-2xl leading-[1.05] text-ink">{c.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{c.line}</p>
              <button
                type="button"
                onClick={() => setView(c)}
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-line px-4 py-2 text-xs font-medium text-ink transition-colors hover:border-accent hover:text-accent"
              >
                <Eye size={14} /> View certificate
              </button>
            </article>
          </li>
        ))}
      </ul>

      <Modal open={!!view} onClose={() => setView(null)} label={view ? `${view.title} certificate` : "Certificate"} className="max-w-3xl">
        {view && (
          <div className="p-5 pt-16 sm:p-8 sm:pt-16">
            <div className="relative aspect-[1.414/1] overflow-hidden rounded-2xl border border-line bg-bg">
              {view.hasImage ? (
                <Image src={view.src} alt={`${view.title} — ${view.issuer} certificate`} fill sizes="(min-width:768px) 720px, 100vw" className="object-contain" />
              ) : (
                <ImagePlaceholder label="Certificate scan coming soon" path={`public${view.src}`} />
              )}
            </div>
            <p className="mt-4 font-display text-xl">{view.title}</p>
            <p className="text-sm text-muted">
              {view.issuer} · {view.year}
            </p>
          </div>
        )}
      </Modal>
    </>
  );
}
