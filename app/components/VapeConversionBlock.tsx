import { mapsDirectionsUrl, STORE } from "../lib/storeSeo";
import styles from "./VapeConversionBlock.module.css";

const HOLD_MESSAGE = encodeURIComponent(
  "Please hold a nicotine vape for pickup. Brand: [brand]. Flavour: [flavour]. I will bring photo ID.",
);

export const vapeHoldSmsUrl = `sms:${STORE.phoneIntl}?&body=${HOLD_MESSAGE}`;

export default function VapeConversionBlock({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <section
      className={`${styles.block} ${compact ? styles.compact : ""}`}
      aria-labelledby="vape-actions-heading"
    >
      <div className={styles.copy}>
        <p className={styles.eyebrow}>Brampton Smoke Cannabis · Falby Road Unit B</p>
        <h2 id="vape-actions-heading">Check the current vape shelf before pickup</h2>
        <p>
          Call, open directions, or start a customer-requested text. A hold is confirmed only
          when store staff reply. Product names, flavours and prices can change with the live feed.
        </p>
      </div>
      <div className={styles.actions}>
        <a href={`tel:${STORE.phoneIntl}`}>Call {STORE.phoneDisplay}</a>
        <a href={mapsDirectionsUrl} target="_blank" rel="noreferrer">Get directions</a>
        <a href={vapeHoldSmsUrl}>Text to hold</a>
      </div>
      <p className={styles.notice}>Adults 19+. Valid government photo ID required. Nicotine is addictive.</p>
    </section>
  );
}
