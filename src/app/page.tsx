import Link from "next/link";
import {
  getAllCompanies,
  getAllEvents,
  getAllFirms,
  getAllGuides,
  getAllPlaybooks,
} from "@/lib/content/loaders";
import { extractSummaryFromMdxBody } from "@/lib/content/summary";
import type { GuideEntry, PlaybookEntry } from "@/lib/content/loaders";

type FeaturedCardData = {
  href: string;
  title: string;
  summary: string;
  tags: string[];
};

function FeaturedCard(props: FeaturedCardData) {
  return (
    <Link
      href={props.href}
      className="block rounded-2xl border border-border/40 bg-card p-5 shadow-sm transition-colors hover:bg-accent"
    >
      <div className="text-base font-semibold text-foreground">{props.title}</div>
      <div className="mt-1 text-sm text-muted-foreground">{props.summary}</div>
      <div className="mt-3 flex flex-wrap gap-2">
        {props.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}

export default async function Home() {
  const [firms, companies, guides, playbooks, events] = await Promise.all([
    getAllFirms(),
    getAllCompanies(),
    getAllGuides({ includeDrafts: false }),
    getAllPlaybooks({ includeDrafts: false }),
    getAllEvents(),
  ]);

  const featuredFirm = firms.find((f) => f.frontmatter.featured) ?? firms[0];
  const featuredCompany =
    companies.find((c) => c.frontmatter.featured) ?? companies[0];
  const featuredGuide = guides.find((g) => g.frontmatter.featured) ?? guides[0];
  const featuredPlaybook =
    playbooks.find((p) => p.frontmatter.featured) ?? playbooks[0];
  const featuredEvent =
    events.find((e) => e.frontmatter.featured) ??
    events.find((e) => e.frontmatter.status === "upcoming") ??
    events[0];
  const featuredGroupHref = "/community/groups";

  const featured: FeaturedCardData[] = [
    featuredFirm
      ? {
          href: `/agencies/${featuredFirm.slug}`,
          title: featuredFirm.frontmatter.name,
          summary: extractSummaryFromMdxBody(featuredFirm.body),
          tags: featuredFirm.frontmatter.services ?? [],
        }
      : null,
    featuredCompany
      ? {
          href: `/teams/${featuredCompany.slug}`,
          title: featuredCompany.frontmatter.name,
          summary: extractSummaryFromMdxBody(featuredCompany.body),
          tags: featuredCompany.frontmatter.teamFocus ?? [],
        }
      : null,
    featuredGuide
      ? {
          href: `/learn/guides/${featuredGuide.slug}`,
          title: featuredGuide.frontmatter.title,
          summary: featuredGuide.frontmatter.description,
          tags: featuredGuide.frontmatter.tags ?? [],
        }
      : null,
    featuredPlaybook
      ? {
          href: `/learn/playbooks/${featuredPlaybook.slug}`,
          title: featuredPlaybook.frontmatter.title,
          summary: featuredPlaybook.frontmatter.description,
          tags: featuredPlaybook.frontmatter.tags ?? [],
        }
      : null,
    featuredEvent
      ? {
          href: `/community/events/${featuredEvent.slug}`,
          title: featuredEvent.frontmatter.title,
          summary: featuredEvent.frontmatter.description,
          tags: featuredEvent.frontmatter.tags ?? [],
        }
      : null,
    {
      href: featuredGroupHref,
      title: "Groups & meetups",
      summary:
        "Find ongoing communities for critique, research practice, accessibility, and design leadership.",
      tags: ["community", "meetups"],
    },
  ].filter((x): x is FeaturedCardData => Boolean(x));

  const latest = ([
    ...guides,
    ...playbooks,
  ] as Array<GuideEntry | PlaybookEntry>)
    .map((item) => {
      const sortDate =
        "updatedAt" in item.frontmatter && item.frontmatter.updatedAt
          ? item.frontmatter.updatedAt
          : item.frontmatter.publishedAt;
      return { item, sortDate };
    })
    .sort((a, b) => Date.parse(b.sortDate) - Date.parse(a.sortDate))
    .slice(0, 6)
    .map(({ item }) => {
      const href =
        item.kind === "guides"
          ? `/learn/guides/${item.slug}`
          : `/learn/playbooks/${item.slug}`;
      return {
        href,
        title: item.frontmatter.title,
        summary: item.frontmatter.description,
        tags: item.frontmatter.tags ?? [],
      };
    });

  const tagCounts = new Map<string, number>();
  for (const g of guides) for (const t of g.frontmatter.tags ?? []) tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1);
  for (const p of playbooks) for (const t of p.frontmatter.tags ?? []) tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1);
  const popularTags = Array.from(tagCounts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 8)
    .map(([tag]) => tag);

  return (
    <main className="mx-auto max-w-5xl space-y-12 px-6 py-12">
      <section className="rounded-3xl border border-border/40 bg-card p-8 shadow-sm sm:p-10">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Seattle’s hub for UX community, teams, and best practices
          </h1>
          <p className="text-pretty text-lg leading-8 text-muted-foreground">
            Discover Seattle UX firms and company teams, learn practical UX methods,
            and connect through local events and groups.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/agencies"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
            >
              Browse agencies
            </Link>
            <Link
              href="/teams"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-border/40 bg-secondary px-5 text-sm font-medium text-secondary-foreground hover:bg-secondary/80"
            >
              Explore teams
            </Link>
            <Link
              href="/search"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-border/40 bg-background px-5 text-sm font-medium text-foreground hover:bg-accent"
            >
              Search everything
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Featured
          </h2>
          <div className="text-sm text-muted-foreground">
            Curated from recent content
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((item) => (
            <FeaturedCard key={item.href} {...item} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Recently updated
          </h2>
          <Link href="/learn/guides" className="text-sm text-muted-foreground hover:text-foreground">
            Browse learning →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((item) => (
            <FeaturedCard key={item.href} {...item} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Popular tags
          </h2>
          <Link href="/tags" className="text-sm text-muted-foreground hover:text-foreground">
            All tags →
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="rounded-full border border-border/40 bg-card px-3 py-1.5 text-sm text-muted-foreground shadow-sm hover:bg-accent hover:text-foreground"
            >
              {tag}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
