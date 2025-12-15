import { getAllEvents } from "@/lib/content/loaders";

export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function formatIcsDate(date: Date) {
  return (
    date.getUTCFullYear() +
    pad2(date.getUTCMonth() + 1) +
    pad2(date.getUTCDate()) +
    "T" +
    pad2(date.getUTCHours()) +
    pad2(date.getUTCMinutes()) +
    pad2(date.getUTCSeconds()) +
    "Z"
  );
}

function escapeIcs(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

export async function GET() {
  const events = await getAllEvents();
  const upcoming = events.filter((e) => e.frontmatter.status === "upcoming");

  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Seattle UX//Community Events//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
  ];

  for (const event of upcoming) {
    const start = new Date(event.frontmatter.startAt);
    const end = event.frontmatter.endAt ? new Date(event.frontmatter.endAt) : undefined;
    const uid = `${event.slug}@seattleux.com`;
    const url = `${siteUrl}/community/events/${event.slug}`;

    lines.push("BEGIN:VEVENT");
    lines.push(`UID:${escapeIcs(uid)}`);
    lines.push(`DTSTAMP:${formatIcsDate(new Date())}`);
    lines.push(`DTSTART:${formatIcsDate(start)}`);
    if (end) lines.push(`DTEND:${formatIcsDate(end)}`);
    lines.push(`SUMMARY:${escapeIcs(event.frontmatter.title)}`);
    lines.push(`DESCRIPTION:${escapeIcs(event.frontmatter.description + "\\n" + url)}`);
    if (event.frontmatter.venue) lines.push(`LOCATION:${escapeIcs(event.frontmatter.venue)}`);
    lines.push(`URL:${escapeIcs(event.frontmatter.ticketUrl ?? url)}`);
    lines.push("END:VEVENT");
  }

  lines.push("END:VCALENDAR");

  return new Response(lines.join("\r\n"), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": "inline; filename=\"seattleux-events.ics\"",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

