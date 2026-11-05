"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Copy,
  Download,
  Eye,
  Globe2,
  Languages,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import Modal from "@/components/Modal";
import { site } from "@/data/site";

type Ctx = { openContact: (view?: "talk" | "form") => void };
const ContactCtx = createContext<Ctx>({ openContact: () => {} });
export const useContact = () => useContext(ContactCtx);

export default function ContactProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"talk" | "form">("talk");
  const [toast, setToast] = useState<string | null>(null);

  const openContact = useCallback((v: "talk" | "form" = "talk") => {
    setView(v);
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);
  const notify = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2600);
  }, []);
  const value = useMemo(() => ({ openContact }), [openContact]);

  return (
    <ContactCtx.Provider value={value}>
      {children}
      <Modal open={open} onClose={close} label={view === "talk" ? "Let's talk" : "Send a message"} className="max-w-xl">
        {view === "talk" ? (
          <TalkView onForm={() => setView("form")} notify={notify} />
        ) : (
          <FormView
            onBack={() => setView("talk")}
            onSent={() => {
              close();
              notify("Message sent — I'll reply soon ✦");
            }}
            notify={notify}
          />
        )}
      </Modal>
      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 z-[9999] -translate-x-1/2 rounded-full border border-lime/40 bg-surface px-5 py-2.5 font-mono text-xs text-lime shadow-[0_0_40px_rgba(198,255,61,.2)]"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </ContactCtx.Provider>
  );
}

// ---------- views ----------

function useCopy(notify: (m: string) => void) {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      notify("Copied to clipboard");
      window.setTimeout(() => setCopied(null), 1600);
    } catch {
      notify("Couldn't copy — please copy manually");
    }
  };
  return { copied, copy };
}

function IstClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <span className="tabular-nums" suppressHydrationWarning>
      {time || "--:--:--"} IST
    </span>
  );
}

const pill =
  "inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-lime hover:text-lime";

function Row({ icon, label, value, children }: { icon: ReactNode; label: string; value: ReactNode; children?: ReactNode }) {
  return (
    <div className="flex flex-col gap-3 border-b border-line py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-bg/70 text-lime">{icon}</span>
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{label}</p>
          <p className="truncate text-sm text-ink">{value}</p>
        </div>
      </div>
      {children && <div className="flex flex-wrap gap-2 sm:justify-end">{children}</div>}
    </div>
  );
}

function CopyBtn({ done, onCopy }: { done: boolean; onCopy: () => void }) {
  return (
    <button type="button" className={pill} onClick={onCopy}>
      {done ? <Check size={13} /> : <Copy size={13} />} {done ? "Copied" : "Copy"}
    </button>
  );
}

/** Original brand logo from /public/logos (Gmail, WhatsApp, LinkedIn…). */
function Logo({ name, size = 18 }: { name: string; size?: number }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`/logos/${name}.svg`} alt="" aria-hidden width={size} height={size} style={{ width: size, height: size }} />;
}

function TalkView({ onForm, notify }: { onForm: () => void; notify: (m: string) => void }) {
  const { copied, copy } = useCopy(notify);

  return (
    <div className="p-6 sm:p-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-lime">
        <span className="animate-pulse-dot">●</span> Available for projects
      </p>
      <h2 className="mt-2 font-display text-4xl sm:text-5xl">
        Let&apos;s talk<span className="text-lime">.</span>
      </h2>
      <p className="mt-2 text-sm text-muted">SEO, ads, analytics — or just a hello. Pick whatever is easiest.</p>

      <div className="mt-4">
        <Row icon={<Logo name="gmail" />} label="Email" value={site.email}>
          <a className={pill} href={`mailto:${site.email}`}>
            <Send size={13} /> Write
          </a>
          <CopyBtn done={copied === "email"} onCopy={() => copy(site.email, "email")} />
        </Row>
        <Row icon={<Logo name="whatsapp" />} label="Phone & WhatsApp" value={site.phone}>
          <a className={pill} href={site.phoneHref}>
            <Phone size={13} /> Call
          </a>
          <a className={pill} href={site.whatsapp} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={13} /> WhatsApp
          </a>
          <CopyBtn done={copied === "phone"} onCopy={() => copy(site.phone, "phone")} />
        </Row>
        <Row icon={<Download size={16} />} label="Resume" value="Mohammed Paseem J — CV (PDF)">
          <a className={pill} href={site.resume} target="_blank" rel="noopener noreferrer">
            <Eye size={13} /> View
          </a>
          <a className={pill} href={site.resume} download="Mohammed-Paseem-J-Resume.pdf">
            <Download size={13} /> Download
          </a>
        </Row>
        <Row icon={<Logo name="linkedin" />} label="LinkedIn" value={`/in/${site.linkedinHandle}`}>
          <a className={pill} href={site.linkedin} target="_blank" rel="noopener noreferrer">
            Open ↗
          </a>
        </Row>
        <div className="grid gap-4 py-4 text-sm sm:grid-cols-3">
          <p className="flex items-center gap-2 text-muted">
            <MapPin size={14} className="text-lime" /> {site.location}, {site.country}
          </p>
          <p className="flex items-center gap-2 text-muted">
            <Languages size={14} className="text-lime" /> {site.languages.join(" · ")}
          </p>
          <p className="flex items-center gap-2 font-mono text-xs text-muted">
            <Globe2 size={14} className="text-lime" /> <IstClock />
          </p>
        </div>
      </div>

      <button type="button" onClick={onForm} className="btn-lime mt-2 w-full rounded-full px-6 py-3.5 text-sm font-semibold">
        Send a message →
      </button>
    </div>
  );
}

const TOPICS = ["SEO", "Ads", "Social media", "Just hello"];

function FormView({ onBack, onSent, notify }: { onBack: () => void; onSent: () => void; notify: (m: string) => void }) {
  const [topics, setTopics] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggle = (t: string) => setTopics((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]));

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          message: fd.get("message"),
          topics,
          company: fd.get("company"), // honeypot
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      onSent();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setError(msg);
      notify(msg);
    } finally {
      setSending(false);
    }
  };

  const field =
    "w-full rounded-2xl border border-line bg-bg/60 px-4 py-3 text-sm text-ink placeholder:text-muted/70 outline-none transition-colors focus:border-lime";

  return (
    <form onSubmit={submit} className="p-6 sm:p-8" noValidate={false}>
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-lime">● Reply within a day</p>
      <h2 className="mt-2 font-display text-4xl sm:text-5xl">
        Send a message<span className="text-lime">.</span>
      </h2>

      <div className="mt-6 grid gap-4">
        <label className="grid gap-1.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Name</span>
          <input name="name" required autoComplete="name" placeholder="Your name" className={field} />
        </label>
        <label className="grid gap-1.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Email</span>
          <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={field} />
        </label>
        <fieldset>
          <legend className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">I&apos;d like help with</legend>
          <div className="flex flex-wrap gap-2">
            {TOPICS.map((t) => {
              const on = topics.includes(t);
              return (
                <button
                  key={t}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(t)}
                  className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                    on ? "border-lime bg-lime text-bg" : "border-line text-ink hover:border-lime hover:text-lime"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </fieldset>
        <label className="grid gap-1.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Message</span>
          <textarea
            name="message"
            required
            rows={4}
            minLength={10}
            placeholder="Tell me about your brand and goals…"
            className={`${field} resize-none`}
          />
        </label>
        {/* honeypot — hidden from people, bots fill it */}
        <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
        {error && (
          <p role="alert" className="text-sm text-[#FF6B3D]">
            {error}
          </p>
        )}
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm transition-colors hover:border-lime hover:text-lime"
        >
          <ArrowLeft size={15} /> Back
        </button>
        <button
          type="submit"
          disabled={sending}
          className="btn-lime inline-flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold disabled:opacity-60"
        >
          {sending ? "Sending…" : "Send"} <Send size={15} />
        </button>
      </div>
    </form>
  );
}
