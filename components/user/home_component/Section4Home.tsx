"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaPeopleGroup } from "react-icons/fa6";

// Props untuk satu kartu divisi
interface DivisionCardProps {
  role: string;
  name: string;
  description: string;
  memberCount: number;
  imageUrl: string;
  index: number;
}

// Komponen kartu divisi
const DivisionCard: React.FC<DivisionCardProps> = ({
  role,
  name,
  description,
  memberCount,
  imageUrl,
  index,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileInView, setIsMobileInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Delay berdasarkan index untuk efek staggered
          setTimeout(() => {
            setIsVisible(true);
          }, index * 200);

          // Set mobile in view untuk efek zoom mobile
          setIsMobileInView(true);
          observer.disconnect();
        } else {
          setIsMobileInView(false);
        }
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  // Deteksi jika device mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div
      ref={cardRef}
      className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden w-full h-full flex flex-col transform transition-all duration-700 ease-out cursor-pointer group ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-8 scale-95"
      } 
      hover:shadow-2xl hover:shadow-green-500/10 hover:-translate-y-2 hover:scale-105 hover:border-green-200 hover:z-10
      ${isMobile && isMobileInView && isVisible ? "md:scale-100 scale-105" : ""}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className={`object-cover transition-all duration-700 ease-out ${
            isVisible ? "scale-100" : "scale-110"
          } group-hover:scale-110 group-hover:brightness-110
          ${
            isMobile && isMobileInView && isVisible
              ? "md:scale-100 scale-110"
              : ""
          }
          `}
        />

        {/* Overlay gradient yang muncul saat hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-green-600/20 to-transparent transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Efek shimmer saat hover */}
        <div
          className={`absolute top-0 -left-full h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform transition-transform duration-1000 ${
            isHovered ? "translate-x-full" : ""
          }`}
        />
      </div>

      {/* Content Container */}
      <div className="p-5 flex-1 flex flex-col relative">
        {/* Background glow effect */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/50 rounded-b-2xl transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="relative z-10">
          {/* Role */}
          <p
            className={`text-sm mb-1 transition-all duration-700 ease-out delay-100 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-4"
            } ${isHovered ? "text-green-600 font-medium" : "text-gray-500"}`}
          >
            {role}
          </p>

          {/* Name */}
          <h3
            className={`text-lg font-semibold mb-3 transition-all duration-700 ease-out delay-200 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-4"
            } ${
              isHovered ? "text-green-800 transform scale-105" : "text-gray-900"
            }`}
          >
            {name}
          </h3>

          {/* Description */}
          <p
            className={`text-sm leading-relaxed mb-4 flex-1 transition-all duration-700 ease-out delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-4"
            } ${isHovered ? "text-gray-700" : "text-gray-600"}`}
          >
            {description}
          </p>

          {/* Member Count */}
          <div
            className={`flex items-center justify-end transition-all duration-700 ease-out delay-400 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-4"
            } ${
              isHovered ? "text-green-600 transform scale-110" : "text-gray-500"
            }`}
          >
            <FaPeopleGroup
              className={`text-base mr-1 transition-transform duration-300 ${
                isHovered ? "animate-pulse" : ""
              }`}
            />
            <span className="text-sm font-medium">{memberCount}</span>
          </div>
        </div>

        {/* Decorative corner accent */}
        <div
          className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-green-500/10 to-transparent transition-all duration-500 ${
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
        />
      </div>
    </div>
  );
};

// Komponen utama Section4Home
const Section4Home: React.FC = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -20px 0px",
      }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const divisionData = [
    {
      role: "Kepala Badan Kesatuan Bangsa dan Politik",
      name: "Akhmad Dahlan, S.Sos., M.A.P",
      description:
        "Memimpin dan mengkoordinasikan seluruh kegiatan Bakesbangpol dalam menjaga kesatuan bangsa dan stabilitas politik daerah. Bertanggung jawab atas perencanaan strategis, pengawasan pelaksanaan program, dan koordinasi dengan instansi terkait.",
      memberCount: 20,
      imageUrl: "/divisi/Divisi1.jpg",
    },
    {
      role: "Sekretaris",
      name: "Arief Rachman Ardyasana, SSTP",
      description:
        "Mengelola administrasi umum, keuangan, kepegawaian, dan ketatausahaan Bakesbangpol. Memastikan kelancaran operasional harian dan mendukung pelaksanaan tugas-tugas teknis semua bidang dalam organisasi.",
      memberCount: 15,
      imageUrl: "/divisi/Divisi2.jpeg",
    },
    {
      role: "Kepala Bidang Kesatuan Bangsa",
      name: "Alfian Hafny, SH, M.M",
      description:
        "Bertanggung jawab dalam pembinaan ideologi Pancasila, wawasan kebangsaan, ketahanan nasional, dan penanganan konflik sosial. Melakukan monitoring terhadap isu-isu yang dapat mengganggu persatuan dan kesatuan bangsa.",
      memberCount: 12,
      imageUrl: "/divisi/Divisi3.jpg",
    },
    {
      role: "Kepala Bidang Politik dalam Negeri dan Organisasi Kemasyarakatan",
      name: "Badrut Tamam Widarto, SH, M.H",
      description:
        "Mengelola pembinaan partai politik, organisasi kemasyarakatan, dan lembaga swadaya masyarakat. Melakukan fasilitasi kegiatan politik yang demokratis dan mengawasi kepatuhan organisasi terhadap peraturan yang berlaku.",
      memberCount: 18,
      imageUrl: "/divisi/Divisi4.jpg",
    },
  ];

  // Fungsi untuk menentukan layout grid berdasarkan jumlah card
  const getGridLayout = (totalCards: number) => {
    if (totalCards <= 4) {
      return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
    } else if (totalCards === 5) {
      return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5";
    } else if (totalCards === 6) {
      return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    } else {
      return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
    }
  };

  // Split data untuk layout khusus jika ada 5 atau 6 card
  const renderCards = () => {
    const totalCards = divisionData.length;

    if (totalCards === 5) {
      // 4 card di baris pertama, 1 card di tengah baris kedua
      return (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {divisionData.slice(0, 4).map((division, index) => (
              <DivisionCard key={index} {...division} index={index} />
            ))}
          </div>
          <div className="flex justify-center">
            <div className="w-full sm:w-1/2 lg:w-1/4">
              <DivisionCard key={4} {...divisionData[4]} index={4} />
            </div>
          </div>
        </>
      );
    } else if (totalCards === 6) {
      // 4 card di baris pertama, 2 card di tengah baris kedua
      return (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {divisionData.slice(0, 4).map((division, index) => (
              <DivisionCard key={index} {...division} index={index} />
            ))}
          </div>
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full sm:w-2/3 lg:w-1/2">
              {divisionData.slice(4, 6).map((division, index) => (
                <DivisionCard key={index + 4} {...division} index={index + 4} />
              ))}
            </div>
          </div>
        </>
      );
    } else {
      // Layout normal untuk jumlah card lainnya
      return (
        <div className={`grid ${getGridLayout(totalCards)} gap-6`}>
          {divisionData.map((division, index) => (
            <DivisionCard key={index} {...division} index={index} />
          ))}
        </div>
      );
    }
  };

  return (
    <section className="bg-gray-50 py-16 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-12 transition-all duration-800 ease-out ${
            headerVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Bidang
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Bakesbangpol terdiri dari berbagai bidang sebagai berikut:
          </p>
        </div>

        {/* Division Cards Grid */}
        {renderCards()}
      </div>
    </section>
  );
};

export default Section4Home;
