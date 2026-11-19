"use client";

import { useMemo, useState } from "react";
import { cellTd, cellTh } from "./ui";
import { int } from "@/lib/dashboard/format";
import type { ProdiSummaryNilaiRow } from "@/lib/dashboard/types-nilai";
import { PaginationBottom, PaginationTop } from "./PaginationControls";

export function TableNilaiProdi({
  data,
  totalLengkap,
  totalTidakLengkap,
  totalNull,
}: {
  data: ProdiSummaryNilaiRow[];
  totalLengkap: number;
  totalTidakLengkap: number;
  totalNull: number;
}) {
  const [pageSize, setPageSize] = useState<number | "all">(20);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return data;
    const q = search.toLowerCase();
    return data.filter(
      (r) => r.prodi.toLowerCase().includes(q) || r.fakultas.toLowerCase().includes(q),
    );
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
        placeholder="Cari program studi atau fakultas..."
      />

      {/* Frame Paten: scroll vertikal dan horizontal di dalam kotak */}
      <div className="relative max-h-[460px] sm:max-h-[520px] overflow-auto border border-border/80 rounded-lg bg-surface shadow-inner scrollbar-thin">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 z-20 bg-surface-alt shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
            <tr className="bg-surface-alt">
              <th
                className={`${cellTh} text-left sticky left-0 top-0 z-30 bg-surface-alt shadow-[2px_0_4px_-2px_rgba(0,0,0,0.08)] min-w-[140px] sm:min-w-[170px]`}
              >
                Fakultas
              </th>
              <th className={`${cellTh} text-left min-w-[160px] sm:min-w-[200px]`}>
                Program Studi
              </th>
              <th className={`${cellTh} text-right min-w-[120px]`}>Jumlah Nilai Lengkap</th>
              <th className={`${cellTh} text-right min-w-[130px]`}>Jumlah Tidak Lengkap</th>
              <th className={`${cellTh} text-right min-w-[90px]`}>Nilai Null</th>
            </tr>
          </thead>
          <tbody>
            {displayedRows.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-xs text-ink-muted">
                  Tidak ada program studi yang cocok dengan pencarian.
                </td>
              </tr>
            ) : (
              displayedRows.map((r, i) => (
                <tr
                  key={`${r.fakultas}-${r.prodi}-${i}`}
                  className="border-b border-border last:border-0 hover:bg-surface-alt/60 transition-colors"
                >
                  <td
                    className={`${cellTd} text-left sticky left-0 z-10 bg-surface shadow-[2px_0_4px_-2px_rgba(0,0,0,0.08)] min-w-[150px] max-w-[220px] !whitespace-normal leading-snug`}
                    title={r.fakultas}
                  >
                    {r.fakultas}
                  </td>
                  <td
                    className={`${cellTd} text-left min-w-[180px] max-w-[280px] !whitespace-normal leading-snug`}
                    title={r.prodi}
                  >
                    {r.prodi}
                  </td>
                  <td className={`${cellTd} text-right font-medium`}>
                    {int(r.jumlahLengkap)}
                  </td>
                  <td className={`${cellTd} text-right`}>
                    {r.jumlahTidakLengkap > 0 ? int(r.jumlahTidakLengkap) : "-"}
                  </td>
                  <td className={`${cellTd} text-right`}>
                    {r.jumlahNull > 0 ? int(r.jumlahNull) : "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot className="sticky bottom-0 z-20 bg-surface-alt/95 backdrop-blur-xs shadow-[0_-2px_4px_-1px_rgba(0,0,0,0.08)] font-bold">
            <tr className="border-t-2 border-border bg-surface-alt font-bold">
              <td
                className={`${cellTh} text-left sticky left-0 z-30 bg-surface-alt shadow-[2px_0_4px_-2px_rgba(0,0,0,0.08)]`}
              >
                Total
              </td>
              <td className={`${cellTh} text-left text-ink-muted`}>Semua Program Studi</td>
              <td className={`${cellTh} text-right text-ink`}>{int(totalLengkap)}</td>
              <td className={`${cellTh} text-right text-ink`}>{int(totalTidakLengkap)}</td>
              <td className={`${cellTh} text-right text-ink`}>{int(totalNull)}</td>
            </tr>
          </tfoot>
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
