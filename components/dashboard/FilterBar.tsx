"use client";

import { usePathname, useRouter } from "next/navigation";

import { SEMUA, toQuery } from "@/lib/dashboard/format";
import type { FilterOptions, Filters } from "@/lib/dashboard/types";

const selectCls =
  "w-full rounded-lg border border-border bg-surface-alt px-2.5 py-2 text-xs sm:text-sm text-ink focus:outline-none focus:ring-1 focus:ring-primary";

export function FilterBar({ filters, options }: { filters: Filters; options: FilterOptions }) {
  const router = useRouter();
  const pathname = usePathname();

  // Opsi dropdown dinamis berdasarkan pilihan Jenjang dan Fakultas saat ini
  const jalurOptions = filters.jenjang
    ? (options.jalurByJenjang?.[filters.jenjang] ?? options.jalur)
    : options.jalur;

  const fakultasOptions = filters.jenjang
    ? (options.fakultasByJenjang?.[filters.jenjang] ?? options.fakultas)
    : options.fakultas;

  let prodiOptions = options.prodi;
  if (filters.jenjang && options.prodiByJenjang?.[filters.jenjang]) {
    prodiOptions = options.prodiByJenjang[filters.jenjang];
  }
  if (filters.fakultas && options.prodiByFakultas?.[filters.fakultas]) {
    const fakSet = new Set(options.prodiByFakultas[filters.fakultas]);
    prodiOptions = prodiOptions.filter((p) => fakSet.has(p));
  }

  const change = (key: keyof Filters, value: string) => {
    const next: Filters = { ...filters };
    if (key === "tahun") {
      next.tahun = value ? Number(value) : null;
    } else {
      next[key] = value as never;
    }

    // Pembersihan berjenjang (cascading auto-reset) jika nilai induk berubah
    if (key === "jenjang") {
      if (value) {
        const validJalurs = options.jalurByJenjang?.[value];
        if (validJalurs && next.jalur && !validJalurs.includes(next.jalur)) {
          next.jalur = "";
        }
        const validFaks = options.fakultasByJenjang?.[value];
        if (validFaks && next.fakultas && !validFaks.includes(next.fakultas)) {
          next.fakultas = "";
        }
        const validProdis = options.prodiByJenjang?.[value];
        if (validProdis && next.prodi && !validProdis.includes(next.prodi)) {
          next.prodi = "";
        }
      }
    } else if (key === "fakultas") {
      if (value) {
        const validProdis = options.prodiByFakultas?.[value];
        if (validProdis && next.prodi && !validProdis.includes(next.prodi)) {
          next.prodi = "";
        }
      }
    }

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
      filters.tahun,
  );

  const fields = [
    { key: "jenjang", label: "JENJANG", options: options.jenjang, colSpan: "col-span-1" },
    { key: "jalur", label: "JALUR MASUK", options: jalurOptions, colSpan: "col-span-1" },
    { key: "fakultas", label: "FAKULTAS", options: fakultasOptions, colSpan: "col-span-1" },
    { key: "prodi", label: "PRODI (JENJANG)", options: prodiOptions, colSpan: "col-span-2 md:col-span-1" },
    { key: "tahun", label: "TAHUN MASUK", options: options.tahun.map(String), colSpan: "col-span-1" },
  ] as const;

  return (
    <div className="rounded-card bg-surface p-3.5 sm:p-4 shadow-card min-w-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2.5 sm:gap-3">
        {fields.map((f) => (
          <label key={f.key} className={`block min-w-0 ${f.colSpan}`}>
            <span className="mb-1 block text-[11px] font-bold text-ink-muted truncate" title={f.label}>
              {f.label}
            </span>
            <select
              value={f.key === "tahun" ? (filters.tahun ?? "") : (filters[f.key] || "")}
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
