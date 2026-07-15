"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FlowerCard from "./components/FlowerCard";
import { allFlowers } from "./lib/products";

/* ── Bento Mosaic Config ── */
const BENTO_TIERS = [
  {
    name: "EXOTICS",
    slug: "exotic",
    price: "$10-$12/g",
    banner: "/banners/bsc-real/tile-exotic.webp",
    className: styles.bentoExotic,
  },
  {
    name: "PREMIUM",
    slug: "premium",
    price: "$7-$10/g",
    banner: "/banners/bsc-real/tile-premium.webp",
    className: styles.bentoPremium,
  },
  {
    name: "AAA+",
    slug: "aaa",
    price: "$5-$6/g",
    banner: "/banners/bsc-real/tile-aaa.webp",
    className: styles.bentoTile,
  },
  {
    name: "AA",
    slug: "aa",
    price: "$4/g",
    banner: "/banners/bsc-real/tile-aa.webp",
    className: styles.bentoTile,
  },
  {
    name: "BUDGET",
    slug: "budget",
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
  { name: "THC Vapes", slug: "items/vapes", banner: "/banners/bsc-real/tile-thc-vape.webp" },
  { name: "Nic Vapes", slug: "items/vape-disposables", banner: "/banners/bsc-real/tile-nic-vape.webp" },
  { name: "Concentrates", slug: "items/concentrates", banner: "/banners/bsc-real/tile-concentrates.webp" },
  { name: "Pre-Rolls", slug: "items/prerolls", banner: "/banners/bsc-real/tile-prerolls.webp" },
  { name: "Accessories", slug: "items/add-ons", banner: "/banners/bsc-real/tile-accessories.webp" },
  { name: "Cigarettes", slug: "items/cigarettes", banner: "/banners/bsc-real/tile-cigarettes.webp" },
  { name: "Magic Stuff", slug: "items/magic", banner: "/banners/bsc-real/tile-magic.webp" },
];

/* ── Local FAQs for Jane St ── */
const LOCAL_FAQS = [
  {
    q: "What are the hours for Brampton Smoke Cannabis?",
    a: "Brampton Smoke Cannabis at 132 Falby Rd Unit B, Brampton is Open 24 Hours a day, 7 days a week. Walk in anytime — no appointment needed.",
  },
  {
    q: "What cannabis products do you carry?",
    a: "We carry five tiers of premium flower: Exotic ($10-$12/g), Premium ($7-$10/g), AAA+ ($5-$6/g), AA ($4/g), and Budget ($3/g), plus a wide variety of edibles, prerolls, vapes, and concentrates.",
  },
  {
    q: "Where is Brampton Smoke Cannabis located?",
    a: "We are located at 132 Falby Rd Unit B, Brampton, ON L6P 4L9. Use the current menu and resources before visiting. Parking is available on-site in the retail plaza lot.",
  },
  {
    q: "What is the cheapest weed at Brampton Smoke Cannabis?",
    a: "Our budget flower starts at just $3/g. We also offer AA daily drivers from $4/g and AAA+ heavy hitters from $5-$6/g. View our budget menu for our latest deals.",
  },
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

export default function HomePage() {
  const [featuredStrains, setFeaturedStrains] = useState<any[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsStats, setReviewsStats] = useState<ReviewStats | null>(null);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  /* ── 1. Fetch Client-Side Review Comments ── */
  useEffect(() => {
    const STORE_KEY = "BSC01";
    const SHEET_ID = "1-KeuyKFKprbU-Vl_qVQiZkEKMX_i5CmdScTToNTdkUY";
    const SHEET_NAME = "WEBSITE_REVIEWS";
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(SHEET_NAME)}`;

    fetch(url)
      .then((r) => r.text())
      .then((raw) => {
        const jsonStart = raw.indexOf("{");
        const jsonEnd = raw.lastIndexOf("}");
        const jsonString = raw.substring(jsonStart, jsonEnd + 1);
        const json = JSON.parse(jsonString);
        const rows = json.table.rows;
        const cols = json.table.cols;

        const colMap: Record<string, number> = {};
        cols.forEach((col: any, idx: number) => {
          if (col.label) colMap[col.label.trim()] = idx;
        });

        const skIdx = colMap["StoreKey"] !== undefined ? colMap["StoreKey"] : 0;
        const rnIdx = colMap["ReviewerName"] !== undefined ? colMap["ReviewerName"] : 1;
        const cmIdx = colMap["Comment"] !== undefined ? colMap["Comment"] : 2;
        const dtIdx = colMap["CreateTime"] !== undefined ? colMap["CreateTime"] : 3;

        const reviewsPool: Review[] = [];
        let totalVal: number | null = null;
        let avgVal: number | null = null;
        let hasStats = false;

        rows.forEach((row: any) => {
          if (!row.c) return;
          const sk = row.c[skIdx] ? row.c[skIdx].v || "" : "";
          if (sk !== STORE_KEY) return;

          const rn = row.c[rnIdx] ? row.c[rnIdx].v || "" : "";
          if (rn === "__STATS__") {
            const parsedTotal = parseInt(row.c[cmIdx] ? row.c[cmIdx].v : "", 10);
            const parsedAvg = parseFloat(row.c[dtIdx] ? row.c[dtIdx].v : "");
            if (Number.isFinite(parsedTotal) && Number.isFinite(parsedAvg)) {
              totalVal = parsedTotal;
              avgVal = parsedAvg;
              hasStats = true;
            }
            return;
          }

          const comment = row.c[cmIdx] ? row.c[cmIdx].v || "" : "";
          if (!comment || comment.length < 10) return;
          const name = rn || "Customer";
          const dateStr = row.c[dtIdx] ? row.c[dtIdx].v || "" : "";
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
    const pool = [...allFlowers].filter((f) => f.image);
    // Shuffle pool securely
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    const picked: typeof pool = [];
    const tierCounts: Record<string, number> = {};

    for (const f of pool) {
      if (picked.length >= 8) break;
      const tc = tierCounts[f.tier] || 0;
      if (tc >= 2) continue; // max 2 per tier
      if (picked.some((p) => p.name === f.name)) continue; // avoid exact duplicates
      picked.push(f);
      tierCounts[f.tier] = tc + 1;
    }

    setFeaturedStrains(picked);
  }, []);

  return (
    <main className={styles.main}>
      {/* ── NAVBAR ── */}
      <Navbar />

      {/* ── WELCOME BANNER ── */}
      <section className={styles.welcomeBannerSection}>
        <div className={styles.welcomeBannerContainer}>
          <img
            src="/banners/bsc-real/welcome-real.webp"
            alt="Welcome to Brampton Smoke Cannabis — Premium Brampton Cannabis Dispensary"
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
            <h1 className={styles.brandTitle}>BRAMPTON SMOKE CANNABIS</h1>
            <p className={styles.brandSub}>Premium Cannabis Dispensary</p>
            <div className={styles.brandBadge}>Open 24 Hours</div>
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
              Pick the category that matches the visit, then compare the current menu details.
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

      {/* ── FEATURED PRODUCTS ── */}
      <section className={styles.featuredSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Featured Strains</h2>
            <p className={styles.sectionSubtitle}>
              A quick look at flower options from the store menu. Open the item page for current details before choosing.
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
            <h2 className={styles.seoPanelTitle}>Shop The Menu With A Plan</h2>
            <p className={styles.seoPanelText}>
              Start with the store page, then choose the product category that fits the visit. Flower, pre-rolls, edibles, THC vapes, concentrates, accessories, and cigarettes each shop differently.
            </p>
            <p className={styles.seoPanelText}>
              If cheap weed or affordable weed is the goal, start with Budget and AA flower before moving up. If premium flower or exotic flower is the mood, open those lanes first and compare the current details there.
            </p>
            <p className={styles.seoPanelText}>
              Menus change, so use the current menu and staff for product names, prices, and package details before you make the trip.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.resourceBand} aria-label="Brampton Smoke Cannabis resources">
        <div className={styles.container}>
          <div className={styles.resourceBandInner}>
            <div>
              <p className={styles.resourceKicker}>Falby Road Resource Hub</p>
              <h2>BSC guides for the 24-hour Brampton stop.</h2>
              <p>
                Use BSC resources for Falby Road visit planning, flower tier shopping,
                value lanes, pre-rolls, and Native smokes before you compare the current menu.
              </p>
            </div>
            <div className={styles.resourceActions}>
              <Link href="/resources/falby-road-24-hour-visit-guide">24-Hour Visit Guide</Link>
              <Link href="/resources/menu-guide">Menu Guide</Link>
              <Link href="/resources/native-smokes">Native Smokes</Link>
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
          {LOCAL_FAQS.map((faq, i) => (
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
          <div className={styles.storeGrid}>
            <div className={styles.storeCard}>
              <span className={styles.storeIcon}>📍</span>
              <h3 className={styles.storeCardTitle}>Location</h3>
              <p className={styles.storeCardText}>
                132 Falby Rd Unit B
                <br />
                Brampton, ON L6P 4L9
                <br />
              </p>
            </div>
            <div className={styles.storeCard}>
              <span className={styles.storeIcon}>🕒</span>
              <h3 className={styles.storeCardTitle}>Hours</h3>
              <p className={styles.storeCardText}>
                Open 7 Days a Week
                <br />
                <span className={styles.storeHighlight}>Open 24 Hours</span>
              </p>
            </div>
            <div className={styles.storeCard}>
              <span className={styles.storeIcon}>🔥</span>
              <h3 className={styles.storeCardTitle}>Walk In</h3>
              <p className={styles.storeCardText}>
                No appointment needed
                <br />
                <span className={styles.storeHighlight}>Falby Rd & Steeles Ave E, Brampton</span>
              </p>
            </div>
          </div>

          {/* Map wrapper */}
          <div className={styles.mapWrap}>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <Footer />
    </main>
  );
}
