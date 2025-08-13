"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { heroData, type HeroBanner } from "../../../data/heroData";
import { useState, useEffect } from "react";
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

// Device detection hook
const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );

  useEffect(() => {
    const detectDevice = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType("mobile");
      } else if (width < 1024) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };

    detectDevice();
    window.addEventListener("resize", detectDevice);
    return () => window.removeEventListener("resize", detectDevice);
  }, []);

  return deviceType;
};

// Utility function for smooth scrolling with better UX
const smoothScrollTo = (targetId: string) => {
  try {
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 70; // Offset for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
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
  if (analytics && typeof gtag !== "undefined") {
    gtag("event", analytics.event, {
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
const renderIcon = (
  iconType: HeroBanner["features"][0]["icon"],
  className: string
) => {
  const iconMap = {
    check: IconCheck,
    shield: IconShield,
    users: IconCheck, // fallback
    heart: IconCheck, // fallback
    star: IconCheck, // fallback
  };

  const IconComponent = iconMap[iconType] || IconCheck;
  return <IconComponent className={className} />;
};

const Hero = () => {
  const banners = heroData;
  const deviceType = useDeviceType();

  // Device-specific configurations
  const getAutoplayConfig = () => {
    switch (deviceType) {
      case "mobile":
        return {
          delay: 6000, // Slower on mobile for better readability
          disableOnInteraction: false,
          pauseOnMouseEnter: false, // No hover on mobile
          reverseDirection: false,
          stopOnLastSlide: false,
          waitForTransition: true,
        };
      case "tablet":
        return {
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          reverseDirection: false,
          stopOnLastSlide: false,
          waitForTransition: true,
        };
      default: // desktop
        return {
          delay: 4500, // Faster on desktop
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          reverseDirection: false,
          stopOnLastSlide: false,
          waitForTransition: true,
        };
    }
  };

  const getSwiperConfig = () => {
    const baseConfig = {
      spaceBetween: 0,
      slidesPerView: 1,
      speed: deviceType === "mobile" ? 600 : 800,
      allowTouchMove: true,
      preventInteractionOnTransition: false,
      grabCursor: true,
      touchRatio: 1,
      touchAngle: 45,
      longSwipesRatio: 0.5,
      longSwipesMs: 300,
    };

    return baseConfig;
  };

  return (
    <>
      {/* SEO structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(banners[0]?.seo.structuredData),
        }}
      />

      <section className="relative min-h-screen mt-[70px] overflow-hidden">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          {...getSwiperConfig()}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          pagination={{
            clickable: true,
            el: ".swiper-pagination-custom",
            dynamicBullets: deviceType === "mobile",
            dynamicMainBullets: 3,
          }}
          autoplay={{
            delay: getAutoplayConfig().delay,
            disableOnInteraction: false,
            pauseOnMouseEnter: deviceType !== "mobile",
          }}
          loop={banners.length > 1}
          className="h-screen"
          keyboard={{
            enabled: deviceType !== "mobile",
            onlyInViewport: true,
          }}
          mousewheel={{
            enabled: deviceType === "desktop",
            forceToAxis: true,
            thresholdDelta: 70,
          }}
          a11y={{
            prevSlideMessage: "Slide sebelumnya",
            nextSlideMessage: "Slide selanjutnya",
            paginationBulletMessage: "Pergi ke slide {{index}}",
          }}
        >
          {banners.map((banner, index) => (
            <SwiperSlide key={banner.id}>
              <div className="relative h-full flex items-center">
                {/* Background Image with device-optimized overlay */}
                <div className="absolute inset-0">
                  <Image
                    src={banner.image}
                    alt={banner.imageAlt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                    priority={index === 0}
                    quality={
                      deviceType === "mobile"
                        ? 75
                        : deviceType === "tablet"
                        ? 85
                        : 90
                    }
                    placeholder="blur"
                  />
                  {/* Device-specific overlays */}
                  {deviceType === "mobile" && (
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-slate-800/85 to-slate-900/95" />
                  )}
                  {deviceType === "tablet" && (
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-800/60 via-60% to-slate-900/40" />
                  )}
                  {deviceType === "desktop" && (
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-800/45 via-65% to-transparent" />
                  )}
                  {/* Subtle Pattern Overlay */}
                  <div
                    className={`absolute inset-0 ${
                      deviceType === "mobile" ? "opacity-5" : "opacity-10"
                    }`}
                    style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                      backgroundSize:
                        deviceType === "mobile" ? "30px 30px" : "40px 40px",
                    }}
                  ></div>
                </div>

                {/* Main content */}
                <div className="relative z-10 w-full">
                  <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
                    <div
                      className={`grid grid-cols-1 ${
                        deviceType === "desktop" ? "lg:grid-cols-12" : ""
                      } gap-6 sm:gap-8 lg:gap-12 items-center min-h-screen py-12 sm:py-16 lg:py-20`}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`col-span-1 ${
                          deviceType === "desktop"
                            ? "lg:col-span-8 xl:col-span-7"
                            : ""
                        } space-y-4 sm:space-y-6 lg:space-y-8 text-center ${
                          deviceType === "desktop" ? "lg:text-left" : ""
                        }`}
                      >
                        {/* Device-optimized badge */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3, duration: 0.6 }}
                          className="inline-flex items-center"
                        >
                          <div
                            className={`bg-green-600 text-white rounded-full font-medium shadow-lg ${
                              deviceType === "mobile"
                                ? "px-3 py-2 text-xs"
                                : deviceType === "tablet"
                                ? "px-4 py-2.5 text-sm"
                                : "px-5 py-2.5 text-sm"
                            }`}
                          >
                            <div
                              className={`flex items-center ${
                                deviceType === "mobile"
                                  ? "space-x-2"
                                  : "space-x-2.5"
                              }`}
                            >
                              <div
                                className={`bg-green-200 rounded-full ${
                                  deviceType === "mobile"
                                    ? "w-1.5 h-1.5"
                                    : "w-2 h-2"
                                }`}
                              ></div>
                              <span className="font-semibold">
                                {banner.subtitle}
                              </span>
                            </div>
                          </div>
                        </motion.div>

                        {/* Device-optimized title */}
                        <motion.h1
                          className={`${
                            deviceType === "mobile" ? "space-y-1" : "space-y-2"
                          }`}
                        >
                          {banner.title.split(" ").map((word, wordIndex) => (
                            <motion.span
                              key={`${banner.id}-${wordIndex}`}
                              initial={{ opacity: 0, y: 30 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                delay: 0.5 + wordIndex * 0.08,
                                duration: 0.7,
                                ease: "easeOut",
                              }}
                              className={`inline-block mr-2 sm:mr-3 lg:mr-4 font-bold leading-tight ${
                                wordIndex === 1 || wordIndex === 2
                                  ? "text-green-400"
                                  : "text-white"
                              } ${
                                deviceType === "mobile"
                                  ? "text-xl xs:text-2xl"
                                  : deviceType === "tablet"
                                  ? "text-3xl md:text-4xl"
                                  : "text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl"
                              }`}
                              style={{
                                fontFamily: "'Inter', system-ui, sans-serif",
                                fontWeight: 700,
                                letterSpacing: "-0.01em",
                              }}
                            >
                              {word}
                            </motion.span>
                          ))}
                        </motion.h1>

                        {/* Device-optimized description */}
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.1, duration: 0.8 }}
                          className={`text-gray-200 max-w-full leading-relaxed ${
                            deviceType === "mobile"
                              ? "text-sm px-2 lg:max-w-2xl"
                              : deviceType === "tablet"
                              ? "text-base lg:max-w-2xl px-0"
                              : "text-lg xl:text-xl lg:max-w-2xl px-0"
                          }`}
                          style={{
                            fontFamily: "'Inter', system-ui, sans-serif",
                            lineHeight: "1.6",
                          }}
                        >
                          {deviceType === "mobile"
                            ? banner.description.substring(0, 200) + "..."
                            : banner.description}
                        </motion.p>

                        {/* Device-optimized CTA buttons */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.4, duration: 0.8 }}
                          className={`flex gap-3 sm:gap-4 pt-4 sm:pt-6 ${
                            deviceType === "mobile"
                              ? "flex-col px-2"
                              : deviceType === "tablet"
                              ? "flex-col sm:flex-row px-0"
                              : "flex-col sm:flex-row px-0"
                          }`}
                          role="group"
                          aria-label="Pilihan tindakan utama"
                        >
                          <button
                            onClick={() =>
                              handleCTAClick(
                                banner.ctaPrimary.action,
                                banner.ctaPrimary.target,
                                {
                                  event: "cta_click",
                                  category: "hero",
                                  label: "primary_cta",
                                }
                              )
                            }
                            className={`bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl focus:ring-4 focus:ring-green-500/50 focus:outline-none w-full sm:w-auto ${
                              deviceType === "mobile"
                                ? "px-6 py-3.5 text-sm"
                                : deviceType === "tablet"
                                ? "px-7 py-3.5 text-base"
                                : "px-8 py-4 text-lg"
                            }`}
                            aria-label={banner.ctaPrimary.ariaLabel}
                          >
                            {banner.ctaPrimary.text}
                          </button>
                          <button
                            onClick={() =>
                              handleCTAClick(
                                banner.ctaSecondary.action,
                                banner.ctaSecondary.target,
                                {
                                  event: "cta_click",
                                  category: "hero",
                                  label: "secondary_cta",
                                }
                              )
                            }
                            className={`bg-transparent border-2 border-white/80 hover:bg-white/10 active:bg-white/20 text-white font-semibold rounded-lg transition-all duration-200 focus:ring-4 focus:ring-white/30 focus:outline-none w-full sm:w-auto ${
                              deviceType === "mobile"
                                ? "px-6 py-3.5 text-sm"
                                : deviceType === "tablet"
                                ? "px-7 py-3.5 text-base"
                                : "px-8 py-4 text-lg"
                            }`}
                            aria-label={banner.ctaSecondary.ariaLabel}
                          >
                            {banner.ctaSecondary.text}
                          </button>
                        </motion.div>

                        {/* Device-optimized features */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.7, duration: 0.8 }}
                          className={`flex gap-4 sm:gap-6 lg:gap-8 pt-6 sm:pt-8 ${
                            deviceType === "mobile"
                              ? "flex-col px-2 justify-center"
                              : deviceType === "tablet"
                              ? "flex-col sm:flex-row px-0 justify-center"
                              : "flex-col sm:flex-row px-0 justify-center lg:justify-start"
                          }`}
                          role="list"
                          aria-label="Keunggulan layanan kami"
                        >
                          {banner.features.map((feature, featureIndex) => (
                            <div
                              key={`${banner.id}-feature-${featureIndex}`}
                              className={`flex items-center text-white ${
                                deviceType === "mobile"
                                  ? "justify-center"
                                  : deviceType === "tablet"
                                  ? "justify-center sm:justify-start"
                                  : "justify-center lg:justify-start"
                              }`}
                              role="listitem"
                            >
                              <div
                                className={`rounded-lg bg-green-600/90 flex items-center justify-center mr-3 shadow-md flex-shrink-0 ${
                                  deviceType === "mobile"
                                    ? "w-8 h-8"
                                    : deviceType === "tablet"
                                    ? "w-9 h-9"
                                    : "w-10 h-10"
                                }`}
                              >
                                {renderIcon(
                                  feature.icon,
                                  `text-white ${
                                    deviceType === "mobile"
                                      ? "h-4 w-4"
                                      : "h-5 w-5"
                                  }`
                                )}
                              </div>
                              <div
                                className={`${
                                  deviceType === "mobile"
                                    ? "text-center"
                                    : "text-center sm:text-left"
                                }`}
                              >
                                <div
                                  className={`font-semibold text-white ${
                                    deviceType === "mobile"
                                      ? "text-sm"
                                      : "text-base"
                                  }`}
                                >
                                  {feature.title}
                                </div>
                                <div
                                  className={`text-gray-300 ${
                                    deviceType === "mobile"
                                      ? "text-xs"
                                      : "text-sm"
                                  }`}
                                >
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

        {/* Device-specific navigation */}
        {banners.length > 1 && (
          <>
            {/* Navigation buttons - adaptive visibility */}
            <button
              className={`swiper-button-prev-custom absolute top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 active:bg-white/40 transition-all duration-200 shadow-lg focus:ring-4 focus:ring-white/30 focus:outline-none ${
                deviceType === "mobile"
                  ? "hidden"
                  : deviceType === "tablet"
                  ? "left-3 w-10 h-10 sm:flex"
                  : "left-4 lg:left-6 w-11 h-11 lg:w-12 lg:h-12 sm:flex"
              }`}
              aria-label="Slide sebelumnya"
            >
              <svg
                className={`text-white ${
                  deviceType === "tablet" ? "w-4 h-4" : "w-5 h-5"
                }`}
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
              className={`swiper-button-next-custom absolute top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 active:bg-white/40 transition-all duration-200 shadow-lg focus:ring-4 focus:ring-white/30 focus:outline-none ${
                deviceType === "mobile"
                  ? "hidden"
                  : deviceType === "tablet"
                  ? "right-3 w-10 h-10 sm:flex"
                  : "right-4 lg:right-6 w-11 h-11 lg:w-12 lg:h-12 sm:flex"
              }`}
              aria-label="Slide selanjutnya"
            >
              <svg
                className={`text-white ${
                  deviceType === "tablet" ? "w-4 h-4" : "w-5 h-5"
                }`}
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

            {/* Pagination dots */}
            <div
              className={`swiper-pagination-custom absolute left-1/2 transform -translate-x-1/2 z-20 ${
                deviceType === "mobile" ? "bottom-4" : "bottom-6 sm:bottom-8"
              }`}
              role="tablist"
              aria-label="Navigasi slide"
            />
          </>
        )}

        <style jsx global>{`
          /* Base pagination styles */
          .swiper-pagination-custom .swiper-pagination-bullet {
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            transition: all 0.3s ease;
            cursor: pointer;
            opacity: 1;
          }

          .swiper-pagination-custom .swiper-pagination-bullet-active {
            background: #16a34a;
            transform: scale(1.2);
          }

          /* Mobile pagination */
          @media (max-width: 767px) {
            .swiper-pagination-custom .swiper-pagination-bullet {
              width: 8px;
              height: 8px;
              margin: 0 2px;
            }
            .swiper-pagination-custom .swiper-pagination-bullet-active {
              transform: scale(1.3);
            }
          }

          /* Tablet pagination */
          @media (min-width: 768px) and (max-width: 1023px) {
            .swiper-pagination-custom .swiper-pagination-bullet {
              width: 10px;
              height: 10px;
              margin: 0 3px;
            }
          }

          /* Desktop pagination */
          @media (min-width: 1024px) {
            .swiper-pagination-custom .swiper-pagination-bullet {
              width: 12px;
              height: 12px;
              margin: 0 4px;
            }
          }

          /* Mobile optimizations */
          @media (max-width: 767px) {
            .min-h-screen {
              min-height: 100vh;
              min-height: 100dvh;
            }

            .swiper-slide {
              padding-top: env(safe-area-inset-top);
              padding-bottom: env(safe-area-inset-bottom);
            }
          }

          /* Touch and interaction optimizations */
          .swiper {
            touch-action: pan-y;
          }

          @media (max-width: 767px) {
            .swiper {
              touch-action: pan-x;
            }
          }

          /* Performance optimizations */
          @media (prefers-reduced-motion: reduce) {
            .swiper-pagination-custom .swiper-pagination-bullet,
            .swiper-button-prev-custom,
            .swiper-button-next-custom {
              transition: none;
            }
          }

          /* High DPI optimizations */
          @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
            .swiper-pagination-custom .swiper-pagination-bullet {
              box-shadow: 0 0 0 0.5px rgba(255, 255, 255, 0.2);
            }
          }

          /* Extra small screens */
          @media (max-width: 374px) {
            .swiper-pagination-custom .swiper-pagination-bullet {
              width: 6px;
              height: 6px;
              margin: 0 1.5px;
            }
          }

          /* Large desktop optimizations */
          @media (min-width: 1440px) {
            .swiper-pagination-custom .swiper-pagination-bullet {
              width: 14px;
              height: 14px;
              margin: 0 5px;
            }
          }

          /* Dark mode support */
          @media (prefers-color-scheme: dark) {
            .swiper-pagination-custom .swiper-pagination-bullet {
              background: rgba(255, 255, 255, 0.4);
            }
          }
        `}</style>
      </section>
    </>
  );
};

export default Hero;
