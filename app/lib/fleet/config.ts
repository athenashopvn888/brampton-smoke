import type { Nap, ResolvedBanner, ResolvedPage } from "./types.ts";

/**
 * The only store-specific fleet file. Other stores replace this module
 * and leave the rest of app/lib/fleet and app/components/fleet as-is.
 * Coded NAP matches app/lib/storeSeo.ts and the contact page. Do not change those values.
 */
export const FLEET_STORE_CODE = "BSC01";
export const FLEET_STORE_NAME = "Brampton Smoke Cannabis";
export const FLEET_AREA = "Brampton";
export const FLEET_DOMAIN = "www.bramptonsmokecannabis.com";
export const FLEET_DOMAINS = ["www.bramptonsmokecannabis.com", "bramptonsmokecannabis.com"] as const;
export const FLEET_ORIGIN = "https://www.bramptonsmokecannabis.com";

/** Public blob origin. Objects live at /{storeCode}/manifest.json and /{storeCode}/articles/. */
export const FLEET_BLOB_ORIGIN = "https://dhaah0upvlpukv56.public.blob.vercel-storage.com";

export const FLEET_COLORS = {
  banner: "#111827",
  bannerText: "#ffffff",
} as const;

/** Digits or formatted numbers. An article containing any of these is dropped. */
export const FLEET_BLOCKED_PHONES: readonly string[] = [];

export const FLEET_ARTICLES_PATH = "/articles";

/** Page and spot names for the six TV2 category cards. Spot is the card name. */
export const TV2_PAGE = "TV2";
export const TV2_CARDS = [
  "PREROLLS_ADDONS",
  "VAPES",
  "EDIBLES",
  "CONCENTRATES",
  "CIGARETTES",
  "MAGIC",
] as const;

export const TV_PAGE = "TV";
export const TV_FULLSCREEN_SPOTS = [
  "Fullscreen promo 1",
  "Fullscreen promo 2",
  "Fullscreen promo 3",
] as const;

/** Fort York Cannabis takeover defaults: 5s on screen, once a minute, 5s first preview, 650ms slide. */
export const TV_PROMO_SHOW_SECONDS = 5;
export const TV_PROMO_EVERY_MINUTES = 1;
export const TV_PROMO_INITIAL_DELAY_MS = 5_000;
export const TV_PROMO_SLIDE_MS = 650;

export function defaultManifestUrl(storeCode = FLEET_STORE_CODE): string {
  return `${FLEET_BLOB_ORIGIN}/${storeCode}/manifest.json`;
}

export function articlesIndexUrl(storeCode = FLEET_STORE_CODE): string {
  return `${FLEET_BLOB_ORIGIN}/${storeCode}/articles/index.json`;
}

export function articleBodyUrl(slug: string, storeCode = FLEET_STORE_CODE): string {
  return `${FLEET_BLOB_ORIGIN}/${storeCode}/articles/${encodeURIComponent(slug)}.json`;
}

export const CODED_NAP: Nap = {
  name: "Brampton Smoke Cannabis",
  street: "132 Falby Rd Unit B",
  city: "Brampton",
  province: "ON",
  postalCode: "L6P 4L9",
  cityLine: "Brampton, ON L6P 4L9",
  area: "Brampton",
  intersection: "Falby Rd & Steeles Ave E",
  areaLine: "Falby Rd & Steeles Ave E, Brampton",
  phoneDisplay: "+1 (289) 819-5009",
  phoneTel: "+12898195009",
  hours: "Open 24 Hours",
  mapsSearchUrl: "https://www.google.com/maps/search/?api=1&query=132%20Falby%20Rd%20Unit%20B%2C%20Brampton%2C%20ON%20L6P%204L9",
  mapsEmbedUrl: "https://maps.google.com/maps?q=132%20Falby%20Rd%20Unit%20B%2C%20Brampton%2C%20ON%20L6P%204L9&hl=en&z=16&output=embed",
  lat: "43.7724674",
  lng: "-79.6563479",
  schemaName: "Brampton Smoke Cannabis Dispensary Weed Delivery",
  website: "https://www.bramptonsmokecannabis.com/",
};

export const CODED_BANNERS: ResolvedBanner[] = [
  {
    id: "weed",
    page: "Home",
    spot: "Top banner",
    href: "/exotic-weed",
    categoryName: "Exotic Weed",
    hidden: false,
    render: "image",
    image: "/banners/top-weed-tier-bsc01.webp",
    codedImage: "/banners/top-weed-tier-bsc01.webp",
    alt: `${FLEET_STORE_NAME} in Falby Road, Brampton — Exotic, Premium and AAA+ top weed tiers`,
    title: `${FLEET_STORE_NAME} top weed tiers — Exotic, Premium and AAA+`,
    textBar: "Buy 2g Get 1g FREE · Buy 3g Get 3g FREE · Shop weed tiers",
    caption: "Buy 2g Get 1g FREE · Buy 3g Get 3g FREE · Shop weed tiers",
  },
  {
    id: "vapes",
    page: "Home",
    spot: "Promo banner 2",
    href: "/items/vapes",
    categoryName: "Nicotine Vapes",
    hidden: false,
    render: "image",
    image: "/banners/core-vapes-nicotine-thc.webp",
    codedImage: "/banners/core-vapes-nicotine-thc.webp",
    alt: `${FLEET_STORE_NAME} in Falby Road, Brampton — nicotine vapes and THC vapes`,
    title: `${FLEET_STORE_NAME} nicotine vapes and THC vapes`,
    textBar: "Nicotine vapes + THC vapes · Shop vapes",
    caption: "Nicotine vapes + THC vapes · Shop vapes",
  },
  {
    id: "cigarettes",
    page: "Home",
    spot: "Promo banner 3",
    href: "/items/cigarettes",
    categoryName: "Cigarettes",
    hidden: false,
    render: "image",
    image: "/banners/native-cigarette-offer-20260822.webp",
    codedImage: "/banners/native-cigarette-offer-20260822.webp",
    alt: `${FLEET_STORE_NAME} in Falby Road, Brampton — 2 packs for $5 mix and match and $25 carton cigarette offer`,
    title: `${FLEET_STORE_NAME} cigarette offer — 2 packs $5 mix and match, $25 carton`,
    textBar: "2 packs $5 mix & match · $25 carton · Shop cigarettes",
    caption: "2 packs $5 mix & match · $25 carton · Shop cigarettes",
  },
  {
    id: "premium-cigarettes",
    page: "Home",
    spot: "Promo banner 4",
    href: "/items/cigarettes",
    categoryName: "Premium Cigarettes",
    hidden: false,
    render: "image",
    image: "/banners/core-premium-bb-marlboro-belmont.webp",
    codedImage: "/banners/core-premium-bb-marlboro-belmont.webp",
    alt: `${FLEET_STORE_NAME} in Falby Road, Brampton — BB Full Flavor and Lights 2 packs for $5, Marlboro and Belmont $10 per pack`,
    title: `${FLEET_STORE_NAME} premium cigarettes — BB 2 packs $5, Marlboro and Belmont $10 per pack`,
    textBar: "BB Full Flavor + Lights — 2 packs $5 · Marlboro & Belmont — $10/pack · Shop cigarettes",
    caption: "BB Full Flavor + Lights — 2 packs $5 · Marlboro & Belmont — $10/pack · Shop cigarettes",
  },
];

export const CODED_PAGES: Record<string, ResolvedPage> = {
  Home: {
    description: "Brampton Smoke Cannabis is the east Brampton walk-in shop at 132 Falby Rd Unit B, with flower, pre-rolls, vapes, edibles, concentrates, accessories, and adult 19+ info. Open 24 Hours.",
    metaTitle: "",
    metaDescription: "Brampton Smoke Cannabis is the east Brampton walk-in shop at 132 Falby Rd Unit B, with flower, pre-rolls, vapes, edibles, concentrates, accessories, and adult 19+ info. Open 24 Hours.",
  },
  Contact: {
    description: "Visit Brampton Smoke Cannabis at 132 Falby Rd Unit B, Brampton, ON L6P 4L9. Open 24 hours, 7 days a week. Walk-ins welcome.",
    metaTitle: "Contact Us — Brampton Smoke Cannabis | 132 Falby Rd Unit B, Brampton",
    metaDescription: "Visit Brampton Smoke Cannabis at 132 Falby Rd Unit B, Brampton, ON L6P 4L9. Open 24 hours, 7 days a week. Walk-ins welcome.",
  },
};
