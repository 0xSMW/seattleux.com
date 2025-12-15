export function relatedByTags<T extends { slug: string; frontmatter: { tags?: string[] } }>(
  items: T[],
  currentSlug: string,
  tags: string[],
  limit = 3,
): T[] {
  const tagSet = new Set(tags);
  const scored = items
    .filter((i) => i.slug !== currentSlug)
    .map((i) => {
      const overlap = (i.frontmatter.tags ?? []).filter((t) => tagSet.has(t)).length;
      return { i, overlap };
    })
    .filter((x) => x.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap || a.i.slug.localeCompare(b.i.slug));

  return scored.slice(0, limit).map((x) => x.i);
}

