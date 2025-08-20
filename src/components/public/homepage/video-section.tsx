"use client";
import { useState } from "react";
import {
  Play,
  Video,
  Calendar,
  ExternalLink,
  Heart,
  Instagram,
} from "lucide-react";

// ---------- Types ----------
interface YouTubeVideo {
  id: string;
  title: string;
  embedUrl: string;
  publishedAt: string;
  category: string;
  keywords?: string[];
}

// ---------- Data ----------
const FEATURED_VIDEO: YouTubeVideo = {
  id: "8QgiBelEExY",
  title: "Testimoni Pasien Klinik Utama CMI",
  embedUrl: "https://www.youtube.com/embed/8QgiBelEExY?si=I4222tBEqTMYe843",
  publishedAt: "2024-08-10",
  category: "Terapi Jantung",
  keywords: [
    "terapi jantung",
    "tanpa operasi",
    "Ibn Sina Formula",
    "CMI Hospital",
    "pengobatan alami",
  ],
};

const SOCIAL_LINKS = {
  youtube: "https://www.youtube.com/@Klinik-Utama-CMI",
  instagram: "https://www.instagram.com/cmihospital.official/",
  tiktok: "https://www.tiktok.com/@cmihospitals",
};

// ---------- Social Media Button ----------
const SocialButton = ({
  url,
  icon: Icon,
  label,
  color,
}: {
  platform: string;
  url: string;
  icon: React.ComponentType<{ size: number }>;
  label: string;
  color: string;
}) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg ${color} group relative overflow-hidden`}
    aria-label={`Kunjungi ${label} CMI Hospital untuk konten kesehatan terbaru`}
  >
    <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
    <Icon size={18} />
    <span className="text-sm font-semibold relative z-10">{label}</span>
    <div className="opacity-70 group-hover:opacity-100 relative z-10">
      <ExternalLink size={12} />
    </div>
  </a>
);

// ---------- Video Player ----------
const VideoPlayer = ({ video }: { video: YouTubeVideo }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500">
      <div className="aspect-video relative">
        <iframe
          src={`${video.embedUrl}&autoplay=0`}
          className="w-full h-full"
          frameBorder="0"
          allowFullScreen
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          loading="lazy"
        />
      </div>

      {/* Video Info */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
          <Calendar size={14} />
          <time dateTime={video.publishedAt}>
            {new Date(video.publishedAt).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-3 leading-tight line-clamp-2">
          {video.title}
        </h2>
        <a
          href={`https://www.youtube.com/watch?v=${video.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 group"
          aria-label="Tonton video lengkap di YouTube"
        >
          Tonton di YouTube
          <div className="group-hover:translate-x-0.5 transition-transform duration-200">
            <ExternalLink size={14} />
          </div>
        </a>
      </div>
    </div>
  );
};

// ---------- Main Component ----------
const SocialMediaVideosSection = () => {
  return (
    <>
      {/* SEO Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: FEATURED_VIDEO.title,
            uploadDate: FEATURED_VIDEO.publishedAt,
            embedUrl: FEATURED_VIDEO.embedUrl,
            publisher: {
              "@type": "Organization",
              name: "CMI Hospital",
              url: "https://cmihospital.com",
            },
            keywords: FEATURED_VIDEO.keywords?.join(", "),
          }),
        }}
      />

      <section
        className="relative bg-white py-20 px-4 overflow-hidden"
        aria-labelledby="video-section-title"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Header */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                  <Heart size={16} />
                  Video Edukasi Kesehatan
                </div>

                <h1
                  id="video-section-title"
                  className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 leading-tight"
                >
                  Testimoni{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-green-700 to-green-800">
                    Kesembuhan
                  </span>{" "}
                  Nyata
                </h1>

                <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl">
                  Saksikan kesaksian pasien yang telah sembuh dengan metode
                  pengobatan{" "}
                  <strong className="text-green-700">Ibn Sina Formula</strong>{" "}
                  tanpa operasi. Spesialis Kanker, Diabetes, Gagal Ginjal &
                  Jantung.
                </p>
              </div>

              {/* CTA Text */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl border border-green-100">
                <h3 className="font-bold text-gray-800 mb-2">
                  🎯 Mengapa Pilih CMI Hospital?
                </h3>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• Metode pengobatan alami tanpa efek samping</li>
                  <li>• Pengalaman lebih dari 15 tahun</li>
                  <li>• Ribuan pasien telah merasakan kesembuhan</li>
                </ul>
              </div>
            </div>

            {/* Right Content - Video */}
            <div className="order-first lg:order-last">
              <VideoPlayer video={FEATURED_VIDEO} />
            </div>
          </div>

          {/* Social Media Section */}
          <div className="bg-white rounded-2xl p-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Ikuti Media Sosial Kami
              </h2>
              <p className="text-gray-600">
                Tips kesehatan dan testimoni kesembuhan
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-lg mx-auto">
              <SocialButton
                platform="youtube"
                url={SOCIAL_LINKS.youtube}
                icon={Play}
                label="YouTube"
                color="bg-red-600 hover:bg-red-700"
              />
              <SocialButton
                platform="instagram"
                url={SOCIAL_LINKS.instagram}
                icon={Instagram}
                label="Instagram"
                color="bg-purple-600 hover:bg-purple-700"
              />
              <SocialButton
                platform="tiktok"
                url={SOCIAL_LINKS.tiktok}
                icon={Video}
                label="TikTok"
                color="bg-gray-800 hover:bg-gray-900"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SocialMediaVideosSection;
