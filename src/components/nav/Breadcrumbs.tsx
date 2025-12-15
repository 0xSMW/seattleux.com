import Link from "next/link";

export type Breadcrumb = { href: string; label: string };

export function Breadcrumbs(props: { items: Breadcrumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-2">
        {props.items.map((item, idx) => (
          <li key={item.href} className="flex items-center gap-2">
            <Link href={item.href} className="hover:text-foreground">
              {item.label}
            </Link>
            {idx < props.items.length - 1 ? (
              <span aria-hidden="true" className="text-muted-foreground/70">
                /
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}

