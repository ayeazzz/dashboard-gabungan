// Memuat skema + seed master (jenjang, fakultas, program_studi) + seed domain
// ke database Postgres/Supabase terpisah (Herregistrasi atau Nilai).
// Jalankan: npm run db:setup:herreg  atau  npm run db:setup:nilai
import { readFile } from "node:fs/promises";
import { Client } from "pg";

if (typeof process.loadEnvFile === "function") {
  try {
    process.loadEnvFile(".env.local");
  } catch {
    try {
      process.loadEnvFile(".env");
    } catch {}
  }
}

const CONFIGS = {
  herreg: {
    envKey: "DATABASE_URL_HERREG",
    schema: "db/schema_herregistrasi.sql",
    seed: "db/seed_herregistrasi.sql",
    checks: [
      ["jenjang", "SELECT count(*) FROM jenjang", 7],
      ["fakultas", "SELECT count(*) FROM fakultas", 19],
      ["program_studi", "SELECT count(*) FROM program_studi", 211],
      ["mahasiswa_aktif", "SELECT count(*) FROM mahasiswa_aktif", 31770],
    ],
  },
  nilai: {
    envKey: "DATABASE_URL_NILAI",
    schema: "db/schema_nilai.sql",
    seed: "db/seed_nilai.sql",
    checks: [
      ["jenjang", "SELECT count(*) FROM jenjang", 7],
      ["fakultas", "SELECT count(*) FROM fakultas", 19],
      ["program_studi", "SELECT count(*) FROM program_studi", 211],
      ["nilai_mahasiswa", "SELECT count(*) FROM nilai_mahasiswa", 194859],
    ],
  },
};

const domain = process.argv[2];
const cfg = CONFIGS[domain];
if (!cfg) {
  console.error("Gunakan argumen: herreg atau nilai");
  process.exit(1);
}

const rawUrl = process.env[cfg.envKey];
if (!rawUrl) {
  console.error(`Environment variable ${cfg.envKey} belum diatur di .env.local atau environment.`);
  process.exit(1);
}

const isSupabase = rawUrl.includes("supabase.com");
const client = new Client({
  connectionString: isSupabase ? rawUrl.replace(/[?&]sslmode=[^&]+/, "") : rawUrl,
  ssl: isSupabase ? { rejectUnauthorized: false } : undefined,
});

const MASTER_TABLES = /^INSERT INTO\s+(jenjang|fakultas|program_studi)\b/i;

await client.connect();
await client.query("SET statement_timeout = 0");

await client.query(await readFile(cfg.schema, "utf8"));
console.log(`✓ ${cfg.schema}`);

const masterSql = await readFile("dashboard smup sql/02_seed_master.sql", "utf8");
const masterStmts = masterSql
  .replace(/^(?:USE|SET)\s[^\n]*;$/gm, "")
  .split(/;\s*\n/)
  .map((s) => s.trim())
  .filter((s) => MASTER_TABLES.test(s));

for (const sql of masterStmts) await client.query(sql);
console.log("✓ master (jenjang, fakultas, program_studi)");

await client.query(await readFile(cfg.seed, "utf8"));
console.log(`✓ ${cfg.seed}`);

let failed = 0;
for (const [label, sql, expected] of cfg.checks) {
  const got = Number((await client.query(sql)).rows[0].count);
  const ok = got === expected;
  if (!ok) failed++;
  console.log(`${ok ? "✓" : "✗"} ${label}: ${got}${ok ? "" : ` (harus ${expected})`}`);
}

await client.end();
if (failed) {
  console.error(`\n${failed} pemeriksaan gagal.`);
  process.exit(1);
}
console.log(`\nDatabase ${domain} dimuat dan tervalidasi.`);
