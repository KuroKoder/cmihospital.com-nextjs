'use client';

import React, { useState } from 'react';
import { consultationSpecialists, getWhatsAppUrl, type ConsultationSpecialist } from '../../../data/consultationData';
import SpecialistModal from '../../ui/consultation-home'; import { Pill, HeartPulse, Syringe, 
  Stethoscope, 
  MessageCircle, 
  CheckCircle,
  Phone,
  Clock,
  ArrowRight,
  DnaOff,
  Users,
} from 'lucide-react';

const ConsultationPage: React.FC = () => {
  const [selectedSpecialist, setSelectedSpecialist] = useState<ConsultationSpecialist | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getSpecialistIcon = (id: string) => {
    const iconMap = {
      ginjal: Pill,
      kanker: DnaOff,
      jantung: HeartPulse,
      diabetes: Syringe,
    };
    return iconMap[id as keyof typeof iconMap] || Stethoscope;
  };

  const handleWhatsAppClick = (specialist: ConsultationSpecialist) => {
    const url = getWhatsAppUrl(specialist);
    window.open(url, '_blank');
  };

  const openModal = (specialist: ConsultationSpecialist) => {
    setSelectedSpecialist(specialist);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSpecialist(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 min-h-[70vh] flex items-center">
        {/* Background Decorations */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-70"
            style={{
backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none'/%3E%3Ccircle cx='20' cy='20' r='2' fill='%23ffffff' fill-opacity='0.3'/%3E%3C/svg%3E")`
            }}
          />
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl" />
        </div>
        
        {/* Content */}
        <div className="relative container mx-auto px-6 py-20">
          <div className="max-w-5xl mx-auto text-center">
            {/* Main Heading */}
            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-[0.9] tracking-tight">
              Konsultasi
              <span className="block bg-gradient-to-r from-emerald-200 via-green-200 to-white bg-clip-text text-transparent">
                Kesehatan
              </span>
            </h1>
            
            {/* Description */}
            <p className="text-xl md:text-2xl text-green-50/90 mb-12 leading-relaxed max-w-4xl mx-auto font-light">
              Dapatkan informasi dan konsultasi kesehatan terpercaya dari tim ahli medis bersertifikat untuk berbagai penyakit kronis
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-emerald-100/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-emerald-200" />
                </div>
                <span className="font-medium">1000+ Pasien Terlayani</span>
              </div>
              <div className="w-1 h-6 bg-white/20 rounded-full hidden md:block" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-emerald-200" />
                </div>
                <span className="font-medium">Konsultasi 24/7</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
            <svg
                viewBox="0 0 1200 120"
                className="w-full h-48 fill-white"
                preserveAspectRatio="none"
            >
                <path d="M0,0 C150,100 350,0 500,50 C650,100 850,0 1200,50 L1200,120 L0,120 Z" />
            </svg>
        </div>
      </section>

      {/* Specialists Section */}
      <section className=" bg-white relative pb-14">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Pilih Layanan
              <span className="block text-green-600">Konsultasi Anda</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Tim spesialis kami memberikan informasi medis terpercaya dan solusi terbaik untuk kebutuhan kesehatan Anda
            </p>
          </div>

          {/* Specialists Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {consultationSpecialists.map((specialist, index) => {
              const IconComponent = getSpecialistIcon(specialist.id);
              return (
                <div
                  key={specialist.id}
                  className="group relative bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 border border-gray-100/50 overflow-hidden animate-fade-in-up"
                  style={{ 
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  {/* Hover Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  
                  {/* Card Content */}
                  <div className="relative p-8">
                    {/* Icon Container */}
                    <div className="relative mb-8">
                      <div className="w-20 h-20 bg-gradient-to-br from-green-100 via-emerald-50 to-green-100 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                        <IconComponent className="w-9 h-9 text-green-600 group-hover:text-green-700 transition-colors duration-300" />
                      </div>
                      {/* Floating Dots */}
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300" />
                      <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-500" />
                    </div>
                    
                    {/* Content */}
                    <div className="text-center space-y-4">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-800 transition-colors duration-300 leading-tight">
                        {specialist.specialty}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 group-hover:text-gray-700 transition-colors duration-300">
                        {specialist.description}
                      </p>
                      
                      {/* Service Badge */}
                      <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-xs font-semibold border border-green-100">
                        <CheckCircle className="w-3 h-3" />
                        {specialist.services.length} Layanan Tersedia
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="relative p-6 pt-0 space-y-3">
                    <button
                      onClick={() => openModal(specialist)}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl group/btn flex items-center justify-center gap-3"
                    >
                      <Stethoscope className="w-4 h-4" />
                      <span>Lihat Detail</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                    </button>
                    
                    <button
                      onClick={() => handleWhatsAppClick(specialist)}
                      className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl group/btn flex items-center justify-center gap-3"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Konsultasi WhatsApp</span>
                      <Phone className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-200" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modal Component */}
      <SpecialistModal
        specialist={selectedSpecialist}
        isOpen={isModalOpen}
        onClose={closeModal}
        onWhatsAppClick={handleWhatsAppClick}
      />
    </div>
  );
};

export default ConsultationPage;