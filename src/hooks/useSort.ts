import { useState, useCallback } from 'react';
import type { SortConfig, SortField } from '@/types';

const DEFAULT_SORT: SortConfig = {
  field: 'date',
  direction: 'desc',
};

export function useSort() {
  const [sort, setSort] = useState<SortConfig>(DEFAULT_SORT);

  const handleSort = useCallback((field: SortField) => {
    setSort(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'desc' ? 'asc' : 'desc',
    }));
  }, []);

  return { sort, handleSort };
}