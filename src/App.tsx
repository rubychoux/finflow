import { useState, useEffect } from 'react';
import { useFilters } from '@/hooks/useFilters';
import { useSort } from '@/hooks/useSort';
import { usePagination } from '@/hooks/usePagination';
import { useTransactions } from '@/hooks/useTransactions';
import { SummaryCards } from '@/components/summary/SummaryCards';
import { TransactionTable } from '@/components/table/TransactionTable';
import { SearchInput } from '@/components/filters/SearchInput';
import { CategoryFilter } from '@/components/filters/CategoryFilter';
import { BudgetPanel } from '@/components/budget/BudgetPanel';
import { ErrorBanner } from '@/components/common/ErrorBanner';
import { MOCK_TRANSACTIONS } from '@/mock/data';
import { StatusFilter } from '@/components/filters/StatusFilter';
import { DateRangeFilter } from '@/components/filters/DateRangeFilter';
import { exportTransactionsToCSV } from '@/utils/csv';
import { TransactionDetail } from '@/components/table/TransactionDetail';
import type { Transaction } from '@/types';

const PAGE_SIZE = 15;

export default function App() {
  const { filters, setSearch, toggleCategory, toggleStatus, setDateFrom, setDateTo, resetFilters, hasActiveFilters } = useFilters();
  const { sort, handleSort } = useSort();
  const [page, setPage] = useState(1);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    setPage(1);
  }, [filters, sort]);

  const { state, summaryStats } = useTransactions({
    filters,
    sort,
    page,
    pageSize: PAGE_SIZE,
  });

  const totalPages = state.status === 'success' ? state.data.totalPages : 0;
  const { goToPage, nextPage, prevPage } = usePagination(totalPages, PAGE_SIZE, page, setPage);

  const isLoading = state.status === 'idle' || state.status === 'loading';

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">FF</span>
            </div>
            <span className="text-sm font-semibold text-gray-900">FinFlow</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Demo Mode</span>
            <div className="w-2 h-2 bg-emerald-400 rounded-full" />
          </div>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-6 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Transactions</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {MOCK_TRANSACTIONS.length} transactions in the last 90 days
            </p>
          </div>
          <button
            onClick={() => exportTransactionsToCSV(
              state.status === 'success' ? state.data.transactions : []
            )}
            disabled={state.status !== 'success'}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export CSV
          </button>
        </div>

        <SummaryCards loading={isLoading} {...summaryStats} />

        {state.status === 'error' && <ErrorBanner message={state.error} />}

        <div className="flex gap-6 items-start">
          <div className="flex-1 min-w-0 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <SearchInput value={filters.search} onChange={setSearch} />
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500 whitespace-nowrap"
                  >
                    Clear all
                  </button>
                )}
              </div>
              <CategoryFilter selected={filters.categories} onToggle={toggleCategory} />
              <StatusFilter selected={filters.statuses} onToggle={toggleStatus} />
              <DateRangeFilter
                dateFrom={filters.dateFrom}
                dateTo={filters.dateTo}
                onDateFromChange={setDateFrom}
                onDateToChange={setDateTo}
              />
            </div>

            <TransactionTable
              transactions={state.status === 'success' ? state.data.transactions : []}
              loading={isLoading}
              sort={sort}
              onSort={handleSort}
              page={page}
              totalPages={totalPages}
              totalCount={state.status === 'success' ? state.data.totalCount : 0}
              pageSize={PAGE_SIZE}
              onPrevPage={prevPage}
              onNextPage={nextPage}
              onGoToPage={goToPage}
              onResetFilters={resetFilters}
              hasActiveFilters={hasActiveFilters}
              onRowClick={setSelectedTransaction}
            />
          </div>

          <div className="w-72 shrink-0 hidden xl:block">
            <BudgetPanel transactions={MOCK_TRANSACTIONS} />
          </div>
        </div>
      </main>

      <TransactionDetail
        transaction={selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
      />
    </div>
  );
}