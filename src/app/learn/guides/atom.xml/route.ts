import { getAllGuides } from "@/lib/content/loaders";
import { getSiteUrl } from "@/lib/seo/site";

export const dynamic = "force-static";

const siteUrl = getSiteUrl();

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const guides = await getAllGuides({ includeDrafts: false });

  const updated = guides[0]
    ? new Date(guides[0].frontmatter.updatedAt ?? guides[0].frontmatter.publishedAt).toISOString()
    : new Date().toISOString();

  const entries = guides
    .map((guide) => {
      const url = `${siteUrl}/learn/guides/${guide.slug}`;
      const title = escapeXml(guide.frontmatter.title);
      const summary = escapeXml(guide.frontmatter.description);
      const published = new Date(guide.frontmatter.publishedAt).toISOString();
      const modified = new Date(
        guide.frontmatter.updatedAt ?? guide.frontmatter.publishedAt,
      ).toISOString();

      return [
        "<entry>",
        `<id>${url}</id>`,
        `<title>${title}</title>`,
        `<link href="${url}"/>`,
        `<updated>${modified}</updated>`,
        `<published>${published}</published>`,
        `<summary>${summary}</summary>`,
        "</entry>",
      ].join("");
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Seattle UX Guides</title>
  <id>${siteUrl}/learn/guides</id>
  <link href="${siteUrl}/learn/guides/atom.xml" rel="self"/>
  <link href="${siteUrl}/learn/guides"/>
  <updated>${updated}</updated>
  ${entries}
</feed>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

