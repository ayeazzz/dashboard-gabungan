"use client";

import { usePathname, useRouter } from "next/navigation";
import { SEMUA } from "@/lib/dashboard/format";
import type { FiltersHerregistrasi, FilterOptionsHerregistrasi } from "@/lib/dashboard/types-herregistrasi";

const selectCls =
  "w-full rounded-lg border border-border bg-surface-alt px-2.5 py-2 text-xs sm:text-sm text-ink focus:outline-none focus:ring-1 focus:ring-primary";

function toQueryHerregistrasi(f: FiltersHerregistrasi): string {
  const q = new URLSearchParams();
  if (f.fakultas) q.set("fakultas", f.fakultas);
  if (f.statusHerregistrasi) q.set("statusHerregistrasi", f.statusHerregistrasi);
  if (f.statusKrs) q.set("statusKrs", f.statusKrs);
  const s = q.toString();
  return s ? `?${s}` : "";
}

export default function FilterBarHerregistrasi({
  filters,
  options,
}: {
  filters: FiltersHerregistrasi;
  options: FilterOptionsHerregistrasi;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const change = (key: keyof FiltersHerregistrasi, value: string) => {
    const next: FiltersHerregistrasi = { ...filters, [key]: value };
    router.replace(pathname + toQueryHerregistrasi(next), { scroll: false });
  };

  const resetAll = () => {
    router.replace(pathname, { scroll: false });
  };

  const hasActiveFilters = Boolean(
    filters.fakultas || filters.statusHerregistrasi || filters.statusKrs,
  );

  const STATUS_HERREGISTRASI = ["Herregistrasi", "Tidak Herregistrasi"];
  const STATUS_KRS = ["KRS", "Tidak KRS"];

  return (
    <div className="rounded-card bg-surface p-3.5 sm:p-4 shadow-card">
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3">
        {/* Fakultas */}
        <label className="block col-span-2 md:col-span-1">
          <span className="mb-1 block text-[11px] font-bold text-ink-muted">FAKULTAS</span>
          <select
            value={filters.fakultas}
            onChange={(e) => change("fakultas", e.target.value)}
            className={selectCls}
          >
            <option value="">{SEMUA}</option>
            {options.fakultas.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </label>

        {/* Status Herregistrasi */}
        <label className="block">
          <span className="mb-1 block text-[11px] font-bold text-ink-muted">STATUS HERREGISTRASI</span>
          <select
            value={filters.statusHerregistrasi}
            onChange={(e) => change("statusHerregistrasi", e.target.value)}
            className={selectCls}
          >
            <option value="">{SEMUA}</option>
            {STATUS_HERREGISTRASI.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </label>

        {/* Status KRS */}
        <label className="block">
          <span className="mb-1 block text-[11px] font-bold text-ink-muted">STATUS KRS</span>
          <select
            value={filters.statusKrs}
            onChange={(e) => change("statusKrs", e.target.value)}
            className={selectCls}
          >
            <option value="">{SEMUA}</option>
            {STATUS_KRS.map((o) => (
              <option key={o} value={o}>{o}</option>
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
