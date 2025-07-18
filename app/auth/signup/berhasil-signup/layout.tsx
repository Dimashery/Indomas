import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Berhasil Signup - BAKESBANGPOL",
  description:
    "Akun berhasil dibuat - Website dari Badan Kesatuan Bangsa dan Politik (BAKESBANGPOL)",
};

export default function BerhasilSignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="antialiased">{children}</div>;
}
