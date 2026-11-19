import { FilterBar } from "@/components/dashboard/FilterBar";
import { DailyBars, Legend, StackedBarList } from "@/components/dashboard/charts";
import { DonutPanel } from "@/components/dashboard/DonutPanel";
import { KET_PMB } from "@/lib/dashboard/keterangan";
import { KpiCard, PageHeader, Panel, Section } from "@/components/dashboard/ui";
import { TableVerifikasiProdi } from "@/components/dashboard/TableVerifikasiProdi";
import { SERIES, dec, int, parseFilters, pct } from "@/lib/dashboard/format";
import { getFilterOptions, getPmbData } from "@/lib/dashboard/query";

const WARNA = { menunggu: SERIES.s2, terverifikasi: SERIES.s1, ditolak: SERIES.s3 };

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
      { label: "Menunggu", value: r.menunggu, color: WARNA.menunggu },
      { label: "Terverifikasi", value: r.terverifikasi, color: WARNA.terverifikasi },
      { label: "Ditolak", value: r.ditolak, color: WARNA.ditolak },
    ],
  }));

  return (
    <div className="flex min-h-full flex-1 flex-col bg-surface-alt p-3 sm:p-6 lg:p-8">
      <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-4 sm:gap-6 min-w-0">
        <PageHeader
          title="PMB"
          note={`Snapshot per ${tanggalPanjang(k.tanggalTerakhir)} · bukan siaran langsung`}
        />

        <FilterBar filters={filters} options={options} />

        {/* KPI Cards: Responsif tanpa bertumpuk */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-2.5 sm:gap-3">
          <KpiCard
            label="Pendaftar Hari Ini"
            value={int(k.hariIni)}
            note="Tanggal snapshot data terakhir"
          />
          <KpiCard
            label="Rata-rata Harian"
            value={dec(k.rataHarian, 1)}
            note="Tren pendaftaran 30 hari"
          />
          <KpiCard
            label="Terverifikasi"
            value={int(k.terverifikasi)}
            note={`${pct(totalBerstatus ? k.terverifikasi / totalBerstatus : null)} dari berstatus`}
          />
          <KpiCard
            label="Menunggu"
            value={int(k.menunggu)}
            note={`${pct(totalBerstatus ? k.menunggu / totalBerstatus : null)} dari berstatus`}
          />
          <KpiCard
            label="Ditolak"
            value={int(k.ditolak)}
            note={`${pct(totalBerstatus ? k.ditolak / totalBerstatus : null)} dari berstatus`}
          />
          <KpiCard
            className="sm:col-span-2 md:col-span-1"
            label="Total Pendaftar"
            value={int(k.totalPendaftar)}
            note="Akumulasi seluruh pendaftaran"
          />
        </div>

        <div className="grid gap-3 xl:grid-cols-3 min-w-0">
          <Panel
            className="lg:col-span-2"
            title="Tren Pendaftaran 30 Hari Terakhir"
            note="Rata-rata garis putus-putus"
          >
            <DailyBars data={data.harian} avg={k.rataHarian} />
          </Panel>

          <DonutPanel
            title="Tracking Verifikasi Berkas"
            note={`${int(totalBerstatus)} baris berstatus`}
            descriptions={KET_PMB}
            parts={[
              { label: "Menunggu", value: k.menunggu, color: WARNA.menunggu },
              { label: "Terverifikasi", value: k.terverifikasi, color: WARNA.terverifikasi },
              { label: "Ditolak", value: k.ditolak, color: WARNA.ditolak },
            ]}
          />
        </div>

        {/* Tabel Verifikasi (Frame Paten + Pagination) */}
        <Section title="Status Verifikasi Berkas per Program Studi">
          <div className="rounded-panel bg-surface p-3.5 sm:p-5 shadow-card">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
              <p className="text-[11px] sm:text-xs text-ink-muted">
                Tiga kategori memakai awalan status: Terverifikasi*, Menunggu*, Ditolak* (total {int(totalBerstatus)} baris).
              </p>
            </div>

            <Legend
              className="mb-3"
              items={[
                { label: "Menunggu", color: WARNA.menunggu },
                { label: "Terverifikasi", color: WARNA.terverifikasi },
                { label: "Ditolak", color: WARNA.ditolak },
              ]}
            />

            <TableVerifikasiProdi data={data.perProdi} />
          </div>
        </Section>

        {/* Stacked Bar List: 30 prodi volume terbanyak */}
        <Section title="Komposisi Verifikasi — 30 Program Studi Terbanyak">
          <Panel
            title="Komposisi Verifikasi Berkas"
            note="30 program studi dengan volume pendaftar terbesar"
            aside={
              <Legend
                items={[
                  { label: "Menunggu", color: WARNA.menunggu },
                  { label: "Terverifikasi", color: WARNA.terverifikasi },
                  { label: "Ditolak", color: WARNA.ditolak },
                ]}
              />
            }
          >
            <StackedBarList rows={chartRows} />
          </Panel>
        </Section>
      </div>
    </div>
  );
}
