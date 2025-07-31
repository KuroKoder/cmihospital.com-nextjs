"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimation, Variants } from "framer-motion";
import Image from "next/image";

type Counter = {
  years: number;
  patients: number;
};

const TentangKami = () => {
  const controls = useAnimation();
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const [counter, setCounter] = useState<Counter>({
    years: 0,
    patients: 0,
  });

  const stats: Counter = {
    years: 16,
    patients: 9000,
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");

      const duration = 2000; // 2 seconds
      const frameDuration = 1000 / 60;
      const totalFrames = Math.round(duration / frameDuration);

      let frame = 0;
      const interval = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;

        setCounter({
          years: Math.floor(progress * stats.years),
          patients: Math.floor(progress * stats.patients),
        });

        if (frame === totalFrames) {
          clearInterval(interval);
          setCounter(stats);
        }
      }, frameDuration);
    }
  }, [isInView, controls]);

  // Define animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const imageVariants: Variants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const floatingVariants: Variants = {
    floating: {
      y: [-20, 20, -20],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section
      id="tentang-kami"
      ref={ref}
      className="relative bg-gradient-to-br from-green-50 via-white to-emerald-50 py-16 md:py-24 lg:py-32 overflow-hidden"
    >
      {/* Enhanced background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-green-200 to-emerald-200 rounded-full opacity-20 blur-3xl"
          animate="floating"
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-l from-cyan-200 to-green-200 rounded-full opacity-20 blur-3xl"
          animate="floating"
          transition={{ delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 right-1/2 w-64 h-64 bg-gradient-to-tr from-emerald-200 to-purple-200 rounded-full opacity-15 blur-3xl"
          animate="floating"
          transition={{ delay: 1 }}
        />
      </div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgb(59 130 246) 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Section Title */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-12 md:mb-16"
        >
          <motion.span
            className="inline-flex items-center py-2 px-4 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 text-sm font-semibold mb-4 shadow-sm border border-green-200"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Tentang Kami
          </motion.span>
          <motion.h2
            className="text-4xl md:text-3xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-green-800 to-emerald-800 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={itemVariants}
          >
            Klinik Utama <span className="text-green-600">CMI</span>
          </motion.h2>
          <motion.div
            className="w-24 h-1.5 bg-gradient-to-r from-green-500 to-emerald-600 mx-auto mt-4 mb-6 rounded-full"
            initial={{ width: 0 }}
            animate={controls}
            variants={{
              hidden: { width: 0 },
              visible: {
                width: "6rem",
                transition: { duration: 1, delay: 0.5 },
              },
            }}
          />
          <motion.p
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Memadukan pengobatan medis modern dengan terapi klasik Timur untuk
            solusi kesehatan yang komprehensif
          </motion.p>
        </motion.div>

        {/* Enhanced Main content grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          {/* Enhanced Content section */}
          <div className="order-2 lg:order-1 lg:col-span-6">
            <motion.div variants={containerVariants} className="space-y-8">
              <motion.div
                variants={itemVariants}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50"
              >
                <p className="text-gray-700 text-lg leading-relaxed">
                  Tangani kanker, jantung, gagal ginjal, dan diabetes secara
                  lebih aman tanpa tindakan invasif. Kami memadukan pengobatan
                  medis modern dengan terapi klasik Timur yang teruji.
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100"
              >
                <p className="text-gray-700 leading-relaxed">
                  Pendekatan integratif kami berakar dari warisan keilmuan Ibnu
                  Sina dalam Al-Qanun fi al-Tibb, membentuk metode pengobatan
                  yang minim efek samping dan berfokus pada pemulihan menyeluruh
                  serta peningkatan kualitas hidup pasien.
                </p>
              </motion.div>

              {/* Enhanced Stats pills */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-4 mt-8"
              >
                <motion.div
                  className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-white/50 flex items-center gap-3"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl font-bold">
                      {counter.years}+
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Tahun</p>
                    <p className="font-semibold text-gray-800">Pengalaman</p>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-white/50 flex items-center gap-3"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <span className="text-white text-lg font-bold">
                      {Math.floor(counter.patients / 1000)}K+
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Pasien</p>
                    <p className="font-semibold text-gray-800">Puas</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Enhanced CTA Button */}
              {/* <motion.div variants={itemVariants} className="pt-6">
                <motion.button 
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-xl transition-all duration-300 inline-flex items-center group relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">Jadwalkan Konsultasi</span>
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2 relative z-10"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </motion.svg>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
              </motion.div> */}
            </motion.div>
          </div>

          {/* Enhanced Image section */}
          <motion.div
            variants={imageVariants}
            className="order-1 lg:order-2 lg:col-span-6 relative flex justify-center"
          >
            <div className="relative w-full max-w-lg">
              {/* Floating decorative elements */}
              <motion.div
                className="absolute -top-6 -right-10 w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-80"
                animate="floating"
              />
              <motion.div
                className="absolute -bottom-8 -left-12 w-28 h-28 bg-gradient-to-l from-cyan-400 to-green-400 rounded-full opacity-60"
                animate="floating"
                transition={{ delay: 1.5 }}
              />
              <motion.div
                className="absolute top-1/2 -right-8 w-16 h-16 bg-gradient-to-tr from-emerald-400 to-purple-400 rounded-full opacity-70"
                animate="floating"
                transition={{ delay: 0.5 }}
              />

              {/* Main image container */}
              <motion.div
                className="relative overflow-hidden rounded-3xl shadow-2xl bg-white p-2"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Placeholder for actual image - replace with your actual image */}
                <div className="aspect-[4/3] bg-gradient-to-br from-green-100 via-emerald-100 to-purple-100 rounded-2xl relative overflow-hidden">
                  {/* Replace this div with your actual image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                          className="w-12 h-12 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zM12 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1V4zM12 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        Klinik Utama CMI
                      </h3>
                      <p className="text-gray-600">Fasilitas Modern & Nyaman</p>
                    </div>
                  </div>

                  {/* Uncomment and use this when you have the actual image */}

                  <Image
                    src="/assets/images/cmi.webp"
                    alt="Gedung Klinik CMI"
                    fill
                    className="object-cover"
                    priority
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-green-900/20 via-transparent to-emerald-900/20" />
                </div>
              </motion.div>

              {/* Enhanced experience badge */}
              <motion.div
                className="absolute -bottom-6 -right-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full w-32 h-32 flex flex-col items-center justify-center shadow-2xl z-20 border-4 border-white"
                initial={{ scale: 0, rotate: -180 }}
                animate={controls}
                variants={{
                  hidden: { scale: 0, rotate: -180 },
                  visible: {
                    scale: 1,
                    rotate: 0,
                    transition: {
                      duration: 0.8,
                      delay: 1,
                      type: "spring",
                      stiffness: 200,
                    },
                  },
                }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <span className="text-3xl font-bold">{counter.years}+</span>
                <span className="text-xs font-medium">Tahun</span>
                <span className="text-xs font-medium">Pengalaman</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          className="relative block w-full h-16 sm:h-20 md:h-28"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="0%"
                style={{ stopColor: "#ffffff", stopOpacity: 1 }}
              />
              <stop
                offset="50%"
                style={{ stopColor: "#f8fafc", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#ffffff", stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            fill="url(#waveGradient)"
          />
        </svg>
      </div>
    </section>
  );
};

export default TentangKami;
