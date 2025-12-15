import Link from "next/link";

export const dynamic = "force-static";

export default function ModerationPolicyPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-8 px-6 py-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Moderation guidelines
        </h1>
        <p className="text-muted-foreground">
          How Seattle UX keeps directory content useful, accurate, and low-noise.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Core principles</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li>Neutral, factual descriptions</li>
          <li>No “best-of” rankings or pay-to-play language</li>
          <li>Verifiable links and clear Seattle presence</li>
          <li>Transparent freshness via `lastVerified`</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">
          When we may decline a listing
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li>Spam or promotional content masquerading as community info</li>
          <li>Non-working or deceptive links</li>
          <li>Content that violates the Code of Conduct</li>
        </ul>
      </section>

      <p className="text-sm text-muted-foreground">
        See also:{" "}
        <Link
          href="/policies/listings"
          className="underline underline-offset-4 hover:text-foreground"
        >
          Listings policy
        </Link>
        .
      </p>
    </main>
  );
}

