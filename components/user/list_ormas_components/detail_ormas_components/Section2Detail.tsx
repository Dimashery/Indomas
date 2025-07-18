// C:\Indomas\components\user\list_ormas_components\detail_ormas_components\Section2Detail.tsx
"use client";

import React, { useState, useEffect } from "react";

interface OrmasData {
  id: string;
  name: string;
  category: string;
  email: string;
  phone: string;
  address: string;
  registrationDate: string;
  description: string;
  logo?: string;
  status: "active" | "inactive";
}

interface Member {
  id: number;
  name: string;
  position: string;
  tenure: string;
  phone: string;
  avatar?: string;
}

interface Section2DetailProps {
  ormasData: OrmasData;
}

const Section2Detail: React.FC<Section2DetailProps> = ({ ormasData }) => {
  const [animateTable, setAnimateTable] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    // Animate table
    const timer = setTimeout(() => {
      setAnimateTable(true);
    }, 300);

    // Mock data untuk struktur anggota - replace dengan API call
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
    ];

    setMembers(mockMembers);

    return () => clearTimeout(timer);
  }, []);

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
              Struktur Anggota
            </h2>
            <p className="text-gray-600 text-lg">
              Daftar pengurus dan anggota aktif organisasi {ormasData.name}
            </p>
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
                  </tr>
                </thead>
                <tbody>
                  {members.map((member, index) => (
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Menampilkan {members.length} anggota
                </p>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded transition-colors">
                    Sebelumnya
                  </button>
                  <button className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                    1
                  </button>
                  <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded transition-colors">
                    Selanjutnya
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2Detail;
