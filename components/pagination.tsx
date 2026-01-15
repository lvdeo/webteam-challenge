interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, hasNext, hasPrev, onPageChange }: PaginationProps) {
  const getPageNumbers = () => {
    const pageNumbers = [];
    
    pageNumbers.push(1);
    
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);
    
    if (startPage > 2) {
      pageNumbers.push(-1); // Ellipsis
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    if (endPage < totalPages - 1) {
      pageNumbers.push(-2); // Ellipsis
    }
    
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 mb-8">
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={!hasPrev}
          className="btn-small disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>
        
        {getPageNumbers().map((pageNum, index) => {
          if (pageNum < 0) {
            return (
              <span key={`ellipsis-${index}`} className="px-2 text-zinc-400">
                ...
              </span>
            );
          }
          
          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              disabled={pageNum === currentPage}
              className={pageNum === currentPage ? 'btn-pagination-active' : 'btn-pagination-inactive'}
            >
              {pageNum}
            </button>
          );
        })}
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNext}
          className="btn-small disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <span className="text-sm text-zinc-600 dark:text-zinc-400">
        Page {currentPage} of {totalPages}
      </span>
    </div>
  );
}
