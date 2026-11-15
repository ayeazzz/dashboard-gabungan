"use client";

import { usePathname, useRouter } from "next/navigation";

import { SEMUA, toQuery } from "@/lib/dashboard/format";
import type { FilterOptions, Filters } from "@/lib/dashboard/types";

const selectCls =
  "w-full rounded-lg border border-border bg-surface-alt px-2.5 py-2 text-xs sm:text-sm text-ink focus:outline-none focus:ring-1 focus:ring-primary";

export function FilterBar({ filters, options }: { filters: Filters; options: FilterOptions }) {
  const router = useRouter();
  const pathname = usePathname();

  const change = (key: keyof Filters, value: string) => {
    const next: Filters = { ...filters };
    if (key === "tahun") next.tahun = value ? Number(value) : null;
    else if (key === "mode") next.mode = value === "dedup" ? "dedup" : "apa-adanya";
    else next[key] = value;

    router.replace(pathname + toQuery(next), { scroll: false });
  };

  const resetAll = () => {
    router.replace(pathname, { scroll: false });
  };

  const hasActiveFilters = Boolean(
    filters.jenjang ||
      filters.jalur ||
      filters.fakultas ||
      filters.prodi ||
      filters.tahun ||
      filters.mode === "dedup",
  );

  const fields = [
    { key: "jenjang", label: "JENJANG", options: options.jenjang, colSpan: "col-span-1" },
    { key: "jalur", label: "JALUR MASUK", options: options.jalur, colSpan: "col-span-1" },
    { key: "fakultas", label: "FAKULTAS", options: options.fakultas, colSpan: "col-span-1" },
    { key: "prodi", label: "PRODI (JENJANG)", options: options.prodi, colSpan: "col-span-2 md:col-span-1" },
    { key: "tahun", label: "TAHUN MASUK", options: options.tahun.map(String), colSpan: "col-span-1" },
  ] as const;

  return (
    <div className="rounded-card bg-surface p-3.5 sm:p-4 shadow-card">
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 xl:grid-cols-6">
        {fields.map((f) => (
          <label key={f.key} className={`block ${f.colSpan}`}>
            <span className="mb-1 block text-[11px] font-bold text-ink-muted">{f.label}</span>
            <select
              value={f.key === "tahun" ? (filters.tahun ?? "") : filters[f.key]}
              onChange={(e) => change(f.key, e.target.value)}
              className={selectCls}
            >
              <option value="">{SEMUA}</option>
              {f.options.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </label>
        ))}
        <label className="col-span-1 block">
          <span className="mb-1 block text-[11px] font-bold text-ink-muted">MODE DATA</span>
          <select value={filters.mode} onChange={(e) => change("mode", e.target.value)} className={selectCls}>
            <option value="apa-adanya">Apa adanya</option>
            <option value="dedup">Dedup</option>
          </select>
        </label>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-2.5 text-xs text-ink-muted">
        <p className="text-[11px] leading-tight text-ink-muted">
          Filter tersimpan di URL sehingga bisa dibagikan. Mode Dedup membuang nomor pendaftaran ganda.
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
