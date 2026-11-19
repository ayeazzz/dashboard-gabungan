import { Pool } from "pg";

const DEFAULT_SMUP_URL = "postgres://smup:smup@localhost:55432/dashboard_smup";

// Satu pool per database per proses. Saat dev, Next me-reload modul, jadi simpan di globalThis.
const globalForDb = globalThis as unknown as { dbPools?: Record<string, Pool> };

/** Membuat atau mengambil Pool Postgres yang di-cache berdasarkan nama database. */
export function getPool(name: string, rawUrl: string): Pool {
  const pools = (globalForDb.dbPools ??= {});
  if (pools[name]) return pools[name];

  const isSupabase = rawUrl.includes("supabase.com");
  const instance = new Pool({
    connectionString: isSupabase ? rawUrl.replace(/[?&]sslmode=[^&]+/, "") : rawUrl,
    ssl: isSupabase ? { rejectUnauthorized: false } : undefined,
    max: 3,
    connectionTimeoutMillis: 1500,
  });

  instance.on("error", () => {
    if (process.env.NODE_ENV !== "production") {
      // Silent in dev when offline
    }
  });

  if (process.env.NODE_ENV !== "production") pools[name] = instance;
  return instance;
}

// Pool utama SMUP & PMB (kompatibel dengan import `pool` yang sudah ada).
export const pool = getPool(
  "smup",
  process.env.DATABASE_URL_SMUP ?? process.env.DATABASE_URL ?? DEFAULT_SMUP_URL,
);

/** Mengambil pool untuk database Herregistrasi & KRS. */
export function getHerregPool(): Pool {
  const url = process.env.DATABASE_URL_HERREG;
  if (!url) return pool;
  return getPool("herreg", url);
}

/** Mengambil pool untuk database Nilai Mahasiswa. */
export function getNilaiPool(): Pool {
  const url = process.env.DATABASE_URL_NILAI;
  if (!url) return pool;
  return getPool("nilai", url);
}
