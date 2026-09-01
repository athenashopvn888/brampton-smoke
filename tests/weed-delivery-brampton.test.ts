import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");

test("weed delivery route owns Brampton delivery intent", () => {
  const page = read("app/weed-delivery-brampton/page.tsx");

  assert.match(page, /Weed Delivery Brampton \| Brampton Smoke Cannabis/);
  assert.match(page, /title: \{ absolute: title \}/);
  assert.match(page, /weed-delivery-brampton/);
  assert.match(page, /Weed Delivery in Brampton/);
  assert.match(page, /openGraph:/);
  assert.match(page, /twitter:/);
});

test("legacy delivery route permanently migrates to the Weed delivery owner", () => {
  const config = read("next.config.ts");
  const legacy = read("app/delivery/page.tsx");

  assert.match(config, /source: "\/delivery", destination: "\/weed-delivery-brampton", statusCode: 301/);
  assert.match(legacy, /permanentRedirect\("\/weed-delivery-brampton"\)/);
});

test("delivery content uses approved Weed and flower tier labels", () => {
  const content = read("app/delivery/DeliveryContent.tsx");

  for (const phrase of [
    "Weed Delivery in Brampton",
    "How to Order Weed Delivery in Brampton",
    "Weed &amp; Flower Delivery Tiers",
    "All Weed & Flower Products",
    "Exotic Weed & Flower",
    "Craft Weed & Flower",
    "BC Premium Weed & Flower",
    "Budget Weed & Flower",
    "Shreds Weed & Flower",
  ]) assert.ok(content.includes(phrase), `Missing approved phrase: ${phrase}`);

  assert.match(content, /href="\/weed-dispensary-brampton\/"/);
  assert.doesNotMatch(content, /guaranteed delivery|same-day delivery|delivery radius/i);
});

test("all primary internal delivery references point to the canonical route", () => {
  for (const file of ["app/layout.tsx", "app/components/Navbar.tsx", "app/components/Footer.tsx", "app/sitemap.ts"]) {
    const source = read(file);
    assert.ok(source.includes("/weed-delivery-brampton"), `${file} is missing the canonical delivery route`);
    assert.doesNotMatch(source, /href="\/delivery"|`\$\{BASE\}\/delivery`/);
  }
});

test("announcement names the Weed delivery menu", () => {
  const layout = read("app/layout.tsx");
  assert.match(layout, /NEW WEED DELIVERY MENU IS HERE — CLICK TO EXPLORE/);
});

