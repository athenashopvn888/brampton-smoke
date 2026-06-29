import type { Metadata } from "next";
import "./globals.css";
import AgeGate from "./components/AgeGate";

export const metadata: Metadata = {
  metadataBase: new URL("https://bramptonsmokecannabis.com"),
  title: {
    default: "24 Hour Brampton Dispensary | Brampton Smoke Cannabis",
    template: "%s | Brampton Smoke Cannabis",
  },
  description:
    "Brampton Smoke Cannabis is a Brampton dispensary on Falby Rd with flower, pre-rolls, vapes, edibles, concentrates, accessories, and adult 19+ info. Open 24 Hours.",
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
    title: "24 Hour Brampton Dispensary | Brampton Smoke Cannabis",
    description:
      "Brampton Smoke Cannabis is a Brampton dispensary on Falby Rd with flower, pre-rolls, vapes, edibles, concentrates, accessories, and adult 19+ info. Open 24 Hours.",
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
    title: "24 Hour Brampton Dispensary | Brampton Smoke Cannabis",
    description: "Brampton Smoke Cannabis is a Brampton dispensary on Falby Rd with flower, pre-rolls, vapes, edibles, concentrates, accessories, and adult 19+ info. Open 24 Hours.",
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
  areaServed: {
    "@type": "City",
    name: "Brampton",
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
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-K4JG1583SJ"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-K4JG1583SJ');
            `
          }}
        />
      </head>
      <body>
        {children}
        <AgeGate />
      </body>
    </html>
  );
}
