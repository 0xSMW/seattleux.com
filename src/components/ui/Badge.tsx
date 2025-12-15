function classNames(...values: Array<string | undefined | false>) {
  return values.filter(Boolean).join(" ");
}

export function Badge(props: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={classNames(
        "rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground",
        props.className,
      )}
    >
      {props.children}
    </span>
  );
}

