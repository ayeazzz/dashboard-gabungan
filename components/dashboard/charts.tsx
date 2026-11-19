// Primitif chart sederhana (div + SVG). Sengaja tanpa library chart:
// kebutuhan di sini cuma donut, bar, dan stacked bar.
import { SERIES, int } from "@/lib/dashboard/format";

type Part = { value: number; color: string };

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
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-2 sm:gap-3">
          <span
            className="shrink-0 truncate text-xs text-ink"
            style={{ width: labelWidth, maxWidth: "45%" }}
            title={item.label}
          >
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
        </li>
      ))}
    </ul>
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
    <ul className="space-y-2">
      {rows.map((row) => (
        <li key={row.label} className="flex items-center gap-2 sm:gap-3">
          <span
            className="shrink-0 truncate text-xs text-ink"
            style={{ width: labelWidth, maxWidth: "42%" }}
            title={row.label}
          >
            {row.label}
          </span>
          <span className="h-2.5 flex-1">
            <span
              className="flex h-full overflow-hidden rounded-full"
              style={{ width: `${(row.total / max) * 100}%` }}
            >
              {row.total > 0 &&
                row.segments.map((s, i) => (
                  <span key={i} style={{ width: `${(s.value / row.total) * 100}%`, background: s.color }} />
                ))}
            </span>
          </span>
          <span className="w-10 sm:w-12 shrink-0 text-right text-xs text-ink-muted tabular-nums">{int(row.total)}</span>
        </li>
      ))}
    </ul>
  );
}

export function GroupedBars({
  groups,
  series,
  height = 160,
}: {
  groups: string[];
  series: { label: string; values: number[]; color: string }[];
  height?: number;
}) {
  const max = Math.max(...series.flatMap((s) => s.values), 1);
  return (
    <div>
      <div className="overflow-x-auto pb-1">
        <div className="flex min-w-max items-end gap-2 border-b border-border" style={{ height }}>
          {groups.map((g, i) => (
            <div key={g} className="flex h-full w-16 sm:w-20 shrink-0 flex-col justify-end">
              <div className="flex flex-1 items-end justify-center gap-[2px] sm:gap-[3px]">
                {series.map((s) => (
                  <span
                    key={s.label}
                    className="w-2.5 sm:w-3 rounded-t-[2px]"
                    style={{ height: `${(s.values[i] / max) * 100}%`, background: s.color }}
                    title={`${g} · ${s.label}: ${int(s.values[i])}`}
                  />
                ))}
              </div>
              <span className="mt-1.5 line-clamp-2 min-h-[2.5em] break-words text-center text-[10px] sm:text-[11px] leading-tight text-ink-muted" title={g}>
                {g}
              </span>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-1.5 text-right text-[10px] sm:text-[11px] text-ink-muted md:hidden">
        ← Geser grafik untuk melihat {groups.length} fakultas →
      </p>
    </div>
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
    <div>
      <div className="relative flex items-end gap-[2px] sm:gap-[3px] border-b border-border" style={{ height }}>
        {avg !== null && avg > 0 && (
          <span
            className="pointer-events-none absolute inset-x-0 border-t border-dashed"
            style={{ bottom: `${(avg / max) * 100}%`, borderColor: SERIES.s3 }}
          />
        )}
        {data.map((d) => (
          <span
            key={d.tanggal}
            className="min-w-0 flex-1 rounded-t-[2px]"
            style={{ height: `${(d.value / max) * 100}%`, background: SERIES.s1 }}
            title={`${d.tanggal}: ${int(d.value)}`}
          />
        ))}
      </div>
      <div className="mt-1 flex justify-between text-[10px] sm:text-[11px] text-ink-muted">
        <span>{data[0]?.tanggal}</span>
        <span>{data.at(-1)?.tanggal}</span>
      </div>
    </div>
  );
}
