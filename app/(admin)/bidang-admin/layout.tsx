import { ReactNode } from "react";
import SideNavbar from "@/components/navbar/side_navbar";

interface DivisiLayoutProps {
  children: ReactNode;
}

const DivisiLayout = ({ children }: DivisiLayoutProps) => {
  return (
    <div className="flex h-screen bg-white">
      <SideNavbar />
      <main 
        className="flex-1 lg:ml-[320px] overflow-y-auto p-6 md:p-8 
                   pt-24 lg:pt-8"
      >
        {/*
          PENJELASAN PERUBAHAN:
          - pt-24: Menambahkan padding atas yang besar (6rem atau 96px) pada layar mobile (< lg). 
            Ini memberikan ruang yang cukup untuk tombol hamburger yang posisinya fixed.
          - lg:pt-8: Mengembalikan padding atas ke nilai normal (2rem atau 32px) pada layar besar (>= lg),
            karena tombol hamburger sudah tidak ada lagi.
          - p-6/p-8: Tetap memberikan padding di sisi lain untuk konsistensi.
          - lg:ml-[320px]: Margin kiri yang menyesuaikan dengan lebar sidebar pada layar besar.
        */}
        {children}
      </main>
    </div>
  );
};

export default DivisiLayout;