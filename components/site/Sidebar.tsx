"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavItem {
  label: string;
  href: string;
  description: string;
  icon: (active: boolean) => React.ReactNode;
}

const navItems: NavItem[] = [
  {
    label: "Keketatan SMUP",
    href: "/",
    description: "Keketatan Seleksi & Historis",
    icon: (active) => (
      <svg
        className={`size-5 shrink-0 transition-colors ${
          active ? "text-ink-strong" : "text-ink-muted group-hover:text-ink"
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v7" />
      </svg>
    ),
  },
  {
    label: "Snapshot PMB",
    href: "/pmb",
    description: "Tren Harian & Verifikasi Berkas",
    icon: (active) => (
      <svg
        className={`size-5 shrink-0 transition-colors ${
          active ? "text-ink-strong" : "text-ink-muted group-hover:text-ink"
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        />
      </svg>
    ),
  },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export default function Sidebar({
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
}: SidebarProps) {
  const pathname = usePathname();

  const navContent = (isMobile = false) => (
    <div className="flex h-full flex-col justify-between p-3 sm:p-4">
      <div className="space-y-3 sm:space-y-4">
        {/* Section title */}
        {(!isCollapsed || isMobile) && (
          <div className="px-3 pt-1">
            <p className="text-[11px] font-bold tracking-wider text-ink-muted uppercase">
              Menu Dashboard
            </p>
          </div>
        )}

        <nav className="space-y-1.5" aria-label="Navigasi Sidebar">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  if (isMobile) onCloseMobile();
                }}
                title={isCollapsed && !isMobile ? `${item.label} — ${item.description}` : undefined}
                className={`group flex items-center gap-3 rounded-card px-3 py-3 sm:py-2.5 text-sm font-semibold transition-all active:scale-[0.98] ${
                  active
                    ? "bg-primary text-ink shadow-sm ring-1 ring-primary-accent"
                    : "text-ink hover:bg-primary-subtle hover:text-ink-strong"
                } ${isCollapsed && !isMobile ? "justify-center" : ""}`}
              >
                {item.icon(active)}
                {(!isCollapsed || isMobile) && (
                  <div className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] leading-tight font-bold">
                      {item.label}
                    </span>
                    <span
                      className={`block truncate text-[11px] font-normal ${
                        active ? "text-ink/80" : "text-ink-muted"
                      }`}
                    >
                      {item.description}
                    </span>
                  </div>
                )}
                {active && (!isCollapsed || isMobile) && (
                  <span className="size-2 shrink-0 rounded-full bg-ink" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bagian Bawah Sidebar (Tombol Collapse desktop) */}
      {!isMobile && (
        <div className="border-t border-border pt-3">
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? "Perluas Sidebar" : "Perkecil Sidebar"}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs font-semibold text-ink-muted transition-colors hover:bg-primary-subtle hover:text-ink"
          >
            <svg
              className={`size-4 transition-transform duration-200 ${
                isCollapsed ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
            {!isCollapsed && <span>Ciutkan Sidebar</span>}
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* 1. Desktop Sidebar (Sticky di kiri) */}
      <aside
        className={`hidden border-r border-border bg-surface transition-all duration-300 md:block shrink-0 ${
          isCollapsed ? "w-[76px]" : "w-64"
        }`}
      >
        <div className="sticky top-[73px] sm:top-[88px] h-[calc(100vh-73px)] sm:h-[calc(100vh-88px)] overflow-y-auto">
          {navContent(false)}
        </div>
      </aside>

      {/* 2. Mobile / Tablet Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-ink/50 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
            aria-hidden="true"
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col bg-surface shadow-2xl transition-transform duration-300 ease-out">
            {/* Header Drawer */}
            <div className="flex items-center justify-between border-b border-border p-4">
              <div className="flex items-center gap-2">
                <span className="h-4 w-1 rounded-sm bg-primary" />
                <span className="text-sm font-bold text-ink">Navigasi Dashboard</span>
              </div>
              <button
                type="button"
                onClick={onCloseMobile}
                className="flex size-9 items-center justify-center rounded-lg text-ink-muted hover:bg-surface-alt hover:text-ink active:bg-primary-subtle"
                aria-label="Tutup menu"
              >
                <svg
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Menu Links */}
            <div className="flex-1 overflow-y-auto">{navContent(true)}</div>
          </div>
        </div>
      )}
    </>
  );
}
