// C:\Indomas\app\(user)\detail-list-ormas\[id]\page.tsx
"use client";

import React, { useState, useEffect, use } from "react";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import Section1Detail from "@/components/user/list_ormas_components/detail_ormas_components/Section1Detail";
import Section2Detail from "@/components/user/list_ormas_components/detail_ormas_components/Section2Detail";
import Section3Detail from "@/components/user/list_ormas_components/detail_ormas_components/Section3Detail";

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

interface DetailOrmasPageProps {
  params: Promise<{
    id: string;
  }>;
}

const DetailOrmasPage: React.FC<DetailOrmasPageProps> = ({ params }) => {
  // Unwrap params Promise using React.use()
  const { id } = use(params);

  const [ormasData, setOrmasData] = useState<OrmasData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrmasData = async () => {
      try {
        setLoading(true);

        // Simulate API call - replace with actual API endpoint
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data - replace with actual API call
        const mockData: OrmasData = {
          id: id,
          name: "Kebersamaan Sosial",
          category: "Sosial",
          email: "imamaditya@gmail.com",
          phone: "08123456789",
          address: "Jl. Dinoyo Raya No. 8, Manyar",
          registrationDate: "2-7-2025",
          description:
            "Organisasi Kebersamaan Sosial merupakan organisasi yang didirikan oleh....",
          status: "active",
        };

        setOrmasData(mockData);
        setError(null);
      } catch (err) {
        setError("Gagal mengambil data organisasi");
        console.error("Error fetching ormas data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrmasData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !ormasData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {error || "Data tidak ditemukan"}
            </h2>
            <button
              onClick={() => window.history.back()}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Kembali
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Section 1: Profile Organisasi */}
        <Section1Detail ormasData={ormasData} />

        {/* Section 2: Detail Tambahan */}
        <Section2Detail ormasData={ormasData} />

        {/* Section 3: Kontak & Informasi Lainnya */}
        <Section3Detail ormasData={ormasData} />
      </main>

      <Footer />
    </div>
  );
};

export default DetailOrmasPage;
