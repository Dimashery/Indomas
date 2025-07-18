"use client"; // Tambahkan directive untuk mendukung useState

import Image from "next/image";
import { HiOutlineTrash } from "react-icons/hi2"; // Ikon untuk tombol hapus
import { useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { MdArrowBackIosNew } from "react-icons/md";
import { IoClose } from "react-icons/io5"; // Ikon untuk tombol tutup modal
import { FiSearch } from "react-icons/fi";

const Section1BeritaAdmin = () => {
  // Data dummy untuk tabel berita
  const initialNews = [
    {
      id: 1,
      organizationName: "Ormas A",
      eventTitle: "Festival Budaya 2025",
      locationName: "Lapangan Kota Batu",
      eventDate: "2025-07-15",
      eventDescription:
        "Acara budaya tahunan dengan berbagai pertunjukan seni. Menampilkan tarian tradisional, musik lokal, dan pameran kerajinan. Kegiatan ini diadakan untuk mempromosikan warisan budaya masyarakat Kota Batu.",
      eventImage: "/bg_form.png", // Placeholder untuk gambar
    },
    {
      id: 2,
      organizationName: "Ormas B",
      eventTitle: "Lomba Olahraga Pemuda",
      locationName: "Gedung Olahraga Batu",
      eventDate: "2025-07-20",
      eventDescription:
        "Kompetisi olahraga untuk pemuda lokal. Termasuk cabang lari, sepak bola, dan bulutangkis. Acara ini bertujuan untuk meningkatkan semangat olahraga di kalangan pemuda.",
      eventImage: "/bg_form.png",
    },
    {
      id: 3,
      organizationName: "Ormas C",
      eventTitle: "Seminar Sosial 2025",
      locationName: "Balai Kota Batu",
      eventDate: "2025-07-25",
      eventDescription:
        "Diskusi tentang isu sosial masyarakat. Mengundang narasumber terkemuka untuk membahas pendidikan, kesehatan, dan kesejahteraan. Acara ini terbuka untuk umum.",
      eventImage: "/bg_form.png",
    },
  ];

  // State untuk search, filter, pagination, dan items per page
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOrganization, setFilterOrganization] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Jumlah item per halaman, dapat diubah
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // State untuk modal gambar
  const [showImageModal, setShowImageModal] = useState(false); // State untuk menampilkan modal gambar
  const [selectedDescription, setSelectedDescription] = useState<string | null>(
    null
  ); // State untuk modal deskripsi
  const [showDescriptionModal, setShowDescriptionModal] = useState(false); // State untuk menampilkan modal deskripsi
  const [newsData, setNewsData] = useState(initialNews); // State untuk data berita yang dapat diubah

  // Filter data berdasarkan search dan opsi
  const filteredNews = newsData.filter((news) => {
    const matchesSearch =
      news.organizationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.eventTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesOrganization =
      filterOrganization === "Semua" ||
      news.organizationName === filterOrganization;
    return matchesSearch && matchesOrganization;
  });

  // Logika pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNews = filteredNews.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);

  // Fungsi untuk mengubah halaman
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Fungsi untuk menghapus data
  const handleDelete = (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      setNewsData((prevData) => prevData.filter((news) => news.id !== id));
      // Reset ke halaman 1 jika halaman saat ini tidak memiliki data setelah penghapusan
      const newFilteredNews = newsData
        .filter((news) => news.id !== id)
        .filter((news) => {
          const matchesSearch =
            news.organizationName
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            news.eventTitle.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesOrganization =
            filterOrganization === "Semua" ||
            news.organizationName === filterOrganization;
          return matchesSearch && matchesOrganization;
        });
      const newTotalPages = Math.ceil(newFilteredNews.length / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="relative w-full p-6 sm:p-8 md:p-10 max-w-7xl mx-auto">
        {/* Header Section with Modern Design */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-2 h-12 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-full"></div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2">Data Berita</h1>
              <p className="text-slate-600 text-lg">List Data Berita Organisasi Masyarakat Kota Batu</p>
            </div>
          </div>
        </div>

        {/* Modern Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar with Icon */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Cari nama organisasi atau judul acara..."
                className="w-full pl-10 pr-4 py-3 text-slate-700 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Filter Dropdown */}
            <div className="flex gap-4">
              <select
                className="px-4 py-3 text-slate-700 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white min-w-[150px]"
                value={filterOrganization}
                onChange={(e) => setFilterOrganization(e.target.value)}
              >
                <option value="Semua">Semua Organisasi</option>
                <option value="Ormas A">Ormas A</option>
                <option value="Ormas B">Ormas B</option>
                <option value="Ormas C">Ormas C</option>
              </select>
            </div>
          </div>
        </div>

        {/* Modern Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-blue-100">
                  <th className="px-6 py-4 text-left text-sm font-bold text-emerald-800 uppercase tracking-wider">No.</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-emerald-800 uppercase tracking-wider">Nama Organisasi</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-emerald-800 uppercase tracking-wider">Judul Acara</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-emerald-800 uppercase tracking-wider">Lokasi Acara</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-emerald-800 uppercase tracking-wider">Tanggal Acara</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-emerald-800 uppercase tracking-wider">Deskripsi Acara</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-emerald-800 uppercase tracking-wider">Gambar Acara</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-emerald-800 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentNews.length > 0 ? (
                  currentNews.map((news, index) => (
                    <tr
                      key={news.id}
                      className="hover:bg-slate-50 transition-all duration-200 group"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-600">
                        {indexOfFirstItem + index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-slate-800 font-semibold">
                        {news.organizationName}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        <div className="max-w-[200px] truncate">
                          {news.eventTitle}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        <div className="max-w-[150px] truncate">
                          {news.locationName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                        {news.eventDate}
                      </td>
                      <td
                        className="px-6 py-4 cursor-pointer text-emerald-600 hover:text-emerald-800 hover:text-blue-600 transition-colors"
                        onClick={() => {
                          setSelectedDescription(news.eventDescription);
                          setShowDescriptionModal(true);
                        }}
                      >
                        <div className="max-w-[150px] truncate hover:underline">
                          {news.eventDescription.substring(0, 30)}...
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Image
                          src={news.eventImage}
                          alt={news.eventTitle}
                          width={80}
                          height={50}
                          className="w-[80px] h-[50px] object-cover cursor-pointer rounded-lg shadow-sm hover:shadow-md transition-shadow"
                          onClick={() => {
                            setSelectedImage(news.eventImage);
                            setShowImageModal(true);
                          }}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="p-2 rounded-lg bg-red-50 hover:bg-red-100 transition-all duration-200 group inline-block">
                          <HiOutlineTrash
                            className="text-red-600 hover:text-red-700 cursor-pointer"
                            size={18}
                            onClick={() => handleDelete(news.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-slate-500">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                          <FiSearch className="w-8 h-8 text-slate-400" />
                        </div>
                        <p className="text-lg font-medium">Tidak ada data yang ditemukan</p>
                        <p className="text-sm text-slate-400">Coba ubah filter atau kata kunci pencarian</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modern Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4 bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <div className="flex items-center space-x-4">
            <span className="text-slate-600 text-sm font-medium">
              Menampilkan {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredNews.length)} dari {filteredNews.length} data
            </span>
            <select
              className="px-3 py-2 text-sm border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white text-gray-500"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={5}>5/halaman</option>
              <option value={10}>10/halaman</option>
              <option value={20}>20/halaman</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border-2 border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <MdArrowBackIosNew size={16} />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  currentPage === i + 1 
                    ? "bg-blue-500 text-white shadow-lg" 
                    : "text-slate-600 hover:bg-slate-100 border-2 border-slate-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
            
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border-2 border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <MdArrowForwardIos size={16} />
            </button>
          </div>
        </div>

        {/* Modal untuk Gambar - Modern Design */}
        {showImageModal && selectedImage && (
          <div
            className={`fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${
              showImageModal ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => {
              setShowImageModal(false);
              setSelectedImage(null);
            }}
          >
            <div
              className={`bg-white rounded-2xl shadow-2xl p-6 relative max-w-[95vw] max-h-[90vh] w-full md:w-auto transition-all duration-300 transform ${
                showImageModal ? "scale-100" : "scale-95"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-slate-500 hover:text-red-500 z-10 bg-slate-100 hover:bg-red-100 rounded-full p-2 shadow-lg transition-all duration-200"
                onClick={() => {
                  setShowImageModal(false);
                  setSelectedImage(null);
                }}
              >
                <IoClose size={20} />
              </button>
              <div className="flex items-center justify-center w-full h-full">
                <Image
                  src={selectedImage}
                  alt="Enlarged Event Image"
                  width={900}
                  height={500}
                  className="object-contain max-w-full max-h-[80vh] w-auto h-auto rounded-lg"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "80vh",
                    width: "auto",
                    height: "auto",
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Modal untuk Deskripsi - Modern Design */}
        {showDescriptionModal && selectedDescription && (
          <div
            className={`fixed backdrop-blur-sm bg-black/50 inset-0 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${
              showDescriptionModal ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => {
              setShowDescriptionModal(false);
              setSelectedDescription(null);
            }}
          >
            <div
              className={`bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 relative max-h-[80vh] overflow-y-auto transition-all duration-300 transform ${
                showDescriptionModal ? "scale-100" : "scale-95"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-slate-500 hover:text-red-500 bg-slate-100 hover:bg-red-100 rounded-full p-2 shadow-lg transition-all duration-200"
                onClick={() => {
                  setShowDescriptionModal(false);
                  setSelectedDescription(null);
                }}
              >
                <IoClose size={20} />
              </button>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-full"></div>
                <h3 className="text-lg font-bold text-slate-800">
                  Deskripsi Acara
                </h3>
              </div>
              <p className="text-slate-600 leading-relaxed pr-8">
                {selectedDescription}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Section1BeritaAdmin;