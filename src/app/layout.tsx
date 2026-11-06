import type { Metadata, Viewport } from "next";
import { Anton, Caveat, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";
import SmoothScroll from "@/components/SmoothScroll";
import { faqs } from "@/data/faq";
import { site } from "@/data/site";
import "./globals.css";

const anton = Anton({ variable: "--font-anton", weight: "400", subsets: ["latin"], display: "swap" });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], display: "swap" });
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"], display: "swap" });

const siteName = `${site.brandName} - Digital Marketing Portfolio`;
const imageAlt = `${site.brandName} - Digital Marketing Specialist Portfolio`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.metaTitle, template: `%s | ${site.brandName}` },
  description: site.description,
  applicationName: siteName,
  authors: [{ name: site.brandName, url: site.url }],
  creator: site.brandName,
  keywords: [
    "Digital Marketing Specialist",
    "Performance Marketing Specialist",
    "SEO",
    "SMM",
    "Google Ads",
    "Meta Ads",
    "Local SEO",
    "Google Business Profile",
    "Coimbatore",
    site.brandName,
    site.name,
  ],
  alternates: { canonical: "/" },
  verification: { google: site.tracking.googleSiteVerification },
  openGraph: {
    type: "website",
    url: "/",
    siteName,
    title: site.metaTitle,
    description: site.ogDescription,
    locale: "en_US",
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: imageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.metaTitle,
    description: site.twitterDescription,
    images: [{ url: site.ogImage, alt: imageAlt }],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark",
};

const url = `${site.url}/`;
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${url}#person`,
      name: site.brandName,
      alternateName: site.name,
      url,
      image: `${site.url}${site.heroImage}`,
      jobTitle: site.role,
      description: "Digital Marketing Specialist working across SEO, Social Media Marketing, Paid Ads and Local SEO.",
      email: `mailto:${site.email}`,
      address: { "@type": "PostalAddress", addressLocality: site.city, addressRegion: site.region, addressCountry: "IN" },
      knowsLanguage: site.languages,
      knowsAbout: [
        "Search Engine Optimization",
        "Social Media Marketing",
        "Google Ads",
        "Meta Ads",
        "Local SEO",
        "Google Analytics 4",
        "Google Tag Manager",
        "Digital Marketing",
      ],
      sameAs: site.socials.filter((s) => s.href.startsWith("https://") && !s.href.includes("wa.me")).map((s) => s.href),
    },
    {
      "@type": "WebSite",
      "@id": `${url}#website`,
      url,
      name: siteName,
      description: "Digital marketing portfolio showcasing SEO, SMM, Paid Ads and Local SEO work.",
      publisher: { "@id": `${url}#person` },
    },
    {
      // built from the FAQ shown on the page, so the markup always matches the visible answers
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable} ${jetbrains.variable} ${caveat.variable} antialiased`}>
      {/* Google Tag Manager (GA4 and other tags are configured inside the GTM container) */}
      <GoogleTagManager gtmId={site.tracking.gtmId} />
      <body className="min-h-screen bg-bg font-sans text-ink">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${site.tracking.gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
          <style>{`[data-build]{opacity:1!important}`}</style>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
        <a
          href="#main"
          className="sr-only z-[10000] rounded bg-accent px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <SmoothScroll />
        {children}
        {/* Microsoft Clarity */}
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "${site.tracking.clarityId}");`}
        </Script>
      </body>
    </html>
  );
}
