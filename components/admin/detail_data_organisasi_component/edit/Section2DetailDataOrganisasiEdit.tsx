"use client";

import React, { useState, useEffect } from "react";
import {
  FaPenToSquare, // Using FaPenToSquare instead of FaRegEdit
  FaWhatsapp,
  FaRegTrashCan,
  FaDownload,
} from "react-icons/fa6";
import { GrStatusGood } from "react-icons/gr";
import { PiNoteDuotone } from "react-icons/pi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { AiOutlineNotification } from "react-icons/ai";
import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io";

interface AnggotaData {
  id: number;
  nama: string;
  jabatan: string;
  noKeanggotaan: string;
  noHandphone: string;
  noSK: string;
}

interface OrganisasiData {
  id: string;
  nama: string;
  jenis: string;
  alamat: string;
  telepon: string;
  email: string;
  website: string;
  instagram: string;
  deskripsi: string;
  tanggal: string;
  avatar?: string;
}

const Section2DetailDataOrganisasiEdit = () => {
  const [organisasiData, setOrganisasiData] = useState<OrganisasiData>({
    id: "",
    nama: "",
    jenis: "",
    alamat: "",
    telepon: "",
    email: "",
    website: "",
    instagram: "",
    deskripsi: "",
    tanggal: "",
    avatar: "",
  });
  const [anggotaData, setAnggotaData] = useState<AnggotaData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [catatan, setCatatan] = useState("");
  const [status, setStatus] = useState("");
  const [linkGoogleDrive, setlinkGoogleDrive] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  // Load mock data
  useEffect(() => {
    // Mock data defined inside useEffect to avoid dependency warnings
    const mockAnggotaData: AnggotaData[] = [
      {
        id: 1,
        nama: "Kebersamaan Sosial",
        jabatan: "Agama",
        noKeanggotaan: "202829",
        noHandphone: "081234567890",
        noSK: "123/Kebersamaan Sosial/2024",
      },
      {
        id: 2,
        nama: "Titas Tearman",
        jabatan: "Politik",
        noKeanggotaan: "202829",
        noHandphone: "081234567890",
        noSK: "123/Kebersamaan Sosial/2024",
      },
      {
        id: 3,
        nama: "Jemima Mayer",
        jabatan: "Sosial",
        noKeanggotaan: "202829",
        noHandphone: "081234567890",
        noSK: "123/Kebersamaan Sosial/2024",
      },
      {
        id: 4,
        nama: "Paloma Sosial",
        jabatan: "Sosial",
        noKeanggotaan: "202829",
        noHandphone: "081234567890",
        noSK: "123/Kebersamaan Sosial/2024",
      },
      {
        id: 5,
        nama: "Lusia Melarai",
        jabatan: "Agama",
        noKeanggotaan: "202829",
        noHandphone: "081234567890",
        noSK: "123/Kebersamaan Sosial/2024",
      },
      {
        id: 6,
        nama: "Lusia Melarai",
        jabatan: "Agama",
        noKeanggotaan: "202829",
        noHandphone: "081234567890",
        noSK: "123/Kebersamaan Sosial/2024",
      },
      {
        id: 7,
        nama: "Lusia Melarai",
        jabatan: "Agama",
        noKeanggotaan: "202829",
        noHandphone: "081234567890",
        noSK: "123/Kebersamaan Sosial/2024",
      },
      {
        id: 8,
        nama: "Lusia Melarai",
        jabatan: "Agama",
        noKeanggotaan: "202829",
        noHandphone: "081234567890",
        noSK: "123/Kebersamaan Sosial/2024",
      },
      {
        id: 9,
        nama: "Lusia Melarai",
        jabatan: "Agama",
        noKeanggotaan: "202829",
        noHandphone: "081234567890",
        noSK: "123/Kebersamaan Sosial/2024",
      },
      {
        id: 10,
        nama: "Lusia Melarai",
        jabatan: "Agama",
        noKeanggotaan: "202829",
        noHandphone: "081234567890",
        noSK: "123/Kebersamaan Sosial/2024",
      },
      {
        id: 11,
        nama: "Lusia Melarai",
        jabatan: "Agama",
        noKeanggotaan: "202829",
        noHandphone: "081234567890",
        noSK: "123/Kebersamaan Sosial/2024",
      },
      {
        id: 12,
        nama: "Lusia Melarai",
        jabatan: "Agama",
        noKeanggotaan: "202829",
        noHandphone: "081234567890",
        noSK: "123/Kebersamaan Sosial/2024",
      },
      {
        id: 13,
        nama: "Lusia Melarai",
        jabatan: "Agama",
        noKeanggotaan: "202829",
        noHandphone: "081234567890",
        noSK: "123/Kebersamaan Sosial/2024",
      },
      {
        id: 14,
        nama: "Lusia Melarai",
        jabatan: "Agama",
        noKeanggotaan: "202829",
        noHandphone: "081234567890",
        noSK: "123/Kebersamaan Sosial/2024",
      },
      {
        id: 15,
        nama: "Lusia Melarai",
        jabatan: "Agama",
        noKeanggotaan: "202829",
        noHandphone: "081234567890",
        noSK: "123/Kebersamaan Sosial/2024",
      },
    ];

    const mockOrganisasiData: OrganisasiData = {
      id: "1",
      nama: "Kebersamaan Sosial",
      jenis: "Sosial",
      alamat: "Jl. KH. Kauman, Yogyakarta",
      telepon: "085875793265",
      email: "kebersamaan.sosial@gmail.com",
      website: "kebersamaan.sosial.id",
      instagram: "kebersamaan_sosial",
      deskripsi:
        "Organisasi Kebersamaan Sosial merupakan organisasi yang didirikan dengan tujuan untuk membangun solidaritas dan kepedulian sosial di masyarakat. Kami berkomitmen untuk menciptakan program-program yang bermanfaat bagi kesejahteraan bersama.",
      tanggal: "02-07-2025",
      avatar: "/kotabatu.png",
    };

    setTimeout(() => {
      setAnggotaData(mockAnggotaData);
      setOrganisasiData(mockOrganisasiData);
      setLoading(false);
    }, 1000);
  }, []); // Empty dependency array is now correct

  const itemsPerPage = 10;
  const totalPages = Math.ceil(anggotaData.length / itemsPerPage);

  // Function to download Excel
  const downloadExcel = () => {
    // Create CSV content
    const headers = [
      "No",
      "Nama Anggota",
      "Jabatan",
      "No Keanggotaan",
      "No Handphone",
      "No SK",
    ];
    const csvContent = [
      headers.join(","),
      ...anggotaData.map((anggota, index) =>
        [
          index + 1,
          "${anggota.nama}",
          "${anggota.jabatan}",
          anggota.noKeanggotaan,
          anggota.noHandphone,
          "${anggota.noSK}",
        ].join(",")
      ),
    ].join("\n");

    // Add BOM for proper UTF-8 encoding in Excel
    const BOM = "\uFEFF";
    const blob = new Blob([BOM + csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    // Create download link
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `Struktur_Pengurus_${organisasiData.nama || "Organisasi"}_${
        new Date().toISOString().split("T")[0]
      }.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSubmit = () => {
    if (status && linkGoogleDrive.trim()) {
      setIsFormSubmitted(true);
    }
    console.log("Data Anggota:", anggotaData);
    console.log("Catatan:", catatan);
    console.log("Status:", status);
    console.log("Link Google Drive:", linkGoogleDrive);
  };

  const handleHapusAkun = () => {
    console.log("Hapus akun clicked");
  };

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = anggotaData.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-emerald-600 font-medium">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Struktur Pengurus
              </h1>
              <p className="text-slate-600">
                Kelola dan ubah informasi anggota organisasi
              </p>
            </div>
            {/* Download Button */}
            <button
              onClick={downloadExcel}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 hover:shadow-lg hover:scale-105 transition-all duration-200 shadow-sm group"
            >
              <FaDownload className="w-4 h-4 group-hover:animate-bounce" />
              <span>Download Excel</span>
            </button>
          </div>
        </div>

        {/* Data Anggota */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
          {/* Mobile View - Card Layout */}
          <div className="block lg:hidden">
            <div className="p-4 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">
                Data Anggota
              </h2>
            </div>
            <div className="p-4 space-y-4">
              {currentData.length > 0 ? (
                currentData.map((anggota, index) => (
                  <div
                    key={anggota.id}
                    className="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">
                          {startIndex + index + 1}. {anggota.nama}
                        </h3>
                        <span className="inline-block px-2 py-1 text-sm font-semibold">
                          {anggota.jabatan}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 min-w-0 flex-shrink-0">
                          ID:
                        </span>
                        <span className="font-medium text-slate-900">
                          {anggota.noKeanggotaan}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 min-w-0 flex-shrink-0">
                          HP:
                        </span>
                        <span className="font-medium text-slate-900">
                          {anggota.noHandphone}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 min-w-0 flex-shrink-0">
                          SK:
                        </span>
                        <span className="font-medium text-slate-900 break-all">
                          {anggota.noSK}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="text-slate-400 mb-2">
                    <svg
                      className="w-12 h-12 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2"
                      />
                    </svg>
                  </div>
                  <p className="text-slate-500">
                    Tidak ada data yang ditemukan
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Desktop View - Table Layout */}
          <div className="hidden lg:block">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      No
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Nama Anggota
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Jabatan
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      No Keanggotaan
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      No Handphone
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      No SK
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {currentData.length > 0 ? (
                    currentData.map((anggota, index) => (
                      <tr
                        key={anggota.id}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                          {startIndex + index + 1}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-900 font-medium">
                          {anggota.nama}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                          <span className="inline-block px-2 py-1 text-sm font-semibold">
                            {anggota.jabatan}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-900 font-mono">
                          {anggota.noKeanggotaan}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-900 font-mono">
                          {anggota.noHandphone}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-900 font-mono max-w-xs truncate">
                          {anggota.noSK}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center">
                        <div className="text-slate-400 mb-2">
                          <svg
                            className="w-12 h-12 mx-auto"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2"
                            />
                          </svg>
                        </div>
                        <p className="text-slate-500">
                          Tidak ada data yang ditemukan
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {anggotaData.length > 0 && (
            <div className="bg-slate-50 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-slate-200">
              <div className="text-sm text-slate-600">
                Menampilkan {startIndex + 1} -{" "}
                {Math.min(endIndex, anggotaData.length)} dari{" "}
                {anggotaData.length} data
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <IoMdArrowDropleft className="w-5 h-5" />
                </button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNumber;
                  if (totalPages <= 5) {
                    pageNumber = i + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i;
                  } else {
                    pageNumber = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === pageNumber
                          ? "bg-emerald-500 text-white"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <IoMdArrowDropright className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Dokumen Pendukung */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <IoDocumentTextOutline className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">
                Dokumen Pendukung
              </h3>
              <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm hover:underline transition-colors">
                Download Organisasi.pdf
              </button>
            </div>
          </div>
        </div>

        {/* Laporan Tahunan Organisasi */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6 mt-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <IoDocumentTextOutline className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-lg">
                Laporan Tahunan Organisasi
              </h3>
              <p className="text-slate-500 text-sm">
                Upload dan kelola laporan tahunan organisasi
              </p>
            </div>
          </div>

          {/* Laporan Tersimpan */}
          <div className="mb-6">
            <h4 className="font-semibold text-slate-900 mb-4">Laporan Tersimpan</h4>
            <div className="space-y-3">
              {/* Laporan 2025 */}
              <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                    <IoDocumentTextOutline className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-900">Laporan 2025</span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                        Uploaded
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">File: show (14).pdf</p>
                    <p className="text-sm text-slate-600">Ukuran: 0.15 MB</p>
                    <p className="text-sm text-slate-600">Diupload pada: 23/7/2025</p>
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline">
                      Lihat Laporan PDF
                    </button>
                  </div>
                </div>
                <button className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg">
                  <FaRegTrashCan className="w-4 h-4" />
                </button>
              </div>

              {/* Laporan 2029 */}
              <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                    <IoDocumentTextOutline className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-900">Laporan 2029</span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                        Uploaded
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">File: vertopai.com_Halal_Logo_YOLOv8.pdf</p>
                    <p className="text-sm text-slate-600">Ukuran: 2.05 MB</p>
                    <p className="text-sm text-slate-600">Diupload pada: 23/7/2025</p>
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline">
                      Lihat Laporan PDF
                    </button>
                  </div>
                </div>
                <button className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg">
                  <FaRegTrashCan className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Catatan, Status, dan Link File Surat Resmi */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <PiNoteDuotone className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-semibold text-slate-900">Catatan</h3>
          </div>
          <textarea
            value={catatan}
            onChange={(e) => setCatatan(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-slate-900 placeholder-slate-500 resize-none"
            rows={4}
            placeholder="Masukkan catatan untuk organisasi ini..."
          />

          <div className="flex items-center gap-3 mb-4 mt-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <GrStatusGood className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="font-semibold text-slate-900">Status Organisasi</h3>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <label className="text-sm font-medium text-slate-700 min-w-0 flex-shrink-0">
              Pilih Status:
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-slate-900 w-full sm:w-auto"
            >
              <option value="">Pilih Status</option>
              <option value="aktif">Aktif</option>
              <option value="tidak-aktif">Tidak Aktif</option>
              <option value="proses">Proses</option>
            </select>
          </div>

          {status === "aktif" && (
            <div className="flex items-center gap-3 mb-4 mt-7">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <IoDocumentTextOutline className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-900">
                Link File Surat Resmi
              </h3>
            </div>
          )}
          {status === "aktif" && (
            <textarea
              value={linkGoogleDrive}
              onChange={(e) => setlinkGoogleDrive(e.target.value)}
              className="w-full h-10 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-slate-900 placeholder-slate-500 resize-none"
              rows={4}
              placeholder="Masukkan Link Google Drive untuk File Surat Resmi ...."
            />
          )}

          <div className="flex items-center justify-end">
            <button
              onClick={handleSubmit}
              className="mt-5 px-4 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
            >
              Simpan Data
            </button>
          </div>
        </div>

        {/* Verifikasi Melalui WhatsApp */}
        {isFormSubmitted && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <AiOutlineNotification className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-slate-900">
                Konfirmasi Melalui WhatsApp
              </h3>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              Hubungi organisasi melalui WhatsApp untuk konfirmasi.
            </p>
            <a
              href={`https://wa.me/62${organisasiData.telepon.replace(
                /[^0-9]/g,
                ""
              )}?text=${encodeURIComponent(
                `Pemberitahuan Aktivasi Akun INDOMAS dan Pendaftaran Organisasi di BAKESBANGPOL
                \nYth. Ketua ${organisasiData.nama}
                \nDengan Hormat,
                \nKami dari Badan Kesatuan Bangsa dan Politik (BAKESBANGPOL) Kota Batu memberitahukan bahwa akun INDOMAS Anda telah berhasil diaktifkan. Dengan ini, organisasi Anda secara resmi telah terdaftar di sistem kami.
                \nAnda sekarang dapat mengakses semua fitur yang tersedia melalui situs web resmi INDOMAS di: 
                \nhttps://INDOMAS.KotaBatu.com
                \nUntuk mengakses surat-surat resmi, peraturan, dan ketentuan terkait, silakan kunjungi tautan Google Drive kami di bawah ini: 
                \n${linkGoogleDrive}
                \nTerima kasih atas kerja sama Anda dalam proses pendaftaran ini.
                \nHormat kami,
                \n\nBAKESBANGPOL Kota Batu
              `
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors shadow-sm"
            >
              <FaWhatsapp className="w-5 h-5" />
              <span>Kirim Pesan WhatsApp</span>
            </a>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-4 mb-8">
          <button
            onClick={handleHapusAkun}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors shadow-sm"
          >
            <FaRegTrashCan className="w-5 h-5" />
            Hapus Akun
          </button>
          <button
            onClick={handleSubmit}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
          >
            <FaPenToSquare className="w-5 h-5" />
            <span>Simpan</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Section2DetailDataOrganisasiEdit;