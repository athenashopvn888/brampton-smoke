import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path: string) => readFileSync(path, "utf8");

const PUBLIC_SURFACES = [
  "app/page.tsx",
  "app/components/HomePage.tsx",
  "app/visit/page.tsx",
  "app/layout.tsx",
  "app/lib/storeSeo.ts",
  "app/lib/gbp-location.ts",
  "app/components/Navbar.tsx",
  "app/components/Footer.tsx",
  "app/sitemap.ts",
];

test("BSC01 CannabisStore uses homepage @id, Unit B NAP and 24-hour hours", () => {
  const seo = read("app/lib/storeSeo.ts");
  const layout = read("app/layout.tsx");

  assert.match(seo, /"@type": "CannabisStore"/);
  assert.match(seo, /https:\/\/www\.bramptonsmokecannabis\.com\/#store/);
  assert.match(seo, /url: STORE\.url/);
  assert.match(seo, /132 Falby Rd Unit B/);
  assert.match(seo, /L6P 4L9/);
  assert.match(seo, /\+12898195009/);
  assert.match(seo, /opens: "00:00"/);
  assert.match(seo, /closes: "23:59"/);
  assert.match(layout, /cannabisStoreJsonLd/);
  assert.doesNotMatch(layout, /"@type": "Store"/);
});

test("homepage and /visit emit FAQPage JSON-LD that matches visible questions", () => {
  const home = read("app/page.tsx");
  const visit = read("app/visit/page.tsx");
  const seo = read("app/lib/storeSeo.ts");
  const homeView = read("app/components/HomePage.tsx");

  assert.match(home, /faqPageJsonLd\(HOME_FAQS\)/);
  assert.match(visit, /faqPageJsonLd\(VISIT_FAQS\)/);
  assert.match(seo, /"@type": "FAQPage"/);
  assert.match(homeView, /HOME_FAQS\.map/);
  assert.match(visit, /VISIT_FAQS\.map/);
  assert.match(seo, /Where is Brampton Smoke Cannabis in east Brampton\?/);
  assert.match(seo, /How do I find Unit B at 132 Falby Road\?/);
});

test("homepage remains the visit hub and GBP website target", () => {
  const home = read("app/components/HomePage.tsx");
  const page = read("app/page.tsx");
  const visit = read("app/visit/page.tsx");

  assert.match(page, /canonical: STORE\.origin/);
  assert.match(page, /East Brampton Dispensary on Falby Rd Unit B/);
  assert.match(home, /Brampton Smoke Cannabis — Falby Rd Unit B, East Brampton/);
  assert.match(home, /Homepage visit hub/);
  assert.match(home, /href="\/visit"/);
  assert.match(home, /mapsEmbedUrl/);
  assert.match(home, /mapsDirectionsUrl/);
  assert.match(home, /tel:\$\{STORE\.phoneIntl\}/);
  assert.match(visit, /homepage remains the visit hub/i);
  assert.match(visit, /canonical: `\$\{STORE\.origin\}\/visit`/);
  assert.doesNotMatch(visit, /GBP Website/);
});

test("/visit is crawlable, unique Falby Unit B copy, and listed in sitemap", () => {
  const visit = read("app/visit/page.tsx");
  const sitemap = read("app/sitemap.ts");
  const nav = read("app/components/Navbar.tsx");
  const footer = read("app/components/Footer.tsx");

  assert.match(sitemap, /\$\{BASE\}\/visit/);
  assert.match(nav, /href: "\/visit"/);
  assert.match(footer, /href="\/visit"/);
  assert.match(visit, /Find Unit B at 132 Falby Road/);
  assert.match(visit, /index: true/);
  assert.match(visit, /Spot the Unit B entrance/);
  assert.match(visit, /Falby corridor approach from Steeles/);
  assert.match(visit, /valid government photo ID/);
  assert.doesNotMatch(visit, /Jane St/);
});

test("POD2 public surfaces stay standalone and skip sister-store corridors", () => {
  const sources = PUBLIC_SURFACES.map(read).join("\n").toLowerCase();

  for (const blocked of [
    "sister store",
    "sister stores",
    "our other locations",
    "athena",
    "the fleet",
    "chain",
    "kennedy loud",
    "blouds",
    "planet 60",
    "unit 104",
    "queen st w",
    "medical marijuana",
    "treats anxiety",
    "cures",
  ]) {
    assert.ok(!sources.includes(blocked), `Blocked public wording remains: ${blocked}`);
  }

  assert.match(sources, /east brampton/);
  assert.match(sources, /unit b/);
  assert.match(sources, /falby/);
});

test("homepage corridor copy stays in the 220-350 word band", () => {
  const home = read("app/components/HomePage.tsx");
  const texts = [...home.matchAll(/styles\.seoPanelText\}>\s*([\s\S]*?)\s*<\/p>/g)].map(
    (match) => match[1].replace(/\s+/g, " ").trim(),
  );
  const words = texts.join(" ").split(/\s+/).filter(Boolean);

  assert.ok(texts.length >= 4, "Homepage corridor copy is missing seo panel paragraphs");
  assert.ok(words.length >= 220, `Homepage corridor copy too short: ${words.length}`);
  assert.ok(words.length <= 350, `Homepage corridor copy too long: ${words.length}`);
});
