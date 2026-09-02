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
    "/budget-weed",
    "/aa-weed",
    "/aaa-weed",
    "/premium-weed",
    "/exotic-weed",
    "/items/prerolls",
    "/items/edibles",
    "/items/vape-disposables",
    "/items/concentrates",
    "/items/add-ons",
    "/weed-dispensary-brampton/",
    "/resources/weed-flower-guide",
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

test("tier pages use absolute route-specific metadata and one natural Weed signal", () => {
  const page = read("app/[tier]/page.tsx");
  const content = read("app/lib/tierSeoContent.ts");

  assert.match(page, /title: \{ absolute: seo\.seoTitle \}/);
  assert.match(page, /twitter:/);
  assert.match(page, /canonical: `https:\/\/www\.bramptonsmokecannabis\.com\/\$\{tierSlug\}`/);
  assert.match(page, /Compare Weed &amp; Flower Tiers/);
  assert.match(page, /href="\/weed-dispensary-brampton\/"/);

  for (const tier of ["Exotic", "Premium", "AAA+", "AA", "Budget"]) {
    assert.ok(content.includes(`Weed ${tier} & Cannabis Flower Brampton | Brampton Smoke Cannabis`));
    assert.ok(content.includes(`Weed ${tier} & Cannabis Flower in Brampton`));
    assert.ok(content.includes(`Explore Weed ${tier} Strains`));
  }
});

test("Weed campaign routes use one canonical and one-hop permanent legacy redirects", () => {
  const config = read("next.config.ts");
  const products = read("app/lib/products.ts");
  const resources = read("app/resources/resourceData.ts");
  const sitemap = read("app/sitemap.ts");

  const migrations = [
    ["/exotic", "/exotic-weed"],
    ["/premium", "/premium-weed"],
    ["/aaa", "/aaa-weed"],
    ["/aa", "/aa-weed"],
    ["/budget", "/budget-weed"],
    ["/resources/flower-guide", "/resources/weed-flower-guide"],
  ];

  for (const [legacy, canonical] of migrations) {
    assert.ok(
      config.includes(`{ source: "${legacy}", destination: "${canonical}", statusCode: 301 }`),
      `Missing direct permanent migration: ${legacy} -> ${canonical}`,
    );
  }

  for (const slug of ["exotic-weed", "premium-weed", "aaa-weed", "aa-weed", "budget-weed"]) {
    assert.ok(products.includes(`slug: "${slug}"`), `Missing canonical tier slug: ${slug}`);
  }
  assert.match(resources, /slug: "weed-flower-guide"/);
  assert.doesNotMatch(resources, /slug: "flower-guide"/);
  assert.match(sitemap, /url: `\$\{BASE\}\/\$\{t\.slug\}`/);
  assert.match(sitemap, /url: page\.slug \? `\$\{BASE\}\/resources\/\$\{page\.slug\}`/);
});

test("customer-facing tier names and links include Weed", () => {
  const sources = [
    read("app/lib/products.ts"),
    read("app/page.tsx"),
    read("app/components/Navbar.tsx"),
    read("app/components/Footer.tsx"),
    read("app/lib/weedDiscovery.ts"),
    read("app/resources/resourceData.ts"),
  ].join("\n");

  for (const tier of ["Weed Exotic", "Weed Premium", "Weed AAA+", "Weed AA", "Weed Budget"]) {
    assert.ok(sources.includes(tier), `Missing Weed-inclusive customer tier name: ${tier}`);
  }
  for (const legacyHref of ["/exotic\"", "/premium\"", "/aaa\"", "/aa\"", "/budget\"", "/resources/flower-guide\""]) {
    assert.ok(!sources.includes(legacyHref), `Legacy internal destination remains: ${legacyHref}`);
  }
});

test("BSC Weed and Flower guide uses reviewed evergreen copy", () => {
  const resources = read("app/resources/resourceData.ts");
  const guide = resources.match(/slug: "weed-flower-guide"[\s\S]*?(?=\n  \{\n    slug: "value-guide")/)?.[0] || "";

  assert.match(guide, /seoTitle: "Weed & Flower Guide Brampton"/);
  assert.match(guide, /Explore Brampton Smoke Cannabis Weed in Brampton/);
  for (const blocked of ["higher shelf", "stronger shelf positioning", "more punch", "cheap weed"]) {
    assert.ok(!guide.toLowerCase().includes(blocked), `Blocked guide wording remains: ${blocked}`);
  }
});

test("Weed owner cards preserve broad-owner and tier-owner separation", () => {
  const discovery = read("app/lib/weedDiscovery.ts");

  for (const tier of ["Budget", "AA", "AAA+", "Premium", "Exotic"]) {
    assert.ok(discovery.includes(`Weed ${tier} & Flower`));
    assert.ok(discovery.includes(`Explore the ${tier} cannabis flower tier.`));
  }
  assert.match(discovery, /ownerPath: "\/weed-dispensary-brampton\/"/);
});

test("flower details avoid false live availability and link to tier context", () => {
  const page = read("app/flower/[slug]/page.tsx");

  assert.doesNotMatch(page, /Available in-store/i);
  assert.doesNotMatch(page, /In stock|Available now|Currently available/i);
  assert.match(page, /title: \{\s*absolute:/s);
  assert.match(page, /Listed on the Brampton Smoke Cannabis menu/);
  assert.match(page, /Explore \{tierName\} &amp; Flower/);
  assert.match(page, /href="\/weed-dispensary-brampton\/"/);
});

test("homepage describes five flower tiers without calling every tier premium", () => {
  const page = read("app/page.tsx");

  assert.doesNotMatch(page, /five tiers of premium flower/i);
  assert.match(page, /five flower tiers/);
  assert.match(page, /comparing Weed and cannabis flower in Brampton/);
});
