export interface ResourceCard {
  title: string;
  href: string;
  text: string;
}

export interface ResourceSection {
  heading: string;
  body: string;
  bullets?: string[];
}

export interface ResourcePage {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  eyebrow: string;
  intro: string;
  cards: ResourceCard[];
  sections: ResourceSection[];
}

const nativeCigaretteBrands = [
  "Rolled Gold Full",
  "Rolled Gold Lights",
  "BB Full Carton",
  "BB Lights Carton",
  "Canadian Classics Original",
  "Canadian Classics Silver",
  "Canadian Full",
  "Canadian Goose Full",
  "Canadian Goose Lights",
  "Canadian Lights",
  "Canadian Menthol",
  "Nexus Full",
  "Nexus Lights",
  "Playfare Ultra Lights",
  "Putters",
  "Time Full",
  "Time Lights",
];

export const RESOURCE_PAGES: ResourcePage[] = [
  {
    slug: "",
    title: "Brampton Smoke Cannabis Resources",
    seoTitle: "Brampton Smoke Cannabis Resources | Falby Road Menu Guides",
    description:
      "Brampton Smoke Cannabis resources for Falby Road shoppers, 24-hour visit planning, flower tiers, value shopping, pre-rolls, and Native smokes.",
    eyebrow: "Falby Road Resource Hub",
    intro:
      "This is the Brampton Smoke Cannabis resource hub for adult 19+ shoppers who want the Falby Road stop to feel easy. Use it to plan a 24-hour visit, choose the right menu category, compare flower tiers, and keep cigarettes or Native smokes separate from cannabis shopping.",
    cards: [
      {
        title: "Falby Road 24-Hour Visit Guide",
        href: "/resources/falby-road-24-hour-visit-guide",
        text: "Plan the Brampton Smoke stop around the 132 Falby Rd Unit B address and Open 24 Hours schedule.",
      },
      {
        title: "Menu Guide",
        href: "/resources/menu-guide",
        text: "Choose flower, pre-rolls, edibles, vapes, concentrates, cigarettes, or accessories before comparing details.",
      },
      {
        title: "Flower Guide",
        href: "/resources/flower-guide",
        text: "Use Exotic, Premium, AAA+, AA, and Budget as clean shopping lanes.",
      },
      {
        title: "Value Guide",
        href: "/resources/value-guide",
        text: "A Brampton Smoke way to compare Budget, AA, affordable weed, and quick-value flower stops.",
      },
      {
        title: "Late-Night Brampton Guide",
        href: "/resources/late-night-brampton-shopping",
        text: "A 24-hour shopping checklist for adults planning a late or early Falby Road visit.",
      },
      {
        title: "Native Smokes",
        href: "/resources/native-smokes",
        text: "Keep the cigarette lane separate with carton and brand-name notes from the store source.",
      },
    ],
    sections: [
      {
        heading: "Make The Falby Road Stop Simple",
        body:
          "Brampton Smoke Cannabis is listed at 132 Falby Rd Unit B, Brampton, ON L6P 4L9. The resource pages keep the store identity, location, 24-hour schedule, menu categories, and adult shopping notes in one place without pretending every product detail is frozen.",
        bullets: [
          "Use the current menu for listed products, prices, formats, and package details.",
          "Use the store page for address, hours, and local visit information.",
          "Use staff for details that need today's answer.",
        ],
      },
      {
        heading: "Pod 2 Role: Brampton Coverage",
        body:
          "Inside Pod 2, BSC should own the Falby Road and 24-hour Brampton planning angle. That keeps it distinct from the other Brampton-area stores in the same cluster while still supporting the map coverage plan.",
      },
    ],
  },
  {
    slug: "falby-road-24-hour-visit-guide",
    title: "Falby Road 24-Hour Visit Guide",
    seoTitle: "Falby Road 24-Hour Visit Guide | Brampton Smoke Cannabis",
    description:
      "A Brampton Smoke Cannabis visit guide for 132 Falby Rd Unit B, Open 24 Hours, with menu category and local planning notes.",
    eyebrow: "24-Hour Visit Guide",
    intro:
      "Brampton Smoke Cannabis is the Falby Road stop in Pod 2: 132 Falby Rd Unit B, Brampton, Open 24 Hours. Use this guide to keep the visit practical before you start comparing products.",
    cards: [
      {
        title: "Store Landing Page",
        href: "/weed-dispensary-brampton",
        text: "Use the store page for address, hours, and local Brampton information.",
      },
      {
        title: "Menu Guide",
        href: "/resources/menu-guide",
        text: "Choose the product category before comparing individual listings.",
      },
      {
        title: "Late-Night Brampton Guide",
        href: "/resources/late-night-brampton-shopping",
        text: "Use this when timing is the main reason for the stop.",
      },
      {
        title: "Brampton Transit and Parking",
        href: "/resources/brampton-transit-and-parking",
        text: "Local planning notes around Falby Road, Brampton, and nearby routes.",
      },
    ],
    sections: [
      {
        heading: "Start With The Practical Stuff",
        body:
          "For a Falby Road visit, start with the store page for the address and listed hours, then choose the menu category that matches the trip.",
        bullets: [
          "Address: 132 Falby Rd Unit B, Brampton, ON L6P 4L9.",
          "Hours: Open 24 Hours.",
          "Adult-use cannabis shopping is for customers 19+ with valid ID.",
        ],
      },
      {
        heading: "Keep Product Decisions Current",
        body:
          "Use this page for the visit plan, then use the current menu for listed product names, formats, prices, and package details. If the choice depends on one exact item, ask staff before choosing.",
      },
    ],
  },
  {
    slug: "menu-guide",
    title: "How To Shop The Brampton Smoke Cannabis Menu",
    seoTitle: "Brampton Smoke Cannabis Menu Guide | Falby Road Shopping Tips",
    description:
      "A BSC-specific guide to shopping the Brampton Smoke Cannabis menu by category, from flower tiers to pre-rolls, vapes, edibles, concentrates, accessories, and cigarettes.",
    eyebrow: "Menu Guide",
    intro:
      "BSC's menu gets easier when you choose one category first. Start with flower, pre-rolls, edibles, THC vapes, concentrates, accessories, or cigarettes, then compare the details inside that category.",
    cards: [
      {
        title: "Flower Guide",
        href: "/resources/flower-guide",
        text: "Use the tier ladder before comparing individual flower listings.",
      },
      {
        title: "Pre-Roll Guide",
        href: "/resources/pre-roll-guide",
        text: "Compare singles, packs, and format notes separately from flower.",
      },
      {
        title: "Value Guide",
        href: "/resources/value-guide",
        text: "Start here when budget, AA, or affordable weed is the main goal.",
      },
      {
        title: "Native Smokes",
        href: "/resources/native-smokes",
        text: "Keep cigarette and carton decisions in their own lane.",
      },
    ],
    sections: [
      {
        heading: "Pick One Category First",
        body:
          "Do not make every category fight for the same decision. Flower shoppers should compare flower tiers. Pre-roll shoppers should open pre-rolls. Vape, edible, concentrate, accessory, and cigarette shoppers should stay inside those categories until the choice is clear.",
        bullets: [
          "Flower: compare tiers first.",
          "Pre-rolls: compare format first.",
          "Edibles, vapes, and concentrates: read package and item notes carefully.",
          "Cigarettes: compare brand names and carton notes in the cigarette category.",
        ],
      },
      {
        heading: "Use The Menu For What Changes",
        body:
          "Resources explain how to shop. The current menu carries the moving details: listed product names, prices, weights, and package sizes. That split keeps BSC useful without stale claims.",
      },
    ],
  },
  {
    slug: "flower-guide",
    title: "Brampton Smoke Cannabis Flower Guide",
    seoTitle: "Brampton Smoke Cannabis Flower Guide | Exotic, Premium, AA, Budget",
    description:
      "BSC flower guide for Exotic, Premium, AAA+, AA, and Budget lanes at Brampton Smoke Cannabis on Falby Road.",
    eyebrow: "Flower Guide",
    intro:
      "BSC flower shopping works best as a tier ladder. Exotic and Premium sit higher; AAA+ gives a middle lane; AA and Budget keep the value side clean.",
    cards: [
      {
        title: "Exotic Flower",
        href: "/exotic",
        text: "Start here for the higher shelf flower lane.",
      },
      {
        title: "Premium Flower",
        href: "/premium",
        text: "A strong lane for shoppers comparing quality and value.",
      },
      {
        title: "AAA+ Flower",
        href: "/aaa",
        text: "A middle lane for shoppers who want more punch without jumping straight to Exotic.",
      },
      {
        title: "AA Flower",
        href: "/aa",
        text: "A straightforward value-minded flower lane.",
      },
      {
        title: "Budget Flower",
        href: "/budget",
        text: "Start here when cheap weed or affordable weed is the mission.",
      },
    ],
    sections: [
      {
        heading: "Use The Tier Before The Strain Name",
        body:
          "A strain name by itself does not tell the whole story. Use the BSC tier first, then compare the current product name, format, price, and item notes inside that lane.",
      },
      {
        heading: "Value Has Its Own Path",
        body:
          "If the stop is about keeping spend low, start with Budget and AA before looking higher. If the stop is about stronger shelf positioning, start with AAA+, Premium, or Exotic.",
      },
    ],
  },
  {
    slug: "value-guide",
    title: "Brampton Smoke Cannabis Value Guide",
    seoTitle: "Brampton Smoke Cannabis Value Guide | Budget Weed in Brampton",
    description:
      "A BSC value guide for budget weed, cheap weed, AA flower, and affordable cannabis shopping at Brampton Smoke Cannabis.",
    eyebrow: "Value Guide",
    intro:
      "BSC value shopping should feel quick: start in Budget or AA, compare the current details, and only move up when the extra shelf makes sense for the visit.",
    cards: [
      {
        title: "Budget Flower",
        href: "/budget",
        text: "The first stop for affordable weed comparisons.",
      },
      {
        title: "AA Flower",
        href: "/aa",
        text: "A simple value lane for flower shoppers.",
      },
      {
        title: "Menu Guide",
        href: "/resources/menu-guide",
        text: "Use this when you are comparing more than flower.",
      },
      {
        title: "Late-Night Brampton Guide",
        href: "/resources/late-night-brampton-shopping",
        text: "Helpful when timing and budget are both part of the stop.",
      },
    ],
    sections: [
      {
        heading: "Start Low, Then Step Up",
        body:
          "Budget and AA are clear value sections. If those do not fit the visit, compare AAA+ or Premium by format, size, item details, and posted price.",
      },
      {
        heading: "Do Not Guess From Old Prices",
        body:
          "Use the current BSC menu for today's listed prices and item details. A resource page can teach the shopping method, but the current menu is the reference.",
      },
    ],
  },
  {
    slug: "pre-roll-guide",
    title: "Brampton Smoke Cannabis Pre-Roll Guide",
    seoTitle: "Brampton Smoke Cannabis Pre-Roll Guide | Falby Road Menu Tips",
    description:
      "How to compare pre-rolls at Brampton Smoke Cannabis without mixing them up with flower, edibles, vapes, and concentrates.",
    eyebrow: "Pre-Roll Guide",
    intro:
      "Pre-rolls are their own lane at BSC. Compare them by format first, then use the current menu for product names, pack details, and prices.",
    cards: [
      {
        title: "Pre-Rolls",
        href: "/items/prerolls",
        text: "Open the current pre-roll category.",
      },
      {
        title: "Menu Guide",
        href: "/resources/menu-guide",
        text: "Use this if you are still choosing between categories.",
      },
      {
        title: "Flower Guide",
        href: "/resources/flower-guide",
        text: "Switch here if the visit turns into loose flower instead.",
      },
    ],
    sections: [
      {
        heading: "Compare Format Before Flavor",
        body:
          "Look for whether the listing is a single, pack, infused option, or another pre-roll format shown on the menu. Format changes the decision before the name does.",
      },
      {
        heading: "Keep It Separate From Flower",
        body:
          "If you decide you want loose flower instead, switch to the flower guide. Do not force one pre-roll comparison to carry the whole BSC menu.",
      },
    ],
  },
  {
    slug: "late-night-brampton-shopping",
    title: "Late-Night Brampton Cannabis Shopping Guide",
    seoTitle: "Late-Night Brampton Cannabis Shopping | Brampton Smoke Cannabis",
    description:
      "A late-night and early-morning shopping guide for Brampton Smoke Cannabis, Open 24 Hours at 132 Falby Rd Unit B.",
    eyebrow: "Late-Night Guide",
    intro:
      "Because BSC is Open 24 Hours, some shoppers are planning around timing first. Use this guide to keep late-night or early-morning browsing simple and focused.",
    cards: [
      {
        title: "Falby Road Visit Guide",
        href: "/resources/falby-road-24-hour-visit-guide",
        text: "Start with address, hours, and the practical visit path.",
      },
      {
        title: "Value Guide",
        href: "/resources/value-guide",
        text: "Use Budget and AA when the stop needs to stay lean.",
      },
      {
        title: "Menu Guide",
        href: "/resources/menu-guide",
        text: "Pick one category before comparing listings.",
      },
    ],
    sections: [
      {
        heading: "Know The Mission Before You Browse",
        body:
          "Choose flower, pre-rolls, edibles, vapes, concentrates, accessories, or cigarettes first, then compare the details inside that category.",
      },
      {
        heading: "Use Staff For Final Details",
        body:
          "If timing is tight or one product matters, use the current menu and staff for the freshest answer. That is more reliable than stretching old content into a live inventory claim.",
      },
    ],
  },
  {
    slug: "brampton-transit-and-parking",
    title: "Brampton Smoke Cannabis Transit and Parking Notes",
    seoTitle: "Brampton Smoke Cannabis Transit and Parking | Falby Road Visit",
    description:
      "Local visit planning notes for Brampton Smoke Cannabis at 132 Falby Rd Unit B, including Brampton Transit, nearby roads, and plaza parking context.",
    eyebrow: "Visit Notes",
    intro:
      "This page keeps the BSC visit grounded in real local context: Falby Road, Brampton, nearby Steeles Avenue routes, and plaza-style parking notes already used on the store page.",
    cards: [
      {
        title: "Store Landing Page",
        href: "/weed-dispensary-brampton",
        text: "Use the store page for the address and contact details.",
      },
      {
        title: "Falby Road 24-Hour Visit Guide",
        href: "/resources/falby-road-24-hour-visit-guide",
        text: "Plan the stop around the 24-hour BSC schedule.",
      },
      {
        title: "Menu Guide",
        href: "/resources/menu-guide",
        text: "Choose the product category before visiting.",
      },
    ],
    sections: [
      {
        heading: "Local Planning Context",
        body:
          "BSC sits at 132 Falby Rd Unit B in Brampton. Store copy already notes Brampton Transit access through nearby Steeles Avenue and local Brampton communities, with parking available on-site in the retail plaza lot.",
      },
      {
        heading: "Keep Directions Separate From Product Choice",
        body:
          "Use this page for the trip plan, then use product categories for the menu decision. Mixing directions, hours, and product comparisons into one decision makes the stop feel harder than it is.",
      },
    ],
  },
  {
    slug: "resource-centre-launch",
    title: "Brampton Smoke Cannabis Resource Centre Launch",
    seoTitle: "Brampton Smoke Cannabis Resource Centre Launch | BSC Falby Road",
    description:
      "The Brampton Smoke Cannabis resource section now gives BSC-specific guides for Falby Road, 24-hour visits, flower, value, pre-rolls, and Native smokes.",
    eyebrow: "Resource Update",
    intro:
      "The BSC resource centre is now shaped around the store's actual role in Pod 2: Falby Road, 24-hour Brampton coverage, simple menu categories, and cigarette/native-smokes notes.",
    cards: [
      {
        title: "Falby Road 24-Hour Visit Guide",
        href: "/resources/falby-road-24-hour-visit-guide",
        text: "The main BSC local resource page.",
      },
      {
        title: "Menu Guide",
        href: "/resources/menu-guide",
        text: "Pick the category first, then compare the details that matter.",
      },
      {
        title: "Flower Guide",
        href: "/resources/flower-guide",
        text: "Compare Exotic, Premium, AAA+, AA, and Budget with clearer category notes.",
      },
      {
        title: "Native Smokes",
        href: "/resources/native-smokes",
        text: "Brand names and carton notes for the cigarette menu where listed.",
      },
    ],
    sections: [
      {
        heading: "What Changed",
        body:
          "The resource section now gives Brampton Smoke Cannabis its own voice: practical, 24-hour, Falby Road focused, and built around real shopping lanes rather than generic store-template copy.",
      },
      {
        heading: "How To Use It",
        body:
          "Start with the guide that matches the visit, then open the current menu or store page when you are ready to compare details.",
      },
    ],
  },
  {
    slug: "native-smokes",
    title: "Brampton Smoke Cannabis Native Smokes Resource",
    seoTitle: "Brampton Smoke Cannabis Native Smokes | Brampton Cigarette Guide",
    description:
      "BSC Native smokes resource with cigarette brand names shown in the store source file and carton notes where listed.",
    eyebrow: "Native Smokes",
    intro:
      `BSC shoppers looking for Native smokes can use this page as a clean starting point. The store source currently includes these cigarette lines: ${nativeCigaretteBrands.join(", ")}. Use the current cigarette category or staff for today's details.`,
    cards: [
      {
        title: "Cigarette Menu",
        href: "/items/cigarettes",
        text: "Open the current cigarette category before making the trip.",
      },
      {
        title: "Native Cigarettes Guide",
        href: "/resources/native-smokes/native-cigarettes-guide",
        text: "Brand notes and a cleaner shopping checklist.",
      },
      {
        title: "Falby Road Visit Guide",
        href: "/resources/falby-road-24-hour-visit-guide",
        text: "Use the store page path for address and 24-hour planning.",
      },
    ],
    sections: [
      {
        heading: "Brand Names Shown In The Store Source",
        body:
          `The cigarette menu source currently lists these lines: ${nativeCigaretteBrands.join(", ")}. Treat this as a shopping guide and confirm current options before choosing.`,
        bullets: nativeCigaretteBrands,
      },
      {
        heading: "Keep Cigarettes Separate From Cannabis",
        body:
          "If you are also shopping flower, pre-rolls, edibles, THC vapes, or concentrates, finish the cigarette decision separately. One lane at a time keeps the BSC visit smooth.",
      },
    ],
  },
  {
    slug: "native-smokes/native-cigarettes-guide",
    title: "Brampton Smoke Cannabis Native Cigarettes Guide",
    seoTitle: "Brampton Smoke Cannabis Native Cigarettes Guide | Brands and Cartons",
    description:
      "A shopper-friendly Native cigarettes guide for Brampton Smoke Cannabis, including brand names shown in the BSC store source file.",
    eyebrow: "Native Cigarettes Guide",
    intro:
      "If Native cigarettes are part of the Falby Road stop, start with the cigarette category and compare the current listings. This guide keeps brand names, carton-style choices, and shopping steps in one place.",
    cards: [
      {
        title: "Cigarette Menu",
        href: "/items/cigarettes",
        text: "Open the current cigarette category before making the trip.",
      },
      {
        title: "Native Smokes",
        href: "/resources/native-smokes",
        text: "Return to the BSC Native smokes overview.",
      },
      {
        title: "Late-Night Brampton Guide",
        href: "/resources/late-night-brampton-shopping",
        text: "Helpful when cigarettes are part of a late or early stop.",
      },
    ],
    sections: [
      {
        heading: "Compare Brand, Style, Then Carton Notes",
        body:
          `Look for the brand name first, then compare full, lights, menthol, carton, and posted item notes. The store source currently includes ${nativeCigaretteBrands.join(", ")}.`,
        bullets: nativeCigaretteBrands,
      },
      {
        heading: "Ask When One Exact Option Matters",
        body:
          "When a specific carton, full, light, or menthol option matters, ask staff before choosing. That is better than guessing from any resource page.",
      },
    ],
  },
];

export const RESOURCE_HOME = RESOURCE_PAGES[0];

export function getResourcePage(slug: string) {
  const cleanSlug = slug.replace(/^\/+|\/+$/g, "");
  return RESOURCE_PAGES.find((page) => page.slug === cleanSlug);
}
