import { Pool } from "pg";

// Satu pool per proses. Saat dev, Next me-reload modul, jadi simpan di globalThis.
const globalForDb = globalThis as unknown as { smupPool?: Pool };

const rawUrl =
  process.env.DATABASE_URL ?? "postgres://smup:smup@localhost:55432/dashboard_smup";
const isSupabase = rawUrl.includes("supabase.com");

export const pool =
  globalForDb.smupPool ??
  new Pool({
    connectionString: isSupabase ? rawUrl.replace(/[?&]sslmode=[^&]+/, "") : rawUrl,
    ssl: isSupabase ? { rejectUnauthorized: false } : undefined,
    max: 5,
  });

if (process.env.NODE_ENV !== "production") globalForDb.smupPool = pool;
