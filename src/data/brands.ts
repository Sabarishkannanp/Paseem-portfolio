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
  // tools from the brief (Tools I have worked with)
  "Meta Ads Manager": { logo: "meta" },
  "Meta Business Suite": { logo: "meta" },
  "Meta Events Manager": { logo: "meta" },
  "Google Keyword Planner": { logo: "google-ads" },
  "Google Ads Editor": { logo: "google-ads" },
  "TikTok Ads Manager": { logo: "tiktok" },
  "TikTok Business": { logo: "tiktok" },
  "LinkedIn Campaign Manager": { logo: "linkedin" },
  "Google Analytics 4": { logo: "google-analytics" },
  "Google Trends": { mono: "GT", color: "#4285F4" },
  "UTM Builder / Campaign URL Builder": { logo: "google-analytics" },
  Ahrefs: { mono: "ah", color: "#FF8800" },
  "Screaming Frog SEO Spider": { mono: "SF", color: "#7CC242" },
  "Bing Webmaster Tools": { logo: "bing" },
  "Yoast SEO": { logo: "yoast" },
  "Rank Math": { mono: "RM", color: "#E9476E" },
  "Google Maps": { logo: "google-maps" },
  Whitespark: { mono: "W", color: "#F5A623" },
  "Bing Places": { logo: "bing" },
  Instagram: { logo: "instagram" },
  Facebook: { logo: "facebook" },
  "YouTube Studio": { logo: "youtube-studio" },
  Buffer: { logo: "buffer" },
  Hootsuite: { logo: "hootsuite" },
  "Adobe Photoshop": { logo: "photoshop" },
  "Adobe Premiere Pro": { logo: "premiere" },
  "Adobe Express": { mono: "Ae", color: "#FF3D6B" },
  ChatGPT: { logo: "openai" },
  Elementor: { logo: "elementor" },
  Hotjar: { logo: "hotjar" },
  "Google Forms": { logo: "google-forms" },
  "WhatsApp Business": { logo: "whatsapp" },
  "Google Sheets": { logo: "google-sheets" },
  "Google Docs": { logo: "google-docs" },
  "Google Slides": { logo: "google-slides" },
  Excel: { mono: "X", color: "#21A366" },
  Notion: { logo: "notion" },
  Trello: { logo: "trello" },
};

export const brandFor = (name: string): Brand | undefined => brands[name];
