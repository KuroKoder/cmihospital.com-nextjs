"use client";
import { useState, useEffect } from "react";
import {
  Play,
  Instagram,
  Video,
  Calendar,
  Eye,
  Heart,
  Share2,
  ExternalLink,
} from "lucide-react";

const SocialMediaVideosSection = () => {
  const [activeTab, setActiveTab] = useState("youtube");
  const [loading, setLoading] = useState(false);

  // Load social media embed scripts when component mounts
  useEffect(() => {
    setLoading(true);

    const loadTikTokEmbedScript = () => {
      if (
        document.querySelector('script[src="https://www.tiktok.com/embed.js"]')
      )
        return;
      const script = document.createElement("script");
      script.src = "https://www.tiktok.com/embed.js";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    };

    const loadInstagramEmbedScript = () => {
      if (
        document.querySelector(
          'script[src="https://www.instagram.com/embed.js"]'
        )
      )
        return;
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    };

    // Simulate loading delay for better UX
    setTimeout(() => {
      if (activeTab === "tiktok") {
        loadTikTokEmbedScript();
      } else if (activeTab === "instagram") {
        loadInstagramEmbedScript();
      }
      setLoading(false);
    }, 300);
  }, [activeTab]);

  const socialMediaContent = {
    youtube: [
      {
        id: "KG0h1W_c3yQ",
        title:
          "Konsultasi Kesehatan Jantung Bersama Dr. Anita - Tips Pencegahan Penyakit Kardiovaskular",
        description:
          "Pelajari cara menjaga kesehatan jantung dengan tips dari ahli kardiologi terpercaya di Klinik CMI.",
        views: "2.5K",
        duration: "12:45",
        publishedAt: "2 hari yang lalu",
        category: "Kesehatan Jantung",
      },
      {
        id: "dQw4w9WgXcQ",
        title:
          "10 Tips Hidup Sehat dari Dokter Spesialis - Panduan Lengkap Gaya Hidup Sehat",
        description:
          "Dapatkan panduan lengkap untuk menjalani gaya hidup sehat dari tim dokter spesialis Klinik CMI.",
        views: "1.8K",
        duration: "15:30",
        publishedAt: "5 hari yang lalu",
        category: "Gaya Hidup Sehat",
      },
      {
        id: "6dTvSa1AGYk",
        title:
          "Layanan Medical Check-up Terlengkap di Klinik Utama CMI - Deteksi Dini Penyakit",
        description:
          "Kenali berbagai layanan medical check-up unggulan untuk deteksi dini berbagai penyakit.",
        views: "3.2K",
        duration: "8:20",
        publishedAt: "1 minggu yang lalu",
        category: "Medical Check-up",
      },
    ],
    instagram: [
      {
        id: "CvmcJTuSPSy",
        title: "Informasi Terbaru COVID-19 dan Protokol Kesehatan",
        caption:
          "Update terbaru mengenai protokol kesehatan COVID-19 dari tim medis profesional Klinik CMI. Tetap jaga kesehatan dan ikuti anjuran medis.",
        likes: "345",
        comments: "28",
        publishedAt: "3 hari yang lalu",
        hashtags: [
          "#COVID19",
          "#ProtocolKesehatan",
          "#KlinikCMI",
          "#InfoKesehatan",
        ],
      },
      {
        id: "CvkdP3IS1sR",
        title: "Seminar Kesehatan: Mencegah Penyakit Jantung Sejak Dini",
        caption:
          "Bergabunglah dalam seminar kesehatan tentang pencegahan penyakit jantung. Dapatkan tips dari dokter spesialis jantung terbaik.",
        likes: "289",
        comments: "15",
        publishedAt: "1 minggu yang lalu",
        hashtags: [
          "#SeminarKesehatan",
          "#PenyakitJantung",
          "#PrevensiKesehatan",
          "#KlinikCMI",
        ],
      },
      {
        id: "CvhbTruSdS9",
        title: "Pentingnya Medical Check-up Rutin untuk Kesehatan Optimal",
        caption:
          "Jangan tunggu sakit untuk memeriksakan kesehatan. Medical check-up rutin adalah kunci hidup sehat dan berkualitas. #KesehatanPrioritas",
        likes: "421",
        comments: "32",
        publishedAt: "2 minggu yang lalu",
        hashtags: [
          "#MedicalCheckup",
          "#KesehatanRutin",
          "#HidupSehat",
          "#KlinikCMI",
        ],
      },
    ],
    tiktok: [
      {
        id: "7351694667903192327",
        username: "cmitv_grsetra",
        title: "5 Tips Sehat Menjalani Puasa Ramadhan",
        caption:
          "5 TIPS SEHAT SELAMA PUASA RAMADHAN - Panduan dari dokter untuk tetap sehat selama berpuasa",
        views: "15.2K",
        likes: "892",
        shares: "124",
        publishedAt: "4 hari yang lalu",
        tags: [
          "CMI",
          "RAMADHAN",
          "PUASA",
          "RSJANTUNG",
          "RSKANKER",
          "RSGINJAL",
          "RSDIABETES",
          "FYP",
        ],
      },
      {
        id: "7350123456789012345",
        username: "cmitv_grsetra",
        title: "Tips Menjaga Kesehatan Mental di Era Digital",
        caption:
          "Tips praktis menjaga kesehatan mental selama pandemi dari psikolog klinis berpengalaman",
        views: "8.7K",
        likes: "456",
        shares: "67",
        publishedAt: "1 minggu yang lalu",
        tags: ["CMI", "KESEHATAN", "MENTAL", "PANDEMI", "WELLNESS"],
      },
      {
        id: "7349876543210987654",
        username: "cmitv_grsetra",
        title: "7 Langkah Sederhana Hidup Sehat Setiap Hari",
        caption:
          "Langkah-langkah mudah yang bisa diterapkan sehari-hari untuk hidup lebih sehat dan bahagia",
        views: "12.4K",
        likes: "723",
        shares: "98",
        publishedAt: "2 minggu yang lalu",
        tags: ["CMI", "SEHAT", "GAYAHIDUP", "TIPS", "WELLNESS"],
      },
    ],
  };

  type TabButtonProps = {
    name: string;
    icon: React.ReactNode;
    active: boolean;
    count: number;
  };

  const TabButton = ({ name, icon, active, count }: TabButtonProps) => (
    <button
      onClick={() => setActiveTab(name)}
      className={`group flex items-center justify-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
        active
          ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg shadow-green-200"
          : "bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg border border-gray-100"
      }`}
      aria-label={`Lihat konten ${name}`}
      role="tab"
      aria-selected={active}
    >
      <span
        className={`transition-colors ${
          active ? "text-white" : "group-hover:scale-110"
        }`}
      >
        {icon}
      </span>
      <div className="flex flex-col items-start">
        <span className="font-semibold text-sm">
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </span>
        <span
          className={`text-xs ${active ? "text-green-100" : "text-gray-500"}`}
        >
          {count} konten
        </span>
      </div>
    </button>
  );

  const LoadingCard = () => (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md animate-pulse">
      <div className="aspect-video bg-gray-200"></div>
      <div className="p-6">
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
      </div>
    </div>
  );

  const renderYouTubeContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {socialMediaContent.youtube.map((video, index) => (
        <article
          key={video.id}
          className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          itemScope
          itemType="https://schema.org/VideoObject"
        >
          <div className="relative aspect-video group">
            <iframe
              src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
              loading={index > 2 ? "lazy" : "eager"}
              title={video.title}
              aria-label={`Video: ${video.title}`}
            />
            <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
              {video.duration}
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full">
                {video.category}
              </span>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Calendar size={12} />
                {video.publishedAt}
              </span>
            </div>
            <h3
              className="font-bold text-gray-800 mb-2 line-clamp-2 hover:text-green-600 transition-colors"
              itemProp="name"
            >
              {video.title}
            </h3>
            <p
              className="text-sm text-gray-600 mb-4 line-clamp-2"
              itemProp="description"
            >
              {video.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Eye size={14} />
                  {video.views} views
                </span>
              </div>
              <a
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700 transition-colors flex items-center gap-1 text-sm font-medium"
                aria-label={`Tonton ${video.title} di YouTube`}
              >
                Tonton
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );

  const renderInstagramContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {socialMediaContent.instagram.map((post, index) => (
        <article
          key={post.id}
          className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          itemScope
          itemType="https://schema.org/SocialMediaPosting"
        >
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center">
                <Instagram size={24} className="text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Klinik Utama CMI</h4>
                <p className="text-sm text-gray-500">{post.publishedAt}</p>
              </div>
            </div>

            <h3
              className="font-bold text-gray-800 mb-3 line-clamp-2"
              itemProp="headline"
            >
              {post.title}
            </h3>

            <p className="text-gray-700 mb-4 line-clamp-3" itemProp="text">
              {post.caption}
            </p>

            <div className="flex flex-wrap gap-1 mb-4">
              {post.hashtags.map((tag, i) => (
                <span
                  key={i}
                  className="text-green-600 text-sm hover:text-green-700 cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Heart size={14} />
                  {post.likes}
                </span>
                <span className="flex items-center gap-1">
                  <Share2 size={14} />
                  {post.comments}
                </span>
              </div>
              <a
                href={`https://www.instagram.com/p/${post.id}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-medium py-2 px-4 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-1"
                aria-label={`Lihat postingan ${post.title} di Instagram`}
              >
                Lihat Post
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );

  const renderTikTokContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {socialMediaContent.tiktok.map((post, index) => (
        <article
          key={post.id}
          className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          itemScope
          itemType="https://schema.org/VideoObject"
        >
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                <Video size={24} className="text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">@{post.username}</h4>
                <p className="text-sm text-gray-500">{post.publishedAt}</p>
              </div>
            </div>

            <h3
              className="font-bold text-gray-800 mb-3 line-clamp-2"
              itemProp="name"
            >
              {post.title}
            </h3>

            <p
              className="text-gray-700 mb-4 line-clamp-3"
              itemProp="description"
            >
              {post.caption}
            </p>

            <div className="flex flex-wrap gap-1 mb-4">
              {post.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full hover:bg-gray-200 cursor-pointer transition-colors"
                >
                  #{tag.toLowerCase()}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Eye size={14} />
                  {post.views}
                </span>
                <span className="flex items-center gap-1">
                  <Heart size={14} />
                  {post.likes}
                </span>
              </div>
              <a
                href={`https://www.tiktok.com/@${post.username}/video/${post.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-gray-800 transition-all duration-300 flex items-center gap-1"
                aria-label={`Tonton ${post.title} di TikTok`}
              >
                Tonton
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <LoadingCard key={i} />
          ))}
        </div>
      );
    }

    switch (activeTab) {
      case "youtube":
        return renderYouTubeContent();
      case "instagram":
        return renderInstagramContent();
      case "tiktok":
        return renderTikTokContent();
      default:
        return null;
    }
  };

  return (
    <section
      className="bg-gradient-to-br from-gray-50 to-green-50 py-16 px-4"
      itemScope
      itemType="https://schema.org/WebPageElement"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h2
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
            itemProp="headline"
          >
            Konten Edukasi & Kegiatan{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-800">
              Klinik CMI
            </span>
          </h2>
          <p
            className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed"
            itemProp="description"
          >
            Dapatkan informasi kesehatan terpercaya, tips hidup sehat, dan
            update kegiatan terbaru dari tim medis profesional Klinik Utama CMI
            melalui berbagai platform digital kami.
          </p>
        </header>

        {/* Navigation Tabs */}
        <nav
          className="flex flex-wrap gap-4 justify-center mb-10"
          role="tablist"
        >
          <TabButton
            name="youtube"
            icon={<Play size={18} />}
            active={activeTab === "youtube"}
            count={socialMediaContent.youtube.length}
          />
          <TabButton
            name="instagram"
            icon={<Instagram size={18} />}
            active={activeTab === "instagram"}
            count={socialMediaContent.instagram.length}
          />
          <TabButton
            name="tiktok"
            icon={<Video size={18} />}
            active={activeTab === "tiktok"}
            count={socialMediaContent.tiktok.length}
          />
        </nav>

        {/* Content Area */}
        <main
          className="min-h-[400px]"
          role="tabpanel"
          aria-labelledby={`${activeTab}-tab`}
        >
          {renderContent()}
        </main>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6 text-sm">
            Ikuti untuk update terbaru
          </p>
          <div className="flex gap-3 justify-center">
            <a
              href="#"
              className="w-12 h-12 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-all duration-300 flex items-center justify-center hover:scale-105"
              aria-label="YouTube Klinik CMI"
            >
              <Play size={20} />
            </a>
            <a
              href="#"
              className="w-12 h-12 bg-pink-50 hover:bg-pink-100 text-pink-600 rounded-xl transition-all duration-300 flex items-center justify-center hover:scale-105"
              aria-label="Instagram Klinik CMI"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="w-12 h-12 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl transition-all duration-300 flex items-center justify-center hover:scale-105"
              aria-label="TikTok Klinik CMI"
            >
              <Video size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialMediaVideosSection;
