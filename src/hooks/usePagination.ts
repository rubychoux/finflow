import { useCallback, useEffect } from 'react';

export function usePagination(
  totalPages: number,
  pageSize: number = 20,
  page: number,
  setPage: (page: number) => void,
) {
  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(1);
    }
  }, [totalPages, page, setPage]);

  const goToPage = useCallback((p: number) => {
    setPage(Math.min(Math.max(1, p), totalPages));
  }, [totalPages, setPage]);

  const nextPage = useCallback(() => goToPage(page + 1), [goToPage, page]);
  const prevPage = useCallback(() => goToPage(page - 1), [goToPage, page]);

  return { pageSize, goToPage, nextPage, prevPage };
}