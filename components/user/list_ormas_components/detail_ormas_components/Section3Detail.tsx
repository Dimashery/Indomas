"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface OrmasData {
  id: string;
  name: string;
  category: string;
  email: string;
  phone: string;
  address: string;
  registrationDate: string;
  description: string;
  logo?: string;
  status: "active" | "inactive";
}

interface NewsItem {
  id: string;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
  category: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
}

interface Section3DetailProps {
  ormasData: OrmasData;
}

// Komponen untuk satu kartu berita
const NewsCard: React.FC<{ news: NewsItem; index: number }> = ({
  news,
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
          }, index * 100);
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
      className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${
        isHovered
          ? "shadow-xl transform -translate-y-1"
          : "shadow-md transform translate-y-0"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header dengan logo organisasi */}
      <div className="flex items-center p-4 border-b border-gray-100">
        <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mr-2">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">PMM UMM</p>
          <p className="text-xs text-gray-500">A. Rahman No.1, Malang Raya</p>
        </div>
      </div>

      {/* Gambar berita */}
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={news.imageUrl}
          alt={news.title}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`transition-transform duration-500 ease-out ${
            isHovered ? "scale-105" : "scale-100"
          }`}
        />
      </div>

      {/* Konten berita */}
      <div className="p-4">
        {/* Judul */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {news.title}
        </h3>

        {/* Tanggal */}
        <p className="text-sm text-gray-500 mb-3">{news.date}</p>

        {/* Deskripsi */}
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {news.description}
        </p>

        {/* Link selengkapnya */}
        <Link
          href={`/berita/${news.id}`}
          className="text-green-600 hover:text-green-800 text-sm font-medium transition-colors duration-200 hover:underline"
        >
          Selengkapnya
        </Link>
      </div>
    </div>
  );
};

const Section3Detail: React.FC<Section3DetailProps> = ({}) => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const headerRef = useRef<HTMLDivElement>(null);

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

  // Data dummy untuk berita organisasi
  const newsData: NewsItem[] = [
    {
      id: "1",
      title: "Pembuatan Batik Di Desa Bumiaji",
      date: "12 Juli 2025 18:25",
      description:
        "Indomas merupakan sebuah website yang memberikan informasi terkait kegiatan organisasi yang terdaftar pada Badan Kesatuan Bangsa dan Politik.",
      imageUrl: "/berita/Berita1.png",
      category: "Kebudayaan",
      author: "Ahmad Fauzi",
      authorRole: "Koordinator PMM",
      authorAvatar: "/logos/KESBANG.png",
    },
    {
      id: "2",
      title: "Pembuatan Batik Di Desa Bumiaji",
      date: "12 Juli 2025 18:25",
      description:
        "Indomas merupakan sebuah website yang memberikan informasi terkait kegiatan organisasi yang terdaftar pada Badan Kesatuan Bangsa dan Politik.",
      imageUrl: "/berita/Berita1.png",
      category: "Kebudayaan",
      author: "Ahmad Fauzi",
      authorRole: "Koordinator PMM",
      authorAvatar: "/logos/KESBANG.png",
    },
    {
      id: "3",
      title: "Pembuatan Batik Di Desa Bumiaji",
      date: "12 Juli 2025 18:25",
      description:
        "Indomas merupakan sebuah website yang memberikan informasi terkait kegiatan organisasi yang terdaftar pada Badan Kesatuan Bangsa dan Politik.",
      imageUrl: "/berita/Berita1.png",
      category: "Kebudayaan",
      author: "Ahmad Fauzi",
      authorRole: "Koordinator PMM",
      authorAvatar: "/logos/KESBANG.png",
    },
    {
      id: "4",
      title: "Pembuatan Batik Di Desa Bumiaji",
      date: "12 Juli 2025 18:25",
      description:
        "Indomas merupakan sebuah website yang memberikan informasi terkait kegiatan organisasi yang terdaftar pada Badan Kesatuan Bangsa dan Politik.",
      imageUrl: "/berita/Berita1.png",
      category: "Kebudayaan",
      author: "Ahmad Fauzi",
      authorRole: "Koordinator PMM",
      authorAvatar: "/logos/KESBANG.png",
    },
    {
      id: "5",
      title: "Workshop Pengembangan UMKM Digital",
      date: "10 Juli 2025 14:30",
      description:
        "Program pelatihan komprehensif untuk mengembangkan usaha mikro, kecil, dan menengah melalui platform digital.",
      imageUrl: "/berita/Berita1.png",
      category: "Ekonomi",
      author: "Siti Nurhaliza",
      authorRole: "Fasilitator UMKM",
      authorAvatar: "/logos/KESBANG.png",
    },
    {
      id: "6",
      title: "Pelatihan Pertanian Organik Berkelanjutan",
      date: "8 Juli 2025 09:15",
      description:
        "Memberikan edukasi tentang metode pertanian organik yang ramah lingkungan kepada petani lokal.",
      imageUrl: "/berita/Berita1.png",
      category: "Pertanian",
      author: "Budi Santoso",
      authorRole: "Ahli Pertanian",
      authorAvatar: "/logos/KESBANG.png",
    },
    {
      id: "7",
      title: "Seminar Kesehatan Masyarakat",
      date: "6 Juli 2025 16:45",
      description:
        "Kegiatan penyuluhan kesehatan untuk meningkatkan kesadaran masyarakat tentang pola hidup sehat.",
      imageUrl: "/berita/Berita1.png",
      category: "Kesehatan",
      author: "Dr. Maya Sari",
      authorRole: "Dokter Komunitas",
      authorAvatar: "/logos/KESBANG.png",
    },
    {
      id: "8",
      title: "Program Literasi Digital untuk Lansia",
      date: "4 Juli 2025 11:20",
      description:
        "Inisiatif untuk meningkatkan kemampuan digital lansia agar dapat mengakses informasi dan berkomunikasi dengan lebih baik.",
      imageUrl: "/berita/Berita1.png",
      category: "Teknologi",
      author: "Rina Kartika",
      authorRole: "Instruktur Digital",
      authorAvatar: "/logos/KESBANG.png",
    },
    {
      id: "9",
      title: "Festival Seni Budaya Lokal",
      date: "2 Juli 2025 13:00",
      description:
        "Perayaan kekayaan seni dan budaya lokal melalui berbagai pertunjukan, pameran, dan workshop.",
      imageUrl: "/berita/Berita1.png",
      category: "Seni",
      author: "Denny Prakoso",
      authorRole: "Seniman Lokal",
      authorAvatar: "/logos/KESBANG.png",
    },
  ];

  // Hitung pagination
  const totalPages = Math.ceil(newsData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNews = newsData.slice(startIndex, endIndex);

  // Handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
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
            Kegiatan Organisasi
          </h2>
        </div>

        {/* Grid Layout untuk Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {currentNews.map((news, index) => (
            <NewsCard key={news.id} news={news} index={index} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-8 h-8 rounded-full text-sm font-medium transition-all duration-200 ${
                currentPage === page
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}

          {/* Dots untuk menunjukkan ada halaman lain */}
          {totalPages > 5 && <span className="text-gray-500 px-2">...</span>}

          {/* Tombol Next */}
          <button
            onClick={() =>
              handlePageChange(Math.min(currentPage + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Next
          </button>
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
      `}</style>
    </section>
  );
};

export default Section3Detail;
