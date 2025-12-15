"use client";

import Link from "next/link";
import { InfiniteGrid } from "@/components/lists/InfiniteGrid";

export type AgencyCard = {
  slug: string;
  name: string;
  locations: string[];
  services: string[];
  featured: boolean;
  stale: boolean;
};

export function AgenciesListClient(props: { items: AgencyCard[]; resetKey: string }) {
  return (
    <InfiniteGrid
      key={props.resetKey}
      items={props.items}
      initialCount={12}
      step={12}
      className="grid gap-4 sm:grid-cols-2"
      render={(firm) => (
        <Link
          key={firm.slug}
          href={`/agencies/${firm.slug}`}
          className="rounded-xl border border-border bg-card p-5 hover:bg-accent"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="text-base font-semibold text-foreground">
              {firm.name}
            </div>
            <div className="flex items-center gap-2">
              {firm.stale ? (
                <span className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
                  Stale
                </span>
              ) : null}
              {firm.featured ? (
                <span className="rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                  Featured
                </span>
              ) : null}
            </div>
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            {firm.locations.join(" · ")}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {firm.services.slice(0, 3).map((service) => (
              <span
                key={service}
                className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground"
              >
                {service}
              </span>
            ))}
          </div>
        </Link>
      )}
    />
  );
}
