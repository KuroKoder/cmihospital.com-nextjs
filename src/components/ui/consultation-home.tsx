import React from 'react';
import { 
  X, 
  CheckCircle, 
  MessageCircle, 
  ArrowRight,
  Pill,
  HeartPulse, 
  Syringe, 
  Stethoscope,
  DnaOff
} from 'lucide-react';
import { ConsultationSpecialist } from '../../data/consultationData';

interface SpecialistModalProps {
  specialist: ConsultationSpecialist | null;
  isOpen: boolean;
  onClose: () => void;
  onWhatsAppClick: (specialist: ConsultationSpecialist) => void;
}

const SpecialistModal: React.FC<SpecialistModalProps> = ({
  specialist,
  isOpen,
  onClose,
  onWhatsAppClick
}) => {
  const getSpecialistIcon = (id: string) => {
    const iconMap = {
      ginjal: Pill,
      kanker: DnaOff,
      jantung: HeartPulse,
      diabetes: Syringe,
    };
    return iconMap[id as keyof typeof iconMap] || Stethoscope;
  };

  if (!isOpen || !specialist) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 modal-backdrop">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl modal-content border border-gray-100">
        {/* Modal Header */}
        <div className="relative bg-gradient-to-r from-green-600 via-green-700 to-emerald-700 text-white p-10">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/70 hover:text-white hover:bg-white/20 p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex items-start gap-8">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center flex-shrink-0 shadow-lg">
              {React.createElement(getSpecialistIcon(specialist.id), { 
                className: "w-10 h-10 text-white" 
              })}
            </div>
            <div className="flex-1">
              <h2 className="text-4xl font-bold mb-3 leading-tight">
                {specialist.specialty}
              </h2>
              <p className="text-emerald-100 text-xl mb-4 font-medium">
                {specialist.title}
              </p>
              <p className="text-white/90 text-lg leading-relaxed">
                {specialist.description}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-10 max-h-[50vh] overflow-y-auto">
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-4">
              <CheckCircle className="w-7 h-7 text-green-600" />
              Layanan yang Tersedia
            </h3>
            <p className="text-gray-600 text-lg">Informasi lengkap mengenai layanan konsultasi yang kami sediakan</p>
          </div>
          
          <div className="grid gap-4">
            {specialist.services.map((service, index) => (
              <div 
                key={index} 
                className="flex items-start gap-4 p-6 bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 rounded-2xl hover:from-green-100 hover:to-emerald-100 transition-all duration-300 group border border-green-100/50"
              >
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full mt-2.5 flex-shrink-0 group-hover:scale-125 transition-transform duration-200" />
                <p className="text-gray-700 leading-relaxed text-base group-hover:text-gray-900 transition-colors duration-200">
                  {service}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-10 pt-0 flex gap-6">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-4 px-8 rounded-2xl transition-colors duration-200 text-lg"
          >
            Tutup
          </button>
          <button
            onClick={() => onWhatsAppClick(specialist)}
            className="flex-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl text-lg"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Mulai Konsultasi Sekarang</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecialistModal;