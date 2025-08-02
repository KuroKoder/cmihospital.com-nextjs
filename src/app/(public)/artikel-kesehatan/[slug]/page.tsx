import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ARTICLES, CATEGORIES } from "@/data/articles";
import MainLayout from "@/components/layout/main-layout";
import Link from "next/link";
import { 
  ClockIcon, 
  EyeIcon, 
  ShareIcon, 
  BookmarkIcon,
  ArrowLeftIcon,
  CalendarDaysIcon,
  UserIcon,
  TagIcon
} from "@heroicons/react/24/outline";
import { 
  BookmarkIcon as BookmarkSolidIcon 
} from "@heroicons/react/24/solid";

// SEO Metadata
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const artikel = ARTICLES.find((a) => a.slug === params.slug);
  if (!artikel) return {};

  return {
    title: `${artikel.title} - Klinik Utama CMI`,
    description: artikel.description,
    openGraph: {
      title: artikel.title,
      description: artikel.description,
      type: "article",
      url: `https://klinikutamacmi.com/artikel-kesehatan/${artikel.slug}`,
      images: [
        {
          url: `https://klinikutamacmi.com${artikel.image}`,
          width: 1200,
          height: 630,
          alt: artikel.title,
        },
      ],
      publishedTime: artikel.date,
    },
    twitter: {
      card: "summary_large_image",
      title: artikel.title,
      description: artikel.description,
    },
    keywords: "kesehatan, artikel kesehatan, tips kesehatan, klinik cmi",
    authors: [{ name: artikel.author }],
  };
}

// Halaman artikel detail
export default function ArtikelDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const artikel = ARTICLES.find((a) => a.slug === params.slug);
  
  if (!artikel) {
    return notFound();
  }

  const category = CATEGORIES.find(cat => cat.id === artikel.category);
  const relatedArticles = ARTICLES
    .filter(a => a.category === artikel.category && a.id !== artikel.id)
    .slice(0, 3);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <MainLayout>
      <main className="bg-gray-50 min-h-screen mt-34">
        {/* Back Navigation - Sticky */}
        <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200">
          <div className="container mx-auto px-4 py-3">
            <Link 
              href="/artikel-kesehatan" 
              className="inline-flex items-center text-gray-600 hover:text-green-600 transition-colors duration-200"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Kembali ke Artikel</span>
            </Link>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 lg:py-12">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-6 text-sm text-gray-500" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2">
                <li>
                  <Link href="/" className="hover:text-green-600 transition-colors">
                    Beranda
                  </Link>
                </li>
                <li className="flex items-center">
                  <span className="mx-2">›</span>
                  <Link href="/artikel-kesehatan" className="hover:text-green-600 transition-colors">
                    Artikel Kesehatan
                  </Link>
                </li>
                <li className="flex items-center">
                  <span className="mx-2">›</span>
                  <span className="text-gray-900 line-clamp-1">{artikel.title}</span>
                </li>
              </ol>
            </nav>

            {/* Article Container */}
            <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Article Header */}
              <header className="px-6 lg:px-8 pt-8 pb-6">
                {/* Category Badge */}
                <div className="mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <TagIcon className="h-4 w-4 mr-1" />
                    {category?.name}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  {artikel.title}
                </h1>

                {/* Article Meta */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                  <div className="flex items-center">
                    <UserIcon className="h-4 w-4 mr-1.5" />
                    <span className="font-medium">{artikel.author}</span>
                  </div>
                  <div className="flex items-center">
                    <CalendarDaysIcon className="h-4 w-4 mr-1.5" />
                    <span>{formatDate(artikel.date)}</span>
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="h-4 w-4 mr-1.5" />
                    <span>{artikel.readTime}</span>
                  </div>
                  <div className="flex items-center">
                    <EyeIcon className="h-4 w-4 mr-1.5" />
                    <span>{artikel.views.toLocaleString()} pembaca</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-3">
                    <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
                      <BookmarkIcon className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Simpan</span>
                    </button>
                    <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <ShareIcon className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Bagikan</span>
                    </button>
                  </div>
                  
                  {artikel.isFeatured && (
                    <div className="hidden sm:flex items-center">
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                        ⭐ Artikel Unggulan
                      </span>
                    </div>
                  )}
                </div>
              </header>

              {/* Featured Image */}
              <div className="px-6 lg:px-8 mb-8">
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={artikel.image}
                    alt={artikel.title}
                    className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>

              {/* Article Content */}
              <div className="px-6 lg:px-8 pb-8">
                <div className="prose prose-lg prose-gray max-w-none">
                  {/* Lead Paragraph */}
                  <div className="text-xl text-gray-700 leading-relaxed mb-8 p-6 bg-gray-50 rounded-xl border-l-4 border-green-500">
                    <p className="mb-0 font-medium">{artikel.description}</p>
                  </div>

                  {/* Sample Content - Replace with actual article content */}
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                      Mengapa Hal Ini Penting?
                    </h2>
                    
                    <p className="text-gray-700 leading-relaxed">
                      Kesehatan adalah aset yang paling berharga dalam hidup kita. Dengan memahami dan menerapkan 
                      informasi kesehatan yang tepat, kita dapat mencegah berbagai penyakit dan meningkatkan 
                      kualitas hidup secara keseluruhan.
                    </p>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-8">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">💡</span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-semibold text-blue-900 mb-2">Tips Penting</h3>
                          <p className="text-blue-800 text-sm leading-relaxed">
                            Selalu konsultasikan kondisi kesehatan Anda dengan dokter profesional. 
                            Artikel ini tidak menggantikan saran medis dari tenaga kesehatan yang qualified.
                          </p>
                        </div>
                      </div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                      Kesimpulan
                    </h2>
                    
                    <p className="text-gray-700 leading-relaxed">
                      Informasi kesehatan yang akurat dan terpercaya sangat penting untuk menjaga 
                      kesehatan optimal. Tim medis Klinik Utama CMI siap membantu Anda dengan 
                      pelayanan kesehatan yang professional dan berkualitas.
                    </p>

                    {/* Call to Action */}
                    <div className="bg-green-50 border border-green-200 rounded-xl p-6 my-8">
                      <h3 className="text-lg font-semibold text-green-900 mb-3">
                        Butuh Konsultasi Lebih Lanjut?
                      </h3>
                      <p className="text-green-800 text-sm mb-4">
                        Tim dokter berpengalaman di Klinik Utama CMI siap membantu Anda 
                        dengan pelayanan kesehatan yang komprehensif.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link 
                          href="/konsultasi" 
                          className="inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm font-medium"
                        >
                          Konsultasi Online
                        </Link>
                        <Link 
                          href="/appointment" 
                          className="inline-flex items-center justify-center px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors duration-200 text-sm font-medium"
                        >
                          Buat Janji Temu
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Article Footer */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-600 text-sm">Bagikan artikel ini:</span>
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <span className="sr-only">Share to Facebook</span>
                          📘
                        </button>
                        <button className="p-2 text-gray-500 hover:text-blue-400 hover:bg-blue-50 rounded-lg transition-colors">
                          <span className="sr-only">Share to Twitter</span>
                          🐦
                        </button>
                        <button className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <span className="sr-only">Share to WhatsApp</span>
                          📱
                        </button>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      Terakhir diperbarui: {formatDate(artikel.date)}
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <section className="mt-12" aria-labelledby="related-articles">
                <h2 id="related-articles" className="text-2xl font-bold text-gray-900 mb-6">
                  Artikel Terkait
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedArticles.map((relatedArticle) => (
                    <Link 
                      key={relatedArticle.id}
                      href={`/artikel-kesehatan/${relatedArticle.slug}`}
                      className="group"
                    >
                      <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={relatedArticle.image}
                            alt={relatedArticle.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-5">
                          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                            {relatedArticle.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {relatedArticle.description}
                          </p>
                          <div className="flex items-center text-xs text-gray-500">
                            <span>{relatedArticle.readTime}</span>
                            <span className="mx-2">•</span>
                            <span>{relatedArticle.views.toLocaleString()} views</span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Newsletter Signup */}
            <section className="mt-12 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">
                  Dapatkan Tips Kesehatan Terbaru
                </h2>
                <p className="text-green-100 mb-6 max-w-2xl mx-auto">
                  Berlangganan newsletter kami untuk mendapatkan artikel kesehatan terbaru, 
                  tips kesehatan, dan informasi promo klinik langsung di email Anda.
                </p>
                <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
                  <input
                    type="email"
                    placeholder="Masukkan email Anda"
                    className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <button className="px-6 py-3 bg-white text-green-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                    Berlangganan
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}

// Static generation (SSG)
export function generateStaticParams() {
  return ARTICLES.map((artikel) => ({ 
    slug: artikel.slug 
  }));
}