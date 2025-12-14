import { getAllFirms } from "@/lib/content/loaders";
import { getFirmFacets } from "@/lib/content/facets";
import { FilterPanel } from "@/components/filters/FilterPanel";
import { isStale } from "@/lib/content/stale";
import { AgenciesListClient } from "./AgenciesListClient";

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

export default async function AgenciesIndexPage(props: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const firms = await getAllFirms();
  const facets = getFirmFacets(firms);
  const rawSearchParams = (await props.searchParams) ?? {};
  const params = toURLSearchParams(rawSearchParams);

  const q = (params.get("q") ?? "").trim().toLowerCase();
  const selectedLocations = params.getAll("location");
  const selectedServices = params.getAll("service");
  const selectedIndustries = params.getAll("industry");

  const results = firms.filter((firm) => {
    const name = firm.frontmatter.name.toLowerCase();
    const haystack = [
      name,
      ...(firm.frontmatter.locations ?? []).map((v) => v.toLowerCase()),
      ...(firm.frontmatter.services ?? []).map((v) => v.toLowerCase()),
      ...(firm.frontmatter.industries ?? []).map((v) => v.toLowerCase()),
    ].join(" ");

    if (q && !haystack.includes(q)) return false;

    const matchesLocation =
      selectedLocations.length === 0 ||
      selectedLocations.some((v) => (firm.frontmatter.locations ?? []).includes(v));
    const matchesService =
      selectedServices.length === 0 ||
      selectedServices.some((v) => (firm.frontmatter.services ?? []).includes(v));
    const matchesIndustry =
      selectedIndustries.length === 0 ||
      selectedIndustries.some((v) => (firm.frontmatter.industries ?? []).includes(v));

    return matchesLocation && matchesService && matchesIndustry;
  });

  const items = results.map((firm) => ({
    slug: firm.slug,
    name: firm.frontmatter.name,
    locations: firm.frontmatter.locations ?? [],
    services: firm.frontmatter.services ?? [],
    featured: Boolean(firm.frontmatter.featured),
    stale: isStale(firm.frontmatter.lastVerified),
  }));

  const resetKey = params.toString();

  return (
    <main className="mx-auto max-w-4xl space-y-8 px-6 py-16">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Seattle UX Agencies
        </h1>
        <p className="text-muted-foreground">
          Browse agencies and studios. Listings are community-maintained.
        </p>
      </header>

      <FilterPanel
        searchKeyLabel="Search"
        searchPlaceholder="Search agencies, services, industries…"
        facetGroups={[
          { key: "location", label: "Location", values: facets.locations },
          { key: "service", label: "Services", values: facets.services },
          { key: "industry", label: "Industries", values: facets.industries },
        ]}
      />

      <div className="text-sm text-muted-foreground">{results.length} results</div>

      {items.length > 0 ? (
        <AgenciesListClient items={items} resetKey={resetKey} />
      ) : (
        <div className="rounded-xl border border-dashed border-border p-8 text-sm text-muted-foreground">
          No results. Try clearing filters or changing your search.
        </div>
      )}
    </main>
  );
}
