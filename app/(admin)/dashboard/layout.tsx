// D:\Project\Project Magang BAKESBANGPOL\Frontend\admin\Indomas\app\(admin)\dashboard\layout.tsx
import { ReactNode } from "react";
import SideNavbar from "@/components/navbar/side_navbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex h-screen text-white">
      <SideNavbar />
      {/* 
        PERUBAHAN UNTUK RESPONSIVE:
        - lg:ml-[320px]: Margin kiri hanya diterapkan di layar besar (lebar sidebar 320px).
        - p-6 md:p-8: Padding umum untuk semua sisi.
        - pt-24 lg:pt-8: Padding atas yang besar untuk mobile (memberi ruang untuk hamburger) 
          dan kembali normal di layar besar.
      */}
      <main className="flex-1 lg:ml-[320px] overflow-y-auto p-0 md:p-0 pt-0 lg:pt-0">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;