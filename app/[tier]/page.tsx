import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FlowerCard from "../components/FlowerCard";
import {
  getFlowersByTier,
  getTierFromSlug,
  TIER_CONFIG,
} from "../lib/products";
import { TIER_SEO } from "../lib/tierSeoContent";
import { STORE } from "../lib/storeSeo";
import styles from "./tier.module.css";
import { getTierGuideLinks } from "../lib/guideRegistry";

/* -- Generate all tier pages at build -- */
export function generateStaticParams() {
  return Object.values(TIER_CONFIG).map((t) => ({ tier: t.slug }));
}

/* -- Dynamic SEO metadata -- */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ tier: string }>;
}): Promise<Metadata> {
  const { tier: tierSlug } = await params;
  const tierInfo = getTierFromSlug(tierSlug);
  if (!tierInfo) return {};
  const seo = TIER_SEO[tierInfo.key];

  return {
    title: { absolute: `${tierInfo.config.name} & Cannabis Flower | Falby Rd, East Brampton | Brampton Smoke Cannabis` },
    description: seo.metaDescription,
    alternates: {
      canonical: `https://www.bramptonsmokecannabis.com/${tierSlug}`,
    },
    openGraph: {
      title: seo.socialTitle,
      description: seo.socialDescription,
      url: `https://www.bramptonsmokecannabis.com/${tierSlug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.socialTitle,
      description: seo.socialDescription,
    },
  };
}

/* -- Page component -- */
export default async function TierPage({
  params,
}: {
  params: Promise<{ tier: string }>;
}) {
  const { tier: tierSlug } = await params;
  const tierInfo = getTierFromSlug(tierSlug);
  if (!tierInfo) notFound();

  const flowers = getFlowersByTier(tierInfo.key);
  const { config } = tierInfo;
  const guideLinks = getTierGuideLinks(`/${tierSlug}`);
  const seo = TIER_SEO[tierInfo.key];

  const saleFlowers = flowers.filter((f) => f.isSale);
  const regularFlowers = flowers.filter((f) => !f.isSale);
  const hotFlowers = flowers.filter((f) => f.isHot);
  const canonicalUrl = `${STORE.origin}/${tierSlug}`;
  const schema = {"@context":"https://schema.org","@graph":[{"@type":"CollectionPage","@id":`${canonicalUrl}#webpage`,url:canonicalUrl,name:`${config.name} & Cannabis Flower | Falby Rd, East Brampton | Brampton Smoke Cannabis`,description:seo.metaDescription,isPartOf:{"@id":`${STORE.origin}/#website`},about:{"@id":STORE.id},breadcrumb:{"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:STORE.origin},{"@type":"ListItem",position:2,name:config.name,item:canonicalUrl}]},mainEntity:{"@type":"ItemList",numberOfItems:flowers.length,itemListElement:flowers.map((flower,index)=>({"@type":"ListItem",position:index+1,name:flower.name,url:`${STORE.origin}/flower/${flower.slug}`}))}}]};

  return (
    <main className={styles.main}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,"\\u003c")}} />
      <Navbar />

      {/* ── Banner Image (standalone, no overlay text) ── */}
      <section className={styles.bannerSection}>
        <img
          src={config.banner}
          alt={seo.imageAlt}
          className={styles.bannerImg}
        />
      </section>

      {/* ── Hero Content BELOW banner ── */}
      <section
        className={styles.heroInfo}
        style={{ "--tier-color": config.color } as React.CSSProperties}
      >
        <div className={styles.heroInfoInner}>
          <div className={styles.heroLeft}>
            <div className={styles.heroTitleRow}>
              <span className={styles.heroIcon}>{config.icon}</span>
              <h1 className={styles.heroTitle}>
                <span style={{ color: config.color }}>{config.name} &amp; Cannabis Flower at Falby Road Unit B, East Brampton</span>
              </h1>
            </div>
            <p className={styles.heroTagline}>{config.tagline}</p>
            <div className={styles.heroStats}>
              <span className={styles.stat}>
                <strong>{flowers.length}</strong> strains
              </span>
              {saleFlowers.length > 0 && (
                <span className={styles.statSale}>
                  🔥 {saleFlowers.length} on sale
                </span>
              )}
              {hotFlowers.length > 0 && (
                <span className={styles.statHot}>
                  ⚡ {hotFlowers.length} hot picks
                </span>
              )}
            </div>
          </div>

          <div className={styles.heroRight}>
            <div className={styles.unitPriceBox}>
              <span className={styles.unitPriceLabel}>Starting at</span>
              <span className={styles.unitPriceValue}>${config.unitPrice}/g</span>
            </div>

            {(config.deal3g || config.deal6g) && (
            <div className={styles.dealRow}>
              {config.deal3g && (
              <div className={styles.dealBox}>
                <div className={styles.dealLabel}>🎁 {config.deal3g.total.toLowerCase()} {config.name} Bundle</div>
                <div className={styles.dealPrice}>
                  = <strong>${config.deal3g.price}</strong> / {config.deal3g.total}
                </div>
              </div>
              )}
              {config.deal6g && (
                <div className={styles.dealBox}>
                  <div className={styles.dealLabel}>🎁 {config.deal6g.total.toLowerCase()} {config.name} Bundle</div>
                  <div className={styles.dealPrice}>
                    = <strong>${config.deal6g.price}</strong> / {config.deal6g.total}
                  </div>
                </div>
              )}
            </div>
            )}
          </div>
        </div>
      </section>

      {guideLinks.length > 0 && (
        <nav className={styles.guideStrip} aria-label={`Popular ${config.name} strain guides`}>
          <div className={styles.container}><h2>Popular strain guides</h2><div>
            {guideLinks.map((guide) => <Link key={guide.slug} href={`/guides/${guide.slug}`}>{guide.name}</Link>)}
          </div></div>
        </nav>
      )}

      {/* Product grid */}
      <section className={styles.products}>
        <div className={styles.container}>
          {saleFlowers.length > 0 && (
            <>
              <h2 className={styles.sectionTitle}>
                🔥 <span style={{ color: "#f43f5e" }}>On Sale</span>
              </h2>
              <div className={styles.grid}>
                {saleFlowers.map((f) => (
                  <FlowerCard
                    key={`${f.sku}-${f.slug}`}
                    flower={f}
                    tierKey={tierInfo.key}
                  />
                ))}
              </div>
            </>
          )}

          <h2 className={styles.sectionTitle}>
            <span style={{ color: config.color }}>{seo.strainHeading}</span>
          </h2>
          <div className={styles.grid}>
            {regularFlowers.map((f) => (
              <FlowerCard
                key={`${f.sku}-${f.slug}`}
                flower={f}
                tierKey={tierInfo.key}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── SEO Content ── */}
      {seo && (
        <section className={styles.seoSection}>
          <div className={styles.container}>
            <h2 className={styles.seoMainTitle}>About the {config.name} Flower Tier</h2>
            <p className={styles.seoIntro}>{seo.seoIntro}</p>

            {seo.sections.map((s, i) => (
              <div key={i} className={styles.seoBlock}>
                <h3 className={styles.seoHeading}>{s.heading}</h3>
                <p className={styles.seoBody}>{s.body}</p>
              </div>
            ))}

            <div className={styles.compareSection}>
              <h3 className={styles.compareTitle}>Compare Weed &amp; Flower Tiers</h3>
              <p className={styles.seoBody}>
                Brampton Smoke Cannabis organizes cannabis flower into five tiers. Compare the current listings in each section and move directly to the flower tier you want to explore next.
              </p>
              <div className={styles.compareGrid}>
                {[
                  ["Exotic Weed & Flower", "/exotic-weed", "Explore the Exotic flower tier."],
                  ["Premium Weed & Flower", "/premium-weed", "Explore the Premium flower tier."],
                  ["AAA+ Weed & Flower", "/aaa-weed", "Explore the AAA+ flower tier."],
                  ["AA Weed & Flower", "/aa-weed", "Explore the AA flower tier."],
                  ["Budget Weed & Flower", "/budget-weed", "Explore the Budget flower tier."],
                ].map(([label, href, description]) => (
                  <Link key={href} href={href} className={styles.compareCard}>
                    <strong>{label}</strong>
                    <span>{description}</span>
                  </Link>
                ))}
              </div>
              <p className={styles.ownerLink}>
                Looking for the broader Weed dispensary guide?{" "}
                <Link href="/weed-dispensary-brampton/">
                  Explore Brampton Smoke Cannabis&apos;s Weed and Cannabis store information.
                </Link>
              </p>
            </div>

            {/* FAQ Accordion */}
            {seo.faqs.length > 0 && (
              <div className={styles.faqSection}>
                <h3 className={styles.seoHeading}>Frequently Asked Questions</h3>
                {seo.faqs.map((faq, i) => (
                  <details key={i} className={styles.faqItem}>
                    <summary className={styles.faqQuestion}>{faq.q}</summary>
                    <p className={styles.faqAnswer}>{faq.a}</p>
                  </details>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
