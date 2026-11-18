// Server Component — tidak ada "use client".
// Semua kalkulasi sudah di SQL; komponen ini hanya merender hasilnya.
import { DonutPanel, GroupedBars, Legend } from "@/components/dashboard/charts";
import {
  KpiCard,
  PageHeader,
  Panel,
  ScrollHint,
  Section,
  cellTd,
  cellTh,
} from "@/components/dashboard/ui";
import { DONUT_COLORS, SEMUA, SERIES, int, pct } from "@/lib/dashboard/format";
import { getFilterOptionsNilai, getNilaiData } from "@/lib/dashboard/query-nilai";
import type { FiltersNilai } from "@/lib/dashboard/types-nilai";
import FilterBarNilai from "@/components/FilterBarNilai";

// Warna donut Kategori Nilai (kolom kategori_nilai: Reguler / Perbaikan / Alih Kredit)
const KATEGORI_COLORS: Record<string, string> = {
  Reguler: SERIES.s1,
  Perbaikan: SERIES.s3,
  "Alih Kredit": "#5B8DB8",
};

// ----- Helpers -----

function parseFiltersNilai(sp: Record<string, string | string[] | undefined>): FiltersNilai {
  const one = (v: string | string[] | undefined) => (typeof v === "string" ? v : "");
  return {
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
      <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-4 sm:gap-6">
        <PageHeader
          title="Nilai Mahasiswa"
          note="Kelengkapan Data Nilai · snapshot database"
        />

        <FilterBarNilai filters={filters} options={options} />

        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 xl:grid-cols-5">
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
            className="col-span-2 sm:col-span-1"
            label="Persentase Nilai Null"
            value={pct(k.pctNull, 2)}
            note={`${int(k.jumlahNull)} transaksi`}
          />
        </div>

        {/* Sebaran Nilai */}
        <Section title="Sebaran Nilai">
          <div className="grid gap-3 lg:grid-cols-[1.6fr_1fr]">
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
                groups={data.sebaranFakultas.map((r) => r.fakultas)}
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
              note={`${int(k.totalTransaksi)} transaksi`}
              parts={data.jenisNilai.map((r, i) => ({
                label: r.jenis,
                value: r.jumlah,
                color: DONUT_COLORS[i % DONUT_COLORS.length],
              }))}
            />
          </div>
        </Section>

        {/* Rincian & Kategori */}
        <Section title="Rincian & Kategori">
          <div className="grid gap-3 lg:grid-cols-[1.9fr_1fr]">
            {/* Table Summary per Prodi */}
            <Panel title="Table Summary" note="Kelengkapan nilai per fakultas dan program studi">
              <ScrollHint className="mb-2" />
              <div className="max-h-[440px] overflow-auto rounded-lg border border-border">
                <table className="w-full border-collapse">
                  <thead className="sticky top-0 z-30 bg-surface-alt">
                    <tr className="bg-surface-alt">
                      <th
                        className={`${cellTh} text-left sticky left-0 z-20 bg-surface-alt shadow-[2px_0_4px_-2px_rgba(0,0,0,0.08)] min-w-[140px]`}
                      >
                        Fakultas ▲
                      </th>
                      <th className={`${cellTh} text-left min-w-[160px]`}>Program Studi</th>
                      <th className={`${cellTh} min-w-[88px] text-right !whitespace-normal leading-tight`}>Jumlah Nilai Lengkap</th>
                      <th className={`${cellTh} min-w-[88px] text-right !whitespace-normal leading-tight`}>Jumlah Nilai Tidak Lengkap</th>
                      <th className={`${cellTh} min-w-[72px] text-right !whitespace-normal leading-tight`}>Nilai Null</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.prodiSummary.map((r, i) => (
                      <tr
                        key={`${r.fakultas}-${r.prodi}-${i}`}
                        className="border-b border-border last:border-0 hover:bg-surface-alt/50"
                      >
                        <td
                          className={`${cellTd} text-left sticky left-0 z-10 bg-surface shadow-[2px_0_4px_-2px_rgba(0,0,0,0.08)] min-w-[140px] max-w-[200px] !whitespace-normal leading-snug`}
                          title={r.fakultas}
                        >
                          {r.fakultas}
                        </td>
                        <td className={`${cellTd} text-left min-w-[160px] max-w-[260px] !whitespace-normal leading-snug`} title={r.prodi}>
                          {r.prodi}
                        </td>
                        <td className={`${cellTd} text-right`}>{int(r.jumlahLengkap)}</td>
                        <td className={`${cellTd} text-right`}>
                          {r.jumlahTidakLengkap > 0 ? int(r.jumlahTidakLengkap) : "-"}
                        </td>
                        <td className={`${cellTd} text-right`}>
                          {r.jumlahNull > 0 ? int(r.jumlahNull) : "-"}
                        </td>
                      </tr>
                    ))}
                    {/* Baris total */}
                    <tr className="sticky bottom-0 z-20 border-t-2 border-border bg-surface-alt font-bold">
                      <td
                        className={`${cellTh} text-left sticky left-0 z-10 bg-surface-alt shadow-[2px_0_4px_-2px_rgba(0,0,0,0.08)]`}
                      >
                        Total
                      </td>
                      <td className={cellTh}></td>
                      <td className={`${cellTh} text-right`}>{int(k.jumlahLengkap)}</td>
                      <td className={`${cellTh} text-right`}>{int(k.jumlahTidakLengkap)}</td>
                      <td className={`${cellTh} text-right`}>{int(k.jumlahNull)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-center text-xs text-ink-muted">
                Menampilkan {data.prodiSummary.length} program studi
              </p>
            </Panel>

            {/* Donut: Kategori Nilai */}
            <DonutPanel
              title="Kategori Nilai"
              note={`${int(k.totalTransaksi)} total transaksi`}
              stacked
              size={168}
              parts={data.kategoriNilai.map((r) => ({
                label: r.label,
                value: r.jumlah,
                color: KATEGORI_COLORS[r.label] ?? SERIES.s4,
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
