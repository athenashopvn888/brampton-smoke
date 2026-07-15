import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./faq.module.css";

export const metadata: Metadata = {
  title: "FAQ | Brampton Smoke Cannabis",
  description: "Frequently asked questions about Brampton Smoke Cannabis in Brampton, including store-page checks, menu categories, value shopping, and Native smokes where listed.",
  alternates: {
    canonical: "https://www.bramptonsmokecannabis.com/faq",
  },
};

const FAQ_CATEGORIES = [
  {
    title: "Location and Hours",
    faqs: [
      { q: "Where is Brampton Smoke Cannabis located?", a: "Brampton Smoke Cannabis is listed at 132 Falby Rd Unit B, Brampton, ON L6P 4L9. Use the store page and resources for directions, hours, and menu choices before visiting." },
      { q: "What are the listed hours?", a: "Open 24 Hours. Check the current store page and menu before visiting if timing or one exact item matters." },
      { q: "What is the best way to plan the visit?", a: "Start with the store page, confirm directions and listed hours, then open the menu category that matches the visit." },
    ],
  },
  {
    title: "Products and Menu",
    faqs: [
      { q: "What menu categories can shoppers compare?", a: "The site has paths for flower, pre-rolls, edibles, THC vapes, concentrates, accessories, and cigarettes where listed." },
      { q: "How should shoppers use the menu?", a: "Pick one category first, then compare product name, format, weight or package size, posted price, and item notes." },
      { q: "Do menu details change?", a: "Yes. Product names, prices, and availability can change, so use the current menu or ask staff before making the trip." },
    ],
  },
  {
    title: "Flower and Value",
    faqs: [
      { q: "Where should cheap weed shoppers start?", a: "Start with Budget and AA flower, then compare the current listings before choosing." },
      { q: "Where should premium flower shoppers start?", a: "Use Premium or Exotic flower when the visit is about the higher shelf lanes." },
      { q: "How do shoppers avoid guessing?", a: "Stay inside one tier, compare the posted details, and ask staff when the final choice needs a current answer." },
    ],
  },
  {
    title: "Native Smokes",
    faqs: [
      { q: "Does Brampton Smoke Cannabis list Native cigarettes?", a: "The cigarette menu may show Native smoke brands such as Rolled Gold Full, Rolled Gold Lights, BB Full Carton, BB Lights Carton, Canadian Classics Original, Canadian Classics Silver, Canadian Full, Canadian Goose Full, Canadian Goose Lights, Canadian Lights, Canadian Menthol, Nexus Full, Nexus Lights, Playfare Ultra Lights, Putters, Time Full, and Time Lights. Confirm current options through the menu or staff." },
      { q: "Are $25 cartons guaranteed?", a: "No. Where $25 carton-style listings are shown, confirm current price and availability through the menu or staff." },
      { q: "Where should cigarette shoppers start?", a: "Open the cigarette category first, then use the store page for directions, listed hours, and local visit details." },
    ],
  },
];

export default function FAQPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_CATEGORIES.flatMap((cat) =>
      cat.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      }))
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className={styles.main}>
        <Navbar />
        <div className={styles.content}>
          <div className={styles.bannerFrame}>
            <img
              src="/banners/bsc-real/page-faq.webp"
              alt="Brampton Smoke Cannabis FAQ"
              className={styles.bannerImg}
            />
          </div>
          <h1 className={styles.pageTitle}>Frequently Asked Questions</h1>
          <p className={styles.pageSubtitle}>
            Straight answers for shopping Brampton Smoke Cannabis: store page first, menu category second, staff when the current detail matters.
          </p>

          {FAQ_CATEGORIES.map((cat) => (
            <div key={cat.title} className={styles.category}>
              <h2 className={styles.categoryTitle}>{cat.title}</h2>
              {cat.faqs.map((faq) => (
                <details key={faq.q} className={styles.faqItem}>
                  <summary className={styles.faqQuestion}>{faq.q}</summary>
                  <p className={styles.faqAnswer}>{faq.a}</p>
                </details>
              ))}
            </div>
          ))}

          <div className={styles.ctaSection}>
            <h2 className={styles.ctaTitle}>Still have questions?</h2>
            <p className={styles.ctaText}>
              Use the BSC resources, current menu, and store page before visiting.
            </p>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
