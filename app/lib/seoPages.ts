const NICOTINE_VAPE_HERO_PRODUCTS = [
  { name: "Geek Promax 5% — 30K Puffs", image: "https://pub-eb3e1fe18a43477eabc885cfb791d97c.r2.dev/products/GEEK-PROMAX.jpg", sourceSlug: "geek-promax-5-30k-puffs" },
  { name: "Geek Universe — 25K Puffs", image: "https://pub-eb3e1fe18a43477eabc885cfb791d97c.r2.dev/products/geek_universe_pulse_x_25k.webp", sourceSlug: "geek-universe-25k-puffs" },
  { name: "Level X G2 Pod", image: "https://pub-eb3e1fe18a43477eabc885cfb791d97c.r2.dev/products/1086-Level-X-G2-pod.webp", sourceSlug: "level-x-g2-pod" },
  { name: "NEXA PIX — 30K Puffs — Many Flavors", image: "https://pub-eb3e1fe18a43477eabc885cfb791d97c.r2.dev/products/nexa_showcase_600x600.webp", sourceSlug: "nexa-pix-30k-puffs-many-flavors" },
  { name: "OVNS 10000 5% — 10K Puffs", image: "https://pub-eb3e1fe18a43477eabc885cfb791d97c.r2.dev/products/1081OVNS10000.jpg", sourceSlug: "ovns-10000-5-10k-puffs" },
  { name: "OVNS Disposable 5% — 8 mL — Many Flavors", image: "https://pub-eb3e1fe18a43477eabc885cfb791d97c.r2.dev/products/OVNS500x500HQ.webp", sourceSlug: "ovns-disposable-5-8ml-many-flavors" },
] as const;

export interface SeoPageData {
  slug: string;
  title: string;
  absoluteTitle?: boolean;
  metaDescription: string;
  h1: string;
  icon: string;
  heroTagline: string;
  publicationStatus?: "draft" | "approved";
  heroPreview?: {
    eyebrow: string;
    intro: string;
    products: readonly { name: string; image: string; sourceSlug?: string }[];
    disclosure: string;
    menuHref: string;
    primaryLabel: string;
    secondaryLabel: string;
    secondaryHref?: string;
    theme: "nicotine";
    identityStrip?: string;
    featuredHeading?: string;
    featuredIntro?: string;
  };
  banner?: string;
  sections: { heading: string; body: string }[];
  faqs: { q: string; a: string }[];
  warning?: string;
}

export const SEO_PAGES: SeoPageData[] = [
  {
    "slug": "brampton-weed-dispensary",
    "title": "Brampton Smoke Cannabis Weed Dispensary in Brampton",
    "metaDescription": "Brampton Smoke Cannabis is a weed dispensary in Brampton with flower, pre-rolls, edibles, THC vapes, concentrates, accessories, and shopper resources.",
    "h1": "Brampton Smoke Cannabis Weed Dispensary in Brampton",
    "icon": "*",
    "heroTagline": "Menu shopping around Brampton",
    "banner": "/banners/bsc-real/page-brampton.webp",
    "sections": [
      {
        "heading": "Shop Brampton Smoke Cannabis With A Plan",
        "body": "Brampton Smoke Cannabis lists flower, pre-rolls, edibles, THC vapes, concentrates, accessories and cigarettes with current product and price details."
      },
      {
        "heading": "Local Menu Notes For Brampton",
        "body": "If you searched for a weed dispensary in Brampton or a cannabis dispensary in Brampton, use this page to get oriented. Brampton is the local cue, but the current menu and staff are the right place for details that change."
      },
      {
        "heading": "What To Check Before Visiting",
        "body": "Confirm the address, directions and listed hours before visiting. Current listings provide product names, prices and package details, and staff can help with questions."
      }
    ],
    "faqs": [
      {
        "q": "Is Brampton Smoke Cannabis a cannabis dispensary in Brampton?",
        "a": "Yes. Brampton Smoke Cannabis serves shoppers looking for a cannabis dispensary in Brampton. Use the store page for directions, local visit details, and listed hours."
      },
      {
        "q": "What should I check before visiting Brampton Smoke Cannabis?",
        "a": "Check the current product names, formats, prices and package details, then confirm directions and listed hours."
      },
      {
        "q": "Does Brampton Smoke Cannabis carry flower and pre-rolls?",
        "a": "The site has menu categories for flower tiers and pre-rolls. Check the current menu or ask staff for current details."
      }
    ]
  },
  {
    "slug": "cheap-weed-brampton",
    "title": "Brampton Smoke Cannabis Cheap Weed and Budget Weed Guide",
    "metaDescription": "A value-minded Brampton Smoke Cannabis guide for cheap weed, budget weed, affordable weed, and flower tier shopping in Brampton.",
    "h1": "Brampton Smoke Cannabis Cheap Weed and Budget Weed Guide",
    "icon": "$",
    "heroTagline": "Value shopping without the guesswork",
    "banner": "/banners/bsc-real/page-budget.webp",
    "sections": [
      {
        "heading": "Start With Budget And AA",
        "body": "If cheap weed or affordable weed is the mission, start with the Budget and AA flower lanes before jumping around the rest of the menu. That keeps the comparison clean."
      },
      {
        "heading": "Compare The Current Menu",
        "body": "Look at product name, format, weight, posted price, and item notes. Menus change, so use this page for the shopping method and the live menu or staff for current details."
      },
      {
        "heading": "Know When To Move Up",
        "body": "If Budget or AA does not fit the visit, compare AAA+, Premium, or Exotic flower next. A better tier choice starts with the category, then the current product details."
      }
    ],
    "faqs": [
      {
        "q": "Where should value shoppers start at Brampton Smoke Cannabis?",
        "a": "Start with Budget and AA flower, then compare current menu details before choosing."
      },
      {
        "q": "Does affordable weed mean guessing?",
        "a": "No. Compare the category, product name, format, size, posted price, and item notes. Ask staff if anything is unclear."
      },
      {
        "q": "Where can shoppers confirm current prices?",
        "a": "Use the current menu or ask staff for the prices and item details currently listed."
      }
    ]
  },
  {
    "slug": "native-cigarettes-brampton",
    "title": "Brampton Smoke Cannabis Native Cigarettes Resource",
    "metaDescription": "Brampton Smoke Cannabis Native cigarettes resource with brand names shown on the menu and $25 carton notes where listed.",
    "h1": "Brampton Smoke Cannabis Native Cigarettes Resource",
    "icon": "#",
    "heroTagline": "$25 carton notes and brand names where listed",
    "banner": "/banners/bsc-real/page-cigarettes.webp",
    "sections": [
      {
        "heading": "Native Cigarette Brands And Prices",
        "body": "The cigarette menu may show carton-style Native smoke options around $25, with brand names such as Rolled Gold Full, Rolled Gold Lights, BB Full Carton, BB Lights Carton, Canadian Classics Original, Canadian Classics Silver, Canadian Full, Canadian Goose Full, Canadian Goose Lights, Canadian Lights, Canadian Menthol, Nexus Full, Nexus Lights, Playfare Ultra Lights, Putters, Time Full, and Time Lights. Check the current menu or ask staff before making the trip."
      },
      {
        "heading": "Keep Cannabis And Smokes Separate",
        "body": "If you are also shopping flower, pre-rolls, edibles, THC vapes, or concentrates, compare those categories separately. It keeps the visit cleaner."
      },
      {
        "heading": "Confirm What Matters Today",
        "body": "Specific brands, carton options, and prices can change. Use this resource for the shopping path, then confirm current details with the menu or staff."
      }
    ],
    "faqs": [
      {
        "q": "Does Brampton Smoke Cannabis list Native cigarette options?",
        "a": "The menu may show Native smoke brands such as Rolled Gold Full, Rolled Gold Lights, BB Full Carton, BB Lights Carton, Canadian Classics Original, Canadian Classics Silver, Canadian Full, Canadian Goose Full, Canadian Goose Lights, Canadian Lights, Canadian Menthol, Nexus Full, Nexus Lights, Playfare Ultra Lights, Putters, Time Full, and Time Lights. Confirm current options before visiting."
      },
      {
        "q": "Are $25 cartons guaranteed?",
        "a": "$25 carton-style options include the listed price and package details when they are part of the current selection."
      },
      {
        "q": "Where should shoppers start?",
        "a": "Brampton Smoke Cannabis is at 132 Falby Rd Unit B, with directions and listed hours available on the store site."
      }
    ]
  },
  {
    "slug": "weed-store-near-brampton",
    "title": "Weed Store Near Brampton | Brampton Smoke Cannabis",
    "metaDescription": "Looking for a weed store near Brampton? Use Brampton Smoke Cannabis for store-page checks, menu categories, and local visit planning in Brampton.",
    "h1": "Weed Store Near Brampton",
    "icon": ">",
    "heroTagline": "Local visit notes for Brampton",
    "banner": "/banners/bsc-real/page-near-me.webp",
    "sections": [
      {
        "heading": "Confirm The Right Store Page",
        "body": "Open the Brampton Smoke Cannabis store page first. Confirm directions, local visit details, listed hours, and the menu category before visiting."
      },
      {
        "heading": "Flower, Vapes, Edibles And More",
        "body": "Compare current flower, pre-roll, edible, THC vape, concentrate and accessory details before visiting."
      },
      {
        "heading": "Use Staff For The Close Call",
        "body": "If one detail decides the visit, ask staff. That is the cleanest way to handle current product questions."
      }
    ],
    "faqs": [
      {
        "q": "What is the best first step for a Brampton visit?",
        "a": "Check the current selection, address, directions and listed hours before visiting Brampton Smoke Cannabis."
      },
      {
        "q": "Should shoppers rely on old blog prices?",
        "a": "No. Use the current menu or staff for details that change."
      },
      {
        "q": "What categories can shoppers compare?",
        "a": "Use the menu categories for flower, pre-rolls, edibles, THC vapes, concentrates, accessories, and cigarettes where listed."
      }
    ]
  },
  {
    "slug": "dispensary-near-me-brampton",
    "title": "Cannabis Dispensary Near Me in Brampton | Brampton Smoke Cannabis",
    "metaDescription": "Use Brampton Smoke Cannabis when searching for a cannabis dispensary near me in Brampton; compare menu categories and confirm current details before visiting.",
    "h1": "Cannabis Dispensary Near Me in Brampton",
    "icon": "o",
    "heroTagline": "Store page first, menu category second",
    "banner": "/banners/bsc-real/page-near-me.webp",
    "sections": [
      {
        "heading": "Make The Search Useful",
        "body": "Start with the Brampton Smoke Cannabis store page for visit information, then move into the menu category or resource that matches the trip."
      },
      {
        "heading": "Compare Categories Naturally",
        "body": "Use normal shopping language: cannabis dispensary in Brampton, weed dispensary in Brampton, cheap weed, budget weed, premium flower, pre-rolls, edibles, THC vapes, and concentrates. The point is to help the shopper, not stuff a sentence."
      },
      {
        "heading": "Check Current Details",
        "body": "For current product names, prices, and package details, use the menu or ask staff. This page is for orientation and visit planning."
      }
    ],
    "faqs": [
      {
        "q": "Is Brampton Smoke Cannabis useful for a near-me cannabis search?",
        "a": "Yes. Use the store page to confirm Brampton Smoke Cannabis, then open the menu category that matches your visit."
      },
      {
        "q": "Can shoppers browse before visiting?",
        "a": "Yes. Use the current menu and resources section before heading over."
      },
      {
        "q": "What should shoppers avoid?",
        "a": "Avoid guessing from old examples. Confirm current details with the menu or staff."
      }
    ]
  },
  {
    slug: "nicotine-vapes-brampton",
    title: "Brampton Nicotine Vapes | Brampton Smoke Cannabis",
    absoluteTitle: true,
    metaDescription: "Adults 19+: review six verified nicotine vape product pages from Brampton Smoke Cannabis, then check /items/vapes for the current selection. Nicotine is addictive.",
    h1: "A Brampton Guide to Nicotine Vapes",
    icon: "NV",
    heroTagline: "Adults 19+ · Nicotine is addictive.",
    publicationStatus: "approved",
    heroPreview: {
      eyebrow: "BRAMPTON SMOKE CANNABIS • BRAMPTON • ADULTS 19+",
      intro: "Brampton Smoke Cannabis has six verified VAPE PENS product pages for this adult-only Brampton guide. If you are searching for nicotine vapes near me, use the featured cards to compare exact product details, then open /items/vapes for the current nicotine vape selection. Product information can change. Nicotine is addictive.",
      products: NICOTINE_VAPE_HERO_PRODUCTS,
      disclosure: "These cards do not guarantee current price, stock or availability.",
      menuHref: "/items/vapes",
      primaryLabel: "Browse Nicotine Vapes",
      secondaryLabel: "Compare the Six Featured Items",
      secondaryHref: "#featured-vapes",
      theme: "nicotine",
      identityStrip: "Brampton Smoke Cannabis | Brampton | Adults 19+ | Nicotine is addictive.",
      featuredHeading: "Six Verified Cards, One Current Category",
      featuredIntro: "The featured set combines Geek and NEXA product pages with a Level X G2 Pod and two OVNS listings, including an explicitly identified OVNS disposable. Use /items/vapes as the current source if the selection changes. These cards do not guarantee current price, stock or availability.",
    },
    sections: [
      { heading: "A Format Mix Worth Reading Carefully", body: "One verified page identifies a Level X G2 Pod, while another explicitly identifies an OVNS disposable format. Keep those descriptions attached to their respective products. Do not apply the pod or disposable label to another featured item unless its current product page verifies that format." },
      { heading: "Puff Counts Identify Listings, Not Results", body: "Several verified product names include puff counts. Those numbers can help adults distinguish one listing from another, but this page does not present them as guarantees of lifespan, performance or superiority. Check the individual product page for its exact supported details." },
      { heading: "Keep Nicotine and Cannabis Vape Routes Separate", body: "Brampton Smoke Cannabis’s nicotine vape shop guide uses products from the VAPE PENS category under /items/vapes. The separate /items/vape-disposables route is for THC or cannabis vape products and must not be included on this nicotine page." },
      { heading: "Visit Brampton Smoke Cannabis in Brampton", body: "Before visiting Brampton Smoke Cannabis in Brampton, confirm the storefront’s current details and browse /items/vapes for the latest nicotine vape shop listing. No unverified address, hours, prices or guaranteed-availability statement is included here." },
    ],
    faqs: [
      { q: "Where can I check Brampton Smoke Cannabis’s current nicotine selection?", a: "Use /items/vapes. The six featured cards are verified starting points, while the current category listing should control selection information." },
      { q: "Is a disposable nicotine vape represented in the featured cards?", a: "Yes. The supplied evidence explicitly identifies OVNS Disposable 5% — 8 mL — Many Flavors. Check its current product page for any updated details." },
      { q: "Does this page include cannabis vapes?", a: "No. It covers nicotine products from the VAPE PENS category for adults 19+. THC and cannabis vape products under /items/vape-disposables are excluded." },
    ],
    warning: "Adults 19+. Nicotine is addictive.",
  }
];

export function getSeoPageBySlug(slug: string): SeoPageData | undefined {
  return SEO_PAGES.find((p) => p.slug === slug);
}
