import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { ARTICLE_MARKDOWN, ARTICLE_PATH, CANONICAL_URL, deriveMetaTitle } from "../app/resources/cannabis-at-work-ontario-rules/article.ts";
import { articleHeading, firstUsefulParagraph, parseArticle, plainText } from "../app/resources/cannabis-at-work-ontario-rules/renderArticle.ts";

const blocks = parseArticle(ARTICLE_MARKDOWN);
const heading = articleHeading(blocks);
const description = firstUsefulParagraph(blocks);

test("workplace article publishes the approved body at the exact resource path", () => {
  assert.equal(ARTICLE_PATH, "/resources/cannabis-at-work-ontario-rules");
  assert.equal(CANONICAL_URL, "https://www.bramptonsmokecannabis.com/resources/cannabis-at-work-ontario-rules");
  assert.equal(heading, "Cannabis and your job in Ontario: can you smoke or vape at work, and what can your employer decide?");
  assert.equal(deriveMetaTitle(heading), "Cannabis and your job in Ontario: can you smoke or vape at work");
  assert.ok(deriveMetaTitle(heading).length <= 63);
  assert.ok(description.startsWith("Legal cannabis for adults 19 and over doesn't make every place legal for lighting up."));
  assert.equal(description.includes("Last checked:"), false);

  const checked = blocks.find((block) => block.type === "p" && plainText(block.inlines).startsWith("Last checked:"));
  assert.ok(checked && checked.type === "p");
  assert.equal(plainText(checked.inlines), "Last checked: September 30, 2026");

  assert.equal(blocks.filter((block) => block.type === "h2").length, 6);
  assert.equal(blocks.filter((block) => block.type === "h3").length, 8);
  const table = blocks.find((block) => block.type === "table");
  assert.ok(table && table.type === "table");
  assert.deepEqual(table.headers.map(plainText), ["Place", "What ontario.ca says", "Smoking or vaping cannabis?"]);
  assert.equal(table.rows.length, 8);
  assert.deepEqual(table.rows[2].map(plainText), [
    "Delivery truck",
    "Listed as an example of an enclosed workplace",
    "Not allowed",
  ]);

  const lists = blocks.filter((block) => block.type === "ol");
  assert.equal(lists.length, 1);
  assert.ok(lists[0].type === "ol" && lists[0].items.length === 4);

  const link = blocks
    .flatMap((block) => (block.type === "p" ? block.inlines : []))
    .find((node) => node.kind === "link");
  assert.ok(link && link.kind === "link");
  assert.equal(link.href, "/visit");
  assert.equal(link.text, "Brampton Smoke Cannabis visit page");

  assert.equal(ARTICLE_MARKDOWN.includes("store_code"), false);
  assert.equal(ARTICLE_MARKDOWN.includes("approved_by"), false);
  assert.equal(ARTICLE_MARKDOWN.includes("notes_for_reviewer"), false);
  assert.equal(ARTICLE_MARKDOWN.includes("3" + ".5"), false);
  assert.equal(ARTICLE_MARKDOWN.includes("Open 24 Hours"), false);
});

test("sitemap gains the new resource path without replacing the resource mapper", () => {
  const sitemap = fs.readFileSync("app/sitemap.ts", "utf8");
  const page = fs.readFileSync("app/resources/cannabis-at-work-ontario-rules/page.tsx", "utf8");
  assert.match(sitemap, /url: page\.slug \? `\$\{BASE\}\/resources\/\$\{page\.slug\}`/);
  assert.match(sitemap, /\$\{BASE\}\/resources\/cannabis-at-work-ontario-rules/);
  assert.match(page, /canonical: CANONICAL_URL/);
  assert.match(page, /"@type": "Article"/);
  assert.doesNotMatch(page, /aggregateRating|Review/);
  assert.match(page, /index: true/);
  assert.match(page, /follow: true/);
});
