import { getLiveMenu } from "./lib/liveMenu";
import type { MetadataRoute } from "next";
import { DELIVERY_GUIDE_REGISTRY } from "./lib/deliveryGuideRegistry";
import { TIER_CONFIG, CATEGORY_CONFIG } from "./lib/products";
import { SEO_PAGES } from "./lib/seoPages";
import { RESOURCE_PAGES } from "./resources/resourceData";
import { GUIDE_REGISTRY } from "./lib/guideRegistry";

// Products come from the same loader as /api/tv-data on every request.
export const dynamic = "force-dynamic";

// ONE product loader (same as /api/tv-data), filled per request by __loadMenuData(). Grok 2026-10-09.
let __menu!: Awaited<ReturnType<typeof getLiveMenu>>;
async function __loadMenuData(): Promise<void> {
  __menu = await getLiveMenu();

}

const BASE = "https://www.bramptonsmokecannabis.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    await __loadMenuData();
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/weed-dispensary-falby-road`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/24-hour-falby-road-dispensary`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/native-cigarettes-falby-road`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/nicotine-vape-falby-road`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/visit`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/weed-dispensary-brampton`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/weed-delivery-brampton`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
  { url: `${BASE}/careers/budtender`, lastModified: now, changeFrequency: "monthly", priority: 0.65 },
  ];

  /* Tier pages */
  const tierPages: MetadataRoute.Sitemap = Object.values(TIER_CONFIG).map((t) => ({
    url: `${BASE}/${t.slug}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  /* Item category pages */
  const itemPages: MetadataRoute.Sitemap = Object.values(CATEGORY_CONFIG).map((c) => ({
    url: `${BASE}/items/${c.slug}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  /* Flower detail pages */
  const flowerPages: MetadataRoute.Sitemap = __menu.flowers.map((f) => ({
    url: `${BASE}/flower/${f.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  /* Item detail pages */
  const itemDetailPages: MetadataRoute.Sitemap = __menu.items.map((i) => ({
    url: `${BASE}/item/${i.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  /* SEO landing pages */
  const seoPages: MetadataRoute.Sitemap = SEO_PAGES.map((p) => ({
    url: `${BASE}/info/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  /* Resource pages */
  const resourcePages: MetadataRoute.Sitemap = RESOURCE_PAGES.map((page) => ({
    url: page.slug ? `${BASE}/resources/${page.slug}` : `${BASE}/resources`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: page.slug ? 0.6 : 0.7,
  }));


  const guidePages: MetadataRoute.Sitemap = [...GUIDE_REGISTRY, ...DELIVERY_GUIDE_REGISTRY].map((guide) => ({
    url: `${BASE}/guides/${guide.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  const guideIndex: MetadataRoute.Sitemap = [
    { url: `${BASE}/guides`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  return [...guideIndex, ...guidePages, ...staticPages, ...tierPages, ...itemPages, ...flowerPages, ...itemDetailPages, ...resourcePages, ...seoPages];
}
