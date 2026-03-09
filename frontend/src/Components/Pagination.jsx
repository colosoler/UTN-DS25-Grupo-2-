import "./styles/Pagination.css";

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading,
}) => {
  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="pagination-container">
      <div className="pagination-info">
        Página {currentPage} de {totalPages}
      </div>

      <div className="pagination-controls">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1 || isLoading}
          className="pagination-btn pagination-prev"
        >
          Anterior
        </button>

        <div className="pagination-numbers">
          {pageNumbers.map((page, index) => (
            <button
              key={index}
              onClick={() => {
                if (typeof page === "number") onPageChange(page);
              }}
              disabled={page === "..." || isLoading}
              className={`pagination-number ${
                page === currentPage ? "active" : ""
              } ${page === "..." ? "dots" : ""}`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages || isLoading}
          className="pagination-btn pagination-next"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
