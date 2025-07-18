import { ReactNode } from "react";
import SideNavbar from "@/components/navbar/side_navbar";

interface TentangKamiLayoutProps {
  children: ReactNode;
}

const TentangKamiLayout = ({ children }: TentangKamiLayoutProps) => {
  return (
    <div className="flex h-screen text-white bg-white">
      <SideNavbar />
      <main 
        className="flex-1 lg:ml-[320px] overflow-y-auto relative p-0
                   pt-16 lg:pt-0"
      >
        {/*
          PENJELASAN PERUBAHAN RESPONSIVE:
          - lg:ml-[320px]: Margin left hanya pada layar besar (>= lg), mengikuti pola layout yang sudah ada
          - pt-16: Padding top pada mobile untuk memberikan ruang bagi hamburger menu
          - lg:pt-0: Menghilangkan padding top pada layar besar
          - p-0: Menghilangkan padding default karena padding sudah diatur di component children
          - overflow-y-auto: Memungkinkan scrolling vertikal
          - relative: Untuk positioning yang tepat
        */}
        {children}
      </main>
    </div>
  );
};

export default TentangKamiLayout;