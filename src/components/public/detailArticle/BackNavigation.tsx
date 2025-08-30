// components/public/detailArticle/BackNavigation.tsx
'use client';

import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function BackNavigation() {
  const router = useRouter();

  const handleBack = () => {
    // Check if there's history to go back to
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/artikel-kesehatan');
    }
  };

  return (
    <div className="sticky top-16 lg:top-20 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 transition-all duration-200">
      <div className="container mx-auto px-4 md:px-6 lg:px-10 py-3">
        <div className="flex items-center justify-between">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="inline-flex items-center text-gray-600 hover:text-green-600 transition-colors duration-200 group"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-medium">Kembali</span>
          </button>

          {/* Alternative Link for SEO */}
          <Link 
            href="/artikel-kesehatan" 
            className="hidden md:inline-flex items-center text-gray-500 hover:text-green-600 transition-colors duration-200 text-sm"
          >
            Lihat Semua Artikel
          </Link>
        </div>
      </div>
    </div>
  );
}