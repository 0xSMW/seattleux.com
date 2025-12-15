import Link from "next/link";

export default function ContributePage() {
  return (
    <main className="mx-auto max-w-4xl space-y-8 px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        Contribute
      </h1>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">
          Add or update a listing
        </h2>
        <p className="text-sm text-muted-foreground">
          Listings and guides are stored as MDX files in the repo. The simplest
          workflow is: create/edit an MDX file → open a PR.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li>
            Firms: <code className="rounded bg-muted px-1.5 py-0.5">content/firms</code>
          </li>
          <li>
            Companies:{" "}
            <code className="rounded bg-muted px-1.5 py-0.5">content/companies</code>
          </li>
          <li>
            Guides: <code className="rounded bg-muted px-1.5 py-0.5">content/guides</code>
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Templates</h2>
        <p className="text-sm text-muted-foreground">
          Start from a template and fill in frontmatter + sections.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li>
            <code className="rounded bg-muted px-1.5 py-0.5">
              content/_templates/firm.mdx
            </code>
          </li>
          <li>
            <code className="rounded bg-muted px-1.5 py-0.5">
              content/_templates/company.mdx
            </code>
          </li>
          <li>
            <code className="rounded bg-muted px-1.5 py-0.5">
              content/_templates/guide.mdx
            </code>
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Quality bar</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li>Keep descriptions neutral and factual (avoid superlatives).</li>
          <li>Ensure links work and set a realistic `lastVerified` date.</li>
          <li>
            If you’re unsure about naming or categorization, open a draft PR and
            we’ll iterate.
          </li>
        </ul>
        <p className="text-sm text-muted-foreground">
          Browse the directories:{" "}
          <Link href="/agencies" className="underline underline-offset-4">
            /agencies
          </Link>
          {" · "}
          <Link href="/teams" className="underline underline-offset-4">
            /teams
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
