"use client";

import { useState } from "react";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const Section1FAQAdmin = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      id: 1,
      question: "Apa itu INDOMAS?",
      answer:
        "INDOMAS merupakan website profile milik BAKESBANGPOL Kota Batu, yang memiliki tujuan untuk menampilkan data kegiatan dan informasi terdaftar, serta menjadi sarana informasi milik BAKESBANGPOL Kota Batu.",
    },
    {
      id: 2,
      question: "Apa itu INDOMAS?",
      answer:
        "INDOMAS merupakan website profile milik BAKESBANGPOL Kota Batu, yang memiliki tujuan untuk menampilkan data kegiatan dan informasi terdaftar, serta menjadi sarana informasi milik BAKESBANGPOL Kota Batu.",
    },
    {
      id: 3,
      question: "Apa itu INDOMAS?",
      answer:
        "INDOMAS merupakan website profile milik BAKESBANGPOL Kota Batu, yang memiliki tujuan untuk menampilkan data kegiatan dan informasi terdaftar, serta menjadi sarana informasi milik BAKESBANGPOL Kota Batu.",
    },
    {
      id: 4,
      question: "Apa itu INDOMAS?",
      answer:
        "INDOMAS merupakan website profile milik BAKESBANGPOL Kota Batu, yang memiliki tujuan untuk menampilkan data kegiatan dan informasi terdaftar, serta menjadi sarana informasi milik BAKESBANGPOL Kota Batu.",
    },
    {
      id: 5,
      question: "Apa itu INDOMAS?",
      answer:
        "INDOMAS merupakan website profile milik BAKESBANGPOL Kota Batu, yang memiliki tujuan untuk menampilkan data kegiatan dan informasi terdaftar, serta menjadi sarana informasi milik BAKESBANGPOL Kota Batu.",
    },
    {
      id: 6,
      question: "Apa itu INDOMAS?",
      answer:
        "INDOMAS merupakan website profile milik BAKESBANGPOL Kota Batu, yang memiliki tujuan untuk menampilkan data kegiatan dan informasi terdaftar, serta menjadi sarana informasi milik BAKESBANGPOL Kota Batu.",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [editMode, setEditMode] = useState<number | null>(null);
  const [editData, setEditData] = useState<FAQ | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFaqs = filteredFaqs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredFaqs.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleAddData = () => {
    setShowModal(true);
  };

  const handleAddNewData = () => {
    if (newQuestion.trim() && newAnswer.trim()) {
      const newId =
        faqs.length > 0 ? Math.max(...faqs.map((f) => f.id)) + 1 : 1;
      const newFAQ: FAQ = {
        id: newId,
        question: newQuestion,
        answer: newAnswer,
      };
      setFaqs([...faqs, newFAQ]);
      setShowModal(false);
      setNewQuestion("");
      setNewAnswer("");
      setCurrentPage(1);
    }
  };

  const handleDelete = (id: number) => {
    setFaqs(faqs.filter((faq) => faq.id !== id));
    if (editMode === id) {
      setEditMode(null);
      setEditData(null);
    }
    setCurrentPage(1);
  };

  const handleEdit = (faq: FAQ) => {
    setEditMode(faq.id);
    setEditData({ ...faq });
  };

  const handleSaveEdit = (id: number) => {
    if (editData) {
      setFaqs(faqs.map((faq) => (faq.id === id ? { ...editData } : faq)));
      setEditMode(null);
      setEditData(null);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(null);
    setEditData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="relative w-full p-6 sm:p-8 md:p-10 max-w-7xl mx-auto">
        {/* Header Section with Modern Design */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-2 h-12 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-full"></div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2">
                Frequently Asked Questions
              </h1>
              <p className="text-slate-600 text-lg">
                List Data FAQ Organisasi Masyarakat Kota Batu
              </p>
            </div>
          </div>
        </div>

        {/* Modern Search Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar with Icon */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Cari pertanyaan atau jawaban..."
                className="w-full pl-10 pr-4 py-3 text-slate-700 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Add Data Button */}
            <div className="flex">
              <button
                onClick={handleAddData}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                Tambah Data
              </button>
            </div>
          </div>
        </div>

        {/* Modern Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100">
                  <th className="px-6 py-4 text-left text-sm font-bold text-emerald-800 uppercase tracking-wider">
                    No.
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-emerald-800 uppercase tracking-wider">
                    Pertanyaan
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-emerald-800 uppercase tracking-wider">
                    Jawaban
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-emerald-800 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentFaqs.length > 0 ? (
                  currentFaqs.map((faq, index) => (
                    <tr
                      key={faq.id}
                      className="hover:bg-slate-50 transition-all duration-200 group"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-600">
                        {indexOfFirstItem + index + 1}
                      </td>
                      <td className="px-6 py-4 text-slate-800">
                        {editMode === faq.id ? (
                          <input
                            type="text"
                            value={editData?.question || ""}
                            onChange={(e) =>
                              setEditData({
                                ...editData!,
                                question: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 text-slate-700 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                          />
                        ) : (
                          <div className="font-semibold max-w-xs" title={faq.question}>
                            {faq.question}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {editMode === faq.id ? (
                          <textarea
                            value={editData?.answer || ""}
                            onChange={(e) =>
                              setEditData({ ...editData!, answer: e.target.value })
                            }
                            className="w-full px-3 py-2 text-slate-700 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 min-h-[80px] resize-y"
                          />
                        ) : (
                          <div className="max-w-md" title={faq.answer}>
                            {faq.answer.length > 100 ? `${faq.answer.substring(0, 100)}...` : faq.answer}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editMode === faq.id ? (
                          <div className="flex space-x-3">
                            <button
                              onClick={() => handleSaveEdit(faq.id)}
                              className="px-3 py-1 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all duration-200 text-sm font-medium"
                            >
                              Simpan
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="px-3 py-1 bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition-all duration-200 text-sm font-medium"
                            >
                              Batal
                            </button>
                          </div>
                        ) : (
                          <div className="flex space-x-3">
                            <button
                              onClick={() => handleEdit(faq)}
                              className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-all duration-200 group"
                            >
                              <HiOutlinePencilSquare className="text-blue-600 hover:text-blue-700" size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(faq.id)}
                              className="p-2 rounded-lg bg-red-50 hover:bg-red-100 transition-all duration-200 group"
                            >
                              <HiOutlineTrash className="text-red-600 hover:text-red-700" size={18} />
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

        {/* Modern Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4 bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <div className="flex items-center space-x-4">
            <span className="text-slate-600 text-sm font-medium">
              Menampilkan {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredFaqs.length)} dari {filteredFaqs.length} data
            </span>
            <select
              className="px-3 py-2 text-sm border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white text-slate-600"
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

        {/* Modern Modal */}
        {showModal && (
          <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <button
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                  onClick={() => setShowModal(false)}
                >
                  <IoClose size={24} />
                </button>
                
                <div className="mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-2 h-8 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-full"></div>
                    <h2 className="text-2xl font-bold text-slate-800">
                      Tambah Data FAQ
                    </h2>
                  </div>
                  <p className="text-slate-600">Tambahkan pertanyaan dan jawaban baru untuk FAQ</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Pertanyaan
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan pertanyaan..."
                      className="w-full px-4 py-3 text-slate-700 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white"
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Jawaban
                    </label>
                    <textarea
                      placeholder="Masukkan jawaban..."
                      className="w-full px-4 py-3 text-slate-700 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white min-h-[100px] resize-y"
                      value={newAnswer}
                      onChange={(e) => setNewAnswer(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-6 py-3 text-slate-700 border-2 border-slate-200 rounded-xl hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 transition-all duration-200 font-medium"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleAddNewData}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                  >
                    Tambah Data
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Section1FAQAdmin;