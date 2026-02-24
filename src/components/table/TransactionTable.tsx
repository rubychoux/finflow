import type { Transaction, SortConfig, SortField } from '@/types';
import { TableHeader } from './TableHeader';
import { TransactionRow } from './TransactionRow';
import { Pagination } from './Pagination';
import { TableRowSkeleton } from '@/components/common/LoadingSkeleton';
import { EmptyState } from '@/components/common/EmptyState';
import { Card } from '@/components/common/Card';

interface TransactionTableProps {
  transactions: Transaction[];
  loading: boolean;
  sort: SortConfig;
  onSort: (field: SortField) => void;
  page: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  onGoToPage: (page: number) => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
  onRowClick: (transaction: Transaction) => void;
}

export function TransactionTable({
  transactions, loading, sort, onSort,
  page, totalPages, totalCount, pageSize,
  onPrevPage, onNextPage, onGoToPage,
  onResetFilters, hasActiveFilters, onRowClick,
}: TransactionTableProps) {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <TableHeader sort={sort} onSort={onSort} />
          <tbody>
            {loading ? (
              Array.from({ length: pageSize }).map((_, i) => <TableRowSkeleton key={i} />)
            ) : transactions.length === 0 ? (
              <EmptyState
                message={hasActiveFilters ? 'No transactions match your filters.' : 'No transactions found.'}
                onReset={hasActiveFilters ? onResetFilters : undefined}
              />
            ) : (
              transactions.map(t => (
                <TransactionRow key={t.id} transaction={t} onClick={onRowClick} />
              ))
            )}
          </tbody>
        </table>
      </div>
      {!loading && totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          totalCount={totalCount}
          pageSize={pageSize}
          onPrev={onPrevPage}
          onNext={onNextPage}
          onGoTo={onGoToPage}
        />
      )}
    </Card>
  );
}