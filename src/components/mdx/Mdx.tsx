import { compileMDX } from "next-mdx-remote/rsc";
import { slugify } from "@/lib/text/slugify";

function classNames(...values: Array<string | undefined | false>) {
  return values.filter(Boolean).join(" ");
}

function getText(node: unknown): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getText).join("");
  if (node && typeof node === "object" && "props" in node) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return getText((node as any).props?.children);
  }
  return "";
}

function H2(props: React.ComponentProps<"h2">) {
  const text = getText(props.children);
  const id = slugify(text);
  return (
    <h2 id={id} className={classNames("scroll-mt-24", props.className)}>
      <a href={`#${id}`} className="no-underline hover:underline">
        {props.children}
      </a>
    </h2>
  );
}

function H3(props: React.ComponentProps<"h3">) {
  const text = getText(props.children);
  const id = slugify(text);
  return (
    <h3 id={id} className={classNames("scroll-mt-24", props.className)}>
      <a href={`#${id}`} className="no-underline hover:underline">
        {props.children}
      </a>
    </h3>
  );
}

function Callout(props: {
  variant?: "info" | "tip" | "warn";
  title?: string;
  children: React.ReactNode;
}) {
  const variant = props.variant ?? "info";
  const styles: Record<typeof variant, string> = {
    info: "border-border/50 bg-muted/50",
    tip: "border-primary/30 bg-primary/10",
    warn: "border-destructive/30 bg-destructive/10",
  };
  return (
    <div className={classNames("my-5 rounded-2xl border p-4", styles[variant])}>
      {props.title ? (
        <div className="mb-2 text-sm font-semibold text-foreground">
          {props.title}
        </div>
      ) : null}
      <div className="text-sm text-muted-foreground">{props.children}</div>
    </div>
  );
}

function Checklist(props: { items: string[]; title?: string }) {
  return (
    <div className="my-5 rounded-2xl border border-border/40 bg-card p-4">
      {props.title ? (
        <div className="mb-2 text-sm font-semibold text-foreground">
          {props.title}
        </div>
      ) : null}
      <ul className="space-y-2 text-sm text-muted-foreground">
        {props.items.map((item) => (
          <li key={item} className="flex gap-2">
            <span aria-hidden="true" className="text-primary">
              ✓
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DefinitionList(props: {
  items: Array<{ term: string; definition: string }>;
  title?: string;
}) {
  return (
    <div className="my-5 rounded-2xl border border-border/40 bg-card p-4">
      {props.title ? (
        <div className="mb-2 text-sm font-semibold text-foreground">
          {props.title}
        </div>
      ) : null}
      <dl className="space-y-3 text-sm">
        {props.items.map((item) => (
          <div key={item.term}>
            <dt className="font-semibold text-foreground">{item.term}</dt>
            <dd className="text-muted-foreground">{item.definition}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function TwoColumn(props: {
  leftTitle: string;
  rightTitle: string;
  left: string[];
  right: string[];
}) {
  return (
    <div className="my-5 grid gap-4 sm:grid-cols-2">
      <div className="rounded-2xl border border-border/40 bg-card p-4">
        <div className="mb-2 text-sm font-semibold text-foreground">
          {props.leftTitle}
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {props.left.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-border/40 bg-card p-4">
        <div className="mb-2 text-sm font-semibold text-foreground">
          {props.rightTitle}
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {props.right.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Figure(props: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="my-5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={props.src}
        alt={props.alt}
        className="w-full rounded-2xl border border-border/40 bg-card"
      />
      {props.caption ? (
        <figcaption className="mt-2 text-sm text-muted-foreground">
          {props.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function ResourceList(props: { title?: string; items: Array<{ label: string; url: string }> }) {
  return (
    <div className="my-5 rounded-2xl border border-border/40 bg-card p-4">
      {props.title ? (
        <div className="mb-2 text-sm font-semibold text-foreground">
          {props.title}
        </div>
      ) : null}
      <ul className="space-y-2 text-sm text-muted-foreground">
        {props.items.map((item) => (
          <li key={item.url}>
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 hover:text-foreground"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

const components = {
  h2: H2,
  h3: H3,
  Callout,
  Checklist,
  DefinitionList,
  TwoColumn,
  Figure,
  ResourceList,
};

export async function Mdx(props: { source: string }) {
  const { content } = await compileMDX({
    source: props.source,
    components,
    options: {
      mdxOptions: {
        format: "mdx",
      },
    },
  });

  return content;
}
