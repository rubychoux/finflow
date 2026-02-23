import type { SortConfig, SortField } from '@/types';

interface Column {
  key: SortField | 'category' | 'status' | 'cardHolder';
  label: string;
  sortable?: boolean;
  align?: 'left' | 'right';
}

const COLUMNS: Column[] = [
  { key: 'merchant', label: 'Merchant', sortable: true, align: 'left' },
  { key: 'date', label: 'Date', sortable: true, align: 'left' },
  { key: 'category', label: 'Category', sortable: false, align: 'left' },
  { key: 'cardHolder', label: 'Card Holder', sortable: false, align: 'left' },
  { key: 'status', label: 'Status', sortable: false, align: 'left' },
  { key: 'amount', label: 'Amount', sortable: true, align: 'right' },
];

interface TableHeaderProps {
  sort: SortConfig;
  onSort: (field: SortField) => void;
}

export function TableHeader({ sort, onSort }: TableHeaderProps) {
  return (
    <thead className="bg-gray-50 border-b border-gray-200">
      <tr>
        {COLUMNS.map(col => (
          <th
            key={col.key}
            scope="col"
            onClick={col.sortable ? () => onSort(col.key as SortField) : undefined}
            aria-sort={
              sort.field === col.key
                ? sort.direction === 'asc' ? 'ascending' : 'descending'
                : undefined
            }
            className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide
              ${col.align === 'right' ? 'text-right' : 'text-left'}
              ${col.sortable ? 'cursor-pointer select-none hover:text-gray-700' : ''}
            `}
          >
            <span className={`flex items-center gap-1.5 ${col.align === 'right' ? 'justify-end' : ''}`}>
              {col.label}
              {col.sortable && (
                <span className={`text-xs ${sort.field === col.key ? 'text-indigo-600' : 'text-gray-300'}`}>
                  {sort.field === col.key && sort.direction === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </span>
          </th>
        ))}
      </tr>
    </thead>
  );
}