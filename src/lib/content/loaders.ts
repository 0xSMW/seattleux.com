import matter from "gray-matter";
import readingTime from "reading-time";
import { z } from "zod";

import type { ContentEntry, ContentKind } from "./types";
import { listMdxSlugs, readMdxFile } from "./fs";
import { contentPaths } from "./paths";
import {
  CompanyFrontmatterSchema,
  EventFrontmatterSchema,
  FirmFrontmatterSchema,
  GuideFrontmatterSchema,
  GroupFrontmatterSchema,
  PlaybookFrontmatterSchema,
} from "./schemas";

function parseFrontmatter<T extends z.ZodTypeAny>(
  schema: T,
  data: unknown,
  context: string,
): z.infer<T> {
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((issue) => `${issue.path.join(".") || "(root)"}: ${issue.message}`)
      .join("; ");
    throw new Error(`Invalid frontmatter in ${context}: ${issues}`);
  }
  return parsed.data;
}

export type FirmEntry = ContentEntry<z.infer<typeof FirmFrontmatterSchema>>;
export type CompanyEntry = ContentEntry<z.infer<typeof CompanyFrontmatterSchema>>;
export type GuideEntry = ContentEntry<
  z.infer<typeof GuideFrontmatterSchema> & { readingTimeMinutes: number }
>;

export type PlaybookEntry = ContentEntry<
  z.infer<typeof PlaybookFrontmatterSchema> & { readingTimeMinutes: number }
>;

export type EventEntry = ContentEntry<z.infer<typeof EventFrontmatterSchema>>;

export type GroupEntry = ContentEntry<z.infer<typeof GroupFrontmatterSchema>>;

export async function getAllFirms(): Promise<FirmEntry[]> {
  const slugs = await listMdxSlugs(contentPaths.firms);
  const entries = await Promise.all(slugs.map((slug) => getFirmBySlug(slug)));
  return entries.sort((a, b) => {
    const featuredA = a.frontmatter.featured ? 1 : 0;
    const featuredB = b.frontmatter.featured ? 1 : 0;
    if (featuredA !== featuredB) return featuredB - featuredA;
    return a.frontmatter.name.localeCompare(b.frontmatter.name);
  });
}

export async function getFirmBySlug(slug: string): Promise<FirmEntry> {
  const source = await readMdxFile(contentPaths.firms, slug);
  const { data, content } = matter(source);
  const frontmatter = parseFrontmatter(
    FirmFrontmatterSchema,
    data,
    `content/firms/${slug}.mdx`,
  );

  return { kind: "firms", slug, frontmatter, body: content };
}

export async function getAllCompanies(): Promise<CompanyEntry[]> {
  const slugs = await listMdxSlugs(contentPaths.companies);
  const entries = await Promise.all(
    slugs.map((slug) => getCompanyBySlug(slug)),
  );
  return entries.sort((a, b) => {
    const featuredA = a.frontmatter.featured ? 1 : 0;
    const featuredB = b.frontmatter.featured ? 1 : 0;
    if (featuredA !== featuredB) return featuredB - featuredA;
    return a.frontmatter.name.localeCompare(b.frontmatter.name);
  });
}

export async function getCompanyBySlug(slug: string): Promise<CompanyEntry> {
  const source = await readMdxFile(contentPaths.companies, slug);
  const { data, content } = matter(source);
  const frontmatter = parseFrontmatter(
    CompanyFrontmatterSchema,
    data,
    `content/companies/${slug}.mdx`,
  );

  return { kind: "companies", slug, frontmatter, body: content };
}

export async function getAllGuides(options?: {
  includeDrafts?: boolean;
}): Promise<GuideEntry[]> {
  const includeDrafts = options?.includeDrafts ?? false;
  const slugs = await listMdxSlugs(contentPaths.guides);
  const entries = await Promise.all(slugs.map((slug) => getGuideBySlug(slug)));
  const filtered = includeDrafts
    ? entries
    : entries.filter((entry) => !entry.frontmatter.draft);
  return filtered.sort(
    (a, b) =>
      Date.parse(b.frontmatter.publishedAt) - Date.parse(a.frontmatter.publishedAt),
  );
}

export async function getGuideBySlug(slug: string): Promise<GuideEntry> {
  const source = await readMdxFile(contentPaths.guides, slug);
  const { data, content } = matter(source);
  const frontmatter = parseFrontmatter(
    GuideFrontmatterSchema,
    data,
    `content/guides/${slug}.mdx`,
  );
  const stats = readingTime(content);
  const readingTimeMinutes = Math.max(1, Math.round(stats.minutes));

  return {
    kind: "guides",
    slug,
    frontmatter: { ...frontmatter, readingTimeMinutes },
    body: content,
  };
}

export async function getAllPlaybooks(options?: {
  includeDrafts?: boolean;
}): Promise<PlaybookEntry[]> {
  const includeDrafts = options?.includeDrafts ?? false;
  const slugs = await listMdxSlugs(contentPaths.playbooks);
  assertUniqueSlugs("playbooks", slugs);
  const entries = await Promise.all(
    slugs.map((slug) => getPlaybookBySlug(slug)),
  );
  const filtered = includeDrafts
    ? entries
    : entries.filter((entry) => !entry.frontmatter.draft);
  return filtered.sort(
    (a, b) =>
      Date.parse(b.frontmatter.publishedAt) - Date.parse(a.frontmatter.publishedAt),
  );
}

export async function getPlaybookBySlug(slug: string): Promise<PlaybookEntry> {
  const source = await readMdxFile(contentPaths.playbooks, slug);
  const { data, content } = matter(source);
  const frontmatter = parseFrontmatter(
    PlaybookFrontmatterSchema,
    data,
    `content/playbooks/${slug}.mdx`,
  );
  const stats = readingTime(content);
  const readingTimeMinutes = Math.max(1, Math.round(stats.minutes));

  return {
    kind: "playbooks",
    slug,
    frontmatter: { ...frontmatter, readingTimeMinutes },
    body: content,
  };
}

export async function getAllEvents(): Promise<EventEntry[]> {
  const slugs = await listMdxSlugs(contentPaths.events);
  assertUniqueSlugs("events", slugs);
  const entries = await Promise.all(slugs.map((slug) => getEventBySlug(slug)));
  return entries.sort(
    (a, b) => Date.parse(a.frontmatter.startAt) - Date.parse(b.frontmatter.startAt),
  );
}

export async function getEventBySlug(slug: string): Promise<EventEntry> {
  const source = await readMdxFile(contentPaths.events, slug);
  const { data, content } = matter(source);
  const frontmatter = parseFrontmatter(
    EventFrontmatterSchema,
    data,
    `content/events/${slug}.mdx`,
  );

  return { kind: "events", slug, frontmatter, body: content };
}

export async function getAllGroups(): Promise<GroupEntry[]> {
  const slugs = await listMdxSlugs(contentPaths.groups);
  assertUniqueSlugs("groups", slugs);
  const entries = await Promise.all(slugs.map((slug) => getGroupBySlug(slug)));
  return entries.sort((a, b) => a.frontmatter.name.localeCompare(b.frontmatter.name));
}

export async function getGroupBySlug(slug: string): Promise<GroupEntry> {
  const source = await readMdxFile(contentPaths.groups, slug);
  const { data, content } = matter(source);
  const frontmatter = parseFrontmatter(
    GroupFrontmatterSchema,
    data,
    `content/groups/${slug}.mdx`,
  );

  return { kind: "groups", slug, frontmatter, body: content };
}

export function assertUniqueSlugs(
  kind: ContentKind,
  slugs: string[],
): void {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const slug of slugs) {
    if (seen.has(slug)) duplicates.add(slug);
    seen.add(slug);
  }
  if (duplicates.size > 0) {
    throw new Error(
      `Duplicate slugs detected for ${kind}: ${Array.from(duplicates).join(", ")}`,
    );
  }
}
