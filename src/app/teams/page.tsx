import { getAllCompanies } from "@/lib/content/loaders";
import { getCompanyFacets } from "@/lib/content/facets";
import { FilterPanel } from "@/components/filters/FilterPanel";
import { isStale } from "@/lib/content/stale";
import { TeamsListClient } from "./TeamsListClient";

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

  const items = results.map((company) => ({
    slug: company.slug,
    name: company.frontmatter.name,
    presence: company.frontmatter.seattlePresence,
    focus: company.frontmatter.teamFocus ?? [],
    featured: Boolean(company.frontmatter.featured),
    stale: isStale(company.frontmatter.lastVerified),
  }));

  const resetKey = params.toString();

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

      {items.length > 0 ? (
        <TeamsListClient items={items} resetKey={resetKey} />
      ) : (
        <div className="rounded-xl border border-dashed border-border p-8 text-sm text-muted-foreground">
          No results. Try clearing filters or changing your search.
        </div>
      )}
    </main>
  );
}
