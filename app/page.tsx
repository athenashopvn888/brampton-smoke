import type { Metadata } from "next";
import HomePage from "./components/HomePage";
import { JsonLd } from "./components/JsonLd";
import { STORE, HOME_FAQS, faqPageJsonLd } from "./lib/storeSeo";

export const metadata: Metadata = {
  title: {
    absolute: "East Brampton Dispensary on Falby Rd Unit B | Brampton Smoke Cannabis",
  },
  description:
    "Brampton Smoke Cannabis is the east Brampton walk-in shop at 132 Falby Rd Unit B. Open 24 Hours. Call +1 (289) 819-5009. Adults 19+.",
  alternates: {
    canonical: STORE.origin,
  },
  openGraph: {
    title: "East Brampton Dispensary on Falby Rd Unit B | Brampton Smoke Cannabis",
    description:
      "Visit Brampton Smoke Cannabis at 132 Falby Rd Unit B, east Brampton. Open 24 Hours. Adults 19+.",
    url: STORE.url,
  },
};

export default function Page() {
  return (
    <>
      <JsonLd data={faqPageJsonLd(HOME_FAQS)} />
      <HomePage />
    </>
  );
}
