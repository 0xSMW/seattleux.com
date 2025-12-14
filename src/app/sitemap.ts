import type { MetadataRoute } from "next";
import {
  getAllCompanies,
  getAllEvents,
  getAllFirms,
  getAllGroups,
  getAllGuides,
  getAllPlaybooks,
} from "@/lib/content/loaders";
import { getSiteUrl } from "@/lib/seo/site";

const siteUrl = getSiteUrl();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [firms, companies, guides, playbooks, events, groups] = await Promise.all([
    getAllFirms(),
    getAllCompanies(),
    getAllGuides({ includeDrafts: false }),
    getAllPlaybooks({ includeDrafts: false }),
    getAllEvents(),
    getAllGroups(),
  ]);

  const now = new Date();
  const tagSet = new Set<string>();
  for (const g of guides) for (const t of g.frontmatter.tags ?? []) tagSet.add(t);
  for (const p of playbooks) for (const t of p.frontmatter.tags ?? []) tagSet.add(t);
  const tags = Array.from(tagSet).sort((a, b) => a.localeCompare(b));

  return [
    { url: siteUrl, lastModified: now },
    { url: `${siteUrl}/about`, lastModified: now },
    { url: `${siteUrl}/privacy`, lastModified: now },
    { url: `${siteUrl}/agencies`, lastModified: now },
    ...firms.map((firm) => ({
      url: `${siteUrl}/agencies/${firm.slug}`,
      lastModified: new Date(firm.frontmatter.lastVerified),
    })),
    { url: `${siteUrl}/teams`, lastModified: now },
    ...companies.map((company) => ({
      url: `${siteUrl}/teams/${company.slug}`,
      lastModified: new Date(company.frontmatter.lastVerified),
    })),
    { url: `${siteUrl}/learn`, lastModified: now },
    { url: `${siteUrl}/learn/guides`, lastModified: now },
    { url: `${siteUrl}/learn/guides/rss.xml`, lastModified: now },
    ...guides.map((guide) => ({
      url: `${siteUrl}/learn/guides/${guide.slug}`,
      lastModified: new Date(guide.frontmatter.updatedAt ?? guide.frontmatter.publishedAt),
    })),
    { url: `${siteUrl}/learn/playbooks`, lastModified: now },
    ...playbooks.map((playbook) => ({
      url: `${siteUrl}/learn/playbooks/${playbook.slug}`,
      lastModified: new Date(playbook.frontmatter.publishedAt),
    })),
    { url: `${siteUrl}/community`, lastModified: now },
    { url: `${siteUrl}/community/events`, lastModified: now },
    { url: `${siteUrl}/community/events.ics`, lastModified: now },
    ...events.map((event) => ({
      url: `${siteUrl}/community/events/${event.slug}`,
      lastModified: new Date(event.frontmatter.startAt),
    })),
    { url: `${siteUrl}/community/groups`, lastModified: now },
    ...groups.map((group) => ({
      url: `${siteUrl}/community/groups/${group.slug}`,
      lastModified: new Date(group.frontmatter.lastVerified),
    })),
    { url: `${siteUrl}/tags`, lastModified: now },
    ...tags.map((tag) => ({
      url: `${siteUrl}/tags/${encodeURIComponent(tag)}`,
      lastModified: now,
    })),
    { url: `${siteUrl}/search`, lastModified: now },
    { url: `${siteUrl}/policies/listings`, lastModified: now },
    { url: `${siteUrl}/code-of-conduct`, lastModified: now },
    { url: `${siteUrl}/stale`, lastModified: now },
    { url: `${siteUrl}/contribute`, lastModified: now },
  ];
}
