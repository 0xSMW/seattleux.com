import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/mdx/Mdx";
import { getAllFirms, getFirmBySlug } from "@/lib/content/loaders";
import { jsonLdScriptTag } from "@/lib/seo/jsonLd";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const firms = await getAllFirms();
  return firms.map((firm) => ({ slug: firm.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  try {
    const firm = await getFirmBySlug(slug);
    return {
      title: firm.frontmatter.name,
      description: `Seattle UX agency: ${firm.frontmatter.name}`,
    };
  } catch {
    return {};
  }
}

export default async function AgencyDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  let firm;
  try {
    firm = await getFirmBySlug(slug);
  } catch {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const canonicalUrl = `${siteUrl}/agencies/${firm.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: firm.frontmatter.name,
    url: firm.frontmatter.website,
    mainEntityOfPage: canonicalUrl,
  };

  return (
    <main className="mx-auto max-w-3xl space-y-8 px-6 py-16">
      {jsonLdScriptTag({ data: jsonLd })}
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          {firm.frontmatter.name}
        </h1>
        <div className="text-sm text-muted-foreground">
          {(firm.frontmatter.locations ?? []).join(" · ")}
        </div>
        <div className="flex flex-wrap gap-2">
          {(firm.frontmatter.services ?? []).map((service) => (
            <span
              key={service}
              className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground"
            >
              {service}
            </span>
          ))}
        </div>
        <a
          className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          href={firm.frontmatter.website}
          target="_blank"
          rel="noreferrer"
        >
          Visit website
        </a>
        <div className="text-xs text-muted-foreground">
          Last verified: {firm.frontmatter.lastVerified}
        </div>
      </header>

      <article className="mdx">
        <Mdx source={firm.body} />
      </article>
    </main>
  );
}

