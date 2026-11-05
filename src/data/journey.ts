export type JourneyItem = {
  year: string;
  role: string;
  org: string;
  place?: string;
  points: string[];
};

export const journey: JourneyItem[] = [
  {
    year: "2026",
    role: "Digital Marketing Specialist",
    org: "Cloud Dreams",
    place: "Coimbatore",
    points: [
      "25+ clients across 8+ industries — automotive, hospitality, manufacturing, jewellery, education and more.",
      "SEO & Local SEO: keyword and competitor research, on-page, technical and local search strategy.",
      "~200 Google Business Profiles for a multi-location automotive client.",
      "Technical SEO: audits, indexing, canonicals, redirects, schema and page speed.",
      "Google Ads & Meta Ads for leads, calls and conversions; social media planning.",
      "Reporting with GSC, GA4, GTM and Looker Studio; US-market campaigns.",
      "Client communication, task allocation and developer/designer coordination.",
    ],
  },
  {
    year: "2025",
    role: "Digital Marketer",
    org: "Xplore Intellects Pvt Ltd",
    points: [
      "On-page SEO, keyword & competitor research, content optimisation.",
      "Technical audits with Search Console, Semrush, Screaming Frog and Google Analytics.",
      "Schema markup and internal linking to lift rankings and relevance.",
      "Google Ads & Meta Ads — setup, audiences, creatives and optimisation.",
      "SERP, page-speed and site-performance monitoring.",
    ],
  },
  {
    year: "2021 – 2024",
    role: "Senior Process Associate",
    org: "I-Cons Technologies",
    points: [
      "International sales operations for US & Asian semiconductor markets.",
      "Coordinated cross-functional teams and multiple projects to on-time delivery.",
      "Trained team members and reported progress to management.",
    ],
  },
  {
    year: "2020",
    role: "Bachelor's in Computer Application (BCA)",
    org: "KSG College of Arts and Science",
    points: ["Foundation in computing, web and data — the base for a data-driven marketing career."],
  },
];
