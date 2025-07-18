// D:\Project\Project Magang BAKESBANGPOL\Frontend\admin\Indomas\app\(admin)\faq-admin\layout.tsx
import { ReactNode } from "react";
import SideNavbar from "@/components/navbar/side_navbar";

interface FAQLayoutProps {
  children: ReactNode;
}

const FAQLayout = ({ children }: FAQLayoutProps) => {
  return (
    <div className="flex h-screen text-white bg-white">
      <SideNavbar />
      <main 
        className="flex-1 lg:ml-[320px] overflow-y-auto relative 
                   p-4 sm:p-6 md:p-8 pt-20 lg:pt-5"
      >
        {/*
          PENJELASAN PERUBAHAN RESPONSIVE:
          - lg:ml-[320px]: Margin kiri hanya pada layar besar (>= lg), 
            menggantikan ml-80 yang tidak responsive
          - p-4 sm:p-6 md:p-8: Padding bertahap dari mobile ke desktop
          - pt-20 lg:pt-8: Padding top lebih besar pada mobile untuk 
            menghindari overlap dengan navbar mobile
        */}
        {children}
      </main>
    </div>
  );
};

export default FAQLayout;