import { Suspense } from "react";
import type { Metadata } from "next";

import HalamanHerregistrasi from "@/components/HalamanHerregistrasi";
import { LoadingShell } from "@/components/dashboard/ui";

export const metadata: Metadata = {
  title: "Herregistrasi dan KRS",
  description: "Dashboard herregistrasi dan pengisian KRS mahasiswa aktif Universitas Padjadjaran.",
};

export default function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <main className="flex min-h-full flex-1 flex-col">
      <Suspense fallback={<LoadingShell />}>
        <HalamanHerregistrasi searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
