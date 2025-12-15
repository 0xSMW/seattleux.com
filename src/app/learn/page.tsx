import Link from "next/link";

export default function LearnPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-8 px-6 py-16">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Learn
        </h1>
        <p className="text-muted-foreground">
          UX best practices, playbooks, and Seattle-focused resources.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/learn/guides"
          className="rounded-xl border border-border bg-card p-5 hover:bg-accent"
        >
          <div className="text-base font-semibold text-foreground">Guides</div>
          <div className="mt-1 text-sm text-muted-foreground">
            Evergreen best-practice articles.
          </div>
        </Link>
        <Link
          href="/learn/playbooks"
          className="rounded-xl border border-border bg-card p-5 hover:bg-accent"
        >
          <div className="text-base font-semibold text-foreground">
            Playbooks
          </div>
          <div className="mt-1 text-sm text-muted-foreground">
            Templates and checklists you can use immediately.
          </div>
        </Link>
      </section>
    </main>
  );
}
