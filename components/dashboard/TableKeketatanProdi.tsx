"use client";

import { useMemo, useState } from "react";
import { cellTd, cellTh } from "./ui";
import { dec, int, pct } from "@/lib/dashboard/format";
import type { ProdiRow } from "@/lib/dashboard/types";
import { PaginationBottom, PaginationTop } from "./PaginationControls";

export function TableKeketatanProdi({ data }: { data: ProdiRow[] }) {
  const [pageSize, setPageSize] = useState<number | "all">(20);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return data;
    const q = search.toLowerCase();
    return data.filter((r) => r.prodi.toLowerCase().includes(q));
  }, [data, search]);

  const totalPages = pageSize === "all" ? 1 : Math.ceil(filtered.length / pageSize) || 1;
  const currentPage = Math.min(page, totalPages);

  const displayedRows = useMemo(() => {
    if (pageSize === "all") return filtered;
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage, pageSize]);

  const startIdx = pageSize === "all" ? 0 : (currentPage - 1) * pageSize;
  const endIdx = pageSize === "all" ? filtered.length : startIdx + displayedRows.length;

  return (
    <div>
      <PaginationTop
        pageSize={pageSize}
        onPageSizeChange={(sz) => {
          setPageSize(sz);
          setPage(1);
        }}
        searchQuery={search}
        onSearchChange={(q) => {
          setSearch(q);
          setPage(1);
        }}
        startIdx={startIdx}
        endIdx={endIdx}
        totalRows={data.length}
        filteredCount={filtered.length}
        placeholder="Cari program studi..."
      />

      {/* Frame Paten: scroll vertikal dan horizontal di dalam kotak, tidak mengikuti scroll halaman */}
      <div className="relative max-h-[460px] sm:max-h-[520px] overflow-auto border border-border/80 rounded-lg bg-surface shadow-inner scrollbar-thin">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 z-20 bg-surface-alt shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
            <tr className="bg-surface-alt">
              <th
                className={`${cellTh} text-left sticky left-0 top-0 z-30 bg-surface-alt shadow-[2px_0_4px_-2px_rgba(0,0,0,0.08)] min-w-[180px] sm:min-w-[220px]`}
              >
                Program Studi (Jenjang)
              </th>
              <th className={`${cellTh} text-right`}>Pendaftar</th>
              <th className={`${cellTh} text-right`}>Diterima</th>
              <th className={`${cellTh} text-right`}>Daya Tampung</th>
              <th className={`${cellTh} text-right`}>
                Keketatan
                <span className="block text-[10px] font-normal text-ink-muted">(% Diterima)</span>
              </th>
              <th className={`${cellTh} text-right`}>
                Persaingan
                <span className="block text-[10px] font-normal text-ink-muted">(Pendaftar : 1)</span>
              </th>
              <th className={`${cellTh} text-right`}>
                Rasio Peminat :
                <span className="block text-[10px] font-normal text-ink-muted">Daya Tampung</span>
              </th>
              <th className={`${cellTh} text-right`}>
                Peringkat
                <span className="block text-[10px] font-normal text-ink-muted">(1 = terketat)</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedRows.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-xs text-ink-muted">
                  Tidak ada program studi yang cocok dengan pencarian.
                </td>
              </tr>
            ) : (
              displayedRows.map((r) => (
                <tr
                  key={r.prodi}
                  className="border-b border-border last:border-0 hover:bg-surface-alt/60 transition-colors"
                >
                  <td
                    className={`${cellTd} sticky left-0 z-10 bg-surface shadow-[2px_0_4px_-2px_rgba(0,0,0,0.08)] max-w-[200px] sm:max-w-[260px] truncate`}
                    title={r.prodi}
                  >
                    {r.prodi}
                  </td>
                  <td className={`${cellTd} text-right`}>{int(r.pendaftar)}</td>
                  <td className={`${cellTd} text-right`}>{int(r.diterima)}</td>
                  <td className={`${cellTd} text-right`}>{int(r.dayaTampung)}</td>
                  <td className={`${cellTd} text-right`}>{pct(r.keketatan)}</td>
                  <td className={`${cellTd} text-right`}>
                    {r.persaingan === null ? "-" : `${dec(r.persaingan, 1)} : 1`}
                  </td>
                  <td className={`${cellTd} text-right`}>{dec(r.rasio, 2)}</td>
                  <td className={`${cellTd} text-right font-medium`}>
                    {r.peringkat === null ? "-" : int(r.peringkat)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <PaginationBottom
        page={currentPage}
        totalPages={totalPages}
        onPageChange={(p) => setPage(p)}
      />
    </div>
  );
}
