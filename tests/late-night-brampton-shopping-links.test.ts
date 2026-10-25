import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { splitSameSiteLinks } from "../app/resources/sameSiteLinks.ts";

const source = fs.readFileSync("app/resources/resourceData.ts", "utf8");
const view = fs.readFileSync("app/resources/ResourceView.tsx", "utf8");

const article = source.slice(
  source.indexOf('slug: "late-night-brampton-shopping"'),
  source.indexOf('slug: "brampton-transit-and-parking"'),
);
const sections = article.slice(article.indexOf("sections:"));
const bodies = [...sections.matchAll(/body:\s*\n\s*"((?:\\.|[^"\\])*)"/g)].map((match) => match[1]);
const parts = bodies.flatMap((body) => splitSameSiteLinks(body));
const links = parts.flatMap((part) => (part.kind === "link" ? [part] : []));
const plain = parts.map((part) => (part.kind === "link" ? part.text : part.value)).join(" ");

test("late-night Brampton article keeps original body copy and adds three same-site keyword links", () => {
  assert.equal(bodies.length, 2);
  assert.ok(
    bodies[0].startsWith(
      "Choose flower, pre-rolls, edibles, vapes, concentrates, accessories, or cigarettes first, then compare the details inside that category.",
    ),
  );
  assert.ok(
    bodies[1].startsWith(
      "If timing is tight or one product matters, start with the current menu, then ask staff for the freshest in-store details.",
    ),
  );

  assert.deepEqual(
    links.map((link) => ({ text: link.text, href: link.href })),
    [
      { text: "weed dispensary in Brampton", href: "/weed-dispensary-brampton" },
      { text: "weed delivery in Brampton", href: "/weed-delivery-brampton" },
      { text: "vape shop in Brampton", href: "/vape-shop-brampton" },
    ],
  );

  for (const phrase of ["weed delivery in Brampton", "weed dispensary in Brampton", "vape shop in Brampton"]) {
    assert.equal(plain.split(phrase).length - 1, 1);
  }
  for (const link of links) {
    assert.equal(link.href.startsWith("/"), true);
    assert.equal(link.href.startsWith("//"), false);
    assert.equal(/^https?:/i.test(link.href), false);
    assert.equal(/tobacco|cigarette|native smoke|farmers/i.test(link.text), false);
  }

  assert.equal(plain.includes("3" + ".5"), false);
  assert.equal(/farmers link/i.test(plain), false);
  assert.equal(/https?:\/\//i.test(sections), false);
  assert.match(view, /splitSameSiteLinks\(section\.body\)/);
  assert.match(view, /<Link key=\{index\} href=\{part\.href\}>/);
});
