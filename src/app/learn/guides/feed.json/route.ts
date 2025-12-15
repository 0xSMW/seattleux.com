import { getAllGuides } from "@/lib/content/loaders";
import { getSiteUrl } from "@/lib/seo/site";

export const dynamic = "force-static";

export async function GET() {
  const siteUrl = getSiteUrl();
  const guides = await getAllGuides({ includeDrafts: false });

  const feed = {
    version: "https://jsonfeed.org/version/1.1",
    title: "Seattle UX Guides",
    home_page_url: `${siteUrl}/learn/guides`,
    feed_url: `${siteUrl}/learn/guides/feed.json`,
    items: guides.map((guide) => ({
      id: `${siteUrl}/learn/guides/${guide.slug}`,
      url: `${siteUrl}/learn/guides/${guide.slug}`,
      title: guide.frontmatter.title,
      summary: guide.frontmatter.description,
      date_published: guide.frontmatter.publishedAt,
      date_modified: guide.frontmatter.updatedAt ?? guide.frontmatter.publishedAt,
      tags: guide.frontmatter.tags ?? [],
    })),
  };

  return new Response(JSON.stringify(feed, null, 2), {
    headers: {
      "Content-Type": "application/feed+json; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

