/**
 * "Proof in Performance" — real screenshots / videos.
 * Drop each file at /public/proof/<slug>.(jpg|png|webp) — or .mp4/.webm for videos.
 * A styled placeholder shows until the file exists.
 */
export type Proof = { slug: string; channel: string; title: string; note: string };

export const proofs: Proof[] = [
  { slug: "seo-sathya-garden", channel: "SEO", title: "Sathya Garden Resort", note: "SEO analysis — organic growth" },
  { slug: "local-seo-march", channel: "Local SEO", title: "Last March performance", note: "Google Business Profile insights" },
  { slug: "meta-ads", channel: "Meta Ads", title: "Meta Ads results", note: "Campaign performance dashboard" },
  { slug: "google-ads", channel: "Google Ads", title: "Google Ads results", note: "Campaign performance dashboard" },
  { slug: "social-esquire", channel: "Social Media", title: "Esquire Automation", note: "Social media videos" },
  { slug: "gmb-ads-salon", channel: "GMB Ads", title: "salon.in", note: "Google local ads" },
];
