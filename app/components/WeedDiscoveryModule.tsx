import Link from "next/link";
import styles from "./WeedDiscoveryModule.module.css";

export function WeedDiscoveryModule() {
  return (
    <section className={styles.section} aria-labelledby="weed-discovery-title">
      <div className={styles.inner}>
        <p className={styles.kicker}>Open 24 Hours · Adults 19+</p>
        <h2 id="weed-discovery-title">Looking for Weed in Brampton?</h2>
        <p>
          Brampton Smoke Cannabis is open 24 hours at <strong>132 Falby Rd Unit B</strong>.
          Explore flower tiers, pre-rolls, edibles, THC vapes, concentrates and more.
        </p>
        <div className={styles.actions}>
          <Link href="/weed-dispensary-brampton/" className={styles.primary}>Explore Weed &amp; Cannabis</Link>
          <Link href="/resources/flower-guide" className={styles.secondary}>Explore the Flower Guide</Link>
        </div>
      </div>
    </section>
  );
}
