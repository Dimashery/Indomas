// D:\Project\Project Magang BAKESBANGPOL\Frontend\indomas\components\navbar\navbar.tsx
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-green-600 p-4 flex justify-between items-center max-w-7xl mx-auto w-full fixed top-6 left-0 right-0 z-10 rounded-xl">
      <div className="flex items-center space-x-2 ml-20">
        <img src="/kotabatu.png" alt="Kota Batu Logo" className="h-10 mr-2" />
        <div className="text-white font-bold">
          <span>KESBANGPOL</span>
          <span className="block">Kota Batu</span>
        </div>
      </div>
      <div className="space-x-9 font-bold mr-20">
        <Link href="/dashboard" className="text-white hover:text-gray-200">Dashboard</Link>
        <Link href="/(user)/list-ormas" className="text-white hover:text-gray-200">List Ormas</Link>
        <Link href="/(user)/panduan" className="text-white hover:text-gray-200">Panduan</Link>
        <Link href="/faq" className="text-white hover:text-gray-200">FAQ</Link>
        <Link href="/logout" className="text-black hover:text-gray-200 bg-white hover:bg-green-800 px-4 py-2 rounded-xl transition">Masuk</Link>
      </div>
    </nav>
  );
};

export default Navbar;