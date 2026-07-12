/* -- Product & Item Types -- */
export interface FlowerProduct {
  sku: string;
  name: string;
  slug: string;
  tier: string;
  type: "indica" | "sativa" | "hybrid";
  isHot: boolean;
  isSale: boolean;
  thc: string;
  price3g: PricePoint | null;
  price5g: PricePoint | null;
  price14g: PricePoint | null;
  price28g: PricePoint | null;
  image: string;
}

export interface PricePoint {
  regular: number;
  sale: number | null;
}

export interface ItemProduct {
  sku: string;
  name: string;
  slug: string;
  category: string;
  type: string;
  thc: string;
  mg: string;
  price: string;
  image: string;
  promoImage: string | null;
}

/* ── Data imports (static fallback) ── */
import flowersJson from "./flowers.json";
import itemsJson from "./items.json";

export const allFlowers: FlowerProduct[] = flowersJson as FlowerProduct[];
export const allItems: ItemProduct[] = itemsJson as ItemProduct[];

/* ── Live stock fetch from Apps Script ── */
const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL || "";

interface LiveStockResponse {
  flowers: FlowerProduct[];
  items: ItemProduct[];
  storeCode?: string;
  stockDate?: string;
}

/**
 * Fetch live stock-filtered products from Apps Script endpoint.
 * Used at build time (getStaticProps / generateStaticParams).
 * Falls back to static JSON if endpoint not configured.
 */
export async function fetchLiveProducts(): Promise<{
  flowers: FlowerProduct[];
  items: ItemProduct[];
  isLive: boolean;
  stockDate: string | null;
}> {
  if (!APPS_SCRIPT_URL) {
    return { flowers: allFlowers, items: allItems, isLive: false, stockDate: null };
  }

  try {
    const res = await fetch(`${APPS_SCRIPT_URL}?store=BSC01`, {
      next: { revalidate: 300 }, // Cache for 5 min during build
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: LiveStockResponse = await res.json();
    return {
      flowers: data.flowers || allFlowers,
      items: data.items || allItems,
      isLive: true,
      stockDate: data.stockDate || null,
    };
  } catch (err) {
    console.warn("[products] Live fetch failed, using static data:", err);
    return { flowers: allFlowers, items: allItems, isLive: false, stockDate: null };
  }
}

export const TIER_CONFIG: Record<
  string,
  {
    name: string; slug: string; color: string; icon: string; tagline: string; banner: string;
    unitPrice: number; /* $/g */
    deal3g: { label: string; total: string; price: number } | null; /* 3g bundle pricing */
    deal6g: { label: string; total: string; price: number } | null; /* 6g bundle pricing (top 3 only) */
  }
> = {
  EXOTIC: {
    name: "Exotic",
    slug: "exotic",
    color: "#f59e0b",
    icon: "\uD83D\uDD25",
    tagline: "Ultra-rare, top-shelf genetics \u00B7 THC 35-39%",
    banner: "/banners/bsc-real/tier-exotic.webp",
    unitPrice: 20,
    deal3g: { label: "3g bundle", total: "3G", price: 40 },
    deal6g: { label: "6g bundle", total: "6G", price: 60 },
  },
  PREMIUM: {
    name: "Premium",
    slug: "premium",
    color: "#a78bfa",
    icon: "\uD83D\uDC8E",
    tagline: "Hand-picked connoisseur grade \u00B7 THC 32-34%",
    banner: "/banners/bsc-real/tier-premium.webp",
    unitPrice: 15,
    deal3g: { label: "3g bundle", total: "3G", price: 30 },
    deal6g: { label: "6g bundle", total: "6G", price: 45 },
  },
  "AAA+": {
    name: "AAA+",
    slug: "aaa",
    color: "#22d3ee",
    icon: "\u26A1",
    tagline: "Heavy hitters, proven strains \u00B7 THC 30-32%",
    banner: "/banners/bsc-real/tier-aaa.webp",
    unitPrice: 10,
    deal3g: { label: "3g bundle", total: "3G", price: 20 },
    deal6g: { label: "6g bundle", total: "6G", price: 30 },
  },
  AA: {
    name: "AA",
    slug: "aa",
    color: "#34d399",
    icon: "\u2726",
    tagline: "Quality daily drivers \u00B7 THC 27-29%",
    banner: "/banners/bsc-real/tier-aa.webp",
    unitPrice: 4,
    deal3g: null,
    deal6g: null,
  },
  BUDGET: {
    name: "Budget",
    slug: "budget",
    color: "#94a3b8",
    icon: "\uD83D\uDCB0",
    tagline: "Shreds & value OZs \u00B7 From $40/oz",
    banner: "/banners/bsc-real/tier-budget.webp",
    unitPrice: 3,
    deal3g: { label: "$10 / 3g Special", total: "3G", price: 10 },
    deal6g: null,
  },
};

/* ── Item category config ── */
export interface CategoryInfo {
  name: string; slug: string; color: string; icon: string; banner?: string;
  seoTitle: string; seoIntro: string; seoDescription: string;
  faqs: { q: string; a: string }[];
}

export const CATEGORY_CONFIG: Record<string, CategoryInfo> = {
  EDIBLES: {
    banner: "/banners/bsc-real/category-edibles.webp",
    name: "Edibles", slug: "edibles", color: "#f97316", icon: "ED",
    seoTitle: "Cannabis Edibles Brampton | Brampton Smoke Cannabis",
    seoIntro: "Browse edible options at Brampton Smoke Cannabis. Compare product names, package details, posted notes, and current menu information before choosing.",
    seoDescription: "Edibles shop best when you compare the exact listing instead of guessing from an old example. Use the current menu at Brampton Smoke Cannabis for names, package details, posted prices, and staff help when needed.",
    faqs: [
      { q: "What edibles are listed at Brampton Smoke Cannabis?", a: "Use the current menu to compare edible names, package details, prices, and item notes." },
      { q: "Should shoppers ask staff about edibles?", a: "Yes. If a package detail or menu note is unclear, ask staff before choosing." },
    ],
  },
  "VAPE PENS": {
    banner: "/banners/bsc-real/category-thc-vape.webp",
    name: "THC Vape", slug: "vapes", color: "#8b5cf6", icon: "VP",
    seoTitle: "Vapes Brampton | Brampton Smoke Cannabis",
    seoIntro: "Compare vape listings at Brampton Smoke Cannabis by product name, format, posted notes, and current menu details.",
    seoDescription: "Vape shoppers should use the current menu first, then ask staff if a cartridge, disposable, battery, or format detail needs a current answer.",
    faqs: [
      { q: "How should shoppers compare vapes?", a: "Start with the vape category, then compare product name, format, posted price, and item notes." },
      { q: "Can vape details change?", a: "Yes. Check the current menu or staff before making the trip." },
    ],
  },
  "VAPE DISPOSABLE": {
    banner: "/banners/bsc-real/category-nic-vape.webp",
    name: "Nic Vape", slug: "vape-disposables", color: "#a78bfa", icon: "VD",
    seoTitle: "Disposable Vapes Brampton | Brampton Smoke Cannabis",
    seoIntro: "Use the disposable vape category at Brampton Smoke Cannabis for current product names, formats, and menu notes.",
    seoDescription: "Disposable vape listings are easiest to compare inside their own category. Check the current menu and ask staff if a detail matters before choosing.",
    faqs: [
      { q: "Where should disposable vape shoppers start?", a: "Open the disposable vape category and compare the current listings." },
      { q: "Should shoppers confirm current options?", a: "Yes. Product names and availability can change, so confirm through the menu or staff." },
    ],
  },
  CONCENTRATES: {
    banner: "/banners/bsc-real/category-concentrates.webp",
    name: "Concentrates", slug: "concentrates", color: "#f59e0b", icon: "CN",
    seoTitle: "Concentrates Brampton | Brampton Smoke Cannabis",
    seoIntro: "Compare concentrates at Brampton Smoke Cannabis by product type, name, posted notes, and current menu details.",
    seoDescription: "Concentrate shoppers should stay inside the concentrate category first, then compare the current listing details and ask staff when a format question needs a current answer.",
    faqs: [
      { q: "How should shoppers compare concentrates?", a: "Use the concentrate category, compare current product details, and ask staff when a format note is unclear." },
      { q: "Are concentrate options always the same?", a: "No. Check the current menu before visiting." },
    ],
  },
  PREROLLS: {
    banner: "/banners/bsc-real/category-prerolls.webp", name: "Pre-Rolls", slug: "prerolls", color: "#22c55e", icon: "PR",
    seoTitle: "Pre-Rolls Brampton | Brampton Smoke Cannabis",
    seoIntro: "Shop pre-rolls at Brampton Smoke Cannabis by comparing the current product name, format, package details, and posted notes.",
    seoDescription: "Pre-rolls should be compared inside the pre-roll category instead of mixed into flower, edibles, vapes, or concentrates. Use the current menu for details that change.",
    faqs: [
      { q: "Where should pre-roll shoppers start?", a: "Open the pre-roll category and compare the current listing details." },
      { q: "Should pre-rolls be compared with flower?", a: "Keep them separate first. Pre-roll format and package details matter." },
    ],
  },
  "ADD ONS": {
    banner: "/banners/bsc-real/category-accessories.webp",
    name: "Accessories", slug: "add-ons", color: "#34d399", icon: "+",
    seoTitle: "Cannabis Accessories Brampton | Brampton Smoke Cannabis",
    seoIntro: "Browse accessories at Brampton Smoke Cannabis and compare the current menu notes before visiting.",
    seoDescription: "Accessory listings are practical add-ons for the visit. Check the current menu for what is listed and ask staff when a specific item matters.",
    faqs: [
      { q: "What accessories are listed?", a: "Use the current menu to compare accessories and item notes." },
    ],
  },
  "MAGIC & OTHERS": {
    banner: "/banners/bsc-real/category-magic.webp",
    name: "Magic Stuff", slug: "magic", color: "#64748b", icon: "*",
    seoTitle: "Specialty Items | Brampton Smoke Cannabis",
    seoIntro: "Browse specialty items only where they are listed on the current Brampton Smoke Cannabis menu.",
    seoDescription: "Specialty listings can vary. Use the current menu for what is shown at this store and ask staff before choosing.",
    faqs: [
      { q: "What specialty items are available?", a: "Selection can change. Check the current menu for this location." },
      { q: "Does availability vary?", a: "Yes. Use the current menu or staff for current details." },
    ],
  },
  CIGARETTES: {
    banner: "/banners/bsc-real/category-cigarettes.webp",
    name: "Cigarettes", slug: "cigarettes", color: "#78716c", icon: "CG",
    seoTitle: "Native Cigarettes Brampton | Brampton Smoke Cannabis",
    seoIntro: "Native smokes at Brampton Smoke Cannabis in Brampton. The cigarette menu may show $25 carton-style listings and brands such as Rolled Gold Full, Rolled Gold Lights, BB Full Carton, BB Lights Carton, Canadian Classics Original, Canadian Classics Silver, Canadian Full, Canadian Goose Full, Canadian Goose Lights, Canadian Lights, Canadian Menthol, Nexus Full, Nexus Lights, Playfare Ultra Lights, Putters, Time Full, and Time Lights.",
    seoDescription: "Use the cigarette category to compare current Native smoke listings at Brampton Smoke Cannabis. Specific brands, carton options, and prices can change, so check the current menu or ask staff before visiting.",
    faqs: [
      { q: "Does Brampton Smoke Cannabis list Native cigarettes?", a: "Check the cigarette category for current Native smoke listings and brand names." },
      { q: "What brands may be shown?", a: "The menu may show Rolled Gold Full, Rolled Gold Lights, BB Full Carton, BB Lights Carton, Canadian Classics Original, Canadian Classics Silver, Canadian Full, Canadian Goose Full, Canadian Goose Lights, Canadian Lights, Canadian Menthol, Nexus Full, Nexus Lights, Playfare Ultra Lights, Putters, Time Full, and Time Lights. Confirm current options before visiting." },
      { q: "Are $25 cartons guaranteed?", a: "No. Where $25 carton-style listings are shown, confirm current price and availability through the menu or staff." },
    ],
  },
};

/* ── Helper functions ── */
export function getFlowersByTier(tier: string): FlowerProduct[] {
  return allFlowers.filter(
    (f) => f.tier.toUpperCase() === tier.toUpperCase()
  );
}

export function getFlowerBySlug(slug: string): FlowerProduct | undefined {
  return allFlowers.find((f) => f.slug === slug);
}

export function getItemsByCategory(category: string): ItemProduct[] {
  return allItems.filter(
    (i) => i.category.toUpperCase() === category.toUpperCase()
  );
}

export function getTierFromSlug(
  slug: string
): { key: string; config: (typeof TIER_CONFIG)[string] } | undefined {
  const entry = Object.entries(TIER_CONFIG).find(
    ([, v]) => v.slug === slug
  );
  if (!entry) return undefined;
  return { key: entry[0], config: entry[1] };
}

export function getCategoryFromSlug(
  slug: string
): { key: string; config: (typeof CATEGORY_CONFIG)[string] } | undefined {
  const entry = Object.entries(CATEGORY_CONFIG).find(
    ([, v]) => v.slug === slug
  );
  if (!entry) return undefined;
  return { key: entry[0], config: entry[1] };
}

export function getLowestPrice(flower: FlowerProduct): number | null {
  const prices = [flower.price3g, flower.price5g, flower.price14g, flower.price28g]
    .filter((p): p is PricePoint => p !== null)
    .map((p) => p.sale ?? p.regular);
  return prices.length ? Math.min(...prices) : null;
}

export function formatPrice(p: PricePoint | null): string {
  if (!p) return "—";
  if (p.sale !== null) return `$${p.sale}`;
  return `$${p.regular}`;
}
