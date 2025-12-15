import type { MetadataRoute } from "next";
import {
  getAllCompanies,
  getAllEvents,
  getAllFirms,
  getAllGroups,
  getAllGuides,
  getAllPlaybooks,
} from "@/lib/content/loaders";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

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

  return [
    { url: siteUrl, lastModified: now },
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
    ...events.map((event) => ({
      url: `${siteUrl}/community/events/${event.slug}`,
      lastModified: new Date(event.frontmatter.startAt),
    })),
    { url: `${siteUrl}/community/groups`, lastModified: now },
    ...groups.map((group) => ({
      url: `${siteUrl}/community/groups/${group.slug}`,
      lastModified: new Date(group.frontmatter.lastVerified),
    })),
    { url: `${siteUrl}/contribute`, lastModified: now },
  ];
}
