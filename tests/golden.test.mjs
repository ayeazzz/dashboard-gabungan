// Angka acuan dari sheet `Dashboard`/`Calc` pada workbook.
// Tes ini menguji data + SQL, bukan tampilan: kalau seed atau skema berubah,
// angka KPI di layar akan ikut berubah dan tes ini menangkapnya lebih dulu.
import { test, after } from "node:test";
import assert from "node:assert/strict";
import { Client } from "pg";

const rawUrl =
  process.env.DATABASE_URL ?? "postgres://smup:smup@localhost:55432/dashboard_smup";
const isSupabase = rawUrl.includes("supabase.com");

const client = new Client({
  connectionString: isSupabase ? rawUrl.replace(/[?&]sslmode=[^&]+/, "") : rawUrl,
  ssl: isSupabase ? { rejectUnauthorized: false } : undefined,
});
await client.connect();
after(() => client.end());

const one = async (sql) => (await client.query(sql)).rows[0];

test("jumlah baris hasil load seed", async () => {
  const r = await one(`
    SELECT count(*)::int AS total,
           count(*) FILTER (WHERE sumber = 'pasca_asli')::int AS pasca,
           count(*) FILTER (WHERE sumber = 'sarjana_dummy')::int AS sarjana,
           count(*) FILTER (WHERE flag_tahun_teks = 1)::int AS teks,
           count(*) FILTER (WHERE dup_keep = 0)::int AS dup
    FROM pendaftaran`);
  assert.deepEqual(r, { total: 43832, pasca: 27034, sarjana: 16798, teks: 3783, dup: 27 });
});

test("KPI SMUP mengikuti baris non-tahun-teks", async () => {
  const r = await one(`
    SELECT count(*)::int AS pendaftar,
           sum(flag_lulus)::int AS diterima,
           sum(flag_regist)::int AS registrasi
    FROM pendaftaran WHERE flag_tahun_teks = 0`);
  assert.deepEqual(r, { pendaftar: 40049, diterima: 22366, registrasi: 20349 });
});

test("mode Dedup hanya membuang baris ganda", async () => {
  const r = await one(`
    SELECT count(*)::int AS pendaftar, sum(flag_lulus)::int AS diterima
    FROM pendaftaran WHERE flag_tahun_teks = 0 AND dup_keep = 1`);
  assert.deepEqual(r, { pendaftar: 40022, diterima: 22364 });
});

test("daya tampung efektif 2025 = 14.471 (rincian per jalur menimpa kuota tahunan)", async () => {
  const r = await one(`
    SELECT sum(COALESCE(jt.total, dt.daya_tampung))::int AS total
    FROM daya_tampung dt
    LEFT JOIN (SELECT prodi_id, tahun, sum(daya_tampung)::int AS total
               FROM daya_tampung_jalur GROUP BY prodi_id, tahun) jt
      ON jt.prodi_id = dt.prodi_id AND jt.tahun = dt.tahun
    WHERE dt.tahun = 2025`);
  assert.equal(r.total, 14471);
});

test("rata-rata keketatan per prodi mendekati 54,49%", async () => {
  const r = await one(`
    WITH per AS (
      SELECT prodi_id, count(*)::int AS p, sum(flag_lulus)::int AS d
      FROM pendaftaran WHERE prodi_id IS NOT NULL GROUP BY prodi_id
    )
    SELECT avg(d::numeric / p)::float8 AS rata FROM per WHERE p > 0`);
  assert.ok(Math.abs(r.rata - 0.5448538047) < 0.002, `rata-rata ${r.rata}`);
});

test("prodi terfavorit peringkat 1 = Apoteker (Profesi) dengan 1.921 pendaftar", async () => {
  const r = await one(`
    SELECT ps.label, count(*)::int AS pendaftar
    FROM program_studi ps JOIN pendaftaran p ON p.prodi_id = ps.id
    GROUP BY ps.id ORDER BY 2 DESC, 1 LIMIT 1`);
  assert.deepEqual(r, { label: "Apoteker (Profesi)", pendaftar: 1921 });
});

test("status verifikasi memakai pencocokan awalan, total 43.157", async () => {
  const r = await one(`
    SELECT sum(CASE WHEN status_verifikasi LIKE 'Terverifikasi%' THEN 1 ELSE 0 END)::int AS terverifikasi,
           sum(CASE WHEN status_verifikasi LIKE 'Menunggu%' THEN 1 ELSE 0 END)::int AS menunggu,
           sum(CASE WHEN status_verifikasi LIKE 'Ditolak%' THEN 1 ELSE 0 END)::int AS ditolak
    FROM pendaftaran`);
  assert.deepEqual(r, { terverifikasi: 38024, menunggu: 1962, ditolak: 3171 });
  assert.equal(r.terverifikasi + r.menunggu + r.ditolak, 43157);
});

test("distribusi jalur berjumlah sama dengan pendaftar", async () => {
  const r = await one(`
    SELECT sum(n)::int AS total FROM (
      SELECT count(*)::int AS n FROM pendaftaran WHERE flag_tahun_teks = 0 GROUP BY jalur_id
    ) x`);
  assert.equal(r.total, 40049);
});
