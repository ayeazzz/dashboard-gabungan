"use client";

import { usePathname, useRouter } from "next/navigation";

import { SEMUA, toQuery } from "@/lib/dashboard/format";
import type { FilterOptions, Filters } from "@/lib/dashboard/types";

const selectCls = "w-full rounded-lg border border-border bg-surface-alt px-2 py-1.5 text-sm text-ink";

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

  const fields = [
    { key: "jenjang", label: "JENJANG", options: options.jenjang },
    { key: "jalur", label: "JALUR MASUK", options: options.jalur },
    { key: "fakultas", label: "FAKULTAS", options: options.fakultas },
    { key: "prodi", label: "PRODI (JENJANG)", options: options.prodi },
    { key: "tahun", label: "TAHUN MASUK", options: options.tahun.map(String) },
  ] as const;

  return (
    <div className="rounded-card bg-surface p-4 shadow-card">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {fields.map((f) => (
          <label key={f.key} className="block">
            <span className="mb-1 block text-xs font-bold text-ink-muted">{f.label}</span>
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
        <label className="block">
          <span className="mb-1 block text-xs font-bold text-ink-muted">MODE DATA</span>
          <select value={filters.mode} onChange={(e) => change("mode", e.target.value)} className={selectCls}>
            <option value="apa-adanya">Apa adanya</option>
            <option value="dedup">Dedup</option>
          </select>
        </label>
      </div>
      <p className="mt-3 text-xs text-ink-muted">
        Filter tersimpan di URL sehingga bisa dibagikan. Mode Dedup menghitung satu baris per nomor
        pendaftaran ganda.
      </p>
    </div>
  );
}
