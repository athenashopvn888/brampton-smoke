import styles from "./GoogleReviewButton.module.css";

/**
 * BSC01 (Brampton Smoke Cannabis) Google "write a review" link.
 * Place ID comes from this store's own Google Business Profile record
 * (Business Information API metadata.placeId / newReviewUri), cross-checked with review-qrs/review-links.csv.
 * Single-store site: links straight to this store's review form, no location picker.
 * Never reuse another store's place ID.
 */
export const BSC01_GOOGLE_PLACE_ID = "ChIJXfDoWpI9K4gRYd41mF3PBpU";
export const BSC01_GOOGLE_REVIEW_URL = `https://search.google.com/local/writereview?placeid=${BSC01_GOOGLE_PLACE_ID}`;

export default function GoogleReviewButton() {
  return (
    <a
      href={BSC01_GOOGLE_REVIEW_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.reviewBtn}
      aria-label="Leave Brampton Smoke Cannabis a Google review (opens in a new tab)"
      data-review-cta="google"
    >
      <span className={styles.reviewStar} aria-hidden="true">
        <svg viewBox="0 0 24 24" width="13" height="13" focusable="false">
          <path fill="currentColor" d="M12 2.6l2.85 5.78 6.38.93-4.62 4.5 1.09 6.35L12 17.16l-5.7 3 1.09-6.35-4.62-4.5 6.38-.93z" />
        </svg>
      </span>
      <span>
        Review<span className={styles.reviewLong}>{" us on Google"}</span>
      </span>
    </a>
  );
}
