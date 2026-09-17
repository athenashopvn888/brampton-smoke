"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import styles from "../page.module.css";
import FleetAnnouncementBanner from "./FleetAnnouncementBanner";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FlowerCard from "./FlowerCard";
import SmokePilotSpotlight from "./SmokePilotSpotlight";
import { WeedDiscoveryModule } from "./WeedDiscoveryModule";
import { allFlowers, type FlowerProduct } from "../lib/products";
import {
  HOME_FAQS,
  STORE,
  mapsDirectionsUrl,
  mapsEmbedUrl,
} from "../lib/storeSeo";
import Papa from "papaparse";

/* ── Bento Mosaic Config ── */
const BENTO_TIERS = [
  {
    name: "EXOTIC WEED",
    slug: "exotic-weed",
    price: "$10-$12/g",
    banner: "/banners/bsc-real/tile-exotic.webp",
    className: styles.bentoExotic,
  },
  {
    name: "PREMIUM WEED",
    slug: "premium-weed",
    price: "$7-$10/g",
    banner: "/banners/bsc-real/tile-premium.webp",
    className: styles.bentoPremium,
  },
  {
    name: "AAA+ WEED",
    slug: "aaa-weed",
    price: "$5-$6/g",
    banner: "/banners/bsc-real/tile-aaa.webp",
    className: styles.bentoTile,
  },
  {
    name: "AA WEED",
    slug: "aa-weed",
    price: "$4/g",
    banner: "/banners/bsc-real/tile-aa.webp",
    className: styles.bentoTile,
  },
  {
    name: "BUDGET WEED",
    slug: "budget-weed",
    price: "$3/g",
    banner: "/banners/bsc-real/tile-budget.webp",
    className: styles.bentoTile,
  },
  {
    name: "EDIBLES • PREROLLS • MORE",
    slug: "items/edibles",
    price: "Shop Tiers",
    banner: "/banners/bsc-real/tile-menu-plus.webp",
    className: styles.bentoEdibles,
  },
];

/* ── Explore Categories Config (New Banners) ── */
const EXPLORE_CATEGORIES = [
  { name: "Nicotine Vapes", slug: "items/vapes", banner: "/banners/bsc-real/tile-nic-vape.webp" },
  { name: "THC Vapes", slug: "items/vape-disposables", banner: "/banners/bsc-real/tile-thc-vape.webp" },
  { name: "Concentrates", slug: "items/concentrates", banner: "/banners/bsc-real/tile-concentrates.webp" },
  { name: "Pre-Rolls", slug: "items/prerolls", banner: "/banners/bsc-real/tile-prerolls.webp" },
  { name: "Accessories", slug: "items/add-ons", banner: "/banners/bsc-real/tile-accessories.webp" },
  { name: "Magic Stuff", slug: "items/magic", banner: "/banners/bsc-real/tile-magic.webp" },
];

interface Review {
  name: string;
  comment: string;
  date: string;
}

interface ReviewStats {
  total: number;
  avg: number;
}

function pickFeaturedStrains(): FlowerProduct[] {
  const pool = [...allFlowers].filter((flower) => flower.image);
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  const picked: FlowerProduct[] = [];
  const tierCounts: Record<string, number> = {};
  for (const flower of pool) {
    if (picked.length >= 8) break;
    const tierCount = tierCounts[flower.tier] || 0;
    if (tierCount >= 2 || picked.some((item) => item.name === flower.name)) continue;
    picked.push(flower);
    tierCounts[flower.tier] = tierCount + 1;
  }
  return picked;
}

export default function HomePage() {
  const [featuredStrains, setFeaturedStrains] = useState<FlowerProduct[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsStats, setReviewsStats] = useState<ReviewStats | null>(null);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  /* ── 1. Fetch Client-Side Review Comments ── */
  useEffect(() => {
    const STORE_KEY = "BSC01";
    const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSu6iy9W3YKRzBYo_r96rXcbJsAOzlkzn5Rw9QMFnE0NbYSBgPxKX8kPRZNC9QcffZYj57155esmnqH/pub?gid=1555782756&single=true&output=csv";

    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`Review feed returned ${r.status}`);
        return r.text();
      })
      .then((raw) => {
        const rows = Papa.parse<Record<string, string>>(raw, {
          header: true,
          skipEmptyLines: true,
        }).data;

        const reviewsPool: Review[] = [];
        let totalVal: number | null = null;
        let avgVal: number | null = null;
        let hasStats = false;

        rows.forEach((row) => {
          if (row.StoreKey !== STORE_KEY) return;

          const rn = row.ReviewerName || "";
          if (rn === "__STATS__") {
            const parsedTotal = parseInt(row.Comment || "", 10);
            const parsedAvg = parseFloat(row.CreateTime || "");
            if (Number.isFinite(parsedTotal) && Number.isFinite(parsedAvg)) {
              totalVal = parsedTotal;
              avgVal = parsedAvg;
              hasStats = true;
            }
            return;
          }

          const comment = row.Comment || "";
          if (!comment || comment.length < 10) return;
          const name = rn || "Customer";
          const dateStr = row.CreateTime || "";
          reviewsPool.push({ name, comment, date: dateStr });
        });

        setReviews(reviewsPool.slice(0, 6));
        if (hasStats && totalVal !== null && avgVal !== null) {
          setReviewsStats({ total: totalVal, avg: avgVal });
        }
        setReviewsLoading(false);
      })
      .catch((err) => {
        console.warn("Reviews fetch failed:", err);
        setReviewsLoading(false);
      });
  }, []);

  /* ── 2. Build Featured Strains ── */
  useEffect(() => {
    const timer = window.setTimeout(() => setFeaturedStrains(pickFeaturedStrains()), 0);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className={styles.main}>
      <FleetAnnouncementBanner />
      {/* ── NAVBAR ── */}
      <Navbar />

      {/* ── WELCOME BANNER ── */}
      <section className={styles.welcomeBannerSection}>
        <div className={styles.welcomeBannerContainer}>
          <img
            src="/banners/bsc-real/welcome-real.webp"
            alt="Welcome to Brampton Smoke Cannabis at 132 Falby Rd Unit B, east Brampton"
            className={styles.welcomeBannerImg}
          />
        </div>
      </section>

      {/* ── BENTO MOSAIC HERO ── */}
      <section className={styles.hiringCallout} aria-label="Hiring at Brampton Smoke Cannabis" style={{ "--hire-accent": "#facc15", "--hire-accent-soft": "rgba(250, 204, 21, 0.14)", "--hire-accent-border": "rgba(250, 204, 21, 0.32)" } as CSSProperties}>
        <div className={styles.hiringCalloutInner}>
          <div>
            <span className={styles.hiringEyebrow}>Budtenders / Managers Wanted</span>
            <h2>Join Brampton Smoke</h2>
            <p>Falby Road needs friendly, determined people who can handle busy customer flow, stay reliable, and bring positive counter energy. Online applications only. Please do not call the store about hiring.</p>
          </div>
          <Link href="/careers/budtender" className={styles.hiringButton}>Apply Online</Link>
        </div>
      </section>

      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroStars} />

        <div className={styles.heroContent}>
          {/* Brand branding */}
          <div className={styles.brandBlock}>
            <img src="/storeFavicon.webp" alt="Brampton Smoke Cannabis Icon" style={{ height: "60px", width: "60px", objectFit: "contain", borderRadius: "8px", marginBottom: "8px" }} />
            <h1 className={styles.brandTitle}>Brampton Smoke Cannabis — Falby Rd Unit B, East Brampton</h1>
            <p className={styles.brandSub}>Walk-in shop at 132 Falby Rd Unit B · Open 24 Hours · Adults 19+</p>
            <div className={styles.brandBadge}>Open 24 Hours · Unit B</div>
          </div>

          {/* Bento Grid */}
          <div className={styles.bentoGrid}>
            {BENTO_TIERS.map((tier) => (
              <Link
                key={tier.slug}
                href={`/${tier.slug}`}
                className={`${styles.bentoTile} ${tier.className}`}
              >
                <div className={styles.bentoArt}>
                  <img
                    src={tier.banner}
                    alt={`${tier.name} Brampton Smoke Cannabis banner`}
                    className={styles.bentoArtImg}
                    loading="lazy"
                  />
                </div>
                <div className={styles.bentoTileOverlay} />
                <div className={styles.bentoTileContent}>
                  <span className={styles.bentoLabel}>{tier.name}</span>
                  <span className={styles.bentoPrice}>{tier.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPLORE CATEGORIES ── */}
      <section className={styles.categoriesSection} id="menu">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Explore Categories</h2>
            <p className={styles.sectionSubtitle}>
              Compare flower, pre-rolls, edibles, vapes, concentrates, accessories and cigarettes from the current Brampton selection.
            </p>
          </div>

          <div className={styles.categoriesGrid}>
            {EXPLORE_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className={styles.categoryCard}
              >
                <div className={styles.categoryCardArt}>
                  <img
                    src={cat.banner}
                    alt={`${cat.name} Brampton Smoke Cannabis banner`}
                    className={styles.categoryCardImg}
                    loading="lazy"
                  />
                </div>
                <div className={styles.categoryCardOverlay} />
                <div className={styles.categoryCardContent}>
                  <h3 className={styles.categoryCardName}>
                    {cat.name} <span className={styles.categoryCardArrow}>→</span>
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SmokePilotSpotlight
        storeName="Brampton Smoke Cannabis"
        locationLabel="East Brampton"
        cigaretteHref="/info/native-cigarettes-brampton"
        nicotineHref="/info/nicotine-vapes-brampton"
      />

      <WeedDiscoveryModule />

      {/* ── FEATURED PRODUCTS ── */}
      <section className={styles.featuredSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Featured Strains</h2>
            <p className={styles.sectionSubtitle}>
              A quick look at current flower options, including strain names, tier labels, weights and prices.
            </p>
          </div>

          <div className={styles.featuredScroll}>
            {featuredStrains.map((strain, i) => (
              <div key={`${strain.sku}-${i}`} className={styles.scrollItem}>
                <FlowerCard flower={strain} tierKey={strain.tier} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEO PANEL WRITE-UP ── */}
      <section className={styles.seoSection}>
        <div className={styles.container}>
          <div className={styles.seoPanel}>
            <h2 className={styles.seoPanelTitle}>Falby Unit B menu, then the east Brampton stop</h2>
            <p className={styles.seoPanelText}>
              Brampton Smoke Cannabis is the east Brampton walk-in shop at 132 Falby Rd Unit B, on the Falby Road corridor near Steeles Avenue East. This homepage is the visit hub: confirm the exact Unit B address, the Open 24 Hours schedule, the phone line, and the current menu before you travel.
            </p>
            <p className={styles.seoPanelText}>
              Unit B is the labelled entrance at 132 Falby Road. Use that unit letter when you set directions so you arrive at this storefront in the retail plaza, not a neighbouring door. Parking is available on-site in the retail plaza lot. If you are coming by transit, Brampton Transit routes that serve nearby Steeles Avenue are the practical approach already noted for this stop.
            </p>
            <p className={styles.seoPanelText}>
              Keep the Falby / Unit B facts together here: street address, postal code L6P 4L9, phone +1 (289) 819-5009, and 24-hour walk-in hours. Adults 19+ need valid government photo ID at the door. No appointment is required.
            </p>
            <p className={styles.seoPanelText}>
              Around the menu, shop by the lane you came for. Flower is grouped into five flower tiers — Exotic, Premium, AAA+, AA and Budget — so you can compare Weed and cannabis flower in Brampton without mixing those shelves with pre-rolls, edibles, THC vapes, concentrates, accessories or cigarettes. Menus change, so use the current menu and staff for product names, prices, and package details before you make the trip.
            </p>
            <p className={styles.seoPanelText}>
              Need a longer arrival guide for spotting Unit B, using the Falby and Steeles approach, parking, transit and ID? Open the visit page. The Google Business Profile website for this store stays on this homepage. The visit page is only a supporting how-to-reach guide for the east Brampton / Falby corridor.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.resourceBand} aria-label="Brampton Smoke Cannabis resources">
        <div className={styles.container}>
          <div className={styles.resourceBandInner}>
            <div>
              <p className={styles.resourceKicker}>Falby Road Resource Hub</p>
              <h2>Plan the 24-hour east Brampton stop.</h2>
              <p>
                Use the Unit B visit guide for the Falby corridor, then open flower-tier,
                menu, and Native smokes notes before you compare the current selection.
              </p>
            </div>
            <div className={styles.resourceActions}>
              <Link href="/visit">Visit Falby Unit B</Link>
              <Link href="/resources/falby-road-24-hour-visit-guide">24-Hour Visit Guide</Link>
              <Link href="/resources/menu-guide">Menu Guide</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLIENT-SIDE CUSTOMER FEEDBACK SHOWCASE ── */}
      <section className={styles.reviewsSection}>
        <div className={styles.container}>
          <div className={styles.reviewsHeader}>
            <h2 className={styles.sectionTitle}>Customer Feedback</h2>
            {reviewsStats && (
              <div className={styles.reviewsStarsSummary}>
                <span className={styles.reviewsStars}>★★★★★</span>
                <span className={styles.reviewsAvg}>
                  {reviewsStats.avg.toFixed(1)}
                </span>
                <span className={styles.reviewsCount}>
                  ({reviewsStats.total} reviews)
                </span>
              </div>
            )}
          </div>

          <div className={styles.reviewsGrid}>
            {reviewsLoading ? (
              <div className={styles.reviewsLoading}>Loading customer feedback...</div>
            ) : reviews.length === 0 ? (
              <div className={styles.reviewsLoading}>
                Customer feedback is unavailable right now.
              </div>
            ) : (
              reviews.map((rv, idx) => (
                <div key={idx} className={styles.rvCard}>
                  <div className={styles.rvTop}>
                    <div className={styles.rvAvatar}>
                      {rv.name.charAt(0).toUpperCase()}
                    </div>
                    <div className={styles.rvMeta}>
                      <span className={styles.rvName}>{rv.name}</span>
                      {rv.date && (
                        <span className={styles.rvDate}>
                          {new Date(rv.date).toLocaleDateString("en-CA", {
                            year: "numeric",
                            month: "short",
                          })}
                        </span>
                      )}
                    </div>
                    <span className={styles.rvStars}>★★★★★</span>
                  </div>
                  <p className={styles.rvText}>
                    {rv.comment.length > 180 ? `${rv.comment.substring(0, 177)}...` : rv.comment}
                  </p>
                </div>
              ))
            )}
          </div>

          <div className={styles.reviewCtaRow}>
          </div>
        </div>
      </section>

      {/* ── FAQS SECTION ── */}
      <section className={styles.faqSection}>
        <div className={styles.faqContainer}>
          <h2 className={styles.sectionTitle} style={{ textAlign: "center", marginBottom: "32px" }}>
            Frequently Asked Questions
          </h2>
          {HOME_FAQS.map((faq, i) => (
            <details key={i} className={styles.faqItem}>
              <summary className={styles.faqQuestion}>{faq.q}</summary>
              <p className={styles.faqAnswer}>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── STORE LOCATION GRID ── */}
      <section className={styles.storeSection} id="contact">
        <div className={styles.container}>
          <div className={styles.hubIntro}>
            <p className={styles.resourceKicker}>Homepage visit hub</p>
            <h2 className={styles.sectionTitle}>132 Falby Rd Unit B · East Brampton</h2>
            <p className={styles.hubLede}>
              Address, phone, hours, map and directions stay on this homepage. Use the
              visit page only when you need the Unit B door and corridor approach.
            </p>
          </div>
          <div className={styles.storeGrid}>
            <div className={styles.storeCard}>
              <span className={styles.storeIcon}>📍</span>
              <h3 className={styles.storeCardTitle}>Location</h3>
              <p className={styles.storeCardText}>
                {STORE.streetAddress}
                <br />
                {STORE.addressLocality}, {STORE.addressRegion} {STORE.postalCode}
                <br />
                <span className={styles.storeHighlight}>{STORE.crossStreet}</span>
              </p>
            </div>
            <div className={styles.storeCard}>
              <span className={styles.storeIcon}>🕒</span>
              <h3 className={styles.storeCardTitle}>Hours</h3>
              <p className={styles.storeCardText}>
                Open 7 Days a Week
                <br />
                <span className={styles.storeHighlight}>{STORE.hoursLabel}</span>
              </p>
            </div>
            <div className={styles.storeCard}>
              <span className={styles.storeIcon}>📞</span>
              <h3 className={styles.storeCardTitle}>Phone</h3>
              <p className={styles.storeCardText}>
                <a className={styles.storeLink} href={`tel:${STORE.phoneIntl}`}>
                  {STORE.phoneDisplay}
                </a>
                <br />
                <span className={styles.storeHighlight}>Adults 19+ · Walk in</span>
              </p>
            </div>
            <div className={styles.storeCard}>
              <span className={styles.storeIcon}>🗺️</span>
              <h3 className={styles.storeCardTitle}>Reach Unit B</h3>
              <p className={styles.storeCardText}>
                No appointment needed
                <br />
                <Link className={styles.storeLink} href="/visit">
                  Falby Unit B visit guide
                </Link>
              </p>
            </div>
          </div>

          <div className={styles.hubActions}>
            <a className={styles.hubAction} href={mapsDirectionsUrl}>
              Get directions
            </a>
            <Link className={styles.hubActionSecondary} href="/visit">
              How to find Unit B
            </Link>
          </div>

          <div className={styles.mapWrap}>
            <iframe
              title="Map of Brampton Smoke Cannabis at 132 Falby Rd Unit B"
              src={mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <Footer />
    </main>
  );
}
