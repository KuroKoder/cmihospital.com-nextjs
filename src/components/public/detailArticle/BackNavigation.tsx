import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function BackNavigation() {
  return (
    <div className="sticky top-20 z-40 pt-6 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-10 py-3">
        <Link 
          href="/artikel-kesehatan" 
          className="inline-flex items-center text-gray-600 hover:text-green-600 transition-colors duration-200 group"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
          <span className="text-sm font-medium">Kembali ke Artikel</span>
        </Link>
      </div>
    </div>
  );
}