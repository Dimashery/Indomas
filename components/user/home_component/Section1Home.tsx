"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const Section1Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animateText, setAnimateText] = useState(false);
  const [animateButton, setAnimateButton] = useState(false);

  useEffect(() => {
    // Animasi header saat component mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    // Animasi teks deskripsi saat component mount
    const textTimer = setTimeout(() => {
      setAnimateText(true);
    }, 800);

    // Animasi tombol saat component mount
    const buttonTimer = setTimeout(() => {
      setAnimateButton(true);
    }, 1400);

    return () => {
      clearTimeout(timer);
      clearTimeout(textTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  return (
    <div className="relative w-full h-screen min-h-[600px]">
      <Image
        src="/kota-batu.jpg"
        alt="Dashboard Background"
        layout="fill"
        objectFit="cover"
        className="opacity-50"
      />
      <div className="absolute inset-0 flex items-center justify-center flex-col text-center z-0 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Selamat Datang
          </h1>
          <div className="mt-2">
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white">
              di{" "}
            </span>
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white">
              INDOMAS
            </span>
          </div>
        </div>

        {/* Description Section */}
        <div
          className={`text-sm sm:text-base md:text-lg lg:text-xl font-medium text-white mt-6 sm:mt-8 md:mt-12 lg:mt-16 transition-all duration-1000 max-w-5xl leading-relaxed px-2 ${
            animateText
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <p className="mb-1 sm:mb-1">
            Informasi Data Organisasi Masyarakat (INDOMAS)
          </p>
          <p className="mb-1 sm:mb-1">
            merupakan sebuah pusat informasi dan kegiatan
          </p>
          <p className="mb-1 sm:mb-1 ">
            Organisasi Masyarakat pada Badan Kesatuan
          </p>
          <p>Bangsa dan Politik</p>
        </div>

        {/* Button Section */}
        <div
          className={`mt-8 sm:mt-12 md:mt-16 lg:mt-20 transition-all duration-1000 ${
            animateButton
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <Link href="/daftar-ormas">
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 sm:py-3 sm:px-8 md:py-4 md:px-10 text-sm sm:text-base md:text-lg rounded-[28px] transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95">
              Mulai Mendaftar
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Section1Home;
