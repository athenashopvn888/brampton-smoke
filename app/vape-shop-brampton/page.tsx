import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SafeImage from "../components/SafeImage";
import VapeConversionBlock from "../components/VapeConversionBlock";
import { getItemPriceDisplay } from "../lib/itemPricing";
import { getLiveMenu } from "../lib/liveMenu";
import { mapsDirectionsUrl, STORE } from "../lib/storeSeo";
import type { ItemProduct } from "../lib/products";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

const PAGE_URL = `${STORE.origin}/vape-shop-brampton`;
const META_DESCRIPTION =
  "Adults 19+. Compare nicotine vape listings at Brampton Smoke Cannabis, 132 Falby Rd Unit B. Call, get directions or text to request a pickup hold.";

export const metadata: Metadata = {
  title: { absolute: "Vape Shop in Brampton | Brampton Smoke Cannabis" },
  description: META_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
};

const FAQS = [
  {
    q: "Where is the nicotine vape shop page for Brampton Smoke Cannabis?",
    a: "This page covers the adult nicotine vape shelf at Brampton Smoke Cannabis, 132 Falby Rd Unit B in east Brampton. The current feed-backed product list appears below.",
  },
  {
    q: "Are nicotine vapes and THC vapes listed together?",
    a: "No. Nicotine products use the /items/vapes category. Cannabis or THC vape products use the separate /items/vape-disposables category.",
  },
  {
    q: "Can I ask the store to hold a nicotine vape for pickup?",
    a: "You can start a customer-requested text from this page. A product is held only after store staff reply and confirm it. Bring valid government photo ID for pickup.",
  },
  {
    q: "Do the listed puff counts guarantee how long a device lasts?",
    a: "No. Puff counts are product identifiers supplied in the current listing, not a lifespan or performance guarantee. Usage patterns vary.",
  },
  {
    q: "Are online prices and flavours guaranteed?",
    a: "No. The page reads the current store feed, but product details can change. Call or text the store for confirmation before making a special trip.",
  },
  {
    q: "What identification is required?",
    a: "Nicotine products are for adults 19+. Bring valid government-issued photo identification when you visit or collect a confirmed hold.",
  },
];

function numericPrice(value: string) {
  const match = String(value || "").match(/\d+(?:\.\d{1,2})?/);
  return match ? Number(match[0]) : null;
}

function puffCount(item: ItemProduct) {
  const match = item.name.match(/(\d+(?:\.\d+)?)\s*K\s*PUFF/i);
  if (!match) return null;
  return Number(match[1]) * 1000;
}

function displayPuffCount(item: ItemProduct) {
  const count = puffCount(item);
  if (!count) return "See product listing";
  return `${count.toLocaleString("en-CA")} stated puffs`;
}

function pickComparison(items: ItemProduct[]) {
  const counted = items
    .map((item) => ({ item, count: puffCount(item) }))
    .filter((entry): entry is { item: ItemProduct; count: number } => entry.count !== null)
    .sort((a, b) => a.count - b.count);
  if (counted.length === 0) return [];
  const picks = [counted[0], counted[Math.floor((counted.length - 1) / 2)], counted[counted.length - 1]];
  return picks.filter((entry, index) => picks.findIndex((candidate) => candidate.item.slug === entry.item.slug) === index);
}

function jsonLd(items: ItemProduct[]) {
  const products = items.map((item) => {
    const price = numericPrice(item.price);
    return {
      "@type": "Product",
      "@id": `${STORE.origin}/item/${item.slug}#product`,
      name: item.name,
      sku: item.sku,
      category: "Nicotine vape",
      image: item.image || undefined,
      url: `${STORE.origin}/item/${item.slug}`,
      offers: price
        ? {
            "@type": "Offer",
            price,
            priceCurrency: "CAD",
            availability: "https://schema.org/InStock",
            url: `${STORE.origin}/item/${item.slug}`,
            seller: { "@id": STORE.id },
          }
        : undefined,
    };
  });

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: "Nicotine Vapes in Brampton",
        description: META_DESCRIPTION,
        about: { "@id": STORE.id },
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        mainEntity: FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
      {
        "@type": "ItemList",
        "@id": `${PAGE_URL}#current-nicotine-vapes`,
        numberOfItems: products.length,
        itemListElement: products.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: { "@id": product["@id"] },
        })),
      },
      ...products,
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: STORE.origin },
          { "@type": "ListItem", position: 2, name: "Nicotine Vapes in Brampton", item: PAGE_URL },
        ],
      },
    ],
  };
}

export default async function VapeShopBramptonPage() {
  const { items } = await getLiveMenu();
  const nicotineItems = items.filter((item) => item.category.toUpperCase() === "VAPE PENS");
  const comparison = pickComparison(nicotineItems);
  const schema = JSON.stringify(jsonLd(nicotineItems)).replace(/</g, "\\u003c");

  return (
    <main className={styles.main}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
      <Navbar />

      <section className={styles.hero}>
        <div className={styles.shell}>
          <p className={styles.eyebrow}>East Brampton · Falby Road Unit B · Adults 19+</p>
          <h1>Nicotine Vapes in Brampton</h1>
          <p className={styles.lede}>
            Compare the current nicotine vape feed for Brampton Smoke Cannabis at {STORE.address}.
            Nicotine devices stay separate from the store&apos;s THC vape category, so adults can open
            the right shelf without sorting through cannabis vape products.
          </p>
          <div className={styles.heroLinks}>
            <Link href="/items/vapes">Open the current nicotine menu</Link>
            <a href={mapsDirectionsUrl} target="_blank" rel="noreferrer">Directions to Unit B</a>
          </div>
        </div>
      </section>

      <VapeConversionBlock />

      <section className={styles.section} aria-labelledby="current-vapes-heading">
        <div className={styles.shell}>
          <p className={styles.kicker}>Current feed</p>
          <h2 id="current-vapes-heading">Nicotine vape listings from the BSC01 store feed</h2>
          <p>
            The cards below come from the same stock-filtered store feed used by the menu. They are
            not a promise that a particular flavour will still be on the shelf when you arrive. Use
            the call or customer-requested text buttons for a current confirmation before travelling.
          </p>
          {nicotineItems.length > 0 ? (
            <div className={styles.productGrid}>
              {nicotineItems.map((item) => {
                const price = getItemPriceDisplay(item.price, item.sku);
                return (
                  <Link href={`/item/${item.slug}`} className={styles.productCard} key={`${item.sku}-${item.slug}`}>
                    <div className={styles.productImage}>
                      {item.image ? <SafeImage src={item.image} alt={item.name} loading="lazy" /> : <span>NV</span>}
                    </div>
                    <div className={styles.productCopy}>
                      <small>{displayPuffCount(item)}</small>
                      <h3>{item.name}</h3>
                      {price.display ? <strong>{price.display}</strong> : <span>Ask staff for the current price</span>}
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className={styles.feedNotice}>No nicotine vape listings were returned by the current feed. Call the store before visiting.</p>
          )}
        </div>
      </section>

      <section className={styles.sectionAlt} aria-labelledby="compare-heading">
        <div className={styles.shell}>
          <p className={styles.kicker}>Good · Better · Best comparison row</p>
          <h2 id="compare-heading">Compare by the stated puff count—not by a quality claim</h2>
          <p>
            This neutral row uses only puff counts printed in current product names. “Good,” “Better”
            and “Best” identify lower, middle and higher stated-count formats for easier shelf
            navigation; they do not rate flavour, quality, lifespan or performance.
          </p>
          <div className={styles.comparisonGrid}>
            {comparison.map(({ item, count }, index) => (
              <article key={item.slug}>
                <span>{["Good", "Better", "Best"][Math.min(index, 2)]}</span>
                <h3>{count.toLocaleString("en-CA")} stated puffs</h3>
                <p>{item.name}</p>
                <Link href={`/item/${item.slug}`}>Read the current listing</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.shellNarrow}>
          <h2>Keep nicotine and THC vape categories separate</h2>
          <p>
            Brampton Smoke Cannabis uses <Link href="/items/vapes">/items/vapes</Link> for nicotine
            products. The separate <Link href="/items/vape-disposables">THC vape category</Link> is for
            cannabis vape products. Product names can contain words such as disposable, pod, puff
            count or e-liquid, but the feed category—not a guess from the name—controls which shelf is
            shown on this page.
          </p>
          <p>
            Puff counts are useful for identifying listings, not predicting personal use. A stated
            count does not guarantee device life, number of sessions, flavour strength or value. Read
            the current item page, confirm the listed format and ask staff when a product description
            is unclear.
          </p>

          <h2>Plan a pickup at Falby Road Unit B</h2>
          <p>
            The storefront is at <strong>{STORE.address}</strong>, in the Falby Road retail plaza near
            Steeles Avenue East. Parking is available in the plaza lot. Brampton Transit routes serving
            nearby Steeles Avenue provide the practical public-transit approach. Use Unit B in your
            directions so you arrive at the correct storefront.
          </p>
          <p>
            The approved store record lists Brampton Smoke Cannabis as <strong>{STORE.hoursDetail}</strong>.
            Adults 19+ must bring valid government-issued photo identification. If you need a specific
            brand or flavour, call or start a text request before travelling. A text request does not
            create a reservation until staff confirm it, and payment remains at pickup.
          </p>

          <h2>How to read the live vape menu</h2>
          <p>
            Start with the exact product name and format. Then compare the stated puff count, listed
            price and product page. The feed may group multiple flavours under one listing, so the
            website does not promise a flavour that the feed has not confirmed individually. The
            current category page remains the source for the store&apos;s published nicotine vape range.
          </p>
          <p>
            Prices on this page are displayed exactly as the store feed returns them. An unusual price
            relationship is not silently corrected or blended with another store&apos;s menu. Staff can
            confirm a shelf price, and the website can be updated after the authoritative source is
            corrected.
          </p>
        </div>
      </section>

      <section className={styles.sectionAlt} aria-labelledby="faq-heading">
        <div className={styles.shellNarrow}>
          <h2 id="faq-heading">Nicotine vape questions</h2>
          <div className={styles.faqs}>
            {FAQS.map((faq) => (
              <details key={faq.q}>
                <summary>{faq.q}</summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
