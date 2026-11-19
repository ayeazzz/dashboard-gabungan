import type { Metadata } from "next";
import { Inter } from "next/font/google";
import DashboardLayout from "@/components/site/DashboardLayout";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portal Analitik Akademik - Unpad",
  description: "Dashboard Keketatan SMUP dan PMB Universitas Padjadjaran",
  icons: {
    icon: "/Unpad_logo-secondary_only-P.png",
    shortcut: "/Unpad_logo-secondary_only-P.png",
    apple: "/Unpad_logo-secondary_only-P.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-surface-alt font-sans">
        <DashboardLayout>{children}</DashboardLayout>
      </body>
    </html>
  );
}
