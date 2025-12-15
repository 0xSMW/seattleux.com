import { slugify } from "@/lib/text/slugify";

export type TocItem = { id: string; text: string; depth: 2 | 3 };

export function extractTocFromMdx(body: string, maxItems = 12): TocItem[] {
  const lines = body.split("\n");
  const items: TocItem[] = [];
  let inCodeBlock = false;

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    if (line.startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const h2 = /^##\s+(.+)$/.exec(line);
    if (h2) {
      const text = h2[1].trim();
      const id = slugify(text);
      if (id) items.push({ id, text, depth: 2 });
      if (items.length >= maxItems) break;
      continue;
    }
    const h3 = /^###\s+(.+)$/.exec(line);
    if (h3) {
      const text = h3[1].trim();
      const id = slugify(text);
      if (id) items.push({ id, text, depth: 3 });
      if (items.length >= maxItems) break;
    }
  }

  return items;
}

