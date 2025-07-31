"use client";
import { useState } from "react";
import { Search, Calendar, Heart, ArrowRight, User, Clock } from "lucide-react";
// import MainLayout from "@/layout/MainLayout";

// Komponen utama
export default function HealthArticlesSection() {
  const [activeTab, setActiveTab] = useState("all");
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);
  const [showAllArticles, setShowAllArticles] = useState(false);

  // Data artikel kesehatan
  const healthArticles = [
    {
      id: 1,
      title: "10 Cara Menjaga Kesehatan Jantung",
      excerpt:
        "Temukan tips sederhana untuk menjaga kesehatan jantung Anda setiap hari.",
      category: "jantung",
      image: "/assets/images/artikel-terbaru/kesehatan-jantung.png",
      author: "dr. Anita Setiawan",
      date: "28 Apr 2025",
      readTime: "5 menit",
      featured: true,
    },
    {
      id: 2,
      title: "Nutrisi Penting untuk Menguatkan Sistem Imun",
      excerpt:
        "Makanan apa saja yang dapat meningkatkan daya tahan tubuh secara alami.",
      category: "nutrisi",
      image: "/assets/images/artikel-terbaru/nutrisi-penting.png",
      author: "dr. Budi Santoso",
      date: "26 Apr 2025",
      readTime: "4 menit",
      featured: false,
    },
    {
      id: 3,
      title: "Manfaat Olahraga Rutin bagi Kesehatan Mental",
      excerpt:
        "Hubungan antara aktivitas fisik dan kesejahteraan mental yang sering terabaikan.",
      category: "mental",
      image: "/assets/images/artikel-terbaru/olahraga-rutin.png",
      author: "dr. Citra Dewi",
      date: "24 Apr 2025",
      readTime: "6 menit",
      featured: false,
    },
    {
      id: 4,
      title: "Panduan Tidur Berkualitas untuk Kesehatan Optimal",
      excerpt:
        "Pola tidur yang baik untuk meningkatkan kesehatan dan produktivitas Anda.",
      category: "gaya-hidup",
      image: "/assets/images/artikel-terbaru/tidur-berkualitas.png",
      author: "dr. Dian Pratama",
      date: "22 Apr 2025",
      readTime: "5 menit",
      featured: true,
    },
    {
      id: 5,
      title: "Deteksi Dini Diabetes: Gejala yang Tidak Boleh Diabaikan",
      excerpt:
        "Kenali tanda-tanda awal diabetes untuk penanganan yang lebih efektif.",
      category: "penyakit",
      image: "/assets/images/artikel-terbaru/deteksi-diabetes.png",
      author: "dr. Eko Pranoto",
      date: "20 Apr 2025",
      readTime: "7 menit",
      featured: false,
    },
    {
      id: 6,
      title: "Menjaga Kesehatan Tulang dan Sendi di Usia Lanjut",
      excerpt: "Langkah-langkah mencegah osteoporosis dan masalah persendian.",
      category: "lansia",
      image: "/api/placeholder/600/400",
      author: "dr. Farida Husna",
      date: "18 Apr 2025",
      readTime: "4 menit",
      featured: false,
    },
  ];

  // Filter artikel berdasarkan tab yang aktif
  const filteredArticles =
    activeTab === "all"
      ? healthArticles
      : activeTab === "featured"
      ? healthArticles.filter((article) => article.featured)
      : healthArticles.filter((article) => article.category === activeTab);

  // Batasi jumlah artikel yang ditampilkan jika showAllArticles false
  const displayedArticles = showAllArticles
    ? filteredArticles
    : filteredArticles.slice(0, 3);

  // Mengatur artikel featured di bagian atas
  const featuredArticles = healthArticles.filter((article) => article.featured);
  const latestArticle = featuredArticles[0] || healthArticles[0];

  // Handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setShowAllArticles(false); // Reset ke tampilan awal (3 artikel) ketika tab berubah
  };

  return (
    <div className="w-full bg-white">
      {/* Hero Section dengan artikel unggulan */}
      <div className="relative bg-gradient-to-r from-green-50 to-green-100 py-16">
        <div className="container mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="w-full md:w-1/2 space-y-5">
              <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
                Artikel Unggulan
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-green-800 leading-tight">
                {latestArticle.title}
              </h1>
              <p className="text-gray-600 text-base text-justify">
                {latestArticle.excerpt}
              </p>

              <div className="flex items-center gap-5 text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                  <User size={16} className="text-green-600" />
                  <span>{latestArticle.author}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar size={16} className="text-green-600" />
                  <span>{latestArticle.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={16} className="text-green-600" />
                  <span>{latestArticle.readTime}</span>
                </div>
              </div>

              <button className="mt-4 inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300">
                Baca Selengkapnya
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="w-full md:w-1/2">
              <div className="relative overflow-hidden rounded-xl shadow-lg">
                <img
                  src={latestArticle.image}
                  alt={latestArticle.title}
                  className="w-full h-64 md:h-96 object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-green-900/70 to-transparent p-6">
                  <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-md">
                    {latestArticle.category.charAt(0).toUpperCase() +
                      latestArticle.category.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Artikel Kesehatan */}
      <div className="container mx-auto py-16 px-6 md:px-10 lg:px-16">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-3">
              Artikel Kesehatan Terbaru
            </h2>
            <p className="text-gray-600 text-justify">
              Temukan informasi terkini untuk hidup sehat dan sejahtera
            </p>
          </div>

          <div className="mt-6 md:mt-0 relative">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Cari artikel..."
                className="w-full pl-10 pr-4 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <Search
                size={20}
                className="absolute left-3 top-2.5 text-white bg-amber-50"
              />
            </div>
          </div>
        </div>

        {/* Tabs kategori */}
        <div className="mb-10">
          <div className="flex flex-wrap gap-3">
            {[
              "all",
              "featured",
              "jantung",
              "nutrisi",
              "mental",
              "gaya-hidup",
              "penyakit",
              "lansia",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-green-50 text-green-600 hover:bg-green-100"
                }`}
              >
                {tab === "all"
                  ? "Semua"
                  : tab === "featured"
                  ? "Unggulan"
                  : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Grid artikel - menampilkan pesan jika tidak ada artikel */}
        {displayedArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white border border-green-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                onMouseEnter={() => setHoveredCardId(article.id)}
                onMouseLeave={() => setHoveredCardId(null)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className={`w-full h-52 object-cover transition-transform duration-500 ${
                      hoveredCardId === article.id ? "scale-105" : ""
                    }`}
                  />
                  <div className="absolute top-3 right-3">
                    <button className="p-2 bg-white/80 hover:bg-white rounded-full text-gray-700 hover:text-green-600 transition-colors duration-300">
                      <Heart size={18} />
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-green-900/70 to-transparent p-4">
                    <span className="bg-green-600 text-white text-xs px-2.5 py-1 rounded-md">
                      {article.category.charAt(0).toUpperCase() +
                        article.category.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-green-800 mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 text-justify">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-green-50">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-medium">
                        {article.author
                          .split(" ")
                          .map((name) => name[0])
                          .join("")}
                      </div>
                      <div className="text-xs text-gray-600">
                        <p className="font-medium">
                          {article.author.split(" ")[0]}
                        </p>
                        <p>{article.date}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock size={14} />
                      {article.readTime}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              Tidak ada artikel untuk kategori ini.
            </p>
          </div>
        )}

        {/* Tombol untuk melihat lebih banyak artikel */}
        {filteredArticles.length > 3 && !showAllArticles && (
          <div className="mt-16 text-center">
            <button
              onClick={() => setShowAllArticles(true)}
              className="inline-flex items-center gap-2 bg-white border-2 border-green-600 text-green-600 hover:bg-green-50 font-medium px-8 py-3 rounded-lg transition-all duration-300"
            >
              Lihat Semua Artikel ({filteredArticles.length})
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* Tombol untuk kembali ke tampilan terbatas */}
        {showAllArticles && (
          <div className="mt-16 text-center">
            <button
              onClick={() => setShowAllArticles(false)}
              className="inline-flex items-center gap-2 bg-white border-2 border-green-600 text-green-600 hover:bg-green-50 font-medium px-8 py-3 rounded-lg transition-all duration-300"
            >
              Tampilkan Lebih Sedikit
              <ArrowRight size={16} className="rotate-90" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
