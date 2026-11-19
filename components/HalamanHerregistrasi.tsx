import { BarList, GroupedBars, Legend } from "@/components/dashboard/charts";
import { DonutPanel } from "@/components/dashboard/DonutPanel";
import { KET_HERREG } from "@/lib/dashboard/keterangan";
import { KpiCard, PageHeader, Panel, PanelGrid, Section } from "@/components/dashboard/ui";
import { TableHerregistrasiProdi } from "@/components/dashboard/TableHerregistrasiProdi";
import { SERIES, int, pct } from "@/lib/dashboard/format";
import { getFilterOptionsHerregistrasi, getHerregistrasiData } from "@/lib/dashboard/query-herregistrasi";
import type { FiltersHerregistrasi } from "@/lib/dashboard/types-herregistrasi";
import FilterBarHerregistrasi from "./FilterBarHerregistrasi";

// ─── Filter Parser ────────────────────────────────────────────────────────────

function parseFiltersHerregistrasi(
  sp: Record<string, string | string[] | undefined>,
): FiltersHerregistrasi {
  const one = (v: string | string[] | undefined) => (typeof v === "string" ? v : "");
  return {
    jenjang: one(sp.jenjang),
    fakultas: one(sp.fakultas),
    prodi: one(sp.prodi),
    statusHerregistrasi: one(sp.statusHerregistrasi),
    statusKrs: one(sp.statusKrs),
  };
}

// ─── Warna per jenis herregistrasi ───────────────────────────────────────────

const JENIS_COLOR: Record<string, string> = {
  "Bayar Mandiri":    SERIES.s1,
  "Beasiswa":         SERIES.s3,
  "Cuti":             SERIES.s4,
  "Rp. 0 Pembebasan": "#9CA3AF",
  "Penangguhan":      "#6B7280",
};

// ─── Page Component ───────────────────────────────────────────────────────────

export default async function HalamanHerregistrasi({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const filters = parseFiltersHerregistrasi(await searchParams);
  const [options, data] = await Promise.all([
    getFilterOptionsHerregistrasi(),
    getHerregistrasiData(filters),
  ]);

  const { kpi } = data;

  // Status Herregistrasi untuk donut
  const statusHParts = data.statusHerregistrasi.map((r) => ({
    label: r.label,
    value: r.jumlah,
    color: r.label === "Herregistrasi" ? SERIES.s1 : SERIES.s3,
  }));

  // Jenis Herregistrasi untuk donut
  const jenisHParts = data.jenisHerregistrasi.map((r) => ({
    label: r.label,
    value: r.jumlah,
    color: JENIS_COLOR[r.label] ?? SERIES.s2,
  }));

  // Status KRS untuk BarList
  const krsItems = data.statusKrs.map((r) => ({
    label: r.label,
    value: r.jumlah,
    color: r.label === "KRS" ? SERIES.s1 : SERIES.s3,
  }));

  // Distribusi per Fakultas – abbreviated label untuk chart
  const distribusiFak = data.distribusiFakultas;
  const fakLabels = distribusiFak.map((r) =>
    r.fakultas.replace(/^\d+\s*-\s*/, ""),
  );

  return (
    <div className="flex min-h-full flex-1 flex-col bg-surface-alt p-3 sm:p-6 lg:p-8">
      <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-4 sm:gap-6 min-w-0">
        <PageHeader
          title="Herregistrasi dan KRS"
          note="Data herregistrasi dan KRS semester aktif"
        />

        <FilterBarHerregistrasi filters={filters} options={options} />

        {/* KPI Cards: Responsif tanpa bertumpuk */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3">
          <KpiCard
            label="Jumlah Mahasiswa"
            value={int(kpi.jumlahMahasiswa)}
            note="Mahasiswa herregistrasi (selain mahasiswa baru)"
          />
          <KpiCard
            label="Persentase Herregistrasi"
            value={pct(kpi.pctHerregistrasi)}
            note={`${int(kpi.jumlahHerregistrasi)} dari ${int(kpi.jumlahMahasiswa)} mahasiswa memiliki status herregistrasi`}
          />
          <KpiCard
            className="sm:col-span-2 md:col-span-1"
            label="Persentase KRS"
            value={pct(kpi.pctKrs)}
            note="Dihitung dari mahasiswa herregistrasi selain status Cuti"
          />
        </div>

        {/* Ringkasan & Status: 3 kolom (2 donut + 1 bar vertical) */}
        <Section title="Ringkasan & Status">
          <PanelGrid cols={3}>
            {/* Donut: Status Herregistrasi */}
            <DonutPanel
              title="Status Herregistrasi"
              descriptions={KET_HERREG}
              note="Herregistrasi vs tidak herregistrasi"
              parts={statusHParts}
            />

            {/* Donut: Jenis Herregistrasi */}
            <DonutPanel
              title="Jenis Herregistrasi"
              descriptions={KET_HERREG}
              note="Bayar Mandiri, Beasiswa, Cuti, Rp. 0 Pembebasan, Penangguhan"
              parts={jenisHParts}
            />

            {/* Status KRS */}
            <Panel
              title="Status KRS"
              note="KRS vs tidak KRS"
            >
              <div className="mt-2">
                <BarList items={krsItems} />
              </div>
            </Panel>
          </PanelGrid>
        </Section>

        {/* Distribusi per Fakultas: GroupedBars */}
        <Section title="Distribusi per Fakultas">
          <Panel
            title="Jumlah Mahasiswa, Herregistrasi dan KRS berdasarkan Fakultas"
            note="Perbandingan antarfakultas; mengikuti filter Fakultas"
            aside={
              <Legend
                items={[
                  { label: "Jumlah Mahasiswa", color: SERIES.s3 },
                  { label: "Herregistrasi",    color: SERIES.s1 },
                  { label: "KRS",              color: SERIES.s2 },
                ]}
              />
            }
          >
            <GroupedBars
              groups={fakLabels}
              series={[
                { label: "Jumlah Mahasiswa", values: distribusiFak.map((r) => r.jumlahMahasiswa), color: SERIES.s3 },
                { label: "Herregistrasi",    values: distribusiFak.map((r) => r.herregistrasi),   color: SERIES.s1 },
                { label: "KRS",              values: distribusiFak.map((r) => r.krs),              color: SERIES.s2 },
              ]}
            />
          </Panel>
        </Section>

        {/* Table Summary (Frame Paten + Pagination) */}
        <Section title="Table Summary">
          <div className="rounded-panel bg-surface p-3.5 sm:p-5 shadow-card">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
              <p className="text-[11px] sm:text-xs text-ink-muted">
                Persentase Herregistrasi dan KRS per Program Studi dan Jenjang
              </p>
            </div>

            <TableHerregistrasiProdi
              data={data.prodiSummary}
              totalPctHerregistrasi={data.pctHerregistrasiTotal}
              totalPctKrs={data.pctKrsTotal}
            />
          </div>
        </Section>
      </div>
    </div>
  );
}

