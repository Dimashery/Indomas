import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password Berhasil - BAKESBANGPOL",
  description:
    "Password berhasil direset - Sistem Pendataan Organisasi Masyarakat",
};

export default function ResetSuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="antialiased">{children}</div>;
}
