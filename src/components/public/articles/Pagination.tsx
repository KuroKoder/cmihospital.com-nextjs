// components/Pagination.tsx
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      // Show ellipsis for large page counts
      if (
        totalPages > 7 &&
        ((i > 2 && i < currentPage - 1) ||
          (i > currentPage + 1 && i < totalPages - 1))
      ) {
        if (i === 3 || i === totalPages - 2) {
          pages.push(
            <span key={i} className="px-3 py-2">
              ...
            </span>
          );
        }
        continue;
      }

      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-3 py-2 rounded-md ${
            currentPage === i
              ? "bg-green-600 text-white"
              : "text-gray-700 hover:bg-gray-200"
          }`}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="mt-10 flex justify-center">
      <nav className="flex items-center space-x-2" aria-label="Pagination">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded-md ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-200"
          }`}
        >
          Sebelumnya
        </button>

        {renderPageNumbers()}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded-md ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-200"
          }`}
        >
          Selanjutnya
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
