import Link from "next/link";
import Footer from "./Footer";
import Navbar from "./Navbar";
import PreferredSourceButton from "./PreferredSourceButton";
import styles from "./GBPLandingPage.module.css";
import { bscWeedOwner as store } from "../lib/weedDiscovery";

const faqItems = [
  {
    question: "Where is Brampton Smoke Cannabis?",
    answer: <>Brampton Smoke Cannabis is located at <strong>{store.address}</strong>.</>,
  },
  {
    question: "Is Brampton Smoke Cannabis open 24 hours?",
    answer: <>Yes. Brampton Smoke Cannabis is <strong>open 24 hours a day, seven days a week</strong>.</>,
  },
  {
    question: "What cannabis categories can I explore?",
    answer: <>Adults 19+ can explore flower tiers, pre-rolls, edibles, THC vapes, concentrates and accessories.</>,
  },
  {
    question: "What is the difference between weed and cannabis?",
    answer: <><strong>Weed</strong> is common everyday language for cannabis. <strong>Cannabis</strong> is the broader term and can include flower, pre-rolls, edibles, THC vapes, concentrates and other cannabis formats.</>,
  },
  {
    question: "What is the difference between bud and flower?",
    answer: <><strong>Flower</strong> is the category term for dried cannabis flower. <strong>Bud</strong> is a common informal word people use for flower.</>,
  },
  {
    question: "How can I check on a specific product before visiting?",
    answer: <>Call Brampton Smoke Cannabis at <a href={`tel:${store.phoneIntl}`}><strong>{store.phoneDisplay}</strong></a> if you are looking for a specific product before making a special trip.</>,
  },
  {
    question: "Do I need to be 19+?",
    answer: <>Yes. Brampton Smoke Cannabis is for <strong>adults 19+</strong>.</>,
  },
];

const storeSchema = {
  "@context": "https://schema.org",
  "@type": "Store",
  "@id": "https://www.bramptonsmokecannabis.com/weed-dispensary-brampton/",
  name: store.storeName,
  url: "https://www.bramptonsmokecannabis.com/weed-dispensary-brampton/",
  telephone: store.phoneIntl,
  address: {
    "@type": "PostalAddress",
    streetAddress: store.streetAddress,
    addressLocality: store.city,
    addressRegion: store.province,
    postalCode: store.postalCode,
    addressCountry: "CA",
  },
  openingHours: "Mo-Su 00:00-23:59",
};

export function GBPLandingPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(storeSchema) }}
        />

        <section className={styles.hero}>
          <p className={styles.eyebrow}>Open 24 Hours · Adults 19+</p>
          <h1>Brampton Smoke Cannabis — Weed Dispensary in Brampton</h1>
          <p className={styles.heroAddress}>{store.address}</p>
          <div className={styles.actions}>
            <Link href="#find-your-weed" className={styles.primaryAction}>Explore Cannabis Categories</Link>
            <Link href="#visit" className={styles.secondaryAction}>Plan Your Visit</Link>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Weed and Cannabis in Brampton, Open 24 Hours</h2>
          <p>Brampton Smoke Cannabis is a <strong>24-hour cannabis dispensary in Brampton</strong> at <strong>{store.streetAddress}</strong>.</p>
          <p>Whether you usually call it <strong>weed</strong>, <strong>cannabis</strong>, <strong>flower</strong> or <strong>bud</strong>, start with the product format you are interested in and narrow your choices from there.</p>
          <p>Flower is available to explore by tier, while other cannabis categories include pre-rolls, edibles, THC vapes, concentrates and accessories.</p>
          <p>For a particular product, call <a href={`tel:${store.phoneIntl}`}><strong>{store.phoneDisplay}</strong></a> before making a special trip.</p>
        </section>

        <section className={styles.section} id="find-your-weed">
          <p className={styles.kicker}>Find Your Weed</p>
          <h2>Shop Flower by Tier</h2>
          <div className={styles.cardGrid}>
            {store.flowerTiers.map((item) => (
              <Link href={item.href} className={styles.card} key={item.href}>
                <span>{item.label}</span>
                <small>{item.description}</small>
              </Link>
            ))}
          </div>
          <div className={styles.inlineGuide}>
            <span>Want help understanding the flower tiers?</span>
            <Link href="/resources/weed-flower-guide">Read the Weed &amp; Flower Guide</Link>
          </div>

          <h3 className={styles.subheading}>Explore More Cannabis Categories</h3>
          <div className={styles.cardGrid}>
            {store.categories.map((item) => (
              <Link href={item.href} className={styles.card} key={item.href}>
                <span>{item.label}</span>
                <small>{item.description}</small>
              </Link>
            ))}
          </div>
          <p className={styles.note}>Individual products can change. If you are coming in for something specific, call <a href={`tel:${store.phoneIntl}`}><strong>{store.phoneDisplay}</strong></a> before making a special trip.</p>
        </section>

        <section className={styles.section}>
          <h2>Weed, Cannabis, Flower and Bud</h2>
          <p>Different shoppers use different words for cannabis. These common terms can help narrow down what you are shopping for.</p>
          <div className={styles.termGrid}>
            <article><h3>Weed</h3><p><strong>Weed</strong> is the everyday word many people use for cannabis. It may refer to flower, pre-rolls, edibles, THC vapes, concentrates or another cannabis format.</p></article>
            <article><h3>Cannabis</h3><p><strong>Cannabis</strong> is the broader term. It includes flower and other cannabis categories available at Brampton Smoke Cannabis.</p></article>
            <article><h3>Flower</h3><p><strong>Flower</strong> refers to dried cannabis flower. Brampton Smoke Cannabis offers Budget, AA, AAA+, Premium and Exotic flower tiers.</p></article>
            <article><h3>Bud</h3><p><strong>Bud</strong> is a common informal name for cannabis flower.</p></article>
          </div>
          <p>Whatever term you prefer, focus on the cannabis format and flower tier that fit what you are shopping for.</p>
        </section>

        <section className={styles.visitSection} id="visit">
          <div>
            <p className={styles.kicker}>Open 24 Hours on Falby Road</p>
            <h2>{store.storeName}</h2>
            <address>
              {store.streetAddress}<br />
              {store.city}, {store.province} {store.postalCode}
            </address>
          </div>
          <div className={styles.visitFacts}>
            <strong>Open 24 Hours · 7 Days a Week</strong>
            <a href={`tel:${store.phoneIntl}`}>Phone: {store.phoneDisplay}</a>
            <span>Adults 19+</span>
          </div>
          <p>The 24-hour schedule gives adults 19+ the flexibility to visit Brampton Smoke Cannabis at the time that works for them. Call ahead when you need to confirm a particular product before making a special trip.</p>
        </section>

        <section className={styles.section}>
          <h2>Helpful Guides</h2>
          <div className={styles.guideGrid}>
            {store.guides.map((guide) => (
              <article className={styles.guideCard} key={guide.href}>
                <h3>{guide.label}</h3>
                <p>{guide.description}</p>
                <Link href={guide.href}>Read {guide.label}</Link>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} id="faq">
          <h2>Frequently Asked Questions</h2>
          <div className={styles.faqList}>
            {faqItems.map((item) => (
              <article className={styles.faqItem} key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <PreferredSourceButton />
      </main>
      <Footer />
    </>
  );
}
