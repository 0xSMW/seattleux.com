import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/mdx/Mdx";
import { jsonLdScriptTag } from "@/lib/seo/jsonLd";
import { getAllEvents, getEventBySlug } from "@/lib/content/loaders";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const events = await getAllEvents();
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  try {
    const event = await getEventBySlug(slug);
    return { title: event.frontmatter.title, description: event.frontmatter.description };
  } catch {
    return {};
  }
}

export default async function EventDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  let event;
  try {
    event = await getEventBySlug(slug);
  } catch {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const canonicalUrl = `${siteUrl}/community/events/${event.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.frontmatter.title,
    description: event.frontmatter.description,
    startDate: event.frontmatter.startAt,
    endDate: event.frontmatter.endAt,
    eventStatus:
      event.frontmatter.status === "cancelled"
        ? "https://schema.org/EventCancelled"
        : "https://schema.org/EventScheduled",
    location: event.frontmatter.venue
      ? {
          "@type": "Place",
          name: event.frontmatter.venue,
          address: event.frontmatter.address,
        }
      : undefined,
    url: event.frontmatter.ticketUrl ?? canonicalUrl,
    mainEntityOfPage: canonicalUrl,
  };

  return (
    <main className="mx-auto max-w-3xl space-y-8 px-6 py-16">
      {jsonLdScriptTag({ data: jsonLd })}
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          {event.frontmatter.title}
        </h1>
        <p className="text-muted-foreground">{event.frontmatter.description}</p>
        <div className="text-sm text-muted-foreground">
          {event.frontmatter.startAt}
          {event.frontmatter.venue ? ` · ${event.frontmatter.venue}` : ""}
        </div>
        {event.frontmatter.ticketUrl ? (
          <a
            className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            href={event.frontmatter.ticketUrl}
            target="_blank"
            rel="noreferrer"
          >
            Tickets / RSVP
          </a>
        ) : null}
      </header>

      <article className="mdx">
        <Mdx source={event.body} />
      </article>
    </main>
  );
}

