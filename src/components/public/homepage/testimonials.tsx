"use client";
import React, { useState, useEffect } from "react";
import { testimonials } from "../../../data/testimonials";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function MedicalTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoplay(false);
  };

  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, [isAutoplay]);

  const current = testimonials[currentIndex];

  return (
    <section className="relative h-[75vh] w-full overflow-hidden bg-gray-900">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={current.image}
          alt={current.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="w-full h-full object-cover 
                     object-[85%_20%] md:object-[right_10%]"
        />
        {/* Desktop: Left overlay, Mobile: Bottom overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent md:bg-gradient-to-r md:from-black/85 md:via-black/50 md:to-transparent lg:bg-gradient-to-r lg:from-black/90 lg:via-black/60 lg:to-black/20" />
        {/* Mobile specific bottom overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent md:hidden" />
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 group"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 group"
        aria-label="Next testimonial"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Main Content */}
      <div className="relative z-20 h-full flex flex-col justify-end md:justify-center px-6 lg:px-12 max-w-7xl mx-auto pb-24 md:pb-0">
        <div className="max-w-4xl">
          {/* Header Section */}
          <div className="mb-6 md:mb-8">
            <div className="inline-flex items-center gap-2 mb-3 md:mb-4">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-emerald-400 text-sm font-semibold tracking-wide uppercase">
                Klinik Utama CMI
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-3 md:mb-4 leading-tight">
              Cerita Pasien Kami
            </h1>

            <div className="w-16 md:w-24 h-1 bg-emerald-400 rounded-full" />
          </div>

          {/* Testimonial Content */}
          <div className="space-y-4 md:space-y-6">
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-sm font-medium rounded-full border border-emerald-400/30">
                Cerita #{current.tag}
              </span>
            </div>

            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight">
              {`"${current.title}"`}
            </h2>

            <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-emerald-400 rounded-full" />
                <span className="text-white font-medium">{current.name}</span>
              </div>
              <span className="text-gray-300 hidden md:inline">•</span>
              <span className="text-gray-300 text-sm md:text-base">
                {current.age} tahun
              </span>
              <span className="text-gray-300 hidden md:inline">•</span>
              <span className="text-emerald-300 text-sm md:text-base">
                {current.condition}
              </span>
            </div>

            <p className="text-gray-200 text-base md:text-lg leading-relaxed max-w-3xl">
              {current.story}
            </p>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-30">
        <div className="flex items-center space-x-2 md:space-x-3 px-3 md:px-4 py-2 bg-black/30 backdrop-blur-sm rounded-full border border-white/20">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "bg-emerald-400 scale-125 shadow-lg shadow-emerald-400/50"
                  : "bg-white/50 hover:bg-white/75 hover:scale-110"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-black/30 z-20">
        <div
          className="h-full bg-emerald-400 transition-all duration-300 ease-linear"
          style={{
            width: `${((currentIndex + 1) / testimonials.length) * 100}%`,
          }}
        />
      </div>
    </section>
  );
}
