import { Suspense } from "react";
import type { Metadata } from "next";

import HalamanPmb from "@/components/HalamanPmb";
import { LoadingShell } from "@/components/dashboard/ui";

export const metadata: Metadata = {
  title: "PMB",
  description: "Snapshot penerimaan mahasiswa baru beserta status verifikasi berkas.",
};

export default function Page({ searchParams }: PageProps<"/pmb">) {
  return (
    <main className="flex min-h-full flex-1 flex-col">
      <Suspense fallback={<LoadingShell />}>
        <HalamanPmb searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
