"use client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Image from "next/image";
import { IoEyeSharp } from "react-icons/io5";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import Link from "next/link";
import { useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { MdArrowBackIosNew } from "react-icons/md";
import { RiSendPlaneLine } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";

const Section1DataOrganisasiAdmin = () => {
  // Data dummy (tidak diubah)
  const initialOrganizations = [
    { id: 1, name: "Ormas A", type: "Sosial", status: "Aktif" },
    { id: 2, name: "Ormas B", type: "Budaya", status: "Tidak Aktif" },
    { id: 3, name: "Ormas C", type: "Olahraga", status: "Proses" },
    { id: 4, name: "Ormas A", type: "Sosial", status: "Aktif" },
    { id: 5, name: "Ormas B", type: "Budaya", status: "Tidak Aktif" },
    { id: 6, name: "Ormas C", type: "Olahraga", status: "Proses" },
    { id: 7, name: "Ormas A", type: "Sosial", status: "Aktif" },
    { id: 8, name: "Ormas B", type: "Budaya", status: "Tidak Aktif" },
    { id: 9, name: "Ormas C", type: "Olahraga", status: "Proses" },
    { id: 10, name: "Ormas A", type: "Sosial", status: "Aktif" },
    { id: 11, name: "Ormas B", type: "Budaya", status: "Tidak Aktif" },
    { id: 12, name: "Ormas C", type: "Olahraga", status: "Proses" },
    { id: 13, name: "Ormas A", type: "Sosial", status: "Aktif" },
    { id: 14, name: "Ormas B", type: "Budaya", status: "Tidak Aktif" },
    { id: 15, name: "Ormas C", type: "Olahraga", status: "Proses" },
    { id: 16, name: "Ormas A", type: "Sosial", status: "Aktif" },
    { id: 17, name: "Ormas B", type: "Budaya", status: "Tidak Aktif" },
    { id: 18, name: "Ormas C", type: "Olahraga", status: "Proses" },
  ];

  // State (tidak diubah)
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("Semua");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [googleDriveLink, setGoogleDriveLink] = useState("");

  // Fungsi untuk mendapatkan class CSS untuk badge status
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Aktif":
        return "bg-emerald-100 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-sm font-semibold shadow-sm";
      case "Tidak Aktif":
        return "bg-red-100 text-red-700 border border-red-200 px-3 py-1 rounded-full text-sm font-semibold shadow-sm";
      case "Proses":
        return "bg-amber-100 text-amber-700 border border-amber-200 px-3 py-1 rounded-full text-sm font-semibold shadow-sm";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200 px-3 py-1 rounded-full text-sm font-semibold shadow-sm";
    }
  };

  // Logika filter dan pagination (tidak diubah)
  const filteredOrganizations = initialOrganizations.filter((org) => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "Semua" || org.type === filterType;
    const matchesStatus = filterStatus === "Semua" || org.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrganizations = filteredOrganizations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrganizations.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const handleSaveDriveLink = () => {
    console.log("Saving Google Drive link:", googleDriveLink);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="relative w-full p-6 sm:p-8 md:p-10 max-w-7xl mx-auto">
        {/* Header Section with Modern Design */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-2 h-12 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-full"></div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2">Data Organisasi</h1>
              <p className="text-slate-600 text-lg">List Data Legalitas Organisasi Masyarakat Kota Batu</p>
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
                placeholder="Cari nama organisasi..."
                className="w-full pl-10 pr-4 py-3 text-slate-700 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Filter Dropdowns */}
            <div className="flex gap-4">
              <select
                className="px-4 py-3 text-slate-700 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white min-w-[150px]"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="Semua">Semua Jenis</option>
                <option value="Sosial">Sosial</option>
                <option value="Budaya">Budaya</option>
                <option value="Olahraga">Olahraga</option>
              </select>
              
              <select
                className="px-4 py-3 text-slate-700 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white min-w-[150px]"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="Semua">Semua Status</option>
                <option value="Aktif">Aktif</option>
                <option value="Tidak Aktif">Tidak Aktif</option>
                <option value="Proses">Proses</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Modern Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100">
                  <th className="px-6 py-4 text-left text-sm font-bold text-emerald-800 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-emerald-800 uppercase tracking-wider">Nama Organisasi</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-emerald-800 uppercase tracking-wider">Jenis</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-emerald-800 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-emerald-800 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentOrganizations.length > 0 ? (
                  currentOrganizations.map((org) => (
                    <tr key={org.id} className="hover:bg-slate-50 transition-all duration-200 group">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-600">{org.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-slate-800 font-semibold">{org.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-slate-600">{org.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={getStatusBadgeClass(org.status)}>
                          {org.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-3">
                          <Link href={`/detail-data-organisasi/edit/${org.id}`}>
                            <div className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-all duration-200 group">
                              <HiOutlinePencilSquare className="text-blue-600 hover:text-blue-700 cursor-pointer" size={18} />
                            </div>
                          </Link>
                          <Link href={`/detail-data-organisasi/detail/${org.id}`}>
                            <div className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-all duration-200 group">
                              <IoEyeSharp className="text-emerald-600 hover:text-emerald-700 cursor-pointer" size={18} />
                            </div>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
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
              Menampilkan {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredOrganizations.length)} dari {filteredOrganizations.length} data
            </span>
            <select
              className="px-3 py-2 text-sm border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white text-gray-500"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
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
                    ? "bg-emerald-500 text-white shadow-lg" 
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
        
        {/* Modern Google Drive Link Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Link Format File Lampiran</h2>
              <p className="text-slate-600 mt-2">Ubah link di bawah ini jika terdapat perubahan pada format file lampiran.</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Masukkan Link Google Drive"
                className="w-full px-4 py-3 text-slate-700 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white"
                value={googleDriveLink}
                onChange={(e) => setGoogleDriveLink(e.target.value)}
              />
            </div>
            <button
              onClick={handleSaveDriveLink}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <RiSendPlaneLine size={20} />
              <span>Simpan Link</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section1DataOrganisasiAdmin;