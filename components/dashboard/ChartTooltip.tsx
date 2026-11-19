"use client";

// Tooltip bersama untuk semua chart (donut dan batang).
// - Hover (mouse), fokus keyboard, dan ketuk (sentuhan) membuka tooltip.
// - Esc atau ketuk di luar menutupnya.
// Chart tetap Server Component; hanya pembungkus interaktif ini yang client.
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, ElementType, ReactNode } from "react";

export type Tip = {
  title: string;
  color?: string;
  lines?: string[];
  rows?: { label: string; value: string; color?: string }[];
  note?: string;
};

type Pos = { x: number; y: number };

type TooltipContextType = {
  showAtPointer: (tip: Tip, clientX: number, clientY: number) => void;
  showAtElement: (tip: Tip, el: Element) => void;
  hide: () => void;
  tip: Tip | null;
};

const Ctx = createContext<TooltipContextType | null>(null);

export function useChartTooltip() {
  return useContext(Ctx);
}

export function TooltipCard({ tip, pos }: { tip: Tip; pos: Pos }) {
  return (
    <div
      role="tooltip"
      className="pointer-events-none absolute z-40 w-56 max-w-[calc(100%-0.5rem)] -translate-x-1/2 translate-y-3 rounded-lg border border-border bg-surface p-2.5 text-xs shadow-card"
      style={{ left: pos.x, top: pos.y }}
    >
      <p className="flex items-start gap-2 font-bold leading-snug text-ink">
        {tip.color && <i className="mt-[3px] size-2.5 shrink-0 rounded-[2px]" style={{ background: tip.color }} />}
        <span className="min-w-0 break-words">{tip.title}</span>
      </p>
      {tip.lines?.map((l) => (
        <p key={l} className="mt-1 tabular-nums text-ink">
          {l}
        </p>
      ))}
      {tip.rows && (
        <ul className="mt-1.5 space-y-1">
          {tip.rows.map((r) => (
            <li key={r.label} className="flex items-center justify-between gap-3 tabular-nums">
              <span className="flex min-w-0 items-center gap-1.5 text-ink-muted">
                {r.color && <i className="size-2 shrink-0 rounded-[2px]" style={{ background: r.color }} />}
                <span className="break-words">{r.label}</span>
              </span>
              <span className="shrink-0 text-ink">{r.value}</span>
            </li>
          ))}
        </ul>
      )}
      {tip.note && <p className="mt-1.5 border-t border-border pt-1.5 leading-snug text-ink-muted">{tip.note}</p>}
    </div>
  );
}

export function ChartHost({
  children,
  className = "",
  onMouseLeave,
}: {
  children: ReactNode;
  className?: string;
  onMouseLeave?: () => void;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<Tip | null>(null);
  const [pos, setPos] = useState<Pos>({ x: 0, y: 0 });

  const clamp = useCallback((x: number, y: number): Pos => {
    const w = hostRef.current?.clientWidth ?? 0;
    const half = 116;
    return { x: Math.min(Math.max(x, half), Math.max(w - half, half)), y: Math.max(y, 0) };
  }, []);

  const showAtPointer = useCallback(
    (t: Tip, clientX: number, clientY: number) => {
      const box = hostRef.current?.getBoundingClientRect();
      if (box) setPos(clamp(clientX - box.left, clientY - box.top));
      setTip(t);
    },
    [clamp],
  );

  const showAtElement = useCallback(
    (t: Tip, el: Element) => {
      const box = hostRef.current?.getBoundingClientRect();
      const b = el.getBoundingClientRect();
      if (box) setPos(clamp(b.left - box.left + b.width / 2, b.top - box.top + b.height));
      setTip(t);
    },
    [clamp],
  );

  const hide = useCallback(() => setTip(null), []);

  useEffect(() => {
    if (!tip) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setTip(null);
    const onDown = (e: PointerEvent) => {
      if (hostRef.current && !hostRef.current.contains(e.target as Node)) setTip(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [tip]);

  const ctxValue = useMemo(
    () => ({
      showAtPointer,
      showAtElement,
      hide,
      tip,
    }),
    [showAtPointer, showAtElement, hide, tip],
  );

  const handleMouseLeave = useCallback(() => {
    hide();
    onMouseLeave?.();
  }, [hide, onMouseLeave]);

  return (
    <Ctx.Provider value={ctxValue}>
      <div ref={hostRef} className={`relative min-w-0 ${className}`} onMouseLeave={handleMouseLeave}>
        {children}
        {tip && <TooltipCard tip={tip} pos={pos} />}
      </div>
    </Ctx.Provider>
  );
}

// Elemen yang memicu tooltip. `tip` berisi teks yang sudah diformat di server.
export function TipTarget({
  tip,
  as = "div",
  className = "",
  style,
  children,
}: {
  tip: Tip;
  as?: "div" | "span" | "li";
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  const ctx = useContext(Ctx);
  const touch = useRef(false);
  const Tag = as as ElementType;
  if (!ctx) return <Tag className={className} style={style}>{children}</Tag>;
  const { showAtPointer, showAtElement, hide, tip: current } = ctx;
  const label = [tip.title, ...(tip.lines ?? []), ...(tip.rows ?? []).map((r) => `${r.label} ${r.value}`)].join(", ");

  return (
    <Tag
      tabIndex={0}
      aria-label={label}
      className={`outline-none focus-visible:ring-2 focus-visible:ring-primary ${className}`}
      style={style}
      onPointerDown={(e: React.PointerEvent) => {
        touch.current = e.pointerType !== "mouse";
      }}
      onPointerEnter={(e: React.PointerEvent) => e.pointerType === "mouse" && showAtPointer(tip, e.clientX, e.clientY)}
      onPointerMove={(e: React.PointerEvent) => e.pointerType === "mouse" && showAtPointer(tip, e.clientX, e.clientY)}
      onPointerLeave={(e: React.PointerEvent) => e.pointerType === "mouse" && hide()}
      onFocus={(e: React.FocusEvent<HTMLElement>) => showAtElement(tip, e.currentTarget)}
      onBlur={hide}
      onClick={(e: React.MouseEvent<HTMLElement>) => {
        if (!touch.current) return;
        if (current?.title === tip.title) hide();
        else showAtElement(tip, e.currentTarget);
      }}
    >
      {children}
    </Tag>
  );
}
