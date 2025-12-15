import Link from "next/link";
import { getAllGuides, getAllPlaybooks } from "@/lib/content/loaders";

export const dynamic = "force-static";

type TagCount = { tag: string; count: number };

export default async function TagsIndexPage() {
  const [guides, playbooks] = await Promise.all([
    getAllGuides({ includeDrafts: false }),
    getAllPlaybooks({ includeDrafts: false }),
  ]);

  const counts = new Map<string, number>();
  for (const item of [...guides, ...playbooks]) {
    for (const tag of item.frontmatter.tags ?? []) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  const tags: TagCount[] = Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));

  return (
    <main className="mx-auto max-w-4xl space-y-8 px-6 py-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Tags
        </h1>
        <p className="text-muted-foreground">
          Browse topics across guides and playbooks.
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tags.map((t) => (
          <Link
            key={t.tag}
            href={`/tags/${encodeURIComponent(t.tag)}`}
            className="rounded-2xl border border-border/40 bg-card p-4 shadow-sm hover:bg-accent"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-semibold text-foreground">{t.tag}</div>
              <div className="text-xs text-muted-foreground">{t.count}</div>
            </div>
          </Link>
        ))}
        {tags.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border/60 bg-card p-8 text-sm text-muted-foreground sm:col-span-2 lg:col-span-3">
            No tags yet.
          </div>
        ) : null}
      </section>
    </main>
  );
}

