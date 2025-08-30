"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { heroData, type HeroBanner } from "../../../data/heroData";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Swiper as SwiperType } from "swiper";
import { useRouter } from "next/navigation";

// Import Swiper CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Types for better TypeScript support
interface DeviceType {
  type: "mobile" | "tablet" | "desktop";
  width: number;
}

interface CTAAnalytics {
  event: string;
  category: string;
  label: string;
}

// Google Analytics gtag function type
type GtagFunction = (
  command: "event",
  eventName: string,
  eventParams: {
    event_category: string;
    event_label: string;
  }
) => void;

// Icon components
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

// Custom hook for device detection
const useDeviceType = (): DeviceType => {
  const [device, setDevice] = useState<DeviceType>({
    type: "desktop",
    width: 1024,
  });

  const detectDevice = useCallback(() => {
    const width = window.innerWidth;
    let type: DeviceType["type"] = "desktop";

    if (width < 768) {
      type = "mobile";
    } else if (width < 1024) {
      type = "tablet";
    }

    setDevice({ type, width });
  }, []);

  useEffect(() => {
    detectDevice();

    let timeoutId: NodeJS.Timeout;
    const debouncedDetect = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(detectDevice, 150);
    };

    window.addEventListener("resize", debouncedDetect, { passive: true });

    return () => {
      window.removeEventListener("resize", debouncedDetect);
      clearTimeout(timeoutId);
    };
  }, [detectDevice]);

  return device;
};

// Smooth scroll function
const smoothScrollTo = (targetId: string): void => {
  const element = document.getElementById(targetId);
  if (!element) {
    console.warn(`Element with ID "${targetId}" not found`);
    return;
  }

  const headerOffset = 80;
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
};

// Icon renderer
const renderIcon = (
  iconType: HeroBanner["features"][0]["icon"],
  className: string
) => {
  const iconMap = {
    check: IconCheck,
    shield: IconShield,
    users: IconCheck,
    heart: IconCheck,
    star: IconCheck,
  } as const;

  const IconComponent = iconMap[iconType] || IconCheck;
  return <IconComponent className={className} />;
};

// Main Hero Component
const Hero = () => {
  const banners = heroData;
  const device = useDeviceType();
  const router = useRouter();
  const swiperRef = useRef<SwiperType | null>(null);

  // Enhanced CTA handler with proper Next.js routing
  const handleCTAClick = useCallback(
    (
      action: HeroBanner["ctaPrimary"]["action"],
      target?: string,
      analytics?: CTAAnalytics
    ): void => {
      // Analytics tracking
      if (analytics && typeof window !== "undefined" && "gtag" in window) {
        try {
          (window.gtag as GtagFunction)("event", analytics.event, {
            event_category: analytics.category,
            event_label: analytics.label,
          });
        } catch (error) {
          console.warn("Analytics tracking failed:", error);
        }
      }

      switch (action) {
        case "scroll-to-contact":
          if (target?.startsWith("/")) {
            // Navigate to page if target is a path
            router.push(target);
          } else {
            // Scroll to element if target is an ID
            smoothScrollTo(target || "kontak");
          }
          break;
        case "scroll-to-services":
          if (target?.startsWith("/")) {
            // Navigate to page if target is a path
            router.push(target);
          } else {
            // Scroll to element if target is an ID
            smoothScrollTo(target || "layanan");
          }
          break;
        case "external-link":
          if (target) {
            window.open(target, "_blank", "noopener,noreferrer");
          }
          break;
        default:
          console.warn("Unknown CTA action:", action);
      }
    },
    [router]
  );

  // Swiper navigation handlers
  const handlePrevSlide = useCallback(() => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  }, []);

  const handleNextSlide = useCallback(() => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  }, []);

  // Preload critical resources
  useEffect(() => {
    if (banners[0]?.image) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href =
        typeof banners[0].image === "string"
          ? banners[0].image
          : banners[0].image.src;
      document.head.appendChild(link);

      return () => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      };
    }
  }, [banners]);

  // Memoized configurations
  const autoplayConfig = useMemo(() => {
    const configs = {
      mobile: {
        delay: 6000,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
      },
      tablet: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      desktop: {
        delay: 4500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
    };
    return configs[device.type];
  }, [device.type]);

  const swiperConfig = useMemo(
    () => ({
      spaceBetween: 0,
      slidesPerView: 1 as const,
      speed: device.type === "mobile" ? 600 : 800,
      allowTouchMove: true,
      loop: banners.length > 1,
      grabCursor: true,
    }),
    [device.type, banners.length]
  );

  // Responsive styles
  const deviceStyles = useMemo(() => {
    const styles = {
      mobile: {
        overlay:
          "bg-gradient-to-b from-slate-900/90 via-slate-800/85 to-slate-900/90",
        titleSize: "text-3xl sm:text-4xl",
        descriptionSize: "text-base leading-snug",
        badgeSize: "px-4 py-2 text-sm font-medium",
        buttonSize: "px-5 py-2.5 text-sm font-medium",
        iconSize: "w-7 h-7",
        iconInnerSize: "h-4 w-4",
        containerPadding: "px-4 sm:px-6",
        contentPadding: "py-10 sm:py-14",
        sectionSpacing: "space-y-4",
        buttonSpacing: "gap-3",
        featureSpacing: "gap-4",
        maxContentWidth: "max-w-sm mx-auto",
      },
      tablet: {
        overlay:
          "bg-gradient-to-r from-slate-900/85 via-slate-800/60 via-60% to-slate-900/50",
        titleSize: "text-4xl md:text-5xl",
        descriptionSize: "text-lg leading-snug",
        badgeSize: "px-5 py-2.5 text-base font-medium",
        buttonSize: "px-6 py-3 text-base font-medium",
        iconSize: "w-8 h-8",
        iconInnerSize: "h-5 w-5",
        containerPadding: "px-6 lg:px-8",
        contentPadding: "py-14 lg:py-18",
        sectionSpacing: "space-y-6",
        buttonSpacing: "gap-4",
        featureSpacing: "gap-5",
        maxContentWidth: "max-w-2xl mx-auto lg:mx-0",
      },
      desktop: {
        overlay:
          "bg-gradient-to-r from-slate-900/80 via-slate-800/45 via-65% to-transparent",
        titleSize: "text-4xl lg:text-5xl xl:text-6xl",
        descriptionSize: "text-lg lg:text-xl leading-7",
        badgeSize: "px-5 py-2.5 text-sm font-medium",
        buttonSize: "px-6 py-3 text-base font-medium",
        iconSize: "w-8 h-8 lg:w-9 lg:h-9",
        iconInnerSize: "h-5 w-5",
        containerPadding: "px-6 lg:px-8 xl:px-12 2xl:px-16",
        contentPadding: "py-16 lg:py-20 xl:py-24",
        sectionSpacing: "space-y-8 lg:space-y-10",
        buttonSpacing: "gap-4",
        featureSpacing: "gap-6",
        maxContentWidth: "max-w-4xl",
      },
    };
    return styles[device.type];
  }, [device.type]);

  // Error boundary fallback
  if (!banners || banners.length === 0) {
    return (
      <section className="relative min-h-screen mt-[70px] overflow-hidden flex items-center justify-center bg-slate-900">
        <div className="text-white text-center px-4">
          <h1 className="text-2xl font-bold mb-4">Content Unavailable</h1>
          <p>Hero content is currently unavailable. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* SEO structured data */}
      {banners[0]?.seo?.structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(banners[0].seo.structuredData),
          }}
        />
      )}

      <section className="relative min-h-screen mt-[70px] overflow-hidden">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          {...swiperConfig}
          pagination={{
            clickable: true,
            el: ".swiper-pagination-custom",
            dynamicBullets: device.type === "mobile",
            dynamicMainBullets: 3,
          }}
          autoplay={autoplayConfig}
          className="h-screen"
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          keyboard={{
            enabled: device.type !== "mobile",
            onlyInViewport: true,
          }}
          mousewheel={{
            enabled: device.type === "desktop",
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
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={banner.image}
                    alt={banner.imageAlt}
                    fill
                    className="object-cover object-center"
                    sizes="100vw"
                    priority={index === 0}
                    quality={device.type === "mobile" ? 75 : 90}
                  />

                  {/* Overlay */}
                  <div className={`absolute inset-0 ${deviceStyles.overlay}`} />
                </div>

                {/* Content */}
                <div className="relative z-10 w-full">
                  <div
                    className={`max-w-7xl mx-auto ${deviceStyles.containerPadding}`}
                  >
                    <div
                      className={`grid grid-cols-1 ${
                        device.type === "desktop" ? "lg:grid-cols-12" : ""
                      } gap-6 lg:gap-12 items-center min-h-screen ${
                        deviceStyles.contentPadding
                      }`}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`col-span-1 ${
                          device.type === "desktop"
                            ? "lg:col-span-8 xl:col-span-7"
                            : ""
                        } ${deviceStyles.sectionSpacing} ${
                          deviceStyles.maxContentWidth
                        }`}
                      >
                        {/* Badge */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3, duration: 0.6 }}
                          className="inline-flex items-center"
                        >
                          <div
                            className={`bg-green-600 text-white rounded-full shadow-lg ${deviceStyles.badgeSize}`}
                          >
                            <div className="flex items-center space-x-2">
                              <div className="bg-green-200 rounded-full w-2 h-2" />
                              <span className="font-semibold">
                                {banner.subtitle}
                              </span>
                            </div>
                          </div>
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                          className={`font-bold leading-tight text-white ${deviceStyles.titleSize}`}
                          style={{
                            fontFamily: "'Inter', system-ui, sans-serif",
                            fontWeight: 700,
                            letterSpacing: "-0.025em",
                          }}
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
                              className={`inline-block mr-3 ${
                                word.includes("Kesehatan") ||
                                word.includes("Nyaman") ||
                                word.includes("Anda")
                                  ? "text-green-400"
                                  : "text-white"
                              }`}
                            >
                              {word}
                            </motion.span>
                          ))}
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.1, duration: 0.8 }}
                          className={`text-gray-200 ${deviceStyles.descriptionSize}`}
                        >
                          {device.type === "mobile" &&
                          banner.description.length > 150
                            ? `${banner.description.substring(0, 150)}...`
                            : banner.description}
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.4, duration: 0.8 }}
                          className={`flex ${deviceStyles.buttonSpacing} ${
                            device.type === "mobile"
                              ? "flex-col"
                              : "flex-col sm:flex-row"
                          }`}
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
                            className={`bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl focus:ring-4 focus:ring-green-500/50 focus:outline-none ${deviceStyles.buttonSize} w-full sm:w-auto`}
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
                            className={`bg-transparent border-2 border-white/80 hover:bg-white/10 active:bg-white/20 text-white font-semibold rounded-lg transition-all duration-200 focus:ring-4 focus:ring-white/30 focus:outline-none ${deviceStyles.buttonSize} w-full sm:w-auto`}
                            aria-label={banner.ctaSecondary.ariaLabel}
                          >
                            {banner.ctaSecondary.text}
                          </button>
                        </motion.div>

                        {/* Features */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.7, duration: 0.8 }}
                          className={`flex ${deviceStyles.featureSpacing} ${
                            device.type === "mobile" ? "flex-col" : "flex-wrap"
                          }`}
                        >
                          {banner.features.map((feature, featureIndex) => (
                            <div
                              key={`${banner.id}-feature-${featureIndex}`}
                              className="flex items-center text-white"
                            >
                              <div
                                className={`rounded-lg bg-green-600/90 flex items-center justify-center mr-3 shadow-md flex-shrink-0 ${deviceStyles.iconSize}`}
                              >
                                {renderIcon(
                                  feature.icon,
                                  `text-white ${deviceStyles.iconInnerSize}`
                                )}
                              </div>
                              <div>
                                <div className="font-semibold text-white text-sm">
                                  {feature.title}
                                </div>
                                <div className="text-gray-300 text-xs">
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

        {/* Navigation Controls */}
        {banners.length > 1 && (
          <>
            {/* Navigation buttons */}
            {device.type !== "mobile" && (
              <>
                <button
                  onClick={handlePrevSlide}
                  className={`absolute top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 active:bg-white/40 transition-all duration-200 shadow-lg focus:ring-4 focus:ring-white/30 focus:outline-none ${
                    device.type === "tablet"
                      ? "left-4 w-10 h-10"
                      : "left-6 lg:left-8 w-12 h-12"
                  }`}
                  aria-label="Slide sebelumnya"
                >
                  <svg
                    className="text-white w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
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
                  onClick={handleNextSlide}
                  className={`absolute top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 active:bg-white/40 transition-all duration-200 shadow-lg focus:ring-4 focus:ring-white/30 focus:outline-none ${
                    device.type === "tablet"
                      ? "right-4 w-10 h-10"
                      : "right-6 lg:right-8 w-12 h-12"
                  }`}
                  aria-label="Slide selanjutnya"
                >
                  <svg
                    className="text-white w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </>
            )}

            {/* Pagination dots */}
            <div
              className={`swiper-pagination-custom absolute left-1/2 transform -translate-x-1/2 z-20 ${
                device.type === "mobile" ? "bottom-6" : "bottom-8"
              }`}
            />
          </>
        )}

        {/* Enhanced CSS */}
        <style jsx global>{`
          .swiper-pagination-custom .swiper-pagination-bullet {
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            transition: all 0.3s ease;
            cursor: pointer;
            opacity: 1;
            width: 12px;
            height: 12px;
            margin: 0 4px;
          }

          .swiper-pagination-custom .swiper-pagination-bullet-active {
            background: #16a34a;
            transform: scale(1.2);
            box-shadow: 0 0 0 2px rgba(22, 163, 74, 0.3);
          }

          @media (max-width: 767px) {
            .swiper-pagination-custom .swiper-pagination-bullet {
              width: 10px;
              height: 10px;
              margin: 0 3px;
            }
          }

          @media (hover: hover) {
            .swiper-pagination-custom .swiper-pagination-bullet:hover {
              background: rgba(255, 255, 255, 0.8);
              transform: scale(1.1);
            }
          }
        `}</style>
      </section>
    </>
  );
};

export default Hero;
