import Link from "next/link";
import { getAllFirms } from "@/lib/content/loaders";
import { getFirmFacets } from "@/lib/content/facets";
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

      <section className="grid gap-4 sm:grid-cols-2">
        {results.map((firm) => (
          <Link
            key={firm.slug}
            href={`/agencies/${firm.slug}`}
            className="rounded-xl border border-border bg-card p-5 hover:bg-accent"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="text-base font-semibold text-foreground">
                {firm.frontmatter.name}
              </div>
              {firm.frontmatter.featured ? (
                <span className="rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                  Featured
                </span>
              ) : null}
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              {(firm.frontmatter.locations ?? []).join(" · ")}
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {(firm.frontmatter.services ?? []).slice(0, 3).map((service) => (
                <span
                  key={service}
                  className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground"
                >
                  {service}
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

