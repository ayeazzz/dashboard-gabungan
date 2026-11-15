import type { Metadata } from "next";
import { Inter } from "next/font/google";
import DashboardLayout from "@/components/site/DashboardLayout";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard SMUP & PMB",
  description: "Dashboard Keketatan SMUP dan Snapshot PMB Universitas Padjadjaran",
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
