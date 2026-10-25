"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FULL_NAME_NAP } from "../lib/fullNameNap";
import { storeHoursStatus } from "../lib/storeHoursStatus";
import styles from "./MobileBottomBar.module.css";

/**
 * Mobile-only sticky actions. Directions uses this store's Google Business Profile pin.
 * Hours copy is computed in America/Toronto from the existing opening hours.
 * Hidden on the in-store TV menus.
 */
export default function MobileBottomBar() {
  const pathname = usePathname();
  const hidden =
    pathname === "/tv" ||
    pathname === "/tv2" ||
    pathname.startsWith("/tv/") ||
    pathname.startsWith("/tv2/");
  const [status, setStatus] = useState(() => storeHoursStatus(new Date()));

  useEffect(() => {
    if (hidden) return;
    const update = () => setStatus(storeHoursStatus(new Date()));
    update();
    const id = window.setInterval(update, 30_000);
    return () => window.clearInterval(id);
  }, [hidden]);

  if (hidden) return null;

  return (
    <nav
      className={styles.bar}
      aria-label="Store actions"
      data-mobile-bottom-bar=""
      data-hours-kind={status.kind}
      suppressHydrationWarning
    >
      <a
        className={`${styles.action} ${styles.directions}`}
        href={FULL_NAME_NAP.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Directions
      </a>
      <Link className={`${styles.action} ${styles.hours}`} href="/hours">
        <span className={styles.srOnly}>Hours. </span>
        <span className={styles.hoursLabel} suppressHydrationWarning>
          {status.label}
        </span>
      </Link>
      <Link className={`${styles.action} ${styles.minor}`} href="/exotic-weed">
        Menu
      </Link>
      <Link className={`${styles.action} ${styles.minor}`} href="/delivery">
        Delivery
      </Link>
    </nav>
  );
}
