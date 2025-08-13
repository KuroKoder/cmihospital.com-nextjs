'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Search, Play, Users, Building } from 'lucide-react';
import { faqData, videoData, faqPageContent, FAQ, VideoContent } from '@/data/faqData';
import CTA from '@/components/ui/cta';

interface VideoPlayerProps {
  video: VideoContent;
  className?: string;
}

const VideoPlayer = ({ video, className = "" }: VideoPlayerProps) => {
  return (
    <div className={`relative rounded-2xl overflow-hidden shadow-xl ${className}`}>
      <div className="aspect-video bg-gradient-to-br from-green-100 to-green-200">
        <iframe
          src={`https://www.youtube.com/embed/${video.videoId}`}
          title={video.title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
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
        className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-inset rounded-2xl transition-colors"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-semibold text-gray-800 pr-4">
          {faq.question}
        </h3>
        <div className="flex-shrink-0 bg-green-100 rounded-full p-2">
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-green-600" />
          ) : (
            <ChevronDown className="h-5 w-5 text-green-600" />
          )}
        </div>
      </button>
      
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-5 border-t border-green-50 bg-green-25">
          <p className="text-gray-700 leading-relaxed mb-4">
            {faq.answer}
          </p>
          {faq.imageUrl && (
            <div className="mt-4">
              <img
                src={faq.imageUrl}
                alt="Alur penanganan"
                className="max-w-full h-auto rounded-xl shadow-md"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const FAQPage = () => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(['1']));
  const [searchTerm, setSearchTerm] = useState('');

  const toggleItem = (id: string) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const filteredFAQs = faqData.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 pt-28">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-green-400 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-400 rounded-full opacity-15 blur-3xl"></div>
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center bg-green-500 bg-opacity-20 rounded-full px-6 py-3 mb-8">
            <span className="text-sm font-medium">FAQ Sobat CMI</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            {faqPageContent.header.title}
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
            {faqPageContent.header.subtitle}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Search Section */}
        <div className="mb-12">
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-green-500" />
            </div>
            <input
              type="text"
              placeholder="Cari pertanyaan yang ingin Anda ketahui..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white border-2 border-green-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 outline-none text-lg placeholder-gray-500 shadow-sm transition-all"
            />
          </div>
        </div>

        {/* FAQ Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-20">
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
            <div className="lg:col-span-2 text-center py-16">
              <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Tidak ada hasil ditemukan
              </h3>
              <p className="text-gray-500">
                Coba ubah kata kunci pencarian Anda atau hubungi kami langsung
              </p>
            </div>
          )}
        </div>

        {/* Video Section */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 mb-16 shadow-xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center bg-green-100 rounded-full px-6 py-3 mb-6">
              <Play className="w-5 h-5 mr-2 text-green-600" />
              <span className="text-sm font-semibold text-green-700">Video Tutorial</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {faqPageContent.videoSection.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {faqPageContent.videoSection.subtitle}
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <VideoPlayer video={videoData.mainVideo} />
            <div className="mt-8 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                {videoData.mainVideo.title}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                {videoData.mainVideo.description}
              </p>
            </div>
          </div>
        </div>

        {/* Additional Videos */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            {faqPageContent.additionalVideosTitle}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {videoData.additionalVideos.map((video, index) => (
              <div key={video.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <VideoPlayer video={video} />
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    {index === 0 ? (
                      <Users className="w-5 h-5 text-green-500 mr-2" />
                    ) : (
                      <Building className="w-5 h-5 text-green-500 mr-2" />
                    )}
                    <h3 className="font-bold text-gray-800 text-lg">
                      {video.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
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