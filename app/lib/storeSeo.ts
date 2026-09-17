export const STORE = {
  name: "Brampton Smoke Cannabis",
  domainHost: "www.bramptonsmokecannabis.com",
  origin: "https://www.bramptonsmokecannabis.com",
  url: "https://www.bramptonsmokecannabis.com/",
  id: "https://www.bramptonsmokecannabis.com/#store",
  streetAddress: "132 Falby Rd Unit B",
  addressLocality: "Brampton",
  addressRegion: "ON",
  postalCode: "L6P 4L9",
  addressCountry: "CA",
  address: "132 Falby Rd Unit B, Brampton, ON L6P 4L9",
  phoneDisplay: "+1 (289) 819-5009",
  phoneIntl: "+12898195009",
  hoursLabel: "Open 24 Hours",
  hoursDetail: "Open 24 Hours, 7 days a week",
  latitude: 43.7724674,
  longitude: -79.6563479,
  corridor: "East Brampton / Falby / Unit B",
  crossStreet: "Falby Rd & Steeles Ave E, Brampton",
  parkingNote: "Parking is available on-site in the retail plaza lot.",
  transitNote:
    "Brampton Transit routes serving nearby Steeles Avenue are the practical transit approach for this Falby Road stop.",
  ageNote: "Adults 19+ with valid government photo ID.",
  image: "https://www.bramptonsmokecannabis.com/wp-content/uploads/2026/04/7Clmh.jpg",
  priceRange: "$3 - $12/g",
  mapsQuery: "132 Falby Rd Unit B, Brampton, ON L6P 4L9",
} as const;

export const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(STORE.mapsQuery)}&hl=en&z=16&output=embed`;
export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(STORE.mapsQuery)}`;
export const mapsPlaceUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(STORE.mapsQuery)}`;

export type StoreFaq = {
  q: string;
  a: string;
};

export const HOME_FAQS: StoreFaq[] = [
  {
    q: "Where is Brampton Smoke Cannabis in east Brampton?",
    a: "Brampton Smoke Cannabis is at 132 Falby Rd Unit B, Brampton, ON L6P 4L9, on the Falby Road corridor in east Brampton near Steeles Avenue East. Use Unit B when you set directions so you reach this storefront in the retail plaza.",
  },
  {
    q: "What are the hours at 132 Falby Rd Unit B?",
    a: "Brampton Smoke Cannabis is Open 24 Hours, seven days a week. Walk in anytime — no appointment needed. Adults 19+ must bring valid government photo ID.",
  },
  {
    q: "How do I phone the Falby Unit B shop?",
    a: "Call Brampton Smoke Cannabis at +1 (289) 819-5009 if you need to confirm a listed item or the Unit B entrance before you travel.",
  },
  {
    q: "What can I compare on the Falby Road menu?",
    a: "The current menu groups flower into five flower tiers — Exotic, Premium, AAA+, AA and Budget — plus pre-rolls, edibles, vapes, concentrates, accessories and cigarettes where listed. Use the current menu and staff for names, prices and package details.",
  },
];

export const VISIT_FAQS: StoreFaq[] = [
  {
    q: "How do I find Unit B at 132 Falby Road?",
    a: "Set directions to 132 Falby Rd Unit B, Brampton, ON L6P 4L9. The shop is the Unit B storefront in the retail plaza. Look for the Unit B label at the door so you do not stop at a neighbouring unit.",
  },
  {
    q: "What is the easiest road approach on the Falby corridor?",
    a: "The store sits on Falby Road in east Brampton. Use Falby Rd and Steeles Avenue East as the local orientation when you leave Steeles for the plaza, then look for Unit B.",
  },
  {
    q: "Is there parking at 132 Falby Rd Unit B?",
    a: "Yes. Parking is available on-site in the retail plaza lot at 132 Falby Rd Unit B.",
  },
  {
    q: "Can I reach Falby Unit B on Brampton Transit?",
    a: "Brampton Transit routes that serve nearby Steeles Avenue are the practical transit approach already noted for this east Brampton stop. Confirm the current route before you travel.",
  },
  {
    q: "What ID do I need to visit Brampton Smoke Cannabis?",
    a: "Brampton Smoke Cannabis is for adults 19+. Bring valid government photo ID. Staff cannot serve anyone who cannot prove they are 19+.",
  },
];

export const cannabisStoreJsonLd = {
  "@context": "https://schema.org",
  "@type": "CannabisStore",
  "@id": STORE.id,
  name: STORE.name,
  description:
    "East Brampton cannabis shop at 132 Falby Rd Unit B, Brampton, ON L6P 4L9. Walk in 24 hours. Adults 19+.",
  url: STORE.url,
  telephone: STORE.phoneIntl,
  image: STORE.image,
  priceRange: STORE.priceRange,
  address: {
    "@type": "PostalAddress",
    streetAddress: STORE.streetAddress,
    addressLocality: STORE.addressLocality,
    addressRegion: STORE.addressRegion,
    postalCode: STORE.postalCode,
    addressCountry: STORE.addressCountry,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: STORE.latitude,
    longitude: STORE.longitude,
  },
  hasMap: mapsPlaceUrl,
  openingHours: "Mo-Su 00:00-23:59",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
  ],
  areaServed: {
    "@type": "Place",
    name: "East Brampton",
  },
};

export function faqPageJsonLd(faqs: StoreFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}
