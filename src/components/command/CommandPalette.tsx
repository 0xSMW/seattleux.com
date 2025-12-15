import {
  getAllCompanies,
  getAllEvents,
  getAllFirms,
  getAllGroups,
  getAllGuides,
  getAllPlaybooks,
} from "@/lib/content/loaders";
import { extractSummaryFromMdxBody } from "@/lib/content/summary";
import { CommandPaletteClient, type CommandPaletteItem } from "./CommandPaletteClient";

export const dynamic = "force-static";

export async function CommandPalette() {
  const [firms, companies, guides, playbooks, events, groups] = await Promise.all([
    getAllFirms(),
    getAllCompanies(),
    getAllGuides({ includeDrafts: false }),
    getAllPlaybooks({ includeDrafts: false }),
    getAllEvents(),
    getAllGroups(),
  ]);

  const items: CommandPaletteItem[] = [
    { href: "/", title: "Home", group: "Pages" },
    { href: "/agencies", title: "Agencies", group: "Pages" },
    { href: "/teams", title: "Teams", group: "Pages" },
    { href: "/learn/guides", title: "Guides", group: "Pages" },
    { href: "/learn/playbooks", title: "Playbooks", group: "Pages" },
    { href: "/community/events", title: "Events", group: "Pages" },
    { href: "/community/groups", title: "Groups", group: "Pages" },
    { href: "/tags", title: "Tags", group: "Pages" },
    { href: "/search", title: "Search", group: "Pages" },
    ...firms.map((f) => ({
      href: `/agencies/${f.slug}`,
      title: f.frontmatter.name,
      description: extractSummaryFromMdxBody(f.body),
      keywords: [...(f.frontmatter.services ?? []), ...(f.frontmatter.industries ?? [])],
      group: "Agencies",
    })),
    ...companies.map((c) => ({
      href: `/teams/${c.slug}`,
      title: c.frontmatter.name,
      description: extractSummaryFromMdxBody(c.body),
      keywords: [...(c.frontmatter.teamFocus ?? []), ...(c.frontmatter.industries ?? [])],
      group: "Teams",
    })),
    ...guides.map((g) => ({
      href: `/learn/guides/${g.slug}`,
      title: g.frontmatter.title,
      description: g.frontmatter.description,
      keywords: g.frontmatter.tags ?? [],
      group: "Guides",
    })),
    ...playbooks.map((p) => ({
      href: `/learn/playbooks/${p.slug}`,
      title: p.frontmatter.title,
      description: p.frontmatter.description,
      keywords: p.frontmatter.tags ?? [],
      group: "Playbooks",
    })),
    ...events.map((e) => ({
      href: `/community/events/${e.slug}`,
      title: e.frontmatter.title,
      description: e.frontmatter.description,
      keywords: e.frontmatter.tags ?? [],
      group: "Events",
    })),
    ...groups.map((g) => ({
      href: `/community/groups/${g.slug}`,
      title: g.frontmatter.name,
      description: g.frontmatter.description,
      keywords: g.frontmatter.tags ?? [],
      group: "Groups",
    })),
  ];

  return <CommandPaletteClient items={items} />;
}

