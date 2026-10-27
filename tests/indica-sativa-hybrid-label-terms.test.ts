import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { ARTICLE_MARKDOWN, ARTICLE_PATH, CANONICAL_URL, metaDescription } from "../app/resources/indica-sativa-hybrid-label-terms/article.ts";
import { articleHeading, firstUsefulParagraph, parseArticle, plainText } from "../app/resources/indica-sativa-hybrid-label-terms/renderArticle.ts";

const blocks = parseArticle(ARTICLE_MARKDOWN);
const heading = articleHeading(blocks);
const description = metaDescription(firstUsefulParagraph(blocks));

test("indica label article publishes the approved body at the exact resource path", () => {
  assert.equal(ARTICLE_PATH, "/resources/indica-sativa-hybrid-label-terms");
  assert.equal(CANONICAL_URL, "https://www.bramptonsmokecannabis.com/resources/indica-sativa-hybrid-label-terms");
  assert.equal(heading, "Indica Weed Brampton Guide: What Indica, Sativa and Hybrid Mean on a Label");
  assert.equal(description, "Three words run the whole flower aisle: indica, sativa, hybrid.");
  assert.ok(description.length <= 155);
  assert.equal(description.includes("Last checked:"), false);

  const checked = blocks.find((block) => block.type === "p" && plainText(block.inlines).startsWith("Last checked:"));
  assert.ok(checked && checked.type === "p");
  assert.equal(plainText(checked.inlines), "Last checked: October 21, 2026");

  assert.equal(blocks.filter((block) => block.type === "h2").length, 6);
  const table = blocks.find((block) => block.type === "table");
  assert.ok(table && table.type === "table");
  assert.deepEqual(table.headers.map(plainText), ["Label word", "What it is", "What it isn't"]);
  assert.equal(table.rows.length, 3);

  const links = blocks.flatMap((block) => {
    if (block.type === "table") return [...block.headers.flat(), ...block.rows.flat(2)];
    if (block.type === "ul" || block.type === "ol") return block.items.flat();
    return block.inlines;
  }).filter((node) => node.kind === "link");
  assert.equal(links.length, 1);
  assert.equal(links[0].kind === "link" && links[0].href, "/visit");
  assert.equal(links[0].kind === "link" && links[0].text, "visit page");

  assert.equal(ARTICLE_MARKDOWN.includes("3" + ".5"), false);
  assert.equal(description.includes("3" + ".5"), false);
});

test("sitemap gains the indica label resource path and the page carries article schema", () => {
  const sitemap = fs.readFileSync("app/sitemap.ts", "utf8");
  const page = fs.readFileSync("app/resources/indica-sativa-hybrid-label-terms/page.tsx", "utf8");
  assert.match(sitemap, /url: page\.slug \? `\$\{BASE\}\/resources\/\$\{page\.slug\}`/);
  assert.match(sitemap, /\$\{BASE\}\/resources\/cannabis-at-work-ontario-rules/);
  assert.match(sitemap, /\$\{BASE\}\/resources\/indica-sativa-hybrid-label-terms/);
  assert.match(page, /canonical: CANONICAL_URL/);
  assert.match(page, /title: \{ absolute: heading \}/);
  assert.match(page, /"@type": "Article"/);
  assert.match(page, /datePublished: "2026-10-27"/);
  assert.match(page, /dateModified: "2026-10-27"/);
  assert.match(page, /headline: heading/);
  assert.doesNotMatch(page, /aggregateRating|Review|Product|Offer/);
  assert.match(page, /index: true/);
  assert.match(page, /follow: true/);
});
