export type SameSitePart =
  | { kind: "text"; value: string }
  | { kind: "link"; text: string; href: string };

const SAME_SITE_LINK = /\[([^\]]+)\]\((\/(?!\/)[^)\s]+)\)/g;

export function splitSameSiteLinks(body: string): SameSitePart[] {
  const parts: SameSitePart[] = [];
  let last = 0;
  for (const match of body.matchAll(SAME_SITE_LINK)) {
    const index = match.index ?? 0;
    if (index > last) parts.push({ kind: "text", value: body.slice(last, index) });
    parts.push({ kind: "link", text: match[1], href: match[2] });
    last = index + match[0].length;
  }
  if (last < body.length || parts.length === 0) parts.push({ kind: "text", value: body.slice(last) });
  return parts;
}
