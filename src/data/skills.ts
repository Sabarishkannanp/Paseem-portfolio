/** `logos` = brand names (see brands.ts) shown as the logo strip on each row. */
export type Skill = { word: string; tools: string[]; logos: string[]; line: string };

export const skills: Skill[] = [
  {
    word: "SEARCH",
    tools: ["Keyword research", "On-page", "Off-page", "Technical SEO", "E-commerce SEO", "International SEO", "Semrush", "Screaming Frog"],
    logos: ["Semrush", "Google Search Console", "Screaming Frog", "All in One SEO"],
    line: "Ranking pages that bring real enquiries.",
  },
  {
    word: "LOCAL",
    tools: ["Google Business Profile", "BrightLocal", "Local Falcon", "Local Viking"],
    logos: ["Google Business Profile", "BrightLocal", "Local Falcon", "Local Viking"],
    line: "200+ profiles optimised for local visibility.",
  },
  {
    word: "PAID",
    tools: ["Google Ads", "Meta Ads", "Lead-gen campaigns", "Conversion campaigns"],
    logos: ["Google Ads", "Meta Ads"],
    line: "Lower cost per lead, more qualified calls.",
  },
  {
    word: "ANALYTICS",
    tools: ["GA4", "Google Search Console", "Google Tag Manager", "Looker Studio", "Microsoft Clarity"],
    logos: ["GA4", "Google Search Console", "Google Tag Manager", "Looker Studio", "Microsoft Clarity"],
    line: "Every decision backed by data.",
  },
  {
    word: "SOCIAL & CONTENT",
    tools: ["LinkedIn", "X", "Pinterest", "Mailchimp", "Canva", "CapCut", "Magnific", "QuillBot"],
    logos: ["LinkedIn", "X", "Pinterest", "Mailchimp", "Canva", "CapCut"],
    line: "Content planned, scheduled and measured.",
  },
  {
    word: "PLATFORMS",
    tools: ["WordPress", "Shopify", "Wix", "All in One SEO", "HTML", "CSS", "Semrush", "Screaming Frog"],
    logos: ["WordPress", "Shopify", "Wix", "HTML", "CSS"],
    line: "Comfortable on every stack a client brings.",
  },
];
