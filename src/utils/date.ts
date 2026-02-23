export function formatDate(isoDate: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(isoDate));
}

export function isWithinDateRange(date: string, from: string, to: string): boolean {
  if (!from && !to) return true;
  const d = new Date(date).getTime();
  const start = from ? new Date(from).getTime() : -Infinity;
  const end = to ? new Date(to).getTime() : Infinity;
  return d >= start && d <= end;
}