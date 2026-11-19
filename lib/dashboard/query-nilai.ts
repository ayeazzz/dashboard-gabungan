// Query functions untuk Dashboard Nilai Mahasiswa (Kelengkapan Data Nilai).
// Semua kalkulasi di SQL — bila database offline, fallback ke data mockup dinamis otomatis.
import { getNilaiPool } from "./db";
import {
  DEFAULT_OPTIONS_NILAI,
  getMockNilaiData,
} from "./mock-nilai";
import type {
  FilterOptionsNilai,
  FiltersNilai,
  NilaiData,
} from "./types-nilai";

function nvl(v: string | undefined): string {
  return (v ?? "").trim();
}

function whereClause(f: FiltersNilai): { sql: string; params: (string | null)[] } {
  const conditions: string[] = [];
  const params: (string | null)[] = [];

  if (nvl(f.jenjang)) {
    params.push(f.jenjang);
    conditions.push(`j.nama = $${params.length}`);
  }
  if (nvl(f.fakultas)) {
    params.push(f.fakultas);
    conditions.push(`fa.nama_lengkap = $${params.length}`);
  }
  if (nvl(f.prodi)) {
    params.push(f.prodi);
    conditions.push(`ps.label = $${params.length}`);
  }
  if (nvl(f.kategoriNilai)) {
    params.push(f.kategoriNilai);
    conditions.push(`nm.kategori_nilai = $${params.length}`);
  }
  if (nvl(f.jenisNilai) && f.jenisNilai !== "Null") {
    params.push(f.jenisNilai);
    conditions.push(`nm.jenis_nilai = $${params.length}`);
  } else if (nvl(f.jenisNilai) && f.jenisNilai === "Null") {
    conditions.push(`nm.jenis_nilai IS NULL`);
  }

  const sql = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
  return { sql, params };
}

function baseCte(where: string): string {
  return `
WITH base AS (
  SELECT
    nm.id,
    nm.status_nilai,
    nm.jenis_nilai,
    nm.kategori_nilai,
    fa.nama_lengkap AS fakultas,
    ps.label        AS prodi,
    j.nama          AS jenjang
  FROM nilai_mahasiswa nm
  LEFT JOIN fakultas fa ON fa.id = nm.fakultas_id
  LEFT JOIN program_studi ps ON ps.id = nm.prodi_id
  LEFT JOIN jenjang j ON j.id = nm.jenjang_id
  ${where}
)`;
}

let dbConnectedCache: { val: boolean; time: number } | null = null;

async function isDbConnected(): Promise<boolean> {
  // performance.now(): Date.now() tidak boleh dipakai saat prerender (Next cache components).
  const now = performance.now();
  if (dbConnectedCache && now - dbConnectedCache.time < 10000) {
    return dbConnectedCache.val;
  }
  try {
    const client = await getNilaiPool().connect();
    client.release();
    dbConnectedCache = { val: true, time: now };
    return true;
  } catch {
    dbConnectedCache = { val: false, time: now };
    return false;
  }
}

export async function getFilterOptionsNilai(): Promise<FilterOptionsNilai> {
  if (!(await isDbConnected())) {
    return DEFAULT_OPTIONS_NILAI;
  }
  try {
    const { rows } = await getNilaiPool().query(`
      SELECT json_build_object(
        'jenjang',  (SELECT json_agg(nama ORDER BY id) FROM jenjang),
        'fakultas', (SELECT json_agg(nama_lengkap ORDER BY id) FROM fakultas),
        'prodi',    (SELECT json_agg(label ORDER BY label) FROM program_studi),
        'fakultasByJenjang', (
          SELECT json_object_agg(j_nama, faks) FROM (
            SELECT j.nama AS j_nama, json_agg(DISTINCT fa.nama_lengkap ORDER BY fa.nama_lengkap) AS faks
            FROM program_studi ps
            JOIN jenjang j ON j.id = ps.jenjang_id
            JOIN fakultas fa ON fa.id = ps.fakultas_id
            GROUP BY j.id, j.nama
          ) jf
        ),
        'prodiByJenjang', (
          SELECT json_object_agg(j_nama, prodis) FROM (
            SELECT j.nama AS j_nama, json_agg(ps.label ORDER BY ps.label) AS prodis
            FROM program_studi ps
            JOIN jenjang j ON j.id = ps.jenjang_id
            GROUP BY j.id, j.nama
          ) jp
        ),
        'prodiByFakultas', (
          SELECT json_object_agg(f_nama, prodis) FROM (
            SELECT fa.nama_lengkap AS f_nama, json_agg(ps.label ORDER BY ps.label) AS prodis
            FROM program_studi ps
            JOIN fakultas fa ON fa.id = ps.fakultas_id
            GROUP BY fa.id, fa.nama_lengkap
          ) fp
        )
      ) AS options
    `);
    return (rows[0]?.options as FilterOptionsNilai) ?? DEFAULT_OPTIONS_NILAI;
  } catch {
    return DEFAULT_OPTIONS_NILAI;
  }
}


export async function getNilaiData(f: FiltersNilai): Promise<NilaiData> {
  if (!(await isDbConnected())) {
    return getMockNilaiData(f);
  }
  try {
    const pool = getNilaiPool();
    const { sql: where, params } = whereClause(f);
    const cte = baseCte(where);

    const [kpiQ, sebaranQ, jenisQ, prodiQ, kategoriQ] = await Promise.all([
      pool.query<{
        total_transaksi: number;
        jumlah_prodi: number;
        jumlah_lengkap: number;
        jumlah_tidak_lengkap: number;
        jumlah_null: number;
      }>(
        `${cte}
        SELECT
          (SELECT count(*)::int FROM base)                                                AS total_transaksi,
          (SELECT count(DISTINCT prodi) FROM base WHERE prodi IS NOT NULL)                AS jumlah_prodi,
          (SELECT count(*)::int FROM base WHERE status_nilai = 'Lengkap')                AS jumlah_lengkap,
          (SELECT count(*)::int FROM base WHERE status_nilai = 'Tidak Lengkap')          AS jumlah_tidak_lengkap,
          (SELECT count(*)::int FROM base WHERE status_nilai = 'Null')                   AS jumlah_null`,
        params,
      ),
      pool.query<{ fakultas: string; lengkap: number; tidak_lengkap: number; null_val: number }>(
        `${cte}
        SELECT
          fakultas,
          sum(CASE WHEN status_nilai = 'Lengkap'        THEN 1 ELSE 0 END)::int AS lengkap,
          sum(CASE WHEN status_nilai = 'Tidak Lengkap'  THEN 1 ELSE 0 END)::int AS tidak_lengkap,
          sum(CASE WHEN status_nilai = 'Null'           THEN 1 ELSE 0 END)::int AS null_val
        FROM base
        WHERE fakultas IS NOT NULL
        GROUP BY fakultas
        ORDER BY fakultas`,
        params,
      ),
      pool.query<{ jenis: string; jumlah: number }>(
        `${cte}
        SELECT
          coalesce(jenis_nilai, 'Null') AS jenis,
          count(*)::int                 AS jumlah
        FROM base
        GROUP BY jenis_nilai
        ORDER BY jumlah DESC`,
        params,
      ),
      pool.query<{
        fakultas: string;
        prodi: string;
        jumlah_lengkap: number;
        jumlah_tidak_lengkap: number;
        jumlah_null: number;
      }>(
        `${cte}
        SELECT
          fakultas,
          prodi,
          sum(CASE WHEN status_nilai = 'Lengkap'        THEN 1 ELSE 0 END)::int AS jumlah_lengkap,
          sum(CASE WHEN status_nilai = 'Tidak Lengkap'  THEN 1 ELSE 0 END)::int AS jumlah_tidak_lengkap,
          sum(CASE WHEN status_nilai = 'Null'           THEN 1 ELSE 0 END)::int AS jumlah_null
        FROM base
        WHERE fakultas IS NOT NULL AND prodi IS NOT NULL
        GROUP BY fakultas, prodi
        ORDER BY fakultas, prodi`,
        params,
      ),
      pool.query<{ label: string; jumlah: number }>(
        `${cte}
        SELECT kategori_nilai AS label, count(*)::int AS jumlah
        FROM base
        GROUP BY kategori_nilai
        ORDER BY
          CASE kategori_nilai
            WHEN 'Reguler'      THEN 1
            WHEN 'Perbaikan'    THEN 2
            WHEN 'Alih Kredit'  THEN 3
            ELSE 4
          END`,
        params,
      ),
    ]);

    const k = kpiQ.rows[0];
    const total = k.total_transaksi;

    return {
      kpi: {
        totalTransaksi: total,
        jumlahProdi: k.jumlah_prodi,
        jumlahLengkap: k.jumlah_lengkap,
        pctLengkap: total > 0 ? k.jumlah_lengkap / total : null,
        jumlahTidakLengkap: k.jumlah_tidak_lengkap,
        pctTidakLengkap: total > 0 ? k.jumlah_tidak_lengkap / total : null,
        jumlahNull: k.jumlah_null,
        pctNull: total > 0 ? k.jumlah_null / total : null,
      },
      sebaranFakultas: sebaranQ.rows.map((r) => ({
        fakultas: r.fakultas,
        lengkap: r.lengkap,
        tidakLengkap: r.tidak_lengkap,
        nilaiNull: r.null_val,
      })),
      jenisNilai: jenisQ.rows,
      prodiSummary: prodiQ.rows.map((r) => ({
        fakultas: r.fakultas,
        prodi: r.prodi,
        jumlahLengkap: r.jumlah_lengkap,
        jumlahTidakLengkap: r.jumlah_tidak_lengkap,
        jumlahNull: r.jumlah_null,
      })),
      kategoriNilai: kategoriQ.rows,
    };
  } catch {
    return getMockNilaiData(f);
  }
}
