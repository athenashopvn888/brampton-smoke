import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AuthorityLanding from "../components/AuthorityLanding";
import { AUTHORITY_PAGES } from "../lib/authorityPages";
import { getCigaretteSnapshot, toPublicCigaretteState } from "../lib/cigaretteFeed";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: { absolute: "Native Cigarettes Falby Rd, East Brampton | Brampton Smoke Cannabis" },
  description: AUTHORITY_PAGES.cigarettes.summary,
  alternates: { canonical: "/native-cigarettes-falby-road" },
};

export default async function Page() {
  if (!toPublicCigaretteState(await getCigaretteSnapshot()).web) redirect("/items/vapes");
  return <AuthorityLanding page={AUTHORITY_PAGES.cigarettes} />;
}
