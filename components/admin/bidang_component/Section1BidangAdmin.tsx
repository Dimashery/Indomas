"use client"; // Tambahkan directive untuk mendukung useState

import Image from "next/image";
import { HiOutlineTrash, HiOutlinePencilSquare } from "react-icons/hi2"; // Ikon untuk tombol hapus dan edit
import { useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { MdArrowBackIosNew } from "react-icons/md";
import { IoClose } from "react-icons/io5"; // Ikon untuk tombol tutup modal
import { FiSearch } from "react-icons/fi";

interface Division {
  id: number;
  fieldName: string;
  chairmanName: string;
  totalMembers: number;
  position: string;
  description: string;
  divisionImage: string;
}

const Section1BidangAdmin = () => {
  // State untuk data divisi (sekarang dapat diperbarui)
  const [divisions, setDivisions] = useState<Division[]>([
    {
      id: 1,
      fieldName: "Bidang Pendidikan",
      chairmanName: "Budi Santoso",
      totalMembers: 15,
      position: "Ketua Bidang",
      description: "Bidang ini bertanggung jawab atas pengembangan pendidikan di masyarakat Kota Batu. Mengadakan pelatihan dan seminar untuk meningkatkan literasi dan keterampilan.",
      divisionImage: "/bg_form.png",
    },
    {
      id: 2,
      fieldName: "Bidang Olahraga",
      chairmanName: "Andi Wijaya",
      totalMembers: 20,
      position: "Ketua Bidang",
      description: "Bidang ini mengelola kegiatan olahraga lokal, termasuk turnamen dan pelatihan untuk pemuda Kota Batu.",
      divisionImage: "/bg_form.png",
    },
    {
      id: 3,
      fieldName: "Bidang Sosial",
      chairmanName: "Siti Aminah",
      totalMembers: 10,
      position: "Ketua Bidang",
      description: "Fokus pada kegiatan sosial seperti bantuan kepada masyarakat kurang mampu dan program kesehatan masyarakat.",
      divisionImage: "/bg_form.png",
    },
  ]);

  // State untuk search, filter, pagination, dan items per page
  const [searchTerm, setSearchTerm] = useState("");
  const [filterField, setFilterField] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Default 5 data per halaman
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // State untuk modal gambar
  const [showImageModal, setShowImageModal] = useState(false); // State untuk menampilkan modal gambar
  const [selectedDescription, setSelectedDescription] = useState<string | null>(null); // State untuk modal deskripsi
  const [showDescriptionModal, setShowDescriptionModal] = useState(false); // State untuk menampilkan modal deskripsi
  const [editMode, setEditMode] = useState<number | null>(null); // ID divisi yang sedang diedit
  const [editData, setEditData] = useState<Division | null>(null); // Data sementara untuk pengeditan

  // Filter data berdasarkan search dan opsi
  const filteredDivisions = divisions.filter((division) => {
    const matchesSearch = division.fieldName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         division.chairmanName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesField = filterField === "Semua" || division.fieldName === filterField;
    return matchesSearch && matchesField;
  });

  // Logika pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDivisions = filteredDivisions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDivisions.length / itemsPerPage);

  // Fungsi untuk mengubah halaman
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Fungsi untuk menambah data baru
  const handleAddData = () => {
    const newId = divisions.length > 0 ? Math.max(...divisions.map(d => d.id)) + 1 : 1;
    const newDivision: Division = {
      id: newId,
      fieldName: `Bidang Baru ${newId}`,
      chairmanName: `Ketua ${newId}`,
      totalMembers: 0,
      position: "Ketua Bidang",
      description: "Deskripsi default untuk divisi baru.",
      divisionImage: "/bg_form.png",
    };
    setDivisions([...divisions, newDivision]);
    setCurrentPage(1); // Reset ke halaman 1 setelah menambah data
  };

  // Fungsi untuk menghapus data
  const handleDelete = (id: number) => {
    setDivisions(divisions.filter(division => division.id !== id));
    if (editMode === id) {
      setEditMode(null);
      setEditData(null);
    }
    setCurrentPage(1); // Reset ke halaman 1 setelah menghapus data
  };

  // Fungsi untuk memulai mode edit
  const handleEdit = (division: Division) => {
    setEditMode(division.id);
    setEditData({ ...division });
  };

  // Fungsi untuk menyimpan perubahan edit
  const handleSaveEdit = (id: number) => {
    if (editData) {
      setDivisions(divisions.map(division =>
        division.id === id ? { ...editData } : division
      ));
      setEditMode(null);
      setEditData(null);
    }
  };

  // Fungsi untuk membatalkan edit
  const handleCancelEdit = () => {
    setEditMode(null);
    setEditData(null);
  };

  // Fungsi untuk menangani upload gambar
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && editData) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditData({ ...editData, divisionImage: reader.result as string });
      };
      reader.readAsDataURL(file);
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
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2">Data Bidang</h1>
              <p className="text-slate-600 text-lg">List Data Bidang Badan Kesatuan Bangsa dan Politik Kota Batu</p>
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
                placeholder="Cari nama bidang atau ketua..."
                className="w-full pl-10 pr-4 py-3 text-slate-700 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Filter Dropdown */}
            <div className="flex gap-4">
              <select
                className="px-4 py-3 text-slate-700 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white min-w-[150px]"
                value={filterField}
                onChange={(e) => setFilterField(e.target.value)}
              >
                <option value="Semua">Semua Bidang</option>
                <option value="Bidang Pendidikan">Bidang Pendidikan</option>
                <option value="Bidang Olahraga">Bidang Olahraga</option>
                <option value="Bidang Sosial">Bidang Sosial</option>
              </select>
            </div>
          </div>
        </div>

        {/* Modern Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100">
                  <th className="px-6 py-4 text-left text-sm font-bold text-emerald-800 uppercase tracking-wider">No.</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-emerald-800 uppercase tracking-wider">Bidang</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-emerald-800 uppercase tracking-wider">Nama</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-emerald-800 uppercase tracking-wider">Total Anggota</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-emerald-800 uppercase tracking-wider">Jabatan</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-emerald-800 uppercase tracking-wider">Deskripsi</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-emerald-800 uppercase tracking-wider">Gambar</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-emerald-800 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentDivisions.length > 0 ? (
                  currentDivisions.map((division, index) => (
                    <tr key={division.id} className="hover:bg-slate-50 transition-all duration-200 group">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-600">
                        {editMode === division.id ? (
                          <input
                            type="text"
                            value={indexOfFirstItem + index + 1}
                            className="w-full p-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm bg-slate-50"
                            readOnly
                          />
                        ) : (
                          indexOfFirstItem + index + 1
                        )}
                      </td>
                      <td className="px-6 py-4 text-slate-800 font-semibold">
                        {editMode === division.id ? (
                          <input
                            type="text"
                            value={editData?.fieldName || ""}
                            onChange={(e) => setEditData({ ...editData!, fieldName: e.target.value })}
                            className="w-full p-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm bg-slate-50"
                          />
                        ) : (
                          <div className="max-w-[120px] sm:max-w-[150px] truncate" title={division.fieldName}>
                            {division.fieldName}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {editMode === division.id ? (
                          <input
                            type="text"
                            value={editData?.chairmanName || ""}
                            onChange={(e) => setEditData({ ...editData!, chairmanName: e.target.value })}
                            className="w-full p-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm bg-slate-50"
                          />
                        ) : (
                          <div className="max-w-[120px] sm:max-w-[150px] truncate" title={division.chairmanName}>
                            {division.chairmanName}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                        {editMode === division.id ? (
                          <input
                            type="number"
                            value={editData?.totalMembers || 0}
                            onChange={(e) => setEditData({ ...editData!, totalMembers: Number(e.target.value) })}
                            className="w-full p-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm bg-slate-50"
                          />
                        ) : (
                          division.totalMembers
                        )}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {editMode === division.id ? (
                          <input
                            type="text"
                            value={editData?.position || ""}
                            onChange={(e) => setEditData({ ...editData!, position: e.target.value })}
                            className="w-full p-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm bg-slate-50"
                          />
                        ) : (
                          <div className="max-w-[100px] sm:max-w-[120px] truncate" title={division.position}>
                            {division.position}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {editMode === division.id ? (
                          <textarea
                            value={editData?.description || ""}
                            onChange={(e) => setEditData({ ...editData!, description: e.target.value })}
                            className="w-full p-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm h-16 resize-none bg-slate-50"
                          />
                        ) : (
                          <span
                            className="cursor-pointer text-emerald-600 hover:text-emerald-800 hover:underline max-w-[150px] sm:max-w-[200px] block truncate transition-colors duration-200"
                            title={division.description}
                            onClick={() => {
                              setSelectedDescription(division.description);
                              setShowDescriptionModal(true);
                            }}
                          >
                            {division.description.substring(0, 30)}...
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {editMode === division.id ? (
                          <div className="space-y-2">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                              id={`image-upload-${division.id}`}
                            />
                            <label
                              htmlFor={`image-upload-${division.id}`}
                              className="bg-emerald-500 text-white px-3 py-2 rounded-lg cursor-pointer hover:bg-emerald-600 transition-colors duration-200 text-sm inline-block shadow-sm"
                            >
                              Pilih Gambar
                            </label>
                            {editData?.divisionImage && (
                              <Image
                                src={editData.divisionImage}
                                alt={editData.fieldName}
                                width={60}
                                height={40}
                                className="object-cover rounded-lg shadow-sm"
                              />
                            )}
                          </div>
                        ) : (
                          <Image
                            src={division.divisionImage}
                            alt={division.fieldName}
                            width={60}
                            height={40}
                            className="object-cover cursor-pointer hover:scale-105 transition-transform duration-200 rounded-lg shadow-sm"
                            onClick={() => {
                              setSelectedImage(division.divisionImage);
                              setShowImageModal(true);
                            }}
                          />
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-3">
                          {editMode === division.id ? (
                            <>
                              <button
                                onClick={() => handleSaveEdit(division.id)}
                                className="px-3 py-1 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors duration-200 text-sm font-medium shadow-sm"
                              >
                                Save
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 text-sm font-medium shadow-sm"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleEdit(division)}
                                className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-all duration-200 group"
                              >
                                <HiOutlinePencilSquare className="text-blue-600 hover:text-blue-700 cursor-pointer" size={18} />
                              </button>
                              <button
                                onClick={() => handleDelete(division.id)}
                                className="p-2 rounded-lg bg-red-50 hover:bg-red-100 transition-all duration-200 group"
                              >
                                <HiOutlineTrash className="text-red-600 hover:text-red-700 cursor-pointer" size={18} />
                              </button>
                            </>
                          )}
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
              Menampilkan {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredDivisions.length)} dari {filteredDivisions.length} data
            </span>
            <select
              className="px-3 py-2 text-sm border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white text-gray-500"
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

        {/* Modern Add Data Button */}
        <div className="flex justify-end mt-8">
          <button
            onClick={handleAddData}
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
          >
            Tambah Data
          </button>
        </div>

        {/* Modal untuk Gambar */}
        {showImageModal && selectedImage && (
          <div 
            className={`fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50 transition-opacity duration-300 p-4 ${
              showImageModal ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => {
              setShowImageModal(false);
              setSelectedImage(null);
            }}
          >
            <div 
              className={`bg-white p-6 rounded-2xl relative max-w-[95vw] max-h-[95vh] sm:max-w-[90vw] sm:max-h-[90vh] transition-all duration-300 transform shadow-2xl ${
                showImageModal ? 'scale-100' : 'scale-95'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-slate-400 hover:text-red-500 z-10 bg-white rounded-full p-2 shadow-lg transition-colors duration-200"
                onClick={() => {
                  setShowImageModal(false);
                  setSelectedImage(null);
                }}
              >
                <IoClose size={24} />
              </button>
              <div className="flex items-center justify-center max-w-[90vw] max-h-[85vh] sm:max-w-[85vw] sm:max-h-[80vh] overflow-hidden">
                <Image 
                  src={selectedImage} 
                  alt="Enlarged Division Image" 
                  width={800} 
                  height={600} 
                  className="object-contain max-w-full max-h-full rounded-xl"
                  style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Modal untuk Deskripsi */}
        {showDescriptionModal && selectedDescription && (
          <div 
            className={`fixed backdrop-blur-xs inset-0 flex items-center justify-center z-50 transition-opacity duration-300 p-4 ${
              showDescriptionModal ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => {
              setShowDescriptionModal(false);
              setSelectedDescription(null);
            }}
          >
            <div 
              className={`bg-white p-6 rounded-2xl max-w-sm sm:max-w-md w-full mx-4 relative transition-all duration-300 transform shadow-2xl ${
                showDescriptionModal ? 'scale-100' : 'scale-95'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors duration-200 bg-slate-100 rounded-full p-1 hover:bg-red-50"
                onClick={() => {
                  setShowDescriptionModal(false);
                  setSelectedDescription(null);
                }}
              >
                <IoClose size={20} />
              </button>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-full"></div>
                <h3 className="text-xl font-bold text-slate-800">Deskripsi Bidang</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">{selectedDescription}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Section1BidangAdmin;