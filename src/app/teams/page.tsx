import Link from "next/link";
import { getAllCompanies } from "@/lib/content/loaders";
import { getCompanyFacets } from "@/lib/content/facets";
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

export default async function TeamsIndexPage(props: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const companies = await getAllCompanies();
  const facets = getCompanyFacets(companies);
  const rawSearchParams = (await props.searchParams) ?? {};
  const params = toURLSearchParams(rawSearchParams);

  const q = (params.get("q") ?? "").trim().toLowerCase();
  const selectedPresence = params.getAll("presence");
  const selectedFocus = params.getAll("focus");
  const selectedIndustries = params.getAll("industry");

  const results = companies.filter((company) => {
    const name = company.frontmatter.name.toLowerCase();
    const haystack = [
      name,
      company.frontmatter.seattlePresence.toLowerCase(),
      ...(company.frontmatter.industries ?? []).map((v) => v.toLowerCase()),
      ...(company.frontmatter.teamFocus ?? []).map((v) => v.toLowerCase()),
    ].join(" ");

    if (q && !haystack.includes(q)) return false;

    const matchesPresence =
      selectedPresence.length === 0 ||
      selectedPresence.some((v) => company.frontmatter.seattlePresence === v);
    const matchesFocus =
      selectedFocus.length === 0 ||
      selectedFocus.some((v) => (company.frontmatter.teamFocus ?? []).includes(v));
    const matchesIndustry =
      selectedIndustries.length === 0 ||
      selectedIndustries.some((v) =>
        (company.frontmatter.industries ?? []).includes(v),
      );

    return matchesPresence && matchesFocus && matchesIndustry;
  });

  return (
    <main className="mx-auto max-w-4xl space-y-8 px-6 py-16">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Seattle UX Teams
        </h1>
        <p className="text-muted-foreground">
          Browse Seattle-area companies with UX/design/research teams.
        </p>
      </header>

      <FilterPanel
        searchKeyLabel="Search"
        searchPlaceholder="Search teams, focus areas, industries…"
        facetGroups={[
          { key: "presence", label: "Presence", values: facets.seattlePresence },
          { key: "focus", label: "Team focus", values: facets.teamFocus },
          { key: "industry", label: "Industries", values: facets.industries },
        ]}
      />

      <div className="text-sm text-muted-foreground">{results.length} results</div>

      <section className="grid gap-4 sm:grid-cols-2">
        {results.map((company) => (
          <Link
            key={company.slug}
            href={`/teams/${company.slug}`}
            className="rounded-xl border border-border bg-card p-5 hover:bg-accent"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="text-base font-semibold text-foreground">
                {company.frontmatter.name}
              </div>
              {company.frontmatter.featured ? (
                <span className="rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                  Featured
                </span>
              ) : null}
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              {company.frontmatter.seattlePresence}
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {(company.frontmatter.teamFocus ?? []).slice(0, 3).map((focus) => (
                <span
                  key={focus}
                  className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground"
                >
                  {focus}
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

