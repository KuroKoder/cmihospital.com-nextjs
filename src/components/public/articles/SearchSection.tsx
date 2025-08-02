// components/SearchSection.tsx
import React from "react";
import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";

interface SearchSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({
  searchQuery,
  onSearchChange,
  showFilters,
  onToggleFilters,
}) => {
  return (
    <section className="bg-gradient-to-r from-green-700 to-green-500 text-white py-16 mb-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Artikel Kesehatan <span className="text-green-200">Terbaru</span>
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90 mb-8">
            Informasi dan tips kesehatan terkini dari tim dokter Klinik Utama
            CMI untuk membantu Anda menjaga kesehatan dan kesejahteraan
            keluarga.
          </p>

          {/* Search Bar */}
          <div className="mt-6 max-w-2xl mx-auto relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari artikel kesehatan..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full px-4 py-4 pl-12 pr-16 bg-white rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-lg"
                aria-label="Cari artikel"
              />
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 bg-green-600 rounded-full hover:bg-green-700 w-10 h-10 flex items-center justify-center"
                onClick={onToggleFilters}
                aria-label="Toggle filters"
              >
                <AdjustmentsHorizontalIcon className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
