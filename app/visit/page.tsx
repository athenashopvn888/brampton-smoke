import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import { JsonLd } from "../components/JsonLd";
import Navbar from "../components/Navbar";
import {
  STORE,
  VISIT_FAQS,
  faqPageJsonLd,
  mapsDirectionsUrl,
  mapsEmbedUrl,
} from "../lib/storeSeo";
import styles from "./visit.module.css";

export const metadata: Metadata = {
  title: "Visit 132 Falby Rd Unit B in East Brampton",
  description:
    "How to reach Brampton Smoke Cannabis at 132 Falby Rd Unit B: Unit B entrance, Falby / Steeles approach, plaza parking, transit notes, and 19+ ID. Open 24 Hours.",
  alternates: {
    canonical: `${STORE.origin}/visit`,
  },
  openGraph: {
    title: "Visit 132 Falby Rd Unit B | Brampton Smoke Cannabis",
    description:
      "Unit B findability, Falby Road approach, parking, transit and 19+ ID for the east Brampton walk-in shop.",
    url: `${STORE.origin}/visit`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function VisitPage() {
  return (
    <>
      <JsonLd data={faqPageJsonLd(VISIT_FAQS)} />
      <Navbar />
      <main className={styles.main}>
        <section className={styles.hero}>
          <p className={styles.kicker}>East Brampton · Falby · Unit B</p>
          <h1>Find Unit B at 132 Falby Road</h1>
          <p className={styles.lede}>
            This is the how-to-reach guide for Brampton Smoke Cannabis. The homepage
            remains the visit hub for the menu, NAP, hours and map. Use this page when
            you need the Unit B door, the Falby corridor approach, parking, transit and
            ID details before you walk in.
          </p>
          <div className={styles.actions}>
            <a className={styles.primary} href={mapsDirectionsUrl}>
              Directions to Unit B
            </a>
            <Link className={styles.secondary} href="/#contact">
              Homepage visit hub
            </Link>
          </div>
        </section>

        <section className={styles.nap} aria-label="Falby Unit B NAP">
          <h2>Exact store facts for the trip</h2>
          <div className={styles.napGrid}>
            <div className={styles.napCard}>
              <h3>Address</h3>
              <p>
                {STORE.streetAddress}
                <br />
                {STORE.addressLocality}, {STORE.addressRegion} {STORE.postalCode}
              </p>
            </div>
            <div className={styles.napCard}>
              <h3>Phone</h3>
              <p>
                <a href={`tel:${STORE.phoneIntl}`}>{STORE.phoneDisplay}</a>
              </p>
            </div>
            <div className={styles.napCard}>
              <h3>Hours</h3>
              <p>{STORE.hoursDetail}</p>
            </div>
          </div>
          <div className={styles.mapWrap}>
            <iframe
              title="Map of Brampton Smoke Cannabis at 132 Falby Rd Unit B"
              src={mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        <section className={styles.section}>
          <h2>Spot the Unit B entrance</h2>
          <p className={styles.copy}>
            The listed address is 132 Falby Road, and the door you want is Unit B.
            Put that unit letter in your maps pin. The shop sits in a retail plaza,
            so neighbouring doors can look close once you are in the lot. Read the
            unit label on the storefront before you walk in.
          </p>
          <p className={styles.copy}>
            If a navigation app drops the pin on the plaza generally, use the Unit B
            wording plus {STORE.postalCode} to tighten the last few metres. Staff
            can confirm the door on {STORE.phoneDisplay} if the plaza feels busy
            when you arrive.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Falby corridor approach from Steeles</h2>
          <p className={styles.copy}>
            Brampton Smoke Cannabis is an east Brampton walk-in on the Falby Road
            corridor. The local orientation already used on the site is Falby Road
            and Steeles Avenue East. Come along Steeles, turn toward Falby, and
            enter the plaza that lists 132 Falby Road.
          </p>
          <p className={styles.copy}>
            This page does not invent extra landmarks, shortcuts or delivery zones.
            It only describes the Falby / Unit B stop and the Steeles approach that
            already appears with the store. When the last turn is unclear, follow
            the map on this page or the homepage hub rather than a generic
            “Brampton dispensary” pin.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Parking, transit and 19+ ID</h2>
          <ul className={styles.list}>
            <li>{STORE.parkingNote} Stay in a marked stall and walk to the Unit B door.</li>
            <li>{STORE.transitNote} Check the current trip before you leave.</li>
            <li>
              {STORE.ageNote} This is a walk-in shop for adults. No appointment is
              required, and the listed hours are {STORE.hoursLabel}.
            </li>
          </ul>
        </section>

        <section className={styles.faqSection} id="faq">
          <h2>Falby Unit B visit questions</h2>
          {VISIT_FAQS.map((faq) => (
            <article className={styles.faqItem} key={faq.q}>
              <h3>{faq.q}</h3>
              <p className={styles.faqAnswer}>{faq.a}</p>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
