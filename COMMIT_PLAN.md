# Git Commit Plan - Individual File Commits with Creation Dates

## Overview
This plan outlines the process to commit each modified and untracked file individually, using each file's creation timestamp as the commit date.

## Steps

### Phase 1: Preparation
1. ✅ Check git status (already completed)
2. Identify all files to commit:
   - Modified files: 26 files
   - Untracked files: Multiple directories and files

### Phase 2: Get File Creation Timestamps
For each file:
- Use `stat -f "%SB" -t "%Y-%m-%dT%H:%M:%S" <file>` on macOS to get creation date
- Or use `stat -f "%B" <file>` to get birth time in seconds since epoch
- Format as ISO 8601 for git commit date: `YYYY-MM-DDTHH:MM:SS`

### Phase 3: Process Modified Files
For each of the 26 modified files:
1. Get file creation timestamp
2. Stage the file: `git add <file>`
3. Commit with creation date: `git commit --date="<timestamp>" -m "Add/Update <filename>"`

### Phase 4: Process Untracked Files
For each untracked file/directory:
1. Get file creation timestamp
2. Stage the file: `git add <file>`
3. Commit with creation date: `git commit --date="<timestamp>" -m "Add <filename>"`

### Phase 5: Handle Directories
For untracked directories:
- Recursively add all files within
- Commit each file individually with its own creation date

## Files to Process

### Modified Files (26):
1. README.md
2. content/events/sample-monthly-meetup-jan-2026.mdx
3. content/guides/accessibility-basics-checklist.mdx
4. content/playbooks/accessibility-qa-checklist.mdx
5. next.config.ts
6. package.json
7. pnpm-lock.yaml
8. src/app/agencies/[slug]/page.tsx
9. src/app/agencies/page.tsx
10. src/app/community/events/[slug]/page.tsx
11. src/app/community/events/page.tsx
12. src/app/community/groups/[slug]/page.tsx
13. src/app/community/groups/page.tsx
14. src/app/globals.css
15. src/app/layout.tsx
16. src/app/learn/guides/[slug]/page.tsx
17. src/app/learn/guides/page.tsx
18. src/app/learn/playbooks/[slug]/page.tsx
19. src/app/page.tsx
20. src/app/robots.ts
21. src/app/sitemap.ts
22. src/app/teams/[slug]/page.tsx
23. src/app/teams/page.tsx
24. src/components/filters/FilterPanel.tsx
25. src/components/mdx/Mdx.tsx
26. src/lib/content/schemas.ts

### Untracked Files/Directories:
- .github/
- 100.md
- components.json
- scripts/
- src/app/about/
- src/app/agencies/AgenciesListClient.tsx
- src/app/changelog/
- src/app/code-of-conduct/
- src/app/community/events.ics/
- src/app/learn/guides/atom.xml/
- src/app/learn/guides/feed.json/
- src/app/learn/guides/rss.xml/
- src/app/not-found.tsx
- src/app/opengraph-image.tsx
- src/app/policies/
- src/app/privacy/
- src/app/search/
- src/app/stale/
- src/app/tags/
- src/app/teams/TeamsListClient.tsx
- src/app/twitter-image.tsx
- src/components/command/
- src/components/layout/
- src/components/lists/
- src/components/nav/
- src/components/theme/
- src/components/ui/
- src/lib/content/related.ts
- src/lib/content/stale.ts
- src/lib/content/toc.ts
- src/lib/links/
- src/lib/seo/site.ts
- src/lib/text/
- src/lib/utils.ts

## Implementation Notes
- Use `stat -f "%B"` to get birth time in seconds since epoch
- Convert to ISO format: `date -r <timestamp> -u +"%Y-%m-%dT%H:%M:%S"`
- For directories, process each file within individually
- Use descriptive commit messages based on file type and purpose

