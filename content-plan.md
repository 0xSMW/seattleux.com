# Content Seeding Plan (10+ items per section)

This doc outlines what to publish first so `Directories`, `Learn`, and `Community` feel complete at launch. It assumes MDX-first publishing under `content/` and focuses on high-signal, evergreen content.

## 1) Directories: Firms & Agencies (10+)

### Goal
Provide a credible starting directory that’s easy to expand, without “best-of” rankings.

### Minimum quality bar per listing
- Verified website link
- Clear service categories (use consistent tags)
- Seattle presence (or remote-friendly with Seattle clients)
- `lastVerified` set to the date checked

### Seed set (10+ listing targets)
Create 10–20 initial entries. Start with a balanced mix:
- Large global firms with Seattle presence
- Established local consultancies
- Boutique UX research studios
- Service design / org design specialists
- Product design + design systems shops

### Suggested service taxonomy (use in `services`)
- `ux-research`
- `product-design`
- `ui-design`
- `service-design`
- `content-design`
- `design-systems`
- `accessibility`
- `strategy`

### Suggested industries taxonomy (use in `industries`)
- `saas`
- `fintech`
- `healthcare`
- `ecommerce`
- `enterprise`
- `consumer`
- `public-sector`

### Files to create
- `content/firms/<slug>.mdx` (10–20 files)

## 2) Directories: Company UX Teams (10+)

### Goal
Help people understand the Seattle UX landscape and discover teams to follow/join.

### Minimum quality bar per listing
- Verified website link
- `seattlePresence` is specific and honest
- Team focus categories included
- Careers page if available
- `lastVerified`

### Seed set (10+ listing targets)
Create 15–30 initial entries spanning:
- Large tech with strong design orgs
- Mid-size Seattle product companies
- Healthcare, logistics, retail, finance
- Public sector / civic tech-adjacent orgs

### Suggested team focus taxonomy (use in `teamFocus`)
- `product-design`
- `ux-research`
- `content-design`
- `design-systems`
- `accessibility`
- `service-design`

### Files to create
- `content/companies/<slug>.mdx` (15–30 files)

## 3) Learn: Guides (Best Practices) (10+)

### Goal
Publish “Seattle UX cornerstone content” that answers common questions and builds authority.

### Editorial standard
Each guide should include:
- who it’s for
- a clear problem statement
- step-by-step approach
- pitfalls
- resources

### Seed set (12–15 guide topics)
1. Running effective stakeholder interviews (Seattle context + remote)
2. Writing research plans that actually get approved
3. Recruiting participants in the Seattle area (and remote)
4. Synthesizing qualitative research without losing rigor
5. Choosing the right usability test method (moderated/unmoderated)
6. Accessibility basics for product teams (practical checklist)
7. Designing for enterprise workflows (common UX traps)
8. Designing forms and error states that reduce support load
9. Information architecture fundamentals for product teams
10. Measuring UX impact: metrics that don’t mislead
11. Design critique that improves work (and team culture)
12. Getting design systems adopted (governance + collaboration)
13. Writing UX copy that reduces friction (content design basics)
14. Running workshops that drive decisions (not just alignment)
15. UX career growth in Seattle (skills map + community resources)

### Tags to use (start with a small stable set)
- `research`
- `accessibility`
- `design-systems`
- `content-design`
- `leadership`
- `workshops`
- `ia`
- `metrics`

### Files to create
- `content/guides/<slug>.mdx` (12–15 files)

## 4) Learn: Playbooks (Templates/Checklists) (10+)

### Goal
Offer practical assets that teams can adopt immediately.

### Seed set (10–12 playbooks)
1. Research plan template
2. Interview discussion guide template
3. Usability test plan template
4. Consent + recording checklist
5. Research synthesis template (affinity mapping → themes)
6. Heuristic evaluation checklist (Nielsen + accessibility add-ons)
7. Accessibility QA checklist for product releases
8. Design critique format + rubric
9. Design system contribution checklist
10. Product discovery workshop agenda (90 minutes)
11. UX debt triage rubric
12. Portfolio review checklist (hiring manager friendly)

### Files to create
- `content/playbooks/<slug>.mdx` (10–12 files)

## 5) Community: Events (10+)

### Goal
Make the site feel alive with a calendar and “what’s happening” surface area.

### Seed strategy
Create 10–15 event entries that include:
- recurring meetups (monthly/quarterly)
- conferences (annual)
- workshops (occasional)
- community hangouts / portfolio reviews

If you don’t have specific upcoming events yet, create “evergreen” pages for recurring series and mark `status: upcoming` with a placeholder date, then update as dates firm up.

### Files to create
- `content/events/<slug>.mdx` (10–15 files)

## 6) Community: Groups & Meetups (10+)

### Goal
Help people find ongoing communities beyond one-off events.

### Implementation note
This section doesn’t exist in routes yet; seed content anyway so we can add it next.

### Seed set (10–15 group page types)
- UX meetup groups
- Research-focused groups
- Accessibility communities
- Design leadership circles
- Student groups / university-adjacent communities
- Portfolio review groups
- Industry-specific UX groups (healthcare, fintech, civic, etc.)

### Files to create (proposed new type)
- `content/groups/<slug>.mdx` (10–15 files)

## 7) Launch Sequencing (Recommended)

### Week 1 (Foundation)
- 10 firms + 15 companies + 6 guides + 4 playbooks

### Week 2 (Credibility)
- +10 companies + 6 guides + 6 playbooks

### Week 3 (Community)
- 10 events + 10 groups pages (or at least stubs)

## 8) Ops: Keeping Content Fresh

- Add a simple monthly review ritual:
  - re-verify links for top 20 directory entries
  - update `lastVerified`
- Add a “report an issue” path later (link to GitHub issue template).

