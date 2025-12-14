import {
  getAllCompanies,
  getAllEvents,
  getAllFirms,
  getAllGroups,
  getAllGuides,
  getAllPlaybooks,
} from "@/lib/content/loaders";
import { extractSummaryFromMdxBody } from "@/lib/content/summary";
import { SearchClient, type SearchItem } from "./SearchClient";

export const dynamic = "force-static";

export default async function SearchPage() {
  const [firms, companies, guides, playbooks, events, groups] = await Promise.all([
    getAllFirms(),
    getAllCompanies(),
    getAllGuides({ includeDrafts: false }),
    getAllPlaybooks({ includeDrafts: false }),
    getAllEvents(),
    getAllGroups(),
  ]);

  const items: SearchItem[] = [
    ...firms.map((firm) => ({
      href: `/agencies/${firm.slug}`,
      title: firm.frontmatter.name,
      description: extractSummaryFromMdxBody(firm.body),
      tags: firm.frontmatter.services ?? [],
      kind: "agency" as const,
    })),
    ...companies.map((company) => ({
      href: `/teams/${company.slug}`,
      title: company.frontmatter.name,
      description: extractSummaryFromMdxBody(company.body),
      tags: company.frontmatter.teamFocus ?? [],
      kind: "team" as const,
    })),
    ...guides.map((guide) => ({
      href: `/learn/guides/${guide.slug}`,
      title: guide.frontmatter.title,
      description: guide.frontmatter.description,
      tags: guide.frontmatter.tags ?? [],
      kind: "guide" as const,
    })),
    ...playbooks.map((playbook) => ({
      href: `/learn/playbooks/${playbook.slug}`,
      title: playbook.frontmatter.title,
      description: playbook.frontmatter.description,
      tags: playbook.frontmatter.tags ?? [],
      kind: "playbook" as const,
    })),
    ...events.map((event) => ({
      href: `/community/events/${event.slug}`,
      title: event.frontmatter.title,
      description: event.frontmatter.description,
      tags: event.frontmatter.tags ?? [],
      kind: "event" as const,
    })),
    ...groups.map((group) => ({
      href: `/community/groups/${group.slug}`,
      title: group.frontmatter.name,
      description: group.frontmatter.description,
      tags: group.frontmatter.tags ?? [],
      kind: "group" as const,
    })),
  ];

  return (
    <main className="mx-auto max-w-5xl space-y-8 px-6 py-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Search
        </h1>
        <p className="text-muted-foreground">
          Search across agencies, teams, guides, playbooks, events, and groups.
        </p>
      </header>
      <SearchClient items={items} />
    </main>
  );
}

