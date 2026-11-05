/**
 * Clients shown in the "Brands I've grown" strip.
 * To show a real logo, drop the file at /public/clients/<slug>.png (or .svg/.webp)
 * — a transparent PNG/SVG of the ORIGINAL logo works best. Until then a text wordmark is shown.
 */
export type Client = { slug: string; name: string; industry: string; url?: string };

export const clients: Client[] = [
  { slug: "cmd-engineering", name: "CMD Engineering", industry: "Engineering" },
  { slug: "sathya-garden", name: "Sathya Garden", industry: "Hospitality" },
  { slug: "mayur-lights", name: "Mayur Lights", industry: "Lighting" },
  { slug: "mi-fusion", name: "MI Fusion", industry: "Brand" },
  { slug: "esquire-automation", name: "Esquire Automation", industry: "Automation" },
];
