import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllGuides, getAllPlaybooks } from "@/lib/content/loaders";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const [guides, playbooks] = await Promise.all([
    getAllGuides({ includeDrafts: false }),
    getAllPlaybooks({ includeDrafts: false }),
  ]);

  const tags = new Set<string>();
  for (const item of [...guides, ...playbooks]) {
    for (const tag of item.frontmatter.tags ?? []) tags.add(tag);
  }

  return Array.from(tags).map((tag) => ({ tag: encodeURIComponent(tag) }));
}

export default async function TagDetailPage(props: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await props.params;
  const decoded = decodeURIComponent(tag);

  const [guides, playbooks] = await Promise.all([
    getAllGuides({ includeDrafts: false }),
    getAllPlaybooks({ includeDrafts: false }),
  ]);

  const guidesWithTag = guides.filter((g) =>
    (g.frontmatter.tags ?? []).includes(decoded),
  );
  const playbooksWithTag = playbooks.filter((p) =>
    (p.frontmatter.tags ?? []).includes(decoded),
  );

  if (guidesWithTag.length === 0 && playbooksWithTag.length === 0) notFound();

  return (
    <main className="mx-auto max-w-4xl space-y-10 px-6 py-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          {decoded}
        </h1>
        <p className="text-muted-foreground">
          {guidesWithTag.length} guides · {playbooksWithTag.length} playbooks
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Guides</h2>
        {guidesWithTag.length === 0 ? (
          <div className="text-sm text-muted-foreground">No guides yet.</div>
        ) : (
          <div className="space-y-3">
            {guidesWithTag.map((guide) => (
              <Link
                key={guide.slug}
                href={`/learn/guides/${guide.slug}`}
                className="block rounded-2xl border border-border/40 bg-card p-5 shadow-sm hover:bg-accent"
              >
                <div className="text-base font-semibold text-foreground">
                  {guide.frontmatter.title}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {guide.frontmatter.description}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Playbooks</h2>
        {playbooksWithTag.length === 0 ? (
          <div className="text-sm text-muted-foreground">No playbooks yet.</div>
        ) : (
          <div className="space-y-3">
            {playbooksWithTag.map((playbook) => (
              <Link
                key={playbook.slug}
                href={`/learn/playbooks/${playbook.slug}`}
                className="block rounded-2xl border border-border/40 bg-card p-5 shadow-sm hover:bg-accent"
              >
                <div className="text-base font-semibold text-foreground">
                  {playbook.frontmatter.title}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {playbook.frontmatter.description}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

