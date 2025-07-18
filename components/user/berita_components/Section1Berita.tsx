"use client";

import React from "react";
import { Mail, MapPin, Calendar } from "lucide-react";
import Image from "next/image";

interface AuthorInfo {
  name: string;
  location: string;
  avatar?: string;
}

interface OrganizationInfo {
  name: string;
  type: string;
  email: string;
}

interface BeritaData {
  title: string;
  date: string;
  author: AuthorInfo;
  content: string;
  image: string;
  organization: OrganizationInfo;
}

const Section1Berita: React.FC = () => {
  // Data dummy - dalam implementasi nyata, data ini bisa dari props atau API
  const beritaData: BeritaData = {
    title: "Pembuatan Batik Di Desa Bumiaji",
    date: "12 Juli 2025 18:25",
    author: {
      name: "Muhammad_Imam",
      location: "Jl. Kasiman No.1, Malang Raya",
    },
    content: `Indomas merupakan sebuah website yang memberikan informasi terkait kegiatan organisasi yang terdaftar pada Badan Kesatuan Bangsa dan Politik. Indomas merupakan sebuah website yang memberikan informasi terkait kegiatan organisasi yang terdaftar pada Badan Kesatuan Bangsa dan Politik. Indomas merupakan sebuah website yang memberikan informasi terkait kegiatan organisasi yang terdaftar pada Badan Kesatuan Bangsa dan Politik. Indomas merupakan sebuah website yang memberikan informasi terkait kegiatan organisasi yang terdaftar pada Badan Kesatuan Bangsa dan Politik.`,
    image: "/berita/Berita3.png",
    organization: {
      name: "Kebersaman Sosial",
      type: "Sosial",
      email: "kebersaman.sosial@gmail.com",
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Article Header */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {beritaData.title}
            </h1>

            {/* Author Info */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-white-500 flex items-center justify-center">
                <Image
                  src="/logos/KESBANG.png"
                  alt="User Avatar"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {beritaData.author.name}
                </h3>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {beritaData.author.location}
                </p>
              </div>
              <div className="ml-auto text-sm text-gray-500 flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {beritaData.date}
              </div>
            </div>

            {/* Article Image */}
            <div className="mb-6">
              <Image
                src={beritaData.image}
                alt={beritaData.title}
                width={800}
                height={400}
                className="w-full h-96 object-cover rounded-lg"
                priority
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed text-justify">
                {beritaData.content}
              </p>
            </div>
          </div>
        </div>

        {/* Organization Info Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Organisasi
          </h3>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-white-500 flex items-center justify-center">
              <Image
                src="/logos/KESBANG.png"
                alt="Organization Logo"
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">
                {beritaData.organization.name}
              </h4>
              <p className="text-sm text-gray-600">
                {beritaData.organization.type}
              </p>
              <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                <Mail className="w-3 h-3" />
                {beritaData.organization.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section1Berita;
