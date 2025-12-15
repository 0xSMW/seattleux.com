"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Props<T> = {
  items: T[];
  initialCount?: number;
  step?: number;
  className?: string;
  render: (item: T) => React.ReactNode;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function InfiniteGrid<T>(props: Props<T>) {
  const initialCount = props.initialCount ?? 12;
  const step = props.step ?? 12;

  const [visibleCount, setVisibleCount] = useState(() =>
    clamp(initialCount, 0, props.items.length),
  );
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const visibleCountClamped = clamp(visibleCount, 0, props.items.length);

  const visibleItems = useMemo(
    () => props.items.slice(0, visibleCountClamped),
    [props.items, visibleCountClamped],
  );

  const hasMore = visibleCountClamped < props.items.length;

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        setVisibleCount((c) => clamp(c + step, 0, props.items.length));
      },
      { rootMargin: "300px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, props.items.length, step]);

  return (
    <div>
      <div className={props.className}>
        {visibleItems.map((item) => props.render(item))}
      </div>

      {hasMore ? (
        <div className="mt-6 flex items-center justify-center">
          <button
            type="button"
            onClick={() =>
              setVisibleCount((c) => clamp(c + step, 0, props.items.length))
            }
            className="inline-flex h-11 items-center justify-center rounded-xl border border-border/40 bg-background px-5 text-sm font-medium text-foreground shadow-sm hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring"
          >
            Load more ({props.items.length - visibleCountClamped} remaining)
          </button>
        </div>
      ) : null}

      <div ref={sentinelRef} />
    </div>
  );
}
