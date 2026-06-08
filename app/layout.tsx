import type { Metadata } from "next";
import "./globals.css";
import AgeGate from "./components/AgeGate";

export const metadata: Metadata = {
  metadataBase: new URL("https://bramptonsmokecannabis.com"),
  title: {
    default: "Brampton Smoke Cannabis — Premium Cannabis Dispensary, Brampton",
    template: "%s | Brampton Smoke Cannabis",
  },
  description:
    "Shop 200+ premium cannabis strains at Brampton Smoke Cannabis. Exotic, Premium, AAA+, AA & Budget flower from $3/g. Brampton's uplifting dispensary at 132 Falby Rd Unit B. Open 24 Hours.",
  keywords: [
    "cannabis dispensary Brampton",
    "weed store Brampton",
    "exotic flower Brampton",
    "premium cannabis",
    "Brampton Smoke Cannabis",
    "cheap weed Brampton",
    "dispensary near me",
    "THC flower",
    "indica sativa hybrid",
    "edibles Brampton",
    "vapes",
    "pre-rolls",
    "native cigarettes Brampton",
    "weed store Mississauga",
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://bramptonsmokecannabis.com",
    siteName: "Brampton Smoke Cannabis",
    title: "Brampton Smoke Cannabis — Premium Brampton Cannabis Dispensary",
    description:
      "200+ strains from $3/g. Exotic to Budget. Brampton's uplifting dispensary at 132 Falby Rd Unit B. Open 24 Hours.",
    images: [
      {
        url: "https://bramptonsmokecannabis.com/wp-content/uploads/2026/04/46Oi5.jpg",
        width: 1200,
        height: 630,
        alt: "Brampton Smoke Cannabis — Premium Cannabis Dispensary Brampton",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brampton Smoke Cannabis — Brampton's Uplifting Dispensary",
    description: "200+ strains from $3/g. Open 24 Hours at 132 Falby Rd Unit B, Brampton.",
    images: ["https://bramptonsmokecannabis.com/wp-content/uploads/2026/04/46Oi5.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://bramptonsmokecannabis.com",
  },
  verification: {
    // google: "your-google-verification-code",
  },
};

/* ── JSON-LD Structured Data ── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  additionalType: "https://schema.org/Store",
  "@id": "https://bramptonsmokecannabis.com",
  name: "Brampton Smoke Cannabis",
  description: "Cannabis dispensary at 132 Falby Rd Unit B in Brampton, ON. Shop exotic, premium, AAA+, AA, and budget flower tiers plus edibles, prerolls, and vapes. Open 24 Hours.",
  url: "https://bramptonsmokecannabis.com",
  telephone: "+19052267966",
  image: "https://bramptonsmokecannabis.com/wp-content/uploads/2026/04/7Clmh.jpg",
  priceRange: "$3 - $12/g",
  address: {
    "@type": "PostalAddress",
    streetAddress: "132 Falby Rd Unit B",
    addressLocality: "Brampton",
    addressRegion: "ON",
    postalCode: "L6P 4L9",
    addressCountry: "CA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 43.7915,
    longitude: -79.6432,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
  ],
  sameAs: [
    "https://maps.google.com/?q=132+Falby+Rd+Unit+B,+Brampton,+ON+L6P+4L9",
    "https://maps.google.com/?q=132+Falby+Rd+Unit+B,+Brampton,+ON+L6P+4L9",
  ],
  hasMap: "https://maps.google.com/?q=132+Falby+Rd+Unit+B,+Brampton,+ON+L6P+4L9",
  areaServed: {
    "@type": "City",
    name: "Brampton",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "15",
    bestRating: "5",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="geo.region" content="CA-ON" />
        <meta name="geo.placename" content="Brampton" />
        <meta name="geo.position" content="43.7915;-79.6432" />
        <meta name="ICBM" content="43.7915, -79.6432" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <AgeGate />
      </body>
    </html>
  );
}
