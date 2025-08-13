"use client";

import React from 'react';
import Link from 'next/link';

interface CTAProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonHref?: string;
  className?: string;
}

const CTA: React.FC<CTAProps> = ({
  title = "Wujudkan Kesembuhan Anda Bersama CMI",
  subtitle = "Bergabunglah dengan ribuan pasien yang telah merasakan kesembuhan melalui metode pengobatan alami kami",
  primaryButtonText = "Konsultasi Gratis",
  secondaryButtonText = "Hubungi Kami",
  primaryButtonHref = "/kontak",
  secondaryButtonHref = "/kontak",
  className = ""
}) => {
  return (
    <div className={`text-center ${className}`}>
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-3xl p-12 text-white relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-30" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='dots' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='20' cy='20' r='2' fill='rgba(255,255,255,0.1)'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23dots)' /%3E%3C/svg%3E")`
          }}
        ></div>
        
        <div className="relative">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {title}
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            {subtitle}
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Link 
              href={primaryButtonHref}
              className="inline-block bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-green-50 transition-colors duration-200 transform hover:scale-105 shadow-lg"
            >
              {primaryButtonText}
            </Link>
            <Link 
              href={secondaryButtonHref}
              className="inline-block border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-green-600 transition-colors duration-200 transform hover:scale-105"
            >
              {secondaryButtonText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;