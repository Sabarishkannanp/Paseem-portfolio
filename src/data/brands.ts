/**
 * Tool name → original logo in /public/logos/<logo>.svg.
 * Tools without an open-licence logo show a brand-coloured monogram instead —
 * drop the official SVG into /public/logos/ and set `logo` here to use it.
 */
export type Brand = { logo?: string; mono?: string; color?: string };

export const brands: Record<string, Brand> = {
  // Google
  "Google Ads": { logo: "google-ads" },
  GA4: { logo: "google-analytics" },
  "Google Analytics": { logo: "google-analytics" },
  "Google Search Console": { logo: "google-search-console" },
  "Search Console": { logo: "google-search-console" },
  "Google Tag Manager": { logo: "google-tag-manager" },
  "Tag Manager": { logo: "google-tag-manager" },
  "Looker Studio": { logo: "looker-studio" },
  "Google Business Profile": { logo: "google-maps" },
  // Meta & social
  "Meta Ads": { logo: "meta" },
  LinkedIn: { logo: "linkedin" },
  X: { logo: "x" },
  Pinterest: { logo: "pinterest" },
  Mailchimp: { logo: "mailchimp" },
  // SEO & analytics tools
  Semrush: { logo: "semrush" },
  "Microsoft Clarity": { logo: "microsoft" },
  "Screaming Frog": { mono: "SF", color: "#7CC242" },
  BrightLocal: { mono: "BL", color: "#00A7E1" },
  "Local Falcon": { mono: "LF", color: "#2F80ED" },
  "Local Viking": { mono: "LV", color: "#F2994A" },
  "All in One SEO": { mono: "AI", color: "#005AE0" },
  // platforms & web
  WordPress: { logo: "wordpress" },
  Shopify: { logo: "shopify" },
  Wix: { logo: "wix" },
  HTML: { logo: "html5" },
  CSS: { logo: "css3" },
  // creative
  Canva: { mono: "C", color: "#00C4CC" },
  CapCut: { mono: "CC", color: "#EEF1F6" },
  Magnific: { mono: "M", color: "#B26BFF" },
  QuillBot: { mono: "Q", color: "#4CAF50" },
};

export const brandFor = (name: string): Brand | undefined => brands[name];
