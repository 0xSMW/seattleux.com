import Link from "next/link";
import { getAllGroups } from "@/lib/content/loaders";
import { FilterPanel } from "@/components/filters/FilterPanel";

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

export default async function GroupsIndexPage(props: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const groups = await getAllGroups();
  const rawSearchParams = (await props.searchParams) ?? {};
  const params = toURLSearchParams(rawSearchParams);

  const q = (params.get("q") ?? "").trim().toLowerCase();
  const selectedTags = params.getAll("tag");
  const selectedCadence = params.getAll("cadence");

  const tags = Array.from(
    new Set(groups.flatMap((g) => g.frontmatter.tags ?? [])),
  ).sort((a, b) => a.localeCompare(b));
  const cadences = Array.from(
    new Set(groups.map((g) => g.frontmatter.meetingCadence ?? "").filter(Boolean)),
  ).sort((a, b) => a.localeCompare(b));

  const results = groups.filter((group) => {
    const haystack = [
      group.frontmatter.name,
      group.frontmatter.description,
      group.frontmatter.location ?? "",
      group.frontmatter.meetingCadence ?? "",
      ...(group.frontmatter.tags ?? []),
    ]
      .join(" ")
      .toLowerCase();

    if (q && !haystack.includes(q)) return false;

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => (group.frontmatter.tags ?? []).includes(tag));
    const matchesCadence =
      selectedCadence.length === 0 ||
      selectedCadence.includes(group.frontmatter.meetingCadence ?? "");

    return matchesTags && matchesCadence;
  });

  return (
    <main className="mx-auto max-w-4xl space-y-8 px-6 py-16">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Groups
        </h1>
        <p className="text-muted-foreground">
          Ongoing Seattle UX communities and meetups.
        </p>
      </header>

      <FilterPanel
        searchKeyLabel="Search"
        searchPlaceholder="Search groups…"
        facetGroups={[
          { key: "tag", label: "Tags", values: tags },
          { key: "cadence", label: "Cadence", values: cadences },
        ]}
      />

      <section className="grid gap-4 sm:grid-cols-2">
        {results.map((group) => (
          <Link
            key={group.slug}
            href={`/community/groups/${group.slug}`}
            className="rounded-xl border border-border bg-card p-5 hover:bg-accent"
          >
            <div className="text-base font-semibold text-foreground">
              {group.frontmatter.name}
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              {group.frontmatter.location ?? "Seattle area"}
              {group.frontmatter.meetingCadence
                ? ` · ${group.frontmatter.meetingCadence}`
                : ""}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {(group.frontmatter.tags ?? []).slice(0, 4).map((tag) => (
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
          <div className="rounded-xl border border-dashed border-border p-8 text-sm text-muted-foreground sm:col-span-2">
            No results. Try clearing filters or changing your search.
          </div>
        ) : null}
      </section>
    </main>
  );
}
