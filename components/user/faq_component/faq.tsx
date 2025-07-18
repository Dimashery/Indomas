"use client";

// C:\Indomas\components\user\faq_component\faq.tsx
import React, { useState, useEffect } from "react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animateItems, setAnimateItems] = useState(false);

  useEffect(() => {
    // Animasi header saat component mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    // Animasi FAQ items saat component mount
    const itemTimer = setTimeout(() => {
      setAnimateItems(true);
    }, 800);

    return () => {
      clearTimeout(timer);
      clearTimeout(itemTimer);
    };
  }, []);

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "Apa itu INDOMAS?",
      answer:
        "INDOMAS merupakan sebuah website untuk mendaftarkan ormas serta menjadi website profil milik BAKESBANGPOL Kota Batu, dan memiliki fitur untuk menambahkan berita kegiatan dari setiap ormas yang terdaftar, serta menjadi sarana informasi mengenai BAKESBANGPOL Kota Batu.",
    },
    {
      id: 2,
      question: "Apa itu Badan Kesatuan Bangsa dan Politik?",
      answer:
        "Badan Kesatuan Bangsa dan Politik (BAKESBANGPOL) adalah lembaga pemerintah daerah yang bertugas menyelenggarakan urusan pemerintahan di bidang kesatuan bangsa dan politik, termasuk pembinaan organisasi kemasyarakatan.",
    },
    {
      id: 3,
      question: "Divisi apa saja yang ada pada BAKESBANGPOL?",
      answer:
        "BAKESBANGPOL memiliki beberapa divisi utama antara lain: Divisi Kesatuan Bangsa, Divisi Politik dan Pemerintahan, Divisi Pembinaan Organisasi Kemasyarakatan, dan Divisi Administrasi dan Keuangan.",
    },
    {
      id: 4,
      question: "Bagaimana cara mendaftarkan ORMAS pada website INDOMAS?",
      answer:
        "Untuk mendaftarkan ORMAS pada website INDOMAS, Anda dapat mengakses menu 'Daftar' pada halaman utama, kemudian mengisi formulir pendaftaran yang tersedia dengan melengkapi semua data yang diperlukan sesuai dengan persyaratan yang telah ditetapkan.",
    },
    {
      id: 5,
      question: "Cara membuat berita acara?",
      answer:
        "Untuk membuat berita acara, Anda dapat mengakses menu 'List Ormas' setelah login, kemudian pilih opsi 'Tambah Berita' dan lengkapi form yang tersedia dengan informasi kegiatan atau acara yang ingin dipublikasikan.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Section 1: Header dengan Background Image */}
      <div className="relative w-full">
        {/* Background Image */}
        <div
          className="w-screen bg-cover bg-center bg-no-repeat relative left-1/2 transform -translate-x-1/2"
          style={{
            backgroundImage: "url('/bg_form.png')",
            height: "400px", // Tinggi section header
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            minWidth: "101vw",
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Header Content */}
        <div className="absolute inset-0 flex items-center justify-center w-full h-full">
          <div
            className={`text-center transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-white/80 text-lg">
              Temukan jawaban atas pertanyaan yang sering diajukan
            </p>
          </div>
        </div>
      </div>

      {/* Section 2: FAQ Content dengan Background Putih Penuh */}
      <div className="bg-white min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {faqData.map((item, index) => (
                <details
                  key={item.id}
                  className={`group [&_summary::-webkit-details-marker]:hidden transition-all duration-700 ${
                    animateItems
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    transitionDelay: `${index * 150}ms`, // Stagger animation
                  }}
                  {...(index === 0 ? { open: true } : {})}
                >
                  <summary className="flex items-center justify-between gap-1.5 rounded-md border border-gray-200 bg-gray-50 p-4 text-gray-900 hover:bg-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer transform hover:scale-[1.02]">
                    <h2 className="text-lg font-medium text-left">
                      {item.question}
                    </h2>
                    <svg
                      className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <div className="px-4 pt-4 pb-4 text-gray-700 bg-white border-x border-b border-gray-200 rounded-b-md transition-all duration-300">
                    <p className="leading-relaxed">{item.answer}</p>
                  </div>
                </details>
              ))}
            </div>

            {/* Contact Section */}
            <div
              className={`text-center mt-16 transition-all duration-1000 ${
                animateItems
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${faqData.length * 150 + 300}ms`,
              }}
            >
              <p className="text-gray-600 mb-2">
                Masih ada pertanyaan? Kontak melalui email kami
              </p>
              <a
                href="mailto:kesbangpol.kotabatu@gmail.com"
                className="text-green-600 hover:text-green-700 transition-all duration-200 font-medium hover:underline transform hover:scale-105"
              >
                kesbangpol.kotabatu@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
