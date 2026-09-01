import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");

test("public nicotine vape category labels use the full keyword", () => {
  const navbar = read("app/components/Navbar.tsx");
  const products = read("app/lib/products.ts");
  const assetGenerator = read("scripts/generate-bsc-real-assets.py");

  assert.match(navbar, /href: "\/items\/vapes", label: "Nicotine Vape"/);
  assert.match(products, /name: "Nicotine Vape",\s*slug: "vapes"/);
  assert.match(assetGenerator, /\("nic-vape", "NICOTINE VAPE"/);
  assert.doesNotMatch(`${navbar}\n${products}\n${assetGenerator}`, /["']NIC VAPE["']|["']Nic Vape["']/);
});

test("nicotine and THC vape category routes remain distinct", () => {
  const navbar = read("app/components/Navbar.tsx");

  assert.match(navbar, /href: "\/items\/vapes", label: "Nicotine Vape"/);
  assert.match(navbar, /href: "\/items\/vape-disposables", label: "THC Vape"/);
});

