"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { heroData, type HeroBanner } from "../../../data/heroData";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Icon components for better performance and type safety
const IconCheck = ({ className }: { className: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 20 20"
    aria-hidden="true"
    role="img"
    focusable="false"
  >
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

const IconShield = ({ className }: { className: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 20 20"
    aria-hidden="true"
    role="img"
    focusable="false"
  >
    <path
      fillRule="evenodd"
      d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

// Utility function for smooth scrolling with better UX
const smoothScrollTo = (targetId: string) => {
  try {
    const element = document.getElementById(targetId);
    if (element) {
      // Add small delay to account for any layout shifts
      setTimeout(() => {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest"
        });
      }, 100);
    } else {
      console.warn(`Element with ID "${targetId}" not found`);
    }
  } catch (error) {
    console.error("Error scrolling to element:", error);
  }
};

// Action handler for CTA buttons
const handleCTAClick = (
  action: HeroBanner["ctaPrimary"]["action"], 
  target?: string,
  analytics?: { event: string; category: string; label: string }
) => {
  // Analytics tracking (optional)
  if (analytics && typeof gtag !== 'undefined') {
    gtag('event', analytics.event, {
      event_category: analytics.category,
      event_label: analytics.label,
    });
  }

  switch (action) {
    case "scroll-to-contact":
      smoothScrollTo(target || "kontak");
      break;
    case "scroll-to-services":
      smoothScrollTo(target || "layanan");
      break;
    case "external-link":
      if (target) {
        window.open(target, "_blank", "noopener,noreferrer");
      }
      break;
    default:
      console.warn("Unknown CTA action:", action);
  }
};

// Icon renderer with type safety
const renderIcon = (iconType: HeroBanner["features"][0]["icon"], className: string) => {
  const iconMap = {
    check: IconCheck,
    shield: IconShield,
    users: IconCheck, // fallback
    heart: IconCheck, // fallback
    star: IconCheck,  // fallback
  };
  
  const IconComponent = iconMap[iconType] || IconCheck;
  return <IconComponent className={className} />;
};

const Hero = () => {
  const banners = heroData;

  return (
    <>
      {/* SEO structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(banners[0]?.seo.structuredData)
        }}
      />
      
      <section className="relative min-h-screen mt-[70px] overflow-hidden">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          pagination={{
            clickable: true,
            el: ".swiper-pagination-custom",
          }}
          autoplay={{
            delay: 8000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={banners.length > 1}
          className="h-screen"
          grabCursor={true}
          keyboard={{
            enabled: true,
            onlyInViewport: true,
          }}
          a11y={{
            prevSlideMessage: 'Slide sebelumnya',
            nextSlideMessage: 'Slide selanjutnya',
            paginationBulletMessage: 'Pergi ke slide {{index}}',
          }}
        >
          {banners.map((banner, index) => (
            <SwiperSlide key={banner.id}>
              <div className="relative h-full flex items-center">
                {/* Background Image with clean overlay */}
                <div className="absolute inset-0">
                  <Image
                    src={banner.image}
                    alt={banner.imageAlt}
                    fill
                    className="object-cover object-center"
                    sizes="100vw"
                    priority={index === 0}
                    quality={90}
                    placeholder="blur"
                  />
                  {/* Simplified professional overlay */}
                  {/* Dynamic Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-800/50 via-60% to-transparent" />
                {/* Subtle Pattern Overlay */}
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                  backgroundSize: '40px 40px'
                }}></div>
                </div>

                {/* Main content */}
                <div className="relative z-10 w-full">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-12 gap-12 items-center min-h-screen py-20">
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="lg:col-span-7 space-y-8 text-center lg:text-left"
                      >
                        {/* Clean badge */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3, duration: 0.6 }}
                          className="inline-flex items-center"
                        >
                          <div className="bg-green-600 text-white px-5 py-2.5 rounded-full text-sm font-medium shadow-lg">
                            <div className="flex items-center space-x-2.5">
                              <div className="w-2 h-2 bg-green-200 rounded-full"></div>
                              <span className="font-semibold">
                                {banner.subtitle}
                              </span>
                            </div>
                          </div>
                        </motion.div>

                        {/* Clean title */}
                        <motion.h1 className="space-y-2">
                          {banner.title.split(" ").map((word, wordIndex) => (
                            <motion.span
                              key={`${banner.id}-${wordIndex}`}
                              initial={{ opacity: 0, y: 30 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ 
                                delay: 0.5 + wordIndex * 0.08, 
                                duration: 0.7,
                                ease: "easeOut"
                              }}
                              className={`inline-block mr-4 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight ${
                                wordIndex === 1 || wordIndex === 2 
                                  ? "text-green-400" 
                                  : "text-white"
                              }`}
                              style={{
                                fontFamily: "'Inter', system-ui, sans-serif",
                                fontWeight: 700,
                                letterSpacing: '-0.01em'
                              }}
                            >
                              {word}
                            </motion.span>
                          ))}
                        </motion.h1>

                        {/* Clean description */}
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.1, duration: 0.8 }}
                          className="text-gray-200 text-lg lg:text-xl max-w-2xl leading-relaxed"
                          style={{
                            fontFamily: "'Inter', system-ui, sans-serif",
                            lineHeight: '1.6'
                          }}
                        >
                          {banner.description}
                        </motion.p>

                        {/* Professional CTA buttons */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.4, duration: 0.8 }}
                          className="flex flex-col sm:flex-row gap-4 pt-6"
                          role="group"
                          aria-label="Pilihan tindakan utama"
                        >
                          <button
                            onClick={() => handleCTAClick(
                              banner.ctaPrimary.action, 
                              banner.ctaPrimary.target,
                              { event: 'cta_click', category: 'hero', label: 'primary_cta' }
                            )}
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl focus:ring-4 focus:ring-green-500/50 focus:outline-none"
                            aria-label={banner.ctaPrimary.ariaLabel}
                          >
                            <span className="text-lg">
                              {banner.ctaPrimary.text}
                            </span>
                          </button>
                          <button
                            onClick={() => handleCTAClick(
                              banner.ctaSecondary.action, 
                              banner.ctaSecondary.target,
                              { event: 'cta_click', category: 'hero', label: 'secondary_cta' }
                            )}
                            className="bg-transparent border-2 border-white/80 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 focus:ring-4 focus:ring-white/30 focus:outline-none"
                            aria-label={banner.ctaSecondary.ariaLabel}
                          >
                            <span className="text-lg">
                              {banner.ctaSecondary.text}
                            </span>
                          </button>
                        </motion.div>

                        {/* Clean features */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.7, duration: 0.8 }}
                          className="flex flex-wrap gap-8 pt-8 justify-center lg:justify-start"
                          role="list"
                          aria-label="Keunggulan layanan kami"
                        >
                          {banner.features.map((feature, featureIndex) => (
                            <div 
                              key={`${banner.id}-feature-${featureIndex}`}
                              className="flex items-center text-white"
                              role="listitem"
                            >
                              <div className="w-10 h-10 rounded-lg bg-green-600/90 flex items-center justify-center mr-3 shadow-md">
                                {renderIcon(feature.icon, "h-5 w-5 text-white")}
                              </div>
                              <div>
                                <div className="text-base font-semibold text-white">
                                  {feature.title}
                                </div>
                                <div className="text-sm text-gray-300">
                                  {feature.subtitle}
                                </div>
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      </motion.div>

                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Clean navigation */}
        {banners.length > 1 && (
          <>
            <button 
              className="swiper-button-prev-custom absolute left-6 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all duration-200 shadow-lg focus:ring-4 focus:ring-white/30 focus:outline-none"
              aria-label="Slide sebelumnya"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button 
              className="swiper-button-next-custom absolute right-6 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all duration-200 shadow-lg focus:ring-4 focus:ring-white/30 focus:outline-none"
              aria-label="Slide selanjutnya"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            <div 
              className="swiper-pagination-custom absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20" 
              role="tablist"
              aria-label="Navigasi slide"
            />
          </>
        )}

        <style jsx global>{`
          .swiper-pagination-custom .swiper-pagination-bullet {
            width: 12px;
            height: 12px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            transition: all 0.3s ease;
            margin: 0 4px;
            cursor: pointer;
          }
          .swiper-pagination-custom .swiper-pagination-bullet-active {
            background: #2563eb;
            transform: scale(1.2);
          }
        `}</style>
      </section>
    </>
  );
};

export default Hero;