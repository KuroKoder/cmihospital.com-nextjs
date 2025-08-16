"use client";

import { useState, useCallback, memo, Suspense } from "react";
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

// Enhanced Types with SEO data
interface VideoContent {
  id: string;
  title: string;
  description: string;
  views: string;
  duration: string;
  publishedAt: string;
  category: string;
  keywords: string[]; // SEO keywords
  thumbnail?: string; // For better loading
}

interface InstagramContent {
  id: string;
  title: string;
  caption: string;
  likes: string;
  comments: string;
  publishedAt: string;
  hashtags: string[];
  alt: string; // Alt text for accessibility
}

interface TikTokContent {
  id: string;
  username: string;
  title: string;
  caption: string;
  views: string;
  likes: string;
  shares: string;
  publishedAt: string;
  tags: string[];
  keywords: string[]; // SEO keywords
}

type TabName = "youtube" | "instagram" | "tiktok";
type SocialMediaData = {
  youtube: VideoContent[];
  instagram: InstagramContent[];
  tiktok: TikTokContent[];
};

// SEO-optimized content with more keywords
const SOCIAL_MEDIA_CONTENT: SocialMediaData = {
  youtube: [
    {
      id: "KG0h1W_c3yQ",
      title:
        "Konsultasi Kesehatan Jantung Bersama Dr. Anita - Tips Pencegahan Penyakit Kardiovaskular",
      description:
        "Pelajari cara menjaga kesehatan jantung dengan tips dari ahli kardiologi terpercaya di Klinik CMI. Mencakup diet sehat, olahraga, dan deteksi dini penyakit jantung.",
      views: "2.5K",
      duration: "12:45",
      publishedAt: "2 hari yang lalu",
      category: "Kesehatan Jantung",
      keywords: [
        "kesehatan jantung",
        "kardiologi",
        "pencegahan jantung",
        "diet jantung sehat",
        "dokter jantung bandung",
      ],
      thumbnail: "/images/articles/articlepage/jantung.png",
    },
    {
      id: "dQw4w9WgXcQ",
      title:
        "10 Tips Hidup Sehat dari Dokter Spesialis - Panduan Lengkap Gaya Hidup Sehat",
      description:
        "Dapatkan panduan lengkap untuk menjalani gaya hidup sehat dari tim dokter spesialis Klinik CMI. Tips nutrisi, olahraga, dan kesehatan mental.",
      views: "1.8K",
      duration: "15:30",
      publishedAt: "5 hari yang lalu",
      category: "Gaya Hidup Sehat",
      keywords: [
        "gaya hidup sehat",
        "tips sehat",
        "dokter spesialis",
        "nutrisi sehat",
        "kesehatan bandung",
      ],
      thumbnail: "/images/articles/articlepage/sarapan-sehat.png",
    },
    {
      id: "6dTvSa1AGYk",
      title:
        "Layanan Medical Check-up Terlengkap di Klinik Utama CMI - Deteksi Dini Penyakit",
      description:
        "Kenali berbagai layanan medical check-up unggulan untuk deteksi dini berbagai penyakit. Paket lengkap dengan teknologi terdepan.",
      views: "3.2K",
      duration: "8:20",
      publishedAt: "1 minggu yang lalu",
      category: "Medical Check-up",
      keywords: [
        "medical check up",
        "deteksi dini",
        "pemeriksaan kesehatan",
        "check up bandung",
        "skrining kesehatan",
      ],
      thumbnail: "/images/articles/articlepage/deteksi-kanker.png",
    },
  ],
  instagram: [
    {
      id: "CvmcJTuSPSy",
      title: "Informasi Terbaru COVID-19 dan Protokol Kesehatan",
      caption:
        "Update terbaru mengenai protokol kesehatan COVID-19 dari tim medis profesional Klinik CMI untuk menjaga kesehatan keluarga.",
      likes: "345",
      comments: "28",
      publishedAt: "3 hari yang lalu",
      hashtags: [
        "#COVID19",
        "#ProtocolKesehatan",
        "#KlinikCMI",
        "#InfoKesehatan",
        "#KesehatanKeluarga",
      ],
      alt: "Infografis protokol kesehatan COVID-19 dari Klinik CMI",
    },
    {
      id: "CvkdP3IS1sR",
      title: "Seminar Kesehatan: Mencegah Penyakit Jantung Sejak Dini",
      caption:
        "Bergabunglah dalam seminar kesehatan tentang pencegahan penyakit jantung dengan dokter spesialis kardiologi.",
      likes: "289",
      comments: "15",
      publishedAt: "1 minggu yang lalu",
      hashtags: [
        "#SeminarKesehatan",
        "#PenyakitJantung",
        "#PrevensiKesehatan",
        "#KlinikCMI",
        "#DokterSpesialis",
      ],
      alt: "Poster seminar kesehatan jantung di Klinik CMI",
    },
    {
      id: "CvhbTruSdS9",
      title: "Pentingnya Medical Check-up Rutin untuk Kesehatan Optimal",
      caption:
        "Medical check-up rutin adalah kunci hidup sehat dan berkualitas. Deteksi dini untuk pencegahan optimal.",
      likes: "421",
      comments: "32",
      publishedAt: "2 minggu yang lalu",
      hashtags: [
        "#MedicalCheckup",
        "#KesehatanRutin",
        "#HidupSehat",
        "#KlinikCMI",
        "#DeteksiDini",
      ],
      alt: "Infografis pentingnya medical check-up rutin",
    },
  ],
  tiktok: [
    {
      id: "7351694667903192327",
      username: "cmitv_grsetra",
      title: "5 Tips Sehat Menjalani Puasa Ramadhan",
      caption:
        "Panduan dari dokter untuk tetap sehat selama berpuasa dengan nutrisi yang tepat",
      views: "15.2K",
      likes: "892",
      shares: "124",
      publishedAt: "4 hari yang lalu",
      tags: ["CMI", "RAMADHAN", "PUASA", "RSJANTUNG", "RSKANKER"],
      keywords: [
        "puasa sehat",
        "ramadhan sehat",
        "tips puasa",
        "nutrisi puasa",
        "kesehatan ramadhan",
      ],
    },
    {
      id: "7350123456789012345",
      username: "cmitv_grsetra",
      title: "Tips Menjaga Kesehatan Mental di Era Digital",
      caption:
        "Tips praktis menjaga kesehatan mental dari psikolog klinis berpengalaman",
      views: "8.7K",
      likes: "456",
      shares: "67",
      publishedAt: "1 minggu yang lalu",
      tags: ["CMI", "KESEHATAN", "MENTAL", "WELLNESS"],
      keywords: [
        "kesehatan mental",
        "psikologi",
        "wellness",
        "mental health",
        "stress management",
      ],
    },
    {
      id: "7349876543210987654",
      username: "cmitv_grsetra",
      title: "7 Langkah Sederhana Hidup Sehat Setiap Hari",
      caption: "Langkah-langkah mudah untuk hidup lebih sehat dan bahagia",
      views: "12.4K",
      likes: "723",
      shares: "98",
      publishedAt: "2 minggu yang lalu",
      tags: ["CMI", "SEHAT", "GAYAHIDUP", "TIPS", "WELLNESS"],
      keywords: [
        "hidup sehat",
        "gaya hidup sehat",
        "tips kesehatan",
        "wellness tips",
        "kesehatan harian",
      ],
    },
  ],
};

const TAB_CONFIG = {
  youtube: {
    icon: Play,
    color: "red",
    label: "Video Edukasi YouTube",
    description: "Video edukasi kesehatan lengkap dari dokter spesialis",
  },
  instagram: {
    icon: Instagram,
    color: "pink",
    label: "Konten Instagram",
    description: "Tips kesehatan dan info terbaru dalam format visual menarik",
  },
  tiktok: {
    icon: Video,
    color: "gray",
    label: "Video TikTok",
    description: "Konten kesehatan singkat dan mudah dipahami",
  },
} as const;

// Enhanced Loading Component
const LoadingCard = memo(() => (
  <div
    className="bg-white rounded-2xl overflow-hidden shadow-md animate-pulse"
    aria-label="Memuat konten"
  >
    <div className="aspect-video bg-gray-200" />
    <div className="p-6">
      <div className="h-4 bg-gray-200 rounded mb-2" />
      <div className="h-3 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-1/2 mt-2" />
    </div>
  </div>
));

LoadingCard.displayName = "LoadingCard";

interface TabButtonProps {
  name: TabName;
  active: boolean;
  count: number;
  onClick: (name: TabName) => void;
}

const TabButton = memo(({ name, active, count, onClick }: TabButtonProps) => {
  const config = TAB_CONFIG[name];
  const { icon: Icon } = config;

  const handleClick = useCallback(() => {
    onClick(name);
  }, [name, onClick]);

  return (
    <button
      onClick={handleClick}
      className={`group flex items-center justify-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
        active
          ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg shadow-green-200"
          : "bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg border border-gray-100"
      }`}
      aria-label={`Lihat ${config.label} - ${count} konten tersedia`}
      role="tab"
      aria-selected={active}
      title={config.description}
    >
      <Icon
        size={18}
        className={`transition-colors ${
          active ? "text-white" : "group-hover:scale-110"
        }`}
      />
      <div className="flex flex-col items-start">
        <span className="font-semibold text-sm capitalize">{name}</span>
        <span
          className={`text-xs ${active ? "text-green-100" : "text-gray-500"}`}
        >
          {count} konten
        </span>
      </div>
    </button>
  );
});

TabButton.displayName = "TabButton";

// Enhanced YouTube Card with Schema
const YouTubeCard = memo(
  ({ video, priority }: { video: VideoContent; priority: boolean }) => {
    const videoSchema = {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: video.title,
      description: video.description,
      thumbnailUrl:
        video.thumbnail ||
        `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`,
      uploadDate: video.publishedAt,
      duration: `PT${video.duration.replace(":", "M")}S`,
      contentUrl: `https://www.youtube.com/watch?v=${video.id}`,
      embedUrl: `https://www.youtube.com/embed/${video.id}`,
      publisher: {
        "@type": "Organization",
        name: "Klinik Utama CMI",
      },
    };

    return (
      <article
        className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        itemScope
        itemType="https://schema.org/VideoObject"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
        />

        <div className="relative aspect-video group">
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
            className="w-full h-full"
            frameBorder="0"
            allowFullScreen
            loading={priority ? "eager" : "lazy"}
            title={video.title}
            itemProp="embedUrl"
          />
          <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
            {video.duration}
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full">
              {video.category}
            </span>
            <time
              className="text-xs text-gray-500 flex items-center gap-1"
              itemProp="uploadDate"
            >
              <Calendar size={12} />
              {video.publishedAt}
            </time>
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
          <div className="flex flex-wrap gap-1 mb-3">
            {video.keywords.slice(0, 3).map((keyword, i) => (
              <span
                key={i}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                itemProp="keywords"
              >
                {keyword}
              </span>
            ))}
          </div>
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
              aria-label={`Tonton video: ${video.title}`}
            >
              Tonton
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </article>
    );
  }
);

YouTubeCard.displayName = "YouTubeCard";

const InstagramCard = memo(({ post }: { post: InstagramContent }) => (
  <article
    className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    itemScope
    itemType="https://schema.org/SocialMediaPosting"
  >
    <div className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center">
          <Instagram size={24} className="text-white" aria-hidden="true" />
        </div>
        <div>
          <h4 className="font-bold text-gray-800" itemProp="author">
            Klinik Utama CMI
          </h4>
          <time className="text-sm text-gray-500" itemProp="datePublished">
            {post.publishedAt}
          </time>
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
      <div
        className="flex flex-wrap gap-1 mb-4"
        role="list"
        aria-label="Hashtag"
      >
        {post.hashtags.map((tag, i) => (
          <span
            key={i}
            className="text-green-600 text-sm hover:text-green-700 cursor-pointer"
            role="listitem"
            itemProp="keywords"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span
            className="flex items-center gap-1"
            itemProp="interactionStatistic"
          >
            <Heart size={14} />
            {post.likes}
          </span>
          <span className="flex items-center gap-1" itemProp="commentCount">
            <Share2 size={14} />
            {post.comments}
          </span>
        </div>
        <a
          href={`https://www.instagram.com/p/${post.id}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-medium py-2 px-4 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-1"
          aria-label={`Lihat post Instagram: ${post.title}`}
          itemProp="url"
        >
          Lihat Post
          <ExternalLink size={12} />
        </a>
      </div>
    </div>
  </article>
));

InstagramCard.displayName = "InstagramCard";

const TikTokCard = memo(({ post }: { post: TikTokContent }) => (
  <article
    className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    itemScope
    itemType="https://schema.org/VideoObject"
  >
    <div className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
          <Video size={24} className="text-white" aria-hidden="true" />
        </div>
        <div>
          <h4 className="font-bold text-gray-800" itemProp="creator">
            @{post.username}
          </h4>
          <time className="text-sm text-gray-500" itemProp="uploadDate">
            {post.publishedAt}
          </time>
        </div>
      </div>
      <h3 className="font-bold text-gray-800 mb-3 line-clamp-2" itemProp="name">
        {post.title}
      </h3>
      <p className="text-gray-700 mb-4 line-clamp-3" itemProp="description">
        {post.caption}
      </p>
      <div className="flex flex-wrap gap-1 mb-4" role="list" aria-label="Tags">
        {post.tags.map((tag, i) => (
          <span
            key={i}
            className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full hover:bg-gray-200 cursor-pointer transition-colors"
            role="listitem"
            itemProp="keywords"
          >
            #{tag.toLowerCase()}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1" itemProp="viewCount">
            <Eye size={14} />
            {post.views}
          </span>
          <span
            className="flex items-center gap-1"
            itemProp="interactionStatistic"
          >
            <Heart size={14} />
            {post.likes}
          </span>
        </div>
        <a
          href={`https://www.tiktok.com/@${post.username}/video/${post.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-gray-800 transition-all duration-300 flex items-center gap-1"
          aria-label={`Tonton video TikTok: ${post.title}`}
          itemProp="contentUrl"
        >
          Tonton
          <ExternalLink size={12} />
        </a>
      </div>
    </div>
  </article>
));

TikTokCard.displayName = "TikTokCard";

const SocialMediaVideosSection = () => {
  const [activeTab, setActiveTab] = useState<TabName>("youtube");

  const handleTabChange = useCallback((tab: TabName) => {
    setActiveTab(tab);
  }, []);

  const renderContent = useCallback(() => {
    const content = SOCIAL_MEDIA_CONTENT[activeTab];

    switch (activeTab) {
      case "youtube":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(content as VideoContent[]).map((video, index) => (
              <YouTubeCard key={video.id} video={video} priority={index < 3} />
            ))}
          </div>
        );
      case "instagram":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(content as InstagramContent[]).map((post) => (
              <InstagramCard key={post.id} post={post} />
            ))}
          </div>
        );
      case "tiktok":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(content as TikTokContent[]).map((post) => (
              <TikTokCard key={post.id} post={post} />
            ))}
          </div>
        );
      default:
        return null;
    }
  }, [activeTab]);

  // Schema for the entire section
  const sectionSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Konten Edukasi Kesehatan Klinik CMI",
    description:
      "Koleksi video edukasi, artikel, dan konten kesehatan dari dokter spesialis Klinik Utama CMI",
    numberOfItems: Object.values(SOCIAL_MEDIA_CONTENT).flat().length,
    itemListElement: Object.values(SOCIAL_MEDIA_CONTENT)
      .flat()
      .map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: item.title,
          description:
            "description" in item
              ? item.description
              : "caption" in item
              ? item.caption
              : "",
        },
      })),
  };

  return (
    <section
      className="bg-gradient-to-br from-gray-50 to-green-50 py-16 px-4"
      aria-labelledby="social-media-heading"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sectionSchema) }}
      />

      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1
            id="social-media-heading"
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
          >
            Konten Edukasi & Kegiatan{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-800">
              Klinik CMI
            </span>
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            Dapatkan informasi kesehatan terpercaya, tips hidup sehat, dan
            update kegiatan terbaru dari tim medis profesional Klinik Utama CMI
            melalui berbagai platform digital kami.
          </p>
        </header>

        <nav
          className="flex flex-wrap gap-4 justify-center mb-10"
          role="tablist"
          aria-label="Platform konten media sosial"
        >
          {Object.keys(TAB_CONFIG).map((tab) => {
            const tabName = tab as TabName;
            return (
              <TabButton
                key={tabName}
                name={tabName}
                active={activeTab === tabName}
                count={SOCIAL_MEDIA_CONTENT[tabName].length}
                onClick={handleTabChange}
              />
            );
          })}
        </nav>

        <main
          className="min-h-[400px]"
          role="tabpanel"
          aria-labelledby={`${activeTab}-tab`}
        >
          <Suspense
            fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 3 }).map((_, i) => (
                  <LoadingCard key={i} />
                ))}
              </div>
            }
          >
            {renderContent()}
          </Suspense>
        </main>
      </div>
    </section>
  );
};

export default SocialMediaVideosSection;
