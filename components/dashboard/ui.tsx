import type { ReactNode } from "react";

// Sengaja tanpa text-align & vertical-align: <th> default-nya center/middle, jadi
// arah tiap kolom harus disebut eksplisit di pemakaian (text-left / text-right).
export const cellTh = "whitespace-nowrap px-3 py-2 text-[13px] font-bold text-ink";
export const cellTd = "whitespace-nowrap px-3 py-2 text-[13px] text-ink tabular-nums";

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="flex items-center gap-2 text-base font-bold text-ink">
        <span className="h-4 w-1 rounded-sm bg-series-1" />
        {title}
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
    <div className={`flex min-w-0 flex-col rounded-panel bg-surface p-4 shadow-card ${className}`}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-bold text-ink">{title}</h3>
          {note && <p className="mt-0.5 text-xs text-ink-muted">{note}</p>}
        </div>
        {aside}
      </div>
      <div className="mt-3 flex flex-1 flex-col justify-center">{children}</div>
    </div>
  );
}

export function KpiCard({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-card bg-surface p-4 shadow-card">
      <p className="text-xs font-bold uppercase tracking-wide text-ink-muted">{label}</p>
      <p className="mt-1 text-3xl font-bold leading-tight text-ink tabular-nums">{value}</p>
      <p className="mt-1 text-xs text-ink-muted">{note}</p>
    </div>
  );
}

export function PageHeader({ title, action, note }: { title: string; action?: ReactNode; note?: string }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-3">
      <h1 className="rounded-lg bg-primary px-4 py-2 text-2xl text-ink">{title}</h1>
      {(action || note) && (
        <div className="text-right">
          {action}
          {note && <p className="mt-1 text-xs text-ink-muted">{note}</p>}
        </div>
      )}
    </header>
  );
}

export function PanelGrid({ cols = 3, children }: { cols?: 2 | 3; children: ReactNode }) {
  return (
    <div className={`grid gap-3 ${cols === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>{children}</div>
  );
}

export function RowCount({ shown }: { shown: number }) {
  return <p className="py-2 text-center text-xs text-ink-muted">Menampilkan {shown} program studi</p>;
}

// Fallback selama query berjalan; bentuknya menyerupai isi halaman supaya tidak melompat.
export function LoadingShell() {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-[1600px] flex-1 flex-col gap-6 bg-surface-alt p-4 sm:p-6 lg:p-8" aria-busy>
      <div className="h-11 w-72 animate-pulse rounded-lg bg-border" />
      <div className="h-32 animate-pulse rounded-card bg-surface" />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-card bg-surface" />
        ))}
      </div>
      <div className="h-72 animate-pulse rounded-panel bg-surface" />
    </div>
  );
}
