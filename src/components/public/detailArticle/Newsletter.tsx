'use client';

import { useState } from 'react';
import { CheckCircleIcon, EnvelopeIcon, SparklesIcon } from '@heroicons/react/24/outline';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubscribed(true);
    setIsLoading(false);
    setEmail('');
    
    // Reset after 5 seconds
    setTimeout(() => setIsSubscribed(false), 5000);
  };

  if (isSubscribed) {
    return (
      <section className="mt-16 bg-gradient-to-r from-green-600 via-green-700 to-emerald-600 rounded-2xl p-8 text-white relative overflow-hidden">
        {/* Simple background pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-4 left-4 w-3 h-3 bg-white rounded-full"></div>
            <div className="absolute top-8 right-8 w-2 h-2 bg-white rounded-full"></div>
            <div className="absolute bottom-6 left-12 w-4 h-4 bg-white rounded-full"></div>
            <div className="absolute bottom-12 right-6 w-2 h-2 bg-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-white rounded-full"></div>
            <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
        
        <div className="relative text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
            <CheckCircleIcon className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Terima Kasih!</h2>
          <p className="text-green-100 mb-4">
            Anda telah berhasil berlangganan newsletter kami. 
          </p>
          <p className="text-sm text-green-200">
            Cek email Anda untuk konfirmasi langganan.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-16 bg-gradient-to-br from-green-600 via-green-700 to-emerald-600 rounded-2xl p-8 lg:p-12 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-6 left-6 w-4 h-4 bg-white rounded-full"></div>
          <div className="absolute top-12 right-12 w-3 h-3 bg-white rounded-full"></div>
          <div className="absolute bottom-8 left-16 w-5 h-5 bg-white rounded-full"></div>
          <div className="absolute bottom-16 right-8 w-3 h-3 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-white rounded-full"></div>
          <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-white rounded-full"></div>
          <div className="absolute bottom-1/4 left-3/4 w-2 h-2 bg-white rounded-full"></div>
          <div className="absolute top-3/4 right-1/4 w-4 h-4 bg-white rounded-full"></div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-8 right-8 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-8 left-8 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>
      
      <div className="relative">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
            <EnvelopeIcon className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-2xl lg:text-3xl font-bold mb-4 flex items-center justify-center">
            <SparklesIcon className="w-6 h-6 mr-2" />
            Dapatkan Tips Kesehatan Terbaru
          </h2>
        </div>

        {/* Newsletter Features */}

        {/* Subscription Form */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email Anda"
                required
                className="w-full px-5 py-3 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/50 transition-all duration-200 bg-white/95 backdrop-blur-sm"
              />
            </div>
            
            <button 
              type="submit"
              disabled={isLoading || !email.trim()}
              className="px-8 py-3 bg-white text-green-600 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-green-600 border-t-transparent mr-2"></div>
                  Memproses...
                </div>
              ) : (
                'Berlangganan'
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}