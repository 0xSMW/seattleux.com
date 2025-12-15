import Link from "next/link";
import { getAllPlaybooks } from "@/lib/content/loaders";
import { FilterPanel } from "@/components/filters/FilterPanel";
import { uniqueSorted } from "@/lib/content/facets";

export const dynamic = "force-static";

function toURLSearchParams(
  input: Record<string, string | string[] | undefined>,
): URLSearchParams {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(input)) {
    if (typeof value === "undefined") continue;
    if (Array.isArray(value)) value.forEach((v) => params.append(key, v));
    else params.set(key, value);
  }
  return params;
}

export default async function PlaybooksIndexPage(props: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const playbooks = await getAllPlaybooks({ includeDrafts: false });
  const tags = uniqueSorted(playbooks.flatMap((p) => p.frontmatter.tags ?? []));

  const rawSearchParams = (await props.searchParams) ?? {};
  const params = toURLSearchParams(rawSearchParams);
  const q = (params.get("q") ?? "").trim().toLowerCase();
  const selectedTags = params.getAll("tag");

  const results = playbooks.filter((playbook) => {
    const haystack = [
      playbook.frontmatter.title.toLowerCase(),
      playbook.frontmatter.description.toLowerCase(),
      ...(playbook.frontmatter.tags ?? []).map((v) => v.toLowerCase()),
    ].join(" ");

    if (q && !haystack.includes(q)) return false;
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => (playbook.frontmatter.tags ?? []).includes(tag));
    return matchesTags;
  });

  return (
    <main className="mx-auto max-w-4xl space-y-8 px-6 py-16">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Playbooks
        </h1>
        <p className="text-muted-foreground">
          Templates and checklists for common UX workflows.
        </p>
      </header>

      <FilterPanel
        searchKeyLabel="Search"
        searchPlaceholder="Search playbooks…"
        facetGroups={[{ key: "tag", label: "Tags", values: tags }]}
      />

      <div className="text-sm text-muted-foreground">{results.length} results</div>

      <section className="space-y-4">
        {results.map((playbook) => (
          <Link
            key={playbook.slug}
            href={`/learn/playbooks/${playbook.slug}`}
            className="block rounded-xl border border-border bg-card p-5 hover:bg-accent"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-base font-semibold text-foreground">
                  {playbook.frontmatter.title}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {playbook.frontmatter.description}
                </div>
              </div>
              <div className="shrink-0 text-xs text-muted-foreground">
                {playbook.frontmatter.readingTimeMinutes} min
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {(playbook.frontmatter.tags ?? []).slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
        {results.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-8 text-sm text-muted-foreground">
            No results. Try clearing filters or changing your search.
          </div>
        ) : null}
      </section>
    </main>
  );
}

