"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function classNames(...values: Array<string | undefined | false>) {
  return values.filter(Boolean).join(" ");
}

const links = [
  { href: "/agencies", label: "Agencies" },
  { href: "/teams", label: "Teams" },
  { href: "/learn/guides", label: "Guides" },
  { href: "/learn/playbooks", label: "Playbooks" },
  { href: "/community/events", label: "Events" },
  { href: "/community/groups", label: "Groups" },
  { href: "/search", label: "Search" },
  { href: "/contribute", label: "Contribute" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-9 items-center justify-center rounded-lg border border-border/40 bg-background px-3 text-xs font-medium text-foreground shadow-sm hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring"
      >
        {open ? "Close" : "Menu"}
      </button>

      <div
        className={classNames(
          "fixed inset-0 z-[55] bg-background/80 backdrop-blur",
          open ? "block" : "hidden",
        )}
      >
        <div className="mx-auto mt-16 max-w-5xl px-6">
          <div
            id="mobile-nav"
            className="rounded-2xl border border-border/40 bg-card p-4 shadow-sm"
          >
            <div className="grid gap-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm font-medium text-foreground hover:bg-accent"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

