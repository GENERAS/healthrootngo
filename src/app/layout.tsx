import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Newsreader } from "next/font/google";

// Bootstrap 4 grid + utilities only — all visual styling is overridden by globals.css
import "../styles/bootstrap.css";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { brandAssets, site } from "@/lib/site";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-newsreader",
  style: ["normal", "italic"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "health NGO Rwanda",
    "youth health education",
    "Kigali NGO",
    "community health",
    "youth leadership Rwanda",
    "sanitation",
    "mental health awareness",
    "volunteer Rwanda",
    "Health Root NGO",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  applicationName: site.name,
  category: "Non-Profit Organisation",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [
      {
        url: brandAssets.ogCard,
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [brandAssets.ogCard],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: true, email: true, address: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0a2540" },
    { media: "(prefers-color-scheme: dark)", color: "#04101f" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: site.name,
  alternateName: "Health Root",
  slogan: site.tagline,
  description: site.description,
  url: site.url,
  logo: {
    "@type": "ImageObject",
    url: `${site.url}${brandAssets.markPng}`,
    width: 512,
    height: 512,
  },
  image: `${site.url}${brandAssets.ogCard}`,
  email: site.email,
  telephone: site.phone,
  foundingDate: String(site.founded),
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressCountry: site.address.country,
  },
  areaServed: { "@type": "Country", name: "Rwanda" },
  sameAs: site.socials.map((s) => s.href),
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: site.phone,
      contactType: "general enquiries",
      email: site.email,
      areaServed: "RW",
      availableLanguage: ["en", "rw"],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${newsreader.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>

        <Navbar />

        <main id="main">{children}</main>

        <Footer />
        <Chatbot />

        <script
          type="application/ld+json"
          // Structured data for search engines
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
