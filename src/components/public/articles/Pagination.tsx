// components/public/articles/Pagination.tsx
import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { PaginationMeta } from "@/types/article";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pagination?: PaginationMeta;
  isLoading?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  pagination,
  isLoading = false,
}) => {
  if (totalPages <= 1 && !isLoading) return null;

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(renderPageButton(i));
      }
    } else {
      // Show first page
      pages.push(renderPageButton(1));

      if (currentPage > 3) {
        pages.push(renderEllipsis('start'));
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(renderPageButton(i));
      }

      if (currentPage < totalPages - 2) {
        pages.push(renderEllipsis('end'));
      }

      // Show last page
      if (totalPages > 1) {
        pages.push(renderPageButton(totalPages));
      }
    }

    return pages;
  };

  const renderPageButton = (pageNumber: number) => {
    const isActive = currentPage === pageNumber;
    
    return (
      <button
        key={pageNumber}
        onClick={() => !isLoading && onPageChange(pageNumber)}
        disabled={isLoading}
        className={`
          relative inline-flex items-center px-4 py-2 text-sm font-medium transition-all duration-200
          ${
            isActive
              ? "z-10 bg-green-600 text-white focus:z-20 focus:outline-offset-0 shadow-lg"
              : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 bg-white"
          }
          ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:shadow-md"}
          first:rounded-l-md last:rounded-r-md
        `}
        aria-current={isActive ? "page" : undefined}
        aria-label={`Go to page ${pageNumber}`}
      >
        {pageNumber}
      </button>
    );
  };

  const renderEllipsis = (position: 'start' | 'end') => (
    <span
      key={`ellipsis-${position}`}
      className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 ring-1 ring-inset ring-gray-300 bg-white"
    >
      ...
    </span>
  );

  const canGoPrevious = currentPage > 1 && !isLoading;
  const canGoNext = currentPage < totalPages && !isLoading;

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-lg shadow-sm">
      {/* Mobile pagination */}
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!canGoPrevious}
          className={`
            relative inline-flex items-center rounded-md px-4 py-2 text-sm font-medium transition-colors
            ${
              canGoPrevious
                ? "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 bg-white"
                : "text-gray-400 cursor-not-allowed bg-gray-100"
            }
          `}
        >
          <ChevronLeftIcon className="h-4 w-4 mr-1" />
          Sebelumnya
        </button>
        
        <div className="flex items-center">
          <span className="text-sm text-gray-700">
            Halaman {currentPage} dari {totalPages}
          </span>
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!canGoNext}
          className={`
            relative ml-3 inline-flex items-center rounded-md px-4 py-2 text-sm font-medium transition-colors
            ${
              canGoNext
                ? "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 bg-white"
                : "text-gray-400 cursor-not-allowed bg-gray-100"
            }
          `}
        >
          Selanjutnya
          <ChevronRightIcon className="h-4 w-4 ml-1" />
        </button>
      </div>

      {/* Desktop pagination */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Menampilkan{" "}
            <span className="font-medium">
              {pagination ? (pagination.page - 1) * pagination.pageSize + 1 : (currentPage - 1) * 10 + 1}
            </span>{" "}
            sampai{" "}
            <span className="font-medium">
              {pagination 
                ? Math.min(pagination.page * pagination.pageSize, pagination.total)
                : Math.min(currentPage * 10, totalPages * 10)
              }
            </span>{" "}
            dari{" "}
            <span className="font-medium">
              {pagination?.total || totalPages * 10}
            </span>{" "}
            hasil
          </p>
        </div>

        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            {/* Previous button */}
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={!canGoPrevious}
              className={`
                relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 transition-colors
                ${
                  canGoPrevious
                    ? "hover:bg-gray-50 hover:text-gray-600 bg-white"
                    : "cursor-not-allowed bg-gray-100"
                }
              `}
              aria-label="Previous page"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* Page numbers */}
            {isLoading ? (
              // Loading skeleton for pagination
              <>
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className="relative inline-flex items-center px-4 py-2 text-sm font-medium bg-gray-200 ring-1 ring-inset ring-gray-300 animate-pulse"
                    style={{ width: '40px', height: '40px' }}
                  />
                ))}
              </>
            ) : (
              renderPageNumbers()
            )}

            {/* Next button */}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={!canGoNext}
              className={`
                relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 transition-colors
                ${
                  canGoNext
                    ? "hover:bg-gray-50 hover:text-gray-600 bg-white"
                    : "cursor-not-allowed bg-gray-100"
                }
              `}
              aria-label="Next page"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>

      {/* Quick jump (for large datasets) */}
      {totalPages > 10 && !isLoading && (
        <div className="hidden lg:flex items-center ml-4">
          <label htmlFor="page-jump" className="text-sm text-gray-700 mr-2">
            Ke halaman:
          </label>
          <input
            id="page-jump"
            type="number"
            min={1}
            max={totalPages}
            className="w-16 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                const target = e.target as HTMLInputElement;
                const pageNumber = parseInt(target.value);
                if (pageNumber >= 1 && pageNumber <= totalPages) {
                  onPageChange(pageNumber);
                  target.value = '';
                }
              }
            }}
            placeholder={currentPage.toString()}
          />
        </div>
      )}
    </div>
  );
};

export default Pagination;