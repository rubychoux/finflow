import { useState, useCallback, useEffect } from 'react';
import type { SortConfig, SortField } from '@/types';

const DEFAULT_SORT: SortConfig = {
  field: 'date',
  direction: 'desc',
};

const STORAGE_KEY = 'finflow_sort';

function loadSort(): SortConfig {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? { ...DEFAULT_SORT, ...JSON.parse(stored) } : DEFAULT_SORT;
  } catch {
    return DEFAULT_SORT;
  }
}

export function useSort() {
  const [sort, setSort] = useState<SortConfig>(loadSort);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sort));
    } catch { /* quota exceeded or unavailable */ }
  }, [sort]);

  const handleSort = useCallback((field: SortField) => {
    setSort(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'desc' ? 'asc' : 'desc',
    }));
  }, []);

  const setSortDirect = useCallback((field: SortField, direction: 'asc' | 'desc') => {
    setSort({ field, direction });
  }, []);

  return { sort, handleSort, setSortDirect };
}