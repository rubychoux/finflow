import type { Transaction } from '@/types';
import { formatCurrency } from '@/utils/currency';
import { formatDate } from '@/utils/date';
import { StatusBadge, CategoryBadge } from '@/components/common/Badge';
import { Modal } from '@/components/common/Modal';

interface TransactionDetailProps {
  transaction: Transaction | null;
  onClose: () => void;
}

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between items-start py-3 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-900 text-right">{children}</span>
    </div>
  );
}

export function TransactionDetail({ transaction, onClose }: TransactionDetailProps) {
  return (
    <Modal isOpen={!!transaction} onClose={onClose}>
      {transaction && (
        <>
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-gray-900">{transaction.merchant}</h2>
            <p className="text-2xl font-bold text-gray-900 mt-1 tabular-nums">
              {formatCurrency(transaction.amount)}
            </p>
          </div>

          <div>
            <DetailRow label="Transaction ID">{transaction.id}</DetailRow>
            <DetailRow label="Date">{formatDate(transaction.date)}</DetailRow>
            <DetailRow label="Status"><StatusBadge status={transaction.status} /></DetailRow>
            <DetailRow label="Category"><CategoryBadge category={transaction.category} /></DetailRow>
            <DetailRow label="Card Holder">{transaction.cardHolder}</DetailRow>
            <DetailRow label="Card">{`···· ${transaction.last4}`}</DetailRow>
            {transaction.memo && (
              <DetailRow label="Memo">{transaction.memo}</DetailRow>
            )}
          </div>
        </>
      )}
    </Modal>
  );
}