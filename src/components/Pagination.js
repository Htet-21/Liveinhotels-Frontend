import React from 'react';
import './Pagination.css';

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 0) return null;

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="pagination">
      <button onClick={handlePrevious} disabled={currentPage === 1}>
        &lt;
      </button>
      {totalPages > 1 && currentPage !== totalPages - 1 && (
              <button
                onClick={() => handleNext(currentPage - 1)}
                disabled={currentPage === 1}
              >
                {currentPage - 1}
              </button>
            )}

            {totalPages > 2 && currentPage !== totalPages - 1 && (
              <button
                onClick={() => handleNext(currentPage)}
                disabled={currentPage === 2}
              >
                {currentPage}
              </button>
            )}

            {totalPages > 2 && currentPage !== totalPages - 1 && (
              <button
                onClick={() => handleNext(totalPages)}
                disabled={currentPage === totalPages - 1}
              >
                ...
              </button>
            )}

            {totalPages > 2 && (
              <button
                onClick={() => handleNext(totalPages - 1)}
                disabled={currentPage === totalPages - 1}
              >
                {totalPages - 1}
              </button>
            )}

            {totalPages > 1 && (
              <button
                onClick={() => handleNext(totalPages)}
                disabled={currentPage === totalPages}
              >
                {totalPages}
              </button>
            )}
      <button onClick={handleNext} disabled={currentPage === totalPages}>
        &gt;
      </button>
    </div>
  );
}

export default Pagination;