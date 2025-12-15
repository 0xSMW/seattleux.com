"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

export type CommandPaletteItem = {
  href: string;
  title: string;
  description?: string;
  keywords?: string[];
  group: string;
};

const OPEN_EVENT = "seattleux:open-command-palette";

export function openCommandPalette() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function CommandPaletteClient(props: { items: CommandPaletteItem[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const isK = e.key.toLowerCase() === "k";
      if (!isK) return;
      if (!(e.metaKey || e.ctrlKey)) return;
      e.preventDefault();
      setOpen(true);
    }

    function onOpenEvent() {
      setOpen(true);
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(OPEN_EVENT, onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(OPEN_EVENT, onOpenEvent);
    };
  }, []);

  const groups = useMemo(() => {
    const map = new Map<string, CommandPaletteItem[]>();
    for (const item of props.items) {
      const list = map.get(item.group) ?? [];
      list.push(item);
      map.set(item.group, list);
    }
    return Array.from(map.entries());
  }, [props.items]);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search Seattle UX…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {groups.map(([group, items], idx) => (
          <div key={group}>
            <CommandGroup heading={group}>
              {items.map((item) => (
                <CommandItem
                  key={item.href}
                  value={[
                    item.title,
                    item.description ?? "",
                    item.keywords?.join(" ") ?? "",
                  ].join(" ")}
                  onSelect={() => {
                    setOpen(false);
                    router.push(item.href);
                  }}
                >
                  <div className="min-w-0">
                    <div className="truncate font-medium">{item.title}</div>
                    {item.description ? (
                      <div className="truncate text-xs text-muted-foreground">
                        {item.description}
                      </div>
                    ) : null}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
            {idx < groups.length - 1 ? <CommandSeparator /> : null}
          </div>
        ))}
      </CommandList>
      <div className="flex items-center justify-between border-t border-border/40 px-4 py-3 text-xs text-muted-foreground">
        <div>
          Tip: Press <span className="rounded bg-muted px-1">⌘ K</span> /{" "}
          <span className="rounded bg-muted px-1">Ctrl K</span>
        </div>
        <a href="/search" className="underline underline-offset-4 hover:text-foreground">
          Go to full search
        </a>
      </div>
    </CommandDialog>
  );
}

