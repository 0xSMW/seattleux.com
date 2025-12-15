import fs from "node:fs/promises";
import path from "node:path";

export async function listMdxSlugs(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name.replace(/\.mdx$/, ""))
    .sort((a, b) => a.localeCompare(b));
}

export async function readMdxFile(dir: string, slug: string): Promise<string> {
  const filePath = path.join(dir, `${slug}.mdx`);
  return fs.readFile(filePath, "utf8");
}

