import Link from "next/link";

import { FilterBar } from "@/components/dashboard/FilterBar";
import { DailyBars, Donut, Legend, StackedBarList } from "@/components/dashboard/charts";
import { KpiCard, PageHeader, Panel, RowCount, Section, cellTd, cellTh } from "@/components/dashboard/ui";
import { DANGER, SERIES, dec, int, parseFilters, pct } from "@/lib/dashboard/format";
import { getFilterOptions, getPmbData } from "@/lib/dashboard/query";

const WARNA = { menunggu: SERIES.s2, terverifikasi: SERIES.s1, ditolak: DANGER };

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
    <div className="flex min-h-full flex-1 flex-col bg-surface-alt p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-6">
        <PageHeader
          title="Dashboard PMB"
          action={
            <Link
              href="/"
              className="inline-block rounded-lg border border-border bg-surface px-4 py-1.5 text-xs font-bold text-ink transition-colors hover:bg-primary-subtle"
            >
              ← Kembali ke Keketatan SMUP
            </Link>
          }
          note={`Snapshot per ${tanggalPanjang(k.tanggalTerakhir)} · bukan siaran langsung`}
        />

        <FilterBar filters={filters} options={options} />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          <KpiCard label="Pendaftar Hari Ini" value={int(k.hariIni)} note={`Tanggal ${tanggalPanjang(k.tanggalTerakhir)}`} />
          <KpiCard label="Rata-rata Harian" value={dec(k.rataHarian, 1)} note="30 hari kalender terakhir" />
          <KpiCard label="Terverifikasi" value={int(k.terverifikasi)} note={pct(totalBerstatus ? k.terverifikasi / totalBerstatus : null)} />
          <KpiCard label="Menunggu" value={int(k.menunggu)} note={pct(totalBerstatus ? k.menunggu / totalBerstatus : null)} />
          <KpiCard label="Ditolak" value={int(k.ditolak)} note={pct(totalBerstatus ? k.ditolak / totalBerstatus : null)} />
          <KpiCard label="Total Semua Pendaftar" value={int(k.totalPendaftar)} note="Baris dengan tahun teks dikecualikan" />
        </div>

        <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr]">
          <Panel
            title="Tren Pendaftar Harian (30 hari terakhir)"
            note="Tanggal pendaftaran pada data dummy dibangkitkan acak, jadi tinggi batang tidak bisa sama persis dengan workbook. Angka dihitung dari kolom tgl_daftar."
          >
            <DailyBars data={data.harian} avg={k.rataHarian} />
          </Panel>

          <Panel title="Tracking Verifikasi Berkas" note={`${int(totalBerstatus)} baris berstatus`}>
            <div className="flex flex-wrap items-center gap-4">
              <Donut
                parts={[
                  { value: k.menunggu, color: WARNA.menunggu },
                  { value: k.terverifikasi, color: WARNA.terverifikasi },
                  { value: k.ditolak, color: WARNA.ditolak },
                ]}
                size={104}
                thickness={22}
              />
              <ul className="space-y-1.5">
                {[
                  { label: "Menunggu", value: k.menunggu, color: WARNA.menunggu },
                  { label: "Terverifikasi", value: k.terverifikasi, color: WARNA.terverifikasi },
                  { label: "Ditolak", value: k.ditolak, color: WARNA.ditolak },
                ].map((s) => (
                  <li key={s.label} className="flex items-center gap-2 text-xs text-ink">
                    <i className="size-2 shrink-0 rounded-[2px]" style={{ background: s.color }} />
                    {s.label}
                    <span className="tabular-nums text-ink-muted">
                      {int(s.value)} ({pct(totalBerstatus ? s.value / totalBerstatus : null)})
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Panel>
        </div>

        <Section title="Status Verifikasi Berkas per Program Studi">
          <div className="rounded-panel bg-surface p-4 shadow-card">
            <p className="text-xs text-ink-muted">
              Tiga kategori memakai pencocokan awalan status: Terverifikasi*, Menunggu*, Ditolak*. 675
              baris berstatus lain (Dalam Verifikasi / Belum Diverifikasi) tidak dihitung, dan bagian ini
              mencakup seluruh baris termasuk 3.783 baris tahun-teks — karena itu totalnya 43.157, bukan
              40.049.
            </p>

            <Legend
              className="mt-3"
              items={[
                { label: "Menunggu", color: WARNA.menunggu },
                { label: "Terverifikasi", color: WARNA.terverifikasi },
                { label: "Ditolak", color: WARNA.ditolak },
              ]}
            />

            <div className="mt-3">
              <StackedBarList rows={chartRows} labelWidth="14rem" />
            </div>

            <div className="mt-4 overflow-x-auto border-t border-border pt-4">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-surface-alt">
                    <th className={`${cellTh} text-left`}>Program Studi (Jenjang)</th>
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
                    <tr key={r.prodi} className="border-b border-border last:border-0">
                      <td className={`${cellTd} text-left`}>{r.prodi}</td>
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
