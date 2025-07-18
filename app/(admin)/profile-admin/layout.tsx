// D:\Project\Project Magang BAKESBANGPOL\Frontend\admin\Indomas\app\(admin)\profile-admin\layout.tsx
import { ReactNode } from "react";
import SideNavbar from "@/components/navbar/side_navbar";

interface ProfileAdminLayoutProps {
  children: ReactNode;
}

const ProfileAdminLayout = ({ children }: ProfileAdminLayoutProps) => {
  return (
    <div className="flex h-screen text-white bg-white">
      <SideNavbar />
      <main 
        className="flex-1 lg:ml-[320px] overflow-y-auto relative
                   pt-20 lg:pt-0 px-4 sm:px-6 lg:px-0"
      >
        {/*
          PENJELASAN PERUBAHAN RESPONSIVE:
          - lg:ml-[320px]: Margin left hanya pada layar besar (>= lg), sesuai dengan sidebar
          - pt-20: Padding top untuk mobile (space untuk hamburger menu)
          - lg:pt-0: Menghilangkan padding top pada desktop karena sidebar sudah permanent
          - px-4/sm:px-6/lg:px-0: Responsive horizontal padding untuk mobile dan tablet
        */}
        {children}
      </main>
    </div>
  );
};

export default ProfileAdminLayout;