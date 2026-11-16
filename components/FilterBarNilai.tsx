"use client";

import { usePathname, useRouter } from "next/navigation";
import { SEMUA } from "@/lib/dashboard/format";
import type { FiltersNilai, FilterOptionsNilai } from "@/lib/dashboard/types-nilai";

const selectCls =
  "w-full rounded-lg border border-border bg-surface-alt px-2.5 py-2 text-xs sm:text-sm text-ink focus:outline-none focus:ring-1 focus:ring-primary";

function toQueryNilai(f: FiltersNilai): string {
  const q = new URLSearchParams();
  if (f.fakultas) q.set("fakultas", f.fakultas);
  if (f.prodi) q.set("prodi", f.prodi);
  if (f.kategoriNilai) q.set("kategoriNilai", f.kategoriNilai);
  if (f.jenisNilai) q.set("jenisNilai", f.jenisNilai);
  const s = q.toString();
  return s ? `?${s}` : "";
}

export default function FilterBarNilai({
  filters,
  options,
}: {
  filters: FiltersNilai;
  options: FilterOptionsNilai;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const change = (key: keyof FiltersNilai, value: string) => {
    const next: FiltersNilai = { ...filters, [key]: value };
    router.replace(pathname + toQueryNilai(next), { scroll: false });
  };

  const resetAll = () => {
    router.replace(pathname, { scroll: false });
  };

  const hasActiveFilters = Boolean(
    filters.fakultas || filters.prodi || filters.kategoriNilai || filters.jenisNilai,
  );

  const KATEGORI_NILAI = ["Reguler", "Perbaikan", "Alih Kredit"];
  const JENIS_NILAI = ["A", "A-", "B+", "B", "B-", "C+", "C", "D", "E", "K", "Null"];

  return (
    <div className="rounded-card bg-surface p-3.5 sm:p-4 shadow-card">
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-4">
        {/* Fakultas */}
        <label className="block">
          <span className="mb-1 block text-[11px] font-bold text-ink-muted">FAKULTAS</span>
          <select
            value={filters.fakultas}
            onChange={(e) => change("fakultas", e.target.value)}
            className={selectCls}
          >
            <option value="">{SEMUA}</option>
            {options.fakultas.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </label>

        {/* Program Studi */}
        <label className="block">
          <span className="mb-1 block text-[11px] font-bold text-ink-muted">PROGRAM STUDI</span>
          <select
            value={filters.prodi}
            onChange={(e) => change("prodi", e.target.value)}
            className={selectCls}
          >
            <option value="">{SEMUA}</option>
            {options.prodi.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </label>

        {/* Kategori Nilai */}
        <label className="block">
          <span className="mb-1 block text-[11px] font-bold text-ink-muted">KATEGORI NILAI</span>
          <select
            value={filters.kategoriNilai}
            onChange={(e) => change("kategoriNilai", e.target.value)}
            className={selectCls}
          >
            <option value="">{SEMUA}</option>
            {KATEGORI_NILAI.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </label>

        {/* Jenis Nilai */}
        <label className="block">
          <span className="mb-1 block text-[11px] font-bold text-ink-muted">JENIS NILAI</span>
          <select
            value={filters.jenisNilai}
            onChange={(e) => change("jenisNilai", e.target.value)}
            className={selectCls}
          >
            <option value="">{SEMUA}</option>
            {JENIS_NILAI.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-2.5 text-xs text-ink-muted">
        <p className="text-[11px] leading-tight text-ink-muted">
          Filter tersimpan di URL sehingga dapat dibagikan.
        </p>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={resetAll}
            className="rounded-md border border-primary/40 bg-primary-subtle px-2 py-1 text-[11px] font-semibold text-ink hover:bg-primary transition-colors"
          >
            ↺ Reset Semua Filter
          </button>
        )}
      </div>
    </div>
  );
}
