```
cmihospital.com
├─ eslint.config.mjs
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ images
│  │  ├─ about
│  │  │  ├─ cmi.webp
│  │  │  └─ cmigedung.png
│  │  ├─ articles
│  │  │  ├─ articlepage
│  │  │  │  ├─ deteksi-kanker.png
│  │  │  │  ├─ diabetes-tipe-2.png
│  │  │  │  ├─ imunisasi-bayi.png
│  │  │  │  ├─ jantung.png
│  │  │  │  ├─ kecemasan-dan-stres.png
│  │  │  │  ├─ nutrisi-ibu-hamil.png
│  │  │  │  ├─ olahraga-rutin.png
│  │  │  │  └─ sarapan-sehat.png
│  │  │  └─ homepage
│  │  │     ├─ deteksi-diabetes.png
│  │  │     ├─ kesehatan-jantung.png
│  │  │     ├─ nutrisi-penting.png
│  │  │     ├─ olahraga-rutin.png
│  │  │     └─ tidur-berkualitas.png
│  │  ├─ fasilitas
│  │  │  ├─ amenities
│  │  │  │  ├─ apotek.png
│  │  │  │  ├─ area-parkir-luas.png
│  │  │  │  ├─ kafetaria.png
│  │  │  │  └─ ruang-ibadah.png
│  │  │  ├─ chronic
│  │  │  │  ├─ diabetes.png
│  │  │  │  ├─ gagal-ginjal.png
│  │  │  │  ├─ jantung.png
│  │  │  │  └─ kanker.png
│  │  │  ├─ general
│  │  │  │  ├─ konsultasi-dokter-umum.png
│  │  │  │  ├─ pemeriksaan-kesehatan-rutin.png
│  │  │  │  ├─ pengobatan-penyakit-ringan.png
│  │  │  │  └─ vaksinasi.png
│  │  │  ├─ inpatient
│  │  │  │  ├─ kamar-rawat-inap-nyaman.png
│  │  │  │  ├─ perawatan-24-jam.png
│  │  │  │  ├─ program-rehabilitasi.png
│  │  │  │  └─ ruang-keluarga.png
│  │  │  └─ laboratory
│  │  │     ├─ pemeriksaan-darah-lengkap.png
│  │  │     ├─ tes-fungsi-organ.png
│  │  │     ├─ tes-genetik.png
│  │  │     └─ tes-hormon.png
│  │  ├─ hero
│  │  │  ├─ cmi.webp
│  │  │  └─ Gedungcmi.jpg
│  │  ├─ logo
│  │  │  └─ logo.svg
│  │  ├─ services
│  │  │  ├─ diabetes.svg
│  │  │  ├─ ginjal.svg
│  │  │  ├─ jantung.svg
│  │  │  ├─ kanker.jpg
│  │  │  ├─ kanker.svg
│  │  │  └─ laboratorium.webp
│  │  └─ testimonials
│  │     ├─ elis.jpg
│  │     ├─ erry.jpg
│  │     ├─ eulis.jpg
│  │     ├─ ida-rusida.jpg
│  │     ├─ mustofa.jpg
│  │     ├─ nendra.jpg
│  │     ├─ riyah.jpg
│  │     └─ triana.jpg
│  ├─ kidney.png
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ README.md
├─ src
│  ├─ app
│  │  ├─ (public)
│  │  │  ├─ artikel-kesehatan
│  │  │  │  ├─ page.tsx
│  │  │  │  └─ [slug]
│  │  │  │     └─ page.tsx
│  │  │  ├─ dokter
│  │  │  │  └─ page.tsx
│  │  │  ├─ faq
│  │  │  │  └─ page.tsx
│  │  │  ├─ fasilitas
│  │  │  │  └─ page.tsx
│  │  │  ├─ kontak
│  │  │  │  └─ page.tsx
│  │  │  ├─ layanan
│  │  │  │  ├─ farmasi
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ follow-up
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ igd-rawat-inap
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ konsultasi-dokter
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ laboratorium
│  │  │  │  │  └─ page.tsx
│  │  │  │  └─ poli-komplementer
│  │  │  │     └─ page.tsx
│  │  │  ├─ page.tsx
│  │  │  ├─ tentang-kami
│  │  │  │  └─ page.tsx
│  │  │  └─ testimoni
│  │  │     └─ page.tsx
│  │  ├─ animation.css
│  │  ├─ favicon.ico
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  ├─ loading.tsx
│  │  ├─ not-found.tsx
│  │  ├─ page.tsx
│  │  ├─ robots.txt
│  │  └─ sitemap.ts
│  ├─ components
│  │  ├─ analytics
│  │  │  └─ GoogleAnalytics.tsx
│  │  ├─ layout
│  │  │  ├─ footer
│  │  │  │  ├─ ContactInfo.tsx
│  │  │  │  ├─ FloatingAppointmentButton.tsx
│  │  │  │  ├─ FooterBottom.tsx
│  │  │  │  ├─ FooterLinkList.tsx
│  │  │  │  ├─ FooterMain.tsx
│  │  │  │  ├─ NewsletterForm.tsx
│  │  │  │  ├─ public-footer.tsx
│  │  │  │  ├─ schema.ts
│  │  │  │  └─ SocialIcons.tsx
│  │  │  ├─ main-layout.tsx
│  │  │  └─ public-header.tsx
│  │  ├─ performance
│  │  │  └─ WebVitals.tsx
│  │  ├─ public
│  │  │  ├─ about
│  │  │  │  ├─ about-us.tsx
│  │  │  │  ├─ AboutHero.tsx
│  │  │  │  ├─ ContactForm.tsx
│  │  │  │  ├─ HistoryTabs.tsx
│  │  │  │  ├─ index.ts
│  │  │  │  ├─ LokasiKontakSection.tsx
│  │  │  │  ├─ NavigationTabs.tsx
│  │  │  │  ├─ NilaiPerusahaanCarousel.tsx
│  │  │  │  └─ VisiMisiSection.tsx
│  │  │  ├─ articles
│  │  │  │  ├─ ArticleCard.tsx
│  │  │  │  ├─ FilterControls.tsx
│  │  │  │  ├─ NewsletterSection.tsx
│  │  │  │  ├─ Pagination.tsx
│  │  │  │  └─ SearchSection.tsx
│  │  │  ├─ detailArticle
│  │  │  │  ├─ ArticleContent.tsx
│  │  │  │  ├─ BackNavigation.tsx
│  │  │  │  ├─ BreadCrumb.tsx
│  │  │  │  ├─ HeaderDetail.tsx
│  │  │  │  ├─ Newsletter.tsx
│  │  │  │  ├─ RelatedArticle.tsx
│  │  │  │  ├─ SocialShare.tsx
│  │  │  │  └─ TableOfContentGenerarator.tsx
│  │  │  ├─ doctor
│  │  │  │  └─ doctor-page.tsx
│  │  │  ├─ facilities
│  │  │  │  └─ facilities-page.tsx
│  │  │  ├─ faq
│  │  │  │  └─ FAQPage.tsx
│  │  │  ├─ homepage
│  │  │  │  ├─ about-us.tsx
│  │  │  │  ├─ consultation-contact.tsx
│  │  │  │  ├─ featured-services.tsx
│  │  │  │  ├─ hero-banner.tsx
│  │  │  │  ├─ newest-articles.tsx
│  │  │  │  ├─ testimonials.tsx
│  │  │  │  └─ video-section.tsx
│  │  │  ├─ services
│  │  │  │  ├─ consultation.tsx
│  │  │  │  ├─ edukasi.tsx
│  │  │  │  ├─ farmasi.tsx
│  │  │  │  ├─ igd-rawat-inap.tsx
│  │  │  │  ├─ komplementer.tsx
│  │  │  │  └─ laboratorium.tsx
│  │  │  └─ testimoni
│  │  │     └─ testimonials-page.tsx
│  │  └─ ui
│  │     ├─ button.tsx
│  │     ├─ consultation-home.tsx
│  │     ├─ cta.tsx
│  │     ├─ modal-konsultasi.tsx
│  │     └─ skeleton.tsx
│  ├─ data
│  │  ├─ consultationData.ts
│  │  ├─ faqData.ts
│  │  ├─ fasilitasData.ts
│  │  ├─ heroData.ts
│  │  ├─ services.ts
│  │  └─ testimonials.ts
│  ├─ hooks
│  ├─ lib
│  │  ├─ api
│  │  │  └─ strapi.ts
│  │  ├─ performance
│  │  │  └─ analytics.ts
│  │  └─ utils.ts
│  ├─ types
│  │  ├─ article.ts
│  │  └─ global.d.ts
│  └─ utils
│     └─ articleUtils.ts
└─ tsconfig.json

```
