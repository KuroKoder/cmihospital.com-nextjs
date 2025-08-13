// data/consultationData.ts
export interface ConsultationSpecialist {
  id: string;
  specialty: string;
  title: string;
  description: string;
  icon: string;
  color: {
    primary: string;
    secondary: string;
    accent: string;
    gradient: string;
  };
  services: string[];
  whatsapp: {
    number: string;
    message: string;
  };
}

export const consultationSpecialists: ConsultationSpecialist[] = [
  {
    id: "ginjal",
    specialty: "Tim Informasi Ginjal",
    title: "Informasi Kesehatan Ginjal",
    description: "Dapatkan informasi lengkap tentang kesehatan ginjal dan sistem kemih dari tim ahli kami",
    icon: "🫘",
    color: {
      primary: "blue-600",
      secondary: "blue-50",
      accent: "blue-100",
      gradient: "from-blue-500 to-cyan-500"
    },
    services: [
      "Dapat digunakan untuk semua jenis penyakit ginjal stadium awal hingga stadium lanjut",
      "Menggunakan obat oral yang disesuai dosisnya dengan kondisi pasien",
      "Berfungsi memperbaiki organ ginjal yang sudah rusak sehingga dapat kembali bekerja dengan normal",
      "Dikonsumsi secara berkala sekitar 8 bulan hingga 1 tahun",
      "Secara bertahap mengurangi frekuensi cuci darah (hemodialisa), serta menurunkan kadar kreatinin dan ureum dalam darah",
        "Meningkatkan kualitas hidup pasien gagal ginjal",
      "Edukasi gagal ginjal",
    ],
    whatsapp: {
      number: "628122771053",
      message: `Halo, saya ingin mendapatkan informasi mengenai kesehatan ginjal dari Tim Informasi Ginjal.

Mohon informasi:
- Jadwal konsultasi yang tersedia
- Biaya konsultasi
- Persiapan yang diperlukan
Sumber: cmihospital.com
Terima kasih.`
    },
  },
  {
    id: "kanker",
    specialty: "Tim Informasi Kanker",
    title: "Informasi Kesehatan Kanker",
    description: "Dapatkan informasi lengkap tentang deteksi dini dan penanganan kanker dari tim ahli kami",
    icon: "🎗️",
    color: {
      primary: "pink-600",
      secondary: "pink-50",
      accent: "pink-100",
      gradient: "from-pink-500 to-rose-500"
    },
    services: [
      "Pengobatan kanker untuk menghindari kemoterapi, operasi, dan radioterapi",
      "Dilakukan untuk semua jenis kanker dari stadium awal hingga stadium lanjut",
      "Pemberian obat oral yang terbuat dari ekstrak bahan alam non sisntetis dengan penyesuaian dosis sesuai kondisi pasien",
      "Memperbaiki sistem tubuh, termasuk sistem imun, serta menyerang sel kanker spesifik (tidak merusak sel normal)",
      "Terapi berkala sesuai tahapan farmakologi obat, biasanya 6-12 bulan",
      "Konsultasi nutrisi kanker",
    ],
    whatsapp: {
      number: "628119161166",
      message: `Halo, saya ingin mendapatkan informasi mengenai kesehatan kanker dari Tim Informasi Kanker.

Mohon informasi:
- Jadwal konsultasi yang tersedia
- Prosedur konsultasi
- Biaya pemeriksaan
- Persiapan dokumen medis
Sumber: cmihospital.com
Terima kasih.`
    },
  },
  {
    id: "jantung",
    specialty: "Tim Informasi Jantung",
    title: "Informasi Kesehatan Jantung",
    description: "Dapatkan informasi lengkap tentang kesehatan jantung dan pembuluh darah dari tim ahli kami",
    icon: "❤️",
    color: {
      primary: "red-600",
      secondary: "red-50",
      accent: "red-100",
      gradient: "from-red-500 to-pink-500"
    },
    services: [
      "Bertujuan untuk menghancurkan plak yang menyumbat pembuluh darah",
      "Mampu memperbaiki organ jantung dan pembuluh darah yang sudah rusak",
      "Menghentikan ketergantungan terhadap obat-obatan jantung",
      "Minim efek samping",
      "Tindakan non invasif (menggunakan obat oral sesuai kondisi penyakit setiap pasien)",
        "Durasi konsumsi obat sekitar 4-6 bulan",
      "Mencegah risiko terjadinya komplikasi penyakit jantung serta tindakan operasi pemasangan ring dan bypass ulang",
    ],
    whatsapp: {
      number: "6281324335676",
      message: `Halo, saya ingin mendapatkan informasi mengenai kesehatan jantung dari Tim Informasi Jantung.

Mohon informasi:
- Jadwal konsultasi yang tersedia
- Jenis pemeriksaan yang diperlukan
- Biaya konsultasi dan pemeriksaan
- Persiapan sebelum konsultasi
Sumber: cmihospital.com
Terima kasih.`
    },
  },
  {
    id: "diabetes",
    specialty: "Tim Informasi Diabetes",
    title: "Informasi Kesehatan Diabetes",
    description: "Dapatkan informasi lengkap tentang pengelolaan diabetes dan gangguan metabolik dari tim ahli kami",
    icon: "🩺",
    color: {
      primary: "green-600",
      secondary: "green-50",
      accent: "green-100",
      gradient: "from-green-500 to-emerald-500"
    },
    services: [
      "Diabetes tipe 1 dan tipe 2",
      "Edukasi diabetes",
      "Memecah glukosa berlebih dalam darah untuk diubah menjadi energi",
      "Tanpa suntik insulin dan minum obat seumur hidup",
      "Mengembalikan fungsi pankreas dan sel penerima gula di seluruh tubuh",
      "Dikonsumsi rutin cukup 6-12 bulan",
      "Menurunkan kadar gula dalam darah secara bertahap",
      "Minim efek samping dan mencegah terjadinya komplikasi penyakit",
    ],
    whatsapp: {
      number: "628126398300",
      message: `Halo, saya ingin mendapatkan informasi mengenai diabetes dari Tim Informasi Diabetes.

Mohon informasi:
- Jadwal konsultasi yang tersedia
- Pemeriksaan laboratorium yang diperlukan
- Biaya konsultasi
- Tips kontrol gula darah
Sumber: cmihospital.com
Terima kasih.`
    },
  }
];

export const getSpecialistById = (id: string): ConsultationSpecialist | undefined => {
  return consultationSpecialists.find(specialist => specialist.id === id);
};

export const getWhatsAppUrl = (specialist: ConsultationSpecialist): string => {
  const encodedMessage = encodeURIComponent(specialist.whatsapp.message);
  return `https://wa.me/${specialist.whatsapp.number}?text=${encodedMessage}`;
};