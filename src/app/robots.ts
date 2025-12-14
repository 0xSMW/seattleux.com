import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  const disallow =
    process.env.NEXT_PUBLIC_ROBOTS_DISALLOW === "1" ||
    process.env.VERCEL_ENV === "preview";

  return {
    rules: disallow
      ? [{ userAgent: "*", disallow: "/" }]
      : [{ userAgent: "*", allow: "/" }],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
