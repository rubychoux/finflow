import type { TransactionCategory } from '@/types';

const CATEGORIES: TransactionCategory[] = [
  'software', 'travel', 'meals', 'office', 'marketing', 'hardware', 'utilities', 'other',
];

interface CategoryFilterProps {
  selected: TransactionCategory[];
  onToggle: (category: TransactionCategory) => void;
}

export function CategoryFilter({ selected, onToggle }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map(cat => {
        const isActive = selected.includes(cat);
        return (
          <button
            key={cat}
            onClick={() => onToggle(cat)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              isActive
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        );
      })}
    </div>
  );
}