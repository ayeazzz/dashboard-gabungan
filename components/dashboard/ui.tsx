import type { ReactNode } from "react";

// Cell styling: text-left/text-right ditentukan secara eksplisit di tiap kolom.
export const cellTh =
  "whitespace-nowrap px-2.5 py-2 sm:px-3 text-xs sm:text-[13px] font-bold text-ink";
export const cellTd =
  "whitespace-nowrap px-2.5 py-2 sm:px-3 text-xs sm:text-[13px] text-ink tabular-nums";

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-2.5 sm:space-y-3 min-w-0">
      <h2 className="flex items-center gap-2 text-sm sm:text-base font-bold text-ink">
        <span className="h-4 w-1 shrink-0 rounded-sm bg-series-1" />
        <span className="truncate">{title}</span>
      </h2>
      {children}
    </section>
  );
}

export function Panel({
  title,
  note,
  aside,
  children,
  className = "",
}: {
  title: string;
  note?: string;
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex min-w-0 flex-col rounded-panel bg-surface p-3.5 sm:p-5 shadow-card ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1.5 sm:gap-2 min-w-0">
        <div className="min-w-0 flex-1">
          <h3 className="text-xs sm:text-sm font-bold text-ink leading-snug break-words">
            {title}
          </h3>
          {note && (
            <p className="mt-0.5 text-[11px] sm:text-xs text-ink-muted leading-relaxed break-words">
              {note}
            </p>
          )}
        </div>
        {aside && <div className="shrink-0 pt-1 sm:pt-0">{aside}</div>}
      </div>
      <div className="mt-3 flex flex-1 flex-col justify-center min-w-0">{children}</div>
    </div>
  );
}

export function KpiCard({
  label,
  value,
  note,
  className = "",
}: {
  label: string;
  value: string;
  note: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-card bg-surface p-3 sm:p-4 shadow-card flex flex-col justify-between min-w-0 overflow-hidden break-words ${className}`}
    >
      <div className="min-w-0">
        <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wide text-ink-muted leading-tight break-words line-clamp-2">
          {label}
        </p>
        <p className="mt-1 text-lg sm:text-2xl lg:text-3xl font-bold leading-tight text-ink tabular-nums break-words">
          {value}
        </p>
      </div>
      <p className="mt-1.5 text-[10px] sm:text-xs text-ink-muted leading-snug break-words">
        {note}
      </p>
    </div>
  );
}

export function PageHeader({
  title,
  action,
  note,
}: {
  title: string;
  action?: ReactNode;
  note?: string;
}) {
  return (
    <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between min-w-0">
      <h1 className="inline-block w-fit max-w-full rounded-lg bg-primary px-3 py-1.5 text-base sm:text-xl lg:text-2xl font-bold text-ink break-words leading-snug">
        {title}
      </h1>
      {(action || note) && (
        <div className="flex flex-col sm:items-end min-w-0">
          {action}
          {note && (
            <p className="mt-1 text-[11px] sm:text-xs text-ink-muted break-words leading-normal sm:text-right">
              {note}
            </p>
          )}
        </div>
      )}
    </header>
  );
}

export function PanelGrid({ cols = 3, children }: { cols?: 2 | 3; children: ReactNode }) {
  return (
    <div
      className={`grid gap-3 min-w-0 ${
        cols === 3
          ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
          : "grid-cols-1 md:grid-cols-2"
      }`}
    >
      {children}
    </div>
  );
}

export function ScrollHint({ className = "" }: { className?: string }) {
  return <p className={`text-[10px] text-ink-muted md:hidden ${className}`}>← Geser tabel ke samping →</p>;
}

export function RowCount({ shown }: { shown: number }) {
  return (
    <p className="py-2 text-center text-xs text-ink-muted">
      Menampilkan {shown} program studi
    </p>
  );
}

// Fallback selama query berjalan
export function LoadingShell() {
  return (
    <div
      className="mx-auto flex min-h-full w-full max-w-[1600px] flex-1 flex-col gap-4 sm:gap-6 bg-surface-alt p-3 sm:p-6 lg:p-8"
      aria-busy
    >
      <div className="h-9 sm:h-11 w-48 sm:w-72 animate-pulse rounded-lg bg-border" />
      <div className="h-28 sm:h-32 animate-pulse rounded-card bg-surface" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2.5 sm:gap-3">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="h-20 sm:h-24 animate-pulse rounded-card bg-surface" />
        ))}
      </div>
      <div className="h-72 animate-pulse rounded-panel bg-surface" />
    </div>
  );
}
