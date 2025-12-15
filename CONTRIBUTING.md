# Contributing

Seattle UX is a community site. Directory entries and guides are stored as MDX in `content/`.

## Quick start

1. Pick a template in `content/_templates/`
2. Create a new MDX file (the filename becomes the slug)
3. Fill out frontmatter and the body
4. Run `pnpm lint` and `pnpm build`
5. Open a PR

## Content guidelines

### General
- Keep copy neutral and factual.
- Prefer verifiable details and link sources when possible.
- Avoid “best-of” rankings in the content itself; focus on findability and clarity.

### Directory entries (firms/companies)
- Required: name, website, and `lastVerified`.
- If you can’t verify a field, omit it rather than guessing.

### Guides
- Use clear titles and descriptions.
- Add tags that match existing taxonomy when possible.
- Mark unfinished drafts with `draft: true`.

