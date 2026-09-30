import { HOME_TITLE } from "./lib/homeDelivery";
import type { Metadata } from "next";
import Papa from "papaparse";
import HomePage, { type Review, type ReviewStats } from "./components/HomePage";
import { JsonLd } from "./components/JsonLd";
import { STORE, HOME_FAQS, faqPageJsonLd } from "./lib/storeSeo";

export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description:
    "Brampton Smoke Cannabis is the east Brampton walk-in shop at 132 Falby Rd Unit B. Open 24 Hours. Call +1 (289) 819-5009. Adults 19+.",
  alternates: {
    canonical: STORE.origin,
  },
  openGraph: {
    title: HOME_TITLE,
    description:
      "Visit Brampton Smoke Cannabis at 132 Falby Rd Unit B, east Brampton. Open 24 Hours. Adults 19+.",
    url: STORE.url,
  },

  twitter: { card: "summary_large_image", title: HOME_TITLE },
};

const REVIEWS_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSu6iy9W3YKRzBYo_r96rXcbJsAOzlkzn5Rw9QMFnE0NbYSBgPxKX8kPRZNC9QcffZYj57155esmnqH/pub?gid=1555782756&single=true&output=csv";

async function getReviews(): Promise<{ reviews: Review[]; stats: ReviewStats | null }> {
  try {
    const response = await fetch(REVIEWS_URL, { next: { revalidate: 3600 } });
    if (!response.ok) throw new Error(`Review feed returned ${response.status}`);

    const rows = Papa.parse<Record<string, string>>(await response.text(), {
      header: true,
      skipEmptyLines: true,
    }).data;
    const reviews: Review[] = [];
    let stats: ReviewStats | null = null;

    for (const row of rows) {
      if (row.StoreKey !== "BSC01") continue;
      if (row.ReviewerName === "__STATS__") {
        const total = Number.parseInt(row.Comment || "", 10);
        const avg = Number.parseFloat(row.CreateTime || "");
        if (Number.isFinite(total) && Number.isFinite(avg)) stats = { total, avg };
        continue;
      }
      if (!row.Comment || row.Comment.length < 10) continue;
      reviews.push({
        name: row.ReviewerName || "Customer",
        comment: row.Comment,
        date: row.CreateTime || "",
      });
    }

    return { reviews: reviews.slice(0, 6), stats };
  } catch (error) {
    console.warn("Reviews fetch failed:", error);
    return { reviews: [], stats: null };
  }
}

export default async function Page() {
  const { reviews, stats } = await getReviews();
  return (
    <>
      <JsonLd data={faqPageJsonLd(HOME_FAQS)} />
      <HomePage initialReviews={reviews} initialReviewStats={stats} />
    </>
  );
}
