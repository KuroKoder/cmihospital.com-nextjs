// components/FilterControls.tsx
import React from "react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { Category, SortBy } from "../../../types/article";

interface FilterControlsProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: SortBy;
  onSortChange: (sortBy: SortBy) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  showFilters,
  onToggleFilters,
}) => {
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
          className="text-green-600 hover:text-green-800 text-sm font-medium"
          aria-label="Toggle filters"
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
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                  selectedCategory === category.id
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Urutkan Berdasarkan
          </h3>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortBy)}
            className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="newest">Terbaru</option>
            <option value="oldest">Terlama</option>
            <option value="popular">Terpopuler</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;
