// C:\Indomas\app\(user)\daftar-ormas\page.tsx
import { Metadata } from "next";
import Section1Daftar from "@/components/user/daftar_ormas_components/Section1Daftar";

// Page-specific metadata (will merge with layout metadata)
export const metadata: Metadata = {
  title: "Pendaftaran ORMAS - INDOMAS",
  description:
    "Daftarkan organisasi masyarakat Anda melalui formulir pengajuan legalitas dan rencana kerja BAKESBANGPOL Kota Batu",
};

export default function DaftarOrmasPage() {
  return (
    <>
      <Section1Daftar />
    </>
  );
}
