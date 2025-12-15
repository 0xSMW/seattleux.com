import { notFound } from "next/navigation";
import { Mdx } from "@/components/mdx/Mdx";
import { getAllGuides, getGuideBySlug } from "@/lib/content/loaders";
import type { Metadata } from "next";
import { jsonLdScriptTag } from "@/lib/seo/jsonLd";

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
    return {
      title: guide.frontmatter.title,
      description: guide.frontmatter.description,
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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
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

  return (
    <main className="mx-auto max-w-3xl space-y-8 px-6 py-16">
      {jsonLdScriptTag({ data: jsonLd })}
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

      <article className="mdx">
        <Mdx source={guide.body} />
      </article>
    </main>
  );
}
