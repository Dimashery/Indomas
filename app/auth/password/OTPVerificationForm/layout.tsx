import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verifikasi OTP | BAKESBANGPOL Kota Batu",
  description:
    "Halaman verifikasi OTP untuk reset password - Website dari Badan Kesatuan Bangsa dan Politik (BAKESBANGPOL) Kota Batu untuk keperluan pendataan organisasi masyarakat",
  keywords: [
    "verifikasi OTP",
    "kode verifikasi",
    "reset password",
    "BAKESBANGPOL",
    "Kota Batu",
  ],
  robots: "noindex, nofollow",
};

export default function OTPVerificationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen">{children}</div>;
}
