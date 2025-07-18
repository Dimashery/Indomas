import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verifikasi Email | BAKESBANGPOL Kota Batu",
  description:
    "Halaman verifikasi email untuk reset password - Website dari Badan Kesatuan Bangsa dan Politik (BAKESBANGPOL) Kota Batu untuk keperluan pendataan organisasi masyarakat",
  keywords: [
    "verifikasi email",
    "reset password",
    "BAKESBANGPOL",
    "Kota Batu",
    "lupa password",
  ],
  robots: "noindex, nofollow",
};

export default function EmailVerificationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen">{children}</div>;
}
