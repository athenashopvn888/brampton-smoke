export type WeedDiscoveryLink = {
  label: string;
  description: string;
  href: string;
};

export type WeedGuideLink = WeedDiscoveryLink;

export type WeedOwnerConfig = {
  storeName: string;
  city: string;
  address: string;
  streetAddress: string;
  province: string;
  postalCode: string;
  phoneDisplay: string;
  phoneIntl: string;
  hoursLabel: string;
  ownerPath: string;
  flowerTiers: WeedDiscoveryLink[];
  categories: WeedDiscoveryLink[];
  guides: WeedGuideLink[];
};

export const bscWeedOwner: WeedOwnerConfig = {
  storeName: "Brampton Smoke Cannabis",
  city: "Brampton",
  address: "132 Falby Rd Unit B, Brampton, ON L6P 4L9",
  streetAddress: "132 Falby Rd Unit B",
  province: "ON",
  postalCode: "L6P 4L9",
  phoneDisplay: "+1 (289) 819-5009",
  phoneIntl: "+12898195009",
  hoursLabel: "Open 24 Hours",
  ownerPath: "/weed-dispensary-brampton/",
  flowerTiers: [
    { label: "Budget Flower", description: "A starting point for shoppers interested in the Budget flower selection.", href: "/budget" },
    { label: "AA Flower", description: "Explore the AA flower selection.", href: "/aa" },
    { label: "AAA+ Flower", description: "Explore the AAA+ flower selection.", href: "/aaa" },
    { label: "Premium Flower", description: "Explore the Premium flower selection.", href: "/premium" },
    { label: "Exotic Flower", description: "Explore the Exotic flower selection.", href: "/exotic" },
  ],
  categories: [
    { label: "Pre-Rolls", description: "Cannabis already rolled and ready in pre-roll format.", href: "/items/prerolls" },
    { label: "Edibles", description: "Explore the cannabis edibles category.", href: "/items/edibles" },
    { label: "THC Vapes", description: "Explore THC vape products by format.", href: "/items/vape-disposables" },
    { label: "Concentrates", description: "Explore the cannabis concentrates category.", href: "/items/concentrates" },
    { label: "Accessories", description: "Explore cannabis accessories.", href: "/items/add-ons" },
  ],
  guides: [
    { label: "Falby Road 24-Hour Visit Guide", description: "Useful information for planning a late-night or early-morning visit.", href: "/resources/falby-road-24-hour-visit-guide" },
    { label: "Cannabis Menu Guide", description: "A broader overview of flower, pre-rolls, edibles, vapes and concentrates.", href: "/resources/menu-guide" },
    { label: "Flower Guide", description: "Learn more about the flower tiers before choosing where to start.", href: "/resources/flower-guide" },
    { label: "Pre-Roll Guide", description: "A focused introduction to the pre-roll format.", href: "/resources/pre-roll-guide" },
  ],
};
