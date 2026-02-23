import { useMemo } from 'react';
import type { Transaction, TransactionCategory } from '@/types';
import { BudgetBar } from './BudgetBar';
import { Card } from '@/components/common/Card';

const BUDGET_LIMITS: Partial<Record<TransactionCategory, number>> = {
  software: 500000,
  travel: 1000000,
  meals: 200000,
  marketing: 750000,
  hardware: 400000,
};

export function BudgetPanel({ transactions }: { transactions: Transaction[] }) {
  const budgets = useMemo(() => {
    const spentByCategory = transactions
      .filter(t => t.status === 'cleared')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {} as Record<string, number>);

    return (Object.entries(BUDGET_LIMITS) as [TransactionCategory, number][]).map(
      ([category, limitCents]) => ({
        category,
        limitCents,
        spentCents: spentByCategory[category] || 0,
      })
    );
  }, [transactions]);

  return (
    <Card className="p-6">
      <h2 className="text-sm font-semibold text-gray-900 mb-5">Budget Tracker</h2>
      <div className="space-y-5">
        {budgets.map(budget => (
          <BudgetBar key={budget.category} budget={budget} />
        ))}
      </div>
    </Card>
  );
}