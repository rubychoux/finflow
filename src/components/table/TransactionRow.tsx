import type { Transaction } from '@/types';
import { StatusBadge, CategoryBadge } from '@/components/common/Badge';
import { formatCurrency } from '@/utils/currency';
import { formatDate } from '@/utils/date';
import { memo } from 'react';

interface TransactionRowProps {
  transaction: Transaction;
  onClick: (transaction: Transaction) => void;
}

export const TransactionRow = memo(function TransactionRow({
  transaction,
  onClick,
}: TransactionRowProps) {
  return (
    <tr
      className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-100 cursor-pointer"
      onClick={() => onClick(transaction)}
    >
      <td className="px-6 py-4">
        <div>
          <p className="text-sm font-medium text-gray-900">{transaction.merchant}</p>
          {transaction.memo && (
            <p className="text-xs text-gray-400 mt-0.5">{transaction.memo}</p>
          )}
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
        {formatDate(transaction.date)}
      </td>
      <td className="px-6 py-4">
        <CategoryBadge category={transaction.category} />
      </td>
      <td className="px-6 py-4">
        <p className="text-sm text-gray-900">{transaction.cardHolder}</p>
        <p className="text-xs text-gray-400">···· {transaction.last4}</p>
      </td>
      <td className="px-6 py-4">
        <StatusBadge status={transaction.status} />
      </td>
      <td className="px-6 py-4 text-sm font-medium text-gray-900 text-right tabular-nums">
        {formatCurrency(transaction.amount)}
      </td>
    </tr>
  );
});