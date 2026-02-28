import { useState, useCallback, useEffect } from 'react';
import type { FilterConfig, TransactionCategory, TransactionStatus } from '@/types';

const DEFAULT_FILTERS: FilterConfig = {
  search: '',
  categories: [],
  statuses: [],
  dateFrom: '',
  dateTo: '',
};

const STORAGE_KEY = 'finflow_filters';

function loadFilters(): FilterConfig {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? { ...DEFAULT_FILTERS, ...JSON.parse(stored) } : DEFAULT_FILTERS;
  } catch {
    return DEFAULT_FILTERS;
  }
}

export function useFilters() {
  const [filters, setFilters] = useState<FilterConfig>(loadFilters);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
    } catch { /* quota exceeded or unavailable */ }
  }, [filters]);

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

  const setStatuses = useCallback((statuses: TransactionStatus[]) => {
    setFilters(prev => ({ ...prev, statuses }));
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
    setStatuses,
    setDateFrom,
    setDateTo,
    resetFilters,
    hasActiveFilters,
  };
}