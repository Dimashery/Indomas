"use client";

// C:\Indomas\components\user\home_component\Section2Home.tsx
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// Mendefinisikan antarmuka untuk data organisasi
interface Organization {
  name: string;
  type: string;
  email: string;
}

// Mendefinisikan antarmuka untuk data author
interface Author {
  name: string;
  location: string;
}

// Mendefinisikan antarmuka untuk properti kartu berita
interface NewsCardProps {
  id: string | number;
  title: string;
  date: string;
  author: Author;
  content: string;
  image: string;
  organization: Organization;
  index: number;
}

// Komponen untuk satu kartu berita
const NewsCard: React.FC<NewsCardProps> = ({
  title,
  date,
  author,
  content,
  image,
  organization,
  index,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, index * 150);
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={`bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${
        isHovered
          ? "shadow-xl transform -translate-y-2"
          : "shadow-md transform translate-y-0"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gambar berita */}
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`transition-transform duration-500 ease-out ${
            isHovered ? "scale-105" : "scale-100"
          }`}
        />
      </div>

      {/* Konten berita */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Kategori dan tanggal */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
            {organization.type}
          </span>
          <span className="text-xs text-gray-500">{date}</span>
        </div>

        {/* Judul */}
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
          {title}
        </h3>

        {/* Deskripsi dengan selengkapnya */}
        <div className="text-gray-600 text-sm flex-grow mb-4">
          <p className="line-clamp-3 mb-2">{content}</p>
          <Link
            href="/berita"
            className="text-green-600 hover:text-green-800 text-sm font-medium transition-colors duration-200 hover:underline"
          >
            Selengkapnya
          </Link>
        </div>

        {/* Organization info */}
        <div className="flex items-center mt-auto pt-4 border-t border-gray-100">
          <div className="relative w-8 h-8 mr-3 flex-shrink-0">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-semibold">
                {organization.name.charAt(0)}
              </span>
            </div>
          </div>
          <div className="text-sm">
            <p className="font-medium text-gray-900">{organization.name}</p>
            <p className="text-xs text-gray-500">{author.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Komponen utama Section2Home
const Section2Home: React.FC = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [animateButton, setAnimateButton] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [manualOffset, setManualOffset] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [cardWidth, setCardWidth] = useState(320);

  const headerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (scrollContainerRef.current) {
        setContainerWidth(scrollContainerRef.current.offsetWidth);
      }
      // Responsive card width
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

      if (isMobile) {
        setCardWidth(280);
      } else if (isTablet) {
        setCardWidth(300);
      } else {
        setCardWidth(320);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Intersection Observer untuk header
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeaderVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Intersection Observer untuk button
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateButton(true);
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (buttonRef.current) {
      observer.observe(buttonRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Calculate max scroll bounds
  const getMaxScrollBounds = () => {
    const totalWidth = (cardWidth + 24) * 6; // 6 original cards
    const maxNegativeOffset = -(totalWidth - containerWidth + 100); // Add some padding
    const maxPositiveOffset = 100; // Allow some positive scroll
    return { maxNegativeOffset, maxPositiveOffset };
  };

  // Handle mouse/touch drag
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;

    setIsDragging(true);
    setIsPaused(true);
    setStartX(e.pageX);
    setScrollLeft(manualOffset);

    // Prevent text selection
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;

    e.preventDefault();
    const x = e.pageX;
    const walk = (x - startX) * 1.5; // Sensitivity multiplier
    const newOffset = scrollLeft + walk;

    // Apply bounds
    const { maxNegativeOffset, maxPositiveOffset } = getMaxScrollBounds();
    const constrainedOffset = Math.max(
      maxNegativeOffset,
      Math.min(maxPositiveOffset, newOffset)
    );

    setManualOffset(constrainedOffset);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setTimeout(() => setIsPaused(false), 500);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setTimeout(() => setIsPaused(false), 500);
  };

  // Touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return;

    setIsDragging(true);
    setIsPaused(true);
    setStartX(e.touches[0].pageX);
    setScrollLeft(manualOffset);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;

    const x = e.touches[0].pageX;
    const walk = (x - startX) * 1.5;
    const newOffset = scrollLeft + walk;

    const { maxNegativeOffset, maxPositiveOffset } = getMaxScrollBounds();
    const constrainedOffset = Math.max(
      maxNegativeOffset,
      Math.min(maxPositiveOffset, newOffset)
    );

    setManualOffset(constrainedOffset);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setTimeout(() => setIsPaused(false), 500);
  };

  // Data dummy untuk kartu berita - disesuaikan dengan struktur baru
  const newsData = [
    {
      id: "1",
      title: "Pembuatan Batik Di Desa Bumiaji",
      date: "12 Juli 2025",
      author: {
        name: "Kebersaman Social",
        location: "Jl. Kasiman No.1, Malang Raya",
      },
      content:
        "Indomas merupakan sebuah website yang memberikan informasi terkait kegiatan organisasi yang terdaftar pada Badan Kesatuan Bangsa dan Politik. Website ini menyediakan platform untuk berbagai organisasi masyarakat untuk berbagi informasi kegiatan dan program mereka.",
      image: "/berita/Berita1.png",
      organization: {
        name: "Kebersaman Sosial",
        type: "Sosial",
        email: "kebersaman.sosial@gmail.com",
      },
    },
    {
      id: "2",
      title: "Program Bantuan Sosial untuk Masyarakat",
      date: "15 Juli 2025",
      author: {
        name: "Yayasan Peduli Sesama",
        location: "Jl. Soekarno Hatta No.5, Malang",
      },
      content:
        "Program bantuan sosial yang dilakukan oleh yayasan untuk membantu masyarakat kurang mampu dengan memberikan bantuan sembako dan pelatihan keterampilan.",
      image: "/berita/Berita2.png",
      organization: {
        name: "Yayasan Peduli Sesama",
        type: "Sosial",
        email: "peduli.sesama@gmail.com",
      },
    },
    {
      id: "3",
      title: "Festival Budaya Nusantara 2025",
      date: "18 Juli 2025",
      author: {
        name: "Komunitas Budaya Batu",
        location: "Jl. Brantas No.10, Batu",
      },
      content:
        "Festival budaya tahunan yang menampilkan berbagai kesenian tradisional dari seluruh Nusantara dengan partisipasi dari berbagai komunitas budaya.",
      image: "/berita/Berita3.png",
      organization: {
        name: "Komunitas Budaya Batu",
        type: "Kebudayaan",
        email: "budaya.batu@gmail.com",
      },
    },
    {
      id: "4",
      title: "Gerakan Lingkungan Hidup Bersih",
      date: "20 Juli 2025",
      author: {
        name: "Green Earth Foundation",
        location: "Jl. Dieng No.20, Malang",
      },
      content:
        "Kampanye kesadaran lingkungan dengan mengadakan kegiatan bersih-bersih sungai dan penanaman pohon di berbagai titik kota Batu.",
      image: "/berita/Berita1.png",
      organization: {
        name: "Green Earth Foundation",
        type: "Lingkungan",
        email: "green.earth@gmail.com",
      },
    },
    {
      id: "5",
      title: "Gerakan Lingkungan Hidup Bersih",
      date: "20 Juli 2025",
      author: {
        name: "Green Earth Foundation",
        location: "Jl. Dieng No.20, Malang",
      },
      content:
        "Kampanye kesadaran lingkungan dengan mengadakan kegiatan bersih-bersih sungai dan penanaman pohon di berbagai titik kota Batu.",
      image: "/berita/Berita1.png",
      organization: {
        name: "Green Earth Foundation",
        type: "Lingkungan",
        email: "green.earth@gmail.com",
      },
    },
    {
      id: "6",
      title: "Gerakan Lingkungan Hidup Bersih",
      date: "20 Juli 2025",
      author: {
        name: "Green Earth Foundation",
        location: "Jl. Dieng No.20, Malang",
      },
      content:
        "Kampanye kesadaran lingkungan dengan mengadakan kegiatan bersih-bersih sungai dan penanaman pohon di berbagai titik kota Batu.",
      image: "/berita/Berita1.png",
      organization: {
        name: "Green Earth Foundation",
        type: "Lingkungan",
        email: "green.earth@gmail.com",
      },
    },
  ];

  // Tentukan apakah perlu menggunakan infinite scroll
  const shouldUseInfiniteScroll = newsData.length > 3;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-12 transition-all duration-800 ease-out ${
            isHeaderVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Berita Organisasi Masyarakat
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sekumpulan Berita Terkini dari Organisasi Masyarakat kota Batu
          </p>
          {shouldUseInfiniteScroll && (
            <p className="text-sm text-gray-500 mt-2">
              Geser untuk melihat berita lainnya
            </p>
          )}
        </div>

        {/* Infinite Scroll Layout with Drag Support atau Static Grid Layout */}
        {shouldUseInfiniteScroll ? (
          // Layout untuk data banyak (infinite scroll)
          <div
            ref={scrollContainerRef}
            className="relative overflow-hidden mb-12 cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Gradient fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 lg:w-16 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 lg:w-16 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

            <div
              className={`flex gap-4 sm:gap-6 transition-transform duration-200 ease-out ${
                isPaused ? "" : "animate-scroll"
              }`}
              style={{
                transform: `translateX(${manualOffset}px)`,
                width: `calc(${cardWidth}px * 12 + 24px * 11)`,
              }}
              onMouseEnter={() => !isDragging && setIsPaused(true)}
              onMouseLeave={() => !isDragging && setIsPaused(false)}
            >
              {/* Duplikasi data untuk infinite scroll */}
              {[...newsData, ...newsData].map((news, index) => (
                <div
                  key={`${news.id}-${index}`}
                  className="flex-shrink-0"
                  style={{ width: `${cardWidth}px` }}
                >
                  <NewsCard
                    id={news.id}
                    title={news.title}
                    date={news.date}
                    author={news.author}
                    content={news.content}
                    image={news.image}
                    organization={news.organization}
                    index={index}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Layout untuk data sedikit (static grid di tengah)
          <div className="mb-12">
            <div
              className={`grid gap-4 sm:gap-6 justify-center ${
                newsData.length === 1
                  ? "grid-cols-1 max-w-sm mx-auto"
                  : newsData.length === 2
                  ? "grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto"
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
              }`}
            >
              {newsData.map((news, index) => (
                <div key={news.id} className="w-full max-w-sm mx-auto">
                  <NewsCard
                    id={news.id}
                    title={news.title}
                    date={news.date}
                    author={news.author}
                    content={news.content}
                    image={news.image}
                    organization={news.organization}
                    index={index}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tombol Buat Kegiatan */}
        <div
          ref={buttonRef}
          className={`text-center transition-all duration-1000 ${
            animateButton
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <Link href="/buat-berita">
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 sm:py-3 sm:px-8 md:py-4 md:px-10 text-sm sm:text-base md:text-lg rounded-[28px] transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95">
              Buat Kegiatan
            </button>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .animate-scroll {
          animation: scroll 60s linear infinite;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* Disable text selection during drag */
        .cursor-grabbing * {
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
        }

        /* Mobile touch improvements */
        @media (max-width: 768px) {
          .cursor-grab {
            cursor: grab;
          }
          .cursor-grabbing {
            cursor: grabbing;
          }
        }
      `}</style>
    </section>
  );
};

export default Section2Home;
