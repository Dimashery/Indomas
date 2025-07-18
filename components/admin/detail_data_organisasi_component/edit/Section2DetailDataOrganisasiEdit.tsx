"use client";

import { useState, useEffect } from "react";

interface AnggotaData {
  id: number;
  nama: string;
  jabatan: string;
  noKeanggotaan: string;
  noHandphone: string;
  noSK: string;
}

interface Section2DetailDataOrganisasiEditProps {
  id: string;
}

const Section2DetailDataOrganisasiEdit = ({ id }: Section2DetailDataOrganisasiEditProps) => {
  const [anggotaData, setAnggotaData] = useState<AnggotaData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [catatan, setCatatan] = useState("");
  const [status, setStatus] = useState("");

  // Mock data
  const mockAnggotaData: AnggotaData[] = [
    { id: 1, nama: "Kebersamaan Sosial", jabatan: "Agama", noKeanggotaan: "202829", noHandphone: "081234567890", noSK: "123/Kebersamaan Sosial/2024" },
    { id: 2, nama: "Titas Tearman", jabatan: "Politik", noKeanggotaan: "202829", noHandphone: "081234567890", noSK: "123/Kebersamaan Sosial/2024" },
    { id: 3, nama: "Jemima Mayer", jabatan: "Sosial", noKeanggotaan: "202829", noHandphone: "081234567890", noSK: "123/Kebersamaan Sosial/2024" },
    { id: 4, nama: "Paloma Sosial", jabatan: "Sosial", noKeanggotaan: "202829", noHandphone: "081234567890", noSK: "123/Kebersamaan Sosial/2024" },
    { id: 5, nama: "Lusia Melarai", jabatan: "Agama", noKeanggotaan: "202829", noHandphone: "081234567890", noSK: "123/Kebersamaan Sosial/2024" },
    { id: 6, nama: "Kalea Elind", jabatan: "Agama", noKeanggotaan: "202829", noHandphone: "081234567890", noSK: "123/Kebersamaan Sosial/2024" },
    { id: 7, nama: "Marlana Bintama", jabatan: "Politik", noKeanggotaan: "202829", noHandphone: "081234567890", noSK: "123/Kebersamaan Sosial/2024" },
    { id: 8, nama: "Sitalika", jabatan: "Politik", noKeanggotaan: "202829", noHandphone: "081234567890", noSK: "123/Kebersamaan Sosial/2024" },
    { id: 9, nama: "Fiza Yeti", jabatan: "Agama", noKeanggotaan: "202829", noHandphone: "081234567890", noSK: "123/Kebersamaan Sosial/2024" },
    { id: 10, nama: "Galang Sama", jabatan: "Sosial", noKeanggotaan: "202829", noHandphone: "081234567890", noSK: "123/Kebersamaan Sosial/2024" },
    { id: 11, nama: "Kebersamaan Sosial", jabatan: "Agama", noKeanggotaan: "202829", noHandphone: "081234567890", noSK: "123/Kebersamaan Sosial/2024" },
    { id: 12, nama: "Titas Tearman", jabatan: "Politik", noKeanggotaan: "202829", noHandphone: "081234567890", noSK: "123/Kebersamaan Sosial/2024" },
    { id: 13, nama: "Jemima Mayer", jabatan: "Sosial", noKeanggotaan: "202829", noHandphone: "081234567890", noSK: "123/Kebersamaan Sosial/2024" },
    { id: 14, nama: "Paloma Sosial", jabatan: "Sosial", noKeanggotaan: "202829", noHandphone: "081234567890", noSK: "123/Kebersamaan Sosial/2024" },
    { id: 15, nama: "Lusia Melarai", jabatan: "Agama", noKeanggotaan: "202829", noHandphone: "081234567890", noSK: "123/Kebersamaan Sosial/2024" },
  ];

  const itemsPerPage = 10;
  const totalPages = Math.ceil(mockAnggotaData.length / itemsPerPage);

  useEffect(() => {
    setTimeout(() => {
      setAnggotaData(mockAnggotaData);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleSubmit = () => {
    console.log("Data Anggota:", anggotaData);
    console.log("Catatan:", catatan);
    console.log("Status:", status);
  };

  const handleHapusAkun = () => {
    console.log("Hapus akun clicked");
  };

  // PAGINATION SLICE LOGIC
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = anggotaData.slice(startIndex, endIndex);

  const getBadgeColor = (jabatan: string) => {
    switch (jabatan) {
      case "Agama":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Politik":
        return "bg-red-100 text-red-800 border-red-200";
      case "Sosial":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 font-medium">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Struktur Pengurus</h1>
          <p className="text-slate-600">Kelola dan ubah informasi anggota organisasi</p>
        </div>

        {/* Data Anggota */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
          {/* Mobile View - Card Layout */}
          <div className="block lg:hidden">
            <div className="p-4 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">Data Anggota</h2>
            </div>
            <div className="p-4 space-y-4">
              {currentData.length > 0 ? (
                currentData.map((anggota, index) => (
                  <div key={anggota.id} className="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:shadow-md transition-all duration-200">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">
                          {startIndex + index + 1}. {anggota.nama}
                        </h3>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getBadgeColor(anggota.jabatan)}`}>
                          {anggota.jabatan}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 min-w-0 flex-shrink-0">ID:</span>
                        <span className="font-medium text-slate-900">{anggota.noKeanggotaan}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 min-w-0 flex-shrink-0">HP:</span>
                        <span className="font-medium text-slate-900">{anggota.noHandphone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 min-w-0 flex-shrink-0">SK:</span>
                        <span className="font-medium text-slate-900 break-all">{anggota.noSK}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="text-slate-400 mb-2">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2" />
                    </svg>
                  </div>
                  <p className="text-slate-500">Tidak ada data yang ditemukan</p>
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
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">No</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Nama Anggota</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Jabatan</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">No Keanggotaan</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">No Handphone</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">No SK</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {currentData.length > 0 ? (
                    currentData.map((anggota, index) => (
                      <tr key={anggota.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                          {startIndex + index + 1}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-900 font-medium">
                          {anggota.nama}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getBadgeColor(anggota.jabatan)}`}>
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
                          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2" />
                          </svg>
                        </div>
                        <p className="text-slate-500">Tidak ada data yang ditemukan</p>
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
                Menampilkan {startIndex + 1} - {Math.min(endIndex, anggotaData.length)} dari {anggotaData.length} data
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
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
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Dokumen Pendukung */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Dokumen Pendukung</h3>
              <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm hover:underline transition-colors">
                Download Organisasi.pdf
              </button>
            </div>
          </div>
        </div>

        {/* Catatan */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
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
        </div>

        {/* Status */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
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
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-4 mb-8">
          <button
            onClick={handleHapusAkun}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors shadow-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Hapus Akun
          </button>
          <button
            onClick={handleSubmit}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default Section2DetailDataOrganisasiEdit;