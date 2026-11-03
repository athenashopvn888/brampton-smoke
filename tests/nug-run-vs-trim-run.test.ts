import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { ARTICLE_MARKDOWN, ARTICLE_PATH, CANONICAL_URL, metaDescription } from "../app/resources/nug-run-vs-trim-run/article.ts";
import { articleHeading, firstUsefulParagraph, parseArticle, plainText } from "../app/resources/nug-run-vs-trim-run/renderArticle.ts";

const blocks = parseArticle(ARTICLE_MARKDOWN);
const heading = articleHeading(blocks);
const description = metaDescription(firstUsefulParagraph(blocks));

test("nug run article publishes the approved body at the exact resource path", () => {
  assert.equal(ARTICLE_PATH, "/resources/nug-run-vs-trim-run");
  assert.equal(CANONICAL_URL, "https://www.bramptonsmokecannabis.com/resources/nug-run-vs-trim-run");
  assert.equal(heading, "Nug Run vs Trim Run: What Goes Into a Concentrate");
  assert.equal(
    description,
    'Concentrate menus speak their own language, and two phrases trip people up more than most: "nug run" and "trim run."',
  );
  assert.ok(description.length <= 155);
  assert.equal(description.includes("Last checked:"), false);

  const checked = blocks.find((block) => block.type === "p" && plainText(block.inlines).startsWith("Last checked:"));
  assert.ok(checked && checked.type === "p");
  assert.equal(plainText(checked.inlines), "Last checked: October 27, 2026");

  assert.equal(blocks.filter((block) => block.type === "h2").length, 9);
  const table = blocks.find((block) => block.type === "table");
  assert.ok(table && table.type === "table");
  assert.deepEqual(table.headers.map(plainText), ["", "Nug run", "Trim run"]);
  assert.equal(table.rows.length, 5);
  assert.deepEqual(table.rows[0].map(plainText), ["Input", "Whole buds", "Trimmed sugar leaf and small clippings"]);

  const links = blocks.flatMap((block) => {
    if (block.type === "table") return [...block.headers.flat(), ...block.rows.flat(2)];
    if (block.type === "ul" || block.type === "ol") return block.items.flat();
    return block.inlines;
  }).filter((node) => node.kind === "link");
  assert.equal(links.length, 2);
  assert.equal(links[0].kind === "link" && links[0].href, "/visit");
  assert.equal(links[0].kind === "link" && links[0].text, "Brampton Smoke Cannabis visit page");
  assert.equal(links[1].kind === "link" && links[1].href, "/weed-dispensary-falby-road");
  assert.equal(links[1].kind === "link" && links[1].text, "Falby Road weed dispensary page");

  assert.equal(ARTICLE_MARKDOWN.includes("3" + ".5"), false);
  assert.equal(description.includes("3" + ".5"), false);
  assert.match(ARTICLE_MARKDOWN, /And trim run isn't a defect\./);
  assert.match(ARTICLE_MARKDOWN, /Bring government-issued photo ID\./);
});

test("sitemap gains the nug run resource path and the page carries article schema", () => {
  const sitemap = fs.readFileSync("app/sitemap.ts", "utf8");
  const page = fs.readFileSync("app/resources/nug-run-vs-trim-run/page.tsx", "utf8");
  assert.match(sitemap, /url: page\.slug \? `\$\{BASE\}\/resources\/\$\{page\.slug\}`/);
  assert.match(sitemap, /\$\{BASE\}\/resources\/cannabis-at-work-ontario-rules/);
  assert.match(sitemap, /\$\{BASE\}\/resources\/indica-sativa-hybrid-label-terms/);
  assert.match(sitemap, /\$\{BASE\}\/resources\/nug-run-vs-trim-run/);
  assert.match(page, /canonical: CANONICAL_URL/);
  assert.match(page, /title: \{ absolute: heading \}/);
  assert.match(page, /"@type": "Article"/);
  assert.match(page, /datePublished: "2026-11-03"/);
  assert.match(page, /dateModified: "2026-11-03"/);
  assert.match(page, /headline: heading/);
  assert.doesNotMatch(page, /aggregateRating|Review|Product|Offer|BreadcrumbList/);
  assert.match(page, /index: true/);
  assert.match(page, /follow: true/);
});
