import { Suspense } from "react";
import type { Metadata } from "next";

import HalamanNilai from "@/components/HalamanNilai";
import { LoadingShell } from "@/components/dashboard/ui";

export const metadata: Metadata = {
  title: "Nilai Mahasiswa",
  description: "Dashboard kelengkapan data nilai mahasiswa Unpad.",
};

export default function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <main className="flex min-h-full flex-1 flex-col">
      <Suspense fallback={<LoadingShell />}>
        <HalamanNilai searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
