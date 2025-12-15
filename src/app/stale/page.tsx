import Link from "next/link";
import { getAllCompanies, getAllFirms, getAllGroups } from "@/lib/content/loaders";
import { isStale } from "@/lib/content/stale";

export const dynamic = "force-static";

export default async function StalePage() {
  const [firms, companies, groups] = await Promise.all([
    getAllFirms(),
    getAllCompanies(),
    getAllGroups(),
  ]);

  const staleAgencies = firms.filter((f) => isStale(f.frontmatter.lastVerified));
  const staleTeams = companies.filter((c) => isStale(c.frontmatter.lastVerified));
  const staleGroups = groups.filter((g) => isStale(g.frontmatter.lastVerified));

  return (
    <main className="mx-auto max-w-4xl space-y-10 px-6 py-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Stale listings
        </h1>
        <p className="text-muted-foreground">
          Entries with a <code className="rounded bg-muted px-1.5 py-0.5">lastVerified</code>{" "}
          older than ~180 days. Help by updating the MDX and bumping the date.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Agencies</h2>
        {staleAgencies.length === 0 ? (
          <div className="text-sm text-muted-foreground">No stale agencies.</div>
        ) : (
          <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            {staleAgencies.map((f) => (
              <li key={f.slug}>
                <Link href={`/agencies/${f.slug}`} className="hover:text-foreground">
                  {f.frontmatter.name}
                </Link>{" "}
                <span className="text-muted-foreground/70">
                  (last verified {f.frontmatter.lastVerified})
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Teams</h2>
        {staleTeams.length === 0 ? (
          <div className="text-sm text-muted-foreground">No stale teams.</div>
        ) : (
          <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            {staleTeams.map((c) => (
              <li key={c.slug}>
                <Link href={`/teams/${c.slug}`} className="hover:text-foreground">
                  {c.frontmatter.name}
                </Link>{" "}
                <span className="text-muted-foreground/70">
                  (last verified {c.frontmatter.lastVerified})
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Groups</h2>
        {staleGroups.length === 0 ? (
          <div className="text-sm text-muted-foreground">No stale groups.</div>
        ) : (
          <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            {staleGroups.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/community/groups/${g.slug}`}
                  className="hover:text-foreground"
                >
                  {g.frontmatter.name}
                </Link>{" "}
                <span className="text-muted-foreground/70">
                  (last verified {g.frontmatter.lastVerified})
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <p className="text-sm text-muted-foreground">
        See <Link href="/contribute" className="underline underline-offset-4 hover:text-foreground">Contribute</Link>{" "}
        for templates and guidelines.
      </p>
    </main>
  );
}

