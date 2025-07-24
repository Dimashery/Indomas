"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Section2SuccessDaftar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animateContent, setAnimateContent] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Animasi header saat component mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    // Animasi content saat component mount
    const contentTimer = setTimeout(() => {
      setAnimateContent(true);
    }, 800);

    return () => {
      clearTimeout(timer);
      clearTimeout(contentTimer);
    };
  }, []);

  const handleBackToHome = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen">
      {/* Section 1: Header dengan Background Image */}
      <div className="relative w-full">
        {/* Background Image */}
        <div
          className="w-screen bg-cover bg-center bg-no-repeat relative left-1/2 transform -translate-x-1/2"
          style={{
            backgroundImage: "url('/bg_form.png')",
            height: "400px",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            minWidth: "101vw",
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Header Content */}
        <div className="absolute inset-0 flex items-center justify-center w-full h-full">
          <div
            className={`text-center transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-4xl font-bold text-white mb-4">
              Pendaftaran Berhasil!
            </h1>
            <p className="text-white/80 text-lg">
              Organisasi masyarakat Anda telah berhasil didaftarkan
            </p>
          </div>
        </div>
      </div>

      {/* Section 2: Success Content dengan Background Putih Penuh */}
      <div className="bg-white min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Success Icon dan Message */}
            <div
              className={`text-center mb-12 transition-all duration-700 ${
                animateContent
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "0ms" }}
            >
              {/* Success Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>

              {/* Success Message */}
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Selamat!
              </h2>
              <p className="text-gray-600 text-lg mb-2">
                Pendaftaran organisasi masyarakat Anda telah berhasil disubmit
                ke sistem.
              </p>
              <p className="text-gray-500 text-base">
                Tim admin akan melakukan verifikasi dan review terhadap dokumen
                yang Anda kirimkan.
              </p>
            </div>

            {/* Info Card */}
            <div
              className={`bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 transition-all duration-700 ${
                animateContent
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "150ms" }}
            >
              <div className="flex items-start">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">
                    INFORMASI PENTING
                  </h3>
                  <ul className="text-blue-700 space-y-1">
                    <li>
                      • Pendaftaran Anda akan diverifikasi oleh tim admin dalam
                      2-5 hari kerja
                    </li>
                    <li>
                      • Anda akan mendapat notifikasi email atau WhatsApp
                      mengenai status pendaftaran
                    </li>
                    <li>
                      • Pastikan email dan nomor telepon yang didaftarkan aktif
                    </li>
                    <li>
                      • Status pendaftaran dapat dilihat di dashboard akun Anda
                      atau Melalui Halaman Daftar Ormas ini
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Status Info */}
            <div
              className={`bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8 transition-all duration-700 ${
                animateContent
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="flex items-start">
                <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                    STATUS SAAT INI
                  </h3>
                  <p className="text-yellow-700">
                    Pendaftaran Anda sedang dalam status{" "}
                    <strong>&quot;Menunggu Verifikasi&quot;</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 ${
                animateContent
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <button
                onClick={handleBackToHome}
                className="px-8 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all duration-200 transform hover:scale-[1.02] focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 border border-gray-300"
              >
                Kembali ke Beranda
              </button>
            </div>

            {/* Additional Info */}
            <div
              className={`mt-12 text-center transition-all duration-700 ${
                animateContent
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "450ms" }}
            >
              <p className="text-gray-500 text-sm">
                Butuh bantuan? Silakan hubungi{" "}
                <span className="text-green-600 font-medium cursor-pointer hover:text-green-700">
                  tim support
                </span>{" "}
                kami atau kunjungi halaman{" "}
                <span className="text-green-600 font-medium cursor-pointer hover:text-green-700">
                  <Link href="/faq">FAQ</Link>
                </span>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2SuccessDaftar;