import type { Metadata } from "next";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";

export const metadata: Metadata = {
  title: "Buat Berita Kegiatan - INDOMAS",
  description:
    "Buat kegiatan acara dari Organisasi Anda - BAKESBANGPOL Kota Batu",
};

export default function BuatBeritaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
