import path from "node:path";

export const CONTENT_ROOT = path.join(process.cwd(), "content");

export const contentPaths = {
  firms: path.join(CONTENT_ROOT, "firms"),
  companies: path.join(CONTENT_ROOT, "companies"),
  guides: path.join(CONTENT_ROOT, "guides"),
  playbooks: path.join(CONTENT_ROOT, "playbooks"),
  events: path.join(CONTENT_ROOT, "events"),
  groups: path.join(CONTENT_ROOT, "groups"),
} as const;
