// Primitif chart sederhana (div + SVG). Sengaja tanpa library chart:
// kebutuhan di sini cuma donut, bar, dan stacked bar.
import { ChartHost, TipTarget } from "@/components/dashboard/ChartTooltip";
import { SERIES, dec, int, pct } from "@/lib/dashboard/format";

type Part = { value: number; color: string; label?: string };

export function Legend({ items, className = "" }: { items: { label: string; color: string }[]; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 ${className}`}>
      {items.map((s) => (
        <span key={s.label} className="flex items-center gap-1.5 text-xs text-ink-muted">
          <i className="size-2 rounded-[2px]" style={{ background: s.color }} />
          {s.label}
        </span>
      ))}
    </div>
  );
}

export function BarList({
  items,
  labelWidth = "8rem",
  showValue = false,
}: {
  items: { label: string; value: number; color?: string }[];
  labelWidth?: string;
  showValue?: boolean;
}) {
  const max = Math.max(...items.map((i) => i.value), 1);
  const total = items.reduce((a, i) => a + i.value, 0);
  return (
    <ChartHost>
      <ul className="space-y-1">
        {items.map((item) => (
          <TipTarget
            as="li"
            key={item.label}
            tip={{
              title: item.label,
              color: item.color ?? SERIES.s1,
              lines: [`${int(item.value)} · ${total > 0 ? pct(item.value / total) : "-"} dari total ${int(total)}`],
            }}
            className="flex cursor-default items-center gap-2 rounded-md px-1 py-1 transition-colors hover:bg-surface-alt sm:gap-3"
          >
            <span className="shrink-0 truncate text-xs text-ink" style={{ width: labelWidth, maxWidth: "45%" }}>
              {item.label}
            </span>
            <span className="h-2.5 flex-1 rounded-full bg-border">
              <span
                className="block h-full rounded-full"
                style={{ width: `${(item.value / max) * 100}%`, background: item.color ?? SERIES.s1 }}
              />
            </span>
            {showValue && (
              <span className="w-10 sm:w-12 shrink-0 text-right text-xs text-ink tabular-nums">{int(item.value)}</span>
            )}
          </TipTarget>
        ))}
      </ul>
    </ChartHost>
  );
}

export function StackedBarList({
  rows,
  labelWidth = "12rem",
}: {
  rows: { label: string; segments: Part[]; total: number }[];
  labelWidth?: string;
}) {
  const max = Math.max(...rows.map((r) => r.total), 1);
  return (
    <ChartHost>
      <ul className="space-y-1">
        {rows.map((row) => (
          <TipTarget
            as="li"
            key={row.label}
            tip={{
              title: row.label,
              rows: row.segments.map((s, i) => ({
                label: s.label ?? `Segmen ${i + 1}`,
                value: `${int(s.value)} (${row.total > 0 ? pct(s.value / row.total) : "-"})`,
                color: s.color,
              })),
              note: `Total ${int(row.total)}`,
            }}
            className="flex cursor-default items-center gap-2 rounded-md px-1 py-1 transition-colors hover:bg-surface-alt sm:gap-3"
          >
            <span className="shrink-0 truncate text-xs text-ink" style={{ width: labelWidth, maxWidth: "42%" }}>
              {row.label}
            </span>
            <span className="h-2.5 flex-1">
              <span className="flex h-full overflow-hidden rounded-full" style={{ width: `${(row.total / max) * 100}%` }}>
                {row.total > 0 &&
                  row.segments.map((s, i) => (
                    <span key={i} style={{ width: `${(s.value / row.total) * 100}%`, background: s.color }} />
                  ))}
              </span>
            </span>
            <span className="w-10 sm:w-12 shrink-0 text-right text-xs text-ink-muted tabular-nums">{int(row.total)}</span>
          </TipTarget>
        ))}
      </ul>
    </ChartHost>
  );
}

export function GroupedBars({
  groups,
  series,
  height = 160,
  titles,
  share = false,
  notes,
}: {
  groups: string[];
  series: { label: string; values: number[]; color: string }[];
  height?: number;
  // Judul tooltip (mis. nama lengkap dengan nomor); default memakai label di bawah batang.
  titles?: string[];
  // true: tampilkan persen tiap seri dari jumlah semua seri di grup itu (hanya untuk seri yang saling lepas).
  share?: boolean;
  // Catatan tambahan per grup (mis. rasio) di bawah tooltip.
  notes?: (string | undefined)[];
}) {
  const max = Math.max(
    ...series.flatMap((s) => s.values.map((v) => Number(v) || 0)),
    1,
  );
  return (
    <ChartHost>
      <div className="overflow-x-auto pb-1">
        <div className="flex min-w-max items-end gap-2 border-b border-border" style={{ height }}>
          {groups.map((g, i) => {
            const sum = series.reduce((a, s) => a + (Number(s.values[i]) || 0), 0);
            return (
              <TipTarget
                key={g}
                tip={{
                  title: titles?.[i] ?? g,
                  rows: series.map((s) => {
                    const val = Number(s.values[i]) || 0;
                    return {
                      label: s.label,
                      value: share ? `${int(val)} (${sum > 0 ? pct(val / sum) : "-"})` : int(val),
                      color: s.color,
                    };
                  }),
                  note: notes?.[i] ?? (share ? `Total ${int(sum)}` : undefined),
                }}
                className="flex h-full w-16 shrink-0 cursor-default flex-col justify-end rounded-md transition-colors hover:bg-surface-alt sm:w-20"
              >
                <div className="flex flex-1 items-end justify-center gap-[2px] sm:gap-[3px]">
                  {series.map((s) => {
                    const val = Number(s.values[i]) || 0;
                    return (
                      <span
                        key={s.label}
                        className="w-2.5 rounded-t-[2px] sm:w-3"
                        style={{ height: `${(val / max) * 100}%`, background: s.color }}
                      />
                    );
                  })}
                </div>
                <span className="mt-1.5 line-clamp-2 min-h-[2.5em] break-words text-center text-[10px] leading-tight text-ink-muted sm:text-[11px]">
                  {g}
                </span>
              </TipTarget>
            );
          })}
        </div>
      </div>
    </ChartHost>
  );
}

// 30 batang harian; garis putus-putus = rata-rata.
export function DailyBars({
  data,
  avg,
  height = 160,
}: {
  data: { tanggal: string; value: number }[];
  avg: number | null;
  height?: number;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <ChartHost>
      <div className="relative flex items-end gap-[2px] border-b border-border sm:gap-[3px]" style={{ height }}>
        {avg !== null && avg > 0 && (
          <span
            className="pointer-events-none absolute inset-x-0 border-t border-dashed"
            style={{ bottom: `${(avg / max) * 100}%`, borderColor: SERIES.s3 }}
          />
        )}
        {data.map((d) => {
          const delta = avg === null ? null : d.value - avg;
          return (
            <TipTarget
              key={d.tanggal}
              as="span"
              tip={{
                title: d.tanggal,
                color: SERIES.s1,
                lines: [
                  `${int(d.value)} pendaftar`,
                  ...(delta === null ? [] : [`${delta >= 0 ? "+" : "-"}${dec(Math.abs(delta), 1)} dari rata-rata ${dec(avg, 1)}`]),
                ],
              }}
              className="flex h-full min-w-0 flex-1 cursor-default items-end rounded-t-[2px] hover:bg-surface-alt"
            >
              <span className="block w-full rounded-t-[2px]" style={{ height: `${(d.value / max) * 100}%`, background: SERIES.s1 }} />
            </TipTarget>
          );
        })}
      </div>
      <div className="mt-1 flex justify-between text-[10px] text-ink-muted sm:text-[11px]">
        <span>{data[0]?.tanggal}</span>
        <span>{data.at(-1)?.tanggal}</span>
      </div>
    </ChartHost>
  );
}
