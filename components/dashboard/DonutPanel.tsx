"use client";

// Donut interaktif: arahkan kursor (atau fokus/ketuk) pada segmen atau baris legend
// untuk melihat jumlah, persentase, dan penjelasan kategori.
import { useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";

import { Panel } from "@/components/dashboard/ui";
import { int, pct } from "@/lib/dashboard/format";

export type DonutPart = { label: string; value: number; color: string };

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
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const total = parts.reduce((a, p) => a + p.value, 0);
  const thickness = Math.round(size / 5);
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const lens = parts.map((p) => (total > 0 ? (p.value / total) * c : 0));
  const arcs = lens.map((len, i) => ({ len, start: lens.slice(0, i).reduce((a, b) => a + b, 0), i }));

  // Posisi tooltip relatif terhadap kotak panel; dijepit supaya tidak keluar kotak.
  const place = (x: number, y: number) => {
    const w = wrapRef.current?.clientWidth ?? 0;
    setPos({ x: Math.min(Math.max(x, 8), Math.max(w - 8, 8)), y: Math.max(y, 8) });
  };
  const show = (i: number, e: ReactMouseEvent) => {
    const box = wrapRef.current?.getBoundingClientRect();
    if (box) place(e.clientX - box.left, e.clientY - box.top);
    setActive(i);
  };
  const showFromEl = (i: number, el: Element) => {
    const box = wrapRef.current?.getBoundingClientRect();
    const b = el.getBoundingClientRect();
    if (box) place(b.left - box.left + b.width / 2, b.top - box.top + b.height);
    setActive(i);
  };

  const cur = active !== null ? parts[active] : null;

  return (
    <Panel title={title} note={note}>
      {total === 0 ? (
        <p className="py-6 text-center text-xs text-ink-muted">Tidak ada data untuk filter ini.</p>
      ) : (
        <div ref={wrapRef} className="relative min-w-0" onMouseLeave={() => setActive(null)}>
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
                      onMouseEnter={(e) => show(a.i, e)}
                      onMouseMove={(e) => show(a.i, e)}
                      onFocus={(e) => showFromEl(a.i, e.currentTarget)}
                      onBlur={() => setActive(null)}
                      onClick={(e) => (active === a.i ? setActive(null) : show(a.i, e))}
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
                  onMouseEnter={(e) => showFromEl(i, e.currentTarget)}
                  onFocus={(e) => showFromEl(i, e.currentTarget)}
                  onBlur={() => setActive(null)}
                  onClick={(e) => (active === i ? setActive(null) : showFromEl(i, e.currentTarget))}
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

          {cur && (
            <div
              role="tooltip"
              className="pointer-events-none absolute z-40 w-56 max-w-[calc(100%-1rem)] -translate-x-1/2 translate-y-3 rounded-lg border border-border bg-surface p-2.5 text-xs shadow-card"
              style={{ left: pos.x, top: pos.y }}
            >
              <p className="flex items-center gap-2 font-bold text-ink">
                <i className="size-2.5 shrink-0 rounded-[2px]" style={{ background: cur.color }} />
                {cur.label}
              </p>
              <p className="mt-1 tabular-nums text-ink">
                {int(cur.value)} <span className="text-ink-muted">· {pct(cur.value / total)} dari {int(total)}</span>
              </p>
              {descriptions?.[cur.label] && (
                <p className="mt-1 leading-snug text-ink-muted">{descriptions[cur.label]}</p>
              )}
            </div>
          )}
        </div>
      )}
    </Panel>
  );
}
