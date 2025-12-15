"use client";

import { useMemo } from "react";
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

        {hasAnyFilter ? (
          <button
            type="button"
            onClick={() => router.replace(pathname)}
            className="inline-flex h-10 items-center justify-center rounded-lg border border-border bg-secondary px-4 text-sm font-medium text-secondary-foreground hover:bg-secondary/80"
          >
            Clear
          </button>
        ) : null}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {props.facetGroups.map((group) => (
          <fieldset key={group.key} className="space-y-2">
            <legend className="text-xs font-medium text-muted-foreground">{group.label}</legend>
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
