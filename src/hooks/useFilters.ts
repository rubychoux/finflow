import { useState, useCallback } from 'react';
import type { FilterConfig, TransactionCategory, TransactionStatus } from '@/types';

const DEFAULT_FILTERS: FilterConfig = {
  search: '',
  categories: [],
  statuses: [],
  dateFrom: '',
  dateTo: '',
};

export function useFilters() {
  const [filters, setFilters] = useState<FilterConfig>(DEFAULT_FILTERS);

  const setSearch = useCallback((search: string) => {
    setFilters(prev => ({ ...prev, search }));
  }, []);

  const toggleCategory = useCallback((category: TransactionCategory) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category],
    }));
  }, []);

  const toggleStatus = useCallback((status: TransactionStatus) => {
    setFilters(prev => ({
      ...prev,
      statuses: prev.statuses.includes(status)
        ? prev.statuses.filter(s => s !== status)
        : [...prev.statuses, status],
    }));
  }, []);

  const setDateFrom = useCallback((dateFrom: string) => {
    setFilters(prev => ({ ...prev, dateFrom }));
  }, []);

  const setDateTo = useCallback((dateTo: string) => {
    setFilters(prev => ({ ...prev, dateTo }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  const hasActiveFilters =
    filters.search !== '' ||
    filters.categories.length > 0 ||
    filters.statuses.length > 0 ||
    filters.dateFrom !== '' ||
    filters.dateTo !== '';

  return {
    filters,
    setSearch,
    toggleCategory,
    toggleStatus,
    setDateFrom,
    setDateTo,
    resetFilters,
    hasActiveFilters,
  };
}