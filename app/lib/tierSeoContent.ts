export interface TierSeoData {
  seoTitle: string;
  metaDescription: string;
  socialTitle: string;
  socialDescription: string;
  h1: string;
  imageAlt: string;
  strainHeading: string;
  seoIntro: string;
  sections: { heading: string; body: string }[];
  faqs: { q: string; a: string }[];
}

export const TIER_SEO: Record<string, TierSeoData> = {
  EXOTIC: {
    seoTitle: "Exotic Weed & Flower Brampton | Brampton Smoke Cannabis",
    metaDescription: "Explore Exotic weed and cannabis flower at Brampton Smoke Cannabis in Brampton. Compare listed strains, weights and current menu details for adults 19+.",
    socialTitle: "Exotic Weed & Cannabis Flower in Brampton",
    socialDescription: "Explore Brampton Smoke Cannabis's Exotic flower tier and compare the strains and menu details presented in this category.",
    h1: "Exotic Weed & Cannabis Flower in Brampton",
    imageAlt: "Exotic weed and cannabis flower in Brampton",
    strainHeading: "Explore Exotic Weed Strains",
    seoIntro: "Exotic is one of the dedicated cannabis flower tiers at Brampton Smoke Cannabis. Adults 19+ can compare the strains presented in the Exotic section and review the listed type, weight and menu details before choosing what they want to explore further.",
    sections: [
      { heading: "Compare Exotic Flower Your Way", body: "Start with the strain names that interest you, then compare the details shown with each listing. The Exotic section keeps this flower tier together so you can review it without mixing it with the other Brampton Smoke Cannabis tiers." },
      { heading: "Want to Compare Another Tier?", body: "Exotic is only one of five flower tiers. Use the tier comparison below to move between Exotic, Premium, AAA+, AA and Budget without starting over." },
    ],
    faqs: [
      { q: "What is Exotic weed at Brampton Smoke Cannabis?", a: "Exotic is the name of one of the store's cannabis flower tiers. The current Exotic section shows the strains and menu details presented in that category." },
      { q: "Is Exotic different from Premium?", a: "Exotic and Premium are separate flower tiers at Brampton Smoke Cannabis. You can compare the current listings in each section before deciding where to start." },
      { q: "Where can I see Exotic weed strains?", a: "Use the Exotic section to review the strains currently presented in that flower tier." },
    ],
  },
  PREMIUM: {
    seoTitle: "Premium Weed & Flower Brampton | Brampton Smoke Cannabis",
    metaDescription: "Explore Premium weed and cannabis flower at Brampton Smoke Cannabis in Brampton. Compare listed strains, weights and current menu details for adults 19+.",
    socialTitle: "Premium Weed & Cannabis Flower in Brampton",
    socialDescription: "Browse the Premium flower tier at Brampton Smoke Cannabis and compare the strains and menu details presented in this category.",
    h1: "Premium Weed & Cannabis Flower in Brampton",
    imageAlt: "Premium weed and cannabis flower in Brampton",
    strainHeading: "Explore Premium Weed Strains",
    seoIntro: "Premium gives adults 19+ a dedicated flower tier to explore at Brampton Smoke Cannabis. Compare the strains listed in Premium by the details shown on the menu, then choose the option you want to look at more closely.",
    sections: [
      { heading: "Premium Flower in One Place", body: "Keeping Premium separate from the other flower tiers makes it easier to compare the strains presented in this category without mixing them with Exotic, AAA+, AA or Budget listings." },
      { heading: "Compare Before You Choose", body: "If you are deciding between Premium and another flower tier, use the tier comparison to move directly between the five sections and review their current listings side by side." },
    ],
    faqs: [
      { q: "What does Premium weed mean at Brampton Smoke Cannabis?", a: "Premium is the name of one of the store's five cannabis flower tiers." },
      { q: "Is Premium weed the same as Exotic weed?", a: "No. Premium and Exotic are separate flower tiers on the Brampton Smoke Cannabis menu." },
      { q: "Where can I explore Premium weed strains?", a: "The Premium section presents the strains and menu details currently listed in that tier." },
    ],
  },
  "AAA+": {
    seoTitle: "AAA+ Weed & Flower Brampton | Brampton Smoke Cannabis",
    metaDescription: "Explore AAA+ weed and cannabis flower at Brampton Smoke Cannabis in Brampton. Compare listed strains, weights and current menu details for adults 19+.",
    socialTitle: "AAA+ Weed & Cannabis Flower in Brampton",
    socialDescription: "Browse the AAA+ flower tier at Brampton Smoke Cannabis and compare the strains and menu details presented in this category.",
    h1: "AAA+ Weed & Cannabis Flower in Brampton",
    imageAlt: "AAA+ weed and cannabis flower in Brampton",
    strainHeading: "Explore AAA+ Weed Strains",
    seoIntro: "AAA+ is a distinct flower tier at Brampton Smoke Cannabis for adults 19+ who want another way to narrow the cannabis flower menu. Review the strains presented in AAA+ and compare the details shown with each listing.",
    sections: [
      { heading: "A Defined Flower Tier", body: "AAA+ sits as its own section rather than being mixed into Premium, AA or the other flower categories. That gives shoppers a focused set of listings to compare." },
      { heading: "Move Between Flower Tiers", body: "Not sure whether AAA+ is where you want to start? Compare it directly with Exotic, Premium, AA and Budget using the tier links below." },
    ],
    faqs: [
      { q: "What is AAA+ weed?", a: "AAA+ is one of the cannabis flower tiers used by Brampton Smoke Cannabis to organize its flower menu." },
      { q: "Can I compare AAA+ with Premium or AA?", a: "Yes. AAA+, Premium and AA have separate tier sections, so you can review their current listings independently." },
      { q: "Where can I see AAA+ strains?", a: "The AAA+ section shows the strains and menu details presented in that tier." },
    ],
  },
  AA: {
    seoTitle: "AA Weed & Flower Brampton | Brampton Smoke Cannabis",
    metaDescription: "Explore AA weed and cannabis flower at Brampton Smoke Cannabis in Brampton. Compare listed strains, weights and current menu details for adults 19+.",
    socialTitle: "AA Weed & Cannabis Flower in Brampton",
    socialDescription: "Explore the AA flower tier at Brampton Smoke Cannabis and compare the strains and menu details presented in this category.",
    h1: "AA Weed & Cannabis Flower in Brampton",
    imageAlt: "AA weed and cannabis flower in Brampton",
    strainHeading: "Explore AA Weed Strains",
    seoIntro: "AA is one of the five flower tiers at Brampton Smoke Cannabis. Adults 19+ can use the AA section to compare the strains and menu details presented within this category before moving to another flower tier if they want more options.",
    sections: [
      { heading: "Keep the Comparison Simple", body: "The AA section keeps this tier separate from Budget, AAA+, Premium and Exotic so you can focus on one group of flower listings at a time." },
      { heading: "Compare AA With the Other Tiers", body: "Use the tier comparison to move between all five flower sections and decide which listings you want to explore further." },
    ],
    faqs: [
      { q: "What does AA mean on the Brampton Smoke Cannabis menu?", a: "AA is the name of one of the store's five cannabis flower tiers." },
      { q: "Is AA the same as Budget?", a: "No. AA and Budget are separate flower sections on the menu." },
      { q: "Where can I explore AA weed strains?", a: "The AA section shows the strains and details currently presented in that tier." },
    ],
  },
  BUDGET: {
    seoTitle: "Budget Weed & Flower Brampton | Brampton Smoke Cannabis",
    metaDescription: "Explore Budget weed and cannabis flower at Brampton Smoke Cannabis in Brampton. Compare listed strains, weights and current menu details for adults 19+.",
    socialTitle: "Budget Weed & Cannabis Flower in Brampton",
    socialDescription: "Browse the Budget flower tier at Brampton Smoke Cannabis and compare the strains and menu details presented in this category.",
    h1: "Budget Weed & Cannabis Flower in Brampton",
    imageAlt: "Budget weed and cannabis flower in Brampton",
    strainHeading: "Explore Budget Weed Strains",
    seoIntro: "Budget is Brampton Smoke Cannabis's value-oriented flower tier. Adults 19+ can compare the strains and menu details presented here without assuming that a particular product, price or promotion will remain unchanged.",
    sections: [
      { heading: "Start With the Budget Tier", body: "If value is your priority, Budget gives you a focused flower section to review before comparing the other tiers." },
      { heading: "Compare Budget With the Full Flower Menu", body: "Use the tier links below to compare Budget with AA, AAA+, Premium and Exotic and decide which section you want to explore next." },
    ],
    faqs: [
      { q: "What is Budget weed at Brampton Smoke Cannabis?", a: "Budget is the store's value-oriented cannabis flower tier." },
      { q: "Does Budget mean a current sale or promotion?", a: "No. Budget is the name of a flower tier and does not by itself indicate a current sale, discount or promotion." },
      { q: "Where can I see Budget weed strains?", a: "Use the Budget section to review the strains and menu details presented in that tier." },
    ],
  },
};
