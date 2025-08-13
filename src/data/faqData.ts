export interface FAQ {
  id: string;
  question: string;
  answer: string;
  imageUrl?: string;
}

export interface VideoContent {
  id: string;
  title: string;
  description: string;
  videoId: string;
  thumbnail?: string;
}

export interface VideoSection {
  mainVideo: VideoContent;
  additionalVideos: VideoContent[];
}

export const faqData: FAQ[] = [
  {
    id: "1",
    question: "Apakah Klinik Utama CMI ada di kota lain selain Kota Bandung?",
    answer: "Saat ini Klinik Utama CMI hanya ada di Kota Bandung saja. Meskipun begitu, kami tetap melayani pasien dari luar kota. Apabila kondisi pasien tidak memungkinkan untuk datang langsung ke Klinik Utama CMI, keluarga pasien yang mengetahui detail kondisi pasien dapat datang ke Klinik Utama CMI membawa hasil pemeriksaan lengkap terakhir pasien untuk dikonsultasikan dengan dokter. Namun apabila kondisi keduanya tidak memungkinkan, Klinik Utama CMI melayani konsultasi dengan dokter secara online."
  },
  {
    id: "2",
    question: "Berapa biaya pengobatan penyakit kronis di Klinik Utama CMI?",
    answer: "Pengobatan penyakit kronis di Klinik Utama CMI disesuaikan dengan bagaimana kondisi umum dan penyakit pasien berdasarkan hasil pemeriksaan terakhirnya, sehingga biaya pengobatan pun baru dapat diprediksi setelah dokter mengetahui detail kondisi pasien."
  },
  {
    id: "3",
    question: "Berapa lama waktu pengobatan penyakit kronis di Klinik Utama CMI?",
    answer: "Lama waktu pengobatan penyakit kronis di Klinik Utama CMI bergantung pada kondisi umum dan penyakit pasien, sehingga lama waktu pengobatan pasien satu dengan pasien lainnya dapat berbeda meskipun mengalami penyakit yang sama. Namun pada umumnya, pasien penyakit kronis yang ditangani di Klinik Utama CMI sembuh setelah 6-8 bulan pengobatan."
  },
  {
    id: "4",
    question: "Apakah pengobatan penyakit kronis di Klinik Utama CMI menimbulkan efek samping?",
    answer: "Pengobatan penyakit kronis di Klinik Utama CMI diracik menggunakan bahan alami sehingga aman untuk tubuh pasien dan minim efek samping. Apabila pasien merasakan nyeri saat menjalani pengobatan maka dokter akan meresepkan obat anti nyeri untuk pasien."
  },
  {
    id: "5",
    question: "Bagaimana alur penanganan penyakit kronis di Klinik Utama CMI?",
    answer: "Untuk mengetahui alur penanganan penyakit kronis di Klinik Utama CMI, silakan lihat diagram alur penanganan di bawah ini.",
    imageUrl: "https://www.cmihospital.com/assets/images/alur_penanganan.webp"
  }
];

export const videoData: VideoSection = {
  mainVideo: {
    id: "main-1",
    title: "Panduan Lengkap Pengobatan Penyakit Kronis",
    description: "Video ini menjelaskan metode pengobatan alami, alur penanganan pasien, dan testimoni dari pasien yang telah sembuh",
    videoId: "05kMbB0YzKo", // Ganti dengan video ID yang sebenarnya
  },
  additionalVideos: [
    {
      id: "additional-1",
      title: "Testimoni Pasien Sembuh",
      description: "Mendengar langsung cerita kesembuhan dari pasien-pasien kami",
      videoId: "AFH5HIlVPx0", // Ganti dengan video ID yang sebenarnya
    },
    {
      id: "additional-2", 
      title: "Tour Fasilitas Klinik",
      description: "Lihat fasilitas modern dan nyaman di Klinik Utama CMI",
      videoId: "dQw4w9WgXcQ", // Ganti dengan video ID yang sebenarnya
    }
  ]
};

export const faqPageContent = {
  header: {
    title: "Pertanyaan yang Sering Diajukan",
    subtitle: "Temukan jawaban atas pertanyaan umum tentang layanan Klinik Utama CMI"
  },
  videoSection: {
    title: "Kenali Lebih Dekat Klinik Utama CMI",
    subtitle: "Tonton video penjelasan lengkap tentang layanan pengobatan penyakit kronis kami"
  },
  additionalVideosTitle: "Video Lainnya",
  contact: {
    title: "Tidak menemukan jawaban yang Anda cari?",
    subtitle: "Tim kami siap membantu Anda dengan pertanyaan lebih lanjut.",
    buttons: {
      primary: "Hubungi Kami",
      secondary: "Konsultasi Online"
    }
  }
};

export default faqData;