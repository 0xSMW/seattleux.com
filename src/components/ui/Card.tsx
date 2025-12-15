import type { ComponentProps } from "react";

function classNames(...values: Array<string | undefined | false>) {
  return values.filter(Boolean).join(" ");
}

export function Card(props: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={classNames(
        "rounded-2xl border border-border/40 bg-card shadow-sm",
        props.className,
      )}
    />
  );
}

