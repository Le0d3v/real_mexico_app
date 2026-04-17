export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  idPrefix = "pagination",
}) {
  if (totalPages <= 1) return null;

  return (
    <div
      className="flex flex-col md:flex-row justify-between items-center gap-4 px-4 md:px-6 py-4 border-t bg-gray-50 text-center md:text-left"
      id={`${idPrefix}-container`}
    >
      <p className="text-xs md:text-sm text-gray-600" id={`${idPrefix}-info`}>
        Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong>
      </p>

      <div className="flex items-center gap-2 flex-wrap justify-center">
        {/* Anterior */}
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={`px-3 py-2 rounded-lg text-xs md:text-sm bg-white border hover:bg-gray-200 disabled:opacity-40 cursor-pointer transition disabled:cursor-not-allowed`}
          id={`${idPrefix}-prev`}
        >
          ←
        </button>

        {/* Números */}
        <div
          className="flex flex-wrap justify-center gap-1"
          id={`${idPrefix}-pages`}
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (page) =>
                page === 1 ||
                page === totalPages ||
                Math.abs(page - currentPage) <= 1,
            )
            .map((page, index, array) => {
              if (index > 0 && page - array[index - 1] > 1) {
                return <span key={page}>...</span>;
              }

              return (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`px-3 py-2 rounded-lg text-xs md:text-sm cursor-pointer ${
                    currentPage === page
                      ? "bg-yellow-400 text-black"
                      : "bg-white border hover:bg-gray-100"
                  }`}
                  id="driver_paginacion-numero"
                >
                  {page}
                </button>
              );
            })}
        </div>

        {/* Siguiente */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-2 rounded-lg text-xs md:text-sm bg-white border hover:bg-gray-100 disabled:opacity-40 cursor-pointer"
          id={`${idPrefix}-next`}
        >
          →
        </button>
      </div>
    </div>
  );
}
