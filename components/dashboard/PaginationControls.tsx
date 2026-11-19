"use client";

interface PaginationControlsTopProps {
  pageSize: number | "all";
  onPageSizeChange: (size: number | "all") => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  startIdx: number;
  endIdx: number;
  totalRows: number;
  filteredCount: number;
  placeholder?: string;
}

export function PaginationTop({
  pageSize,
  onPageSizeChange,
  searchQuery,
  onSearchChange,
  startIdx,
  endIdx,
  totalRows,
  filteredCount,
  placeholder = "Cari program studi...",
}: PaginationControlsTopProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 mb-2 border-b border-border/70">
      <div className="flex flex-wrap items-center gap-3">
        {/* Selector Jumlah Tampilan */}
        <div className="flex items-center gap-1.5 text-xs text-ink-muted">
          <span className="font-medium">Tampilkan:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              const val = e.target.value;
              onPageSizeChange(val === "all" ? "all" : Number(val));
            }}
            className="rounded-lg border border-border bg-surface-alt px-2.5 py-1 text-xs font-semibold text-ink focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value="all">Semua</option>
          </select>
          <span className="hidden sm:inline">baris</span>
        </div>

        {/* Info Counter */}
        <p className="text-xs text-ink-muted">
          {filteredCount === 0 ? (
            <span>Tidak ada data cocok</span>
          ) : (
            <>
              Menampilkan{" "}
              <span className="font-bold text-ink">
                {pageSize === "all" ? `1–${filteredCount}` : `${startIdx + 1}–${Math.min(endIdx, filteredCount)}`}
              </span>{" "}
              dari <span className="font-bold text-ink">{totalRows}</span> prodi
              {filteredCount !== totalRows && (
                <span className="text-[11px] text-ink-muted ml-1">
                  (difilter dari {totalRows})
                </span>
              )}
            </>
          )}
        </p>
      </div>

      {/* Input Pencarian Cepat */}
      <div className="relative w-full sm:w-64">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-border bg-surface-alt pl-8 pr-2.5 py-1 text-xs text-ink placeholder:text-ink-muted/70 focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <svg
          className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-ink-muted"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>
    </div>
  );
}

interface PaginationBottomProps {
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}

export function PaginationBottom({
  page,
  totalPages,
  onPageChange,
}: PaginationBottomProps) {
  if (totalPages <= 1) return null;

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push("...");
      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (page < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 pt-3 mt-1 border-t border-border/70 text-xs text-ink-muted">
      <span>
        Halaman <span className="font-bold text-ink">{page}</span> dari{" "}
        <span className="font-bold text-ink">{totalPages}</span>
      </span>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="rounded-md border border-border px-2 py-1 text-xs font-semibold text-ink transition-colors hover:bg-surface-alt disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ‹ Sebelumnya
        </button>

        <div className="hidden sm:flex items-center gap-1">
          {getPageNumbers().map((p, idx) =>
            p === "..." ? (
              <span key={`dots-${idx}`} className="px-1.5 text-xs text-ink-muted">
                ...
              </span>
            ) : (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                className={`min-w-7 h-7 rounded-md px-1.5 text-xs font-semibold transition-colors ${
                  page === p
                    ? "bg-primary text-ink font-bold shadow-sm"
                    : "border border-border text-ink hover:bg-surface-alt"
                }`}
              >
                {p}
              </button>
            ),
          )}
        </div>

        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="rounded-md border border-border px-2 py-1 text-xs font-semibold text-ink transition-colors hover:bg-surface-alt disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Berikutnya ›
        </button>
      </div>
    </div>
  );
}
