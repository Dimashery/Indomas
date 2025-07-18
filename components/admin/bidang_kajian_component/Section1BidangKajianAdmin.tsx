"use client";

import { useState } from "react";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import { FiSearch } from "react-icons/fi";
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";
import { IoAdd } from "react-icons/io5";

interface Field {
  id: number;
  fieldName: string;
}

const Section1BidangKajianAdmin = () => {
  const [fields, setFields] = useState<Field[]>([
    { id: 1, fieldName: "Agama" },
    { id: 2, fieldName: "Politik" },
    { id: 3, fieldName: "Sosial" },
    { id: 4, fieldName: "Kesehatan" },
    { id: 5, fieldName: "Kebudayaan" },
    { id: 6, fieldName: "Pendidikan" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [editMode, setEditMode] = useState<number | null>(null);
  const [editData, setEditData] = useState<Field | null>(null);
  
  // New states for add form
  const [showAddForm, setShowAddForm] = useState(false);
  const [newFieldName, setNewFieldName] = useState("");

  const filteredFields = fields.filter((field) =>
    field.fieldName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFields = filteredFields.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredFields.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleAddData = () => {
    setShowAddForm(true);
    setNewFieldName("");
  };

  const handleSaveNewData = () => {
    if (newFieldName.trim()) {
      const newId = fields.length > 0 ? Math.max(...fields.map(f => f.id)) + 1 : 1;
      const newField: Field = { id: newId, fieldName: newFieldName.trim() };
      setFields([...fields, newField]);
      setShowAddForm(false);
      setNewFieldName("");
      setCurrentPage(1);
    }
  };

  const handleCancelAdd = () => {
    setShowAddForm(false);
    setNewFieldName("");
  };

  const handleDelete = (id: number) => {
    setFields(fields.filter(field => field.id !== id));
    if (editMode === id) {
      setEditMode(null);
      setEditData(null);
    }
    setCurrentPage(1);
  };

  const handleEdit = (field: Field) => {
    setEditMode(field.id);
    setEditData({ ...field });
  };

  const handleSaveEdit = (id: number) => {
    if (editData) {
      setFields(fields.map(field => field.id === id ? { ...editData } : field));
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
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2">Data Bidang Kajian</h1>
              <p className="text-slate-600 text-lg">List Data Bidang Kajian Organisasi Masyarakat Kota Batu</p>
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
                placeholder="Cari nama bidang..."
                className="w-full pl-10 pr-4 py-3 text-slate-700 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Add Button */}
            <div className="flex gap-4">
              <button
                onClick={handleAddData}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <IoAdd size={20} />
                <span>Tambah Data</span>
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
                  <th className="px-6 py-4 text-left text-sm font-bold text-emerald-800 uppercase tracking-wider">No.</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-emerald-800 uppercase tracking-wider">Bidang Kajian</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-emerald-800 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentFields.length > 0 ? (
                  currentFields.map((field, index) => (
                    <tr key={field.id} className="hover:bg-slate-50 transition-all duration-200 group">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-600">
                        {indexOfFirstItem + index + 1}
                      </td>
                      <td className="px-6 py-4 text-slate-800 font-semibold">
                        {editMode === field.id ? (
                          <input
                            type="text"
                            value={editData?.fieldName || ""}
                            onChange={(e) => setEditData({ ...editData!, fieldName: e.target.value })}
                            className="w-full px-3 py-2 text-slate-700 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white"
                          />
                        ) : (
                          field.fieldName
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editMode === field.id ? (
                          <div className="flex space-x-3">
                            <button
                              onClick={() => handleSaveEdit(field.id)}
                              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-lg hover:shadow-xl text-sm"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-lg hover:shadow-xl text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex space-x-3">
                            <button
                              onClick={() => handleEdit(field)}
                              className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-all duration-200 group"
                            >
                              <HiOutlinePencilSquare className="text-blue-600 hover:text-blue-700" size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(field.id)}
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
                    <td colSpan={3} className="px-6 py-12 text-center text-slate-500">
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
              Menampilkan {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredFields.length)} dari {filteredFields.length} data
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
      </div>
      
      {/* Add Form Modal with Modern Design */}
      {showAddForm && (
        <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 w-full max-w-md">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-2 h-8 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-full"></div>
              <h3 className="text-2xl font-bold text-slate-800">Tambahkan Data Bidang Kajian</h3>
            </div>
            <div className="mb-6">
              <input
                type="text"
                placeholder="Masukkan Bidang Kajian"
                className="w-full px-4 py-3 text-slate-700 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white"
                value={newFieldName}
                onChange={(e) => setNewFieldName(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSaveNewData();
                  }
                }}
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancelAdd}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                Batal
              </button>
              <button
                onClick={handleSaveNewData}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Section1BidangKajianAdmin;