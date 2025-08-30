// components/public/detailArticle/ArticleContent.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Share2, BookmarkPlus, Heart, List, AlertTriangle } from "lucide-react";
import { useTableOfContents } from "./TableOfContentGenerarator";

interface ArticleContentProps {
  content: string;
  title: string;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ content, title }) => {
  const [activeSection, setActiveSection] = useState<string>("");
  const [readingProgress, setReadingProgress] = useState(0);
  const [isSharing, setIsSharing] = useState(false);
  const [processedContent, setProcessedContent] = useState<string>("");

  // Use the custom hook to generate ToC
  const tocResult = useTableOfContents(content);

  // Process content to add anchor points
  useEffect(() => {
    if (!content || tocResult.items.length === 0) {
      setProcessedContent(content);
      return;
    }

    let processed = content;

    tocResult.items.forEach((item, index) => {
      if (item.type === "heading") {
        // Find and add ID to existing headings
        const headingRegex = new RegExp(
          `<h${item.level}([^>]*)>([^<]*${item.title
            .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
            .substring(0, 20)}[^<]*)</h${item.level}>`,
          "i"
        );
        processed = processed.replace(
          headingRegex,
          `<h${item.level} id="${item.id}"$1>$2</h${item.level}>`
        );
      } else {
        // For fallback/auto items, add invisible anchor points
        const searchText = item.title
          .substring(0, 15)
          .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const anchorRegex = new RegExp(`(${searchText}[^<]{0,20})`, "i");

        if (anchorRegex.test(processed)) {
          processed = processed.replace(
            anchorRegex,
            `<span id="${item.id}" class="toc-anchor"></span>$1`
          );
        } else {
          // If we can't find the text, add anchor at reasonable intervals
          const contentLength = processed.length;
          const position = Math.floor(
            (index / tocResult.items.length) * contentLength
          );
          const insertPoint = processed.indexOf(">", position);
          if (insertPoint !== -1) {
            processed =
              processed.slice(0, insertPoint + 1) +
              `<span id="${item.id}" class="toc-anchor"></span>` +
              processed.slice(insertPoint + 1);
          }
        }
      }
    });

    setProcessedContent(processed);
  }, [content, tocResult.items]);

  // Reading progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    if (tocResult.items.length === 0) return;

    const handleScroll = () => {
      const sections = tocResult.items
        .map((item) => {
          const element = document.getElementById(item.id);
          if (element) {
            const rect = element.getBoundingClientRect();
            return {
              id: item.id,
              offsetTop: window.scrollY + rect.top,
            };
          }
          return null;
        })
        .filter(Boolean);

      const currentScroll = window.scrollY + 150; // Offset for better UX

      let currentSection = "";
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && currentScroll >= sections[i]!.offsetTop) {
          currentSection = sections[i]!.id;
          break;
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tocResult.items]);

  const handleShare = async () => {
    if (isSharing) return;
    setIsSharing(true);

    try {
      if (navigator.share && typeof navigator.share === "function") {
        await navigator.share({
          title: title,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link artikel berhasil disalin!");
      }
    } catch (err) {
      if (!(err instanceof Error && err.name === "AbortError")) {
        console.error("Error sharing:", err);
        try {
          await navigator.clipboard.writeText(window.location.href);
          alert("Link artikel berhasil disalin!");
        } catch (clipboardErr) {
          console.error("Clipboard fallback failed:", clipboardErr);
          alert("Gagal membagikan artikel. Silakan coba lagi.");
        }
      }
    } finally {
      setIsSharing(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Get method display info
  const getMethodInfo = () => {
    switch (tocResult.method) {
      case "headings":
        return {
          icon: List,
          text: "Daftar Isi",
          color: "text-green-600",
          description: "Berdasarkan struktur artikel",
        };
      case "fallback":
        return {
          icon: List,
          text: "Bagian Utama",
          color: "text-blue-600",
          description: "Dibuat dari pola dalam artikel",
        };
      case "auto":
        return {
          icon: List,
          text: "Ringkasan Bagian",
          color: "text-green-600",
          description: "Dibuat otomatis dari isi artikel",
        };
      default:
        return null;
    }
  };

  const methodInfo = getMethodInfo();

  return (
    <div className="bg-white">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-green-600 transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Add CSS for anchor styling */}
      <style jsx>{`
        .toc-anchor {
          display: inline-block;
          position: relative;
          visibility: hidden;
        }
      `}</style>

      <div className="container mx-auto px-6 md:px-10 lg:px-16 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Table of Contents */}
            <aside className="hidden lg:block lg:w-80 lg:flex-shrink-0">
              {tocResult.items.length > 0 && methodInfo && (
                <div className="sticky top-32">
                  <div className="bg-gray-50 rounded-xl p-6 space-y-2">
                    <div className="flex items-center justify-between mb-4">
                      <h3
                        className={`text-lg font-semibold ${methodInfo.color} flex items-center`}
                      >
                        <methodInfo.icon className="w-4 h-4 mr-2" />
                        {methodInfo.text}
                      </h3>
                      {tocResult.confidence > 0 && (
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            tocResult.confidence >= 70
                              ? "bg-green-100 text-green-700"
                              : tocResult.confidence >= 40
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {tocResult.confidence}%
                        </span>
                      )}
                    </div>

                    {tocResult.method !== "headings" && (
                      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center text-blue-800">
                          <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span className="text-xs">
                            {methodInfo.description}
                          </span>
                        </div>
                      </div>
                    )}

                    <nav className="space-y-1">
                      {tocResult.items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => scrollToSection(item.id)}
                          className={`block text-left text-sm transition-all w-full p-3 rounded-lg group ${
                            activeSection === item.id
                              ? `${
                                  methodInfo.color
                                } bg-opacity-10 font-medium shadow-sm border-l-3 ${
                                  methodInfo.color.includes("green")
                                    ? "border-green-500"
                                    : methodInfo.color.includes("blue")
                                    ? "border-blue-500"
                                    : "border-purple-500"
                                }`
                              : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                          }`}
                          style={{
                            paddingLeft: `${Math.max(
                              12,
                              (item.level - 1) * 8 + 12
                            )}px`,
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="flex-1">{item.title}</span>
                            {item.type !== "heading" && (
                              <span className="text-xs opacity-60 ml-2 flex-shrink-0">
                                {item.type === "fallback"
                                  ? "📝"
                                  : item.type === "auto-generated"
                                  ? "🔍"
                                  : ""}
                              </span>
                            )}
                          </div>
                        </button>
                      ))}
                    </nav>

                    {/* ToC Stats */}
                    <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500">
                      <div className="flex justify-between">
                        <span>{tocResult.items.length} bagian</span>
                        <span>Metode: {tocResult.method}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </aside>

            {/* Main Content */}
            <article className="flex-1 min-w-0">
              {/* Mobile TOC */}
              {tocResult.items.length > 0 && methodInfo && (
                <div className="lg:hidden bg-gray-50 rounded-xl p-4 mb-8">
                  <details className="group">
                    <summary
                      className={`flex items-center justify-between cursor-pointer text-lg font-semibold ${methodInfo.color}`}
                    >
                      <span className="flex items-center">
                        <methodInfo.icon className="w-4 h-4 mr-2" />
                        {methodInfo.text}
                        <span
                          className={`ml-2 text-xs px-2 py-1 rounded-full ${
                            tocResult.confidence >= 70
                              ? "bg-green-100 text-green-700"
                              : tocResult.confidence >= 40
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {tocResult.confidence}%
                        </span>
                      </span>
                      <span className="transform group-open:rotate-180 transition-transform text-gray-400">
                        ▼
                      </span>
                    </summary>

                    {tocResult.method !== "headings" && (
                      <div className="mt-3 mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center text-blue-800">
                          <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span className="text-xs">
                            {methodInfo.description}
                          </span>
                        </div>
                      </div>
                    )}

                    <nav className="mt-4 space-y-1">
                      {tocResult.items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => scrollToSection(item.id)}
                          className="flex items-center justify-between text-left text-sm text-gray-600 hover:text-gray-800 w-full p-2 rounded-lg hover:bg-gray-100 transition-colors"
                          style={{
                            paddingLeft: `${Math.max(
                              8,
                              (item.level - 1) * 8 + 8
                            )}px`,
                          }}
                        >
                          <span className="flex-1">{item.title}</span>
                          {item.type !== "heading" && (
                            <span className="text-xs opacity-60 ml-2 flex-shrink-0">
                              {item.type === "fallback"
                                ? "📝"
                                : item.type === "auto-generated"
                                ? "🤖"
                                : ""}
                            </span>
                          )}
                        </button>
                      ))}
                    </nav>
                  </details>
                </div>
              )}

              {/* Article Content */}
              <div
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-900 prose-a:text-green-600 hover:prose-a:underline prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-blockquote:border-green-500 prose-blockquote:bg-green-50 prose-blockquote:text-green-800 prose-img:rounded-lg prose-img:shadow-md [&_*]:!text-gray-900"
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />

              {/* Article Footer Actions */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-center sm:text-left">
                      <p className="text-sm font-medium text-gray-900 mb-1">
                        Apakah artikel ini membantu Anda?
                      </p>
                      <p className="text-xs text-gray-500">
                        Berikan feedback untuk membantu kami meningkatkan
                        kualitas artikel
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => alert("Terima kasih atas like-nya!")}
                        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 group"
                      >
                        <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium">Suka</span>
                      </button>
                      <button
                        onClick={() => alert("Artikel berhasil disimpan!")}
                        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all duration-200 group"
                      >
                        <BookmarkPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium">Simpan</span>
                      </button>
                      <button
                        onClick={handleShare}
                        disabled={isSharing}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 group ${
                          isSharing
                            ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                            : "text-gray-600 hover:text-green-500 hover:bg-green-50"
                        }`}
                      >
                        <Share2
                          className={`w-4 h-4 transition-transform ${
                            isSharing
                              ? "animate-pulse"
                              : "group-hover:scale-110"
                          }`}
                        />
                        <span className="text-sm font-medium">
                          {isSharing ? "Membagikan..." : "Bagikan"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Medical Disclaimer */}
              <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">⚠️</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-yellow-900 mb-2">
                      Disclaimer Medis
                    </h3>
                    <p className="text-yellow-800 text-sm leading-relaxed">
                      Informasi dalam artikel ini bersifat edukatif dan tidak
                      menggantikan konsultasi medis profesional. Selalu
                      konsultasikan kondisi kesehatan Anda dengan dokter atau
                      tenaga medis yang qualified sebelum mengambil keputusan
                      terkait pengobatan atau perubahan gaya hidup.
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleContent;
