import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Inter, Montserrat, Outfit } from "next/font/google";
import "./globals.css";
import AgeGate from "./components/AgeGate";
import { cannabisStoreJsonLd } from "./lib/storeSeo";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], display: "swap", variable: "--font-montserrat" });
const outfit = Outfit({ subsets: ["latin"], display: "swap", variable: "--font-outfit" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bramptonsmokecannabis.com"),
  title: {
    default: "East Brampton Dispensary on Falby Rd Unit B | Brampton Smoke Cannabis",
    template: "%s | Brampton Smoke Cannabis",
  },
  description:
    "Brampton Smoke Cannabis is the east Brampton walk-in shop at 132 Falby Rd Unit B, with flower, pre-rolls, vapes, edibles, concentrates, accessories, and adult 19+ info. Open 24 Hours.",
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
    "weed store near Brampton",
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://www.bramptonsmokecannabis.com",
    siteName: "Brampton Smoke Cannabis",
    title: "East Brampton Dispensary on Falby Rd Unit B | Brampton Smoke Cannabis",
    description:
      "Brampton Smoke Cannabis is the east Brampton walk-in shop at 132 Falby Rd Unit B, with flower, pre-rolls, vapes, edibles, concentrates, accessories, and adult 19+ info. Open 24 Hours.",
    images: [
      {
        url: "https://www.bramptonsmokecannabis.com/wp-content/uploads/2026/04/46Oi5.jpg",
        width: 1200,
        height: 630,
        alt: "Brampton Smoke Cannabis — Premium Cannabis Dispensary Brampton",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "East Brampton Dispensary on Falby Rd Unit B | Brampton Smoke Cannabis",
    description: "Brampton Smoke Cannabis is the east Brampton walk-in shop at 132 Falby Rd Unit B, with flower, pre-rolls, vapes, edibles, concentrates, accessories, and adult 19+ info. Open 24 Hours.",
    images: ["https://www.bramptonsmokecannabis.com/wp-content/uploads/2026/04/46Oi5.jpg"],
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
    canonical: "https://www.bramptonsmokecannabis.com",
  },
  verification: {
    // google: "your-google-verification-code",
  },
};

/* CannabisStore JSON-LD is defined in storeSeo so homepage, /visit and layout share one entity. */

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
        <meta name="geo.position" content="43.7724674;-79.6563479" />
        <meta name="ICBM" content="43.7724674, -79.6563479" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(cannabisStoreJsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${montserrat.variable} ${outfit.variable}`}>
        <Link className="deliveryAnnouncement" href="/weed-delivery-brampton">
          NEW WEED DELIVERY MENU IS HERE — CLICK TO EXPLORE
        </Link>
        {children}
        <AgeGate />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-K4JG1583SJ" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-K4JG1583SJ');`}
        </Script>
      </body>
    </html>
  );
}
