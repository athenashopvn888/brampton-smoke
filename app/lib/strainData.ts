interface StrainEffects {
  effects: { emoji: string; label: string }[];
  description: string;
  metaDescription: string;
}

const MENU_NOTES = [
  { emoji: "*", label: "Menu Listed" },
  { emoji: "+", label: "Compare Tier" },
  { emoji: "i", label: "Ask Staff" },
];

const TIER_DESCRIPTIONS: Record<string, string> = {
  EXOTIC: "Exotic flower",
  PREMIUM: "Premium flower",
  "AAA+": "AAA+ flower",
  AA: "AA flower",
  BUDGET: "Budget flower",
};

export function getStrainData(
  name: string,
  type: "indica" | "sativa" | "hybrid",
  tier: string,
  thc: string
): StrainEffects {
  const typeLabel =
    type === "indica" ? "Indica" : type === "sativa" ? "Sativa" : "Hybrid";
  const tierDesc = TIER_DESCRIPTIONS[tier] || tier;
  const thcLine = thc ? ` with posted THC noted as ${thc}` : "";

  const description = `${name} is listed as ${tierDesc} in the ${typeLabel} lane at Brampton Smoke Cannabis${thcLine}. Compare the current product page, menu notes, weight, and posted price before choosing.`;

  const metaDescription = `${name} at Brampton Smoke Cannabis in Brampton. Compare the current ${tierDesc} listing, product details, and staff guidance before visiting.`;

  return { effects: MENU_NOTES, description, metaDescription };
}
