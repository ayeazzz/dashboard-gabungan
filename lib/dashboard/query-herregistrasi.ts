// Query functions untuk Dashboard Herregistrasi dan KRS.
// Semua kalkulasi di SQL — bila database offline, fallback ke data mockup otomatis.
import { getHerregPool } from "./db";
import {
  DEFAULT_OPTIONS_HERREGISTRASI,
  getMockHerregistrasiData,
} from "./mock-herregistrasi";
import type {
  FiltersHerregistrasi,
  FilterOptionsHerregistrasi,
  HerregistrasiData,
} from "./types-herregistrasi";

// ─── Helper ─────────────────────────────────────────────────────────────────

function buildWhere(f: FiltersHerregistrasi): { where: string; params: string[] } {
  const conditions: string[] = ["1=1"];
  const params: string[] = [];
  let idx = 1;

  if (f.jenjang) {
    conditions.push(`j.nama = $${idx++}`);
    params.push(f.jenjang);
  }
  if (f.fakultas) {
    conditions.push(`fa.nama_lengkap = $${idx++}`);
    params.push(f.fakultas);
  }
  if (f.prodi) {
    conditions.push(`ps.label = $${idx++}`);
    params.push(f.prodi);
  }
  if (f.statusHerregistrasi) {
    conditions.push(`ma.status_herregistrasi = $${idx++}`);
    params.push(f.statusHerregistrasi);
  }
  if (f.statusKrs) {
    conditions.push(`ma.status_krs = $${idx++}`);
    params.push(f.statusKrs);
  }

  return { where: `WHERE ${conditions.join(" AND ")}`, params };
}

const JOINS = `
  FROM mahasiswa_aktif ma
  LEFT JOIN fakultas fa ON fa.id = ma.fakultas_id
  LEFT JOIN program_studi ps ON ps.id = ma.prodi_id
  LEFT JOIN jenjang j ON j.id = ma.jenjang_id
`;

let dbConnectedCache: { val: boolean; time: number } | null = null;

async function isDbConnected(): Promise<boolean> {
  // performance.now(): Date.now() tidak boleh dipakai saat prerender (Next cache components).
  const now = performance.now();
  if (dbConnectedCache && now - dbConnectedCache.time < 10000) {
    return dbConnectedCache.val;
  }
  try {
    const client = await getHerregPool().connect();
    client.release();
    dbConnectedCache = { val: true, time: now };
    return true;
  } catch {
    dbConnectedCache = { val: false, time: now };
    return false;
  }
}

export async function getFilterOptionsHerregistrasi(): Promise<FilterOptionsHerregistrasi> {
  if (!(await isDbConnected())) {
    return DEFAULT_OPTIONS_HERREGISTRASI;
  }
  try {
    const { rows } = await getHerregPool().query(`
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
    return (rows[0]?.options as FilterOptionsHerregistrasi) ?? DEFAULT_OPTIONS_HERREGISTRASI;
  } catch {
    return DEFAULT_OPTIONS_HERREGISTRASI;
  }
}


export async function getHerregistrasiData(f: FiltersHerregistrasi): Promise<HerregistrasiData> {
  if (!(await isDbConnected())) {
    return getMockHerregistrasiData(f);
  }
  try {
    const pool = getHerregPool();
    const { where, params } = buildWhere(f);

    const [kpiQ, statusHQ, jenisHQ, statusKrsQ, distribusiQ, prodiQ] = await Promise.all([
      pool.query(
        `SELECT
          count(*)::int                                                                   AS jumlah_mahasiswa,
          sum(CASE WHEN ma.status_herregistrasi = 'Herregistrasi' THEN 1 ELSE 0 END)::int AS jumlah_herregistrasi,
          sum(CASE WHEN ma.status_krs = 'KRS' THEN 1 ELSE 0 END)::int                   AS jumlah_krs,
          sum(CASE WHEN ma.status_herregistrasi = 'Herregistrasi'
                    AND ma.jenis_herregistrasi <> 'Cuti' THEN 1 ELSE 0 END)::int        AS basis_krs
        ${JOINS}
        ${where}`,
        params,
      ),
      pool.query(
        `SELECT ma.status_herregistrasi AS label, count(*)::int AS jumlah
        ${JOINS}
        ${where}
        GROUP BY ma.status_herregistrasi
        ORDER BY jumlah DESC`,
        params,
      ),
      pool.query(
        `SELECT ma.jenis_herregistrasi AS label, count(*)::int AS jumlah
        ${JOINS}
        ${where}
        AND ma.status_herregistrasi = 'Herregistrasi'
        GROUP BY ma.jenis_herregistrasi
        ORDER BY jumlah DESC`,
        params,
      ),
      pool.query(
        `SELECT ma.status_krs AS label, count(*)::int AS jumlah
        ${JOINS}
        ${where}
        AND ma.status_herregistrasi = 'Herregistrasi'
        AND ma.jenis_herregistrasi <> 'Cuti'
        GROUP BY ma.status_krs
        ORDER BY jumlah DESC`,
        params,
      ),
      pool.query(
        `SELECT
          fa.nama_lengkap                                                                 AS fakultas,
          count(*)::int                                                                   AS jumlah_mahasiswa,
          sum(CASE WHEN ma.status_herregistrasi = 'Herregistrasi' THEN 1 ELSE 0 END)::int AS herregistrasi,
          sum(CASE WHEN ma.status_krs = 'KRS' THEN 1 ELSE 0 END)::int                   AS krs
        ${JOINS}
        ${where}
        AND fa.nama_lengkap IS NOT NULL
        GROUP BY fa.id, fa.nama_lengkap
        ORDER BY count(*) DESC`,
        params,
      ),
      pool.query(
        `SELECT
          coalesce(ps.label, ps.nama_prodi)                                               AS prodi,
          j.nama                                                                          AS jenjang,
          count(*)::int                                                                   AS total,
          sum(CASE WHEN ma.status_herregistrasi = 'Herregistrasi' THEN 1 ELSE 0 END)::int AS herregistrasi,
          sum(CASE WHEN ma.status_herregistrasi = 'Herregistrasi'
                    AND ma.jenis_herregistrasi <> 'Cuti' THEN 1 ELSE 0 END)::int        AS basis_krs,
          sum(CASE WHEN ma.status_krs = 'KRS' THEN 1 ELSE 0 END)::int                   AS krs
        ${JOINS}
        ${where}
        AND ps.nama_prodi IS NOT NULL
        GROUP BY ps.id, coalesce(ps.label, ps.nama_prodi), j.nama
        ORDER BY prodi, j.nama`,
        params,
      ),
    ]);

    const k = kpiQ.rows[0] as {
      jumlah_mahasiswa: number;
      jumlah_herregistrasi: number;
      jumlah_krs: number;
      basis_krs: number;
    };

    const jumlahMahasiswa = k.jumlah_mahasiswa;
    const jumlahHerregistrasi = k.jumlah_herregistrasi;
    const jumlahKrs = k.jumlah_krs;
    const basisKrs = k.basis_krs;

    const pctHerregistrasi = jumlahMahasiswa > 0 ? jumlahHerregistrasi / jumlahMahasiswa : null;
    const pctKrs = basisKrs > 0 ? jumlahKrs / basisKrs : null;

    const prodiSummary = (
      prodiQ.rows as {
        prodi: string;
        jenjang: string;
        total: number;
        herregistrasi: number;
        basis_krs: number;
        krs: number;
      }[]
    ).map((r) => ({
      prodi: r.prodi,
      jenjang: r.jenjang,
      pctHerregistrasi: r.total > 0 ? r.herregistrasi / r.total : null,
      pctKrs: r.basis_krs > 0 ? r.krs / r.basis_krs : null,
    }));

    return {
      kpi: {
        jumlahMahasiswa,
        jumlahHerregistrasi,
        pctHerregistrasi,
        jumlahKrs,
        pctKrs,
      },
      statusHerregistrasi: statusHQ.rows,
      jenisHerregistrasi: jenisHQ.rows,
      statusKrs: statusKrsQ.rows,
      distribusiFakultas: distribusiQ.rows,
      prodiSummary,
      pctHerregistrasiTotal: pctHerregistrasi,
      pctKrsTotal: pctKrs,
    };
  } catch {
    return getMockHerregistrasiData(f);
  }
}
