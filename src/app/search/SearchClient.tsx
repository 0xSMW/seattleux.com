"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export type SearchItem = {
  href: string;
  title: string;
  description: string;
  tags: string[];
  kind: "agency" | "team" | "guide" | "playbook" | "event" | "group";
};

export function SearchClient(props: { items: SearchItem[] }) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "/") return;
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();
      const isEditable =
        tag === "input" || tag === "textarea" || (target?.isContentEditable ?? false);
      if (isEditable) return;
      e.preventDefault();
      inputRef.current?.focus();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return props.items.slice(0, 24);
    const filtered = props.items.filter((item) => {
      const haystack = [
        item.title,
        item.description,
        item.kind,
        ...(item.tags ?? []),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });
    return filtered.slice(0, 50);
  }, [props.items, q]);

  return (
    <div className="space-y-6">
      <label className="block">
        <div className="text-xs font-medium text-muted-foreground">Search</div>
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Try: accessibility, research, design systems…"
          className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground shadow-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </label>

      <div className="text-sm text-muted-foreground">
        {q.trim() ? (
          <>
            Showing {results.length} of {props.items.length}
          </>
        ) : (
          <>Top {results.length} results</>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {results.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="block rounded-2xl border border-border/40 bg-card p-5 shadow-sm transition-colors hover:bg-accent"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="text-base font-semibold text-foreground">
                {item.title}
              </div>
              <span className="shrink-0 rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
                {item.kind}
              </span>
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              {item.description}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {(item.tags ?? []).slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </a>
        ))}
        {results.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border/60 bg-card p-8 text-sm text-muted-foreground sm:col-span-2">
            No results. Try a broader term.
          </div>
        ) : null}
      </div>
    </div>
  );
}
