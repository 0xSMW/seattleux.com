import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/mdx/Mdx";
import { jsonLdScriptTag } from "@/lib/seo/jsonLd";
import { getAllPlaybooks, getPlaybookBySlug } from "@/lib/content/loaders";
import { getEditUrlForContentPath, getNewIssueUrl } from "@/lib/links/repo";
import { getSiteUrl } from "@/lib/seo/site";
import { Breadcrumbs } from "@/components/nav/Breadcrumbs";
import { relatedByTags } from "@/lib/content/related";
import { extractTocFromMdx } from "@/lib/content/toc";
import { BackToTop } from "@/components/nav/BackToTop";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const playbooks = await getAllPlaybooks({ includeDrafts: true });
  return playbooks.map((playbook) => ({ slug: playbook.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  try {
    const playbook = await getPlaybookBySlug(slug);
    const siteUrl = getSiteUrl();
    const canonical = `${siteUrl}/learn/playbooks/${playbook.slug}`;
    return {
      title: playbook.frontmatter.title,
      description: playbook.frontmatter.description,
      alternates: { canonical },
      openGraph: {
        title: playbook.frontmatter.title,
        description: playbook.frontmatter.description,
        url: canonical,
        type: "article",
      },
    };
  } catch {
    return {};
  }
}

export default async function PlaybookDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  let playbook;
  try {
    playbook = await getPlaybookBySlug(slug);
  } catch {
    notFound();
  }

  if (playbook.frontmatter.draft) notFound();

  const allPlaybooks = await getAllPlaybooks({ includeDrafts: false });
  const related = relatedByTags(
    allPlaybooks,
    playbook.slug,
    playbook.frontmatter.tags ?? [],
    3,
  );
  const toc = extractTocFromMdx(playbook.body);

  const siteUrl = getSiteUrl();
  const canonicalUrl = `${siteUrl}/learn/playbooks/${playbook.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: playbook.frontmatter.title,
    description: playbook.frontmatter.description,
    datePublished: playbook.frontmatter.publishedAt,
    dateModified: playbook.frontmatter.publishedAt,
    mainEntityOfPage: canonicalUrl,
    author: {
      "@type": "Organization",
      name: "Seattle UX",
      url: siteUrl,
    },
  };

  const editUrl = getEditUrlForContentPath(
    `content/playbooks/${playbook.slug}.mdx`,
  );
  const issueUrl =
    getNewIssueUrl({
      title: `Playbook correction: ${playbook.frontmatter.title}`,
      body: `Link: ${canonicalUrl}\n\nWhat should change?\n- \n`,
    }) ?? "/contribute";

  return (
    <main className="mx-auto max-w-3xl space-y-8 px-6 py-16">
      {jsonLdScriptTag({ data: jsonLd })}
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/learn/playbooks", label: "Playbooks" },
          {
            href: `/learn/playbooks/${playbook.slug}`,
            label: playbook.frontmatter.title,
          },
        ]}
      />
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          {playbook.frontmatter.title}
        </h1>
        <p className="text-muted-foreground">{playbook.frontmatter.description}</p>
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span>{playbook.frontmatter.publishedAt}</span>
          <span>•</span>
          <span>{playbook.frontmatter.readingTimeMinutes} min</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {(playbook.frontmatter.tags ?? []).map((tag) => (
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
        <Mdx source={playbook.body} />
      </article>

      {related.length > 0 ? (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            Related playbooks
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {related.map((p) => (
              <a
                key={p.slug}
                href={`/learn/playbooks/${p.slug}`}
                className="block rounded-2xl border border-border/40 bg-card p-5 shadow-sm hover:bg-accent"
              >
                <div className="text-sm font-semibold text-foreground">
                  {p.frontmatter.title}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {p.frontmatter.description}
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
            Edit this playbook
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
