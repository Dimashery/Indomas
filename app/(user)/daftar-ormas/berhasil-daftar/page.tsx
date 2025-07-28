import React from "react";
import Section2SuccessDaftar from "@/components/user/daftar_ormas_components/Section2SuccessDaftar";
import { Metadata } from "next";

// Page-specific metadata (will merge with layout metadata)
export const metadata: Metadata = {
  title: "Pendaftaran Data Ormas Telah Berhasil! - INDOMAS",
  description: "Selamat! Anda Berhasil Membuat Berita Acara",
};

const BerhasilDaftarPage: React.FC = () => {
  return (
    <main>
      <Section2SuccessDaftar />
    </main>
  );
};

export default BerhasilDaftarPage;
