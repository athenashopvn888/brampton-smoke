import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("BSC01 uses Tri's custom banner and the approved homepage stack", () => {
  const banner = read("app/components/FleetAnnouncementBanner.tsx");
  const deals = read("app/lib/flowerDeals.ts");
  assert.match(deals, /TOP WEED TIER SPECIAL · \$\{BOGO_BUY_2_GET_1\}  \$\{BOGO_BUY_3_GET_3\} \*/);
  const order = ["<FlowerBogoStrip hero />", 'data-exotic-tier-banner=""', 'top-weed-tier-bsc01.webp', 'data-cigarette-deal=""', 'data-bb-light-deal=""', 'data-cig-mix-banner=""', 'data-bb-premium-banner=""'];
  let offset = -1;
  for (const marker of order) { const next = banner.indexOf(marker); assert.ok(next > offset, `${marker} should follow the previous stack item`); offset = next; }
  assert.ok(existsSync(new URL("../public/banners/top-weed-tier-bsc01.webp", import.meta.url)));
  assert.ok(existsSync(new URL("../public/banners/bb-premium-grade-full-lights.webp", import.meta.url)));
  assert.ok(existsSync(new URL("../public/banners/2pack5cig.webp", import.meta.url)));
});

test("Dual-Frame math is exact on Exotic, Premium and AAA+ only", () => {
  const products = read("app/lib/products.ts");
  for (const [key, list, pay3, pay6] of [["EXOTIC",20,40,60],["PREMIUM",15,30,45],['"AAA+"',10,20,30]]) {
    const start = products.indexOf(`${key}: {`); const end = products.indexOf("\n  },", start); const block = products.slice(start, end);
    assert.match(block, new RegExp(`unitPrice: ${list}`));
    assert.match(block, new RegExp(`price: ${pay3}, grams: 3, equals: "2g=3g"`));
    assert.match(block, new RegExp(`price: ${pay6}, grams: 6, equals: "3g=6g"`));
  }
  const aa = products.slice(products.indexOf("AA: {"), products.indexOf("BUDGET: {"));
  assert.match(aa, /deal3g: null/); assert.match(aa, /deal6g: null/); assert.doesNotMatch(products, /3\.5g|7g/);
});

test("mobile strip has one bar with separate wrapping offer lines", () => {
  const css = read("app/globals.css"); const strip = read("app/components/FlowerBogoStrip.tsx");
  assert.match(css, /\[data-bogo-strip-copy\].*flex-direction:column/);
  assert.match(css, /\[data-flower-bogo-strip="hero"\]/);
  assert.match(strip, /data-bogo-offer-lead/); assert.match(strip, /data-bogo-offer-tail/);
});
