"use client";

import { openCommandPalette } from "./CommandPaletteClient";

export function CommandPaletteTrigger() {
  return (
    <button
      type="button"
      onClick={() => openCommandPalette()}
      className="hidden h-9 items-center gap-2 rounded-lg border border-border/40 bg-background px-3 text-xs font-medium text-foreground shadow-sm hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring md:inline-flex"
    >
      Search
      <span className="rounded bg-muted px-1 py-0.5 text-[10px] text-muted-foreground">
        ⌘K
      </span>
    </button>
  );
}

