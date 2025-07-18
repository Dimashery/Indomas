"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface OrmasItem {
  id: number;
  name: string;
  date: string;
  description: string;
  imageUrl?: string;
}

const Section1List: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animateItems, setAnimateItems] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const itemsPerPage = 6;

  useEffect(() => {
    // Animasi header saat component mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    // Animasi items saat component mount
    const itemTimer = setTimeout(() => {
      setAnimateItems(true);
    }, 800);

    return () => {
      clearTimeout(timer);
      clearTimeout(itemTimer);
    };
  }, []);

  // Data dummy untuk organisasi
  const ormasData: OrmasItem[] = [
    {
      id: 1,
      name: "Organisasi Setia Hati",
      date: "12 Juli 2025 18:25",
      description:
        "Indomas merupakan sebuah website yang memberikan informasi terkait kegiatan organisasi yang terdaftar pada Badan Kesatuan Bangsa dan Politik",
    },
    {
      id: 2,
      name: "Organisasi Setia Hati",
      date: "12 Juli 2025 18:25",
      description:
        "Indomas merupakan sebuah website yang memberikan informasi terkait kegiatan organisasi yang terdaftar pada Badan Kesatuan Bangsa dan Politik",
    },
    {
      id: 3,
      name: "Organisasi Setia Hati",
      date: "12 Juli 2025 18:25",
      description:
        "Indomas merupakan sebuah website yang memberikan informasi terkait kegiatan organisasi yang terdaftar pada Badan Kesatuan Bangsa dan Politik",
    },
    {
      id: 4,
      name: "Organisasi Setia Hati",
      date: "12 Juli 2025 18:25",
      description:
        "Indomas merupakan sebuah website yang memberikan informasi terkait kegiatan organisasi yang terdaftar pada Badan Kesatuan Bangsa dan Politik",
    },
    {
      id: 5,
      name: "Organisasi Setia Hati",
      date: "12 Juli 2025 18:25",
      description:
        "Indomas merupakan sebuah website yang memberikan informasi terkait kegiatan organisasi yang terdaftar pada Badan Kesatuan Bangsa dan Politik",
    },
    {
      id: 6,
      name: "Organisasi Setia Hati",
      date: "12 Juli 2025 18:25",
      description:
        "Indomas merupakan sebuah website yang memberikan informasi terkait kegiatan organisasi yang terdaftar pada Badan Kesatuan Bangsa dan Politik",
    },
    {
      id: 7,
      name: "Organisasi Setia Hati",
      date: "12 Juli 2025 18:25",
      description:
        "Indomas merupakan sebuah website yang memberikan informasi terkait kegiatan organisasi yang terdaftar pada Badan Kesatuan Bangsa dan Politik",
    },
    {
      id: 8,
      name: "Organisasi Setia Hati",
      date: "12 Juli 2025 18:25",
      description:
        "Indomas merupakan sebuah website yang memberikan informasi terkait kegiatan organisasi yang terdaftar pada Badan Kesatuan Bangsa dan Politik",
    },
    {
      id: 9,
      name: "Organisasi Setia Hati",
      date: "12 Juli 2025 18:25",
      description:
        "Indomas merupakan sebuah website yang memberikan informasi terkait kegiatan organisasi yang terdaftar pada Badan Kesatuan Bangsa dan Politik",
    },
  ];

  // Filter data berdasarkan pencarian dan filter
  const filteredData = ormasData.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesYear = yearFilter === "" || item.date.includes(yearFilter);
    const matchesCategory =
      categoryFilter === "" ||
      item.name.toLowerCase().includes(categoryFilter.toLowerCase());

    return matchesSearch && matchesYear && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Section 1: Header dengan Background Image */}
      <div className="relative">
        {/* Background Image */}
        <div
          className="w-screen bg-cover bg-center bg-no-repeat relative left-1/2 transform -translate-x-1/2"
          style={{
            backgroundImage: "url('/bg_form.png')",
            height: "400px", // Tinggi section header
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            minWidth: "100vw",
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Header Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`text-center transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-4xl font-bold text-white mb-4">
              List Organisasi di Kota Batu
            </h1>
            <p className="text-white/80 text-lg">
              List Organisasi Yang sudah Terdaftar di Kota Batu
            </p>
          </div>
        </div>
      </div>

      {/* Section 2: Content dengan Background Abu-abu */}
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-7xl mx-auto">
            {/* Search and Filter Section */}
            <div
              className={`mb-8 transition-all duration-1000 ${
                animateItems
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Cari Nama Organisasi"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 placeholder-gray-600"
                  />
                </div>
                <div className="flex gap-4">
                  <select
                    value={yearFilter}
                    onChange={(e) => setYearFilter(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent min-w-[120px] text-gray-700"
                  >
                    <option value="">Tahun</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                  </select>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent min-w-[120px] text-gray-700"
                  >
                    <option value="">Bidang</option>
                    <option value="setia">Setia Hati</option>
                    <option value="sosial">Sosial</option>
                    <option value="budaya">Budaya</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Organisasi Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {currentItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
                    animateItems
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    transitionDelay: `${index * 150}ms`,
                  }}
                >
                  {/* Organisasi Image/Icon */}
                  <div className="h-48 bg-green-500 flex items-center justify-center">
                    <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">ORG</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">{item.date}</p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>
                    <div className="flex justify-end">
                      <Link
                        href={`/detail-list-ormas/${item.id}`}
                        className="text-green-600 hover:text-green-700 font-medium text-sm hover:underline transition-colors duration-200"
                      >
                        Selengkapnya
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div
              className={`flex justify-center items-center space-x-2 transition-all duration-1000 ${
                animateItems
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${currentItems.length * 150 + 300}ms`,
              }}
            >
              {/* Previous Button */}
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>

              {/* Page Numbers */}
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;

                // Show first page, last page, current page, and pages around current
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 1 &&
                    pageNumber <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`px-3 py-2 rounded-md transition-colors duration-200 ${
                        currentPage === pageNumber
                          ? "bg-green-500 text-white"
                          : "text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                }

                // Show dots for gaps
                if (
                  pageNumber === currentPage - 2 ||
                  pageNumber === currentPage + 2
                ) {
                  return (
                    <span key={pageNumber} className="px-2 text-gray-400">
                      ...
                    </span>
                  );
                }

                return null;
              })}

              {/* Next Button - Fixed CSS conflict */}
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "bg-green-500 text-white hover:bg-green-600"
                }`}
              >
                <span className="mr-1">Next</span>
                <ChevronRightIcon className="w-5 h-5 inline" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section1List;
