import React from "react";
import Section1Berita from "@/components/user/berita_components/Section1Berita";
import { Metadata } from "next";

// Page-specific metadata (will merge with layout metadata)
export const metadata: Metadata = {
  title: "Berita - INDOMAS",
  description: "Halaman Berita Organisasi Masyarakat dari Website INDOMAS",
};

const BeritaPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Section1Berita />
    </div>
  );
};

export default BeritaPage;
