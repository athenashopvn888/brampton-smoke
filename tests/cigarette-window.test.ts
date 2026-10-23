import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import {
  decideCigaretteGuide,
  decideCigaretteSurface,
  publicWebsiteCigaretteFlag,
  readCigaretteTvHeader,
  reconcileSurfaceItems,
  resolveSurfaceFlag,
} from "../app/lib/cigDecision.ts";
import { isRealCigaretteItem } from "../app/lib/cigMarkers.ts";
import { SHOW_CIGARETTES, filterCigaretteItems } from "../app/lib/siteConfig.ts";
import { cigaretteBoardItems, visibleTv2CardIds } from "../app/tv2/tv2Cigarettes.ts";

const carton = { category: "CIGARETTES", name: "BB FULL CARTON", slug: "bb-full-carton" };
const grabba = { category: "CIGARETTES", name: "GRABBA", slug: "grabba" };
const backwoods = { category: "CIGARETTES", name: "BACKWOODS ASSORTED FLAVORS $20-$25", slug: "backwoods-assorted-flavors-20-25" };
const cigarillo = { category: "CIGARETTES", name: "SHOW CIGARILLOS", slug: "show-cigarillos" };
const paper = { category: "CIGARETTES", name: "RAW ROLLING PAPERS", slug: "raw-rolling-papers" };
const pouch = { category: "CIGARETTES", name: "NICOTINE POUCHES , VELO, PABLO, KILLA", slug: "nicotine-pouches-velo-pablo-killa" };
const zyn = { category: "CIGARETTES", name: "ZYN CITRUS", slug: "zyn-citrus" };
const wrap = { category: "CIGARETTES", name: "HEMP WRAPS", slug: "hemp-wraps" };
const vape = { category: "VAPE PENS", name: "Mango Ice", slug: "mango-ice" };
const kept = [backwoods, cigarillo, paper, pouch, zyn, wrap];

function cig(extra: Record<string, unknown> = {}) {
  return { on: false, tvOn: false, webOn: false, ...extra };
}

test("tvOn shows the cigarettes card and items; web stays hidden", () => {
  const items = [vape, carton, grabba, ...kept];
  const on = cig({ on: true, tvOn: true, webOn: false });
  assert.equal(decideCigaretteSurface({ cig: on, items, surface: "tv" }).show, true);
  assert.equal(decideCigaretteSurface({ cig: on, items, surface: "web" }).show, false);
  assert.equal(resolveSurfaceFlag(on, "tv"), true);
  assert.equal(resolveSurfaceFlag(on, "web"), false);

  assert.equal(visibleTv2CardIds(true).includes("CIGARETTES"), true);
  assert.deepEqual(
    cigaretteBoardItems(items, true).map((item) => item.slug),
    [carton.slug, grabba.slug, ...kept.map((item) => item.slug)],
  );
  assert.equal(visibleTv2CardIds(false).includes("CIGARETTES"), false);
  assert.deepEqual(cigaretteBoardItems(items, false), []);

  const shown = reconcileSurfaceItems(items, items, true);
  assert.ok(shown.some((item) => item.slug === carton.slug));
  for (const item of kept) assert.ok(shown.some((entry) => entry.slug === item.slug));
});

test("tvOff hides real cigarettes and keeps wraps, papers, pouches, and zyn", () => {
  const items = [vape, carton, grabba, ...kept];
  const hidden = reconcileSurfaceItems(items, items, false);
  assert.deepEqual(hidden.map((item) => item.slug), [vape.slug, ...kept.map((item) => item.slug)]);
  for (const item of kept) assert.equal(isRealCigaretteItem(item), false);
  assert.equal(isRealCigaretteItem(carton), true);
  assert.equal(isRealCigaretteItem(grabba), true);
  assert.equal(decideCigaretteSurface({ cig: cig({ tvOn: false, webOn: false }), items, surface: "tv" }).show, false);
});

test("web stays on the static gate and an env hard-off beats webOn", () => {
  const items = [carton, backwoods];
  assert.equal(SHOW_CIGARETTES, false);
  const webItems = filterCigaretteItems(items);
  assert.deepEqual(webItems.map((item) => item.slug), [backwoods.slug]);
  assert.equal(
    decideCigaretteSurface({ cig: cig({ webOn: true, tvOn: true }), items, surface: "web", envRaw: "off" }).reason,
    "env",
  );
  assert.equal(
    decideCigaretteSurface({ cig: cig({ webOn: true, tvOn: true }), items, surface: "tv", envRaw: "false" }).show,
    false,
  );
});

test("tv falls back like cigDecision and a missing webOn does not follow tvOn", () => {
  const items = [carton];
  assert.equal(resolveSurfaceFlag({ on: true }, "tv"), true);
  assert.equal(resolveSurfaceFlag({ on: false, tvOn: true }, "tv"), true);
  assert.equal(resolveSurfaceFlag({ on: true, webOn: false, tvOn: true }, "web"), false);
  assert.equal(decideCigaretteSurface({ cig: null, items, surface: "tv" }).reason, "missing");
  assert.equal(decideCigaretteGuide({ cig: cig({ on: false, master: true }), items }).show, true);
  assert.equal(decideCigaretteGuide({ cig: cig({ on: true, master: false, webOn: true, tvOn: true }), items }).show, false);
});

test("TV hides on a feed error or a missing cig block, and follows tvOn on a successful feed", () => {
  const items = [carton, backwoods, pouch, zyn, cigarillo, paper, wrap];
  const errored = decideCigaretteSurface({ cig: cig({ on: true, webOn: true, tvOn: true }), items, surface: "tv", errored: true });
  assert.equal(errored.reason, "error");
  assert.equal(errored.show, false);
  const missing = decideCigaretteSurface({ cig: null, items, surface: "tv" });
  assert.equal(missing.reason, "missing");
  assert.equal(missing.show, false);
  const liveMissing = decideCigaretteSurface({ cig: null, items, surface: "tv", errored: false });
  assert.equal(liveMissing.show, false);
  assert.equal(liveMissing.reason, "missing");
  const shown = decideCigaretteSurface({ cig: cig({ on: false, tvOn: true }), items, surface: "tv" });
  assert.equal(shown.show, true);
  assert.equal(shown.reason, "on");
  const hidden = decideCigaretteSurface({ cig: cig({ on: true, tvOn: false }), items, surface: "tv" });
  assert.equal(hidden.show, false);
  assert.equal(hidden.reason, "off");
  // A saved last-good block is not an error, so it still follows tvOn.
  assert.equal(decideCigaretteSurface({ cig: cig({ tvOn: true }), items, surface: "tv", errored: false }).show, true);
  assert.equal(decideCigaretteSurface({ cig: cig({ tvOn: false }), items, surface: "tv", errored: false }).show, false);
  const stripped = reconcileSurfaceItems([vape, carton, grabba, ...kept], [carton, ...kept], errored.show);
  assert.deepEqual(stripped.map((item) => item.slug), [vape.slug, ...kept.map((item) => item.slug)]);
});

test("website flag stays false whenever the static gate is off, and on a feed error or missing block", () => {
  const items = [carton, backwoods];
  const explicitOn = decideCigaretteSurface({ cig: cig({ webOn: true, tvOn: true }), items, surface: "web" });
  const explicitOff = decideCigaretteSurface({ cig: cig({ webOn: false, tvOn: true }), items, surface: "web" });
  const errored = decideCigaretteSurface({ cig: cig({ webOn: true, tvOn: true }), items, surface: "web", errored: true });
  const missing = decideCigaretteSurface({ cig: null, items, surface: "web" });
  assert.equal(explicitOn.show, true);
  assert.equal(errored.show, true);
  assert.equal(missing.show, true);
  assert.equal(publicWebsiteCigaretteFlag(explicitOn, false), false);
  assert.equal(publicWebsiteCigaretteFlag(explicitOff, false), false);
  assert.equal(publicWebsiteCigaretteFlag(errored, false), false);
  assert.equal(publicWebsiteCigaretteFlag(missing, false), false);
  assert.equal(publicWebsiteCigaretteFlag(errored, true), false);
  assert.equal(publicWebsiteCigaretteFlag(missing, true), false);
  assert.equal(publicWebsiteCigaretteFlag(explicitOff, true), false);
  assert.equal(publicWebsiteCigaretteFlag(explicitOn, true), true);
  assert.equal(SHOW_CIGARETTES, false);
  assert.equal(publicWebsiteCigaretteFlag(explicitOn, SHOW_CIGARETTES), false);
  assert.equal(publicWebsiteCigaretteFlag(errored, SHOW_CIGARETTES), false);
  assert.equal(publicWebsiteCigaretteFlag(missing, SHOW_CIGARETTES), false);
  assert.equal(SHOW_CIGARETTES ? explicitOn.show : false, false);
});

test("website surfaces keep the static gate and TV still reads the feed on the existing poll", () => {
  const feed = readFileSync(new URL("../app/lib/cigaretteFeed.ts", import.meta.url), "utf8");
  const layout = readFileSync(new URL("../app/layout.tsx", import.meta.url), "utf8");
  const status = readFileSync(new URL("../app/api/content-status/route.ts", import.meta.url), "utf8");
  const route = readFileSync(new URL("../app/api/tv-data/route.ts", import.meta.url), "utf8");
  const tv = readFileSync(new URL("../app/tv/page.tsx", import.meta.url), "utf8");
  const tv2 = readFileSync(new URL("../app/tv2/page.tsx", import.meta.url), "utf8");
  const banner = readFileSync(new URL("../app/components/FleetAnnouncementBanner.tsx", import.meta.url), "utf8");
  assert.match(feed, /publicWebsiteCigaretteFlag\(webDecision, SHOW_CIGARETTES\)/);
  assert.match(feed, /!live && !cig/);
  assert.match(layout, /web: SHOW_CIGARETTES \? cigarettes\.web : false/);
  assert.match(status, /web: SHOW_CIGARETTES \? cig\.web\.show : false/);
  assert.match(route, /reconcileSurfaceItems/);
  assert.match(route, /snap\.tv\.show/);
  assert.match(tv, /readCigaretteTvHeader/);
  assert.match(tv, /setInterval\(loadData, 5\*60\*1000\)/);
  assert.match(tv2, /readCigaretteTvHeader/);
  assert.match(tv2, /setInterval\(loadData, 5\*60\*1000\)/);
  assert.match(banner, /useCigaretteState\(\)\.web/);
  assert.doesNotMatch(tv, /SHOW_CIGARETTES/);
  assert.doesNotMatch(tv2, /SHOW_CIGARETTES/);
});

test("the tv poll header is the live flag", () => {
  const on = new Headers({ "x-tv-data-cig-tv": "1", "x-tv-data-cig-web": "0" });
  assert.equal(readCigaretteTvHeader(on).show, true);
  const off = new Headers({ "x-tv-data-cig-tv": "0" });
  assert.equal(readCigaretteTvHeader(off).show, false);
  assert.equal(readCigaretteTvHeader(off).wording.tv2BoardTitle, "🚬 CIGARETTES");
  assert.equal(readCigaretteTvHeader(off).wording.wrapsTitle, "🚬 WRAPS & POUCHES");
});
