# Seattle UX Community Site — Plan (Next.js + MDX)

## 1) Goals + Success Criteria

### Primary goals
- Be the canonical “Seattle UX hub” for people looking to connect, learn, and find UX organizations in the region.
- Provide trustworthy, up-to-date directories of:
  - Seattle UX firms/agencies
  - UX teams at Seattle-area companies
- Publish high-quality UX best-practice content tailored to the Seattle community.

### Success criteria (measurable)
- Visitors can find a firm or team in under 30 seconds (filter + search, clear taxonomy).
- Each directory entry has consistent, complete info (services/industries/size/location/links).
- Content is discoverable via SEO (structured data, sitemap, clean URLs, internal linking).
- Editing and adding content is easy and safe (MDX + frontmatter schema validation).
- Accessibility baseline: WCAG-friendly patterns (semantic HTML, keyboard nav, contrast).

## 2) Audience + User Journeys

### Key audiences
- UX practitioners in Seattle (ICs, leads, managers)
- Hiring managers / recruiters looking for Seattle UX talent and teams
- Founders / product leaders seeking UX partners (agencies/firms)
- Students/career-switchers looking for guidance, community, and local context

### Top journeys to optimize
1. “Find a UX agency in Seattle for X” → Directory → Filters → Entry → Contact link
2. “Learn best practices for Y” → Guides → Topic → Read → Related guides
3. “Who has UX teams in Seattle?” → Companies directory → Search + filters
4. “What’s happening locally?” → Events → Upcoming list → RSVP/links
5. “I want to contribute/update a listing” → Contribute → PR workflow + guidelines

## 3) Information Architecture (IA)

### Global navigation
- Home
- Directories
  - Firms & Agencies
  - Company UX Teams
  - (Optional later) Freelancers / Consultants
- Learn
  - Best Practices (Guides)
  - Playbooks (templates/checklists)
  - (Optional later) Case Studies (Seattle-focused)
- Community
  - Events
  - Groups & Meetups
  - Newsletter (optional)
- Contribute
  - Add/Update a Listing
  - Editorial Guidelines
  - Code of Conduct

### Core page types (high level)
- Landing pages: `/`, `/directories`, `/learn`, `/community`, `/contribute`
- Directory index pages with filters:
  - `/directories/firms`
  - `/directories/companies`
- Directory detail pages:
  - `/directories/firms/[slug]`
  - `/directories/companies/[slug]`
- Content (MDX):
  - Guides: `/learn/guides/[slug]`
  - Playbooks: `/learn/playbooks/[slug]`
  - Events: `/community/events/[slug]` (optional MDX or JSON; MDX works fine)
- Utility:
  - `/search`
  - `/about`, `/contact` (optional), `/privacy` (optional)

## 4) Taxonomy + Content Model (MDX Frontmatter)

### Shared taxonomy (use consistently across types)
- `tags`: topical keywords (e.g. `research`, `design-systems`, `accessibility`)
- `location`: neighborhood/city (e.g. `Seattle`, `Bellevue`, `Remote-friendly`)
- `industries`: `fintech`, `healthcare`, `ecommerce`, `enterprise`, etc.
- `services`: for firms (e.g. `ux-research`, `ui-design`, `service-design`)
- `companySize`: for companies (e.g. `startup`, `mid-market`, `enterprise`)

### Content types

#### A) Firms & Agencies
Purpose: high-signal directory entries; comparable data; outbound conversion to contact.

Frontmatter fields (proposed):
- `name` (string)
- `slug` (string) — derived from filename, but allow override
- `website` (url)
- `locations` (string[]) — e.g. `["Seattle", "Remote-friendly"]`
- `services` (string[])
- `industries` (string[])
- `teamSize` (string | number range)
- `founded` (number, optional)
- `contact` (object, optional) — email/contact page
- `social` (object, optional) — LinkedIn, X, etc.
- `featured` (boolean, optional)
- `lastVerified` (date string) — helps with trust/freshness

Directory detail page sections (MDX body):
- Overview (short)
- What they’re great at (bulleted)
- Typical engagements (optional)
- Notable work (optional, keep tasteful/non-promotional)
- How to contact

#### B) Company UX Teams
Purpose: help people map the local UX landscape and find teams to join/learn from.

Frontmatter fields (proposed):
- `name` (string)
- `slug` (string)
- `website` (url)
- `hq` (string, optional)
- `seattlePresence` (string) — e.g. “Seattle HQ”, “Office”, “Remote”
- `industries` (string[])
- `teamFocus` (string[]) — e.g. `product-design`, `research`, `content-design`
- `hiringPage` (url, optional)
- `designSystem` (url, optional)
- `featured` (boolean, optional)
- `lastVerified` (date string)

MDX body sections:
- Team overview
- Org shape (optional)
- What they’re working on (high-level)
- Links (careers, design system, blog)

#### C) Guides (Best Practices)
Purpose: evergreen educational content; internally linked; SEO-friendly.

Frontmatter fields (proposed):
- `title` (string)
- `slug` (string)
- `description` (string)
- `publishedAt` (date string)
- `updatedAt` (date string, optional)
- `tags` (string[])
- `readingTime` (number, derived)
- `draft` (boolean, optional)

MDX body sections:
- Problem framing
- Step-by-step approach
- Examples and templates
- Common pitfalls
- “Seattle context” callout (optional, but differentiating)
- Related reading

#### D) Playbooks (Templates/Checklists)
Purpose: actionable assets; downloadable content (optional).

Frontmatter fields (proposed):
- `title`, `slug`, `description`
- `tags`
- `publishedAt`
- `artifactLinks` (url[], optional) — Figma, Google Doc, etc.

#### E) Events
Purpose: community calendar; ongoing relevance; simple submission workflow.

Frontmatter fields (proposed):
- `title`, `slug`, `description`
- `startAt` (date-time), `endAt` (date-time, optional)
- `venue` (string, optional), `address` (string, optional)
- `host` (string, optional)
- `ticketUrl` (url, optional)
- `tags` (string[])
- `status` (enum: `upcoming|past|cancelled`)

## 5) Content Repository Structure (Folders)

Store content under `content/` and keep page code under `src/app/`.

Proposed structure:
- `content/`
  - `firms/`
    - `frog.mdx`
    - `artifact-ux.mdx`
  - `companies/`
    - `microsoft.mdx`
    - `amazon.mdx`
  - `guides/`
    - `running-effective-ux-research-in-seattle.mdx`
  - `playbooks/`
    - `heuristic-evaluation-checklist.mdx`
  - `events/`
    - `2026-01-seattle-ux-meetup.mdx`

## 6) UX / UI Principles (for the build)

- Directory-first: filters and sort should be fast, obvious, and forgiving.
- High trust: show “Last verified” and link sources (where appropriate).
- Reduce noise: avoid spammy rankings; focus on clarity and relevance.
- Strong internal linking: tags/topics connect guides ↔ companies ↔ firms.
- Accessibility: no filter UI that requires a mouse; all controls keyboard friendly.

## 7) Features to Implement (Prioritized)

### Phase 1 — MVP (launchable)
- Home page that routes users into the 3 pillars (Directories, Learn, Community).
- Firms directory:
  - List with search + basic filters (services, industries, location)
  - Firm detail page from MDX
- Companies directory:
  - List with search + filters (industry, seattlePresence, teamFocus)
  - Company detail page from MDX
- Guides:
  - Guides index page with tags
  - Guide detail pages from MDX
- SEO baseline:
  - Metadata per page
  - `sitemap.xml`, `robots.txt`
  - OpenGraph images (basic template)

### Phase 2 — Content quality + discovery
- Site-wide search (client-side index or server-side; start simple)
- “Related content” panels (by tag overlap)
- “Last verified” reminders (docs + lightweight process)
- RSS feed for guides

### Phase 3 — Community depth
- Events pages + iCal feed
- Contribute flow:
  - “Add a listing” forms (link to GitHub issues/PR template initially)
  - Contribution guidelines + code of conduct

### Phase 4 — Polish and growth
- Analytics (privacy-friendly)
- Newsletter integration
- Moderation workflow + spam prevention
- Optional: “Compare firms” / saved filters

## 8) MDX Implementation Plan (Technical)

### MDX approach
Use Next.js MDX integration with:
- A `content` loader that reads MDX files at build time
- Frontmatter parsing + schema validation
- Compiled MDX rendered in App Router

Key technical decisions to make:
- MDX library: `@next/mdx` (simple integration) or `next-mdx-remote` (more control)
- Frontmatter: `gray-matter`
- Schema validation: `zod`
- Optional: `reading-time` for guides

### Components for MDX
Create a small set of reusable MDX components:
- `Callout` (info/warn/tip)
- `ProCon` (two-column list)
- `Checklist`
- `DefinitionList`
- `TagList`

### Routing strategy
Use slug-based dynamic routes:
- `src/app/directories/firms/[slug]/page.tsx`
- `src/app/directories/companies/[slug]/page.tsx`
- `src/app/learn/guides/[slug]/page.tsx`
- `src/app/learn/playbooks/[slug]/page.tsx`
- `src/app/community/events/[slug]/page.tsx`

Add index pages that read and render collections with filters.

### Content utilities (shared)
Implement utilities in `src/lib/content/`:
- `getAllFirms()`, `getFirmBySlug()`
- `getAllCompanies()`, `getCompanyBySlug()`
- `getAllGuides()`, `getGuideBySlug()`
- Shared helpers:
  - `readMdxFile(path)`
  - `parseFrontmatter()`
  - `validateFrontmatter(schema)`
  - `sortByFeaturedOrName()`
  - `buildTagIndex()`

### Build-time validation
Fail builds if:
- Required frontmatter is missing/invalid
- Duplicate slugs exist
- Links are obviously malformed (basic URL validation)

## 9) SEO + Structured Data Plan

### URL design
- Stable, human-readable slugs: `seattle-ux-agency-name`
- Avoid querystring-only navigation; keep filters in querystring but allow canonical URLs.

### Structured data (JSON-LD)
- Firm pages: `Organization` (plus `LocalBusiness` if location is specific)
- Company pages: `Organization`
- Guides: `Article`
- Events: `Event`

### Sitemaps
- Auto-generate sitemap entries for all MDX content slugs.
- Separate sections within one sitemap or multiple (optional).

### Metadata
- Use `generateMetadata()` per dynamic route using frontmatter.
- OpenGraph cards: simple consistent template (title, description, type).

## 10) Editorial Guidelines (Quality Bar)

### Directories
- Avoid “best of” rankings at first; focus on neutral listings with clear criteria.
- Require `lastVerified` and a minimal info set for publish.
- Keep descriptions factual; limit superlatives.

### Guides
- Start with 5–8 cornerstone guides:
  - UX research planning
  - Accessibility basics + Seattle resources
  - Design systems: governance and adoption
  - Stakeholder management
  - Hiring and portfolio review (local context)
- Ensure each guide includes:
  - Clear problem statement
  - Steps
  - Pitfalls
  - References/resources

## 11) Execution Checklist (Step-by-step)

### Step 1 — Add MDX infrastructure
- Add dependencies (MDX, frontmatter, schema validation).
- Create `content/` tree and sample MDX files for each type.
- Create content loader utilities and schemas.
- Add dynamic routes + index pages.

### Step 2 — Build directory UX
- Directory list components (search + filter UI).
- Filter state in URL query params.
- Sorting rules (featured first, then alphabetical).

### Step 3 — Launch-ready polish
- Basic design system (typography, spacing, buttons, cards).
- SEO + JSON-LD + sitemap/robots.
- 404/not-found and empty states for directories.

### Step 4 — Content seeding
- Add initial 10–20 entries for firms and companies (even partial) with `lastVerified`.
- Add 5 guides.

### Step 5 — Contribution workflow
- Add `/contribute` pages.
- Add PR templates and content guidelines for adding MDX entries.

## 12) Acceptance Criteria for “MVP Complete”
- `pnpm build` passes and the site renders:
  - Firms list + detail
  - Companies list + detail
  - Guides list + detail
- Editing/adding MDX content requires no code changes beyond the MDX file.
- Frontmatter validation prevents broken builds and catches duplicates.
- Sitemap includes all MDX slugs.

---

## 13) Detailed Execution Plan (What we’ll build next)

### A) Directory search + filters (Firms, Companies)
- Implement URL-driven filtering (query params) so lists are shareable/bookmarkable.
- Add a search input (`q`) to filter by name and key attributes.
- Add facet filter chips/checkboxes populated from existing MDX content:
  - Firms: `locations`, `services`, `industries`
  - Companies: `seattlePresence`, `teamFocus`, `industries`
- Filtering logic: OR within a facet, AND across facets.
- Sorting: featured first, then alphabetical.
- Empty state: “No results” + “Clear filters” action.

### B) Learn section improvements (Guides)
- Add tag filtering (`tag`) + query search (`q`) on `/learn/guides`.
- Add guide authoring templates and editorial checklist.
- Add “Related guides” module based on tag overlap (Phase 2 if needed).

### C) MDX authoring templates + validation
- Add `content/_templates/` MDX templates for:
  - firm listing
  - company listing
  - guide
- Add contribution docs to keep quality high:
  - minimum required fields
  - “last verified” guidance
  - neutral tone guidelines

### D) Contribute workflow
- Create `/contribute` landing with:
  - How to add/update a listing
  - Links to templates
  - Validation rules and expectations
- Add a lightweight “submission” process (start with PR-based, forms later).

### E) SEO baseline
- Add `src/app/sitemap.ts` and `src/app/robots.ts` including all MDX slugs.
- Add JSON-LD structured data on:
  - firm/company pages (`Organization`)
  - guide pages (`Article`)
- Ensure dynamic route metadata uses frontmatter.
