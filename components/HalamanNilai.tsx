// Server Component — tidak ada "use client".
// Semua kalkulasi sudah di SQL; komponen ini hanya merender hasilnya.
import { GroupedBars, Legend } from "@/components/dashboard/charts";
import { DonutPanel } from "@/components/dashboard/DonutPanel";
import { KET_JENIS_NILAI, KET_KATEGORI_NILAI, KET_STATUS_NILAI } from "@/lib/dashboard/keterangan";
import {
  KpiCard,
  PageHeader,
  Panel,
  Section,
} from "@/components/dashboard/ui";
import { TableNilaiProdi } from "@/components/dashboard/TableNilaiProdi";
import { COLOR_JENIS_NILAI, COLOR_KATEGORI_NILAI, DONUT_COLORS, SEMUA, SERIES, int, pct } from "@/lib/dashboard/format";
import { getFilterOptionsNilai, getNilaiData } from "@/lib/dashboard/query-nilai";
import type { FiltersNilai } from "@/lib/dashboard/types-nilai";
import FilterBarNilai from "@/components/FilterBarNilai";

// ----- Helpers -----

function parseFiltersNilai(sp: Record<string, string | string[] | undefined>): FiltersNilai {
  const one = (v: string | string[] | undefined) => (typeof v === "string" ? v : "");
  return {
    jenjang: one(sp.jenjang),
    fakultas: one(sp.fakultas),
    prodi: one(sp.prodi),
    kategoriNilai: one(sp.kategoriNilai),
    jenisNilai: one(sp.jenisNilai),
  };
}

// ----- Halaman Utama -----
export default async function HalamanNilai({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const filters = parseFiltersNilai(await searchParams);
  const [options, data] = await Promise.all([getFilterOptionsNilai(), getNilaiData(filters)]);

  const k = data.kpi;

  // Warna untuk sebaran status nilai
  const W = {
    lengkap: SERIES.s1,       // kuning
    tidakLengkap: SERIES.s3,  // oranye
    null: "#9CA3AF",          // abu-abu
  };


  return (
    <div className="flex min-h-full flex-1 flex-col bg-surface-alt p-3 sm:p-6 lg:p-8">
      <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-4 sm:gap-6 min-w-0">
        <PageHeader
          title="Nilai Mahasiswa"
          note="Kelengkapan Data Nilai · snapshot database"
        />

        <FilterBarNilai filters={filters} options={options} />

        {/* KPI Cards: Responsif tanpa bertumpuk */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2.5 sm:gap-3">
          <KpiCard
            label="Transaksi Mata Kuliah"
            value={int(k.totalTransaksi)}
            note="Akumulasi transaksi input nilai"
          />
          <KpiCard
            label="Program Studi"
            value={int(k.jumlahProdi)}
            note="Terdata pada sistem"
          />
          <KpiCard
            label="Persentase Nilai Lengkap"
            value={pct(k.pctLengkap, 2)}
            note={`${int(k.jumlahLengkap)} transaksi`}
          />
          <KpiCard
            label="Persentase Nilai Tidak Lengkap"
            value={pct(k.pctTidakLengkap, 2)}
            note={`${int(k.jumlahTidakLengkap)} transaksi`}
          />
          <KpiCard
            className="sm:col-span-2 md:col-span-1"
            label="Persentase Nilai Null"
            value={pct(k.pctNull, 2)}
            note={`${int(k.jumlahNull)} transaksi`}
          />
        </div>

        {/* Sebaran Nilai */}
        <Section title="Sebaran Nilai">
          <div className="grid gap-3 xl:grid-cols-[1.6fr_1fr] min-w-0">
            {/* Grouped bar: Sebaran Status Nilai per Fakultas */}
            <Panel
              title="Sebaran Status Nilai per Fakultas"
              note={`${data.sebaranFakultas.length} fakultas berdata`}
              aside={
                <Legend
                  items={[
                    { label: "Lengkap", color: W.lengkap },
                    { label: "Tidak Lengkap", color: W.tidakLengkap },
                    { label: "Null", color: W.null },
                  ]}
                />
              }
            >
              <GroupedBars
                groups={data.sebaranFakultas.map((r) => r.fakultas.replace(/^\d+\s*-\s*/, ""))}
                series={[
                  {
                    label: "Lengkap",
                    values: data.sebaranFakultas.map((r) => r.lengkap),
                    color: W.lengkap,
                  },
                  {
                    label: "Tidak Lengkap",
                    values: data.sebaranFakultas.map((r) => r.tidakLengkap),
                    color: W.tidakLengkap,
                  },
                  {
                    label: "Null",
                    values: data.sebaranFakultas.map((r) => r.nilaiNull),
                    color: W.null,
                  },
                ]}
                height={180}
              />
            </Panel>

            {/* Donut: Jenis Nilai */}
            <DonutPanel
              title="Jenis Nilai"
              note={`${int(k.totalTransaksi)} transaksi · arahkan kursor untuk penjelasan`}
              descriptions={KET_JENIS_NILAI}
              parts={data.jenisNilai.map((r, i) => ({
                label: r.jenis,
                value: r.jumlah,
                color: COLOR_JENIS_NILAI[r.jenis] ?? DONUT_COLORS[i % DONUT_COLORS.length],
              }))}
            />
          </div>
        </Section>

        {/* Rincian & Kategori */}
        <Section title="Rincian & Kategori">
          <div className="grid gap-3 xl:grid-cols-[1.6fr_1fr] min-w-0">
            {/* Table Summary per Prodi (Frame Paten + Pagination) */}
            <div className="flex flex-col rounded-panel bg-surface p-3.5 sm:p-5 shadow-card min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                <h3 className="text-xs sm:text-sm font-bold text-ink">Table Summary</h3>
              </div>

              <TableNilaiProdi
                data={data.prodiSummary}
                totalLengkap={k.jumlahLengkap}
                totalTidakLengkap={k.jumlahTidakLengkap}
                totalNull={k.jumlahNull}
              />
            </div>

            {/* Donut: Kategori Nilai */}
            <DonutPanel
              title="Kategori Nilai"
              note={`${int(k.totalTransaksi)} total transaksi · arahkan kursor untuk penjelasan`}
              descriptions={{ ...KET_KATEGORI_NILAI, ...KET_STATUS_NILAI }}
              stacked
              size={168}
              parts={data.kategoriNilai.map((r) => ({
                label: r.label,
                value: r.jumlah,
                color: COLOR_KATEGORI_NILAI[r.label] ?? SERIES.s4,
              }))}
            />
          </div>
        </Section>

        {/* Footer info filter */}
        <p className="text-[11px] sm:text-xs text-ink-muted">
          Filter aktif: fakultas {filters.fakultas || SEMUA}, prodi {filters.prodi || SEMUA},
          kategori {filters.kategoriNilai || SEMUA}, jenis {filters.jenisNilai || SEMUA}.
        </p>
      </div>
    </div>
  );
}
