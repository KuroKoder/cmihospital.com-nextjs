import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-green-900 to-green-800 text-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center lg:text-left max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            Tentang Kami
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl opacity-90 leading-relaxed">
            Mengenal lebih dekat perusahaan kami dan perjalanan kami dalam
            memberikan pelayanan kesehatan terbaik
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
