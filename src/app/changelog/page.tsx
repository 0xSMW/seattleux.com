export const dynamic = "force-static";

export default function ChangelogPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-8 px-6 py-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Changelog
        </h1>
        <p className="text-muted-foreground">
          Major site and content updates. (This starts simple—add entries as changes
          happen.)
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">2025-12-15</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li>Initial site scaffold with MDX-backed content</li>
          <li>Agencies, Teams, Guides, Playbooks, Events, Groups</li>
          <li>Search, tags, and feeds (RSS/Atom/JSON + iCal)</li>
        </ul>
      </section>
    </main>
  );
}

