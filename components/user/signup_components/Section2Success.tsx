"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

export default function Section1Success() {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setShowAnimation(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center">
      {/* Background with overlay */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
            url('/kota-batu.jpg')
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#1e3a8a", // Fallback color
        }}
      ></div>

      {/* Success Card Container */}
      <div className="relative z-30 w-full max-w-md mx-4">
        <div
          className={`bg-white bg-opacity-95 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white border-opacity-20 transform transition-all duration-700 ${
            showAnimation ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          {/* Logo Section */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-12 relative">
              <Image
                src="/logos/KESBANG.png"
                alt="KESBANG Logo"
                fill
                className="object-contain"
                onError={() => console.log("KESBANG logo failed to load")}
              />
            </div>
            <div className="w-12 h-12 relative">
              <Image
                src="/logos/kotabatu.png"
                alt="Kota Batu Logo"
                fill
                className="object-contain"
                onError={() => console.log("Kota Batu logo failed to load")}
              />
            </div>
          </div>

          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div
              className={`w-20 h-20 bg-green-500 rounded-full flex items-center justify-center transform transition-all duration-1000 ${
                showAnimation ? "scale-100 rotate-0" : "scale-0 rotate-180"
              }`}
            >
              <Check className="w-12 h-12 text-white stroke-[3]" />
            </div>
          </div>

          {/* Success Message */}
          <div
            className={`text-center transform transition-all duration-700 delay-300 ${
              showAnimation
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Selamat Anda Telah
            </h1>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Membuat Akun Baru!
            </h2>

            {/* <p className="text-gray-600 text-sm">
              Kembali ke{' '}
              <Link 
                href="/auth/login"
                className="text-green-500 hover:text-green-600 font-semibold transition-colors duration-200 hover:underline"
              >
                Halaman Login
              </Link>
            </p> */}
            <p className="text-gray-600 text-sm mb-8">
              Untuk masuk ke Halaman Web
            </p>
          </div>

          {/* Action Button */}
          <div
            className={`transform transition-all duration-700 delay-500 ${
              showAnimation
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <Link href="/auth/login">
              <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none shadow-lg">
                Kembali Ke Login
              </button>
            </Link>
          </div>
        </div>

        {/* Footer Text */}
        <div
          className={`text-center mt-6 text-white text-sm drop-shadow-lg transform transition-all duration-700 delay-700 ${
            showAnimation
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
        >
          <p>Website dari Badan Kesatuan Bangsa dan Politik (BAKESBANGPOL)</p>
          <p>Sebagai Keperluan Pendataan Organisasi Masyarakat</p>
        </div>
      </div>

      {/* Floating Animation Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-green-400 rounded-full opacity-30 transform transition-all duration-1000 delay-${
              i * 200
            } ${showAnimation ? "animate-pulse" : "opacity-0"}`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + i * 0.5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
