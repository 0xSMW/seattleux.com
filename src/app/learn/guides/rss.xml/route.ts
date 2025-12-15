import { getAllGuides } from "@/lib/content/loaders";

export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

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

  const items = guides
    .map((guide) => {
      const url = `${siteUrl}/learn/guides/${guide.slug}`;
      const title = escapeXml(guide.frontmatter.title);
      const description = escapeXml(guide.frontmatter.description);
      const pubDate = new Date(guide.frontmatter.publishedAt).toUTCString();
      return [
        "<item>",
        `<title>${title}</title>`,
        `<link>${url}</link>`,
        `<guid>${url}</guid>`,
        `<description>${description}</description>`,
        `<pubDate>${pubDate}</pubDate>`,
        "</item>",
      ].join("");
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Seattle UX Guides</title>
    <link>${siteUrl}/learn/guides</link>
    <description>UX best practices and guides for the Seattle UX community.</description>
    <language>en</language>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

