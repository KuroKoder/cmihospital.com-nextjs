"use client";

import { useState, useEffect } from "react";
import { Play, ExternalLink, Heart, MessageCircle, Share } from "lucide-react";

const VideoSection = () => {
  const [selectedPlatform, setSelectedPlatform] = useState("youtube");
  const [loadedEmbeds, setLoadedEmbeds] = useState({});

  // Video data organized by platform
  const videoData = {
    youtube: [
      {
        id: "8QgiBelEExY",
        title: "CMI Hospital - Video 1",
        embedUrl:
          "https://www.youtube.com/embed/8QgiBelEExY?si=I4222tBEqTMYe843",
        thumbnail: `https://img.youtube.com/vi/8QgiBelEExY/maxresdefault.jpg`,
      },
      {
        id: "C--B4DJnnG4",
        title: "CMI Hospital - Video 2",
        embedUrl:
          "https://www.youtube.com/embed/C--B4DJnnG4?si=LAKKm7N5Z9x0VEX7",
        thumbnail: `https://img.youtube.com/vi/C--B4DJnnG4/maxresdefault.jpg`,
      },
      {
        id: "mgRVbOLoibE",
        title: "CMI Hospital - Video 3",
        embedUrl:
          "https://www.youtube.com/embed/mgRVbOLoibE?si=MkdUhaxxbfY-VVHu",
        thumbnail: `https://img.youtube.com/vi/mgRVbOLoibE/maxresdefault.jpg`,
      },
    ],
    instagram: [
      {
        id: "DKmU5XASoZR",
        url: "https://www.instagram.com/p/DKmU5XASoZR/",
        account: "@detakjantungcmi",
      },
      {
        id: "DNe3AsRTy_p",
        url: "https://www.instagram.com/p/DNe3AsRTy_p/",
        account: "@cmihospitals",
      },
      {
        id: "DNe3oUDzy_z",
        url: "https://www.instagram.com/p/DNe3oUDzy_z/",
        account: "@cmihospitals",
      },
      {
        id: "DNe4LAKTtZv",
        url: "https://www.instagram.com/p/DNe4LAKTtZv/",
        account: "@cmihospitals",
      },
    ],
    tiktok: [
      {
        id: "7525036994892795141",
        account: "@cmihospitals",
        description:
          "Kanker, gagal ginjal, diabetes dan gagal jantung sembuh tanpa operasi #EnergiKuatTiapLangkah",
        url: "https://www.tiktok.com/@cmihospitals/video/7525036994892795141",
      },
      {
        id: "7504162498694679813",
        account: "@cmihospitals",
        description: "CMI Hospital Content",
        url: "https://www.tiktok.com/@cmihospitals/video/7504162498694679813",
      },
      {
        id: "7533549583578696968",
        account: "@detakjantungcmi",
        description: "Jantung Kita Content",
        url: "https://www.tiktok.com/@detakjantungcmi/video/7533549583578696968",
      },
    ],
  };

  // Load Instagram embed script
  useEffect(() => {
    if (selectedPlatform === "instagram" && !window.instgrm) {
      const script = document.createElement("script");
      script.src = "//www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        if (window.instgrm) {
          window.instgrm.Embeds.process();
        }
      };
    }
  }, [selectedPlatform]);

  // Load TikTok embed script
  useEffect(() => {
    if (
      selectedPlatform === "tiktok" &&
      !document.querySelector('script[src="https://www.tiktok.com/embed.js"]')
    ) {
      const script = document.createElement("script");
      script.src = "https://www.tiktok.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [selectedPlatform]);

  const handleVideoLoad = (videoId) => {
    setLoadedEmbeds((prev) => ({ ...prev, [videoId]: true }));
  };

  const PlatformTabs = () => (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {[
        {
          key: "youtube",
          label: "YouTube",
          icon: "📺",
          color: "bg-red-500 hover:bg-red-600",
        },
        {
          key: "instagram",
          label: "Instagram",
          icon: "📸",
          color:
            "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
        },
        {
          key: "tiktok",
          label: "TikTok",
          icon: "🎵",
          color: "bg-black hover:bg-gray-800",
        },
      ].map((platform) => (
        <button
          key={platform.key}
          onClick={() => setSelectedPlatform(platform.key)}
          className={`px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg ${
            selectedPlatform === platform.key
              ? `${platform.color} scale-105 shadow-xl`
              : "bg-gray-400 hover:bg-gray-500"
          }`}
        >
          <span className="mr-2">{platform.icon}</span>
          {platform.label}
        </button>
      ))}
    </div>
  );

  const YouTubeVideo = ({ video, index }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
      <div className="relative aspect-video">
        {!loadedEmbeds[video.id] && (
          <div
            className="absolute inset-0 bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center cursor-pointer group"
            onClick={() => handleVideoLoad(video.id)}
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-600 transition-colors">
                <Play className="w-8 h-8 text-white ml-1" />
              </div>
              <p className="text-red-700 font-medium">Click to load video</p>
            </div>
          </div>
        )}
        {loadedEmbeds[video.id] && (
          <iframe
            width="100%"
            height="100%"
            src={video.embedUrl}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0"
          />
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2">{video.title}</h3>
        <div className="flex items-center justify-between">
          <span className="text-sm text-red-600 font-medium">YouTube</span>
          <ExternalLink className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </div>
  );

  const InstagramPost = ({ post, index }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
      <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4 mx-auto">
            <span className="text-2xl">📸</span>
          </div>
          <p className="text-gray-600 mb-4">Instagram Post</p>
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all"
          >
            View on Instagram
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2">{post.account}</h3>
        <div className="flex items-center justify-between">
          <span className="text-sm bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent font-medium">
            Instagram
          </span>
          <div className="flex gap-3 text-gray-400">
            <Heart className="w-4 h-4" />
            <MessageCircle className="w-4 h-4" />
            <Share className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );

  const TikTokVideo = ({ video, index }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
      <div className="aspect-[9/16] max-h-96 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center relative">
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4 mx-auto">
            <span className="text-2xl">🎵</span>
          </div>
          <p className="text-white mb-4 text-sm">{video.account}</p>
          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-all"
          >
            Watch on TikTok
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 text-sm line-clamp-2">
          {video.description}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-sm text-black font-medium">TikTok</span>
          <span className="text-xs text-gray-500">{video.account}</span>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    const data = videoData[selectedPlatform];

    switch (selectedPlatform) {
      case "youtube":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((video, index) => (
              <YouTubeVideo key={video.id} video={video} index={index} />
            ))}
          </div>
        );

      case "instagram":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.map((post, index) => (
              <InstagramPost key={post.id} post={post} index={index} />
            ))}
          </div>
        );

      case "tiktok":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.map((video, index) => (
              <TikTokVideo key={video.id} video={video} index={index} />
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Social Media
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Follow our journey across different platforms and stay updated with
            our latest content
          </p>
        </div>

        {/* Platform Tabs */}
        <PlatformTabs />

        {/* Content */}
        <div className="animate-fadeIn">{renderContent()}</div>

        {/* Stats */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-red-500">
                {videoData.youtube.length}+
              </div>
              <div className="text-gray-600">YouTube Videos</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                {videoData.instagram.length}+
              </div>
              <div className="text-gray-600">Instagram Posts</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-black">
                {videoData.tiktok.length}+
              </div>
              <div className="text-gray-600">TikTok Videos</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default VideoSection;
