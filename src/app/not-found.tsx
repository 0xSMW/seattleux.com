import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl space-y-6 px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        Page not found
      </h1>
      <p className="text-muted-foreground">
        The page you’re looking for doesn’t exist (or moved). Try one of these:
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/search"
          className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
        >
          Search the site
        </Link>
        <Link
          href="/agencies"
          className="inline-flex h-11 items-center justify-center rounded-xl border border-border/40 bg-secondary px-5 text-sm font-medium text-secondary-foreground hover:bg-secondary/80"
        >
          Browse agencies
        </Link>
        <Link
          href="/teams"
          className="inline-flex h-11 items-center justify-center rounded-xl border border-border/40 bg-background px-5 text-sm font-medium text-foreground hover:bg-accent"
        >
          Browse teams
        </Link>
      </div>
    </main>
  );
}

