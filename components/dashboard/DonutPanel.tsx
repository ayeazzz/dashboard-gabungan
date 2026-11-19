"use client";

// Donut interaktif: arahkan kursor (atau fokus/ketuk) pada segmen atau baris legend
// untuk melihat jumlah, persentase, dan penjelasan kategori.
import { ChartHost, useChartTooltip } from "@/components/dashboard/ChartTooltip";
import { Panel } from "@/components/dashboard/ui";
import { int, pct } from "@/lib/dashboard/format";

export type DonutPart = { label: string; value: number; color: string };

function DonutInner({
  parts,
  descriptions,
  size,
  stacked,
  total,
  title,
}: {
  parts: DonutPart[];
  descriptions?: Record<string, string>;
  size: number;
  stacked: boolean;
  total: number;
  title: string;
}) {
  const tt = useChartTooltip();
  const idx = tt?.tip ? parts.findIndex((p) => p.label === tt.tip!.title) : -1;
  const active = idx >= 0 ? idx : null;
  const thickness = Math.round(size / 5);
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const lens = parts.map((p) => (total > 0 ? (p.value / total) * c : 0));
  const arcs = lens.map((len, i) => ({ len, start: lens.slice(0, i).reduce((a, b) => a + b, 0), i }));

  const tipFor = (i: number) => ({
    title: parts[i].label,
    color: parts[i].color,
    lines: [`${int(parts[i].value)} · ${pct(parts[i].value / total)} dari ${int(total)}`],
    note: descriptions?.[parts[i].label],
  });

  const onPointer = (i: number, e: React.MouseEvent) => {
    tt?.showAtPointer(tipFor(i), e.clientX, e.clientY);
  };
  const onElement = (i: number, el: Element) => {
    tt?.showAtElement(tipFor(i), el);
  };
  const close = () => {
    tt?.hide();
  };

  const cur = active !== null ? parts[active] : null;

  return (
    <div className={`flex min-w-0 flex-col items-center gap-4 ${stacked ? "" : "sm:flex-row"}`}>
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
          role="img"
          aria-label={`${title}: ${parts.map((p) => `${p.label} ${int(p.value)}`).join(", ")}`}
        >
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-border)" strokeWidth={thickness} />
          {arcs
            .filter((a) => a.len > 0)
            .map((a) => (
              <circle
                key={parts[a.i].label}
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={parts[a.i].color}
                strokeWidth={active === a.i ? thickness + 4 : thickness}
                strokeDasharray={`${a.len} ${c - a.len}`}
                strokeDashoffset={-a.start}
                opacity={active === null || active === a.i ? 1 : 0.35}
                className="cursor-pointer outline-none transition-[stroke-width,opacity] duration-150"
                tabIndex={0}
                aria-label={`${parts[a.i].label}: ${int(parts[a.i].value)} (${pct(parts[a.i].value / total)})`}
                onMouseEnter={(e) => onPointer(a.i, e)}
                onMouseMove={(e) => onPointer(a.i, e)}
                onFocus={(e) => onElement(a.i, e.currentTarget)}
                onBlur={close}
                onClick={(e) => (active === a.i ? close() : onPointer(a.i, e))}
              />
            ))}
        </svg>
        <span className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-2 text-center font-bold leading-tight text-ink tabular-nums">
          <span className="text-[11px]">{int(cur ? cur.value : total)}</span>
          {cur && <span className="text-[10px] font-normal text-ink-muted">{pct(cur.value / total)}</span>}
        </span>
      </div>

      <ul className="w-full min-w-0 flex-1 space-y-1">
        {parts.map((p, i) => (
          <li
            key={p.label}
            tabIndex={0}
            className={`flex cursor-default items-start justify-between gap-3 rounded-md px-1.5 py-1 text-xs text-ink outline-none transition-colors ${
              active === i ? "bg-surface-alt" : ""
            }`}
            onMouseEnter={(e) => onElement(i, e.currentTarget)}
            onFocus={(e) => onElement(i, e.currentTarget)}
            onBlur={close}
            onClick={(e) => (active === i ? close() : onElement(i, e.currentTarget))}
          >
            <span className="flex min-w-0 items-start gap-2">
              <i className="mt-[3px] size-2 shrink-0 rounded-[2px]" style={{ background: p.color }} />
              <span className="min-w-0 break-words leading-snug">{p.label}</span>
            </span>
            <span className="shrink-0 text-right tabular-nums text-ink-muted">
              {int(p.value)} ({pct(p.value / total)})
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DonutPanel({
  title,
  note,
  parts,
  descriptions,
  size = 112,
  stacked = false,
}: {
  title: string;
  note?: string;
  parts: DonutPart[];
  descriptions?: Record<string, string>;
  size?: number;
  stacked?: boolean;
}) {
  const total = parts.reduce((a, p) => a + p.value, 0);

  return (
    <Panel title={title} note={note}>
      {total === 0 ? (
        <p className="py-6 text-center text-xs text-ink-muted">Tidak ada data untuk filter ini.</p>
      ) : (
        <ChartHost>
          <DonutInner
            parts={parts}
            descriptions={descriptions}
            size={size}
            stacked={stacked}
            total={total}
            title={title}
          />
        </ChartHost>
      )}
    </Panel>
  );
}
