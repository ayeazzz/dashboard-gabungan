import { FilterBar } from "@/components/dashboard/FilterBar";
import { BarList, GroupedBars, Legend } from "@/components/dashboard/charts";
import { DonutPanel } from "@/components/dashboard/DonutPanel";
import { KET_SMUP } from "@/lib/dashboard/keterangan";
import {
  KpiCard,
  PageHeader,
  Panel,
  PanelGrid,
  Section,
  cellTd,
  cellTh,
} from "@/components/dashboard/ui";
import { TableKeketatanProdi } from "@/components/dashboard/TableKeketatanProdi";
import { TableTrenHistoris } from "@/components/dashboard/TableTrenHistoris";
import { SERIES, dec, int, parseFilters, pct } from "@/lib/dashboard/format";
import { getFilterOptions, getSmupData } from "@/lib/dashboard/query";

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
      <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-4 sm:gap-6 min-w-0">
        <PageHeader
          title="Keketatan SMUP"
          note={`Snapshot data · tahun acuan ${k.tahunAcuan}`}
        />

        <FilterBar filters={filters} options={options} />

        {/* KPI Cards: Responsif tanpa bertumpuk */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2.5 sm:gap-3">
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
            className="sm:col-span-2 md:col-span-1"
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
              descriptions={KET_SMUP}
              parts={[
                { label: "Lulus", value: k.diterima, color: SERIES.s1 },
                { label: "Tidak Lulus", value: tidakLulus, color: SERIES.s3 },
              ]}
            />
            <DonutPanel
              title="Status Registrasi"
              note="Daftar ulang dari yang diterima"
              descriptions={KET_SMUP}
              parts={[
                { label: "Registrasi", value: k.registrasi, color: SERIES.s1 },
                { label: "Belum Registrasi", value: belumRegistrasi, color: SERIES.s3 },
              ]}
            />
            <Panel title="Distribusi per Jalur Masuk" note="Urutan tetap sesuai format laporan">
              <BarList items={data.jalur} />
            </Panel>
          </PanelGrid>
        </Section>

        <Section title="Distribusi per Fakultas">
          <Panel
            title="Pendaftar, Diterima, dan Registrasi per Fakultas"
            note={`${data.fakultas.length} fakultas berdata · diurutkan dari pendaftar terbanyak`}
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
              notes={data.fakultas.map(
                (f) =>
                  `Diterima ${pct(f.pendaftar > 0 ? f.diterima / f.pendaftar : null)} dari pendaftar · Registrasi ${pct(
                    f.diterima > 0 ? f.registrasi / f.diterima : null,
                  )} dari diterima`,
              )}
              series={[
                { label: "Pendaftar", values: data.fakultas.map((f) => f.pendaftar), color: SERIES.s3 },
                { label: "Diterima", values: data.fakultas.map((f) => f.diterima), color: SERIES.s1 },
                { label: "Registrasi", values: data.fakultas.map((f) => f.registrasi), color: SERIES.s2 },
              ]}
            />
          </Panel>
        </Section>

        <Section title="Program Studi Terfavorit & Keketatan Tertinggi">
          <div className="grid gap-3 xl:grid-cols-2 min-w-0">
            <Panel title="Top 10 Pendaftar Terbanyak" note="Akumulasi seluruh tahun pada filter aktif">
              <BarList
                items={data.topFavorit.map((p) => ({ label: p.prodi, value: p.pendaftar }))}
              />
            </Panel>
            <Panel title="Rasio Peminat terhadap Daya Tampung" note={`Top 10 · tahun acuan ${k.tahunAcuan}`}>
              <div className="relative max-h-[380px] overflow-auto border border-border/80 rounded-lg bg-surface shadow-inner scrollbar-thin">
                <table className="w-full border-collapse">
                  <thead className="sticky top-0 z-20 bg-surface-alt shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
                    <tr className="bg-surface-alt">
                      <th className={`${cellTh} text-left`}>No</th>
                      <th className={`${cellTh} text-left sticky left-0 top-0 z-30 bg-surface-alt shadow-[2px_0_4px_-2px_rgba(0,0,0,0.08)] min-w-[140px]`}>
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
                      <tr key={r.prodi} className="border-b border-border last:border-0 hover:bg-surface-alt/60">
                        <td className={cellTd}>{i + 1}</td>
                        <td className={`${cellTd} sticky left-0 z-10 bg-surface shadow-[2px_0_4px_-2px_rgba(0,0,0,0.08)] max-w-[180px] truncate`}>
                          {r.prodi}
                        </td>
                        <td className={`${cellTd} text-right`}>{int(r.pendaftarAcuan)}</td>
                        <td className={`${cellTd} text-right`}>{int(r.dayaTampung)}</td>
                        <td className={`${cellTd} text-right font-medium`}>{dec(r.rasio)}</td>
                        <td className={`${cellTd} text-right`}>{pct(r.keterisian)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Panel>
          </div>
        </Section>

        {/* Tabel Keketatan per Prodi (Frame Paten + Pagination) */}
        <Section title="Keketatan & Persaingan per Program Studi">
          <div className="rounded-panel bg-surface p-3.5 sm:p-5 shadow-card">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
              <p className="text-[11px] sm:text-xs text-ink-muted">
                Semua metrik dihitung dari database · pendaftar teks dikecualikan
              </p>
            </div>
            <TableKeketatanProdi data={data.prodi} />
          </div>
        </Section>

        {/* Tabel Tren Historis (Frame Paten + Pagination) */}
        <Section title="Tren Historis per Program Studi (Jenjang)">
          <div className="rounded-panel bg-surface p-3.5 sm:p-5 shadow-card">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
              <p className="text-[11px] sm:text-xs text-ink-muted">
                Keketatan = diterima / pendaftar · Registrasi = registrasi / diterima (termasuk baris tahun-teks)
              </p>
            </div>
            <TableTrenHistoris matrix={data.matrix} tahun={data.tahun} />
          </div>
        </Section>
      </div>
    </div>
  );
}
