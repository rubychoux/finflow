import type { SortConfig, Transaction } from '@/types';

export function compareTransactions(
  a: Transaction,
  b: Transaction,
  sort: SortConfig
): number {
  const { field, direction } = sort;
  const multiplier = direction === 'asc' ? 1 : -1;

  if (field === 'amount') {
    return (a.amount - b.amount) * multiplier;
  }

  if (field === 'date') {
    return (new Date(a.date).getTime() - new Date(b.date).getTime()) * multiplier;
  }

  return a[field].localeCompare(b[field]) * multiplier;
}