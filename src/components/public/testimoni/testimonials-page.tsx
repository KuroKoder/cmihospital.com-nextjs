"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, Quote, Filter, Users, Heart, Award } from 'lucide-react';
import { testimonials, type Testimonial } from '@/data/testimonials';
import CTA from '@/components/ui/cta';

const TestimonialsPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  // Get unique tags for filtering
  const tags = ['All', ...Array.from(new Set(testimonials.map(t => t.tag)))];

  // Filter testimonials based on selected tag
  const filteredTestimonials = selectedFilter === 'All' 
    ? testimonials 
    : testimonials.filter(t => t.tag === selectedFilter);

  const stats = [
    { icon: Users, label: "Pasien Sembuh", value: "1000+" },
    { icon: Heart, label: "Tingkat Kesembuhan", value: "80%" },
    { icon: Award, label: "Pengalaman", value: "16+ Tahun" },
  ];

  const toggleExpanded = (id: number) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 pt-28">
      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-green-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='20' height='20' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 20 0 L 0 0 0 20' fill='none' stroke='rgba(255,255,255,0.03)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)' /%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Testimoni <span className="text-green-200">Pasien CMI</span>
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Kisah nyata kesembuhan pasien CMI
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <stat.icon className="w-8 h-8 text-green-200 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-green-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Filter className="w-5 h-5 text-green-600" />
          <span className="text-gray-700 font-medium mr-2">Filter:</span>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedFilter(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedFilter === tag
                  ? 'bg-green-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-green-600 border border-green-200 hover:bg-green-50 hover:border-green-300'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-green-100"
            >
              {/* Card Header */}
              <div className="relative bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
                <div className="absolute top-4 right-4">
                  <Quote className="w-6 h-6 text-green-200" />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/30">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div className="absolute inset-0 bg-white/20 rounded-full hidden items-center justify-center text-2xl font-bold text-white">
                      {testimonial.name.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{testimonial.name}</h3>
                    <p className="text-green-100 text-sm">{testimonial.age} tahun</p>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="inline-block bg-white/20 rounded-full px-3 py-1 text-xs font-medium">
                    {testimonial.tag}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <div className="mb-4">
                  <h4 className="font-bold text-lg text-gray-800 mb-2">
                    {testimonial.title}
                  </h4>
                  <p className="text-sm text-gray-600 font-medium">
                    {testimonial.condition}
                  </p>
                </div>

                <div className="relative">
                  <p className={`text-gray-700 leading-relaxed ${
                    expandedCard === testimonial.id ? '' : 'line-clamp-3'
                  }`}>
                    &quot;{testimonial.story}&quot;
                  </p>
                  
                  {testimonial.story.length > 150 && (
                    <button
                      onClick={() => toggleExpanded(testimonial.id)}
                      className="text-green-600 hover:text-green-700 font-medium text-sm mt-2 focus:outline-none"
                    >
                      {expandedCard === testimonial.id ? 'Tutup' : 'Baca Selengkapnya'}
                    </button>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center mt-6 pt-4 border-t border-gray-100">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">Sembuh Total</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <CTA className="mt-20" />
      </div>
    </div>
  );
};

export default TestimonialsPage;