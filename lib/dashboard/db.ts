import { Pool } from "pg";

// Satu pool per proses. Saat dev, Next me-reload modul, jadi simpan di globalThis.
const globalForDb = globalThis as unknown as { smupPool?: Pool };

export const pool =
  globalForDb.smupPool ??
  new Pool({
    connectionString:
      process.env.DATABASE_URL ?? "postgres://smup:smup@localhost:55432/dashboard_smup",
    max: 5,
  });

if (process.env.NODE_ENV !== "production") globalForDb.smupPool = pool;
