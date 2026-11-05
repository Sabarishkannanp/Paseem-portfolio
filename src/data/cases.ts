/**
 * Case studies. Cover image: /public/cases/<slug>.jpg (a dark placeholder shows until it exists).
 * ✏️ The result values are PLACEHOLDERS — replace them with real numbers.
 */
export type CaseStudy = {
  slug: string;
  title: string;
  industry: string;
  challenge: string;
  results: { label: string; value: string }[];
  tools: string[];
  image: string;
  featured: boolean;
};

export const cases: CaseStudy[] = [
  {
    slug: "automotive-local-seo",
    title: "Local SEO & Google Business Profiles",
    industry: "Automotive · Multi-location",
    challenge: "Hundreds of dealer locations with inconsistent listings and weak local visibility.",
    results: [
      { label: "GBP listings managed", value: "~200" }, // ✏️ edit
      { label: "Reviews & posts", value: "Weekly" }, // ✏️ edit
      { label: "Local pack", value: "Top 3" }, // ✏️ edit
    ],
    tools: ["Google Business Profile", "BrightLocal", "Local Falcon", "Local Viking"],
    image: "/cases/automotive-local-seo.jpg",
    featured: true,
  },
  {
    slug: "hospitality-seo",
    title: "SEO & Content Strategy",
    industry: "Hospitality",
    challenge: "Low organic bookings and thin pages for high-intent location searches.",
    results: [
      { label: "Location pages", value: "Built" }, // ✏️ edit
      { label: "Target keywords", value: "Page 1" }, // ✏️ edit
      { label: "Organic traffic", value: "↑" }, // ✏️ edit
    ],
    tools: ["Semrush", "Search Console", "GA4"],
    image: "/cases/hospitality-seo.jpg",
    featured: true,
  },
  {
    slug: "manufacturing-technical-seo",
    title: "Technical SEO Audit",
    industry: "Manufacturing",
    challenge: "Indexing gaps, duplicate URLs and slow pages holding back key service pages.",
    results: [
      { label: "Indexing issues", value: "Fixed" }, // ✏️ edit
      { label: "Schema", value: "Added" }, // ✏️ edit
      { label: "Page speed", value: "↑" }, // ✏️ edit
    ],
    tools: ["Screaming Frog", "Search Console", "PageSpeed"],
    image: "/cases/manufacturing-technical-seo.jpg",
    featured: true,
  },
  {
    slug: "jewellery-meta-ads",
    title: "Meta Ads Lead Generation",
    industry: "Jewellery",
    challenge: "Needed steady, qualified enquiries from Instagram and Facebook — straight to WhatsApp.",
    results: [
      { label: "WhatsApp leads", value: "↑" }, // ✏️ edit
      { label: "Cost per lead", value: "↓" }, // ✏️ edit
      { label: "Creatives tested", value: "10+" }, // ✏️ edit
    ],
    tools: ["Meta Ads", "Canva", "CapCut"],
    image: "/cases/jewellery-meta-ads.jpg",
    featured: false,
  },
  {
    slug: "education-google-ads",
    title: "Google Ads Search Campaigns",
    industry: "Education",
    challenge: "Admissions season needed more calls and enquiries without wasting budget.",
    results: [
      { label: "Calls & enquiries", value: "↑" }, // ✏️ edit
      { label: "CTR", value: "↑" }, // ✏️ edit
      { label: "Conversion tracking", value: "GTM" }, // ✏️ edit
    ],
    tools: ["Google Ads", "Tag Manager", "GA4"],
    image: "/cases/education-google-ads.jpg",
    featured: false,
  },
  {
    slug: "us-international-seo",
    title: "International SEO",
    industry: "US-market business",
    challenge: "Breaking into US search results with the right keywords and content.",
    results: [
      { label: "Market", value: "US" }, // ✏️ edit
      { label: "Keyword clusters", value: "Mapped" }, // ✏️ edit
      { label: "Organic reach", value: "↑" }, // ✏️ edit
    ],
    tools: ["Semrush", "Search Console", "Keyword research"],
    image: "/cases/us-international-seo.jpg",
    featured: false,
  },
];

export const industries = [
  "Automotive",
  "Hospitality",
  "Manufacturing",
  "Automation",
  "Jewellery",
  "Beauty",
  "Finance",
  "Education",
];
