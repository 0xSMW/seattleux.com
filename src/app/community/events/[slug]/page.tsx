import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/mdx/Mdx";
import { jsonLdScriptTag } from "@/lib/seo/jsonLd";
import { getAllEvents, getEventBySlug } from "@/lib/content/loaders";
import { getEditUrlForContentPath, getNewIssueUrl } from "@/lib/links/repo";
import { getSiteUrl } from "@/lib/seo/site";
import { Breadcrumbs } from "@/components/nav/Breadcrumbs";

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
    const siteUrl = getSiteUrl();
    const canonical = `${siteUrl}/community/events/${event.slug}`;
    return {
      title: event.frontmatter.title,
      description: event.frontmatter.description,
      alternates: { canonical },
      openGraph: {
        title: event.frontmatter.title,
        description: event.frontmatter.description,
        url: canonical,
      },
    };
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

  const siteUrl = getSiteUrl();
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

  const editUrl = getEditUrlForContentPath(`content/events/${event.slug}.mdx`);
  const issueUrl =
    getNewIssueUrl({
      title: `Event update: ${event.frontmatter.title}`,
      body: `Link: ${canonicalUrl}\n\nWhat needs updating?\n- \n`,
    }) ?? "/contribute";

  const start = new Date(event.frontmatter.startAt);
  const end = event.frontmatter.endAt ? new Date(event.frontmatter.endAt) : undefined;
  const googleCalendarUrl = (() => {
    function format(d: Date) {
      const pad = (n: number) => String(n).padStart(2, "0");
      return (
        d.getUTCFullYear() +
        pad(d.getUTCMonth() + 1) +
        pad(d.getUTCDate()) +
        "T" +
        pad(d.getUTCHours()) +
        pad(d.getUTCMinutes()) +
        pad(d.getUTCSeconds()) +
        "Z"
      );
    }
    const dates = `${format(start)}/${format(end ?? start)}`;
    const params = new URLSearchParams();
    params.set("action", "TEMPLATE");
    params.set("text", event.frontmatter.title);
    params.set("details", `${event.frontmatter.description}\n\n${canonicalUrl}`);
    params.set("dates", dates);
    if (event.frontmatter.venue) params.set("location", event.frontmatter.venue);
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  })();

  return (
    <main className="mx-auto max-w-3xl space-y-8 px-6 py-16">
      {jsonLdScriptTag({ data: jsonLd })}
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/community/events", label: "Events" },
          { href: `/community/events/${event.slug}`, label: event.frontmatter.title },
        ]}
      />
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          {event.frontmatter.title}
        </h1>
        <p className="text-muted-foreground">{event.frontmatter.description}</p>
        <div className="text-sm text-muted-foreground">
          {event.frontmatter.startAt}
          {event.frontmatter.venue ? ` · ${event.frontmatter.venue}` : ""}
        </div>
        {event.frontmatter.status === "cancelled" ? (
          <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-muted-foreground">
            <div className="font-semibold text-foreground">This event is cancelled.</div>
            <div>Please confirm details with the organizer before traveling.</div>
          </div>
        ) : null}
        <div className="flex flex-col gap-3 sm:flex-row">
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
          <a
            className="inline-flex items-center justify-center rounded-lg border border-border/40 bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/80"
            href={googleCalendarUrl}
            target="_blank"
            rel="noreferrer"
          >
            Add to Google Calendar
          </a>
          <a
            className="inline-flex items-center justify-center rounded-lg border border-border/40 bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"
            href="/community/events.ics"
          >
            Subscribe (ICS)
          </a>
        </div>
      </header>

      <article className="mdx">
        <Mdx source={event.body} />
      </article>

      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
        {editUrl ? (
          <a
            href={editUrl}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 hover:text-foreground"
          >
            Edit this event
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
    </main>
  );
}
