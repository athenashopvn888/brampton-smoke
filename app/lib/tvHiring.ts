/**
 * Per-store hiring ribbon config for the in-store TV boards.
 * Set this to null to hide the ribbon. No sheet or API lookup.
 */
export type TvHiringConfig = {
  store: string;
  headline: string;
  role: string;
  cta: string;
  url: string;
  displayUrl: string;
};

/** BSC01 hiring is off. Replace null with a TvHiringConfig to show the ribbon. */
export const tvHiring: TvHiringConfig | null = null;
