export function formatCurrency(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(cents / 100);
}

export function parseCurrency(value: string): number {
  const numeric = parseFloat(value.replace(/[^0-9.]/g, ''));
  if (isNaN(numeric)) return 0;
  return Math.round(numeric * 100);
}