import type { Transaction } from '@/types';
import { formatCurrency } from './currency';
import { formatDate } from './date';

export function exportTransactionsToCSV(transactions: Transaction[]): void {
  const headers = ['ID', 'Merchant', 'Date', 'Category', 'Card Holder', 'Last 4', 'Status', 'Amount', 'Memo'];

  const rows = transactions.map(t => [
    t.id,
    t.merchant,
    formatDate(t.date),
    t.category,
    t.cardHolder,
    t.last4,
    t.status,
    formatCurrency(t.amount),
    t.memo ?? '',
  ]);

  const csv = [headers, ...rows]
    .map(row => row.map(cell => `"${cell}"`).join(','))
    .join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `finflow-transactions-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}