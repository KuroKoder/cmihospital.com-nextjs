// components/public/detailArticle/SocialShare.tsx
"use client";

import { useState, useEffect } from "react";
import { XMarkIcon, LinkIcon, ShareIcon } from "@heroicons/react/24/outline";

interface SocialShareButtonsProps {
  title: string;
  description: string;
  slug: string;
}

export default function SocialShareButtons({
  title,
  description,
  slug,
}: SocialShareButtonsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    setCurrentUrl(`${window.location.origin}/artikel-kesehatan/${slug}`);
  }, [slug]);

  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  const encodedUrl = encodeURIComponent(currentUrl);

  const shareLinks = [
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      color: "hover:bg-blue-600 hover:text-white",
      bgColor: "bg-blue-600",
    },
    {
      name: "Twitter",
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      color: "hover:bg-black hover:text-white",
      bgColor: "bg-black",
    },
    {
      name: "WhatsApp",
      url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
        </svg>
      ),
      color: "hover:bg-green-600 hover:text-white",
      bgColor: "bg-green-600",
    },
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      color: "hover:bg-blue-700 hover:text-white",
      bgColor: "bg-blue-700",
    },
    {
      name: "Telegram",
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      ),
      color: "hover:bg-blue-500 hover:text-white",
      bgColor: "bg-blue-500",
    },
    {
      name: "Email",
      url: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0ABaca selengkapnya di: ${encodedUrl}`,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      ),
      color: "hover:bg-gray-600 hover:text-white",
      bgColor: "bg-gray-600",
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = currentUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNativeShare = async () => {
    // Prevent concurrent share operations
    if (isSharing) {
      return;
    }

    // Check if native sharing is supported
    if (!navigator.share || typeof navigator.share !== "function") {
      return;
    }

    try {
      setIsSharing(true);

      await navigator.share({
        title: title,
        text: description,
        url: currentUrl,
      });

      setIsOpen(false);
    } catch (err: unknown) {
      // Handle AbortError (user cancelled) silently
      if (err instanceof Error && err.name === "AbortError") {
        console.log("User cancelled sharing");
      } else {
        console.error("Error sharing:", err);
        // Fallback to opening the share modal
        setIsOpen(true);
      }
    } finally {
      setIsSharing(false);
    }
  };

  // Check if native sharing is supported
  const isNativeShareSupported = () => {
    return (
      typeof navigator !== "undefined" &&
      "share" in navigator &&
      typeof navigator.share === "function"
    );
  };

  const handleShareButtonClick = () => {
    if (isNativeShareSupported()) {
      handleNativeShare();
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="relative">
      {/* Share Button - Add this to actually use the handleShareButtonClick function */}
      <button
        onClick={handleShareButtonClick}
        disabled={isSharing}
        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
      >
        <ShareIcon className="h-5 w-5" />
        <span>{isSharing ? "Berbagi..." : "Bagikan"}</span>
      </button>

      {/* Share Modal/Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-0 sm:right-0 sm:left-auto left-1/2 sm:transform-none -translate-x-1/2 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Bagikan Artikel</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Pilih platform untuk membagikan artikel ini
            </p>
          </div>

          {/* Social Links Grid */}
          <div className="p-6">
            <div className="grid grid-cols-3 gap-3 mb-6">
              {shareLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center p-4 rounded-xl border border-gray-200 text-gray-600 transition-all duration-200 hover:scale-105 hover:shadow-lg ${link.color}`}
                  onClick={() => setIsOpen(false)}
                >
                  <div className="mb-2">{link.icon}</div>
                  <span className="text-xs font-medium text-center">
                    {link.name}
                  </span>
                </a>
              ))}
            </div>

            {/* Copy Link Section */}
            <div className="pt-6 border-t border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Atau salin link artikel:
              </label>
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={currentUrl}
                    readOnly
                    className="w-full px-4 py-3 pr-10 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <LinkIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                <button
                  onClick={copyToClipboard}
                  className={`px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 min-w-[80px] ${
                    copied
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                  }`}
                >
                  {copied ? "✓ Tersalin!" : "Salin"}
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Artikel telah dibagikan</span>
                <span className="font-medium">127 kali</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-25"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
