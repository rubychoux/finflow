import type { TransactionStatus } from '@/types';

const STATUSES: TransactionStatus[] = ['cleared', 'pending', 'declined'];

interface StatusFilterProps {
  selected: TransactionStatus[];
  onToggle: (status: TransactionStatus) => void;
}

export function StatusFilter({ selected, onToggle }: StatusFilterProps) {
  return (
    <div className="flex gap-2">
      {STATUSES.map(status => {
        const isActive = selected.includes(status);
        return (
          <button
            key={status}
            onClick={() => onToggle(status)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all capitalize ${
              isActive
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {status}
          </button>
        );
      })}
    </div>
  );
}