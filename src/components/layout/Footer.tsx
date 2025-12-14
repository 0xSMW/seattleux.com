import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <div className="text-sm font-semibold text-foreground">Seattle UX</div>
            <p className="text-sm text-muted-foreground">
              A community hub for Seattle UX.
            </p>
            <div className="pt-2 text-sm text-muted-foreground">
              <Link href="/about" className="hover:text-foreground">
                About
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-semibold text-foreground">Discover</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/agencies" className="hover:text-foreground">
                  Agencies
                </Link>
              </li>
              <li>
                <Link href="/teams" className="hover:text-foreground">
                  Teams
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-foreground">
                  Search
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-semibold text-foreground">Learn</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/learn/guides" className="hover:text-foreground">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="/learn/playbooks" className="hover:text-foreground">
                  Playbooks
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-semibold text-foreground">Community</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/community/events" className="hover:text-foreground">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/community/groups" className="hover:text-foreground">
                  Groups
                </Link>
              </li>
              <li>
                <Link href="/contribute" className="hover:text-foreground">
                  Contribute
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border/40 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} Seattle UX</div>
          <div className="flex gap-4">
            <Link href="/code-of-conduct" className="hover:text-foreground">
              Code of Conduct
            </Link>
            <Link href="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="/policies/listings" className="hover:text-foreground">
              Listings policy
            </Link>
            <Link href="/changelog" className="hover:text-foreground">
              Changelog
            </Link>
            <Link href="/sitemap.xml" className="hover:text-foreground">
              Sitemap
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
