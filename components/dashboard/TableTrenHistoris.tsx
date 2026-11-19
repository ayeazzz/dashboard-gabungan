"use client";

import { useMemo, useState } from "react";
import { cellTd, cellTh } from "./ui";
import { pct } from "@/lib/dashboard/format";
import type { MatrixRow } from "@/lib/dashboard/types";
import { PaginationBottom, PaginationTop } from "./PaginationControls";

export function TableTrenHistoris({
  matrix,
  tahun,
}: {
  matrix: MatrixRow[];
  tahun: number[];
}) {
  const [pageSize, setPageSize] = useState<number | "all">(20);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return matrix;
    const q = search.toLowerCase();
    return matrix.filter((r) => r.prodi.toLowerCase().includes(q));
  }, [matrix, search]);

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
        totalRows={matrix.length}
        filteredCount={filtered.length}
        placeholder="Cari program studi..."
      />

      {/* Frame Paten: scroll vertikal dan horizontal di dalam kotak */}
      <div className="relative max-h-[460px] sm:max-h-[520px] overflow-auto border border-border/80 rounded-lg bg-surface shadow-inner scrollbar-thin">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 z-20 bg-surface-alt shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
            <tr>
              <th
                rowSpan={2}
                className={`${cellTh} bg-surface-alt align-middle text-left sticky left-0 top-0 z-30 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.08)] min-w-[180px] sm:min-w-[220px]`}
              >
                Program Studi (Jenjang)
              </th>
              <th
                colSpan={tahun.length + 1}
                className={`${cellTh} border-l border-border bg-primary-subtle text-center align-middle`}
              >
                Keketatan
                <span className="block text-[10px] font-normal leading-tight text-ink-muted">
                  % diterima dari pendaftar — makin kecil makin ketat
                </span>
              </th>
              <th
                colSpan={tahun.length + 1}
                className={`${cellTh} border-l border-border bg-primary-subtle text-center align-middle`}
              >
                Registrasi
                <span className="block text-[10px] font-normal leading-tight text-ink-muted">
                  % daftar ulang dari diterima
                </span>
              </th>
            </tr>
            <tr className="border-b border-border bg-surface-alt">
              {[...tahun, "Total", ...tahun, "Total"].map((t, i) => (
                <th
                  key={`${t}-${i}`}
                  className={`${cellTh} text-right ${i === tahun.length + 1 ? "border-l border-border" : ""} ${
                    i === tahun.length || i === (tahun.length + 1) * 2 - 1 ? "bg-primary-subtle font-bold" : ""
                  }`}
                >
                  {t}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayedRows.length === 0 ? (
              <tr>
                <td colSpan={tahun.length * 2 + 3} className="py-8 text-center text-xs text-ink-muted">
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
                  {[...r.keketatan, r.keketatanTotal].map((v, i) => (
                    <td
                      key={`k${i}`}
                      className={`${cellTd} text-right ${i === tahun.length ? "font-semibold bg-surface-alt/40" : ""}`}
                    >
                      {v === null ? "-" : pct(v)}
                    </td>
                  ))}
                  {[...r.registrasi, r.registrasiTotal].map((v, i) => (
                    <td
                      key={`r${i}`}
                      className={`${cellTd} text-right ${i === tahun.length ? "font-semibold bg-surface-alt/40" : ""} ${
                        i === 0 ? "border-l border-border" : ""
                      }`}
                    >
                      {v === null ? "-" : pct(v)}
                    </td>
                  ))}
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
