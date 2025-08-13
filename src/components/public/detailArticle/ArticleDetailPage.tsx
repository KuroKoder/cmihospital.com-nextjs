// components/public/detailArticle/ArticleDetailPage.tsx
'use client';

import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { 
  ClockIcon, 
  ShareIcon, 
  BookmarkIcon,
  ArrowLeftIcon,
  CalendarDaysIcon,
  UserIcon,
  TagIcon,
  XMarkIcon,
  CheckCircleIcon,
  EnvelopeIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";
import type { Article } from "@/types/article";

interface ArticleDetailPageProps {
  artikel: Article;
  relatedArticles?: Article[];
}

// Back Navigation Component
const BackNavigation = () => (
  <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200">
    <div className="container mx-auto px-4 py-3">
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

// Breadcrumb Component
const Breadcrumb = ({ artikel }: { artikel: Article }) => (
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
);

// Social Share Component
const SocialShareButtons = ({ title, slug }: {
  title: string;
  description: string;
  slug: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const url = typeof window !== 'undefined' ? `${window.location.origin}/artikel-kesehatan/${slug}` : '';
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const shareLinks = [
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: '📘',
      color: 'hover:bg-blue-600 hover:text-white'
    },
    {
      name: 'Twitter',
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      icon: '🐦',
      color: 'hover:bg-black hover:text-white'
    },
    {
      name: 'WhatsApp',
      url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      icon: '📱',
      color: 'hover:bg-green-600 hover:text-white'
    }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="relative">
      {isOpen && (
        <>
          <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Bagikan Artikel</h3>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                {shareLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center p-3 rounded-lg border border-gray-200 text-gray-600 transition-all duration-200 ${link.color}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-2xl">{link.icon}</span>
                    <span className="text-xs mt-1 font-medium">{link.name}</span>
                  </a>
                ))}
              </div>

              <div className="pt-3 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={url}
                    readOnly
                    className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-600"
                  />
                  <button
                    onClick={copyToClipboard}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      copied 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {copied ? 'Tersalin!' : 'Salin'}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
        </>
      )}
    </div>
  );
};

// Newsletter Component
const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubscribed(true);
    setIsLoading(false);
    setEmail('');
    
    setTimeout(() => setIsSubscribed(false), 5000);
  };

  if (isSubscribed) {
    return (
      <section className="mt-12 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
            <CheckCircleIcon className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Terima Kasih!</h2>
          <p className="text-green-100 mb-4">
            Anda telah berhasil berlangganan newsletter kami.
          </p>
          <p className="text-sm text-green-200">
            Cek email Anda untuk konfirmasi langganan.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-12 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
          <EnvelopeIcon className="w-8 h-8 text-white" />
        </div>
        
        <h2 className="text-2xl font-bold mb-4 flex items-center justify-center">
          <SparklesIcon className="w-6 h-6 mr-2" />
          Dapatkan Tips Kesehatan Terbaru
        </h2>
        
        <p className="text-green-100 mb-6 max-w-2xl mx-auto">
          Berlangganan newsletter kami untuk mendapatkan artikel kesehatan terbaru, 
          tips kesehatan, dan informasi promo klinik langsung di email Anda.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email Anda"
              required
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button 
              type="submit"
              disabled={isLoading || !email.trim()}
              className="px-6 py-3 bg-white text-green-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50"
            >
              {isLoading ? 'Memproses...' : 'Berlangganan'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

// Related Articles Component
const RelatedArticles = ({ articles }: { articles: Article[] }) => {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Artikel Terkait</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link 
            key={article.id}
            href={`/artikel-kesehatan/${article.slug}`}
            className="group"
          >
            <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {article.description}
                </p>
                <div className="flex items-center text-xs text-gray-500">
                  <span>{article.readTime}</span>
                  <span className="mx-2">•</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
};

// Table of Contents Component
const TableOfContents = () => (
  <div className="lg:w-80">
    <div className="bg-gray-50 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Daftar Isi</h3>
      <nav className="space-y-2">
        <a href="#pendahuluan" className="block text-sm text-gray-600 hover:text-green-600 transition-colors">
          Pendahuluan
        </a>
        <a href="#penyebab" className="block text-sm text-gray-600 hover:text-green-600 transition-colors">
          Penyebab Utama
        </a>
        <a href="#gejala" className="block text-sm text-gray-600 hover:text-green-600 transition-colors">
          Gejala yang Harus Diperhatikan
        </a>
        <a href="#pencegahan" className="block text-sm text-gray-600 hover:text-green-600 transition-colors">
          Pencegahan
        </a>
        <a href="#pengobatan" className="block text-sm text-gray-600 hover:text-green-600 transition-colors">
          Pengobatan
        </a>
        <a href="#kesimpulan" className="block text-sm text-gray-600 hover:text-green-600 transition-colors">
          Kesimpulan
        </a>
      </nav>
    </div>

    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-green-800 mb-4">
        💡 Tips Kesehatan
      </h3>
      <div className="space-y-3 text-sm text-green-700">
        <p>• Konsultasikan dengan dokter sebelum mengubah pola makan</p>
        <p>• Lakukan olahraga rutin minimal 30 menit per hari</p>
        <p>• Pastikan tidur cukup 7-8 jam setiap malam</p>
        <p>• Minum air putih minimal 8 gelas per hari</p>
      </div>
    </div>
  </div>
);

// Main Article Detail Component
export default function ArticleDetailPage({ artikel, relatedArticles = [] }: ArticleDetailPageProps) {
  if (!artikel) {
    return notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <BackNavigation />

      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb artikel={artikel} />

          {/* Article Container */}
          <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Article Header */}
            <header className="px-6 lg:px-8 pt-8 pb-6">
              {/* Category Badge */}
              <div className="mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <TagIcon className="h-4 w-4 mr-1" />
                  {artikel.categoryName}
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
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-3">
                  <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
                    <BookmarkIcon className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Simpan</span>
                  </button>
                  <SocialShareButtons 
                    title={artikel.title}
                    description={artikel.description}
                    slug={artikel.slug}
                  />
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
                <Image
                  src={artikel.image}
                  alt={artikel.title}
                  width={800}
                  height={400}
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>

            {/* Article Content */}
            <div className="px-6 lg:px-8 pb-8">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Content */}
                <div className="flex-1">
                  <div className="prose prose-lg prose-gray max-w-none">
                    {/* Lead Paragraph */}
                    <div className="text-xl text-gray-700 leading-relaxed mb-8 p-6 bg-gray-50 rounded-xl border-l-4 border-green-500">
                      <p className="mb-0 font-medium">{artikel.description}</p>
                    </div>

                    {/* Article Content */}
                    <div 
                      className="space-y-6"
                      dangerouslySetInnerHTML={{ __html: artikel.content }}
                    />

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

                {/* Sidebar - Table of Contents */}
                <TableOfContents />
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
          <RelatedArticles articles={relatedArticles} />

          {/* Newsletter Signup */}
          <Newsletter />
        </div>
      </div>
    </div>
  );
}