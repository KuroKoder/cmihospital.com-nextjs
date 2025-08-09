import Link from "next/link";
import type { Article } from "@/types/article";

interface BreadcrumbProps {
  artikel: Article;
}

export default function Breadcrumb({ artikel }: BreadcrumbProps) {
  return (
    <nav className="mb-6 text-sm text-gray-500" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <Link href="/" className="hover:text-green-600 transition-colors">
            Beranda
          </Link>
        </li>
        <li className="flex items-center">
          <span className="mx-2 text-gray-400">›</span>
          <Link href="/artikel-kesehatan" className="hover:text-green-600 transition-colors">
            Artikel Kesehatan
          </Link>
        </li>
        <li className="flex items-center">
          <span className="mx-2 text-gray-400">›</span>
          <span className="text-gray-900 line-clamp-1 max-w-xs">{artikel.title}</span>
        </li>
      </ol>
    </nav>
  );
}