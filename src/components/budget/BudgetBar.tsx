import { formatCurrency } from '@/utils/currency';
import type { Budget } from '@/types';

export function BudgetBar({ budget }: { budget: Budget }) {
  const pct = Math.min((budget.spentCents / budget.limitCents) * 100, 100);
  const isOver = budget.spentCents > budget.limitCents;
  const isWarning = pct >= 80;

  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-gray-700 capitalize">{budget.category}</span>
        <span className={`text-xs font-medium ${isOver ? 'text-red-600' : 'text-gray-500'}`}>
          {formatCurrency(budget.spentCents)} / {formatCurrency(budget.limitCents)}
        </span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isOver ? 'bg-red-500' : isWarning ? 'bg-amber-400' : 'bg-emerald-500'
          }`}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}