import { BarList, Donut, GroupedBars, Legend } from "@/components/dashboard/charts";
import { KpiCard, PageHeader, Panel, PanelGrid, RowCount, Section, cellTd, cellTh } from "@/components/dashboard/ui";
import { SEMUA, SERIES, int, pct } from "@/lib/dashboard/format";
import { getFilterOptionsHerregistrasi, getHerregistrasiData } from "@/lib/dashboard/query-herregistrasi";
import type { FiltersHerregistrasi } from "@/lib/dashboard/types-herregistrasi";
import FilterBarHerregistrasi from "./FilterBarHerregistrasi";

// ─── Filter Parser ────────────────────────────────────────────────────────────

function parseFiltersHerregistrasi(
  sp: Record<string, string | string[] | undefined>,
): FiltersHerregistrasi {
  const one = (v: string | string[] | undefined) => (typeof v === "string" ? v : "");
  return {
    fakultas: one(sp.fakultas),
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
    // Potong prefix nomor fakultas, mis. "13 - Kedokteran" → "Kedokteran"
    r.fakultas.replace(/^\d+\s*-\s*/, ""),
  );

  return (
    <div className="flex min-h-full flex-1 flex-col bg-surface-alt p-3 sm:p-6 lg:p-8">
      <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-4 sm:gap-6">
        <PageHeader
          title="Herregistrasi dan KRS"
          note="Snapshot data mahasiswa aktif · semester berjalan"
        />

        {/* Filter */}
        <FilterBarHerregistrasi filters={filters} options={options} />

        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3">
          <KpiCard
            label="Jumlah Mahasiswa"
            value={int(kpi.jumlahMahasiswa)}
            note="Mahasiswa terdaftar aktif (selain mahasiswa baru)"
          />
          <KpiCard
            label="Persentase Herregistrasi"
            value={pct(kpi.pctHerregistrasi)}
            note={`${int(kpi.jumlahHerregistrasi)} dari ${int(kpi.jumlahMahasiswa)} mahasiswa`}
          />
          <KpiCard
            className="col-span-2 sm:col-span-1"
            label="Persentase KRS"
            value={pct(kpi.pctKrs)}
            note="Dihitung dari mahasiswa herregistrasi selain status Cuti"
          />
        </div>

        {/* Ringkasan & Status */}
        <Section title="Ringkasan &amp; Status">
          <PanelGrid cols={3}>
            {/* Status Herregistrasi – donut */}
            <DonutPanel
              title="Status Herregistrasi"
              note="Herregistrasi vs Tidak Herregistrasi"
              parts={statusHParts}
            />

            {/* Jenis Herregistrasi – donut */}
            <DonutPanel
              title="Jenis Herregistrasi"
              note="Rincian jenis pembayaran mahasiswa herregistrasi"
              parts={jenisHParts}
            />

            {/* Status KRS – bar */}
            <Panel title="Status KRS" note="KRS vs Tidak KRS">
              <BarList items={krsItems} showValue labelWidth="6rem" />
            </Panel>
          </PanelGrid>
        </Section>

        {/* Distribusi per Fakultas */}
        <Section title="Distribusi per Fakultas">
          <Panel
            title="Jumlah Mahasiswa, Herregistrasi, dan KRS per Fakultas"
            note={`${distribusiFak.length} fakultas berdata · urut jumlah mahasiswa terbanyak`}
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

        {/* Table Summary */}
        <Section title="Table Summary">
          <div className="rounded-panel bg-surface p-3.5 sm:p-5 shadow-card">
            <div className="flex justify-end mb-2 md:hidden">
              <span className="text-[10px] text-ink-muted">← Geser tabel ke samping →</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-surface-alt">
                    <th className={`${cellTh} text-left sticky left-0 z-20 bg-surface-alt shadow-[2px_0_4px_-2px_rgba(0,0,0,0.08)] min-w-[160px]`}>
                      Program Studi ↑
                    </th>
                    <th className={`${cellTh} text-left`}>Jenjang</th>
                    <th className={`${cellTh} text-right`}>% Herregistrasi</th>
                    <th className={`${cellTh} text-right`}>% KRS</th>
                  </tr>
                </thead>
                <tbody>
                  {data.prodiSummary.map((r) => (
                    <tr key={`${r.prodi}-${r.jenjang}`} className="border-b border-border last:border-0 hover:bg-surface-alt/50">
                      <td className={`${cellTd} text-left sticky left-0 z-10 bg-surface shadow-[2px_0_4px_-2px_rgba(0,0,0,0.08)] max-w-[160px] sm:max-w-none truncate`}>
                        {r.prodi}
                      </td>
                      <td className={`${cellTd} text-left`}>{r.jenjang}</td>
                      <td className={`${cellTd} text-right`}>{pct(r.pctHerregistrasi, 2)}</td>
                      <td className={`${cellTd} text-right`}>{pct(r.pctKrs, 2)}</td>
                    </tr>
                  ))}
                </tbody>
                {/* Baris total */}
                <tfoot>
                  <tr className="border-t-2 border-border bg-surface-alt font-bold">
                    <td className={`${cellTd} text-left sticky left-0 z-10 bg-surface-alt shadow-[2px_0_4px_-2px_rgba(0,0,0,0.08)] font-bold`}>
                      Total
                    </td>
                    <td className={`${cellTd} text-left`} />
                    <td className={`${cellTd} text-right font-bold`}>{pct(data.pctHerregistrasiTotal, 2)}</td>
                    <td className={`${cellTd} text-right font-bold`}>{pct(data.pctKrsTotal, 2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <RowCount shown={data.prodiSummary.length} />
          </div>
        </Section>

        {/* Filter aktif */}
        <p className="text-[11px] sm:text-xs text-ink-muted">
          Filter aktif: fakultas {filters.fakultas || SEMUA}, status herregistrasi{" "}
          {filters.statusHerregistrasi || SEMUA}, status KRS {filters.statusKrs || SEMUA}.
        </p>
      </div>
    </div>
  );
}

// ─── Donut Panel helper ───────────────────────────────────────────────────────

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
