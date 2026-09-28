/**
 * Per-store hiring lines for the in-store TV boards.
 * Set this to null to hide the hiring lines. The ribbon still shows
 * the store policy when TV_POLICY_MESSAGE is set.
 * No sheet or API lookup.
 */
export type TvHiringConfig = {
  store: string;
  headline: string;
  role: string;
  cta: string;
  url: string;
  displayUrl: string;
};

/** BSC01 hiring is off. Replace null with a TvHiringConfig to rotate hiring lines. */
export const tvHiring: TvHiringConfig | null = null;
