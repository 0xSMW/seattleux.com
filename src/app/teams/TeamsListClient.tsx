"use client";

import Link from "next/link";
import { InfiniteGrid } from "@/components/lists/InfiniteGrid";

export type TeamCard = {
  slug: string;
  name: string;
  presence: string;
  focus: string[];
  featured: boolean;
  stale: boolean;
};

export function TeamsListClient(props: { items: TeamCard[]; resetKey: string }) {
  return (
    <InfiniteGrid
      key={props.resetKey}
      items={props.items}
      initialCount={12}
      step={12}
      className="grid gap-4 sm:grid-cols-2"
      render={(company) => (
        <Link
          key={company.slug}
          href={`/teams/${company.slug}`}
          className="rounded-xl border border-border bg-card p-5 hover:bg-accent"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="text-base font-semibold text-foreground">
              {company.name}
            </div>
            <div className="flex items-center gap-2">
              {company.stale ? (
                <span className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
                  Stale
                </span>
              ) : null}
              {company.featured ? (
                <span className="rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                  Featured
                </span>
              ) : null}
            </div>
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            {company.presence}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {company.focus.slice(0, 3).map((focus) => (
              <span
                key={focus}
                className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground"
              >
                {focus}
              </span>
            ))}
          </div>
        </Link>
      )}
    />
  );
}
