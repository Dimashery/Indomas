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
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Delay berdasarkan index untuk efek staggered
          setTimeout(() => {
            setIsVisible(true);
          }, index * 200);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-sm w-full transform transition-all duration-700 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-8 scale-95"
      }`}
    >
      {/* Image Container */}
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className={`object-cover transition-transform duration-700 ease-out ${
            isVisible ? "scale-100" : "scale-110"
          }`}
        />
      </div>

      {/* Content Container */}
      <div className="p-5">
        {/* Role */}
        <p
          className={`text-sm text-gray-500 mb-1 transition-all duration-700 ease-out delay-100 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
          }`}
        >
          {role}
        </p>

        {/* Name */}
        <h3
          className={`text-lg font-semibold text-gray-900 mb-3 transition-all duration-700 ease-out delay-200 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
          }`}
        >
          {name}
        </h3>

        {/* Description */}
        <p
          className={`text-sm text-gray-600 leading-relaxed mb-4 transition-all duration-700 ease-out delay-300 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
          }`}
        >
          {description}
        </p>

        {/* Member Count */}
        <div
          className={`flex items-center justify-end text-gray-500 transition-all duration-700 ease-out delay-400 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
          }`}
        >
          <FaPeopleGroup className="text-base mr-1" />
          <span className="text-sm">{memberCount}</span>
        </div>
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
      role: "Kepala Sekretariat",
      name: "John Susanto",
      description:
        "Bertugas dalam hal administrasi, keuangan, dan umum. Pembagian divisi ini dapat bervariasi tergantung pada peraturan daerah masing-masing, namun secara umum, keempat bidang di atas merupakan bagian inti dari Bakesbangpol.",
      memberCount: 20,
      imageUrl: "/divisi/Divisi.png",
    },
    {
      role: "Kepala Bidang Kesatuan Bangsa",
      name: "John Susanto",
      description:
        "Bertugas dalam hal administrasi, keuangan, dan umum. Pembagian divisi ini dapat bervariasi tergantung pada peraturan daerah masing-masing, namun secara umum, keempat bidang di atas merupakan bagian inti dari Bakesbangpol.",
      memberCount: 20,
      imageUrl: "/divisi/Divisi.png",
    },
    {
      role: "Kepala Bidang Politik dalam Negeri dan Organisasi Kemasyarakat",
      name: "John Susanto",
      description:
        "Bertugas dalam hal administrasi, keuangan, dan umum. Pembagian divisi ini dapat bervariasi tergantung pada peraturan daerah masing-masing, namun secara umum, keempat bidang di atas merupakan bagian inti dari Bakesbangpol.",
      memberCount: 20,
      imageUrl: "/divisi/Divisi.png",
    },
  ];

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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Bidang
          </h2>
        </div>

        {/* Division Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {divisionData.map((division, idx) => (
            <DivisionCard key={idx} {...division} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section4Home;
