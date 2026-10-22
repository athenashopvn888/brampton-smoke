import type { Metadata } from "next";
import { FULL_NAME_NAP } from "../lib/fullNameNap";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CODED_NAP } from "../lib/fleet/config";
import { getFleetContent } from "../lib/fleetContent";
import styles from "./contact.module.css";

export const dynamic = "force-dynamic";

const CONTACT_METADATA: Metadata = {
  title: "Contact Us — Brampton Smoke Cannabis | 132 Falby Rd Unit B, Brampton",
  description:
    "Visit Brampton Smoke Cannabis at 132 Falby Rd Unit B, Brampton, ON L6P 4L9. Open 24 hours, 7 days a week. Walk-ins welcome.",
  alternates: {
    canonical: "https://www.bramptonsmokecannabis.com/contact",
  },
  openGraph: {
    title: "Contact Brampton Smoke Cannabis — Brampton Dispensary",
    description:
      "132 Falby Rd Unit B, Brampton. Open 24 hours, 7 days a week. Premium cannabis, always fire.",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const fleet = await getFleetContent();
  if (!fleet.active) return CONTACT_METADATA;
  const description = fleet.pages.Contact?.metaDescription || "";
  if (!description || description === CONTACT_METADATA.description) return CONTACT_METADATA;
  return {
    ...CONTACT_METADATA,
    description,
    openGraph: { ...CONTACT_METADATA.openGraph, description },
  };
}

export default async function ContactPage() {
  const fleet = await getFleetContent();
  const street = fleet.active && fleet.nap.street !== CODED_NAP.street ? fleet.nap.street : "132 Falby Rd Unit B";
  const cityLine = fleet.active && fleet.nap.cityLine !== CODED_NAP.cityLine ? fleet.nap.cityLine : "Brampton, ON L6P 4L9";
  const intersection = fleet.active && fleet.nap.intersection !== CODED_NAP.intersection ? fleet.nap.intersection : "Falby Rd & Steeles Ave E";
  const hours = fleet.active && fleet.nap.hours !== CODED_NAP.hours ? fleet.nap.hours : null;
  return (
    <main className={styles.main}>
      <Navbar />

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.bannerFrame}>
          <img
            src="/banners/bsc-real/page-contact.webp"
            alt="Contact Brampton Smoke Cannabis"
            className={styles.bannerImg}
          />
          <h1 className={styles.heroTitle} data-fullname-contact-h1="" style={{ marginTop: "16px", textAlign: "center", fontSize: "clamp(22px, 4vw, 34px)", lineHeight: 1.2, overflowWrap: "anywhere" }}>Contact {FULL_NAME_NAP.fullName}</h1>
        </div>
      </section>

      {/* ── Info Cards ── */}
      <section className={styles.infoSection}>
        <div className={styles.container}>
          <div className={styles.infoGrid}>
            {/* Location */}
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>📍</div>
              <h2 className={styles.infoTitle}>Location</h2>
              <p className={styles.infoText}>
                {street}
                <br />
                {cityLine}
                <br />
                <span className={styles.infoMuted}>{intersection}</span>
              </p>
            </div>

            {/* Hours */}
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>🕒</div>
              <h2 className={styles.infoTitle}>Hours</h2>
              <div className={styles.hoursTable}>
                <div className={styles.hoursRow}>
                  <span>Monday</span>
                  <span className={styles.hoursTime}>24 Hours</span>
                </div>
                <div className={styles.hoursRow}>
                  <span>Tuesday</span>
                  <span className={styles.hoursTime}>24 Hours</span>
                </div>
                <div className={styles.hoursRow}>
                  <span>Wednesday</span>
                  <span className={styles.hoursTime}>24 Hours</span>
                </div>
                <div className={styles.hoursRow}>
                  <span>Thursday</span>
                  <span className={styles.hoursTime}>24 Hours</span>
                </div>
                <div className={styles.hoursRow}>
                  <span>Friday</span>
                  <span className={styles.hoursTime}>24 Hours</span>
                </div>
                <div className={styles.hoursRow}>
                  <span>Saturday</span>
                  <span className={styles.hoursTime}>24 Hours</span>
                </div>
                <div className={styles.hoursRow}>
                  <span>Sunday</span>
                  <span className={styles.hoursTime}>24 Hours</span>
                </div>
              </div>
              <div className={styles.openBadge}>
                <span className={styles.openDot}></span>
                {hours ?? "Open 24/7 — Never Closed"}
              </div>
            </div>

            {/* Walk-in */}
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>🔥</div>
              <h2 className={styles.infoTitle}>Walk In</h2>
              <p className={styles.infoText}>
                No appointment needed.
                <br />
                Just walk in and our staff will
                <br />
                help you compare menu categories and item details.
              </p>
              <div className={styles.featureList}>
                <div className={styles.featureItem}>
                  <span className={styles.featureCheck}>✓</span>
                  Flower tiers and menu categories
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.featureCheck}>✓</span>
                  Clear product and category details
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.featureCheck}>✓</span>
                  Knowledgeable budtenders
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.featureCheck}>✓</span>
                  Debit &amp; cash accepted
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className={styles.mapSection}>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <Footer />
    </main>
  );
}
