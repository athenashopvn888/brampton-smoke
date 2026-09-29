const baseUrl = process.env.SPEED_PILOT_URL || "http://127.0.0.1:3011";
const html = await fetch(baseUrl).then((response) => response.text());
const links = [
  ...new Set(
    [...html.matchAll(/<a[^>]+href=["']([^"']+)/gi)]
      .map((match) => match[1])
      .filter((href) => href.startsWith("/")),
  ),
];

const failures = [];
for (const href of links) {
  const response = await fetch(new URL(href, baseUrl), { redirect: "manual" });
  if (response.status >= 300) failures.push({ href, status: response.status });
}

if (failures.length) {
  console.error("FAIL homepage links", failures);
  process.exitCode = 1;
} else {
  console.log(`PASS homepage link crawl: ${links.length} internal links, no 404s or redirects`);
}
