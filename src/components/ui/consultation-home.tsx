import React from "react";
import {
  X,
  CheckCircle,
  MessageCircle,
  ArrowRight,
  Pill,
  HeartPulse,
  Syringe,
  Stethoscope,
  DnaOff,
} from "lucide-react";
import { ConsultationSpecialist } from "../../data/consultationData";

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
  onWhatsAppClick,
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
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 modal-backdrop">
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-5xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl modal-content border border-gray-100">
        {/* Modal Header */}
        <div className="relative bg-gradient-to-r from-green-600 via-green-700 to-emerald-700 text-white p-4 sm:p-6 lg:p-10">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 lg:top-6 lg:right-6 text-white/70 hover:text-white hover:bg-white/20 p-2 sm:p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 lg:gap-8 pr-12 sm:pr-0">
            <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-white/20 backdrop-blur-md rounded-2xl sm:rounded-3xl flex items-center justify-center flex-shrink-0 shadow-lg">
              {React.createElement(getSpecialistIcon(specialist.id), {
                className: "w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 text-white",
              })}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 leading-tight">
                {specialist.specialty}
              </h2>
              <p className="text-emerald-100 text-lg sm:text-xl mb-3 sm:mb-4 font-medium">
                {specialist.title}
              </p>
              <p className="text-white/90 text-base sm:text-lg leading-relaxed">
                {specialist.description}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 lg:p-10 max-h-[45vh] sm:max-h-[50vh] overflow-y-auto">
          <div className="mb-6 sm:mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-4">
                <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 text-green-600" />
                <span>Layanan yang Tersedia</span>
              </div>
            </h3>
            <p className="text-gray-600 text-base sm:text-lg mt-2">
              Informasi lengkap mengenai layanan konsultasi yang kami sediakan
            </p>
          </div>

          <div className="grid gap-3 sm:gap-4">
            {specialist.services.map((service, index) => (
              <div
                key={index}
                className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 lg:p-6 bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 rounded-xl sm:rounded-2xl hover:from-green-100 hover:to-emerald-100 transition-all duration-300 group border border-green-100/50"
              >
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-500 rounded-full mt-2 sm:mt-2.5 flex-shrink-0 group-hover:scale-125 transition-transform duration-200" />
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base group-hover:text-gray-900 transition-colors duration-200">
                  {service}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 sm:p-6 lg:p-10 pt-0 flex flex-col sm:flex-row gap-3 sm:gap-6">
          <button
            onClick={onClose}
            className="w-full sm:flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl transition-colors duration-200 text-base sm:text-lg order-2 sm:order-1"
          >
            Tutup
          </button>
          <button
            onClick={() => onWhatsAppClick(specialist)}
            className="w-full sm:flex-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 shadow-lg hover:shadow-xl text-base sm:text-lg order-1 sm:order-2"
          >
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden xs:inline">Mulai Konsultasi Sekarang</span>
            <span className="xs:hidden">Konsultasi</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecialistModal;
