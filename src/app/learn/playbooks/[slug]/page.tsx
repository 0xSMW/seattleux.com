import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/mdx/Mdx";
import { jsonLdScriptTag } from "@/lib/seo/jsonLd";
import { getAllPlaybooks, getPlaybookBySlug } from "@/lib/content/loaders";

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
    return {
      title: playbook.frontmatter.title,
      description: playbook.frontmatter.description,
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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
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

  return (
    <main className="mx-auto max-w-3xl space-y-8 px-6 py-16">
      {jsonLdScriptTag({ data: jsonLd })}
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

      <article className="mdx">
        <Mdx source={playbook.body} />
      </article>
    </main>
  );
}

