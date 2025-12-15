import Link from "next/link";
import { getAllEvents } from "@/lib/content/loaders";

export const dynamic = "force-static";

export default async function EventsIndexPage() {
  const events = await getAllEvents();

  const upcoming = events.filter((e) => e.frontmatter.status === "upcoming");
  const past = events.filter((e) => e.frontmatter.status === "past");

  return (
    <main className="mx-auto max-w-4xl space-y-10 px-6 py-16">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Events
        </h1>
        <p className="text-muted-foreground">Upcoming and past Seattle UX events.</p>
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Upcoming</h2>
        {upcoming.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-8 text-sm text-muted-foreground">
            No upcoming events yet.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {upcoming.map((event) => (
              <Link
                key={event.slug}
                href={`/community/events/${event.slug}`}
                className="rounded-xl border border-border bg-card p-5 hover:bg-accent"
              >
                <div className="text-base font-semibold text-foreground">
                  {event.frontmatter.title}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {event.frontmatter.startAt}
                  {event.frontmatter.venue ? ` · ${event.frontmatter.venue}` : ""}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Past</h2>
        {past.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-8 text-sm text-muted-foreground">
            No past events yet.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {past.map((event) => (
              <Link
                key={event.slug}
                href={`/community/events/${event.slug}`}
                className="rounded-xl border border-border bg-card p-5 hover:bg-accent"
              >
                <div className="text-base font-semibold text-foreground">
                  {event.frontmatter.title}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {event.frontmatter.startAt}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

