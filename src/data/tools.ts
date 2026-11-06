/** "Tools I've Worked With" — grouped exactly as in the brief. Logos come from brands.ts. */
export type ToolGroup = { title: string; tools: string[] };

export const toolGroups: ToolGroup[] = [
  {
    title: "Paid Advertising",
    tools: [
      "Google Ads",
      "Meta Ads Manager",
      "Meta Business Suite",
      "Google Keyword Planner",
      "Google Ads Editor",
      "Meta Events Manager",
      "TikTok Ads Manager",
      "LinkedIn Campaign Manager",
    ],
  },
  {
    title: "Analytics & Tracking",
    tools: [
      "Google Analytics 4",
      "Google Tag Manager",
      "Google Search Console",
      "Looker Studio",
      "Microsoft Clarity",
      "Google Trends",
      "UTM Builder / Campaign URL Builder",
    ],
  },
  {
    title: "SEO",
    tools: [
      "Semrush",
      "Ahrefs",
      "Screaming Frog SEO Spider",
      "Google Keyword Planner",
      "Google Trends",
      "Bing Webmaster Tools",
      "Yoast SEO",
      "Rank Math",
    ],
  },
  {
    title: "Local SEO",
    tools: ["Google Business Profile", "Google Maps", "BrightLocal", "Local Falcon", "Whitespark", "Bing Places"],
  },
  {
    title: "Social Media",
    tools: ["Meta Business Suite", "Instagram", "Facebook", "LinkedIn", "YouTube Studio", "TikTok Business", "Buffer", "Hootsuite"],
  },
  {
    title: "Creative & Content",
    tools: ["Canva", "CapCut", "Adobe Photoshop", "Adobe Premiere Pro", "Adobe Express", "ChatGPT"],
  },
  {
    title: "Website & Conversion",
    tools: ["WordPress", "Elementor", "Google Tag Manager", "Hotjar", "Microsoft Clarity", "Google Forms", "WhatsApp Business"],
  },
  {
    title: "Reporting & Productivity",
    tools: ["Looker Studio", "Google Sheets", "Google Docs", "Google Slides", "Excel", "Notion", "Trello"],
  },
];
