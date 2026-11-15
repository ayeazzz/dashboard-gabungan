import Link from "next/link";

import { FilterBar } from "@/components/dashboard/FilterBar";
import { BarList, Donut, GroupedBars, Legend } from "@/components/dashboard/charts";
import { KpiCard, PageHeader, Panel, PanelGrid, RowCount, Section, cellTd, cellTh } from "@/components/dashboard/ui";
import { SEMUA, SERIES, dec, int, parseFilters, pct } from "@/lib/dashboard/format";
import { getFilterOptions, getSmupData } from "@/lib/dashboard/query";
import type { Filters } from "@/lib/dashboard/types";

export default async function HalamanSmup({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const filters = parseFilters(await searchParams);
  const [options, data] = await Promise.all([getFilterOptions(), getSmupData(filters)]);

  const k = data.kpi;
  const tidakLulus = Math.max(k.pendaftar - k.diterima, 0);
  const belumRegistrasi = Math.max(k.diterima - k.registrasi, 0);

  return (
    <div className="flex min-h-full flex-1 flex-col bg-surface-alt p-3 sm:p-6 lg:p-8">
      <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-4 sm:gap-6">
        <PageHeader
          title="Keketatan SMUP"
          note={`Snapshot data · tahun acuan ${k.tahunAcuan}`}
        />

        <FilterBar filters={filters} options={options} />

        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 xl:grid-cols-5">
          <KpiCard
            label="Jumlah Pendaftar"
            value={int(k.pendaftar)}
            note="Baris dengan tahun teks dikecualikan"
          />
          <KpiCard
            label="Jumlah Diterima"
            value={int(k.diterima)}
            note={`Lulus seleksi: ${pct(k.keketatanGabungan)} dari pendaftar`}
          />
          <KpiCard
            label="Jumlah Registrasi"
            value={int(k.registrasi)}
            note={`Daftar ulang: ${pct(k.pctRegistrasi)} dari diterima`}
          />
          <KpiCard
            label="Total Daya Tampung"
            value={int(k.dayaTampung)}
            note={`Tahun acuan ${k.tahunAcuan} · ${int(k.prodiScope)} prodi`}
          />
          <KpiCard
            className="col-span-2 sm:col-span-1"
            label="Rata-rata Keketatan"
            value={pct(k.rataKeketatan)}
            note={`Rata-rata per prodi berdata · ${int(k.prodiBerdata)} prodi`}
          />
        </div>

        <p className="-mt-1 sm:-mt-3 text-[11px] sm:text-xs text-ink-muted">
          Catatan: {int(k.duplikat)} pendaftar tercatat ganda (lulus dan tidak lulus) karena perubahan status.
        </p>

        <Section title="Ringkasan & Status">
          <PanelGrid cols={3}>
            <DonutPanel
              title="Status Kelulusan"
              note="Diterima vs tidak diterima"
              parts={[
                { label: "Lulus", value: k.diterima, color: SERIES.s1 },
                { label: "Tidak Lulus", value: tidakLulus, color: SERIES.s3 },
              ]}
            />
            <DonutPanel
              title="Status Registrasi"
              note="Daftar ulang dari yang diterima"
              parts={[
                { label: "Registrasi", value: k.registrasi, color: SERIES.s1 },
                { label: "Belum Registrasi", value: belumRegistrasi, color: SERIES.s2 },
              ]}
            />
            <Panel title="Distribusi Jalur Masuk (Pendaftar)" note="Seluruh jalur masuk">
              <BarList items={data.jalur} showValue labelWidth="7rem" />
            </Panel>
          </PanelGrid>
        </Section>

        <Section title="Perbandingan per Fakultas">
          <Panel
            title="Pendaftar, Diterima, dan Registrasi per Fakultas"
            note={`${data.fakultas.length} fakultas berdata · urut pendaftar terbanyak`}
            aside={
              <Legend
                items={[
                  { label: "Pendaftar", color: SERIES.s3 },
                  { label: "Diterima", color: SERIES.s1 },
                  { label: "Registrasi", color: SERIES.s2 },
                ]}
              />
            }
          >
            <GroupedBars
              groups={data.fakultas.map((f) => f.label)}
              series={[
                { label: "Pendaftar", values: data.fakultas.map((f) => f.pendaftar), color: SERIES.s3 },
                { label: "Diterima", values: data.fakultas.map((f) => f.diterima), color: SERIES.s1 },
                { label: "Registrasi", values: data.fakultas.map((f) => f.registrasi), color: SERIES.s2 },
              ]}
            />
          </Panel>
        </Section>

        <Section title="Peringkat dan Rasio Peminat">
          <div className="grid gap-3 lg:grid-cols-[400px_1fr]">
            <Panel title="Peringkat Prodi Terfavorit" note="Top 10 menurut jumlah pendaftar">
              <BarList
                items={data.topFavorit.map((p) => ({ label: p.prodi, value: p.pendaftar }))}
                labelWidth="10rem"
                showValue
              />
            </Panel>
            <Panel title="Rasio Peminat terhadap Daya Tampung" note={`Top 10 · tahun acuan ${k.tahunAcuan}`}>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-surface-alt">
                      <th className={`${cellTh} text-left`}>No</th>
                      <th className={`${cellTh} text-left sticky left-0 z-20 bg-surface-alt shadow-[2px_0_4px_-2px_rgba(0,0,0,0.08)]`}>
                        Prodi (Jenjang)
                      </th>
                      <th className={`${cellTh} text-right`}>Pendaftar</th>
                      <th className={`${cellTh} text-right`}>Daya tampung</th>
                      <th className={`${cellTh} text-right`}>Rasio</th>
                      <th className={`${cellTh} text-right`}>Keterisian</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.topRasio.map((r, i) => (
                      <tr key={r.prodi} className="border-b border-border last:border-0">
                        <td className={cellTd}>{i + 1}</td>
                        <td className={`${cellTd} sticky left-0 z-10 bg-surface shadow-[2px_0_4px_-2px_rgba(0,0,0,0.08)] max-w-[150px] sm:max-w-none truncate`}>
                          {r.prodi}
                        </td>
                        <td className={`${cellTd} text-right`}>{int(r.pendaftarAcuan)}</td>
                        <td className={`${cellTd} text-right`}>{int(r.dayaTampung)}</td>
                        <td className={`${cellTd} text-right`}>{dec(r.rasio, 2)}</td>
                        <td className={`${cellTd} text-right`}>{dec(r.keterisian, 2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Panel>
          </div>
        </Section>

        <Section title="Keketatan & Persaingan per Program Studi">
          <div className="rounded-panel bg-surface p-3.5 sm:p-5 shadow-card">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
              <p className="text-[11px] sm:text-xs text-ink-muted">
                Pendaftar, diterima, dan registrasi di tabel ini memakai seluruh baris (termasuk tahun
                teks) mengikuti tabel Calc_Prodi di workbook.
              </p>
              <p className="text-[10px] sm:text-[11px] text-ink-muted md:hidden">
                ← Geser tabel ke samping →
              </p>
            </div>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-surface-alt">
                    <th className={`${cellTh} text-left sticky left-0 z-20 bg-surface-alt shadow-[2px_0_4px_-2px_rgba(0,0,0,0.08)] min-w-[140px] sm:min-w-0`}>
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
                  {data.prodi.map((r) => (
                    <tr key={r.prodi} className="border-b border-border last:border-0 hover:bg-surface-alt/50">
                      <td className={`${cellTd} sticky left-0 z-10 bg-surface shadow-[2px_0_4px_-2px_rgba(0,0,0,0.08)] max-w-[150px] sm:max-w-none truncate`}>
                        {r.prodi}
                      </td>
                      <td className={`${cellTd} text-right`}>{int(r.pendaftar)}</td>
                      <td className={`${cellTd} text-right`}>{int(r.diterima)}</td>
                      <td className={`${cellTd} text-right`}>{int(r.dayaTampung)}</td>
                      <td className={`${cellTd} text-right`}>{pct(r.keketatan)}</td>
                      <td className={`${cellTd} text-right`}>{r.persaingan === null ? "-" : `${dec(r.persaingan, 1)} : 1`}</td>
                      <td className={`${cellTd} text-right`}>{dec(r.rasio, 2)}</td>
                      <td className={`${cellTd} text-right`}>{r.peringkat === null ? "-" : int(r.peringkat)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <RowCount shown={data.prodi.length} />
          </div>
        </Section>

        <Section title="Tren Historis per Program Studi (Jenjang)">
          <div className="rounded-panel bg-surface p-3.5 sm:p-5 shadow-card">
            <div className="flex justify-between items-center mb-2 md:hidden">
              <span className="text-[10px] text-ink-muted">Tabel Historis Multi-Tahun</span>
              <span className="text-[10px] text-ink-muted">← Geser tabel ke samping →</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th rowSpan={2} className={`${cellTh} bg-surface-alt align-middle text-left sticky left-0 z-20 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.08)] min-w-[140px] sm:min-w-0`}>
                      Program Studi (Jenjang)
                    </th>
                    <th
                      colSpan={7}
                      className={`${cellTh} border-l border-border bg-primary-subtle text-center align-middle`}
                    >
                      Keketatan
                      <span className="block text-[10px] font-normal leading-tight text-ink-muted">
                        % diterima dari pendaftar — makin kecil makin ketat
                      </span>
                    </th>
                    <th
                      colSpan={7}
                      className={`${cellTh} border-l border-border bg-primary-subtle text-center align-middle`}
                    >
                      Registrasi
                      <span className="block text-[10px] font-normal leading-tight text-ink-muted">
                        % daftar ulang dari diterima
                      </span>
                    </th>
                  </tr>
                  <tr className="border-b border-border bg-surface-alt">
                    {[...data.tahun, "Total", ...data.tahun, "Total"].map((t, i) => (
                      <th
                        key={`${t}-${i}`}
                        className={`${cellTh} text-right ${i === 7 ? "border-l border-border" : ""} ${
                          i === 6 || i === 13 ? "bg-primary-subtle" : ""
                        }`}
                      >
                        {t}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.matrix.map((r) => (
                    <tr key={r.prodi} className="border-b border-border last:border-0 hover:bg-surface-alt/50">
                      <td className={`${cellTd} text-left sticky left-0 z-10 bg-surface shadow-[2px_0_4px_-2px_rgba(0,0,0,0.08)] max-w-[150px] sm:max-w-none truncate`}>
                        {r.prodi}
                      </td>
                      {[...r.keketatan, r.keketatanTotal].map((v, i) => (
                        <td key={`k${i}`} className={`${cellTd} text-right ${i === 6 ? "font-semibold" : ""}`}>
                          {v === null ? "-" : pct(v)}
                        </td>
                      ))}
                      {[...r.registrasi, r.registrasiTotal].map((v, i) => (
                        <td
                          key={`r${i}`}
                          className={`${cellTd} text-right ${i === 6 ? "font-semibold" : ""} ${
                            i === 0 ? "border-l border-border" : ""
                          }`}
                        >
                          {v === null ? "-" : pct(v)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <RowCount shown={data.matrix.length} />
          </div>
        </Section>

        <p className="text-[11px] sm:text-xs text-ink-muted">
          Filter aktif: jenjang {filters.jenjang || SEMUA}, jalur {filters.jalur || SEMUA}, fakultas{" "}
          {filters.fakultas || SEMUA}, prodi {filters.prodi || SEMUA}, tahun {filters.tahun ?? SEMUA}.
        </p>
      </div>
    </div>
  );
}

function DonutPanel({
  title,
  note,
  parts,
}: {
  title: string;
  note?: string;
  parts: { label: string; value: number; color: string }[];
}) {
  const total = parts.reduce((a, p) => a + p.value, 0);
  return (
    <Panel title={title} note={note}>
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:gap-4">
        <Donut parts={parts} size={96} />
        <ul className="w-full space-y-1.5 sm:w-auto">
          {parts.map((p) => (
            <li key={p.label} className="flex items-center justify-between sm:justify-start gap-2 text-xs text-ink">
              <span className="flex items-center gap-2">
                <i className="size-2 shrink-0 rounded-[2px]" style={{ background: p.color }} />
                {p.label}
              </span>
              <span className="tabular-nums text-ink-muted">
                {int(p.value)} ({pct(total ? p.value / total : null)})
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Panel>
  );
}
