export type ContentKind =
  | "firms"
  | "companies"
  | "guides"
  | "playbooks"
  | "events"
  | "groups";

export type ContentEntry<TFrontmatter> = {
  kind: ContentKind;
  slug: string;
  frontmatter: TFrontmatter;
  body: string;
};
