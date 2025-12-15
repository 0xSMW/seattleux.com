import Link from "next/link";

export const dynamic = "force-static";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-8 px-6 py-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          About Seattle UX
        </h1>
        <p className="text-muted-foreground">
          Seattle UX is a community-maintained website that helps people discover
          local UX organizations, learn practical best practices, and connect
          through events and groups.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Mission</h2>
        <p className="text-sm text-muted-foreground">
          Make it easy to understand the Seattle UX landscape and find credible
          resources—without rankings or hype.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Editorial policy</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li>Listings and guides aim to be factual, neutral, and useful.</li>
          <li>We prefer verifiable info and working links.</li>
          <li>Directory entries include a `lastVerified` date for transparency.</li>
        </ul>
        <p className="text-sm text-muted-foreground">
          Learn more about directory criteria in{" "}
          <Link
            href="/policies/listings"
            className="underline underline-offset-4 hover:text-foreground"
          >
            Listings policy
          </Link>
          .
        </p>
      </section>
    </main>
  );
}

