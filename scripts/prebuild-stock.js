/**
 * Prebuild script: Fetches live stock data from Apps Script
 * and writes flowers.json + items.json before Next.js builds.
 *
 * Prefer ?store=BSC01&stock=1 for ONHAND. Combined flowers+items
 * come from the default endpoint (120s timeout) or catalog=1 + stock filter.
 * Never invent SKUs or prices.
 *
 * This runs automatically via "prebuild" in package.json.
 * If the fetch fails, the existing JSON files are kept as fallback.
 */

/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require('fs');
const path = require('path');

const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL || '';
const STORE_CODE = 'BSC01';
const FETCH_TIMEOUT_MS = 120000;
const FLOWERS_PATH = path.join(__dirname, '..', 'app', 'lib', 'flowers.json');
const ITEMS_PATH = path.join(__dirname, '..', 'app', 'lib', 'items.json');
const SNAPSHOT_PATH = path.join(__dirname, '..', 'app', 'lib', 'stock-snapshot.json');

async function fetchJson(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }
  return res.json();
}

function applyStockFilter(catalog, stockPayload) {
  const stock = (stockPayload && stockPayload.stock) || {};
  const flowers = [];

  for (const flower of catalog.flowers || []) {
    const sku = String(flower.sku || '').trim();
    const skuStock = stock[sku];
    if (stockPayload && !skuStock) continue;

    const next = { ...flower };
    if (skuStock) {
      if (!skuStock['3g'] || skuStock['3g'] <= 0) next.price3g = null;
      if (!skuStock['5g'] || skuStock['5g'] <= 0) next.price5g = null;
      if (!skuStock['14g'] || skuStock['14g'] <= 0) next.price14g = null;
      if (!skuStock['28g'] || skuStock['28g'] <= 0) next.price28g = null;
    }

    if (!next.price3g && !next.price5g && !next.price14g && !next.price28g) continue;
    flowers.push(next);
  }

  const items = [];
  for (const item of catalog.items || []) {
    if (!stockPayload) {
      items.push(item);
      continue;
    }
    const inStock = String(item.sku || '')
      .split(',')
      .some((part) => {
        const sku = part.trim().replace(/\.0$/, '');
        return Boolean(sku && stock[sku]);
      });
    if (inStock) items.push(item);
  }

  return { flowers, items };
}

function postProcessFlowers(flowers) {
  const SALE_RE = /\bSALE\b/i;
  const ON_SALE_RE = /ON\s*SALE/i;
  function hasSalePrice(f) {
    return !!(
      (f.price3g && f.price3g.sale !== null) ||
      (f.price5g && f.price5g.sale !== null) ||
      (f.price14g && f.price14g.sale !== null) ||
      (f.price28g && f.price28g.sale !== null)
    );
  }
  function cleanName(name) {
    return String(name || '')
      .replace(/\s*\(?\s*AAA\+?\s*ON\s*SALE\s*\)?\s*$/i, '')
      .replace(/\s*\(?\s*AAA\+?\s*SALE!?\s*\)?\s*$/i, '')
      .replace(/\s*\bSALE!?\s*$/i, '')
      .replace(/\s*\bON\s*SALE\s*$/i, '')
      .trim();
  }

  let saleFixed = 0;
  for (const f of flowers) {
    if (!f.isSale) {
      if (SALE_RE.test(f.name) || ON_SALE_RE.test(f.name) || hasSalePrice(f)) {
        f.isSale = true;
        saleFixed++;
      }
    }
    f.name = cleanName(f.name);
  }
  return saleFixed;
}

function postProcessItems(items) {
  let itemsFixed = 0;
  for (const it of items) {
    if (typeof it.price === 'string' && it.price.includes('[object')) {
      it.price = '';
      itemsFixed++;
    }
  }
  return itemsFixed;
}

async function loadLiveMenu() {
  const stockUrl = `${APPS_SCRIPT_URL}?store=${STORE_CODE}&stock=1`;
  console.log(`[prebuild] Fetching ONHAND stock=1 for ${STORE_CODE}...`);
  const stockData = await fetchJson(stockUrl);
  if (!stockData || !stockData.stock) {
    throw new Error('Invalid stock=1 response: missing stock map');
  }
  console.log(`[prebuild] ONHAND ${stockData.date || 'unknown'} · ${stockData.skuCount || Object.keys(stockData.stock).length} SKUs`);

  let flowers;
  let items;
  let source = 'combined';

  try {
    const combinedUrl = `${APPS_SCRIPT_URL}?store=${STORE_CODE}`;
    console.log('[prebuild] Fetching combined flowers+items from Apps Script...');
    const combined = await fetchJson(combinedUrl);
    if (!combined.flowers || !combined.items) {
      throw new Error('Invalid combined response: missing flowers or items');
    }
    flowers = combined.flowers;
    items = combined.items;
  } catch (err) {
    console.warn(`[prebuild] Combined fetch failed: ${err.message}`);
    console.log('[prebuild] Rebuilding from catalog=1 + stock=1 (no invented prices)');
    const catalogUrl = `${APPS_SCRIPT_URL}?store=${STORE_CODE}&catalog=1`;
    const catalog = await fetchJson(catalogUrl);
    if (!catalog.flowers || !catalog.items) {
      throw new Error('Invalid catalog=1 response: missing flowers or items');
    }
    const filtered = applyStockFilter(catalog, stockData);
    flowers = filtered.flowers;
    items = filtered.items;
    source = 'catalog+stock=1';
  }

  return { stockData, flowers, items, source };
}

async function main() {
  if (!APPS_SCRIPT_URL) {
    console.log('[prebuild] No APPS_SCRIPT_URL set — using existing static JSON files');
    return;
  }

  console.log('[prebuild] Fetching live stock from Apps Script...');

  try {
    const { stockData, flowers, items, source } = await loadLiveMenu();

    const saleFixed = postProcessFlowers(flowers);
    if (saleFixed > 0) console.log(`[prebuild] Fixed ${saleFixed} sale flags from names`);

    fs.writeFileSync(FLOWERS_PATH, JSON.stringify(flowers, null, 2), 'utf-8');
    console.log(`[prebuild] flowers.json updated: ${flowers.length} products`);

    const tiers = {};
    flowers.forEach((f) => { tiers[f.tier] = (tiers[f.tier] || 0) + 1; });
    Object.entries(tiers).forEach(([t, c]) => console.log(`  ${t}: ${c}`));

    const itemsFixed = postProcessItems(items);
    if (itemsFixed > 0) console.log(`[prebuild] Fixed ${itemsFixed} mangled item prices`);

    fs.writeFileSync(ITEMS_PATH, JSON.stringify(items, null, 2), 'utf-8');
    console.log(`[prebuild] items.json updated: ${items.length} products`);

    const cats = {};
    items.forEach((i) => { cats[i.category] = (cats[i.category] || 0) + 1; });
    Object.entries(cats).sort().forEach(([c, n]) => console.log(`  ${c}: ${n}`));

    const stockDate = stockData.date || null;
    const snapshot = {
      storeCode: stockData.storeCode || STORE_CODE,
      stockDate,
      skuCount: stockData.skuCount || Object.keys(stockData.stock || {}).length,
      flowerCount: flowers.length,
      itemCount: items.length,
      source,
    };
    fs.writeFileSync(SNAPSHOT_PATH, JSON.stringify(snapshot, null, 2) + '\n', 'utf-8');
    console.log(`[prebuild] stock-snapshot.json written (${snapshot.source})`);

    console.log(`[prebuild] Stock date: ${stockDate || 'unknown'}`);
    console.log('[prebuild] Done!');

  } catch (err) {
    console.warn(`[prebuild] Live fetch failed: ${err.message}`);
    console.warn('[prebuild] Keeping existing JSON files as fallback');
  }
}

main();
