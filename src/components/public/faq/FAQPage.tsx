"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Search,
  Play,
  Users,
  Building,
} from "lucide-react";
import {
  faqData,
  videoData,
  faqPageContent,
  FAQ,
  VideoContent,
} from "@/data/faqData";
import CTA from "@/components/ui/cta";
import Image from "next/image";
interface VideoPlayerProps {
  video: VideoContent;
  className?: string;
}

const VideoPlayer = ({ video, className = "" }: VideoPlayerProps) => {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden shadow-xl ${className}`}
    >
      <div className="aspect-video bg-gradient-to-br from-green-100 to-green-200">
        <iframe
          src={`https://www.youtube.com/embed/${video.videoId}?rel=0&modestbranding=1&showinfo=0&fs=1&cc_load_policy=0&iv_load_policy=3&autohide=0&controls=1`}
          title={video.title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          sandbox="allow-scripts allow-same-origin allow-presentation allow-popups allow-popups-to-escape-sandbox"
        />
      </div>
    </div>
  );
};

interface FAQItemProps {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem = ({ faq, isOpen, onToggle }: FAQItemProps) => {
  return (
    <div className="bg-white border border-green-100 rounded-2xl mb-4 shadow-sm hover:shadow-lg transition-all duration-300">
      <button
        className="w-full px-4 py-4 sm:px-6 sm:py-5 text-left flex justify-between items-center hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-inset rounded-2xl transition-colors"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 pr-3 sm:pr-4">
          {faq.question}
        </h3>
        <div className="flex-shrink-0 bg-green-100 rounded-full p-2">
          {isOpen ? (
            <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
          ) : (
            <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
          )}
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-4 sm:px-6 sm:py-5 border-t border-green-50 bg-green-25">
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
            {faq.answer}
          </p>
          {faq.imageUrl && (
            <div className="mt-4">
              <Image
                src={faq.imageUrl}
                alt="Alur penanganan"
                width={800} // Set appropriate width
                height={600} // Set appropriate height
                className="max-w-full h-auto rounded-xl shadow-md"
                style={{ width: "auto", height: "auto" }} // Maintain aspect ratio
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const FAQPage = () => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(["1"]));
  const [searchTerm, setSearchTerm] = useState("");

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const filteredFAQs = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 pt-16 sm:pt-20 md:pt-28">
      {/* Enhanced Hero Section with Background Decorations */}
      <section className="relative bg-gradient-to-br from-green-500 via-green-600 to-green-700 text-white py-12 sm:py-16 md:py-20 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0">
          {/* Pattern Overlay */}
          <div
            className="absolute inset-0 opacity-70"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none'/%3E%3Ccircle cx='20' cy='20' r='2' fill='%23ffffff' fill-opacity='0.3'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Floating Blur Elements */}
          <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-32 h-32 sm:w-72 sm:h-72 bg-white/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-48 h-48 sm:w-96 sm:h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-white/5 rounded-full blur-3xl animate-pulse delay-500" />

          {/* Additional Pattern Variations */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='none'/%3E%3Ccircle cx='30' cy='30' r='1' fill='%2310b981' fill-opacity='0.4'/%3E%3Ccircle cx='15' cy='15' r='0.8' fill='%23ffffff' fill-opacity='0.2'/%3E%3Ccircle cx='45' cy='15' r='0.6' fill='%2310b981' fill-opacity='0.3'/%3E%3Ccircle cx='15' cy='45' r='0.7' fill='%23ffffff' fill-opacity='0.25'/%3E%3Ccircle cx='45' cy='45' r='0.5' fill='%2310b981' fill-opacity='0.35'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Extra Blur Elements for Depth */}
          <div className="absolute top-16 sm:top-32 right-1/4 w-24 h-24 sm:w-48 sm:h-48 bg-emerald-300/8 rounded-full blur-2xl animate-pulse delay-300" />
          <div className="absolute bottom-16 sm:bottom-32 left-1/3 w-20 h-20 sm:w-40 sm:h-40 bg-white/6 rounded-full blur-2xl animate-pulse delay-700" />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-green-600/10 to-green-800/20" />

          {/* Additional opacity overlay for better text readability */}
          <div className="absolute inset-0 bg-black opacity-10"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center z-10">
          <div className="inline-flex items-center bg-green-500 bg-opacity-20 rounded-full px-4 py-2 sm:px-6 sm:py-3 mb-6 sm:mb-8">
            <span className="text-xs sm:text-sm font-medium">
              FAQ Sobat CMI
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            {faqPageContent.header.title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
            {faqPageContent.header.subtitle}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Search Section */}
        <div className="mb-8 sm:mb-12">
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 sm:h-6 sm:w-6 text-green-500" />
            </div>
            <input
              type="text"
              placeholder="Cari pertanyaan yang ingin Anda ketahui..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 sm:pl-12 sm:pr-6 sm:py-4 bg-white border-2 border-green-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 outline-none text-sm sm:text-lg placeholder-gray-500 shadow-sm transition-all"
            />
          </div>
        </div>

        {/* FAQ Grid */}
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 mb-16 sm:mb-20">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isOpen={openItems.has(faq.id)}
                onToggle={() => toggleItem(faq.id)}
              />
            ))
          ) : (
            <div className="lg:col-span-2 text-center py-12 sm:py-16">
              <div className="bg-green-100 rounded-full w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Search className="w-8 h-8 sm:w-12 sm:h-12 text-green-500" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
                Tidak ada hasil ditemukan
              </h3>
              <p className="text-sm sm:text-base text-gray-500">
                Coba ubah kata kunci pencarian Anda atau hubungi kami langsung
              </p>
            </div>
          )}
        </div>

        {/* Video Section */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 mb-12 sm:mb-16 shadow-xl">
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center bg-green-100 rounded-full px-4 py-2 sm:px-6 sm:py-3 mb-4 sm:mb-6">
              <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-600" />
              <span className="text-xs sm:text-sm font-semibold text-green-700">
                Company Profile
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
              {faqPageContent.videoSection.title}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              {faqPageContent.videoSection.subtitle}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <VideoPlayer video={videoData.mainVideo} />
            <div className="mt-6 sm:mt-8 text-center">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
                {videoData.mainVideo.title}
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                {videoData.mainVideo.description}
              </p>
            </div>
          </div>
        </div>

        {/* Additional Videos */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 text-center">
            {faqPageContent.additionalVideosTitle}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {videoData.additionalVideos.map((video, index) => (
              <div
                key={video.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <VideoPlayer video={video} />
                <div className="p-4 sm:p-6">
                  <div className="flex items-center mb-2 sm:mb-3">
                    {index === 0 ? (
                      <Users className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2" />
                    ) : (
                      <Building className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2" />
                    )}
                    <h3 className="font-bold text-gray-800 text-base sm:text-lg">
                      {video.title}
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {video.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <CTA
          title={faqPageContent.contact.title}
          subtitle={faqPageContent.contact.subtitle}
          primaryButtonText={faqPageContent.contact.buttons.primary}
          secondaryButtonText={faqPageContent.contact.buttons.secondary}
          className="mb-8"
        />
      </div>
    </div>
  );
};

export default FAQPage;
