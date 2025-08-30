// components/public/detailArticle/BreadCrumb.tsx
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import type { Article } from "@/types/article";

interface BreadcrumbProps {
  artikel: Article;
}

export default function Breadcrumb({ artikel }: BreadcrumbProps) {
  const breadcrumbItems = [
    { name: 'Beranda', href: '/' },
    { name: 'Artikel Kesehatan', href: '/artikel-kesehatan' },
    ...(artikel.categoryName && artikel.categorySlug ? 
      [{ name: artikel.categoryName, href: `/artikel-kesehatan/${artikel.categorySlug}` }] : 
      []
    ),
    { name: artikel.title, href: null }, // Current page
  ];

  // JSON-LD for breadcrumb
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      ...(item.href && { "item": `${process.env.NEXT_PUBLIC_BASE_URL}${item.href}` })
    }))
  };

  return (
    <>
      {/* JSON-LD for Breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <nav className="mb-6 text-sm text-gray-500" aria-label="Breadcrumb">
        <ol className="flex items-center flex-wrap gap-1">
          {breadcrumbItems.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRightIcon className="h-3 w-3 text-gray-400 mx-2 flex-shrink-0" />
              )}
              
              {item.href ? (
                <Link 
                  href={item.href} 
                  className="hover:text-green-600 transition-colors truncate max-w-xs md:max-w-none"
                  title={item.name}
                >
                  {item.name}
                </Link>
              ) : (
                <span 
                  className="text-gray-900 font-medium truncate max-w-xs md:max-w-sm lg:max-w-md"
                  title={item.name}
                >
                  {item.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}