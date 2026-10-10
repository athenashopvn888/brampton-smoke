import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { SEO_PAGES } from "../app/lib/seoPages.ts";
import { AUTHORITY_PAGES } from "../app/lib/authorityPages.ts";

const page = SEO_PAGES.find((entry) => entry.slug === "nicotine-vapes-brampton");
const slugs = ["geek-promax-5-30k-puffs","geek-universe-25k-puffs","level-x-g2-pod","nexa-pix-30k-puffs-many-flavors","ovns-10000-5-10k-puffs","ovns-disposable-5-8ml-many-flavors"];

test("approved nicotine page uses six verified products and only the nicotine category", () => {
  assert.ok(page?.heroPreview);
  assert.equal(page.publicationStatus, "approved");
  assert.deepEqual(page.heroPreview.products.map((product) => product.sourceSlug), slugs);
  assert.equal(page.heroPreview.menuHref, "/items/vapes");
  assert.equal(page.heroPreview.secondaryHref, "#featured-vapes");
  assert.equal(page.warning, "Adults 19+. Nicotine is addictive.");
  assert.match(page.sections[2].body, /\/items\/vape-disposables/);
});

const readSource = (path: string) => readFileSync(new URL(path, import.meta.url), "utf8");

test("BSC01 dedicated vape shop route is feed-backed, indexable and schema-safe", () => {
  const route = readSource("../app/vape-shop-brampton/page.tsx");
  const sitemap = readSource("../app/sitemap.ts");

  assert.match(route, /getLiveMenu/);
  assert.match(route, /category\.toUpperCase\(\) === "VAPE PENS"/);
  assert.match(route, /canonical: PAGE_URL/);
  assert.match(route, /FAQPage/);
  assert.match(route, /ItemList/);
  assert.match(route, /Product/);
  assert.match(route, /Offer/);
  assert.match(route, /Adults 19\+/);
  assert.doesNotMatch(route, /AggregateRating|"@type": "Review"/);
  assert.match(sitemap, /\/vape-shop-brampton/);
});

test("every BSC01 vape surface receives the conversion block and local links", () => {
  const category = readSource("../app/items/[category]/page.tsx");
  const info = readSource("../app/info/[seoPage]/page.tsx");
  const authority = readSource("../app/components/AuthorityLanding.tsx");
  const home = readSource("../app/components/HomePage.tsx");
  const weedOwner = readSource("../app/components/GBPLandingPage.tsx");
  const actions = readSource("../app/components/VapeConversionBlock.tsx");

  assert.match(category, /isVapeCategory \? <VapeConversionBlock/);
  assert.match(info, /nicotine-vapes-brampton.*VapeConversionBlock/);
  assert.match(authority, /nicotine-vape-falby-road/);
  assert.match(home, /nicotineHref="\/vape-shop-brampton"/);
  assert.match(weedOwner, /href="\/vape-shop-brampton"/);
  assert.match(actions, /tel:\$\{STORE\.phoneIntl\}/);
  assert.match(actions, /mapsDirectionsUrl/);
  assert.match(actions, /sms:\$\{STORE\.phoneIntl\}/);
});

test("Falby Road nicotine authority route no longer points at the THC category", () => {
  assert.equal(AUTHORITY_PAGES.vape.menuHref, "/items/vapes");
  assert.match(AUTHORITY_PAGES.vape.body, /\/items\/vapes/);
  assert.match(AUTHORITY_PAGES.vape.body, /\/items\/vape-disposables/);
});
