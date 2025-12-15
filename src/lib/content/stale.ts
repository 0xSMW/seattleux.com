export function isStale(dateString: string, days = 180): boolean {
  const parsed = Date.parse(dateString);
  if (Number.isNaN(parsed)) return false;
  const ageMs = Date.now() - parsed;
  return ageMs > days * 24 * 60 * 60 * 1000;
}

