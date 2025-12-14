import { notFound } from "next/navigation";
import { Mdx } from "@/components/mdx/Mdx";
import { getAllGuides, getGuideBySlug } from "@/lib/content/loaders";
import type { Metadata } from "next";
import { jsonLdScriptTag } from "@/lib/seo/jsonLd";
import { getEditUrlForContentPath, getNewIssueUrl } from "@/lib/links/repo";
import { getSiteUrl } from "@/lib/seo/site";
import { Breadcrumbs } from "@/components/nav/Breadcrumbs";
import { relatedByTags } from "@/lib/content/related";
import { extractTocFromMdx } from "@/lib/content/toc";
import { BackToTop } from "@/components/nav/BackToTop";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const guides = await getAllGuides({ includeDrafts: true });
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  try {
    const guide = await getGuideBySlug(slug);
    const siteUrl = getSiteUrl();
    const canonical = `${siteUrl}/learn/guides/${guide.slug}`;
    return {
      title: guide.frontmatter.title,
      description: guide.frontmatter.description,
      alternates: { canonical },
      openGraph: {
        title: guide.frontmatter.title,
        description: guide.frontmatter.description,
        url: canonical,
        type: "article",
      },
    };
  } catch {
    return {};
  }
}

export default async function GuideDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  let guide;
  try {
    guide = await getGuideBySlug(slug);
  } catch {
    notFound();
  }

  if (guide.frontmatter.draft) notFound();

  const allGuides = await getAllGuides({ includeDrafts: false });
  const related = relatedByTags(
    allGuides,
    guide.slug,
    guide.frontmatter.tags ?? [],
    3,
  );
  const toc = extractTocFromMdx(guide.body);

  const siteUrl = getSiteUrl();
  const canonicalUrl = `${siteUrl}/learn/guides/${guide.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.frontmatter.title,
    description: guide.frontmatter.description,
    datePublished: guide.frontmatter.publishedAt,
    dateModified: guide.frontmatter.updatedAt ?? guide.frontmatter.publishedAt,
    mainEntityOfPage: canonicalUrl,
    author: {
      "@type": "Organization",
      name: "Seattle UX",
      url: siteUrl,
    },
  };

  const editUrl = getEditUrlForContentPath(`content/guides/${guide.slug}.mdx`);
  const issueUrl =
    getNewIssueUrl({
      title: `Guide correction: ${guide.frontmatter.title}`,
      body: `Link: ${canonicalUrl}\n\nWhat should change?\n- \n`,
    }) ?? "/contribute";

  return (
    <main className="mx-auto max-w-3xl space-y-8 px-6 py-16">
      {jsonLdScriptTag({ data: jsonLd })}
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/learn/guides", label: "Guides" },
          { href: `/learn/guides/${guide.slug}`, label: guide.frontmatter.title },
        ]}
      />
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          {guide.frontmatter.title}
        </h1>
        <p className="text-muted-foreground">{guide.frontmatter.description}</p>
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span>{guide.frontmatter.publishedAt}</span>
          <span>•</span>
          <span>{guide.frontmatter.readingTimeMinutes} min read</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {(guide.frontmatter.tags ?? []).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      {toc.length > 0 ? (
        <aside className="rounded-2xl border border-border/40 bg-card p-5 shadow-sm">
          <div className="text-sm font-semibold text-foreground">On this page</div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {toc.map((item) => (
              <li key={item.id} className={item.depth === 3 ? "pl-4" : ""}>
                <a
                  href={`#${item.id}`}
                  className="underline underline-offset-4 hover:text-foreground"
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      ) : null}

      <article className="mdx">
        <Mdx source={guide.body} />
      </article>

      {related.length > 0 ? (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">Related guides</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {related.map((g) => (
              <a
                key={g.slug}
                href={`/learn/guides/${g.slug}`}
                className="block rounded-2xl border border-border/40 bg-card p-5 shadow-sm hover:bg-accent"
              >
                <div className="text-sm font-semibold text-foreground">
                  {g.frontmatter.title}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {g.frontmatter.description}
                </div>
              </a>
            ))}
          </div>
        </section>
      ) : null}

      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
        {editUrl ? (
          <a
            href={editUrl}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 hover:text-foreground"
          >
            Edit this guide
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
      <BackToTop />
    </main>
  );
}
