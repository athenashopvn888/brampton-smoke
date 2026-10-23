/** TV2 board order. The cigarettes card is included only while the feed tv flag is on. */
export const TV2_CARD_IDS = [
  "PREROLLS_ADDONS",
  "VAPES",
  "EDIBLES",
  "CONCENTRATES",
  "CIGARETTES",
  "MAGIC",
] as const;

export function visibleTv2CardIds(tvOn: boolean): string[] {
  if (tvOn) return [...TV2_CARD_IDS];
  return TV2_CARD_IDS.filter((id) => id !== "CIGARETTES");
}

/**
 * Items drawn on the cigarettes card. When the feed flag is off the card is
 * omitted, so nothing from this shelf is shown. When it is on, real cigarettes
 * and wraps/pouches both stay.
 */
export function cigaretteBoardItems<T extends { category?: string; name?: string; slug?: string }>(
  items: readonly T[],
  tvOn: boolean,
): T[] {
  if (!tvOn) return [];
  return items.filter((item) => (item.category || "").toUpperCase() === "CIGARETTES");
}
