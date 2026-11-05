import type { Metadata, Viewport } from "next";
import { Anton, Caveat, Inter, JetBrains_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import { site } from "@/data/site";
import "./globals.css";

const anton = Anton({ variable: "--font-anton", weight: "400", subsets: ["latin"], display: "swap" });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], display: "swap" });
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"], display: "swap" });

const title = `${site.name} — ${site.role} in Coimbatore | SEO, Google Ads & Meta Ads`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: `${site.shortName}'s Portfolio`,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    "Digital Marketing Specialist Coimbatore",
    "SEO Specialist Coimbatore",
    "Local SEO",
    "Google Business Profile management",
    "Google Ads",
    "Meta Ads",
    "GA4",
    "Technical SEO",
    "International SEO",
    site.name,
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: `${site.shortName}'s Portfolio`,
    title,
    description: site.description,
    locale: "en_IN",
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: `${site.name} — ${site.role}` }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
    images: [site.ogImage],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
};

export const viewport: Viewport = {
  themeColor: "#07090F",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      alternateName: site.shortName,
      jobTitle: site.role,
      url: site.url,
      image: `${site.url}${site.heroImage}`,
      email: `mailto:${site.email}`,
      telephone: site.phone.replace(/\s/g, ""),
      knowsLanguage: site.languages,
      address: {
        "@type": "PostalAddress",
        addressLocality: site.city,
        addressRegion: site.region,
        addressCountry: "IN",
      },
      alumniOf: { "@type": "CollegeOrUniversity", name: "KSG College of Arts and Science" },
      knowsAbout: ["SEO", "Local SEO", "Technical SEO", "Google Ads", "Meta Ads", "Google Analytics 4", "Content strategy"],
      sameAs: site.socials.filter((s) => s.href.startsWith("https://") && !s.href.includes("wa.me")).map((s) => s.href),
    },
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#service`,
      name: `${site.name} — Digital Marketing`,
      url: site.url,
      image: `${site.url}${site.ogImage}`,
      email: site.email,
      telephone: site.phone.replace(/\s/g, ""),
      founder: { "@id": `${site.url}/#person` },
      areaServed: ["India", "United States"],
      address: {
        "@type": "PostalAddress",
        addressLocality: site.city,
        addressRegion: site.region,
        addressCountry: "IN",
      },
      serviceType: ["SEO", "Local SEO", "Google Ads management", "Meta Ads management", "Analytics & reporting"],
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${inter.variable} ${jetbrains.variable} ${caveat.variable} antialiased`}
    >
      <body className="min-h-screen bg-bg font-sans text-ink">
        <noscript>
          <style>{`[data-build]{opacity:1!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <a
          href="#main"
          className="sr-only z-[10000] rounded bg-lime px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
