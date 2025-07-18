// C:\Indomas\app\(user)\daftar-ormas\layout.tsx
import { Metadata } from "next";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";

export const metadata: Metadata = {
  title: "Daftar ORMAS - INDOMAS | BAKESBANGPOL Kota Batu",
  description:
    "Formulir pendaftaran organisasi masyarakat (ORMAS) untuk pengajuan legalitas dan rencana kerja melalui BAKESBANGPOL Kota Batu",
  keywords:
    "daftar ormas, organisasi masyarakat, bakesbangpol, kota batu, legalitas ormas, pendaftaran organisasi",
  authors: [{ name: "BAKESBANGPOL Kota Batu" }],
  openGraph: {
    title: "Daftar ORMAS - INDOMAS | BAKESBANGPOL Kota Batu",
    description:
      "Formulir pendaftaran organisasi masyarakat (ORMAS) untuk pengajuan legalitas dan rencana kerja melalui BAKESBANGPOL Kota Batu",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daftar ORMAS - INDOMAS | BAKESBANGPOL Kota Batu",
    description:
      "Formulir pendaftaran organisasi masyarakat (ORMAS) untuk pengajuan legalitas dan rencana kerja melalui BAKESBANGPOL Kota Batu",
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface DaftarOrmasLayoutProps {
  children: React.ReactNode;
}

export default function DaftarOrmasLayout({
  children,
}: DaftarOrmasLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
