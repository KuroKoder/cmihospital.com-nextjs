// src/app/(public)/artikel-kesehatan/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Article } from "@/types/article";
import MainLayout from "@/components/layout/main-layout";
// ✅ PERBAIKAN: Import dari server-side API untuk server components
import {
  fetchArticleBySlug,
  fetchArticles,
  strapiApi,
} from "../../../lib/api/strapi"; // Server-side imports
import BackNavigation from "@/components/public/detailArticle/BackNavigation";
import Breadcrumb from "@/components/public/detailArticle/BreadCrumb";
import HeaderDetail from "@/components/public/detailArticle/HeaderDetail";
import ArticleContent from "@/components/public/detailArticle/ArticleContent";
import RelatedArticle from "@/components/public/detailArticle/RelatedArticle";
import Newsletter from "@/components/public/detailArticle/Newsletter";
import SocialShareButtons from "@/components/public/detailArticle/SocialShare";

// 🚀 ISR Configuration - Revalidate every 5 minutes
export const revalidate = 300; // 5 menit

// 🎯 Generate static params at build time untuk artikel populer
export async function generateStaticParams() {
  try {
    // Fetch artikel terpopuler/terbaru untuk pre-generate
    const { articles } = await fetchArticles({
      pageSize: 50, // Pre-generate 50 artikel terpopuler
      sortBy: "newest",
    });

    const paths = articles.map((article: Article) => ({
      slug: article.slug,
    }));

    console.log(
      `🏗️ Pre-generating ${paths.length} article pages at build time`
    );
    return paths;
  } catch (error) {
    console.warn("⚠️ Error in generateStaticParams:", error);
    // Return empty array jika ada error, tetap bisa fallback ke on-demand generation
    return [];
  }
}

// 📊 SEO Metadata dengan optimasi untuk search engines
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const artikel = await fetchArticleBySlug(resolvedParams.slug);

  if (!artikel) {
    return {
      title: "Artikel Tidak Ditemukan - Klinik Utama CMI",
      description: "Artikel kesehatan yang Anda cari tidak dapat ditemukan.",
      robots: "noindex,nofollow", // Jangan index halaman 404
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://cmihospital.com";
  const canonicalUrl = `${baseUrl}/artikel-kesehatan/${artikel.slug}`;

  // Enhanced SEO dengan lebih banyak meta tags
  return {
    title: artikel.seo?.metaTitle || `${artikel.title} | Klinik Utama CMI`,
    description:
      artikel.seo?.metaDescription || artikel.description?.substring(0, 160),
    robots: artikel.seo?.metaRobots || "index,follow,max-image-preview:large",

    // Open Graph untuk social sharing
    openGraph: {
      title: artikel.title,
      description: artikel.description?.substring(0, 160),
      type: "article",
      url: canonicalUrl,
      siteName: "Klinik Utama CMI",
      locale: "id_ID",
      images: [
        {
          url: artikel.image?.startsWith("http")
            ? artikel.image
            : `${baseUrl}${artikel.image}`,
          width: 1200,
          height: 630,
          alt: artikel.title,
          type: "image/jpeg",
        },
      ],
      publishedTime: artikel.publishedAt,
      modifiedTime: artikel.updatedAt || artikel.publishedAt,
      authors: artikel.author ? [artikel.author] : [],
      section: artikel.categoryName,
      tags: artikel.tags || [],
    },

    // Twitter Card
    twitter: {
      card: "summary_large_image",
      site: "@cmihospital", // Ganti dengan handle Twitter Anda
      creator: "@cmihospital",
      title: artikel.title,
      description: artikel.description?.substring(0, 160),
      images: artikel.image
        ? [
            artikel.image.startsWith("http")
              ? artikel.image
              : `${baseUrl}${artikel.image}`,
          ]
        : [],
    },

    // Additional SEO enhancements
    keywords: [
      ...(artikel.tags || []),
      "kesehatan",
      "artikel kesehatan",
      "tips kesehatan",
      "klinik cmi",
      "pelayanan kesehatan",
      artikel.categoryName || "umum",
    ]
      .filter(Boolean)
      .join(", "),

    authors: artikel.author
      ? [
          {
            name: artikel.author,
            url: `${baseUrl}/author/${artikel.authorSlug || "team"}`,
          },
        ]
      : [],
    category: artikel.categoryName,

    // Canonical URL
    alternates: {
      canonical: canonicalUrl,
    },

    // Additional meta tags
    other: {
      "article:published_time": artikel.publishedAt,
      "article:modified_time": artikel.updatedAt || artikel.publishedAt,
      ...(artikel.author && { "article:author": artikel.author }),
      ...(artikel.categoryName && { "article:section": artikel.categoryName }),
      ...(artikel.tags &&
        artikel.tags.length > 0 && { "article:tag": artikel.tags.join(",") }),
      ...(artikel.readTime && { "reading-time": artikel.readTime }),
    },
  };
}

// 📄 Main Article Page Component
export default async function ArtikelDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;

  // Fetch artikel dengan error handling
  const artikel = await fetchArticleBySlug(resolvedParams.slug);

  if (!artikel) {
    return notFound();
  }

  // ✅ PERBAIKAN: Gunakan server-side API dengan proper typing
  let relatedArticles: Article[] = [];
  try {
    relatedArticles = await strapiApi.fetchRelatedArticles(artikel, 6);
  } catch (error) {
    console.warn("⚠️ Error fetching related articles:", error);
    // Continue without related articles
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://cmihospital.com";

  // 🔍 Enhanced JSON-LD untuk rich snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: artikel.title,
    description: artikel.description,
    image: artikel.image
      ? {
          "@type": "ImageObject",
          url: artikel.image.startsWith("http")
            ? artikel.image
            : `${baseUrl}${artikel.image}`,
          width: 1200,
          height: 630,
          caption: artikel.title,
        }
      : undefined,
    author: artikel.author
      ? {
          "@type": "Person",
          name: artikel.author,
          email: artikel.authorEmail,
          url: `${baseUrl}/author/${artikel.authorSlug || "team"}`,
        }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "Klinik Utama CMI",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/images/logo.png`,
        width: 200,
        height: 60,
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Jl. Raya CMI", // Sesuaikan alamat
        addressLocality: "Jakarta",
        addressCountry: "ID",
      },
    },
    datePublished: artikel.publishedAt,
    dateModified: artikel.updatedAt || artikel.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/artikel-kesehatan/${artikel.slug}`,
    },
    url: `${baseUrl}/artikel-kesehatan/${artikel.slug}`,
    articleSection: artikel.categoryName,
    keywords: artikel.tags,
    wordCount: artikel.content?.split(" ").length || 0,
    timeRequired: artikel.readTime,
    inLanguage: "id-ID",
    isAccessibleForFree: true,
    genre: "health",
    about: artikel.categoryName
      ? {
          "@type": "Thing",
          name: artikel.categoryName,
        }
      : undefined,
  };

  // Tambahan JSON-LD untuk breadcrumb
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Artikel Kesehatan",
        item: `${baseUrl}/artikel-kesehatan`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: artikel.categoryName || "Umum",
        item: `${baseUrl}/artikel-kesehatan/kategori/${
          artikel.categorySlug || "umum"
        }`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: artikel.title,
        item: `${baseUrl}/artikel-kesehatan/${artikel.slug}`,
      },
    ],
  };

  return (
    <>
      {/* 🔍 Enhanced JSON-LD Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <MainLayout>
        <main className="bg-gray-50 min-h-screen">
          {/* Back Navigation - Sticky */}
          <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 pt-28">
            <BackNavigation />
          </div>

          <div className="container mx-auto px-4 py-8 lg:py-12">
            <div className="max-w-6xl mx-auto">
              {/* Breadcrumb untuk SEO */}
              <Breadcrumb artikel={artikel} />

              {/* Article Header dengan microdata */}
              <article itemScope itemType="https://schema.org/Article">
                <HeaderDetail
                  artikel={{
                    title: artikel.title,
                    author: artikel.author,
                    date: artikel.publishedAt,
                    readTime: artikel.readTime,
                    image: artikel.image,
                    description: artikel.description,
                    category: artikel.categoryName,
                    isFeatured: artikel.isFeatured,
                  }}
                />

                {/* Social Share Buttons - Floating */}
                <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-30 hidden lg:block">
                  <div className="flex flex-col space-y-2">
                    <SocialShareButtons
                      title={artikel.title}
                      description={artikel.description || ""}
                      slug={artikel.slug}
                    />
                  </div>
                </div>

                {/* Main Article Content */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
                  <div itemProp="articleBody">
                    <ArticleContent
                      content={artikel.content}
                      title={artikel.title}
                    />
                  </div>

                  {/* Mobile Social Share */}
                  <div className="lg:hidden px-6 pb-6">
                    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                      <span className="text-sm text-gray-600">
                        Bagikan artikel ini:
                      </span>
                      <SocialShareButtons
                        title={artikel.title}
                        description={artikel.description || ""}
                        slug={artikel.slug}
                      />
                    </div>
                  </div>
                </div>
              </article>

              {/* Related Articles */}
              {relatedArticles.length > 0 && (
                <RelatedArticle articles={relatedArticles} />
              )}

              {/* Newsletter Subscription */}
              <Newsletter />
            </div>
          </div>
        </main>
      </MainLayout>
    </>
  );
}
