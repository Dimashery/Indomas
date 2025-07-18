import { ReactNode } from "react";
import SideNavbar from "@/components/navbar/side_navbar";

interface DetailLayoutProps {
  children: ReactNode;
}

const DetailLayout = ({ children }: DetailLayoutProps) => {
  return (
    <div className="flex h-screen text-white bg-white">
      <SideNavbar />
      <main 
        className="flex-1 lg:ml-[320px] overflow-y-auto 
                   pt-20 lg:pt-8 relative"
      >
        {/*
          PENJELASAN PERUBAHAN RESPONSIVE:
          - flex-1: Mengambil sisa ruang yang tersedia
          - lg:ml-[320px]: Menambahkan margin left 320px pada layar besar (>= lg),
            menyesuaikan dengan lebar sidebar yang kemungkinan 320px
          - pt-20: Menambahkan padding atas 5rem (80px) pada layar mobile (< lg)
            untuk memberikan ruang bagi tombol hamburger atau header mobile
          - lg:pt-8: Mengembalikan padding atas ke 2rem (32px) pada layar besar
          - overflow-y-auto: Memungkinkan scroll vertikal
          - relative: Positioning context untuk child elements
        */}
        {children}
      </main>
    </div>
  );
};

export default DetailLayout;