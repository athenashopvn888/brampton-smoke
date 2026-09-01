import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path: string) => readFileSync(path, "utf8");

test("BSC Weed owner keeps the protected route and exact metadata", () => {
  const page = read("app/weed-dispensary-brampton/page.tsx");
  const location = read("app/lib/gbp-location.ts");
  const sitemap = read("app/sitemap.ts");

  assert.match(location, /Weed Dispensary in Brampton \| Brampton Smoke Cannabis/);
  assert.match(sitemap, /weed-dispensary-brampton\//);
  assert.match(page, /title: \{ absolute: gbpLocation\.seoTitle \}/);
  assert.match(page, /canonical:.*gbpLocation\.slug/s);
});

test("BSC phone is consistent across the Weed release surfaces", () => {
  const sources = [
    read("app/lib/gbp-location.ts"),
    read("app/lib/weedDiscovery.ts"),
    read("app/layout.tsx"),
    read("app/components/Footer.tsx"),
    read("app/components/GBPLandingPage.tsx"),
  ].join("\n");

  assert.doesNotMatch(sources, /905[^\n]{0,20}226[^\n]{0,20}7966/);
  assert.match(sources, /\+12898195009/);
  assert.match(sources, /\+1 \(289\) 819-5009/);
});

test("BSC Weed owner and homepage module keep approved static destinations", () => {
  const sources = [
    read("app/lib/weedDiscovery.ts"),
    read("app/components/WeedDiscoveryModule.tsx"),
  ].join("\n");

  for (const href of [
    "/budget",
    "/aa",
    "/aaa",
    "/premium",
    "/exotic",
    "/items/prerolls",
    "/items/edibles",
    "/items/vape-disposables",
    "/items/concentrates",
    "/items/add-ons",
    "/weed-dispensary-brampton/",
    "/resources/flower-guide",
  ]) {
    assert.ok(sources.includes(href), `Missing approved link: ${href}`);
  }
});

test("changed Weed copy avoids internal page-mechanics language", () => {
  const sources = [
    read("app/components/GBPLandingPage.tsx"),
    read("app/components/WeedDiscoveryModule.tsx"),
  ].join("\n").toLowerCase();

  for (const blocked of [
    "this page",
    "site structure",
    "navigation shortcut",
    "search path",
    "menu path",
    "direct path",
    "product cards",
    "click to",
    "scroll to",
  ]) {
    assert.ok(!sources.includes(blocked), `Blocked shopper-copy phrase: ${blocked}`);
  }
});
