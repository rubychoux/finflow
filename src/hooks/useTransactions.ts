import { useState, useEffect, useMemo } from 'react';
import type { Transaction, FilterConfig, SortConfig, AsyncState } from '@/types';
import { fetchTransactions } from '@/mock/handlers';
import { MOCK_TRANSACTIONS } from '@/mock/data';

interface UseTransactionsOptions {
  filters: FilterConfig;
  sort: SortConfig;
  page: number;
  pageSize: number;
}

interface UseTransactionsResult {
  state: AsyncState<{
    transactions: Transaction[];
    totalCount: number;
    totalPages: number;
  }>;
  summaryStats: {
    totalSpent: number;
    pendingCount: number;
    averageAmount: number;
    topMerchant: string;
  };
}

export function useTransactions({
  filters,
  sort,
  page,
  pageSize,
}: UseTransactionsOptions): UseTransactionsResult {
  const [state, setState] = useState<AsyncState<{
    transactions: Transaction[];
    totalCount: number;
    totalPages: number;
  }>>({ status: 'idle' });

  useEffect(() => {
    let cancelled = false;

    setState({ status: 'loading' });

    fetchTransactions({ filters, sort, page, pageSize })
      .then(data => {
        if (!cancelled) {
          setState({ status: 'success', data });
        }
      })
      .catch(err => {
        if (!cancelled) {
          setState({
            status: 'error',
            error: err instanceof Error ? err.message : 'An unknown error occurred',
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [filters, sort, page, pageSize]);

  const summaryStats = useMemo(() => {
    const cleared = MOCK_TRANSACTIONS.filter((t: Transaction) => t.status === 'cleared');
    const totalSpent = cleared.reduce((sum: number, t: Transaction) => sum + t.amount, 0);
    const pendingCount = MOCK_TRANSACTIONS.filter((t: Transaction) => t.status === 'pending').length;
    const averageAmount = cleared.length > 0 ? totalSpent / cleared.length : 0;

    const merchantTotals = MOCK_TRANSACTIONS.reduce((acc: Record<string, number>, t: Transaction) => {
      acc[t.merchant] = (acc[t.merchant] || 0) + t.amount;
      return acc;
    }, {});

    const topMerchant = Object.entries(merchantTotals)
      .sort(([, a], [, b]) => b - a)[0]?.[0] ?? 'N/A';

    return { totalSpent, pendingCount, averageAmount, topMerchant };
  }, []);

  return { state, summaryStats };
}