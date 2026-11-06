/** Site-wide config. Edit contact details and links here. */
export const site = {
  name: "Mohammed Paseem",
  /** Short / brand name used in SEO titles, schema and share cards. */
  brandName: "Fasim",
  shortName: "Paseem",
  role: "Digital Marketing Specialist",
  /** Line under the name in the hero. */
  roleLine: ["Digital Marketing Specialist", "SEO", "SMM", "Paid Ads", "Local SEO"],
  tagline: "I turn search, ads and data into leads for growing brands.",
  metaTitle: "Fasim | Digital Marketing & Performance Marketing Specialist",
  description:
    "Digital marketing portfolio showcasing SEO, SMM, Google Ads, Meta Ads and Local SEO. Explore real campaigns, marketing strategies and measurable results.",
  ogDescription:
    "Explore Fasim's digital marketing portfolio covering SEO, SMM, Google Ads, Meta Ads and Local SEO. See real campaigns, strategies and measurable results.",
  twitterDescription:
    "Digital marketing portfolio covering SEO, SMM, Google Ads, Meta Ads and Local SEO, with real campaigns and measurable results.",
  url: "https://fasim-portfolio.vercel.app",
  email: "fasimfazi@gmail.com",
  phone: "+91 95979 08014",
  phoneHref: "tel:+919597908014",
  whatsapp: "https://wa.me/919597908014",
  linkedinHandle: "fasim-fazi",
  linkedin: "https://www.linkedin.com/in/fasim-fazi/",
  /** TODO: put the Instagram username here (without @) — it then shows in "Let's grow together" and the socials. */
  instagramHandle: "",
  /**
   * Social icons (original brand logos from /public/logos).
   * Paste a profile URL into any empty `href` to show that icon; empty ones stay hidden.
   */
  socials: [
    { name: "LinkedIn", logo: "linkedin", href: "https://www.linkedin.com/in/fasim-fazi/" },
    { name: "Instagram", logo: "instagram", href: "" },
    { name: "WhatsApp", logo: "whatsapp", href: "https://wa.me/919597908014" },
    { name: "Gmail", logo: "gmail", href: "mailto:fasimfazi@gmail.com" },
    { name: "Facebook", logo: "facebook", href: "" },
    { name: "X", logo: "x", href: "" },
  ],
  location: "Kanuvai, Coimbatore",
  city: "Coimbatore",
  region: "Tamil Nadu",
  country: "India",
  languages: ["English", "Tamil", "Malayalam"],
  resume: "/resume.pdf",
  heroImage: "/hero-paseem.png",
  ogImage: "/og-image.jpg",
  heroWords: ["DIGITAL", "MARKETING"] as const,
  nav: [
    { label: "Results", href: "#results" },
    { label: "Journey", href: "#journey" },
    { label: "Skills", href: "#skills" },
    { label: "Proof", href: "#proof" },
    { label: "Contact", href: "#contact" },
  ],
  stats: [
    { value: 30, suffix: "+", label: "Clients managed" },
    { value: 250, suffix: "+", label: "Google Business Profiles" },
    { value: 27, suffix: "+", label: "Clients ranked page 1" },
  ],
  /** Floating glass chips around the hero photo — edit freely. */
  chips: ["CTR ↑", "Organic traffic ↑", "#1 on Google", "Leads ↑"],
  marquee: ["SEO", "LOCAL SEO", "GOOGLE ADS", "META ADS", "SMM", "GA4", "GOOGLE BUSINESS PROFILE", "CONTENT STRATEGY", "AI SEARCH"],
  /** Tracking IDs from the brief. */
  tracking: {
    googleSiteVerification: "uV7ecRQ2uLylYM6IJDOqfVPtp7Ij6yEXv0ZejvQ7oII",
    gtmId: "GTM-NZHX3DN7",
    clarityId: "z9a70qizcl",
  },
};

/** Instagram profile URL built from the handle (empty until the handle is filled in). */
export const instagramUrl = site.instagramHandle ? `https://www.instagram.com/${site.instagramHandle}/` : "";
