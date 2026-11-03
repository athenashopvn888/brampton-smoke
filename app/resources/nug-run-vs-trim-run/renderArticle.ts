export type Inline =
  | { kind: "text"; value: string }
  | { kind: "strong"; value: string }
  | { kind: "em"; value: string }
  | { kind: "link"; text: string; href: string };

export type ArticleBlock =
  | { type: "h1" | "h2" | "h3" | "p"; inlines: Inline[] }
  | { type: "ul" | "ol"; items: Inline[][] }
  | { type: "table"; headers: Inline[][]; rows: Inline[][][] };

const INLINE_PATTERN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|\*[^*]+\*)/g;

export function parseInline(input: string): Inline[] {
  const nodes: Inline[] = [];
  let last = 0;
  for (const match of input.matchAll(INLINE_PATTERN)) {
    const index = match.index ?? 0;
    if (index > last) nodes.push({ kind: "text", value: input.slice(last, index) });
    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push({ kind: "strong", value: token.slice(2, -2) });
    } else if (token.startsWith("[")) {
      const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link) nodes.push({ kind: "link", text: link[1], href: link[2] });
    } else if (token.startsWith("*")) {
      nodes.push({ kind: "em", value: token.slice(1, -1) });
    }
    last = index + token.length;
  }
  if (last < input.length) nodes.push({ kind: "text", value: input.slice(last) });
  return nodes;
}

export function plainText(inlines: Inline[]): string {
  return inlines.map((node) => (node.kind === "link" ? node.text : node.value)).join("");
}

function splitCells(line: string): string[] {
  return line
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function isSeparatorRow(cells: string[]): boolean {
  return cells.length > 0 && cells.every((cell) => /^:?-+:?$/.test(cell));
}

function isBlockStart(line: string): boolean {
  return (
    line.startsWith("#") ||
    line.startsWith("|") ||
    line.startsWith("- ") ||
    /^\d+\.\s/.test(line) ||
    line.startsWith("Last checked:")
  );
}

export function parseArticle(markdown: string): ArticleBlock[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: ArticleBlock[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();
    if (!line) {
      index += 1;
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push({ type: "h3", inlines: parseInline(line.slice(4)) });
      index += 1;
      continue;
    }
    if (line.startsWith("## ")) {
      blocks.push({ type: "h2", inlines: parseInline(line.slice(3)) });
      index += 1;
      continue;
    }
    if (line.startsWith("# ")) {
      blocks.push({ type: "h1", inlines: parseInline(line.slice(2)) });
      index += 1;
      continue;
    }

    if (line.startsWith("|")) {
      const tableLines: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith("|")) {
        tableLines.push(lines[index].trim());
        index += 1;
      }
      const parsed = tableLines.map(splitCells);
      const headers = (parsed[0] ?? []).map(parseInline);
      const rows = parsed
        .slice(1)
        .filter((cells) => !isSeparatorRow(cells))
        .map((cells) => cells.map(parseInline));
      blocks.push({ type: "table", headers, rows });
      continue;
    }

    if (line.startsWith("- ")) {
      const items: Inline[][] = [];
      while (index < lines.length && lines[index].trim().startsWith("- ")) {
        items.push(parseInline(lines[index].trim().slice(2)));
        index += 1;
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      const items: Inline[][] = [];
      while (index < lines.length && /^\d+\.\s/.test(lines[index].trim())) {
        items.push(parseInline(lines[index].trim().replace(/^\d+\.\s+/, "")));
        index += 1;
      }
      blocks.push({ type: "ol", items });
      continue;
    }

    if (line.startsWith("Last checked:")) {
      blocks.push({ type: "p", inlines: parseInline(line) });
      index += 1;
      continue;
    }

    const paragraph = [line];
    index += 1;
    while (index < lines.length && lines[index].trim() && !isBlockStart(lines[index].trim())) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    blocks.push({ type: "p", inlines: parseInline(paragraph.join(" ")) });
  }

  return blocks;
}

export function articleHeading(blocks: ArticleBlock[]): string {
  const heading = blocks.find((block) => block.type === "h1");
  return heading && heading.type === "h1" ? plainText(heading.inlines) : "";
}

export function firstUsefulParagraph(blocks: ArticleBlock[]): string {
  for (const block of blocks) {
    if (block.type !== "p") continue;
    const text = plainText(block.inlines);
    if (text.startsWith("Last checked:")) continue;
    return text;
  }
  return "";
}
