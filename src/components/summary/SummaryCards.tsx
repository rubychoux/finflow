import { SummaryCard } from './SummaryCard';
import { SummaryCardSkeleton } from '@/components/common/LoadingSkeleton';
import { formatCurrency } from '@/utils/currency';

interface SummaryCardsProps {
  loading: boolean;
  totalSpent: number;
  pendingCount: number;
  averageAmount: number;
  topMerchant: string;
}

export function SummaryCards({
  loading,
  totalSpent,
  pendingCount,
  averageAmount,
  topMerchant,
}: SummaryCardsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => <SummaryCardSkeleton key={i} />)}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <SummaryCard label="Total Cleared Spend" value={formatCurrency(totalSpent)} subtext="Last 90 days" />
      <SummaryCard label="Pending Transactions" value={String(pendingCount)} subtext="Awaiting settlement" />
      <SummaryCard label="Avg Transaction" value={formatCurrency(averageAmount)} subtext="Per cleared transaction" />
      <SummaryCard label="Top Merchant" value={topMerchant} subtext="By total spend" />
    </div>
  );
}