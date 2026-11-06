/**
 * "Brands I've Managed" — scrolling logo strip.
 * To show a real logo, drop the file at /public/clients/<slug>.png (or .svg/.webp/.jpg)
 * — a transparent PNG/SVG of the ORIGINAL logo works best. Until then a styled wordmark is shown.
 */
export type Client = { slug: string; name: string; industry?: string; url?: string; /** square logos need more height */ square?: boolean };

export const clients: Client[] = [
  { slug: "5k-car-care", name: "5K Car Care", industry: "Automotive", url: "https://5kcarcare.com/" },
  { slug: "xplore-intellects", name: "Xplore Intellects", industry: "Digital & Web", url: "https://xploreintellects.com/", square: true },
  { slug: "grow-graph-media", name: "Grow Graph Media", industry: "Agency" },
  { slug: "goat-assets", name: "Goat Assets", industry: "Finance" },
  { slug: "autozone", name: "AutoZone", industry: "Automotive" },
  { slug: "sathya-garden-resort", name: "Sathya Garden Resort", industry: "Hospitality" },
  { slug: "mi-fusion", name: "MI Fusion", industry: "uPVC Windows", url: "https://www.mifusion.in/" },
  { slug: "chendure-upvc-windows", name: "Chendure UPVC Windows", industry: "Manufacturing", url: "https://www.cmfabindia.com/" },
  { slug: "esquire-automation", name: "Esquire Automation", industry: "Automation" },
  { slug: "cmd-engineering", name: "CMD Engineering", industry: "Engineering", url: "https://www.cmdengineering.in/" },
  { slug: "fab-tex", name: "Fab Tex", industry: "Textiles" },
  { slug: "mayur-lights", name: "Mayur Lights", industry: "Lighting", url: "https://www.mayurlights.com/" },
];
