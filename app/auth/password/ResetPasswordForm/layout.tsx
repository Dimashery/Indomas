import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password | BAKESBANGPOL",
  description: "Reset password untuk sistem pendataan organisasi masyarakat",
};

export default function ResetPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
