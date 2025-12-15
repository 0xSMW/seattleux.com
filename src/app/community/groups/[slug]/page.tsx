import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/mdx/Mdx";
import { jsonLdScriptTag } from "@/lib/seo/jsonLd";
import { getAllGroups, getGroupBySlug } from "@/lib/content/loaders";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const groups = await getAllGroups();
  return groups.map((group) => ({ slug: group.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  try {
    const group = await getGroupBySlug(slug);
    return { title: group.frontmatter.name, description: group.frontmatter.description };
  } catch {
    return {};
  }
}

export default async function GroupDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  let group;
  try {
    group = await getGroupBySlug(slug);
  } catch {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const canonicalUrl = `${siteUrl}/community/groups/${group.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: group.frontmatter.name,
    url: group.frontmatter.website ?? canonicalUrl,
    mainEntityOfPage: canonicalUrl,
  };

  return (
    <main className="mx-auto max-w-3xl space-y-8 px-6 py-16">
      {jsonLdScriptTag({ data: jsonLd })}
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          {group.frontmatter.name}
        </h1>
        <p className="text-muted-foreground">{group.frontmatter.description}</p>
        <div className="text-sm text-muted-foreground">
          {group.frontmatter.location ?? "Seattle area"}
          {group.frontmatter.meetingCadence
            ? ` · ${group.frontmatter.meetingCadence}`
            : ""}
        </div>
        {group.frontmatter.website ? (
          <a
            className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            href={group.frontmatter.website}
            target="_blank"
            rel="noreferrer"
          >
            Visit website
          </a>
        ) : null}
        <div className="text-xs text-muted-foreground">
          Last verified: {group.frontmatter.lastVerified}
        </div>
      </header>

      <article className="mdx">
        <Mdx source={group.body} />
      </article>
    </main>
  );
}

