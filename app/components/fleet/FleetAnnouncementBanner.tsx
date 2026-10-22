"use client";

import Link from "next/link";
import { useState } from "react";
import { FLEET_COLORS } from "../../lib/fleet/config";
import type { ResolvedBanner } from "../../lib/fleet/types";

const figureStyle = { margin: 0, width: "100%" } as const;
const imageStyle = { display: "block", width: "100%", maxWidth: "100%", height: "auto" } as const;
const linkStyle = { display: "block", width: "100%" } as const;
const captionStyle = { margin: 0, padding: "14px 18px", background: FLEET_COLORS.banner, color: FLEET_COLORS.bannerText, textAlign: "center" as const, fontSize: "clamp(17px, 1.7vw, 28px)", fontWeight: 800, lineHeight: 1.35 };

/** Sheet banner. Bundle image fails once to the coded image, then to a bold category block. */
export default function SheetBannerFigure({ banner }: { banner: ResolvedBanner }) {
  const [src, setSrc] = useState(banner.image);
  const [imageFailed, setImageFailed] = useState(false);
  const showText = banner.render === "text" || imageFailed || !src;
  const useCodedFallback = () => {
    if (banner.codedImage && src !== banner.codedImage) {
      setSrc(banner.codedImage);
      return;
    }
    setImageFailed(true);
  };
  return (
    <figure data-core-banner={banner.id} style={figureStyle}>
      {showText ? (
        <div data-fleet-text-banner="" style={{ ...imageStyle, minHeight: banner.imageHeight || 180, display: "flex", alignItems: "center", justifyContent: "center", background: FLEET_COLORS.banner, color: FLEET_COLORS.bannerText, fontWeight: 800, fontSize: "clamp(28px, 4vw, 48px)" }}>{banner.categoryName}</div>
      ) : (
        <Link href={banner.href} style={linkStyle}>
          {/* The name useCodedFallback is the kit's image-fallback hook. It is a plain callback, not a React hook. */}
          {/* eslint-disable-next-line react-hooks/rules-of-hooks, @next/next/no-img-element */}
          <img key={src} src={src} alt={banner.alt} title={banner.title} width={banner.imageWidth} height={banner.imageHeight} style={imageStyle} ref={(node) => { if (node?.complete && node.naturalWidth === 0) useCodedFallback(); }} onError={useCodedFallback} />
        </Link>
      )}
      <figcaption style={captionStyle}>{banner.textBar}</figcaption>
    </figure>
  );
}
