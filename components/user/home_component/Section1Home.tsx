// D:\Project\Project Magang BAKESBANGPOL\Frontend\indomas\components\user\dashboard_component\Section1Dashboard.tsx
import Image from "next/image";

const Section1Dashboard = () => {
  return (
    <div className="relative w-full h-[900px]">
      <Image
        src="/bg_form.png"
        alt="Dashboard Background"
        layout="fill"
        objectFit="cover"
        className="opacity-50"
      />
      <div className="absolute inset-0 flex items-center justify-center flex-col text-center z-0">
        <h1 className="text-4xl font-bold text-white">Selamat Datang</h1>
        <div>
          <span className="text-4xl font-semibold">di </span>
          <span className="text-6xl font-bold text-white mt-2">Indomas</span>
        </div>
        <div className="text-xl font-semibold text-white mt-40">
          <span>INDOMAS merupakan sebuah pusat informasi dan kegiatan</span>
          <span className="block">Organisasi Masyarakat pada Badan Kesatuan Bangsa dan Politik</span>
        </div>
        
      
      </div>
    </div>
  );
};

export default Section1Dashboard;