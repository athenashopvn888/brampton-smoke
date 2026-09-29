const beforeUrl = process.env.SPEED_PILOT_BEFORE_URL || "https://www.bramptonsmokecannabis.com";
const afterUrl = process.env.SPEED_PILOT_AFTER_URL || "http://127.0.0.1:3011";

function decode(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function extract(html) {
  const title = decode(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || "");
  const h1 = decode((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || "").replace(/<[^>]+>/g, ""));
  const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i)?.[1] ||
    html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i)?.[1] || "";
  const robots = html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)/i)?.[1] ||
    html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']robots["']/i)?.[1] || "";
  const jsonLd = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
    .map((match) => JSON.parse(match[1]))
    .map((value) => JSON.stringify(value))
    .sort();
  return { title, h1, canonical, robots, jsonLd };
}

const [beforeHtml, afterHtml] = await Promise.all([
  fetch(beforeUrl).then((response) => response.text()),
  fetch(afterUrl).then((response) => response.text()),
]);
const before = extract(beforeHtml);
const after = extract(afterHtml);

for (const key of ["title", "h1", "canonical", "robots", "jsonLd"]) {
  if (JSON.stringify(before[key]) !== JSON.stringify(after[key])) {
    console.error(`FAIL ${key}`, { before: before[key], after: after[key] });
    process.exitCode = 1;
  } else {
    console.log(`PASS ${key}: identical`);
  }
}
