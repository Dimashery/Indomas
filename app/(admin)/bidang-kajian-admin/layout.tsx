import { ReactNode } from "react";
import SideNavbar from "@/components/navbar/side_navbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex h-screen text-white bg-white">
      <SideNavbar />
      <main 
        className="flex-1 lg:ml-[320px] overflow-y-auto relative p-6 md:p-8 
                   pt-24 lg:pt-8"
      >
        {/*
          PENJELASAN PERUBAHAN RESPONSIVE:
          - lg:ml-[320px]: Margin left hanya pada layar besar (>= lg), mengikuti pola layout yang sudah ada
          - pt-24: Padding top pada mobile untuk memberikan ruang bagi hamburger menu (6rem atau 96px)
          - lg:pt-8: Mengembalikan padding top ke nilai normal (2rem atau 32px) pada layar besar
          - p-6 md:p-8: Padding samping yang adaptif untuk konsistensi
          - overflow-y-auto: Memungkinkan scrolling vertikal
          - relative: Untuk positioning yang tepat
        */}
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;