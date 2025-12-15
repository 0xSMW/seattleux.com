import type { CompanyEntry, FirmEntry, GuideEntry } from "./loaders";

export function uniqueSorted(values: Iterable<string>): string[] {
  return Array.from(new Set(values))
    .map((value) => value.trim())
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));
}

export function getFirmFacets(firms: FirmEntry[]) {
  return {
    locations: uniqueSorted(firms.flatMap((f) => f.frontmatter.locations ?? [])),
    services: uniqueSorted(firms.flatMap((f) => f.frontmatter.services ?? [])),
    industries: uniqueSorted(firms.flatMap((f) => f.frontmatter.industries ?? [])),
  };
}

export function getCompanyFacets(companies: CompanyEntry[]) {
  return {
    seattlePresence: uniqueSorted(companies.map((c) => c.frontmatter.seattlePresence)),
    teamFocus: uniqueSorted(companies.flatMap((c) => c.frontmatter.teamFocus ?? [])),
    industries: uniqueSorted(
      companies.flatMap((c) => c.frontmatter.industries ?? []),
    ),
  };
}

export function getGuideFacets(guides: GuideEntry[]) {
  return {
    tags: uniqueSorted(guides.flatMap((g) => g.frontmatter.tags ?? [])),
  };
}

