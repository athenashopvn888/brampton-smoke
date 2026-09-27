import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brampton Smoke Cannabis In-Store Menu Display",
  description: "Operational in-store menu display for Brampton Smoke Cannabis.",
  robots: { index: false, follow: false },
};

export default function TvTwoLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
