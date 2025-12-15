export const dynamic = "force-static";

export default function CodeOfConductPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-8 px-6 py-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Code of Conduct
        </h1>
        <p className="text-muted-foreground">
          Seattle UX is a community project. Be respectful, constructive, and
          inclusive.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Our standards</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li>Assume good intent and communicate with empathy.</li>
          <li>Critique ideas, not people.</li>
          <li>Welcome newcomers and different perspectives.</li>
          <li>No harassment, discrimination, or hate speech.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Enforcement</h2>
        <p className="text-sm text-muted-foreground">
          If you experience or witness unacceptable behavior, please report it
          to the maintainers via GitHub issues (or the contact info provided on
          the repository).
        </p>
      </section>
    </main>
  );
}

