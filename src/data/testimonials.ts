export interface Testimonial {
  id: number;
  name: string;
  age: number;
  condition: string;
  title: string;
  tag: string;
  story: string;
  image: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Mustofa",
    age: 50,
    condition: "Diabetes Melitus",
    title: "Kesembuhan Tanpa Obat",
    tag: "Diabetes",
    story:
      "Bulan ke 7 saya sudah tidak menggunakan obat oral dan di bulan ke 10 saya sudah tidak menggunakan insulin sebelum tidur. Kini hanya insulin untuk makan. Saya diberikan kesembuhan oleh Allah melalui pengobatan CMI.",
    image: "https://res.cloudinary.com/dhxwxsmwj/image/upload/v1754388482/267_jantung_koroner_750x500_min_b5f1ac138d.webp"
    
  },
  {
    id: 2,
    name: "Triana Wulandari",
    age: 40,
    condition: "Kanker Payudara",
    title: "Payudara Mulai Mengecil",
    tag: "Kanker Payudara",
    story:
      "Metode pengobatan kanker di CMI menjadikan tubuh saya mampu menyembuhkan dirinya sendiri. Baru dua bulan, kondisi payudara mulai mengecil dan sekarang hampir sama besar dengan yang kiri.",
    image: "/images/testimonials/triana.jpg",

    // image: "https://res.cloudinary.com/dhxwxsmwj/image/upload/v1754388482/267_jantung_koroner_750x500_min_b5f1ac138d.webp"
    
  },
  {
    id: 3,
    name: "Elis",
    age: 47,
    condition: "Kanker Rahim Metastase Serviks",
    title: "7 Tahun Bebas Kanker",
    tag: "Kanker",
    story:
      "Divonis kanker rahim menyebar ke serviks. Baru 10 hari berobat di CMI sudah merasa perbaikan. Tetap lanjutkan pengobatan selama 4 bulan. Kini 7 tahun kemudian saya benar-benar bersih dari kanker.",
    // image: "/images/testimonials/elis.jpg",

    image: "https://res.cloudinary.com/dhxwxsmwj/image/upload/v1754388482/267_jantung_koroner_750x500_min_b5f1ac138d.webp"
    
  },
  {
    id: 4,
    name: "Eulis Damayanti",
    age: 52,
    condition: "Kanker Payudara Metastase Paru-paru dan Tulang",
    title: "Tidak Ada Lagi Sel Kanker",
    tag: "Kanker Stadium 4B",
    story:
      "Kanker payudara stadium 4B, menyebar ke paru-paru dan tulang. Setelah berobat di CMI, hasil tes ulang menunjukkan tidak ada lagi sel kanker di tubuh saya.",
    // image: "/images/testimonials/eulis.jpg",

    image: "https://res.cloudinary.com/dhxwxsmwj/image/upload/v1754388482/267_jantung_koroner_750x500_min_b5f1ac138d.webp"
   
  },
  {
    id: 5,
    name: "Riyah Puspa",
    age: 43,
    condition: "Kanker Payudara",
    title: "Kembali Punya Harapan",
    tag: "Kanker",
    story:
      "Konsultasi dengan dokter CMI membuat saya nyaman dan kembali punya semangat sembuh dari kanker.",
    // image: "/images/testimonials/riyah.jpg",

    image: "https://res.cloudinary.com/dhxwxsmwj/image/upload/v1754388482/267_jantung_koroner_750x500_min_b5f1ac138d.webp"
    
  },
  {
    id: 6,
    name: "Erry Chandra",
    age: 58,
    condition: "Diabetes Melitus",
    title: "Lebih Sehat & Segar",
    tag: "Diabetes",
    story:
      "Saya merasa lebih segar dan sehat. Perawat dan dokter di CMI sangat ramah. Saya ingin berbagi agar orang lain bisa mendapatkan manfaat seperti saya.",
    // image: "/images/testimonials/erry.jpg",

    image: "https://res.cloudinary.com/dhxwxsmwj/image/upload/v1754388482/267_jantung_koroner_750x500_min_b5f1ac138d.webp"
    
  },
  {
    id: 7,
    name: "Ida Rusida Hutapea",
    age: 55,
    condition: "Tumor Tiroid",
    title: "Sembuh Tanpa Operasi",
    tag: "Tiroid",
    story:
      "Berobat 10 bulan di RS lain tanpa perbaikan. Di CMI, saya tidak mengalami efek samping seperti mual atau pusing dan akhirnya sembuh tanpa operasi.",
    // image: "/images/testimonials/ida-rusida.jpg",
    
    image: "https://res.cloudinary.com/dhxwxsmwj/image/upload/v1754388482/267_jantung_koroner_750x500_min_b5f1ac138d.webp"
  },
  {
    id: 8,
    name: "Nendra",
    age: 36,
    condition: "Kanker Ovarium",
    title: "Tak Jadi Operasi",
    tag: "Kanker",
    story:
      "Awalnya harus dioperasi. Setelah pengobatan di CMI, perdarahan berhenti, nafsu makan meningkat, dan akhirnya tidak jadi operasi.",
    // image: "/images/testimonials/nendra.jpg",
    
    image: "https://res.cloudinary.com/dhxwxsmwj/image/upload/v1754388482/267_jantung_koroner_750x500_min_b5f1ac138d.webp"
  },
];
