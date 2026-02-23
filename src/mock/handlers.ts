import type { Transaction, FilterConfig, SortConfig } from '@/types';
import { MOCK_TRANSACTIONS } from './data';
import { compareTransactions } from '@/utils/sorting';
import { isWithinDateRange } from '@/utils/date';

const SIMULATED_DELAY_MS = 600;

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export interface FetchTransactionsParams {
  filters: FilterConfig;
  sort: SortConfig;
  page: number;
  pageSize: number;
}

export interface FetchTransactionsResult {
  transactions: Transaction[];
  totalCount: number;
  totalPages: number;
}

export async function fetchTransactions(
  params: FetchTransactionsParams
): Promise<FetchTransactionsResult> {
  await delay(SIMULATED_DELAY_MS);

  if (Math.random() < 0.02) {
    throw new Error('Network error: Failed to fetch transactions');
  }

  const { filters, sort, page, pageSize } = params;

  const filtered = MOCK_TRANSACTIONS.filter(t => {
    const matchesSearch =
      !filters.search ||
      t.merchant.toLowerCase().includes(filters.search.toLowerCase()) ||
      t.cardHolder.toLowerCase().includes(filters.search.toLowerCase());

    const matchesCategory =
      filters.categories.length === 0 || filters.categories.includes(t.category);

    const matchesStatus =
      filters.statuses.length === 0 || filters.statuses.includes(t.status);

    const matchesDate = isWithinDateRange(t.date, filters.dateFrom, filters.dateTo);

    return matchesSearch && matchesCategory && matchesStatus && matchesDate;
  });

  const sorted = [...filtered].sort((a, b) => compareTransactions(a, b, sort));

  const totalCount = sorted.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  const start = (page - 1) * pageSize;
  const transactions = sorted.slice(start, start + pageSize);

  return { transactions, totalCount, totalPages };
}