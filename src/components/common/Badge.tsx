import type { TransactionStatus, TransactionCategory } from '@/types';

const STATUS_STYLES: Record<TransactionStatus, string> = {
  cleared: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20',
  pending: 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/20',
  declined: 'bg-red-50 text-red-700 ring-1 ring-red-600/20',
};

const CATEGORY_STYLES: Record<TransactionCategory, string> = {
  software: 'bg-violet-50 text-violet-700 ring-1 ring-violet-600/20',
  travel: 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20',
  meals: 'bg-orange-50 text-orange-700 ring-1 ring-orange-600/20',
  office: 'bg-slate-50 text-slate-700 ring-1 ring-slate-600/20',
  marketing: 'bg-pink-50 text-pink-700 ring-1 ring-pink-600/20',
  hardware: 'bg-cyan-50 text-cyan-700 ring-1 ring-cyan-600/20',
  utilities: 'bg-lime-50 text-lime-700 ring-1 ring-lime-600/20',
  other: 'bg-gray-50 text-gray-700 ring-1 ring-gray-600/20',
};

export function StatusBadge({ status }: { status: TransactionStatus }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export function CategoryBadge({ category }: { category: TransactionCategory }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${CATEGORY_STYLES[category]}`}>
      {category.charAt(0).toUpperCase() + category.slice(1)}
    </span>
  );
}