export interface FacilityDetail {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface Facility {
  id: string;
  title: string;
  iconName: "Heart" | "Users" | "Microscope" | "BedDouble" | "Coffee";
  image: string;
  description: string;
  details: FacilityDetail[];
}

export const facilitiesData: Facility[] = [
  {
    id: "chronic",
    title: "Spesialisasi Penyakit Kronis",
    iconName: "Heart",
    image: "/images/hero/cmi.webp",
    description:
      "Pusat unggulan untuk pengobatan penyakit kronis dengan pendekatan komplementer berlandaskan metode Ibnu Sina.",
    details: [
      {
        id: 1,
        title: "Pengobatan Kanker",
        description:
          "Klinik Utama CMI menyediakan pengobatan kanker inovatif yang bertujuan menghindari kemoterapi, operasi, dan radioterapi, serta dapat diterapkan pada semua jenis kanker dari stadium awal hingga stadium lanjut. Terapi ini menggunakan obat oral berbahan ekstrak alami non-sintetis dengan dosis yang disesuaikan kondisi pasien, berfungsi memperbaiki sistem tubuh termasuk sistem imun, sekaligus menyerang sel kanker secara spesifik tanpa merusak sel normal. Pengobatan dilakukan secara berkala sesuai tahapan farmakologi obat selama 6–12 bulan, dilengkapi dengan konsultasi nutrisi kanker untuk mendukung pemulihan dan meningkatkan kualitas hidup pasien.",
        image: "/images/services/kanker.svg",
      },
      {
        id: 2,
        title: "Penanganan Gagal Ginjal",
        description:
          "Klinik Utama CMI menawarkan terapi penyakit ginjal dari stadium awal hingga lanjut dengan obat oral yang disesuaikan kondisi pasien, membantu memperbaiki fungsi ginjal, mengurangi frekuensi cuci darah, menurunkan kreatinin dan ureum, serta meningkatkan kualitas hidup pasien gagal ginjal",
        image: "/images/services/ginjal.svg",
      },
      {
        id: 3,
        title: "Manajemen Diabetes",
        description:
          "Klinik Utama CMI menyediakan terapi diabetes tipe 1 dan tipe 2 yang difokuskan pada edukasi pasien sekaligus pengobatan non-invasif tanpa suntik insulin maupun ketergantungan obat seumur hidup. Terapi ini bekerja dengan memecah glukosa berlebih dalam darah untuk diubah menjadi energi, mengembalikan fungsi pankreas serta sel penerima gula di seluruh tubuh, dan menurunkan kadar gula darah secara bertahap. Dengan konsumsi rutin selama 6–12 bulan, pengobatan ini minim efek samping serta efektif mencegah terjadinya komplikasi akibat diabetes, sehingga mampu meningkatkan kualitas hidup pasien.",
        image: "/images/services/diabetes.svg",
      },
      {
        id: 4,
        title: "Perawatan Jantung",
        description:
          "Klinik Utama CMI menawarkan terapi jantung non-invasif yang bertujuan menghancurkan plak penyumbat pembuluh darah serta memperbaiki organ jantung dan pembuluh darah yang telah rusak. Terapi ini dilakukan dengan pemberian obat oral sesuai kondisi masing-masing pasien, minim efek samping, dan mampu menghentikan ketergantungan terhadap obat-obatan jantung. Dengan durasi konsumsi sekitar 4–6 bulan, pengobatan ini efektif mencegah risiko komplikasi penyakit jantung serta mengurangi kebutuhan tindakan medis invasif seperti pemasangan ring atau operasi bypass ulang.",
        image: "/images/services/jantung.svg",
      },
    ],
  },
  {
    id: "general",
    title: "Poliklinik Umum",
    iconName: "Users",
    image: "/images/hero/cmi.webp",
    description:
      "Layanan kesehatan umum untuk menangani berbagai keluhan dan penyakit sehari-hari.",
    details: [
      {
        id: 5,
        title: "Konsultasi Dokter Umum",
        description:
          "Layanan konsultasi dengan dokter umum berpengalaman untuk berbagai keluhan kesehatan.",
        image: "/images/fasilitas/general/konsultasi-dokter-umum.png",
      },
      {
        id: 6,
        title: "Pemeriksaan Kesehatan Rutin",
        description:
          "Layanan pemeriksaan kesehatan berkala untuk memantau kondisi kesehatan Anda.",
        image: "/images/fasilitas/general/pemeriksaan-kesehatan-rutin.png",
      },
      {
        id: 7,
        title: "Vaksinasi",
        description:
          "Program vaksinasi untuk berbagai penyakit menular sebagai upaya pencegahan.",
        image: "/images/fasilitas/general/vaksinasi.png",
      },
      {
        id: 8,
        title: "Pengobatan Penyakit Ringan",
        description:
          "Penanganan cepat untuk penyakit umum seperti flu, demam, dan infeksi ringan.",
        image: "/images/fasilitas/general/pengobatan-penyakit-ringan.png",
      },
    ],
  },
  {
    id: "laboratory",
    title: "Laboratorium",
    iconName: "Microscope",
    image: "/images/hero/cmi.webp",
    description:
      "Fasilitas laboratorium modern untuk mendukung diagnosis dan pemantauan kesehatan pasien.",
    details: [
      {
        id: 9,
        title: "Pemeriksaan Darah Lengkap",
        description:
          "Analisis darah menyeluruh untuk mendeteksi berbagai kondisi kesehatan.",
        image: "/images/fasilitas/laboratory/pemeriksaan-darah-lengkap.png",
      },
    ],
  },
  {
    id: "inpatient",
    title: "Rawat Inap",
    iconName: "BedDouble",
    image: "/images/hero/cmi.webp",
    description:
      "Fasilitas rawat inap nyaman dengan perawatan optimal untuk pasien yang membutuhkan pengawasan intensif.",
    details: [
      {
        id: 13,
        title: "Kamar Rawat Inap Nyaman",
        description:
          "Kamar rawat inap dengan berbagai pilihan kelas yang dilengkapi fasilitas pendukung kenyamanan pasien.",
        image: "/images/fasilitas/inpatient/kamar-rawat-inap-nyaman.jpg",
      },
      {
        id: 14,
        title: "Perawatan 24 Jam",
        description:
          "Tim medis profesional yang siap memberikan perawatan 24 jam penuh.",
        image: "/images/fasilitas/inpatient/perawatan-24-jam.png",
      },
    ],
  },
  {
    id: "amenities",
    title: "Fasilitas Pendukung",
    iconName: "Coffee",
    image: "/images/hero/cmi.webp",
    description:
      "Berbagai fasilitas pendukung untuk kenyamanan pasien dan keluarga selama berada di klinik.",
    details: [
      {
        id: 18,
        title: "Farmasi Klinik",
        description:
          "Farmasi Klinik lengkap dengan berbagai obat konvensional dan herbal.",
        image: "/images/fasilitas/amenities/apotek.png",
      },
      {
        id: 19,
        title: "Area Parkir",
        description:
          "Lahan parkir yang luas dan aman untuk kendaraan pasien dan pengunjung.",
        image: "/images/fasilitas/amenities/area-parkir-luas.png",
      },
      {
        id: 20,
        title: "Ruang Ibadah",
        description:
          "Ruang ibadah nyaman untuk mendukung kebutuhan spiritual pasien dan keluarga.",
        image: "/images/fasilitas/amenities/ruang-ibadah.png",
      },
    ],
  },
];
