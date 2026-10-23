import type { Metadata } from "next";
import CigaretteStateProvider from "../components/CigaretteStateProvider";
import { getCigaretteSnapshot, toPublicCigaretteState } from "../lib/cigaretteFeed";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Brampton Smoke Cannabis In-Store Menu Display",
  description: "Operational in-store menu display for Brampton Smoke Cannabis.",
  robots: { index: false, follow: false },
};

export default async function TvTwoLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cigarettes = toPublicCigaretteState(await getCigaretteSnapshot());
  return <CigaretteStateProvider value={cigarettes}>{children}</CigaretteStateProvider>;
}
