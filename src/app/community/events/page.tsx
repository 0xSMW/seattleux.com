import Link from "next/link";
import { getAllEvents } from "@/lib/content/loaders";
import { FilterPanel } from "@/components/filters/FilterPanel";

export const dynamic = "force-static";

function toURLSearchParams(
  input: Record<string, string | string[] | undefined>,
): URLSearchParams {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(input)) {
    if (typeof value === "undefined") continue;
    if (Array.isArray(value)) value.forEach((v) => params.append(key, v));
    else params.set(key, value);
  }
  return params;
}

function monthKey(dateString: string) {
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return "";
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

export default async function EventsIndexPage(props: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const events = await getAllEvents();

  const rawSearchParams = (await props.searchParams) ?? {};
  const params = toURLSearchParams(rawSearchParams);
  const q = (params.get("q") ?? "").trim().toLowerCase();
  const selectedTags = params.getAll("tag");
  const selectedMonths = params.getAll("month");

  const tags = Array.from(
    new Set(events.flatMap((e) => e.frontmatter.tags ?? [])),
  ).sort((a, b) => a.localeCompare(b));
  const months = Array.from(
    new Set(events.map((e) => monthKey(e.frontmatter.startAt)).filter(Boolean)),
  ).sort((a, b) => b.localeCompare(a));

  const filtered = events.filter((event) => {
    const haystack = [
      event.frontmatter.title,
      event.frontmatter.description,
      event.frontmatter.venue ?? "",
      ...(event.frontmatter.tags ?? []),
    ]
      .join(" ")
      .toLowerCase();

    if (q && !haystack.includes(q)) return false;
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => (event.frontmatter.tags ?? []).includes(tag));
    const m = monthKey(event.frontmatter.startAt);
    const matchesMonth =
      selectedMonths.length === 0 || (m && selectedMonths.includes(m));

    return matchesTags && matchesMonth;
  });

  const upcoming = filtered
    .filter((e) => e.frontmatter.status === "upcoming")
    .sort((a, b) => Date.parse(a.frontmatter.startAt) - Date.parse(b.frontmatter.startAt));
  const past = filtered
    .filter((e) => e.frontmatter.status === "past")
    .sort((a, b) => Date.parse(b.frontmatter.startAt) - Date.parse(a.frontmatter.startAt));

  return (
    <main className="mx-auto max-w-4xl space-y-10 px-6 py-16">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Events
        </h1>
        <p className="text-muted-foreground">
          Upcoming and past Seattle UX events. Subscribe:{" "}
          <a
            href="/community/events.ics"
            className="underline underline-offset-4 hover:text-foreground"
          >
            events.ics
          </a>
          .
        </p>
      </header>

      <FilterPanel
        searchKeyLabel="Search"
        searchPlaceholder="Search events…"
        facetGroups={[
          { key: "tag", label: "Tags", values: tags },
          { key: "month", label: "Month", values: months },
        ]}
      />

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
