import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-r bg-green-600 text-white py-12 sm:py-16 lg:py-20 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        {/* SVG Dot Pattern */}
        <div 
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none'/%3E%3Ccircle cx='20' cy='20' r='2' fill='%23ffffff' fill-opacity='0.3'/%3E%3C/svg%3E")`
          }}
        />
        
        {/* Blurred Circle Overlays */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl animate-pulse delay-500" />
        
        {/* Additional Pattern Variations */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='none'/%3E%3Ccircle cx='30' cy='30' r='1' fill='%2310b981' fill-opacity='0.4'/%3E%3Ccircle cx='15' cy='15' r='0.8' fill='%23ffffff' fill-opacity='0.2'/%3E%3Ccircle cx='45' cy='15' r='0.6' fill='%2310b981' fill-opacity='0.3'/%3E%3Ccircle cx='15' cy='45' r='0.7' fill='%23ffffff' fill-opacity='0.25'/%3E%3Ccircle cx='45' cy='45' r='0.5' fill='%2310b981' fill-opacity='0.35'/%3E%3C/svg%3E")`
          }}
        />
        
        {/* Extra Blur Elements for Depth */}
        <div className="absolute top-32 right-1/4 w-64 h-64 bg-emerald-300/8 rounded-full blur-2xl animate-pulse delay-300" />
        <div className="absolute bottom-32 left-1/3 w-48 h-48 bg-white/6 rounded-full blur-2xl animate-pulse delay-700" />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-green-800/10 to-green-950/20" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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