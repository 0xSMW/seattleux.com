import Link from "next/link";

export default function CommunityPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-8 px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        Community
      </h1>
      <p className="text-muted-foreground">
        Events, groups, and ways to connect across the Seattle UX community.
      </p>

      <section className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/community/events"
          className="rounded-xl border border-border bg-card p-5 hover:bg-accent"
        >
          <div className="text-base font-semibold text-foreground">Events</div>
          <div className="mt-1 text-sm text-muted-foreground">
            Upcoming and past community events.
          </div>
        </Link>
        <Link
          href="/community/groups"
          className="rounded-xl border border-border bg-card p-5 hover:bg-accent"
        >
          <div className="text-base font-semibold text-foreground">Groups</div>
          <div className="mt-1 text-sm text-muted-foreground">
            Ongoing meetups and communities.
          </div>
        </Link>
      </section>
    </main>
  );
}
