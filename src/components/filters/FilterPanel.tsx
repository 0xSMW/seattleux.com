"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function toggleParamValue(
  searchParams: URLSearchParams,
  key: string,
  value: string,
) {
  const next = new URLSearchParams(searchParams);
  const existing = new Set(next.getAll(key));
  if (existing.has(value)) {
    const kept = next.getAll(key).filter((v) => v !== value);
    next.delete(key);
    for (const v of kept) next.append(key, v);
  } else {
    next.append(key, value);
  }
  return next;
}

export function FilterPanel(props: {
  searchKeyLabel: string;
  searchPlaceholder: string;
  facetGroups: Array<{ key: string; label: string; values: string[] }>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [copied, setCopied] = useState(false);

  const selected = useMemo(() => {
    const map = new Map<string, Set<string>>();
    for (const group of props.facetGroups) {
      map.set(group.key, new Set(searchParams.getAll(group.key)));
    }
    return map;
  }, [props.facetGroups, searchParams]);

  const q = searchParams.get("q") ?? "";
  const hasAnyFilter =
    q.trim().length > 0 ||
    props.facetGroups.some((g) => (searchParams.getAll(g.key) ?? []).length > 0);

  const selectedChips = useMemo(() => {
    const chips: Array<{ groupKey: string; label: string; value: string }> = [];
    for (const group of props.facetGroups) {
      const values = searchParams.getAll(group.key);
      for (const value of values) {
        chips.push({ groupKey: group.key, label: group.label, value });
      }
    }
    return chips;
  }, [props.facetGroups, searchParams]);

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <label className="w-full">
          <div className="text-xs font-medium text-muted-foreground">{props.searchKeyLabel}</div>
          <input
            value={q}
            onChange={(e) => {
              const next = new URLSearchParams(searchParams);
              const value = e.target.value;
              if (value.trim().length === 0) next.delete("q");
              else next.set("q", value);
              router.replace(`${pathname}?${next.toString()}`);
            }}
            placeholder={props.searchPlaceholder}
            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring"
          />
        </label>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                window.setTimeout(() => setCopied(false), 1200);
              } catch {
                // no-op
              }
            }}
            className="inline-flex h-10 items-center justify-center rounded-lg border border-border bg-background px-4 text-sm font-medium text-foreground hover:bg-accent"
          >
            {copied ? "Copied" : "Copy link"}
          </button>
          {hasAnyFilter ? (
            <button
              type="button"
              onClick={() => router.replace(pathname)}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-border bg-secondary px-4 text-sm font-medium text-secondary-foreground hover:bg-secondary/80"
            >
              Clear all
            </button>
          ) : null}
        </div>
      </div>

      {selectedChips.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {selectedChips.map((chip) => (
            <button
              key={`${chip.groupKey}:${chip.value}`}
              type="button"
              onClick={() => {
                const next = toggleParamValue(searchParams, chip.groupKey, chip.value);
                router.replace(`${pathname}?${next.toString()}`);
              }}
              className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-background px-3 py-1.5 text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
              title={`Remove ${chip.label}: ${chip.value}`}
            >
              <span className="text-foreground/80">{chip.label}</span>
              <span className="text-muted-foreground">{chip.value}</span>
              <span aria-hidden="true" className="text-muted-foreground/70">
                ×
              </span>
            </button>
          ))}
        </div>
      ) : null}

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {props.facetGroups.map((group) => (
          <fieldset key={group.key} className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <legend className="text-xs font-medium text-muted-foreground">
                {group.label}
              </legend>
              {searchParams.getAll(group.key).length > 0 ? (
                <button
                  type="button"
                  onClick={() => {
                    const next = new URLSearchParams(searchParams);
                    next.delete(group.key);
                    router.replace(`${pathname}?${next.toString()}`);
                  }}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear
                </button>
              ) : null}
            </div>
            <div className="flex max-h-44 flex-col gap-2 overflow-auto pr-1">
              {group.values.map((value) => {
                const checked = selected.get(group.key)?.has(value) ?? false;
                return (
                  <label key={value} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {
                        const next = toggleParamValue(searchParams, group.key, value);
                        router.replace(`${pathname}?${next.toString()}`);
                      }}
                      className="h-4 w-4 rounded border-input accent-primary"
                    />
                    <span className="text-sm text-foreground">{value}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>
    </div>
  );
}
