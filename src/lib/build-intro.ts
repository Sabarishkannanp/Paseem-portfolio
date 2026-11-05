/**
 * Figma multiplayer-cursor "page builds itself" intro — creative edition.
 *
 * Cursors fly on curved paths (tilting with speed, leaving a glowing trail),
 * click with a ripple, chat like Figma cursor-chat, type text with a caret,
 * then all meet at the hero photo for a spark burst and fly off.
 *
 * Markup contract:
 *   - Hero elements (and navbar items outside any section) get data-build="1..n"
 *     and optional data-build-tool="text|image|shape|frame".
 *   - Other sections get data-build-section; children get data-build="1..n".
 *   - CSS: [data-build]{opacity:0} (+ reduced-motion / mobile override to 1).
 *
 * Window events "build-intro:start" / "build-intro:end" fire so a smooth
 * scroll provider (Lenis) can pause while the hero is building.
 */

export type Person = { name: string; color: string; ink: string; says: string[] };
type Tool = "move" | "frame" | "shape" | "text" | "image";

/** Edit names, colours and chat lines here. */
export const PEOPLE: Person[] = [
  { name: "Paseem", color: "#C6FF3D", ink: "#07090F", says: ["let's rank this 🚀", "looks clean ✨"] },
  { name: "SEO", color: "#4D7CFF", ink: "#FFFFFF", says: ["keywords ✓", "schema added"] },
  { name: "Ads", color: "#FF6B3D", ink: "#07090F", says: ["CTR ↑", "campaign live"] },
  { name: "Meta", color: "#B26BFF", ink: "#FFFFFF", says: ["leads incoming 💬", "audience set"] },
  { name: "Analytics", color: "#2EE6C5", ink: "#07090F", says: ["traffic ↑ 📈", "GA4 tracking ✓"] },
];
const FINALE_LINE = "shipped! 🎉";

const ICONS: Record<Tool, string> = {
  move: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3l14 8-6 2-2 6z"/></svg>',
  frame:
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 3v18M17 3v18M3 7h18M3 17h18"/></svg>',
  shape:
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/></svg>',
  text: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 6V4h14v2M12 4v16M9 20h6"/></svg>',
  image:
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 17l5-5 4 4 3-3 6 6"/><circle cx="16" cy="9" r="1.5"/></svg>',
};
const TOOL_ORDER: Tool[] = ["move", "frame", "shape", "text", "image"];

const MONO = "var(--font-jetbrains),ui-monospace,monospace";
const CSS = `
.bc-layer{position:absolute;left:0;top:0;width:0;height:0;z-index:9990;pointer-events:none}
.bc-cursor{position:absolute;left:0;top:0;will-change:transform;transition:opacity .35s}
.bc-ptr{transform-origin:2px 2px;transition:transform .12s ease-out}
.bc-ptr svg{display:block;filter:drop-shadow(0 2px 5px rgba(0,0,0,.5)) drop-shadow(0 0 6px var(--c))}
.bc-ptr.bc-press{animation:bc-press .22s ease-out}
.bc-tag{position:absolute;left:14px;top:18px;padding:2px 7px;border-radius:3px 9px 9px 9px;font:600 11px/1.4 ${MONO};white-space:nowrap;box-shadow:0 4px 14px rgba(0,0,0,.35)}
.bc-chat{position:absolute;left:14px;top:40px;padding:6px 10px;border-radius:3px 12px 12px 12px;font:500 12px/1.3 Inter,system-ui,sans-serif;white-space:nowrap;box-shadow:0 8px 24px rgba(0,0,0,.4);transform-origin:0 0;animation:bc-pop .32s cubic-bezier(.34,1.56,.64,1) both}
.bc-chat.bc-out{animation:bc-unpop .22s ease-in forwards}
.bc-trail{position:absolute;width:6px;height:6px;margin:-3px 0 0 -3px;border-radius:50%;animation:bc-fade .5s ease-out forwards}
.bc-ripple{position:absolute;width:14px;height:14px;margin:-7px 0 0 -7px;border-radius:50%;border:2px solid var(--c);animation:bc-ripple .55s ease-out forwards}
.bc-spark{position:absolute;width:7px;height:7px;margin:-3.5px 0 0 -3.5px;border-radius:2px;animation:bc-spark .8s cubic-bezier(.2,.7,.3,1) forwards}
.bc-ring{position:absolute;width:20px;height:20px;margin:-10px 0 0 -10px;border-radius:50%;border:2px solid #C6FF3D;animation:bc-ring .7s ease-out forwards}
.bc-caret{position:absolute;width:2px;border-radius:1px;animation:bc-blink .5s steps(1) infinite}
.bc-box{position:absolute;box-sizing:border-box;border:1px solid #C6FF3D;background:rgba(198,255,61,.05);box-shadow:0 0 24px rgba(198,255,61,.12);transition:width var(--d,300ms) cubic-bezier(.4,0,.2,1),height var(--d,300ms) cubic-bezier(.4,0,.2,1),opacity .25s}
.bc-h{position:absolute;width:6px;height:6px;box-sizing:border-box;background:#fff;border:1px solid #C6FF3D}
.bc-h.tl{left:-3px;top:-3px}.bc-h.tr{right:-3px;top:-3px}.bc-h.bl{left:-3px;bottom:-3px}.bc-h.br{right:-3px;bottom:-3px}
.bc-size{position:absolute;left:50%;transform:translateX(-50%);top:calc(100% + 6px);background:#C6FF3D;color:#07090F;font:600 10px/1 ${MONO};padding:3px 5px;border-radius:3px;white-space:nowrap}
.bc-bar{position:fixed;left:50%;bottom:20px;transform:translate(-50%,0);z-index:9992;display:flex;align-items:center;gap:2px;padding:4px;border-radius:12px;background:rgba(14,18,27,.92);border:1px solid #1C2230;backdrop-filter:blur(8px);box-shadow:0 10px 30px rgba(0,0,0,.45),0 0 40px rgba(198,255,61,.08);transition:opacity .4s,transform .5s cubic-bezier(.34,1.56,.64,1);pointer-events:none}
.bc-bar.bc-off{opacity:0;transform:translate(-50%,24px)}
.bc-tool{width:32px;height:32px;border-radius:8px;display:grid;place-items:center;color:#8B93A6;transition:background .15s,color .15s,transform .2s}
.bc-tool.on{background:#C6FF3D;color:#07090F;transform:translateY(-2px)}
.bc-avs{display:flex;align-items:center;padding:0 6px 0 16px;margin-left:4px;border-left:1px solid #1C2230;height:24px}
.bc-av{width:22px;height:22px;margin-left:-6px;border-radius:50%;border:2px solid #0E121B;display:grid;place-items:center;font:700 10px/1 ${MONO};transition:transform .2s,box-shadow .2s}
.bc-av.on{transform:translateY(-3px) scale(1.12);box-shadow:0 0 0 2px var(--c)}
.bc-file{padding:0 10px 0 8px;color:#8B93A6;font:500 11px/32px ${MONO};white-space:nowrap;display:flex;align-items:center;gap:6px}
.bc-file b{color:#EEF1F6;font-weight:600}
.bc-live{width:6px;height:6px;border-radius:50%;background:#C6FF3D;box-shadow:0 0 8px #C6FF3D;animation:bc-blink 1s steps(1) infinite}
.bc-ruler{position:fixed;z-index:9991;pointer-events:none;background-color:rgba(7,9,15,.88);transition:opacity .5s}
.bc-ruler-x{left:0;right:0;top:0;height:14px;border-bottom:1px solid #1C2230;background-image:repeating-linear-gradient(90deg,rgba(198,255,61,.35) 0 1px,transparent 1px 10px),repeating-linear-gradient(90deg,rgba(198,255,61,.8) 0 1px,transparent 1px 100px);background-size:100% 5px,100% 10px;background-position:bottom;background-repeat:repeat-x}
.bc-ruler-y{top:0;bottom:0;left:0;width:14px;border-right:1px solid #1C2230;background-image:repeating-linear-gradient(0deg,rgba(198,255,61,.35) 0 1px,transparent 1px 10px),repeating-linear-gradient(0deg,rgba(198,255,61,.8) 0 1px,transparent 1px 100px);background-size:5px 100%,10px 100%;background-position:right;background-repeat:repeat-y}
@media (max-width:640px){
.bc-avs,.bc-file{display:none}
.bc-bar{bottom:14px}
.bc-tool{width:30px;height:30px}
.bc-tag{font-size:10px;padding:1px 6px}
.bc-chat{font-size:11px;padding:5px 8px}
.bc-size{font-size:9px}
}
@keyframes bc-press{40%{transform:scale(.78)}100%{transform:scale(1)}}
@keyframes bc-pop{from{opacity:0;transform:scale(.4)}to{opacity:1;transform:scale(1)}}
@keyframes bc-unpop{to{opacity:0;transform:scale(.6)}}
@keyframes bc-fade{from{opacity:.75;transform:scale(1)}to{opacity:0;transform:scale(.2)}}
@keyframes bc-ripple{from{opacity:1;transform:scale(.4)}to{opacity:0;transform:scale(3.2)}}
@keyframes bc-ring{from{opacity:1;transform:scale(.5)}to{opacity:0;transform:scale(9)}}
@keyframes bc-spark{0%{opacity:1;transform:translate(0,0) rotate(0) scale(1)}100%{opacity:0;transform:translate(var(--dx),var(--dy)) rotate(var(--r)) scale(.3)}}
@keyframes bc-blink{50%{opacity:0}}
`;

// ---------- helpers ----------

const CLIP_TO = "inset(0% 0% 0% 0% round 0px)";
const CLIP_FROM: Record<Tool, string> = {
  text: "inset(0% 100% 0% 0% round 0px)",
  frame: "inset(0% 100% 100% 0% round 0px)",
  image: "inset(50% 50% 50% 50% round 24px)",
  shape: "inset(50% 50% 50% 50% round 999px)",
  move: CLIP_TO,
};

type Token = { cancelled: boolean };
class Cancelled extends Error {}

const wait = (ms: number, t: Token) =>
  new Promise<void>((res, rej) => setTimeout(() => (t.cancelled ? rej(new Cancelled()) : res()), ms));

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

export function shouldAnimate() {
  if (typeof window === "undefined") return false;
  // runs on every screen size (phones too) — only skipped for reduced-motion users
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function ensureStyle() {
  if (document.getElementById("bc-style")) return;
  const s = document.createElement("style");
  s.id = "bc-style";
  s.textContent = CSS;
  document.head.appendChild(s);
}

function el<K extends keyof HTMLElementTagNameMap>(tag: K, cls: string, html = "") {
  const n = document.createElement(tag);
  n.className = cls;
  if (html) n.innerHTML = html;
  return n;
}

/** Add a one-shot effect node that removes itself when its animation ends. */
function fx(layer: HTMLElement, cls: string, x: number, y: number, style: Record<string, string> = {}) {
  const n = el("span", cls);
  n.style.left = `${x}px`;
  n.style.top = `${y}px`;
  for (const [k, v] of Object.entries(style)) n.style.setProperty(k, v);
  n.addEventListener("animationend", () => n.remove(), { once: true });
  layer.appendChild(n);
  return n;
}

function show(n: HTMLElement) {
  n.style.opacity = "1";
}

export function revealAll(scope: ParentNode = document) {
  scope.querySelectorAll<HTMLElement>("[data-build]").forEach(show);
}

function order(nodes: Iterable<HTMLElement>) {
  return [...nodes].sort((a, b) => Number(a.dataset.build ?? 0) - Number(b.dataset.build ?? 0));
}

function toolOf(n: HTMLElement): Tool {
  const t = n.dataset.buildTool as Tool | undefined;
  return t && t in CLIP_FROM ? t : "frame";
}

/** Page-space rect (the layer is absolute, so effects stay put when scrolling). */
function pageRect(n: HTMLElement) {
  const r = n.getBoundingClientRect();
  return { x: r.left + window.scrollX, y: r.top + window.scrollY, w: r.width, h: r.height };
}

function revealEl(n: HTMLElement, tool: Tool, ms: number, layer?: HTMLElement, color = "#C6FF3D") {
  const r = n.getBoundingClientRect();
  if (r.width === 0 || r.height === 0 || tool === "move") {
    show(n);
    return;
  }
  n.style.transition = "none";
  n.style.clipPath = CLIP_FROM[tool];
  n.style.opacity = "0";
  void n.offsetWidth; // flush
  n.style.transition = `clip-path ${ms}ms cubic-bezier(.65,0,.25,1), opacity ${Math.round(ms * 0.6)}ms ease-out`;
  n.style.clipPath = CLIP_TO;
  n.style.opacity = "1";
  setTimeout(() => {
    n.style.transition = "";
    n.style.clipPath = "";
  }, ms + 60);

  // text tool: a typing caret rides the reveal edge
  if (tool === "text" && layer) {
    const p = pageRect(n);
    const caret = el("span", "bc-caret");
    Object.assign(caret.style, {
      left: `${p.x}px`,
      top: `${p.y}px`,
      height: `${p.h}px`,
      background: color,
      boxShadow: `0 0 10px ${color}`,
      transition: `left ${ms}ms cubic-bezier(.65,0,.25,1)`,
    });
    layer.appendChild(caret);
    void caret.offsetWidth;
    caret.style.left = `${p.x + p.w + 2}px`;
    setTimeout(() => caret.remove(), ms + 350);
  }
}

// ---------- the cursor ----------

class Cursor {
  x = 0;
  y = 0;
  readonly root: HTMLElement;
  private ptr: HTMLElement;
  private chat: HTMLElement | null = null;

  constructor(
    private layer: HTMLElement,
    readonly p: Person,
    private token: Token,
  ) {
    this.root = el("div", "bc-cursor");
    this.root.style.setProperty("--c", p.color);
    this.ptr = el(
      "div",
      "bc-ptr",
      `<svg width="18" height="20" viewBox="0 0 18 20"><path d="M1 1l15 7.2-6.6 1.8L6.2 18z" fill="${p.color}" stroke="#07090F" stroke-width="1.2" stroke-linejoin="round"/></svg>`,
    );
    const tag = el("span", "bc-tag", p.name);
    tag.style.background = p.color;
    tag.style.color = p.ink;
    this.root.append(this.ptr, tag);
    layer.appendChild(this.root);
  }

  place(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.root.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
  }

  /** Fly along a curved (quadratic bezier) path, tilting with speed and leaving a trail. */
  moveTo(tx: number, ty: number, ms: number, { trail = true, bend = 0.28 } = {}): Promise<void> {
    const x0 = this.x;
    const y0 = this.y;
    const dx = tx - x0;
    const dy = ty - y0;
    const dist = Math.hypot(dx, dy);
    if (dist < 1 || ms <= 0) {
      this.place(tx, ty);
      return Promise.resolve();
    }
    const off = Math.min(180, dist * bend) * (Math.random() < 0.5 ? -1 : 1);
    const cx = x0 + dx / 2 - (dy / dist) * off;
    const cy = y0 + dy / 2 + (dx / dist) * off;

    return new Promise((res) => {
      const start = performance.now();
      let lastX = x0;
      let lastDot = 0;
      const frame = (now: number) => {
        if (this.token.cancelled) return res();
        const raw = Math.min(1, (now - start) / ms);
        const t = easeInOut(raw);
        const u = 1 - t;
        const x = u * u * x0 + 2 * u * t * cx + t * t * tx;
        const y = u * u * y0 + 2 * u * t * cy + t * t * ty;
        this.ptr.style.transform = `rotate(${clamp((x - lastX) * 1.3, -18, 18)}deg)`;
        lastX = x;
        this.place(x, y);
        if (trail && raw < 0.94 && now - lastDot > 20) {
          lastDot = now;
          fx(this.layer, "bc-trail", x + 3, y + 3, { background: this.p.color, "box-shadow": `0 0 8px ${this.p.color}` });
        }
        if (raw < 1) requestAnimationFrame(frame);
        else {
          this.ptr.style.transform = "";
          res();
        }
      };
      requestAnimationFrame(frame);
    });
  }

  click() {
    this.ptr.classList.remove("bc-press");
    void this.ptr.offsetWidth;
    this.ptr.classList.add("bc-press");
    fx(this.layer, "bc-ripple", this.x + 3, this.y + 3, { "--c": this.p.color });
  }

  say(text: string, ms = 1300) {
    this.chat?.remove();
    const c = el("span", "bc-chat", text);
    c.style.background = this.p.color;
    c.style.color = this.p.ink;
    this.root.appendChild(c);
    this.chat = c;
    setTimeout(() => {
      c.classList.add("bc-out");
      setTimeout(() => c.remove(), 240);
    }, ms);
  }

  fadeOut(delay = 0) {
    setTimeout(() => (this.root.style.opacity = "0"), delay);
  }
}

// ---------- other visual pieces ----------

function makeBox(layer: HTMLElement, x: number, y: number) {
  const b = el(
    "div",
    "bc-box",
    '<i class="bc-h tl"></i><i class="bc-h tr"></i><i class="bc-h bl"></i><i class="bc-h br"></i><span class="bc-size"></span>',
  );
  Object.assign(b.style, { left: `${x}px`, top: `${y}px`, width: "0px", height: "0px" });
  layer.appendChild(b);
  return b;
}

/** Grow the box and count the size label up as it grows. */
function growBox(b: HTMLElement, w: number, h: number, ms: number) {
  b.style.setProperty("--d", `${ms}ms`);
  void b.offsetWidth;
  b.style.width = `${w}px`;
  b.style.height = `${h}px`;
  const label = b.querySelector<HTMLElement>(".bc-size");
  if (!label) return;
  const start = performance.now();
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / ms);
    const e = 1 - Math.pow(1 - t, 3);
    label.textContent = `${Math.round(w * e)} × ${Math.round(h * e)}`;
    if (t < 1 && b.isConnected) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function fadeRemove(n: HTMLElement, delay = 0) {
  setTimeout(() => {
    n.style.opacity = "0";
    setTimeout(() => n.remove(), 300);
  }, delay);
}

function burst(layer: HTMLElement, x: number, y: number) {
  fx(layer, "bc-ring", x, y);
  const colors = PEOPLE.map((p) => p.color);
  for (let i = 0; i < 22; i++) {
    const a = (i / 22) * Math.PI * 2 + Math.random() * 0.3;
    const d = 70 + Math.random() * 90;
    fx(layer, "bc-spark", x, y, {
      background: colors[i % colors.length],
      "box-shadow": `0 0 8px ${colors[i % colors.length]}`,
      "--dx": `${Math.cos(a) * d}px`,
      "--dy": `${Math.sin(a) * d}px`,
      "--r": `${Math.random() * 360}deg`,
    });
  }
}

function makeToolbar(pageCount: number) {
  const bar = el("div", "bc-bar bc-off");
  const tools = {} as Record<Tool, HTMLElement>;
  for (const t of TOOL_ORDER) {
    tools[t] = el("span", "bc-tool", ICONS[t]);
    bar.appendChild(tools[t]);
  }
  const avs = el("span", "bc-avs");
  const avatars = new Map<string, HTMLElement>();
  for (const p of PEOPLE) {
    const a = el("span", "bc-av", p.name[0]);
    a.style.background = p.color;
    a.style.color = p.ink;
    a.style.setProperty("--c", p.color);
    a.title = p.name;
    avatars.set(p.name, a);
    avs.appendChild(a);
  }
  bar.append(avs, el("span", "bc-file", `<i class="bc-live"></i><b>Paseem.fig</b> · ${pageCount} frames`));
  document.body.appendChild(bar);
  requestAnimationFrame(() => bar.classList.remove("bc-off"));

  const set = (t: Tool, who?: string) => {
    TOOL_ORDER.forEach((k) => tools[k].classList.toggle("on", k === t));
    avatars.forEach((a, name) => a.classList.toggle("on", name === who));
  };
  set("move");
  return { bar, set };
}

// ---------- hero intro ----------

export function runIntro({
  root,
  pageCount = 6,
  onDone,
}: {
  root: HTMLElement;
  pageCount?: number;
  onDone?: () => void;
}): () => void {
  ensureStyle();
  const token: Token = { cancelled: false };

  // hero items + navbar items that don't belong to a later section
  const all = order(
    new Set([
      ...root.querySelectorAll<HTMLElement>("[data-build]"),
      ...[...document.querySelectorAll<HTMLElement>("[data-build]")].filter((n) => !n.closest("[data-build-section]")),
    ]),
  );
  // on tall/narrow screens, anything below the first screen just appears (cursors can't be seen there)
  window.scrollTo(0, 0);
  const fold = window.innerHeight;
  const items = all.filter((n) => n.getBoundingClientRect().top < fold - 40);
  all.filter((n) => !items.includes(n)).forEach(show);

  const layer = el("div", "bc-layer");
  document.body.appendChild(layer);
  const toolbar = makeToolbar(pageCount);
  const rulers = makeRulers();

  window.scrollTo(0, 0);
  window.dispatchEvent(new Event("build-intro:start"));
  const html = document.documentElement;
  const prevOverflow = html.style.overflow;
  html.style.overflow = "hidden";

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const cursors = PEOPLE.map((p, i) => {
    const c = new Cursor(layer, p, token);
    c.place(i % 2 ? vw + 40 : -40, vh * (0.12 + 0.18 * i)); // wait just off-screen
    return c;
  });
  const chatted = new Set<Cursor>();

  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    items.forEach(show);
    html.style.overflow = prevOverflow;
    toolbar.bar.classList.add("bc-off");
    rulers.hide();
    setTimeout(() => toolbar.bar.remove(), 500);
    window.dispatchEvent(new Event("build-intro:end"));
  };

  const buildOne = async (n: HTMLElement, i: number) => {
    const c = cursors[i % cursors.length];
    const tool = toolOf(n);
    const r = pageRect(n);
    await c.moveTo(r.x - 4, r.y - 4, 420);
    if (token.cancelled) throw new Cancelled();
    toolbar.set(tool, c.p.name);
    c.click();
    if (!chatted.has(c)) {
      chatted.add(c);
      c.say(c.p.says[0], 1250);
    }
    const box = makeBox(layer, r.x, r.y);
    growBox(box, r.w, r.h, 280);
    await c.moveTo(r.x + r.w - 6, r.y + r.h - 6, 280, { trail: false, bend: 0.08 });
    if (token.cancelled) throw new Cancelled();
    revealEl(n, tool, 380, layer, c.p.color);
    fadeRemove(box, 280);
    void c.moveTo(r.x + r.w + 22, r.y + r.h + 26, 420, { trail: false, bend: 0.4 });
  };

  (async () => {
    try {
      await wait(250, token);
      await Promise.all(
        items.map(async (n, i) => {
          await wait(i * 220, token);
          await buildOne(n, i);
        }),
      );
      await wait(350, token);

      // finale: everyone meets at the hero photo, clicks together, sparks fly
      toolbar.set("move");
      const focus = root.querySelector<HTMLElement>('[data-build-tool="image"]') ?? root;
      const f = pageRect(focus);
      const fx0 = f.x + f.w / 2;
      // meet low on the photo (chest), so sparks don't cover the face
      const fy0 = f.y + Math.min(f.h * 0.78, vh * 0.7);
      await Promise.all(
        cursors.map((c, i) => {
          const a = (i / cursors.length) * Math.PI * 2 - Math.PI / 2;
          return c.moveTo(fx0 + Math.cos(a) * 64, fy0 + Math.sin(a) * 64, 620, { bend: 0.5 });
        }),
      );
      if (token.cancelled) throw new Cancelled();
      cursors.forEach((c) => c.click());
      burst(layer, fx0, fy0);
      cursors[0].say(FINALE_LINE, 650);
      await wait(700, token);

      // scatter off-screen
      cursors.forEach((c, i) => {
        const a = (i / cursors.length) * Math.PI * 2 - Math.PI / 2;
        void c.moveTo(fx0 + Math.cos(a) * vw, fy0 + Math.sin(a) * vw, 700, { bend: 0.35 });
        c.fadeOut(450);
      });
      finish();
      await wait(800, token).catch(() => {});
      layer.remove();
      onDone?.();
    } catch (e) {
      if (!(e instanceof Cancelled)) throw e;
    }
  })();

  return () => {
    token.cancelled = true;
    layer.remove();
    finish();
  };
}

// ---------- per-section builds on scroll (mirrors the reference portfolio) ----------

const rand = (a: number, b: number) => a + Math.random() * (b - a);
/** Section builds run at 0.7× the base timings (same as the reference). */
const SEC = (ms: number) => ms * 0.7;

/**
 * One piece, reference-style:
 * cursor glides to the top-left → drags the selection box to full size (size label counts up)
 * → content wipes in (text left→right, images top→down) → box fades away.
 */
async function buildPiece(c: Cursor, n: HTMLElement, layer: HTMLElement, token: Token) {
  const r = pageRect(n);
  if (r.w === 0 || r.h === 0) {
    show(n);
    return;
  }
  const tool = n.dataset.buildTool ?? "text";
  await c.moveTo(r.x, r.y, SEC(rand(650, 900)), { trail: false, bend: 0.18 });
  if (token.cancelled) throw new Cancelled();

  const box = makeBox(layer, r.x, r.y);
  const drawMs = SEC(Math.min(700, 280 + (r.w + r.h) * 0.35));
  growBox(box, r.w, r.h, drawMs);
  await c.moveTo(r.x + r.w, r.y + r.h, drawMs, { trail: false, bend: 0.12 });
  if (token.cancelled) throw new Cancelled();

  const isImage = tool === "image";
  n.style.opacity = "1";
  n.animate([{ clipPath: isImage ? "inset(0 0 100% 0)" : "inset(0 100% 0 0)" }, { clipPath: "inset(0 0 0 0)" }], {
    duration: SEC(isImage ? 900 : 550),
    easing: "cubic-bezier(.3,0,.2,1)",
  })
    .finished.then(() => (n.style.clipPath = ""))
    .catch(() => {});
  await wait(SEC(isImage ? 700 : 380), token);
  box.style.opacity = "0";
  setTimeout(() => box.remove(), 400);
}

/**
 * When a section scrolls into view, a crew (default 3, or data-build-crew="n") enters from
 * the left/right edges. Pieces are dealt round-robin; each cursor builds its pieces in order,
 * cursors start 180ms apart. Then the crew slides off-screen. Same on phones.
 */
export function watchSections(): () => void {
  if (typeof window === "undefined") return () => {};
  const sections = [...document.querySelectorAll<HTMLElement>("[data-build-section]")];
  if (!shouldAnimate()) {
    sections.forEach((s) => revealAll(s));
    return () => {};
  }
  ensureStyle();
  // Re-hide pieces (React dev mode mounts twice and the first cleanup reveals everything),
  // so sections stay empty until their crew arrives — like the reference.
  sections.forEach((s) =>
    s.querySelectorAll<HTMLElement>("[data-build]").forEach((n) => {
      n.style.opacity = "";
      n.style.clipPath = "";
    }),
  );
  const tokens: Token[] = [];
  const layers = new Set<HTMLElement>();

  const build = async (section: HTMLElement) => {
    const token: Token = { cancelled: false };
    tokens.push(token);
    const layer = el("div", "bc-layer");
    document.body.appendChild(layer);
    layers.add(layer);

    const vw = window.innerWidth;
    const top = pageRect(section).y;
    const size = Number(section.dataset.buildCrew ?? 3);
    const people = [...PEOPLE].sort(() => Math.random() - 0.5).slice(0, size);
    const crew = people.map((p, i) => {
      const c = new Cursor(layer, p, token);
      c.place(window.scrollX + (i % 2 ? vw + 40 : -40), top + rand(0, 160));
      return c;
    });

    const items = order(section.querySelectorAll<HTMLElement>("[data-build]"));
    const lists: HTMLElement[][] = crew.map(() => []);
    items.forEach((n, i) => lists[i % crew.length].push(n));

    try {
      await Promise.all(
        lists.map(async (list, r) => {
          await wait(SEC(r * 180), token);
          for (const n of list) await buildPiece(crew[r], n, layer, token);
        }),
      );
      await Promise.all(
        crew.map((c, i) => c.moveTo(window.scrollX + (i % 2 ? vw + 60 : -60), c.y + rand(-80, 80), SEC(650), { trail: false })),
      );
    } catch (e) {
      if (!(e instanceof Cancelled)) throw e;
    } finally {
      revealAll(section);
      layer.remove();
      layers.delete(layer);
    }
  };

  // start once ~12% of the section is visible (or a good chunk of the screen, for very tall sections)
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const enough = Math.min(e.boundingClientRect.height * 0.12, window.innerHeight * 0.3);
        if (e.intersectionRect.height < enough) continue;
        io.unobserve(e.target);
        void build(e.target as HTMLElement);
      }
    },
    { threshold: [0, 0.02, 0.05, 0.08, 0.12, 0.2] },
  );
  sections.forEach((s) => io.observe(s));

  return () => {
    tokens.forEach((t) => (t.cancelled = true));
    io.disconnect();
    layers.forEach((l) => l.remove());
    sections.forEach((s) => revealAll(s));
  };
}

/** Figma-style rulers along the top/left edge (hero intro only, like the reference). */
function makeRulers() {
  const mk = (side: "x" | "y") => {
    const r = el("div", `bc-ruler bc-ruler-${side}`);
    document.body.appendChild(r);
    return r;
  };
  const rs = [mk("x"), mk("y")];
  return {
    hide() {
      rs.forEach((r) => (r.style.opacity = "0"));
      setTimeout(() => rs.forEach((r) => r.remove()), 600);
    },
  };
}
