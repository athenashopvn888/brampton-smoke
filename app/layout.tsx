import { cigaretteSafeContent } from "./lib/siteConfig";
import FleetContentProvider from "./components/fleet/FleetContentProvider";
import FullNameNap from "./components/FullNameNap";
import PinnedNavClearance from "./components/PinnedNavClearance";
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Inter, Montserrat, Outfit } from "next/font/google";
import "./globals.css";
import { CODED_BANNERS } from "./lib/fleet/config";
import { getFleetContent } from "./lib/fleetContent";
import { cannabisStoreJsonLd } from "./lib/storeSeo";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], display: "swap", variable: "--font-montserrat" });
const outfit = Outfit({ subsets: ["latin"], display: "swap", variable: "--font-outfit" });

const ROOT_METADATA: Metadata = cigaretteSafeContent({
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
});

export async function generateMetadata(): Promise<Metadata> {
  const fleet = await getFleetContent();
  if (!fleet.active) return ROOT_METADATA;
  const description = fleet.pages.Home?.metaDescription || "";
  if (!description || description === ROOT_METADATA.description) return ROOT_METADATA;
  return {
    ...ROOT_METADATA,
    description,
    openGraph: { ...ROOT_METADATA.openGraph, description },
    twitter: { ...ROOT_METADATA.twitter, description },
  };
}

/* CannabisStore JSON-LD is defined in storeSeo so homepage, /visit and layout share one entity. */

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fleet = await getFleetContent();
  const contentBanners = fleet.active && fleet.banners.some((banner, index) => banner !== CODED_BANNERS[index]) ? fleet.banners : undefined;
  const baseJsonLd = cigaretteSafeContent(cannabisStoreJsonLd);
  const storeJsonLd = fleet.active
    ? {
        ...baseJsonLd,
        name: fleet.nap.schemaName,
        telephone: fleet.nap.phoneTel,
        url: fleet.nap.website,
        hasMap: fleet.nap.mapsSearchUrl,
        address: {
          ...baseJsonLd.address,
          streetAddress: fleet.nap.street,
          addressLocality: fleet.nap.city,
          addressRegion: fleet.nap.province,
          postalCode: fleet.nap.postalCode,
        },
        geo: {
          ...baseJsonLd.geo,
          latitude: Number(fleet.nap.lat),
          longitude: Number(fleet.nap.lng),
        },
      }
    : baseJsonLd;
  return (
    <html lang="en">
      <head>
        <meta name="fleet-content-version" content={fleet.version} />
        <meta name="geo.region" content="CA-ON" />
        <meta name="geo.placename" content="Brampton" />
        <meta name="geo.position" content="43.7724674;-79.6563479" />
        <meta name="ICBM" content="43.7724674, -79.6563479" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(storeJsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${montserrat.variable} ${outfit.variable}`}>
        <Link className="deliveryAnnouncement" href="/weed-delivery-brampton">
          NEW WEED DELIVERY MENU IS HERE — CLICK TO EXPLORE
        </Link>
        {fleet.active ? (
          <FleetContentProvider value={{ active: fleet.active, version: fleet.version, nap: fleet.nap, ...(contentBanners ? { banners: contentBanners } : {}) }}>
            {children}
            <FullNameNap />
            <PinnedNavClearance />
          </FleetContentProvider>
        ) : (
          <>
            {children}
            <FullNameNap />
            <PinnedNavClearance />
          </>
        )}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-K4JG1583SJ" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-K4JG1583SJ');`}
        </Script>
      </body>
    </html>
  );
}
