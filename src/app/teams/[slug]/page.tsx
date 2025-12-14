import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/mdx/Mdx";
import { getAllCompanies, getCompanyBySlug } from "@/lib/content/loaders";
import { jsonLdScriptTag } from "@/lib/seo/jsonLd";
import { getEditUrlForContentPath, getNewIssueUrl } from "@/lib/links/repo";
import { getSiteUrl } from "@/lib/seo/site";
import { Breadcrumbs } from "@/components/nav/Breadcrumbs";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const companies = await getAllCompanies();
  return companies.map((company) => ({ slug: company.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  try {
    const company = await getCompanyBySlug(slug);
    const siteUrl = getSiteUrl();
    const canonical = `${siteUrl}/teams/${company.slug}`;
    return {
      title: company.frontmatter.name,
      description: `Seattle UX team: ${company.frontmatter.name}`,
      alternates: { canonical },
      openGraph: {
        title: company.frontmatter.name,
        description: `Seattle UX team: ${company.frontmatter.name}`,
        url: canonical,
      },
    };
  } catch {
    return {};
  }
}

export default async function TeamDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  let company;
  try {
    company = await getCompanyBySlug(slug);
  } catch {
    notFound();
  }

  const siteUrl = getSiteUrl();
  const canonicalUrl = `${siteUrl}/teams/${company.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.frontmatter.name,
    url: company.frontmatter.website,
    mainEntityOfPage: canonicalUrl,
  };

  const editUrl = getEditUrlForContentPath(
    `content/companies/${company.slug}.mdx`,
  );
  const issueUrl =
    getNewIssueUrl({
      title: `Update team listing: ${company.frontmatter.name}`,
      body: `Link: ${canonicalUrl}\n\nWhat needs updating?\n- \n`,
    }) ?? "/contribute";

  return (
    <main className="mx-auto max-w-3xl space-y-8 px-6 py-16">
      {jsonLdScriptTag({ data: jsonLd })}
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/teams", label: "Teams" },
          { href: `/teams/${company.slug}`, label: company.frontmatter.name },
        ]}
      />
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          {company.frontmatter.name}
        </h1>
        <div className="text-sm text-muted-foreground">
          {company.frontmatter.seattlePresence}
          {company.frontmatter.hq ? ` · ${company.frontmatter.hq}` : ""}
        </div>
        <div className="flex flex-wrap gap-2">
          {(company.frontmatter.teamFocus ?? []).map((focus) => (
            <span
              key={focus}
              className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground"
            >
              {focus}
            </span>
          ))}
        </div>
        {(company.frontmatter.industries?.length ?? 0) > 0 ? (
          <div className="flex flex-wrap gap-2">
            {company.frontmatter.industries.map((industry) => (
              <span
                key={industry}
                className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground"
              >
                {industry}
              </span>
            ))}
          </div>
        ) : null}
        <div className="flex flex-wrap gap-3">
          <a
            className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            href={company.frontmatter.website}
            target="_blank"
            rel="noreferrer"
          >
            Website
          </a>
          {company.frontmatter.hiringPage ? (
            <a
              className="inline-flex items-center justify-center rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/80"
              href={company.frontmatter.hiringPage}
              target="_blank"
              rel="noreferrer"
            >
              Careers
            </a>
          ) : null}
        </div>
        <div className="text-xs text-muted-foreground">
          Last verified: {company.frontmatter.lastVerified}
        </div>
      </header>

      <article className="mdx">
        <Mdx source={company.body} />
      </article>

      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
        {editUrl ? (
          <a
            href={editUrl}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 hover:text-foreground"
          >
            Edit this listing
          </a>
        ) : null}
        <a
          href={issueUrl}
          target={issueUrl.startsWith("http") ? "_blank" : undefined}
          rel={issueUrl.startsWith("http") ? "noreferrer" : undefined}
          className="underline underline-offset-4 hover:text-foreground"
        >
          Report an issue
        </a>
      </div>
    </main>
  );
}
