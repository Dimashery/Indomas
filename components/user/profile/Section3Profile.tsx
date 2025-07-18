// C:\Indomas\components\user\profile\Section3Profile.tsx
"use client";

import React, { useState, useEffect } from "react";

interface Member {
  id: number;
  name: string;
  position: string;
  tenure: string;
  phone: string;
  avatar?: string;
}

const Section3Profile: React.FC = () => {
  const [animateTable, setAnimateTable] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    tenure: "",
    phone: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    // Animate table
    const timer = setTimeout(() => {
      setAnimateTable(true);
    }, 300);

    // Mock data untuk struktur anggota
    const mockMembers: Member[] = [
      {
        id: 1,
        name: "Ahmad Suryadi",
        position: "Ketua",
        tenure: "2023-2025",
        phone: "08123456789",
      },
      {
        id: 2,
        name: "Siti Nurhaliza",
        position: "Wakil Ketua",
        tenure: "2023-2025",
        phone: "08123456790",
      },
      {
        id: 3,
        name: "Budi Santoso",
        position: "Sekretaris",
        tenure: "2023-2025",
        phone: "08123456791",
      },
      {
        id: 4,
        name: "Dewi Kartika",
        position: "Bendahara",
        tenure: "2023-2025",
        phone: "08123456792",
      },
      {
        id: 5,
        name: "Joko Widodo",
        position: "Koordinator Program",
        tenure: "2023-2025",
        phone: "08123456793",
      },
      {
        id: 6,
        name: "Maya Sari",
        position: "Koordinator Humas",
        tenure: "2023-2025",
        phone: "08123456794",
      },
      {
        id: 7,
        name: "Rudi Hartono",
        position: "Koordinator Acara",
        tenure: "2023-2025",
        phone: "08123456795",
      },
      {
        id: 8,
        name: "Lina Marlina",
        position: "Koordinator Logistik",
        tenure: "2023-2025",
        phone: "08123456796",
      },
      {
        id: 9,
        name: "Andi Wijaya",
        position: "Koordinator Dokumentasi",
        tenure: "2023-2025",
        phone: "08123456797",
      },
      {
        id: 10,
        name: "Rina Susanti",
        position: "Anggota",
        tenure: "2023-2025",
        phone: "08123456798",
      },
      {
        id: 11,
        name: "Bayu Pratama",
        position: "Anggota",
        tenure: "2023-2025",
        phone: "08123456799",
      },
      {
        id: 12,
        name: "Citra Dewi",
        position: "Anggota",
        tenure: "2023-2025",
        phone: "08123456800",
      },
    ];

    setMembers(mockMembers);

    return () => clearTimeout(timer);
  }, []);

  const handleAddMember = () => {
    setEditingMember(null);
    setFormData({
      name: "",
      position: "",
      tenure: "",
      phone: "",
    });
    setIsModalOpen(true);
  };

  const handleEditMember = (member: Member) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      position: member.position,
      tenure: member.tenure,
      phone: member.phone,
    });
    setIsModalOpen(true);
  };

  const handleDeleteMember = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus anggota ini?")) {
      setMembers(members.filter((member) => member.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingMember) {
      // Update existing member
      setMembers(
        members.map((member) =>
          member.id === editingMember.id ? { ...member, ...formData } : member
        )
      );
    } else {
      // Add new member
      const newMember: Member = {
        id: Math.max(...members.map((m) => m.id)) + 1,
        ...formData,
      };
      setMembers([...members, newMember]);
    }

    setIsModalOpen(false);
    setEditingMember(null);
    setFormData({
      name: "",
      position: "",
      tenure: "",
      phone: "",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Pagination logic
  const totalItems = members.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMembers = members.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to first page
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              animateTable
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Daftar Anggota Organisasi
            </h2>
            <p className="text-gray-600 text-lg">
              Kelola struktur anggota dan pengurus organisasi
            </p>
          </div>

          {/* Controls */}
          <div
            className={`mb-6 flex justify-between items-center transition-all duration-1000 ${
              animateTable
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <button
              onClick={handleAddMember}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>Tambah Anggota</span>
            </button>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Tampilkan:</span>
              <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
              </select>
              <span className="text-sm text-gray-900">data per halaman</span>
            </div>
          </div>

          {/* Table Container */}
          <div
            className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-1000 ${
              animateTable
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            {/* Table Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6">
              <h3 className="text-xl font-semibold text-white">
                Struktur Anggota
              </h3>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">
                      Nama Anggota
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">
                      Jabatan
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">
                      Masa Jabatan
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">
                      Nomor HP
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentMembers.map((member, index) => (
                    <tr
                      key={member.id}
                      className={`border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 ${
                        animateTable
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      }`}
                      style={{
                        transitionDelay: `${400 + index * 50}ms`,
                      }}
                    >
                      {/* Name Column */}
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <svg
                              className="w-6 h-6 text-green-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                          </div>
                          <span className="text-gray-800 font-medium">
                            {member.name}
                          </span>
                        </div>
                      </td>

                      {/* Position Column */}
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <svg
                              className="w-6 h-6 text-green-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 6V8a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2z"
                              />
                            </svg>
                          </div>
                          <span className="text-gray-800">
                            {member.position}
                          </span>
                        </div>
                      </td>

                      {/* Tenure Column */}
                      <td className="py-4 px-6">
                        <span className="text-gray-800">{member.tenure}</span>
                      </td>

                      {/* Phone Column */}
                      <td className="py-4 px-6">
                        <span className="text-gray-800">{member.phone}</span>
                      </td>

                      {/* Actions Column */}
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEditMember(member)}
                            className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition-colors duration-200 text-sm flex items-center space-x-1"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteMember(member.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors duration-200 text-sm flex items-center space-x-1"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                            <span>Hapus</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Menampilkan {startIndex + 1} sampai{" "}
                  {Math.min(endIndex, totalItems)} dari {totalItems} anggota
                </p>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 text-sm rounded transition-colors ${
                      currentPage === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    Sebelumnya
                  </button>

                  {/* Page numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 text-sm rounded transition-colors ${
                          page === currentPage
                            ? "bg-green-600 text-white"
                            : "text-gray-600 hover:text-gray-800 hover:bg-gray-200"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 text-sm rounded transition-colors ${
                      currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    Selanjutnya
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Add/Edit Member */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 border border-green-400">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {editingMember ? "Edit Anggota" : "Tambah Anggota Baru"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Anggota
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Masukkan nama lengkap anggota"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400 text-black"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Jabatan
                </label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  placeholder="Contoh: Ketua, Sekretaris, Bendahara"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400  text-black"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Masa Jabatan
                </label>
                <input
                  type="text"
                  name="tenure"
                  value={formData.tenure}
                  onChange={handleInputChange}
                  placeholder="Contoh: 2023-2025"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400  text-black"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nomor HP
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Contoh: 08123456789"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400  text-black"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  {editingMember ? "Update" : "Tambah"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Section3Profile;
