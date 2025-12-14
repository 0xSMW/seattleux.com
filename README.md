# Seattle UX

A community website dedicated to the Seattle UX ecosystem:

- UX agencies and studios (`/agencies`)
- UX teams at Seattle-area companies (`/teams`)
- UX guides and best practices (`/learn/guides`)
- Playbooks and checklists (`/learn/playbooks`)
- Events and groups (`/community`)

The site is built with Next.js and uses MDX files under `content/` as the content source of truth.

## Tech Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS (theme tokens via CSS variables)
- MDX rendering via `next-mdx-remote` (RSC)
- Content frontmatter validated with `zod`
- Package manager: `pnpm`

## Local Development

### Prereqs

- Node.js 20+ recommended
- pnpm 10+

### Install and run

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

### Lint and build

```bash
pnpm lint
pnpm build
```

## Content (MDX)

Content lives in:

- `content/agencies` is not used; agencies are sourced from `content/firms`
- `content/firms` → `/agencies/[slug]`
- `content/companies` → `/teams/[slug]`
- `content/guides` → `/learn/guides/[slug]`
- `content/playbooks` → `/learn/playbooks/[slug]`
- `content/events` → `/community/events/[slug]`
- `content/groups` → `/community/groups/[slug]`

Templates live in `content/_templates/`.

## Configuration

### `NEXT_PUBLIC_SITE_URL`

Used for metadata and the sitemap.

Example:

```bash
NEXT_PUBLIC_SITE_URL=https://seattleux.com
```

### `NEXT_PUBLIC_REPO_URL`

If set, the site shows “Edit this …” and “Report an issue” links on content pages.

Example:

```bash
NEXT_PUBLIC_REPO_URL=https://github.com/0xSMW/seattleux.com
```

Local env vars can be set in `.env.local` (do not commit secrets).

## Contributing

Contributions are welcome:

- Add/update directory listings (agencies/teams)
- Improve guides and playbooks
- Fix bugs and UI polish

Start here: `CONTRIBUTING.md:1`

Quick flow:

1. Create or edit an MDX file under `content/` (use `content/_templates/`)
2. Run `pnpm lint` and `pnpm build`
3. Open a pull request

### Content quality expectations

- Keep copy neutral and factual (avoid “best of” language in listings)
- Verify links and set `lastVerified` for listings
- Use consistent tags where possible

## Project Status / Roadmap

See `100.md:1` for the improvements backlog.

## Code of Conduct

Be respectful and constructive. If you’d like a formal Code of Conduct added, open an issue or PR proposing one.
