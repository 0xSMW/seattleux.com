import { z } from "zod";

const DateString = z
  .string()
  .refine((value) => !Number.isNaN(Date.parse(value)), "Invalid date string");

const UrlString = z.string().url();

export const FirmFrontmatterSchema = z.object({
  name: z.string().min(1),
  website: UrlString,
  locations: z.array(z.string().min(1)).default([]),
  services: z.array(z.string().min(1)).default([]),
  industries: z.array(z.string().min(1)).default([]),
  teamSize: z.union([z.string().min(1), z.number().int().positive()]).optional(),
  founded: z.number().int().min(1800).max(2100).optional(),
  featured: z.boolean().optional(),
  lastVerified: DateString,
});

export type FirmFrontmatter = z.infer<typeof FirmFrontmatterSchema>;

export const CompanyFrontmatterSchema = z.object({
  name: z.string().min(1),
  website: UrlString,
  hq: z.string().min(1).optional(),
  seattlePresence: z.string().min(1),
  industries: z.array(z.string().min(1)).default([]),
  teamFocus: z.array(z.string().min(1)).default([]),
  hiringPage: UrlString.optional(),
  designSystem: UrlString.optional(),
  featured: z.boolean().optional(),
  lastVerified: DateString,
});

export type CompanyFrontmatter = z.infer<typeof CompanyFrontmatterSchema>;

export const GuideFrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  publishedAt: DateString,
  updatedAt: DateString.optional(),
  tags: z.array(z.string().min(1)).default([]),
  draft: z.boolean().optional(),
});

export type GuideFrontmatter = z.infer<typeof GuideFrontmatterSchema>;

export const PlaybookFrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  publishedAt: DateString,
  tags: z.array(z.string().min(1)).default([]),
  artifactLinks: z.array(UrlString).optional(),
  draft: z.boolean().optional(),
});

export type PlaybookFrontmatter = z.infer<typeof PlaybookFrontmatterSchema>;

export const EventFrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  startAt: DateString,
  endAt: DateString.optional(),
  venue: z.string().min(1).optional(),
  address: z.string().min(1).optional(),
  host: z.string().min(1).optional(),
  ticketUrl: UrlString.optional(),
  tags: z.array(z.string().min(1)).default([]),
  status: z.enum(["upcoming", "past", "cancelled"]).default("upcoming"),
});

export type EventFrontmatter = z.infer<typeof EventFrontmatterSchema>;

export const GroupFrontmatterSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  website: UrlString.optional(),
  location: z.string().min(1).optional(),
  meetingCadence: z.string().min(1).optional(),
  tags: z.array(z.string().min(1)).default([]),
  lastVerified: DateString,
});

export type GroupFrontmatter = z.infer<typeof GroupFrontmatterSchema>;
