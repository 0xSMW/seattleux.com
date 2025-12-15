import Link from "next/link";

export const dynamic = "force-static";

export default function ListingsPolicyPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-8 px-6 py-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Listings policy
        </h1>
        <p className="text-muted-foreground">
          How agencies, teams, events, and groups are represented on Seattle UX.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">No rankings</h2>
        <p className="text-sm text-muted-foreground">
          Seattle UX is not a “best of” list. We aim for broad coverage and
          clear, comparable information rather than subjective scoring.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">
          What makes a good listing
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li>Accurate name and website</li>
          <li>Relevant tags (services, team focus, industries)</li>
          <li>Clear Seattle presence</li>
          <li>`lastVerified` date that reflects actual verification</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Corrections</h2>
        <p className="text-sm text-muted-foreground">
          If something is incorrect, please open a PR or file an issue. See{" "}
          <Link
            href="/contribute"
            className="underline underline-offset-4 hover:text-foreground"
          >
            Contribute
          </Link>
          .
        </p>
      </section>
    </main>
  );
}

