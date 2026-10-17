import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const tvPage = readFileSync("app/tv/page.tsx", "utf8");

test("BSC01 TV uses 6g for the top three Weed tiers", () => {
  assert.match(tvPage, /const isTop3 = \["EXOTIC","PREMIUM","AAA\+"\]\.includes\(tier\)/);
  assert.match(tvPage, /\{isTop3 \? "6g" : "5g"\}/);
  assert.match(tvPage, /\{f\.isSale \? "6G=" : "3G-6G"\}/);
});

test("BSC01 TV preserves AA Weed at 5g", () => {
  assert.match(tvPage, /isAA \? <span className=\{styles\.headerDeal\}>\$20 5g AA<\/span>/);
  assert.match(tvPage, /if \(isAA\)[\s\S]*?<span className=\{styles\.pLab\}>5g<\/span>/);
});
