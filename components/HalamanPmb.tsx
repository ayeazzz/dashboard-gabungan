import Link from "next/link";

import { FilterBar } from "@/components/dashboard/FilterBar";
import { DailyBars, DonutPanel, Legend, StackedBarList } from "@/components/dashboard/charts";
import { KpiCard, PageHeader, Panel, RowCount, Section, cellTd, cellTh, ScrollHint } from "@/components/dashboard/ui";
import { SERIES, dec, int, parseFilters, pct } from "@/lib/dashboard/format";
import { getFilterOptions, getPmbData } from "@/lib/dashboard/query";

const WARNA = { menunggu: "#9CA3AF", terverifikasi: SERIES.s1, ditolak: SERIES.s3 };

const tanggalPanjang = (tanggal: string | null) =>
  tanggal
    ? new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" }).format(
      new Date(`${tanggal}T00:00:00`),
    )
    : "-";

export default async function HalamanPmb({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const filters = parseFilters(await searchParams);
  const [options, data] = await Promise.all([getFilterOptions(), getPmbData(filters)]);

  const k = data.kpi;
  const totalBerstatus = k.menunggu + k.terverifikasi + k.ditolak;
  const chartRows = data.perProdi.slice(0, 30).map((r) => ({
    label: r.prodi,
    total: r.total,
    segments: [
      { value: r.menunggu, color: WARNA.menunggu },
      { value: r.terverifikasi, color: WARNA.terverifikasi },
      { value: r.ditolak, color: WARNA.ditolak },
    ],
  }));

  return (
    <div className="flex min-h-full flex-1 flex-col bg-surface-alt p-3 sm:p-6 lg:p-8">
      <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-4 sm:gap-6">
        <PageHeader
          title="Dashboard PMB"
          note={`Snapshot per ${tanggalPanjang(k.tanggalTerakhir)} · bukan siaran langsung`}
        />

        <FilterBar filters={filters} options={options} />

        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 xl:grid-cols-6">
          <KpiCard label="Pendaftar Hari Ini" value={int(k.hariIni)} note={`Tanggal ${tanggalPanjang(k.tanggalTerakhir)}`} />
          <KpiCard label="Rata-rata Harian" value={dec(k.rataHarian, 1)} note="30 hari kalender terakhir" />
          <KpiCard label="Terverifikasi" value={int(k.terverifikasi)} note={pct(totalBerstatus ? k.terverifikasi / totalBerstatus : null)} />
          <KpiCard label="Menunggu" value={int(k.menunggu)} note={pct(totalBerstatus ? k.menunggu / totalBerstatus : null)} />
          <KpiCard label="Ditolak" value={int(k.ditolak)} note={pct(totalBerstatus ? k.ditolak / totalBerstatus : null)} />
          <KpiCard label="Total Semua Pendaftar" value={int(k.totalPendaftar)} note="Baris tahun teks dikecualikan" />
        </div>

        <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr]">
          <Panel
            title="Tren Pendaftar Harian (30 hari terakhir)"
            note="Tanggal pendaftaran pada data dummy dibangkitkan acak, dihitung dari kolom tgl_daftar."
          >
            <DailyBars data={data.harian} avg={k.rataHarian} />
          </Panel>

          <DonutPanel
            title="Tracking Verifikasi Berkas"
            note={`${int(totalBerstatus)} baris berstatus`}
            parts={[
              { label: "Menunggu", value: k.menunggu, color: WARNA.menunggu },
              { label: "Terverifikasi", value: k.terverifikasi, color: WARNA.terverifikasi },
              { label: "Ditolak", value: k.ditolak, color: WARNA.ditolak },
            ]}
          />
        </div>

        <Section title="Status Verifikasi Berkas per Program Studi">
          <div className="rounded-panel bg-surface p-3.5 sm:p-5 shadow-card">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
              <p className="text-[11px] sm:text-xs text-ink-muted">
                Tiga kategori memakai awalan status: Terverifikasi*, Menunggu*, Ditolak* (total {int(totalBerstatus)} baris).
              </p>
              <ScrollHint />
            </div>

            <Legend
              className="mt-2"
              items={[
                { label: "Menunggu", color: WARNA.menunggu },
                { label: "Terverifikasi", color: WARNA.terverifikasi },
                { label: "Ditolak", color: WARNA.ditolak },
              ]}
            />

            <div className="mt-3">
              <StackedBarList rows={chartRows} labelWidth="10rem" />
            </div>

            <div className="mt-4 overflow-x-auto border-t border-border pt-3">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-surface-alt">
                    <th className={`${cellTh} text-left sticky left-0 z-20 bg-surface-alt shadow-[2px_0_4px_-2px_rgba(0,0,0,0.08)] min-w-[140px] sm:min-w-0`}>
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
                  {data.perProdi.map((r) => (
                    <tr key={r.prodi} className="border-b border-border last:border-0 hover:bg-surface-alt/50">
                      <td className={`${cellTd} text-left sticky left-0 z-10 bg-surface shadow-[2px_0_4px_-2px_rgba(0,0,0,0.08)] max-w-[150px] sm:max-w-none truncate`}>
                        {r.prodi}
                      </td>
                      <td className={`${cellTd} text-right`}>{int(r.menunggu)}</td>
                      <td className={`${cellTd} text-right`}>{int(r.terverifikasi)}</td>
                      <td className={`${cellTd} text-right`}>{int(r.ditolak)}</td>
                      <td className={`${cellTd} text-right`}>{int(r.total)}</td>
                      <td className={`${cellTd} text-right`}>{pct(r.total ? r.menunggu / r.total : null)}</td>
                      <td className={`${cellTd} text-right`}>{pct(r.total ? r.terverifikasi / r.total : null)}</td>
                      <td className={`${cellTd} text-right`}>{pct(r.total ? r.ditolak / r.total : null)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <RowCount shown={data.perProdi.length} />
          </div>
        </Section>
      </div>
    </div>
  );
}
