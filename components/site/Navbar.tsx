"use client";

import Link from "next/link";

interface NavbarProps {
  onToggleMobileSidebar?: () => void;
  onToggleDesktopSidebar?: () => void;
}

export default function Navbar({
  onToggleMobileSidebar,
  onToggleDesktopSidebar,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-glass backdrop-blur-[16.291px] border-b border-border/60">
      {/* Baris utilitas kuning khas Unpad */}
      <div className="h-2 sm:h-2.5 bg-primary" />

      <div className="flex h-14 sm:h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          {/* Tombol Hamburger di Mobile */}
          <button
            type="button"
            onClick={onToggleMobileSidebar}
            className="flex size-10 items-center justify-center rounded-lg text-ink hover:bg-surface-alt active:bg-primary-subtle md:hidden"
            aria-label="Buka navigasi dashboard"
          >
            <svg
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Tombol Toggle Sidebar di Desktop */}
          <button
            type="button"
            onClick={onToggleDesktopSidebar}
            className="hidden items-center justify-center rounded-lg p-2 text-ink-muted hover:bg-surface-alt hover:text-ink md:flex"
            aria-label="Toggle sidebar"
            title="Sembunyikan / Tampilkan Sidebar"
          >
            <svg
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </button>

          {/* Logo Unpad Duo */}
          <Link href="/" aria-label="Beranda" className="flex items-center shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-unpad-duo.svg"
              alt="Logo Universitas Padjadjaran"
              width={220}
              height={55}
              className="h-7 w-auto sm:h-9"
            />
          </Link>
        </div>

        {/* Kanan Navbar: Label Portal Ringkas (tanpa tombol navigasi polos) */}
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-block rounded-full bg-primary-subtle px-3 py-1 text-xs font-semibold text-ink border border-primary/40">
            Portal Analitik Akademik
          </span>
        </div>
      </div>
    </header>
  );
}
