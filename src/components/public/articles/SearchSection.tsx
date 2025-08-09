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
    <section className="relative overflow-hidden bg-green-600 text-white py-16 mb-8">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none'/%3E%3Ccircle cx='20' cy='20' r='2' fill='%23ffffff' fill-opacity='0.3'/%3E%3C/svg%3E")`
          }}
        />
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl animate-pulse delay-500" />
        
        {/* Additional Pattern Variations */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='none'/%3E%3Ccircle cx='30' cy='30' r='1' fill='%2310b981' fill-opacity='0.4'/%3E%3Ccircle cx='15' cy='15' r='0.8' fill='%23ffffff' fill-opacity='0.2'/%3E%3Ccircle cx='45' cy='15' r='0.6' fill='%2310b981' fill-opacity='0.3'/%3E%3Ccircle cx='15' cy='45' r='0.7' fill='%23ffffff' fill-opacity='0.25'/%3E%3Ccircle cx='45' cy='45' r='0.5' fill='%2310b981' fill-opacity='0.35'/%3E%3C/svg%3E")`
          }}
        />
        
        {/* Extra Blur Elements for Depth */}
        <div className="absolute top-32 right-1/4 w-48 h-48 bg-emerald-300/8 rounded-full blur-2xl animate-pulse delay-300" />
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-white/6 rounded-full blur-2xl animate-pulse delay-700" />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-green-600/10 to-green-800/20" />
      </div>
      
      <div className="relative container mx-auto px-4">
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
          {showFilters && (
            <div className="mt-8 max-w-4xl mx-auto bg-white text-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Filter Artikel</h2>
              <p className="text-sm text-gray-600">
                (Di sini nanti bisa ditambahkan filter berdasarkan kategori, tanggal, atau penulis.)
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchSection;