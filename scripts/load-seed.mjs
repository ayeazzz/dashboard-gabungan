// Memuat "dashboard smup sql" (dump MySQL) ke Postgres lokal.
// Idempoten: skema di-drop + dibuat ulang, lalu seed dimuat ulang.
// Jalankan: npm run db:setup
import { readFile } from "node:fs/promises";
import { Client } from "pg";

const rawUrl = process.env.DATABASE_URL ?? "postgres://smup:smup@localhost:55432/dashboard_smup";
const isSupabase = rawUrl.includes("supabase.com");
const DIR = "dashboard smup sql";

// Buang perintah khusus MySQL. File seed tidak memakai escape backslash,
// jadi isi barisnya aman dijalankan apa adanya di Postgres.
const strip = (sql) =>
  sql
    .replace(/^(?:USE|SET)\s[^\n]*;$/gm, "")
    .split(/;\s*\n/)
    .map((s) => s.trim())
    .filter(Boolean);

const client = new Client({
  connectionString: isSupabase ? rawUrl.replace(/[?&]sslmode=[^&]+/, "") : rawUrl,
  ssl: isSupabase ? { rejectUnauthorized: false } : undefined,
});
await client.connect();
await client.query("SET statement_timeout = 0");

await client.query(await readFile("db/schema.postgres.sql", "utf8"));

for (const file of ["02_seed_master.sql", "03_seed_pendaftaran.sql"]) {
  const statements = strip(await readFile(`${DIR}/${file}`, "utf8"));
  for (const sql of statements) await client.query(sql);
  console.log(`✓ ${file}`);
}

// Angka acuan workbook. Kalau salah satu gagal, seed memang tidak bisa dipercaya.
const checks = [
  ["pendaftaran", "SELECT count(*) FROM pendaftaran", 43832],
  ["  pasca_asli", "SELECT count(*) FROM pendaftaran WHERE sumber = 'pasca_asli'", 27034],
  ["  sarjana_dummy", "SELECT count(*) FROM pendaftaran WHERE sumber = 'sarjana_dummy'", 16798],
  ["  flag_tahun_teks", "SELECT count(*) FROM pendaftaran WHERE flag_tahun_teks = 1", 3783],
  ["  dup_keep=0", "SELECT count(*) FROM pendaftaran WHERE dup_keep = 0", 27],
  ["program_studi", "SELECT count(*) FROM program_studi", 211],
  ["fakultas", "SELECT count(*) FROM fakultas", 19],
  ["jenjang", "SELECT count(*) FROM jenjang", 7],
  ["jalur_masuk", "SELECT count(*) FROM jalur_masuk", 8],
  ["daya_tampung", "SELECT count(*) FROM daya_tampung", 1266],
  ["daya_tampung_jalur", "SELECT count(*) FROM daya_tampung_jalur", 72],
];
let failed = 0;
for (const [label, sql, expected] of checks) {
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
console.log("\nSeed dimuat dan tervalidasi.");
