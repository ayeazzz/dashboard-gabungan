// Primitif chart sederhana (div + SVG). Sengaja tanpa library chart:
// kebutuhan di sini cuma donut, bar, dan stacked bar.
import { Panel } from "@/components/dashboard/ui";
import { SERIES, int, pct } from "@/lib/dashboard/format";

type Part = { value: number; color: string };

export function Donut({
  parts,
  size = 96,
  thickness = 20,
  centerLabel,
}: {
  parts: Part[];
  size?: number;
  thickness?: number;
  centerLabel?: string;
}) {
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const sum = parts.reduce((a, p) => a + p.value, 0);
  // Offset tiap segmen dihitung sebagai prefix-sum, tanpa variabel yang diubah-ubah saat render.
  const lens = parts.map((p) => (sum > 0 ? (p.value / sum) * c : 0));
  const arcs = lens.map((len, i) => ({
    len,
    start: lens.slice(0, i).reduce((a, b) => a + b, 0),
    color: parts[i].color,
  }));
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90" aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-border)" strokeWidth={thickness} />
        {arcs
          .filter((a) => a.len > 0)
          .map((a, i) => (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={a.color}
              strokeWidth={thickness}
              strokeDasharray={`${a.len} ${c - a.len}`}
              strokeDashoffset={-a.start}
            />
          ))}
      </svg>
      {centerLabel && (
        <span className="absolute inset-0 flex items-center justify-center px-2 text-center text-[11px] font-bold leading-tight text-ink tabular-nums">
          {centerLabel}
        </span>
      )}
    </div>
  );
}

// Panel donut bersama untuk semua halaman: donut + legend (jumlah dan persen).
export function DonutPanel({
  title,
  note,
  parts,
  size = 112,
}: {
  title: string;
  note?: string;
  parts: (Part & { label: string })[];
  size?: number;
}) {
  const total = parts.reduce((a, p) => a + p.value, 0);
  return (
    <Panel title={title} note={note}>
      {total === 0 ? (
        <p className="py-6 text-center text-xs text-ink-muted">Tidak ada data untuk filter ini.</p>
      ) : (
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-4">
          <div role="img" aria-label={`${title}: ${parts.map((p) => `${p.label} ${int(p.value)}`).join(", ")}`}>
            <Donut parts={parts} size={size} thickness={22} centerLabel={int(total)} />
          </div>
          <ul className="w-full min-w-0 flex-1 space-y-2">
            {parts.map((p) => (
              <li key={p.label} className="flex items-start justify-between gap-3 text-xs text-ink">
                <span className="flex min-w-0 items-start gap-2">
                  <i className="mt-[3px] size-2 shrink-0 rounded-[2px]" style={{ background: p.color }} />
                  <span className="leading-snug">{p.label}</span>
                </span>
                <span className="shrink-0 text-right tabular-nums text-ink-muted">
                  {int(p.value)} ({pct(p.value / total)})
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Panel>
  );
}

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
            <div key={g} className="flex h-full w-12 sm:w-14 shrink-0 flex-col justify-end">
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
              <span className="mt-1.5 truncate text-center text-[10px] sm:text-[11px] text-ink-muted" title={g}>
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
