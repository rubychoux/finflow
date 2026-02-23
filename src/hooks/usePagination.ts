import { useState, useCallback, useEffect } from 'react';

export function usePagination(totalPages: number, pageSize: number = 20) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(1);
    }
  }, [totalPages, page]);

  const goToPage = useCallback((p: number) => {
    setPage(Math.min(Math.max(1, p), totalPages));
  }, [totalPages]);

  const nextPage = useCallback(() => goToPage(page + 1), [goToPage, page]);
  const prevPage = useCallback(() => goToPage(page - 1), [goToPage, page]);

  return { page, pageSize, goToPage, nextPage, prevPage };
}