export interface FacilityDetail {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface Facility {
  id: string;
  title: string;
  iconName: 'Heart' | 'Users' | 'Microscope' | 'BedDouble' | 'Coffee';
  image: string;
  description: string;
  details: FacilityDetail[];
}

export const facilitiesData: Facility[] = [
  {
    id: "chronic",
    title: "Spesialisasi Penyakit Kronis",
    iconName: "Heart",
    image: "/api/placeholder/600/400",
    description:
      "Pusat unggulan untuk pengobatan penyakit kronis dengan pendekatan komplementer berlandaskan metode Ibnu Sina.",
    details: [
      {
        id: 1,
        title: "Pengobatan Kanker",
        description:
          "Layanan terapi komplementer untuk pasien kanker dengan pendekatan holistik yang memadukan pengobatan tradisional dan modern.",
        image: "/images/fasilitas/chronic/kanker.png",
      },
      {
        id: 2,
        title: "Penanganan Gagal Ginjal",
        description:
          "Program komprehensif untuk pasien gagal ginjal dengan metode terapi yang membantu meningkatkan kualitas hidup.",
        image: "/images/fasilitas/chronic/gagal-ginjal.png",
      },
      {
        id: 3,
        title: "Manajemen Diabetes",
        description:
          "Program pengelolaan diabetes jangka panjang dengan pendekatan nutrisi, aktivitas fisik dan terapi komplementer.",
        image: "/images/fasilitas/chronic/diabetes.png",
      },
      {
        id: 4,
        title: "Perawatan Jantung",
        description:
          "Perawatan jantung terpadu dengan fokus pada pencegahan, pengobatan, dan rehabilitasi menggunakan metode Ibnu Sina.",
        image: "/images/fasilitas/chronic/jantung.png",
      },
    ],
  },
  {
    id: "general",
    title: "Poliklinik Umum",
    iconName: "Users",
    image: "/api/placeholder/600/400",
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
    image: "/api/placeholder/600/400",
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
      {
        id: 10,
        title: "Tes Fungsi Organ",
        description:
          "Pemeriksaan fungsi organ vital seperti hati, ginjal, dan jantung.",
        image: "/images/fasilitas/laboratory/tes-fungsi-organ.png",
      },
      {
        id: 11,
        title: "Tes Hormon",
        description:
          "Pemeriksaan kadar hormon untuk diagnosis dan pemantauan berbagai kondisi endokrin.",
        image: "/images/fasilitas/laboratory/tes-hormon.png",
      },
      {
        id: 12,
        title: "Tes Genetik",
        description:
          "Analisis genetik untuk mendeteksi predisposisi terhadap penyakit tertentu.",
        image: "/images/fasilitas/laboratory/tes-genetik.png",
      },
    ],
  },
  {
    id: "inpatient",
    title: "Rawat Inap",
    iconName: "BedDouble",
    image: "/api/placeholder/600/400",
    description:
      "Fasilitas rawat inap nyaman dengan perawatan optimal untuk pasien yang membutuhkan pengawasan intensif.",
    details: [
      {
        id: 13,
        title: "Kamar Rawat Inap Nyaman",
        description:
          "Kamar rawat inap dengan berbagai pilihan kelas yang dilengkapi fasilitas pendukung kenyamanan pasien.",
        image: "/images/fasilitas/inpatient/kamar-rawat-inap-nyaman.png",
      },
      {
        id: 14,
        title: "Perawatan 24 Jam",
        description:
          "Tim medis profesional yang siap memberikan perawatan 24 jam penuh.",
        image: "/images/fasilitas/inpatient/perawatan-24-jam.png",
      },
      {
        id: 15,
        title: "Ruang Keluarga",
        description:
          "Area khusus untuk keluarga pasien yang dilengkapi dengan fasilitas pendukung.",
        image: "/images/fasilitas/inpatient/ruang-keluarga.png",
      },
      {
        id: 16,
        title: "Program Rehabilitasi",
        description:
          "Program rehabilitasi terpadu untuk pemulihan pasien pascaperawatan.",
        image: "/images/fasilitas/inpatient/program-rehabilitasi.png",
      },
    ],
  },
  {
    id: "amenities",
    title: "Fasilitas Pendukung",
    iconName: "Coffee",
    image: "/api/placeholder/600/400",
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