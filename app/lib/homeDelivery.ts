export const HOME_TITLE = "Brampton Smoke Cannabis Dispensary Weed Delivery";
// Document <title> / og:title / twitter:title only — H1 and schema keep HOME_TITLE.
export const HOME_DOC_TITLE = "Brampton Smoke Cannabis Dispensary Weed Delivery | East Brampton";
export const HOME_MENU_HREF = "/exotic-weed";
export const HOME_DELIVERY_HREF = "/delivery";
export const HOME_DELIVERY_H2 = "Cannabis Delivery in East Brampton";

export const HOME_DELIVERY_PARAGRAPHS = [
  "Brampton Smoke Cannabis keeps its delivery path connected to East Brampton. Use the Delivery button for the current ordering page, then follow that page to confirm the address and next step.",
  "This homepage keeps the service context local to East Brampton instead of presenting a far-city delivery directory. Store-menu browsing and delivery information remain separate so shoppers can choose the route that fits.",
  "Choose STORE MENU to browse the existing catalog, or choose Delivery for the current local delivery route. Adults 19+ need valid government-issued photo ID, and listed menu information is not a live-stock promise.",
] as const;

export const HOME_DELIVERY_CARDS = [
  { href: "/delivery", title: "Delivery menu", text: "Open the existing East Brampton store page for current details." },
  { href: "/weed-delivery-brampton", title: "Local delivery guide", text: "Open the existing East Brampton store page for current details." },
  { href: "/weed-dispensary-falby-road", title: "Local dispensary guide", text: "Open the existing East Brampton store page for current details." },
  { href: "/visit", title: "Visit the store", text: "Open the existing East Brampton store page for current details." },
  { href: "/faq", title: "Store FAQ", text: "Open the existing East Brampton store page for current details." },
] as const;

export const HOME_DELIVERY_FAQS = [
  { q: "Does Brampton Smoke Cannabis offer cannabis delivery in East Brampton?", a: "Brampton Smoke Cannabis has an existing delivery route for local requests. Use the Delivery button for current details and address confirmation." },
  { q: "How do I start a East Brampton delivery request?", a: "Open the Delivery page, review the current information, and follow its ordering steps. The delivery flow confirms the address and next step." },
  { q: "Where does STORE MENU go?", a: "STORE MENU opens the existing catalog at /exotic-weed." },
  { q: "Do I need photo ID?", a: "Yes. Cannabis service is for adults 19+ with valid government-issued photo ID." },
  { q: "Does the homepage promise live inventory?", a: "No. Use the linked menu or delivery page for current details and confirm a specific item before relying on availability." },
  { q: "Is the delivery information limited to East Brampton?", a: "This homepage describes the East Brampton delivery context only. The current delivery page confirms whether a specific address can be served." },
] as const;
