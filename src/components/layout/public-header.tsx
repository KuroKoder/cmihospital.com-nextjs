"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback, useMemo } from "react";
import { usePathname } from "next/navigation";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  UserGroupIcon,
  BookOpenIcon,
  ClipboardDocumentListIcon,
  XMarkIcon,
  HeartIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  CalendarIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
} from "@heroicons/react/20/solid";

// Constants
const CONTACT_INFO = {
  phone: "(022) 253-1000",
  email: "info@cmihospital.com",
  hours: "IGD 24 Jam, Komplementer 08.00 - 17.00 WIB",
  location: "Bandung, Indonesia",
} as const;

const LAYANAN_KESEHATAN = [
  {
    name: "IGD dan Rawat Inap",
    description:
      "Layanan gawat darurat dan rawat inap tersedia setiap hari selama 24 jam.",
    href: "/layanan/igd-rawat-inap",
    icon: ClipboardDocumentListIcon,
  },
  {
    name: "Poli Umum & Konsultasi Komplementer",
    description: "Tersedia setiap Senin sampai Sabtu pukul 08.00 – 17.00 WIB.",
    href: "/layanan/poli-komplementer",
    icon: HeartIcon,
  },
  {
    name: "Pemeriksaan dan Konsultasi Dokter",
    description:
      "Dilakukan oleh dokter umum, spesialis, dan konsultan komplementer.",
    href: "/layanan/konsultasi-dokter",
    icon: UserGroupIcon,
  },
  {
    name: "Instalasi Farmasi Klinik",
    description:
      "Menyediakan obat-obatan lengkap dengan kualitas yang terjamin.",
    href: "/layanan/farmasi",
    icon: BookOpenIcon,
  },
  {
    name: "Laboratorium Avicenna",
    description:
      "Fasilitas laboratorium canggih untuk pemeriksaan penunjang medis.",
    href: "/layanan/laboratorium",
    icon: ArrowPathIcon,
  },
  {
    name: "Follow Up Pasien",
    description:
      "Tim edukasi memantau dan mengevaluasi perkembangan pasien secara berkelanjutan.",
    href: "/layanan/follow-up",
    icon: ChatBubbleBottomCenterTextIcon,
  },
] as const;

const NAVIGATION = [
  { name: "Fasilitas", href: "/fasilitas" },
  { name: "Tentang Kami", href: "/tentang-kami" },
  { name: "Artikel Kesehatan", href: "/artikel-kesehatan" },
  { name: "Testimoni", href: "/testimoni" },
  { name: "Kontak", href: "/kontak" },
  { name: "FAQ", href: "/faq" },
] as const;

// Types
interface ContactInfoProps {
  className?: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

// Memoized Components
const ContactInfo = ({ className = "" }: ContactInfoProps) => (
  <div className={`bg-green-700 text-white py-2 ${className}`}>
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
      <div className="flex flex-wrap justify-between items-center text-sm">
        <div className="flex items-center space-x-4 sm:space-x-6">
          <div className="flex items-center">
            <PhoneIcon
              className="h-4 w-4 mr-2 flex-shrink-0"
              aria-hidden="true"
            />
            <a
              href={`tel:${CONTACT_INFO.phone.replace(/\D/g, "")}`}
              className="hover:underline transition-all duration-200"
              aria-label={`Telepon ${CONTACT_INFO.phone}`}
            >
              {CONTACT_INFO.phone}
            </a>
          </div>
          <div className="hidden sm:flex items-center">
            <EnvelopeIcon
              className="h-4 w-4 mr-2 flex-shrink-0"
              aria-hidden="true"
            />
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="hover:underline transition-all duration-200"
              aria-label={`Email ${CONTACT_INFO.email}`}
            >
              {CONTACT_INFO.email}
            </a>
          </div>
        </div>
        <div className="flex items-center space-x-4 sm:space-x-6">
          <div className="hidden lg:flex items-center">
            <ClockIcon
              className="h-4 w-4 mr-2 flex-shrink-0"
              aria-hidden="true"
            />
            <span>{CONTACT_INFO.hours}</span>
          </div>
          <div className="flex items-center">
            <MapPinIcon
              className="h-4 w-4 mr-2 flex-shrink-0"
              aria-hidden="true"
            />
            <span className="hidden sm:inline">{CONTACT_INFO.location}</span>
            <span className="sm:hidden">Bandung</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ServiceDropdown = () => (
  <Popover className="relative">
    {({ open }) => (
      <>
        <PopoverButton
          className={`group inline-flex items-center gap-x-1 text-sm font-medium text-gray-800 outline-none transition-colors focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded-md px-2 py-1 ${
            open ? "text-green-700" : "hover:text-green-700"
          }`}
          aria-expanded={open}
          aria-haspopup="menu"
        >
          Layanan Kesehatan
          <ChevronDownIcon
            className={`h-5 w-5 text-green-600 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </PopoverButton>

        <PopoverPanel className="absolute left-0 top-full z-10 w-80 mt-2 rounded-xl bg-white shadow-lg ring-1 ring-gray-200">
          <div className="p-1">
            {LAYANAN_KESEHATAN.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group flex items-center gap-x-3 rounded-lg p-3 text-sm hover:bg-green-50 focus:bg-green-50 focus:outline-none transition-colors"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-green-600 group-hover:bg-green-100 transition-colors flex-shrink-0">
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-gray-900 truncate">
                    {item.name}
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="bg-gray-50 p-3 rounded-b-xl -mt-2.5">
            <div className="flex gap-x-5">
              <Link
                href="/jadwal"
                className="flex items-center text-sm font-medium text-green-700 hover:text-green-800 focus:text-green-800 focus:outline-none transition-colors"
              >
                <CalendarIcon
                  className="mr-2 h-4 w-4 flex-shrink-0"
                  aria-hidden="true"
                />
                Jadwalkan Kunjungan
              </Link>
              <Link
                href="/kontak"
                className="flex items-center text-sm font-medium text-green-700 hover:text-green-800 focus:text-green-800 focus:outline-none transition-colors"
              >
                <PhoneIcon
                  className="mr-2 h-4 w-4 flex-shrink-0"
                  aria-hidden="true"
                />
                Hubungi Kami
              </Link>
            </div>
          </div>
        </PopoverPanel>
      </>
    )}
  </Popover>
);

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const pathname = usePathname();

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="lg:hidden fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="flex items-center" onClick={onClose}>
            <Image
              src="/images/logo/logo.svg"
              alt="Klinik Utama CMI"
              className="h-8 w-auto"
              width={100}
              height={40}
              priority
            />
            <span className="ml-2 text-base font-bold text-green-900">
              Klinik Utama CMI
            </span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
            aria-label="Tutup menu"
          >
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Contact info */}
        <div className="bg-green-50 rounded-lg p-4 mb-6">
          <div className="space-y-3 text-sm">
            <div className="flex items-center">
              <PhoneIcon
                className="h-5 w-5 text-green-600 mr-3 flex-shrink-0"
                aria-hidden="true"
              />
              <a
                href={`tel:${CONTACT_INFO.phone.replace(/\D/g, "")}`}
                className="text-black hover:text-green-700 transition-colors"
                onClick={onClose}
              >
                {CONTACT_INFO.phone}
              </a>
            </div>
            <div className="flex items-center">
              <EnvelopeIcon
                className="h-5 w-5 text-green-600 mr-3 flex-shrink-0"
                aria-hidden="true"
              />
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="text-black hover:text-green-700 transition-colors break-all"
                onClick={onClose}
              >
                {CONTACT_INFO.email}
              </a>
            </div>
            <div className="flex items-start">
              <ClockIcon
                className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0"
                aria-hidden="true"
              />
              <span className="text-black">{CONTACT_INFO.hours}</span>
            </div>
            <div className="flex items-center">
              <MapPinIcon
                className="h-5 w-5 text-green-600 mr-3 flex-shrink-0"
                aria-hidden="true"
              />
              <span className="text-black">{CONTACT_INFO.location}</span>
            </div>
          </div>
        </div>

        {/* Mobile navigation links */}
        <nav
          className="space-y-6"
          role="navigation"
          aria-label="Menu navigasi mobile"
        >
          {/* Layanan Kesehatan - DISEMBUNYIKAN */}
          {/* <Menu>
            {({ open }) => (
              <div>
                <div className="border-b border-gray-200 pb-3">
                  <MenuButton className="flex w-full items-center justify-between text-base font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md px-2 py-1">
                    Layanan Kesehatan
                    <ChevronDownIcon
                      className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                        open ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </MenuButton>
                  {open && (
                    <MenuItems className="mt-3 space-y-2">
                      {LAYANAN_KESEHATAN.map((item) => (
                        <MenuItem key={item.name}>
                          <Link
                            href={item.href}
                            onClick={onClose}
                            className="flex items-center py-2 pl-4 text-base text-gray-700 hover:text-green-700 focus:text-green-700 focus:outline-none transition-colors rounded-md"
                          >
                            <item.icon
                              className="mr-3 h-5 w-5 text-green-600 flex-shrink-0"
                              aria-hidden="true"
                            />
                            <span className="truncate">{item.name}</span>
                          </Link>
                        </MenuItem>
                      ))}
                    </MenuItems>
                  )}
                </div>
              </div>
            )}
          </Menu> */}

          {/* Other navigation links */}
          <div className="space-y-3">
            {NAVIGATION.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`flex items-center border-b border-gray-200 py-3 text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md px-2 ${
                  pathname === item.href
                    ? "text-green-700 font-semibold"
                    : "text-gray-900 hover:text-green-700"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Action buttons */}
          <div className="pt-4 space-y-3">
            <Link
              href="/jadwal"
              onClick={onClose}
              className="flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-green-700 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
            >
              <CalendarIcon
                className="mr-2 h-5 w-5 flex-shrink-0"
                aria-hidden="true"
              />
              Jadwalkan Kunjungan
            </Link>
            <Link
              href="/kontak"
              onClick={onClose}
              className="flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-green-700 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
            >
              <PhoneIcon
                className="mr-2 h-5 w-5 flex-shrink-0"
                aria-hidden="true"
              />
              Hubungi Kami
            </Link>
            <Link
              href="/daftar-online"
              onClick={onClose}
              className="flex w-full items-center justify-center rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-green-700 focus:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            >
              Daftar Online
              <span className="ml-2" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

// Main Component
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Throttled scroll handler for better performance
  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > 10;
    if (scrolled !== isScrolled) {
      setIsScrolled(scrolled);
    }
  }, [isScrolled]);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const openMobileMenu = useCallback(() => {
    setMobileMenuOpen(true);
  }, []);

  // Debounced scroll handler
  useEffect(() => {
    let ticking = false;

    const scrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollHandler, { passive: true });
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [handleScroll]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Memoize navigation items to prevent re-renders
  const navigationItems = useMemo(
    () =>
      NAVIGATION.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md px-3 py-2 whitespace-nowrap ${
            pathname === item.href
              ? "text-green-700 font-semibold"
              : "text-gray-800 hover:text-green-700"
          }`}
        >
          {item.name}
        </Link>
      )),
    [pathname]
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "shadow-md" : ""
      } bg-white`}
    >
      <ContactInfo />

      {/* Main navigation */}
      <nav
        className={`relative container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 transition-all duration-300 ${
          isScrolled ? "py-3" : "py-4"
        }`}
        role="navigation"
        aria-label="Navigasi utama"
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link
              href="/"
              className="flex items-center group focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md p-1"
            >
              <Image
                src="/images/logo/logo.svg"
                alt="Klinik Utama CMI"
                className="h-7 sm:h-8 w-auto transition-transform group-hover:scale-105"
                width={100}
                height={40}
                priority
              />
              <span className="ml-2 sm:ml-3 text-base sm:text-lg font-bold text-emerald-900 group-hover:text-green-700 transition-colors">
                <span className="hidden sm:inline">Klinik Utama CMI</span>
                <span className="sm:hidden">CMI</span>
              </span>
            </Link>
          </div>

          {/* Desktop navigation - POSISI KANAN */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            <PopoverGroup className="flex items-center space-x-1">
              {/* Service Dropdown - DISEMBUNYIKAN */}
              {/* <ServiceDropdown /> */}
              {navigationItems}
            </PopoverGroup>

            {/* CTA Button */}
            <div className="ml-8">
              <Link
                href="/kontak"
                className="inline-flex items-center justify-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all hover:shadow-md whitespace-nowrap"
              >
                Daftar Online
                <span className="ml-2" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Tablet navigation */}
          <div className="hidden md:flex lg:hidden items-center space-x-2 overflow-x-auto">
            {navigationItems.slice(0, 4)}
            <Link
              href="/daftar-online"
              className="inline-flex items-center justify-center rounded-lg bg-green-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all hover:shadow-md whitespace-nowrap ml-4"
            >
              Daftar
              <span className="ml-1" aria-hidden="true">
                →
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={openMobileMenu}
              className="inline-flex items-center justify-center rounded-md p-2 text-green-800 hover:text-green-600 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
              aria-label="Buka menu utama"
              aria-expanded={mobileMenuOpen}
            >
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>

      {/* Divider */}
      <div className="border-b border-gray-200" />

      {/* Mobile menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={closeMobileMenu} />
    </header>
  );
}
