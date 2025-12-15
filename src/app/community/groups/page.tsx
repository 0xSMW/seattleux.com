import Link from "next/link";
import { getAllGroups } from "@/lib/content/loaders";

export const dynamic = "force-static";

export default async function GroupsIndexPage() {
  const groups = await getAllGroups();

  return (
    <main className="mx-auto max-w-4xl space-y-8 px-6 py-16">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Groups
        </h1>
        <p className="text-muted-foreground">
          Ongoing Seattle UX communities and meetups.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        {groups.map((group) => (
          <Link
            key={group.slug}
            href={`/community/groups/${group.slug}`}
            className="rounded-xl border border-border bg-card p-5 hover:bg-accent"
          >
            <div className="text-base font-semibold text-foreground">
              {group.frontmatter.name}
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              {group.frontmatter.location ?? "Seattle area"}
              {group.frontmatter.meetingCadence
                ? ` · ${group.frontmatter.meetingCadence}`
                : ""}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {(group.frontmatter.tags ?? []).slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
        {groups.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-8 text-sm text-muted-foreground sm:col-span-2">
            No groups yet.
          </div>
        ) : null}
      </section>
    </main>
  );
}

