import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { SmokePilotLanding } from "../../components/SmokePilot";
import { getItemsByCategory } from "../../lib/products";

export const metadata: Metadata = {
  title: { absolute: "Native Cigarettes Brampton | Brampton Smoke Cannabis" },
  description: "Browse Native cigarette brands, pack styles, and listed prices at Brampton Smoke Cannabis, 132 Falby Rd Unit B, Brampton. Open 24 Hours.",
  alternates: { canonical: "https://www.bramptonsmokecannabis.com/info/native-cigarettes-brampton" },
};

export default function NativeCigarettesPage() {
  const items = getItemsByCategory("CIGARETTES");
  return (
    <>
      <Navbar />
      <SmokePilotLanding
        canonicalUrl="https://www.bramptonsmokecannabis.com/info/native-cigarettes-brampton"
        storeName="Brampton Smoke Cannabis"
        locationLabel="Brampton"
        eyebrow="Native Cigarettes · Falby Road"
        title="Native Cigarettes in Brampton"
        intro="Shop Native cigarette brands, full, light and menthol styles, plus Backwoods, grabba and nicotine pouches at Brampton Smoke Cannabis on Falby Road."
        items={items}
        menuHref="/items/cigarettes"
        menuLabel="Shop the cigarette menu"
        menuHeading="Native Cigarette Brands & Prices"
        menuIntro="Compare cigarette brands, styles and listed prices from Brampton Smoke Cannabis in Brampton."
        crossLink={{ href: "/info/nicotine-vapes-brampton", eyebrow: "Also at Brampton Smoke Cannabis", title: "Prefer a nicotine vape?", body: "Shop nicotine vape devices with brand, flavour, puff-count and listed price details from Brampton Smoke Cannabis.", label: "Shop nicotine vapes" }}
        sections={[
          { heading: "Native Cigarettes on Falby Road", body: "Brampton Smoke Cannabis carries Native cigarettes and smoke-shop essentials at 132 Falby Rd Unit B in Brampton." },
          { heading: "Canadian Brands on Falby Road", body: "Compare listed Canadian, Canadian Goose, Canadian Classics, Nexus, Time and Putters options, including full, light and menthol styles." },
          { heading: "Grabba and Backwoods in Brampton", body: "Brampton Smoke Cannabis also lists grabba, grabba shakers, Backwoods and nicotine pouches with its smoke-shop selection." },
        ]}
        faqs={[
          { q: "Does Brampton Smoke Cannabis sell Native cigarettes?", a: "Yes. Brampton Smoke Cannabis lists Native cigarette brands and related smoke-shop products at 132 Falby Rd Unit B, Brampton." },
          { q: "Can I see cigarette prices online?", a: "Yes. Listed prices appear with the cigarette selection, and staff can confirm current shelf details when you visit." },
          { q: "Where is Brampton Smoke Cannabis?", a: "Brampton Smoke Cannabis is at 132 Falby Rd Unit B, Brampton, ON L6P 4L9 and lists open 24 hours." },
        ]}
        address="132 Falby Rd Unit B, Brampton"
        hours="Open 24 Hours"
        theme="cigarettes"
      />
      <Footer />
    </>
  );
}
