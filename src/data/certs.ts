/** Certificate scans go in /public/certs/<slug>.jpg — the "View" button opens them. */
export type Cert = { slug: string; title: string; issuer: string; year: string; line: string };

export const certs: Cert[] = [
  {
    slug: "digital-marketing-xplore",
    title: "Expert-level Digital Marketing",
    issuer: "Xplore It Corp",
    year: "Coimbatore",
    line: "Hands-on, expert-level programme covering the full digital marketing stack.",
  },
  {
    slug: "seo-xplore",
    title: "SEO Certification",
    issuer: "Xplore It Corp",
    year: "SEO",
    line: "Keyword research, on-page, off-page and technical optimisation.",
  },
  {
    slug: "google-ads-search",
    title: "Google Ads Search Certification",
    issuer: "Google",
    year: "2025–2026",
    line: "Search campaign setup, optimisation and performance improvement.",
  },
  {
    slug: "google-analytics",
    title: "Google Analytics Certification",
    issuer: "Google",
    year: "2025–2026",
    line: "Tracking user behaviour, measuring performance and reading insights.",
  },
  {
    slug: "semrush-offpage-ai",
    title: "Off-Page SEO & AI Search Essentials",
    issuer: "Semrush",
    year: "2025–2026",
    line: "Backlink strategy, authority building and AI-driven search.",
  },
  {
    slug: "meta-ads-workshop",
    title: "Meta Ads Workshop",
    issuer: "Meta Ads",
    year: "Oct 2025",
    line: "Meta ad strategy, campaign optimisation and WhatsApp marketing.",
  },
];
