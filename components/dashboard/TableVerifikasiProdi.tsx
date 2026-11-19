"use client";

import { useMemo, useState } from "react";
import { cellTd, cellTh } from "./ui";
import { int, pct } from "@/lib/dashboard/format";
import type { VerifikasiRow } from "@/lib/dashboard/types";
import { PaginationBottom, PaginationTop } from "./PaginationControls";

export function TableVerifikasiProdi({ data }: { data: VerifikasiRow[] }) {
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

      {/* Frame Paten: scroll vertikal dan horizontal di dalam kotak */}
      <div className="relative max-h-[460px] sm:max-h-[520px] overflow-auto border border-border/80 rounded-lg bg-surface shadow-inner scrollbar-thin">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 z-20 bg-surface-alt shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
            <tr className="bg-surface-alt">
              <th
                className={`${cellTh} text-left sticky left-0 top-0 z-30 bg-surface-alt shadow-[2px_0_4px_-2px_rgba(0,0,0,0.08)] min-w-[180px] sm:min-w-[220px]`}
              >
                Program Studi (Jenjang)
              </th>
              <th className={`${cellTh} text-right`}>Menunggu</th>
              <th className={`${cellTh} text-right`}>Terverifikasi</th>
              <th className={`${cellTh} text-right`}>Ditolak</th>
              <th className={`${cellTh} text-right`}>Total Berstatus</th>
              <th className={`${cellTh} text-right`}>% Menunggu</th>
              <th className={`${cellTh} text-right`}>% Terverifikasi</th>
              <th className={`${cellTh} text-right`}>% Ditolak</th>
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
                    className={`${cellTd} text-left sticky left-0 z-10 bg-surface shadow-[2px_0_4px_-2px_rgba(0,0,0,0.08)] max-w-[200px] sm:max-w-[260px] truncate`}
                    title={r.prodi}
                  >
                    {r.prodi}
                  </td>
                  <td className={`${cellTd} text-right`}>{int(r.menunggu)}</td>
                  <td className={`${cellTd} text-right`}>{int(r.terverifikasi)}</td>
                  <td className={`${cellTd} text-right`}>{int(r.ditolak)}</td>
                  <td className={`${cellTd} text-right font-medium`}>{int(r.total)}</td>
                  <td className={`${cellTd} text-right`}>
                    {pct(r.total ? r.menunggu / r.total : null)}
                  </td>
                  <td className={`${cellTd} text-right`}>
                    {pct(r.total ? r.terverifikasi / r.total : null)}
                  </td>
                  <td className={`${cellTd} text-right`}>
                    {pct(r.total ? r.ditolak / r.total : null)}
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
