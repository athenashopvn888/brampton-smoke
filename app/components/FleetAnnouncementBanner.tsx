"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import FlowerBogoStrip from "./FlowerBogoStrip";

function isThanksgivingNoticeActive(date: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const value = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  const dateKey = Number(`${value.year}${value.month}${value.day}`);

  return dateKey >= 20260930 && dateKey <= 20261012;
}

export default function FleetAnnouncementBanner() {
  const [showThanksgivingNotice, setShowThanksgivingNotice] = useState(false);

  useEffect(() => {
    const updateVisibility = () =>
      setShowThanksgivingNotice(isThanksgivingNoticeActive(new Date()));

    updateVisibility();
    const timer = window.setInterval(updateVisibility, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <aside
      data-fleet-homepage-announcement=""
      aria-label="Store announcements"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "auto",
        minHeight: 0,
        position: "relative",
        zIndex: 50,
      }}
    >
      {showThanksgivingNotice ? (
        <p data-thanksgiving-hours-notice="">
          Thanksgiving Monday (Oct 12): We are open regular hours.
        </p>
      ) : null}
      <FlowerBogoStrip hero />
      <Link href="/exotic-weed" data-exotic-tier-banner="" aria-label="Shop Exotic, Premium and AAA+ flower tiers">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/banners/top-weed-tier-bsc01.webp" alt="TOP WEED TIER — Exotic, Premium and AAA+ flower at Brampton Smoke Cannabis — Buy 2g Get 1g FREE and Buy 3g Get 3g FREE." />
      </Link>
<Link href="/items/cigarettes" data-cig-mix-banner="" aria-label="Shop cigarette mix and match offers">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/banners/native-cigarette-offer-20260822.webp" alt="Cigarette deal at Brampton Smoke Cannabis — 2 packs for $5 mix and match, cartons $25."
          style={{ display: "block", width: "100%", height: "auto" }} />
      </Link>
</aside>
  );
}
