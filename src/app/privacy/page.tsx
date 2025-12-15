export const dynamic = "force-static";

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-8 px-6 py-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Privacy policy
        </h1>
        <p className="text-muted-foreground">
          Seattle UX aims to be a simple, community website. This policy describes
          what data the site collects and how it’s used.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Information we collect</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li>
            No account is required to browse the site. We do not ask you to provide
            personal information to read content.
          </li>
          <li>
            If you choose to contribute via GitHub, your contribution is subject to
            GitHub’s privacy policy and public activity model.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Cookies</h2>
        <p className="text-sm text-muted-foreground">
          The site may store a small preference cookie/localStorage entry for UI
          settings (for example, theme selection).
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Analytics</h2>
        <p className="text-sm text-muted-foreground">
          If analytics are enabled in the future, we’ll prefer privacy-friendly,
          minimal collection. This policy will be updated accordingly.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">External links</h2>
        <p className="text-sm text-muted-foreground">
          Directory listings and resources link to third-party sites. Those sites
          have their own privacy practices.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Changes</h2>
        <p className="text-sm text-muted-foreground">
          This policy may change as the site evolves. Major updates will be noted in
          the changelog.
        </p>
      </section>
    </main>
  );
}

