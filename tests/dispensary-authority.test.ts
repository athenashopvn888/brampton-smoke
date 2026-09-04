import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const source = fs.readFileSync("app/resources/resourceData.ts", "utf8");
const route = fs.readFileSync("app/resources/[...slug]/page.tsx", "utf8");

test("BSC dispensary authority page preserves the approved SEO and linking contract", () => {
  assert.match(source, /slug: "cannabis-dispensary-vs-weed-dispensary"/);
  assert.match(source, /seoTitle: "Cannabis vs Weed Dispensary \| Brampton Smoke Cannabis"/);
  assert.match(source, /Cannabis Dispensary vs\. Weed Dispensary in Brampton/);
  assert.match(source, /href: "\/info\/brampton-weed-dispensary"/);
  assert.match(source, /href: "\/weed-dispensary-brampton"/);
  assert.match(source, /href: "\/resources"/);
  assert.match(source, /Frequently Asked Questions/);
  assert.match(source, /title: "Cannabis Dispensary vs\. Weed Dispensary"[\s\S]*href: "\/resources\/cannabis-dispensary-vs-weed-dispensary"/);
  assert.match(route, /page\.slug === "cannabis-dispensary-vs-weed-dispensary"[\s\S]*absolute: page\.seoTitle/);
});
