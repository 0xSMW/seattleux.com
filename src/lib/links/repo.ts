const repoUrl = process.env.NEXT_PUBLIC_REPO_URL;

export function getEditUrlForContentPath(pathFromRepoRoot: string): string | undefined {
  if (!repoUrl) return undefined;
  const base = repoUrl.replace(/\/$/, "");
  return `${base}/edit/main/${pathFromRepoRoot}`;
}

export function getNewIssueUrl(params: {
  title: string;
  body?: string;
}): string | undefined {
  if (!repoUrl) return undefined;
  const base = repoUrl.replace(/\/$/, "");
  const search = new URLSearchParams();
  search.set("title", params.title);
  if (params.body) search.set("body", params.body);
  return `${base}/issues/new?${search.toString()}`;
}

