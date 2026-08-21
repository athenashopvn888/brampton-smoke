import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { SmokePilotLanding } from "../../components/SmokePilot";
import { getItemsByCategory } from "../../lib/products";

export const metadata: Metadata = {
  title: { absolute: "Nicotine Vapes Brampton | Brampton Smoke Cannabis" },
  description: "Browse nicotine vape devices, flavours, formats, and listed prices at Brampton Smoke Cannabis, 132 Falby Rd Unit B, Brampton. Open 24 Hours.",
  alternates: { canonical: "https://www.bramptonsmokecannabis.com/info/nicotine-vapes-brampton" },
};

export default function NicotineVapesPage() {
  const items = getItemsByCategory("VAPE PENS");
  return (
    <>
      <Navbar />
      <SmokePilotLanding
        canonicalUrl="https://www.bramptonsmokecannabis.com/info/nicotine-vapes-brampton"
        storeName="Brampton Smoke Cannabis"
        locationLabel="Brampton"
        eyebrow="Nicotine Vapes · Falby Road"
        title="Nicotine Vapes in Brampton"
        intro="Shop nicotine vape devices at Brampton Smoke Cannabis on Falby Road. Compare the current formats, flavours, puff counts and listed prices."
        items={items}
        menuHref="/items/vapes"
        menuLabel="Shop the nicotine vape menu"
        menuHeading="Nicotine Vape Devices & Prices"
        menuIntro="Compare nicotine vape devices, formats and listed prices from Brampton Smoke Cannabis in Brampton."
        crossLink={{ href: "/info/native-cigarettes-brampton", eyebrow: "Also at Brampton Smoke Cannabis", title: "Need Native cigarettes instead?", body: "Shop full, light and menthol cigarette styles alongside Backwoods, grabba and other smoke-shop essentials at Brampton Smoke Cannabis.", label: "Shop Native cigarettes" }}
        sections={[
          { heading: "Nicotine Vapes on Falby Road", body: "Brampton Smoke Cannabis lists disposable nicotine vapes, pods and devices at 132 Falby Rd Unit B in Brampton." },
          { heading: "Vape Details for Brampton Shoppers", body: "Compare the current device selection by format, flavour, puff count and listed price before visiting Falby Road." },
          { heading: "Open 24 Hours in Brampton", body: "Brampton Smoke Cannabis lists 24-hour shopping for cigarettes, nicotine vapes and other smoke-shop essentials." },
        ]}
        faqs={[
          { q: "Does Brampton Smoke Cannabis sell nicotine vapes?", a: "Yes. Brampton Smoke Cannabis lists nicotine vape devices with formats, flavours, puff counts and prices." },
          { q: "What nicotine vape details can I compare?", a: "Listings may include the device format, flavour, puff count and price. Selection can change, so check the current details before visiting." },
          { q: "Where is Brampton Smoke Cannabis?", a: "Brampton Smoke Cannabis is at 132 Falby Rd Unit B, Brampton, ON L6P 4L9 and lists open 24 hours." },
        ]}
        address="132 Falby Rd Unit B, Brampton"
        hours="Open 24 Hours"
        theme="nicotine"
      />
      <Footer />
    </>
  );
}
