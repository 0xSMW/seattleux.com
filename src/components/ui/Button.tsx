import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "ghost";

function classNames(...values: Array<string | undefined | false>) {
  return values.filter(Boolean).join(" ");
}

const base =
  "inline-flex h-11 items-center justify-center rounded-xl px-5 text-sm font-medium shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary:
    "border border-border/40 bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "border border-border/40 bg-background text-foreground hover:bg-accent",
};

export function ButtonLink(
  props: {
    href: string;
    variant?: Variant;
  } & Omit<ComponentProps<typeof Link>, "href">,
) {
  const { variant = "primary", className, ...rest } = props;
  return (
    <Link
      {...rest}
      href={props.href}
      className={classNames(base, variants[variant], className)}
    />
  );
}

