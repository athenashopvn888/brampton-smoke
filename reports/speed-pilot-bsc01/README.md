# BSC01 mobile speed pilot readback

## Lighthouse mobile (three runs; median in bold)

| Mode | State | LCP runs (ms) | TBT runs (ms) | CLS runs | Total-byte runs | Median LCP | Median TBT | Median CLS | Median bytes |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Simulated | Before live | 2,969 / 18,436 / 21,146 | 53.5 / 87 / 135 | 0 / 0 / 0 | 5,787,166 / 5,786,968 / 5,787,446 | **18,436 ms** | **87 ms** | **0** | **5,787,166** |
| Simulated | After local production build | 3,949 / 3,788 / 3,780 | 34.5 / 30 / 27 | 0 / 0 / 0 | 1,172,512 / 1,172,519 / 1,172,519 | **3,788 ms** | **30 ms** | **0** | **1,172,519** |
| DevTools | Before live | 13,149 / 13,028 / 12,579 | 286 / 239 / 301 | 0 / 0 / 0 | 5,340,714 / 5,340,996 / 5,340,978 | **13,028 ms** | **286 ms** | **0** | **5,340,978** |
| DevTools | After local production build | 2,862 / 3,071 / 2,739 | 267 / 287 / 219 | 0 / 0 / 0 | 1,118,034 / 1,118,062 / 1,118,059 | **2,862 ms** | **267 ms** | **0** | **1,118,059** |

Targets pass: both after medians have LCP at or below 4 seconds, transfer below 1.5 MB, CLS at 0, and TBT below the matching before median.

## Protected rendered HTML

`node scripts/verify-speed-pilot-seo.mjs` compared the current live homepage with the local production build.

- PASS: title identical
- PASS: H1 identical
- PASS: canonical identical
- PASS: meta robots identical
- PASS: JSON-LD identical

## Age gate and responsive views

`node scripts/verify-speed-pilot.mjs` used a fresh browser context for each flow.

- PASS: selecting **No, I am not** kept the blocking overlay and showed Access Denied.
- PASS: selecting **Yes, I am 19+** removed the overlay and exposed the homepage.
- PASS: screenshots captured at 390 px and 1280 px; Lighthouse CLS remained 0.

Screenshots:

- `homepage-390px.png`
- `homepage-1280px.png`

## Homepage links

`node scripts/verify-homepage-links.mjs` crawled 33 internal homepage links from the local production build.

- PASS: no 404s
- PASS: no redirects

## Implementation notes

- The existing hero image, alt text, and position are unchanged; `next/image` now emits responsive widths and gives only the LCP image high fetch priority.
- Homepage banners and tiles use lazy responsive images.
- The age gate, navbar, and homepage brand mark use the same logo in a 5,226-byte derivative; `public/storeFavicon.webp` remains in place.
- The homepage Google Sheets review fetch moved from the browser to a one-hour server revalidation path.
- Google Analytics tags remain present and now load with `next/script` after interaction.
- Google Fonts are self-hosted through `next/font` with swap behavior.
- Public banners/products use moderate cache headers; Next.js retains its built-in immutable caching for fingerprinted assets.
