function stripMarkdown(input: string): string {
  return (
    input
      // links [text](url) -> text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      // inline code
      .replace(/`([^`]+)`/g, "$1")
      // emphasis markers
      .replace(/[*_~]/g, "")
      // collapse whitespace
      .replace(/\s+/g, " ")
      .trim()
  );
}

export function extractSummaryFromMdxBody(body: string, maxLength = 160): string {
  const lines = body.split("\n");
  const paragraphLines: string[] = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      if (paragraphLines.length > 0) break;
      continue;
    }

    const isHeading = /^#{1,6}\s+/.test(line);
    const isList = /^[-*+]\s+/.test(line);
    const isBlock = /^```/.test(line);
    if (isHeading || isList || isBlock) continue;

    paragraphLines.push(line);
    if (paragraphLines.join(" ").length >= maxLength) break;
  }

  const summary = stripMarkdown(paragraphLines.join(" "));
  if (summary.length <= maxLength) return summary;
  return `${summary.slice(0, maxLength - 1).trimEnd()}…`;
}

