import { Suspense } from "react";
import type { Metadata } from "next";

import HalamanSmup from "@/components/HalamanSmup";
import { LoadingShell } from "@/components/dashboard/ui";

export const metadata: Metadata = {
  title: "Keketatan SMUP",
  description: "Dashboard keketatan seleksi masuk Unpad, dihitung dari database.",
};

export default function Page({ searchParams }: PageProps<"/">) {
  return (
    <main className="flex min-h-full flex-1 flex-col">
      <Suspense fallback={<LoadingShell />}>
        <HalamanSmup searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
