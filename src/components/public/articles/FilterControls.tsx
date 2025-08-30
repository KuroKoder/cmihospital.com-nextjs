// components/public/articles/FilterControls.tsx
import React from "react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { Category, SortBy } from "@/types/article";

interface FilterControlsProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: SortBy;
  onSortChange: (sortBy: SortBy) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  isLoading?: boolean;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  showFilters,
  onToggleFilters,
  isLoading = false,
}) => {
  // Fixed widths for skeleton loading to avoid hydration mismatch
  const skeletonWidths = [80, 90, 75, 85];

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-4 mb-8 transition-all duration-300 ${
        showFilters ? "max-h-96" : "max-h-16 overflow-hidden"
      }`}
    >
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={onToggleFilters}
      >
        <h2 className="font-semibold text-lg text-gray-800">
          <AdjustmentsHorizontalIcon className="h-5 w-5 inline mr-2 text-green-600" />
          Filter & Urutkan
        </h2>
        <button
          className="text-green-600 hover:text-green-800 text-sm font-medium transition-colors"
          aria-label="Toggle filters"
          disabled={isLoading}
        >
          {showFilters ? "Sembunyikan" : "Tampilkan"}
        </button>
      </div>

      {/* Filter Content */}
      <div
        className={`mt-6 grid gap-6 md:grid-cols-2 transition-opacity duration-300 ${
          showFilters ? "opacity-100" : "opacity-0"
        }`}
      >
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Kategori</h3>
          <div className="flex flex-wrap gap-2">
            {isLoading ? (
              // Loading skeleton for categories with fixed widths
              <>
                {skeletonWidths.map((width, index) => (
                  <div
                    key={index}
                    className="px-3 py-1.5 bg-gray-200 rounded-full animate-pulse h-[30px]"
                    style={{ width: `${width}px` }}
                  />
                ))}
              </>
            ) : (
              categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => onCategoryChange(category.id)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 ${
                    selectedCategory === category.id
                      ? "bg-green-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                  aria-pressed={selectedCategory === category.id}
                >
                  {category.name}
                  {category.articleCount !== undefined && (
                    <span className="ml-1 text-xs opacity-75">
                      ({category.articleCount})
                    </span>
                  )}
                </button>
              ))
            )}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Urutkan Berdasarkan
          </h3>
          {isLoading ? (
            <div className="w-full md:w-48 h-10 bg-gray-200 rounded-md animate-pulse" />
          ) : (
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortBy)}
              className="w-full md:w-auto px-3 text-black py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-200"
              disabled={isLoading}
            >
              <option value="newest">Terbaru</option>
              <option value="oldest">Terlama</option>
              <option value="popular">Terpopuler</option>
            </select>
          )}
        </div>
      </div>

      {/* Active filters indicator */}
      {showFilters && !isLoading && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-600">Filter aktif:</span>

            {selectedCategory !== "all" && (
              <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                {categories.find((cat) => cat.id === selectedCategory)?.name}
                <button
                  onClick={() => onCategoryChange("all")}
                  className="ml-1 hover:text-green-900"
                  aria-label="Hapus filter kategori"
                >
                  ×
                </button>
              </span>
            )}

            {sortBy !== "newest" && (
              <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {sortBy === "oldest" ? "Terlama" : "Terpopuler"}
                <button
                  onClick={() => onSortChange("newest")}
                  className="ml-1 hover:text-blue-900"
                  aria-label="Reset ke urutkan terbaru"
                >
                  ×
                </button>
              </span>
            )}

            {(selectedCategory !== "all" || sortBy !== "newest") && (
              <button
                onClick={() => {
                  onCategoryChange("all");
                  onSortChange("newest");
                }}
                className="text-xs text-gray-500 hover:text-gray-700 underline"
              >
                Reset semua filter
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterControls;
