"use client";

// C:\Indomas\components\user\home_component\Section3Home.tsx
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const Section3Home: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);
  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/bg-form8.jpeg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Content Container with proper top padding to avoid navbar overlap */}
      <div className="relative container mx-auto px-6 lg:px-8 py-20 pt-32">
        <div className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto gap-12">
          {/* Text Content */}
          <div
            className={`flex-1 text-white max-w-3xl opacity-0 ${
              isVisible ? "animate-fade-in-left" : ""
            }`}
          >
            <h2
              className={`text-3xl lg:text-4xl xl:text-5xl font-bold mb-8 leading-tight opacity-0 ${
                isVisible ? "animate-slide-down delay-300" : ""
              }`}
            >
              Tentang Kami:
              <br />
              <span
                className={`text-2xl lg:text-3xl xl:text-4xl opacity-0 ${
                  isVisible ? "animate-slide-down delay-500" : ""
                }`}
              >
                Badan Kesatuan Bangsa dan Politik
              </span>
            </h2>

            <p
              className={`text-base lg:text-lg xl:text-xl leading-relaxed text-gray-200 font-light opacity-0 ${
                isVisible ? "animate-fade-in-up delay-700" : ""
              }`}
            >
              BAKESBANGPOL adalah lembaga pemerintah yang vital, berdedikasi
              untuk memupuk persatuan nasional dan menjaga stabilitas politik di
              seluruh Indonesia. Kami beroperasi baik di tingkat nasional maupun
              daerah, berfungsi sebagai pilar utama dalam menjaga harmoni
              sosial, mempromosikan nilai-nilai demokrasi, serta memastikan
              keamanan dan kesejahteraan masyarakat kita yang beragam.
            </p>
          </div>

          {/* Logo Container */}
          <div
            className={`flex-shrink-0 flex flex-col items-center space-y-6 lg:space-y-8 opacity-0 ${
              isVisible ? "animate-fade-in-right delay-400" : ""
            }`}
          >
            {/* Logo Kota Batu */}
            <div
              className={`relative w-32 h-32 lg:w-36 lg:h-36 xl:w-36 xl:h-36 opacity-0 ${
                isVisible ? "animate-scale-in delay-900" : ""
              } hover:scale-110 transition-transform duration-300`}
            >
              <Image
                src="/logos/kotabatu.png"
                alt="Logo Kota Batu"
                fill
                style={{ objectFit: "contain" }}
                className="drop-shadow-2xl"
              />
            </div>

            {/* Logo KESBANG */}
            <div
              className={`relative w-28 h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 opacity-0 ${
                isVisible ? "animate-scale-in delay-1100" : ""
              } hover:scale-110 transition-transform duration-300`}
            >
              <Image
                src="/logos/KESBANG.png"
                alt="Logo KESBANG"
                fill
                style={{ objectFit: "contain" }}
                className="drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in-left {
          animation: fade-in-left 0.8s ease-out forwards;
        }

        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-slide-down {
          animation: slide-down 0.6s ease-out forwards;
        }

        .animate-scale-in {
          animation: scale-in 0.6s ease-out forwards;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }

        .delay-400 {
          animation-delay: 0.4s;
        }

        .delay-500 {
          animation-delay: 0.5s;
        }

        .delay-700 {
          animation-delay: 0.7s;
        }

        .delay-900 {
          animation-delay: 0.9s;
        }

        .delay-1100 {
          animation-delay: 1.1s;
        }
      `}</style>
    </section>
  );
};

export default Section3Home;
