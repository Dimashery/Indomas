// D:\Project\Project Magang BAKESBANGPOL\Frontend\admin\Indomas\app\(admin)\berita\layout.tsx
import { ReactNode } from "react";
import SideNavbar from "@/components/navbar/side_navbar";

interface BeritaLayoutProps {
  children: ReactNode;
}

const BeritaLayout = ({ children }: BeritaLayoutProps) => {
  return (
    <div className="flex h-screen text-white bg-white">
      <SideNavbar />
      <main 
        className="flex-1 lg:ml-[320px] overflow-y-auto p-4 md:p-6 lg:p-8 
                   pt-20 lg:pt-8"
      >
        {/*
          PENJELASAN PERUBAHAN RESPONSIVE:
          - lg:ml-[320px]: Memberikan margin kiri hanya pada layar besar (>= lg)
          - pt-20: Padding atas yang lebih besar untuk mobile untuk menghindari overlap dengan navbar
          - lg:pt-8: Padding atas normal untuk desktop
          - p-4 md:p-6 lg:p-8: Padding responsif - kecil di mobile, sedang di tablet, besar di desktop
        */}
        {children}
      </main>
    </div>
  );
};

export default BeritaLayout;