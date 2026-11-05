/** Site-wide config. Edit contact details and links here. */
export const site = {
  name: "Mohammed Paseem J",
  shortName: "Paseem",
  role: "Digital Marketing Specialist",
  tagline: "I turn search, ads and data into leads for growing brands.",
  description:
    "Mohammed Paseem J is a Digital Marketing Specialist in Coimbatore, India — SEO, Local SEO, Google Ads, Meta Ads and GA4 for 25+ brands across automotive, hospitality, manufacturing, education and more.",
  // TODO: replace with your real domain after deploying
  url: "https://paseem.vercel.app",
  email: "fasimfazi@gmail.com",
  phone: "+91 95979 08014",
  phoneHref: "tel:+919597908014",
  whatsapp: "https://wa.me/919597908014",
  linkedinHandle: "fasim-fazi",
  // TODO: confirm the full LinkedIn URL
  linkedin: "https://www.linkedin.com/in/fasim-fazi/",
  /**
   * Social icons (original brand logos from /public/logos).
   * Paste a profile URL into any empty `href` to show that icon; empty ones stay hidden.
   */
  socials: [
    { name: "LinkedIn", logo: "linkedin", href: "https://www.linkedin.com/in/fasim-fazi/" },
    { name: "WhatsApp", logo: "whatsapp", href: "https://wa.me/919597908014" },
    { name: "Gmail", logo: "gmail", href: "mailto:fasimfazi@gmail.com" },
    { name: "Instagram", logo: "instagram", href: "" },
    { name: "Facebook", logo: "facebook", href: "" },
    { name: "X", logo: "x", href: "" },
  ],
  location: "Kanuvai, Coimbatore",
  city: "Coimbatore",
  region: "Tamil Nadu",
  country: "India",
  languages: ["English", "Tamil", "Malayalam"],
  resume: "/resume.pdf",
  heroImage: "/hero-cutout.png",
  ogImage: "/og.png",
  heroWords: ["DIGITAL", "MARKETING"] as const,
  nav: [
    { label: "Results", href: "#results" },
    { label: "Journey", href: "#journey" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ],
  stats: [
    { value: 25, suffix: "+", label: "Clients managed" },
    { value: 200, suffix: "+", label: "Google Business Profiles" },
    { value: 15, suffix: "+", label: "Clients ranked page 1" },
  ],
  /** Floating glass chips around the hero photo — edit freely. */
  chips: ["CTR ↑", "Organic traffic ↑", "#1 on Google", "Leads ↑"],
  marquee: [
    "SEO",
    "LOCAL SEO",
    "GOOGLE ADS",
    "META ADS",
    "GA4",
    "GOOGLE BUSINESS PROFILE",
    "CONTENT STRATEGY",
    "AI SEARCH",
  ],
};
