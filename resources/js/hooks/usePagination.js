import { useState, useMemo, useEffect } from "react";

export default function usePagination(data = [], itemsPerPage = 10, deps = []) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage) || 1;

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return data.slice(start, end);
  }, [data, currentPage, itemsPerPage]);

  // Reset cuando cambian filtros externos
  useEffect(() => {
    setCurrentPage(1);
  }, deps);

  // Ajuste si la página queda fuera de rango
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages]);

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData,
  };
}
