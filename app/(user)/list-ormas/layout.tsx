import type { Metadata } from "next";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";

export const metadata: Metadata = {
  title: "List Organisasi - BAKESBANGPOL Kota Batu",
  description:
    "Daftar organisasi kemasyarakatan yang terdaftar di BAKESBANGPOL Kota Batu",
};

export default function OrmasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
