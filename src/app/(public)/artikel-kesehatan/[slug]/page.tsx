// src/app/(public)/artikel-kesehatan/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import MainLayout from "@/components/layout/main-layout";
import { fetchArticleBySlug, fetchRelatedArticles } from "@/lib/api/strapi";
import BackNavigation from "@/components/public/detailArticle/BackNavigation";
import Breadcrumb from "@/components/public/detailArticle/BreadCrumb";
import HeaderDetail from "@/components/public/detailArticle/HeaderDetail";
import ArticleContent from "@/components/public/detailArticle/ArticleContent";
import RelatedArticle from "@/components/public/detailArticle/RelatedArticle";
import Newsletter from "@/components/public/detailArticle/Newsletter";
import SocialShareButtons from "@/components/public/detailArticle/SocialShare";

// SEO Metadata dengan data dari Strapi
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const artikel = await fetchArticleBySlug(params.slug);
  
  if (!artikel) {
    return {
      title: 'Artikel Tidak Ditemukan - Klinik Utama CMI',
      description: 'Artikel yang Anda cari tidak dapat ditemukan.',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://cmihospital.com';

  return {
    title: artikel.seo.metaTitle || `${artikel.title} - Klinik Utama CMI`,
    description: artikel.seo.metaDescription || artikel.description,
    robots: artikel.seo.metaRobots || 'index,follow',
    openGraph: {
      title: artikel.title,
      description: artikel.description,
      type: "article",
      url: `${baseUrl}/artikel-kesehatan/${artikel.slug}`,
      images: [
        {
          url: artikel.image.startsWith('http') ? artikel.image : `${baseUrl}${artikel.image}`,
          width: 1200,
          height: 630,
          alt: artikel.title,
        },
      ],
      publishedTime: artikel.publishedAt,
      authors: [artikel.author],
      tags: artikel.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: artikel.title,
      description: artikel.description,
      images: [artikel.image],
    },
    keywords: artikel.tags.join(', ') + ', kesehatan, artikel kesehatan, tips kesehatan, klinik cmi',
    authors: [{ name: artikel.author }],
    alternates: {
      canonical: `${baseUrl}/artikel-kesehatan/${artikel.slug}`,
    },
  };
}

// Halaman artikel detail dengan integrasi Strapi
export default async function ArtikelDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  // Fetch artikel berdasarkan slug
  const artikel = await fetchArticleBySlug(params.slug);
  
  if (!artikel) {
    return notFound();
  }

  // Fetch artikel terkait
  const relatedArticles = await fetchRelatedArticles(artikel, 6);

  // Struktur data JSON-LD untuk SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": artikel.title,
    "description": artikel.description,
    "image": artikel.image,
    "author": {
      "@type": "Person",
      "name": artikel.author,
      "email": artikel.authorEmail,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Klinik Utama CMI",
      "logo": {
        "@type": "ImageObject",
        "url": `${process.env.NEXT_PUBLIC_BASE_URL}/images/logo.png`
      }
    },
    "datePublished": artikel.publishedAt,
    "dateModified": artikel.publishedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_BASE_URL}/artikel-kesehatan/${artikel.slug}`
    },
    "articleSection": artikel.categoryName,
    "keywords": artikel.tags,
    "wordCount": artikel.content.split(' ').length,
    "timeRequired": artikel.readTime,
  };

  return (
    <>
      {/* JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <MainLayout>
        <main className="bg-gray-50 min-h-screen">
          {/* Back Navigation - Sticky */}
          <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 pt-28">
            <BackNavigation />
          </div>
          <div className="container mx-auto px-4 py-8 lg:py-12">
            <div className="max-w-6xl mx-auto">
              {/* Breadcrumb */}
              <Breadcrumb artikel={artikel} />

              {/* Article Header */}
              <HeaderDetail 
                artikel={{
                  title: artikel.title,
                  author: artikel.author,
                  date: artikel.publishedAt,
                  readTime: artikel.readTime,
                  image: artikel.image,
                  description: artikel.description,
                  category: artikel.categoryName,
                  isFeatured: artikel.isFeatured
                }} 
              />

              {/* Social Share Buttons - Floating */}
              <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-30 hidden lg:block">
                <div className="flex flex-col space-y-2">
                  <SocialShareButtons 
                    title={artikel.title}
                    description={artikel.description}
                    slug={artikel.slug}
                  />
                </div>
              </div>

              {/* Main Article Content */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
                <ArticleContent 
                  content={artikel.content}
                  title={artikel.title}
                />

                {/* Mobile Social Share */}
                <div className="lg:hidden px-6 pb-6">
                  <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <span className="text-sm text-gray-600">Bagikan artikel ini:</span>
                    <SocialShareButtons 
                      title={artikel.title}
                      description={artikel.description}
                      slug={artikel.slug}
                    />
                  </div>
                </div>
              </div>

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

// Generate static params untuk build time
export async function generateStaticParams() {
  // Dalam production, Anda bisa fetch semua artikel untuk static generation
  // Untuk sekarang, kita return empty array untuk dynamic generation
  return [];
}
// export async function generateStaticParams() {
//   const { articles } = await fetchArticles({ pageSize: 100 });
//   return articles.map(article => ({ slug: article.slug }));
// }

// export default async function ArticlePage({ params }) {
//   const article = await fetchArticleBySlug(params.slug);
//   return <Article article={article} />;
// }

// export const revalidate = 300; // 5 menit untuk ISR
