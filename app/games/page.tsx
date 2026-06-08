import type { Metadata } from "next";
import GamesContent from "./GamesContent";

export const metadata: Metadata = {
  title: "Cannabis Arcade Games — Brampton Smoke Cannabis | Brampton",
  description: "Play free online cannabis-themed games like Flappy Bud and Snake Munchies while you wait at Brampton Smoke Cannabis.",
  alternates: {
    canonical: "https://bramptonsmokecannabis.com/games",
  },
};

export default function GamesPage() {
  return <GamesContent />;
}
