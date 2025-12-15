import Link from "next/link";

export const dynamic = "force-static";

export default function AntiSpamPolicyPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-8 px-6 py-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Anti-spam checklist
        </h1>
        <p className="text-muted-foreground">
          A lightweight checklist to keep contributions helpful and trustworthy.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">
          Review checklist (for maintainers)
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li>Does the content read neutral and factual?</li>
          <li>Are all links valid and relevant?</li>
          <li>Is Seattle presence clearly stated?</li>
          <li>Are tags appropriate (not keyword stuffing)?</li>
          <li>Is `lastVerified` realistic and recent?</li>
        </ul>
      </section>

      <p className="text-sm text-muted-foreground">
        Want to contribute? Start at{" "}
        <Link
          href="/contribute"
          className="underline underline-offset-4 hover:text-foreground"
        >
          Contribute
        </Link>
        .
      </p>
    </main>
  );
}

