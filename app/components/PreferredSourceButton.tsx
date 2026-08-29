import Script from "next/script";
import styles from "./GBPLandingPage.module.css";

const preferredSourceAttribute = {
  "google-add-preferred-source-btn": "",
};

export default function PreferredSourceButton() {
  return (
    <section className={`${styles.section} ${styles.preferredSources}`} aria-labelledby="google-preferred-sources-heading">
      <Script async src="https://news.google.com/swg/js/v1/publisher.js" strategy="afterInteractive" />
      <h2 id="google-preferred-sources-heading" className={styles.h2}>Google Preferred Sources</h2>
      <p className={styles.infoText}>
        You can choose bramptonsmokecannabis.com as a preferred source in your Google Search preferences. This is a personal setting for your Google experience.
      </p>
      <div className={styles.preferredSourcesControl} {...preferredSourceAttribute} />
      <a
        className={styles.preferredSourcesFallback}
        href="https://www.google.com/preferences/source?q=bramptonsmokecannabis.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Open source preferences in Google
      </a>
    </section>
  );
}
