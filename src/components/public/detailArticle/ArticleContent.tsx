// components/public/detailArticle/ArticleContent.tsx
import React from "react";
import { Share2, BookmarkPlus, Heart } from "lucide-react";

interface ArticleContentProps {
  content: string;
  title: string;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ content, title }) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link artikel berhasil disalin!');
    }
  };

  const handleBookmark = () => {
    // Add bookmark functionality here
    alert('Artikel berhasil disimpan ke bookmark!');
  };

  const handleLike = () => {
    // Add like functionality here
    alert('Terima kasih atas like-nya!');
  };

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-6 md:px-10 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <article className="flex-1">
              <div 
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700"
                dangerouslySetInnerHTML={{ __html: content }}
              />
              
              {/* If content is just plain text, render it properly */}
              {!content.includes('<') && (
                <div className="prose prose-lg max-w-none">
                  {content.split('\n').map((paragraph, index) => (
                    paragraph.trim() && (
                      <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                        {paragraph}
                      </p>
                    )
                  ))}
                </div>
              )}

              {/* Social Actions */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Apakah artikel ini membantu Anda?
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handleLike}
                      className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">Suka</span>
                    </button>
                    <button
                      onClick={handleBookmark}
                      className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <BookmarkPlus className="w-4 h-4" />
                      <span className="text-sm">Simpan</span>
                    </button>
                    <button
                      onClick={handleShare}
                      className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-green-500 hover:bg-green-50 rounded-lg transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      <span className="text-sm">Bagikan</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:w-80">
              {/* Table of Contents */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Daftar Isi
                </h3>
                <nav className="space-y-2">
                  <a href="#" className="block text-sm text-gray-600 hover:text-green-600 transition-colors">
                    Pendahuluan
                  </a>
                  <a href="#" className="block text-sm text-gray-600 hover:text-green-600 transition-colors">
                    Penyebab Utama
                  </a>
                  <a href="#" className="block text-sm text-gray-600 hover:text-green-600 transition-colors">
                    Gejala yang Harus Diperhatikan
                  </a>
                  <a href="#" className="block text-sm text-gray-600 hover:text-green-600 transition-colors">
                    Pencegahan
                  </a>
                  <a href="#" className="block text-sm text-gray-600 hover:text-green-600 transition-colors">
                    Pengobatan
                  </a>
                  <a href="#" className="block text-sm text-gray-600 hover:text-green-600 transition-colors">
                    Kesimpulan
                  </a>
                </nav>
              </div>

              {/* Quick Tips */}
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
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleContent;