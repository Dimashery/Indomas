import { ReactNode } from "react";
import SideNavbar from "@/components/navbar/side_navbar";

interface EditLayoutProps {
  children: ReactNode;
}

const EditLayout = ({ children }: EditLayoutProps) => {
  return (
    <div className="flex h-screen text-white bg-white">
      <SideNavbar />
      <main className="flex-1 lg:ml-80 overflow-y-auto relative">
        {/*
          PENJELASAN PERUBAHAN:
          - lg:ml-80: Margin left 80 (320px) hanya pada layar besar (>= lg)
          - ml-80 dihapus untuk mobile, sehingga pada mobile akan full width
          - Struktur tetap sama, hanya menambahkan responsive breakpoint
        */}
        {children}
      </main>
    </div>
  );
};

export default EditLayout;