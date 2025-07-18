// D:\Project\Project Magang BAKESBANGPOL\Frontend\admin\Indomas\components\admin\dashboard_component\Section1DashboardAdmin.tsx
import Image from "next/image";

const Section1DashboardAdmin = () => {
  return (
    // Mengubah min-h-screen menjadi h-full agar mengisi parent <main> dengan benar
    <div className="relative w-full h-full">
      <Image
        src="/kota-batu.jpg"
        alt="Dashboard Background"
        layout="fill"
        objectFit="cover"
        className="opacity-75"
      />
      {/* Menambahkan padding horizontal agar teks tidak menempel di tepi layar kecil */}
      <div className="absolute inset-0 flex items-center justify-center flex-col text-center z-0 px-4">
        {/* Ukuran font dibuat responsif */}
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Selamat Datang
        </h1>
        <div className="mt-2">
          <span className="text-3xl md:text-4xl font-semibold">di </span>
          {/* Font INDOMAS dibuat lebih besar dan responsif */}
          <span className="text-5xl md:text-7xl font-bold text-white">
            INDOMAS
          </span>
        </div>
        {/* Margin atas dan ukuran font pada deskripsi dibuat responsif */}
        <div className="text-lg md:text-xl font-semibold text-white mt-20 md:mt-32">
          <span>INDOMAS merupakan sebuah pusat informasi dan kegiatan</span>
          <span className="block mt-1">
            Organisasi Masyarakat pada Badan Kesatuan Bangsa dan Politik
          </span>
        </div>
      </div>
    </div>
  );
};

export default Section1DashboardAdmin;