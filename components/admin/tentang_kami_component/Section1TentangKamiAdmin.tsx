"use client";

import Image from "next/image";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";

interface TentangKami {
  id: number;
  description: string;
  image: string;
}

const Section1TentangKamiAdmin = () => {
  const [data, setData] = useState<TentangKami[]>([
    {
      id: 1,
      description: "Kami adalah organisasi yang berfokus pada pengembangan masyarakat Kota Batu melalui pendidikan dan pelatihan.",
      image: "/bg_form.png",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [editMode, setEditMode] = useState<number | null>(null);
  const [editData, setEditData] = useState<TentangKami | null>(null);
  const [selectedDescription, setSelectedDescription] = useState<string | null>(null);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);

  const filteredData = data.filter((item) =>
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (item: TentangKami) => {
    setEditMode(item.id);
    setEditData({ ...item });
  };

  const handleSaveEdit = (id: number) => {
    if (editData) {
      setData(data.map(item =>
        item.id === id ? { ...editData } : item
      ));
      setEditMode(null);
      setEditData(null);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(null);
    setEditData(null);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && editData) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditData({ ...editData, image: reader.result as string });
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
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2">Tentang Kami</h1>
              <p className="text-slate-600 text-lg">Informasi Tentang Organisasi Masyarakat Kota Batu</p>
            </div>
          </div>
        </div>
        
        {/* Modern Search Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-8">
          <div className="flex-1 relative max-w-lg">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Cari deskripsi..."
              className="w-full pl-10 pr-4 py-3 text-slate-700 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Modern Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100">
                  <th className="px-6 py-4 text-left text-sm font-bold text-emerald-800 uppercase tracking-wider">No.</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-emerald-800 uppercase tracking-wider">Deskripsi</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-emerald-800 uppercase tracking-wider">Gambar</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-emerald-800 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-all duration-200 group">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-600">
                        {editMode === item.id ? (
                          <input
                            type="text"
                            value={index + 1}
                            className="w-full p-1 border rounded text-sm bg-slate-50"
                            readOnly
                          />
                        ) : (
                          index + 1
                        )}
                      </td>
                      <td className="px-6 py-4 text-slate-800 max-w-[300px]">
                        {editMode === item.id ? (
                          <textarea
                            value={editData?.description || ""}
                            onChange={(e) => setEditData({ ...editData!, description: e.target.value })}
                            className="w-full h-24 p-3 border-2 border-slate-200 rounded-xl resize-none text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white"
                            rows={4}
                          />
                        ) : (
                          <span
                            className="cursor-pointer text-slate-800 hover:text-emerald-600 transition-colors text-sm block truncate"
                            onClick={() => {
                              setSelectedDescription(item.description);
                              setShowDescriptionModal(true);
                            }}
                          >
                            {item.description.length > 50 
                              ? `${item.description.substring(0, 50)}...` 
                              : item.description}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editMode === item.id ? (
                          <div className="flex flex-col space-y-2">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                              id={`image-upload-${item.id}`}
                            />
                            <label
                              htmlFor={`image-upload-${item.id}`}
                              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-xl cursor-pointer hover:from-blue-600 hover:to-indigo-700 text-sm text-center transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                              Pilih Gambar
                            </label>
                            {editData?.image && (
                              <Image
                                src={editData.image}
                                alt="Uploaded Image"
                                width={120}
                                height={60}
                                className="object-cover rounded-xl shadow-md"
                              />
                            )}
                          </div>
                        ) : (
                          <Image
                            src={item.image}
                            alt="Tentang Kami Image"
                            width={120}
                            height={60}
                            className="object-cover cursor-pointer rounded-xl hover:opacity-80 transition-opacity shadow-md hover:shadow-lg"
                            onClick={() => {
                              setSelectedImage(item.image);
                              setShowImageModal(true);
                            }}
                          />
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editMode === item.id ? (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleSaveEdit(item.id)}
                              className="px-4 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 text-sm transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 text-sm transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex justify-center">
                            <button
                              onClick={() => handleEdit(item)}
                              className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-all duration-200 group"
                            >
                              <HiOutlinePencilSquare className="text-blue-600 hover:text-blue-700 cursor-pointer" size={18} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                          <FiSearch className="w-8 h-8 text-slate-400" />
                        </div>
                        <p className="text-lg font-medium">Tidak ada data yang ditemukan</p>
                        <p className="text-sm text-slate-400">Coba ubah kata kunci pencarian</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal untuk Gambar - Modern Design */}
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
                className="absolute top-3 right-3 text-slate-400 hover:text-red-500 z-10 bg-white rounded-full p-2 shadow-lg transition-all duration-200 hover:shadow-xl"
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
                  alt="Enlarged Tentang Kami Image" 
                  width={800} 
                  height={600} 
                  className="object-contain max-w-full max-h-full rounded-xl shadow-lg"
                  style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Modal untuk Deskripsi - Modern Design */}
        {showDescriptionModal && selectedDescription && (
          <div 
            className={`fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50 transition-opacity duration-300 p-4 ${
              showDescriptionModal ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => {
              setShowDescriptionModal(false);
              setSelectedDescription(null);
            }}
          >
            <div 
              className={`bg-white p-6 rounded-2xl max-w-sm sm:max-w-md md:max-w-lg w-full mx-4 relative transition-all duration-300 transform shadow-2xl ${
                showDescriptionModal ? 'scale-100' : 'scale-95'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-3 text-slate-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-slate-100"
                onClick={() => {
                  setShowDescriptionModal(false);
                  setSelectedDescription(null);
                }}
              >
                <IoClose size={24} />
              </button>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-full"></div>
                <h3 className="text-lg font-bold text-slate-800">
                  Deskripsi Tentang Kami
                </h3>
              </div>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base pr-6">
                {selectedDescription}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Section1TentangKamiAdmin;