import Diabetes from "../../public/images/services/diabetes1.svg";
import Laboratorium from "../../public/images/services/laboratorium.webp";
import Kanker from "../../public/images/services/kanker1.svg";
import Jantung from "../../public/images/services/jantung1.svg";
import Ginjal from "../../public/images/services/ginjal1.svg";

// Define the Service type
export type Service = {
  nama: string;
  deskripsi: string;
  image: typeof Diabetes;
  features: string[];
  imagePosition?: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
};

export const services: Service[] = [
  {
    nama: "Pengobatan Kanker",
    deskripsi:
      "Terapi kanker non-invasif dengan pendekatan holistik dan teknologi modern untuk hasil optimal.",
    image: Kanker,
    features: [
      "Tindakan Non-invasif",
      "Tanpa Kemoterapi",
      "Tanpa Operasi",
      "Minim Efek Samping",
      "Tim Edukasi Profesional",
    ],
    imagePosition: {
      mobile: "center center",
      tablet: "center top", 
      desktop: "center center"
    }
  },
  {
    nama: "Pengobatan Jantung",
    deskripsi:
      "Penanganan penyakit jantung tanpa operasi melalui metode terapi terkini dan preventif.",
    image: Jantung,
    features: [
      "Tanpa Pemasangan Ring",
      "Tanpa Operasi Bypass",
      "Terapi Terkini",
      "Pendekatan Preventif",
      "Tim Edukasi Profesional",
    ],
    imagePosition: {
      mobile: "center center",
      tablet: "center center",
      desktop: "left center"
    }
  },
  {
    nama: "Pengobatan Diabetes",
    deskripsi:
      "Manajemen diabetes terintegrasi tanpa ketergantungan insulin dan minum obat seumur hidup.",
    image: Diabetes,
    features: [
      "Manajemen Nutrisi",
      "Terhindar dari minum obat seumur hidup",
      "Tanpa suntik insulin",
      "Tim Edukasi Profesional",
    ],
    imagePosition: {
      mobile: "center top",
      tablet: "center center",
      desktop: "center bottom"
    }
  },
  {
    nama: "Pengobatan Ginjal",
    deskripsi:
      "Terapi gagal ginjal untuk mengurangi frekuensi cuci darah dan tingkatkan kualitas hidup.",
    image: Ginjal,
    features: [
      "Mengurangi Frekuensi Cuci Darah",
      "Terhindar dari operasi",
      "Tim Edukasi Profesional",
    ],
    imagePosition: {
      mobile: "center center",
      tablet: "right center",
      desktop: "left top"
    }
  },
  {
    nama: "Laboratorium Avicenna",
    deskripsi:
      "Fasilitas diagnostik modern dengan teknologi tinggi untuk hasil cepat dan akurat.",
    image: Laboratorium,
    features: ["Diagnostik Lengkap", "Teknologi Modern", "Hasil Akurat"],
    imagePosition: {
      mobile: "center center",
      tablet: "center center", 
      desktop: "right center"
    }
  },
];