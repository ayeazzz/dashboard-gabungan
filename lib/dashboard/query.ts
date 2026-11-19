// Satu-satunya tempat angka dashboard dihitung. Komponen tidak menghitung apa pun.
// Semantik mengikuti sheet `Calc` / `Calc_Prodi` di workbook acuan.
import { pool } from "./db";
import { VALID_PAIRS_SQL } from "./master";
import {
  MOCK_FILTER_OPTIONS,
  getMockPmbData,
  getMockSmupData,
} from "./mock-smup";
import type {
  FilterOptions,
  Filters,
  MatrixRow,
  PmbData,
  ProdiRow,
  SmupData,
  VerifikasiRow,
} from "./types";

let dbConnectedCache: { val: boolean; time: number } | null = null;

async function isDbConnected(): Promise<boolean> {
  const now = Date.now();
  if (dbConnectedCache && now - dbConnectedCache.time < 10000) {
    return dbConnectedCache.val;
  }
  try {
    const client = await pool.connect();
    client.release();
    dbConnectedCache = { val: true, time: now };
    return true;
  } catch {
    dbConnectedCache = { val: false, time: now };
    return false;
  }
}

// Urutan tetap seperti grafik distribusi jalur di sheet Dashboard.
const JALUR_ORDER = [
  "Reguler",
  "Internal",
  "RPL",
  "Double Degree",
  "Berbasis Project",
  "SNBP",
  "SNBT",
  "Mandiri",
];

// jsonb berisi filter aktif + tahun acuan. Satu parameter untuk semua query.
function json(f: Filters, refYear: number, drop: (keyof Filters)[] = []): string {
  const v: Record<string, string | number> = {
    jenjang: f.jenjang,
    jalur: f.jalur,
    fakultas: f.fakultas,
    prodi: f.prodi,
    tahun: f.tahun ?? "",
    mode: f.mode,
    refYear,
  };
  for (const k of drop) v[k] = "";
  return JSON.stringify(v);
}

// Baris mentah yang boleh masuk metrik Excel: flag_tahun_teks = 0.
const baseCte = (opts: { teks: boolean }) => `
WITH f AS (SELECT $1::jsonb AS v),
base AS (
  SELECT p.id, p.prodi_id, p.tahun_masuk, p.flag_lulus, p.flag_regist,
         p.tgl_daftar, p.status_verifikasi, p.flag_tahun_teks,
         j.id AS jenjang_id, j.nama AS jenjang,
         jm.id AS jalur_id, jm.nama AS jalur,
         fa.nama_lengkap AS fakultas,
         ps.label AS prodi
  FROM pendaftaran p
  JOIN jenjang j ON j.id = p.jenjang_id
  JOIN jalur_masuk jm ON jm.id = p.jalur_id
  LEFT JOIN fakultas fa ON fa.id = p.fakultas_id
  LEFT JOIN program_studi ps ON ps.id = p.prodi_id
  CROSS JOIN f
  WHERE true
    ${opts.teks ? "AND p.flag_tahun_teks = 0" : ""}
    AND (j.nama, jm.nama) IN ${VALID_PAIRS_SQL}
    AND ((f.v->>'jenjang') = '' OR j.nama = f.v->>'jenjang')
    AND ((f.v->>'jalur') = '' OR jm.nama = f.v->>'jalur')
    AND ((f.v->>'fakultas') = '' OR fa.nama_lengkap = f.v->>'fakultas')
    AND ((f.v->>'prodi') = '' OR ps.label = f.v->>'prodi')
    AND ((f.v->>'tahun') = '' OR p.tahun_masuk = (f.v->>'tahun')::int)
    AND ((f.v->>'mode') <> 'dedup' OR p.dup_keep = 1)
)`;

// Daya tampung efektif: pakai rincian per jalur bila ada, kalau tidak pakai kuota tahunan.
// Jalur yang tidak valid untuk jenjang tertentu (misal SNBP untuk Magister) menghasilkan daya tampung 0.
// Validitas memakai aturan master (lib/dashboard/master.ts), bukan data pendaftaran.
const dtCte = `
valid_jalur AS (
  SELECT j.id AS jenjang_id, jm.id AS jalur_id
  FROM jenjang j
  JOIN jalur_masuk jm ON (j.nama, jm.nama) IN ${VALID_PAIRS_SQL}
),
dt_eff AS (
  SELECT dt.prodi_id,
         CASE
           WHEN (f.v->>'jalur') = '' THEN
             coalesce(jt.total, dt.daya_tampung)
           WHEN dtj.daya_tampung IS NOT NULL THEN
             dtj.daya_tampung
           WHEN jt.total IS NOT NULL THEN
             0
           WHEN vj.jalur_id IS NOT NULL THEN
             dt.daya_tampung
           ELSE 0
         END AS nilai
  FROM daya_tampung dt
  JOIN program_studi ps ON ps.id = dt.prodi_id
  JOIN jenjang j ON j.id = ps.jenjang_id
  JOIN fakultas fa ON fa.id = ps.fakultas_id
  CROSS JOIN f
  LEFT JOIN (SELECT prodi_id, tahun, sum(daya_tampung)::int AS total
             FROM daya_tampung_jalur GROUP BY prodi_id, tahun) jt
    ON jt.prodi_id = dt.prodi_id AND jt.tahun = dt.tahun
  LEFT JOIN daya_tampung_jalur dtj
    ON dtj.prodi_id = dt.prodi_id AND dtj.tahun = dt.tahun
   AND dtj.jalur_id = (SELECT id FROM jalur_masuk WHERE nama = f.v->>'jalur')
  LEFT JOIN valid_jalur vj
    ON vj.jenjang_id = ps.jenjang_id
   AND vj.jalur_id = (SELECT id FROM jalur_masuk WHERE nama = f.v->>'jalur')
  WHERE dt.tahun = (f.v->>'refYear')::int
    AND ((f.v->>'jenjang') = '' OR j.nama = f.v->>'jenjang')
    AND ((f.v->>'fakultas') = '' OR fa.nama_lengkap = f.v->>'fakultas')
    AND ((f.v->>'prodi') = '' OR ps.label = f.v->>'prodi')
)`;

export async function getFilterOptions(): Promise<FilterOptions> {
  if (!(await isDbConnected())) {
    return MOCK_FILTER_OPTIONS;
  }
  try {
    const { rows } = await pool.query(`
      SELECT json_build_object(
        'jenjang',  (SELECT json_agg(nama ORDER BY id) FROM jenjang),
        'jalur',    (SELECT json_agg(nama ORDER BY id) FROM jalur_masuk),
        'fakultas', (SELECT json_agg(nama_lengkap ORDER BY id) FROM fakultas),
        'prodi',    (SELECT json_agg(label ORDER BY label) FROM program_studi),
        'tahun',    (SELECT json_agg(t ORDER BY t) FROM (SELECT DISTINCT tahun_masuk AS t FROM pendaftaran) x),
        'jalurByJenjang', (
          SELECT json_object_agg(j_nama, jalurs) FROM (
            SELECT j.nama AS j_nama, json_agg(DISTINCT jm.nama ORDER BY jm.nama) AS jalurs
            FROM (
              SELECT j2.id AS jenjang_id, jm2.id AS jalur_id
              FROM jenjang j2
              JOIN jalur_masuk jm2 ON (j2.nama, jm2.nama) IN ${VALID_PAIRS_SQL}
            ) v
            JOIN jenjang j ON j.id = v.jenjang_id
            JOIN jalur_masuk jm ON jm.id = v.jalur_id
            GROUP BY j.id, j.nama
          ) jj
        ),
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
    return rows[0].options as FilterOptions;
  } catch {
    return MOCK_FILTER_OPTIONS;
  }
}

async function refYearFor(f: Filters): Promise<number> {
  if (f.tahun) return f.tahun;
  const { rows } = await pool.query("SELECT max(tahun)::int AS t FROM daya_tampung");
  return rows[0].t as number;
}

type PerProdiSqlRow = {
  prodi: string;
  fakultas: string;
  jenjang: string;
  pendaftar: number;
  diterima: number;
  registrasi: number;
  pendaftar_acuan: number;
  registrasi_acuan: number;
  daya_tampung: number;
};

function toProdiRows(rows: PerProdiSqlRow[]): ProdiRow[] {
  const out: ProdiRow[] = rows.map((r) => ({
    prodi: r.prodi,
    fakultas: r.fakultas,
    jenjang: r.jenjang,
    pendaftar: r.pendaftar,
    diterima: r.diterima,
    registrasi: r.registrasi,
    pendaftarAcuan: r.pendaftar_acuan,
    registrasiAcuan: r.registrasi_acuan,
    dayaTampung: r.daya_tampung,
    keketatan: r.pendaftar > 0 ? r.diterima / r.pendaftar : null,
    persaingan: r.diterima > 0 ? r.pendaftar / r.diterima : null,
    rasio: r.daya_tampung > 0 ? r.pendaftar_acuan / r.daya_tampung : null,
    keterisian: r.daya_tampung > 0 ? r.registrasi_acuan / r.daya_tampung : null,
    peringkat: null,
  }));

  // Peringkat ala RANK(): nilai sama dapat peringkat sama, lalu nomor melompat.
  const ranked = out.filter((r) => r.keketatan !== null).sort((a, b) => a.keketatan! - b.keketatan!);
  let prev: number | null = null;
  let rank = 0;
  ranked.forEach((r, i) => {
    if (prev === null || r.keketatan !== prev) {
      rank = i + 1;
      prev = r.keketatan!;
    }
    r.peringkat = rank;
  });
  return out;
}

function toMatrix(
  rows: { prodi: string; tahun: number; pendaftar: number; diterima: number; registrasi: number }[],
  years: number[],
  labels: string[],
): MatrixRow[] {
  const empty = () => ({ p: years.map(() => 0), d: years.map(() => 0), r: years.map(() => 0) });
  const byProdi = new Map(labels.map((l) => [l, empty()]));
  for (const row of rows) {
    const i = years.indexOf(row.tahun);
    const acc = byProdi.get(row.prodi);
    if (i < 0 || !acc) continue;
    acc.p[i] += row.pendaftar;
    acc.d[i] += row.diterima;
    acc.r[i] += row.registrasi;
  }

  return [...byProdi.entries()].map(([prodi, a]) => {
    const sum = (xs: number[]) => xs.reduce((x, y) => x + y, 0);
    const tp = sum(a.p);
    const td = sum(a.d);
    return {
      prodi,
      keketatan: a.p.map((p, i) => (p > 0 ? a.d[i] / p : null)),
      keketatanTotal: tp > 0 ? td / tp : null,
      registrasi: a.d.map((d, i) => (d > 0 ? a.r[i] / d : null)),
      registrasiTotal: td > 0 ? sum(a.r) / td : null,
    };
  });
}

export async function getSmupData(f: Filters): Promise<SmupData> {
  if (!(await isDbConnected())) {
    return getMockSmupData(f);
  }
  try {
    const refYear = await refYearFor(f);
    const all = json(f, refYear);
    // Tabel & peringkat: filter Prodi tidak dipakai (lihat kontrak di rencana).
    const table = json(f, refYear, ["prodi"]);
    // Matriks historis: Tahun juga tidak dipakai.
    const historic = json(f, refYear, ["prodi", "tahun"]);

    const [kpiQ, jalurQ, fakultasQ, prodiQ, matrixQ] = await Promise.all([
      pool.query(
        `${baseCte({ teks: true })},
        ${dtCte}
        SELECT
          (SELECT count(*)::int FROM base) AS pendaftar,
          (SELECT coalesce(sum(flag_lulus), 0)::int FROM base) AS diterima,
          (SELECT coalesce(sum(flag_regist), 0)::int FROM base) AS registrasi,
          (SELECT coalesce(sum(nilai), 0)::int FROM dt_eff) AS daya_tampung,
          (SELECT count(*)::int FROM dt_eff) AS prodi_scope,
          (SELECT count(*)::int FROM pendaftaran p JOIN jenjang jj ON jj.id = p.jenjang_id
            WHERE p.dup_keep = 0
              AND (($1::jsonb->>'jenjang') = '' OR jj.nama = $1::jsonb->>'jenjang')) AS duplikat,
          (SELECT array_agg(DISTINCT tahun_masuk ORDER BY tahun_masuk) FROM pendaftaran) AS tahun`,
        [all],
      ),
      pool.query(
        `${baseCte({ teks: true })}
        SELECT b.jalur AS label, count(*)::int AS value
        FROM base b GROUP BY b.jalur_id, b.jalur ORDER BY b.jalur_id`,
        [all],
      ),
      pool.query(
        `${baseCte({ teks: true })}
        SELECT regexp_replace(b.fakultas, '^[0-9]+ - ', '') AS label,
               count(*)::int AS pendaftar,
               coalesce(sum(b.flag_lulus), 0)::int AS diterima,
               coalesce(sum(b.flag_regist), 0)::int AS registrasi
        FROM base b
        WHERE b.fakultas IS NOT NULL
        GROUP BY 1
        ORDER BY 2 DESC`,
        [all],
      ),
      pool.query(
        `${baseCte({ teks: false })},
        per AS (
          SELECT ps.id, ps.label AS prodi, fa.nama_lengkap AS fakultas, j.nama AS jenjang,
                 count(b.id)::int AS pendaftar,
                 coalesce(sum(b.flag_lulus), 0)::int AS diterima,
                 coalesce(sum(b.flag_regist), 0)::int AS registrasi,
                 sum(CASE WHEN b.tahun_masuk = (f.v->>'refYear')::int THEN 1 ELSE 0 END)::int AS pendaftar_acuan,
                 coalesce(sum(CASE WHEN b.tahun_masuk = (f.v->>'refYear')::int THEN b.flag_regist ELSE 0 END), 0)::int AS registrasi_acuan
          FROM program_studi ps
          JOIN jenjang j ON j.id = ps.jenjang_id
          JOIN fakultas fa ON fa.id = ps.fakultas_id
          CROSS JOIN f
          LEFT JOIN base b ON b.prodi_id = ps.id
          WHERE ((f.v->>'jenjang') = '' OR j.nama = f.v->>'jenjang')
            AND ((f.v->>'fakultas') = '' OR fa.nama_lengkap = f.v->>'fakultas')
          GROUP BY ps.id, ps.label, fa.nama_lengkap, j.nama
        ),
        ${dtCte}
        SELECT per.*, coalesce(dt_eff.nilai, 0)::int AS daya_tampung
        FROM per LEFT JOIN dt_eff ON dt_eff.prodi_id = per.id
        ORDER BY per.prodi`,
        [table],
      ),
      pool.query(
        `${baseCte({ teks: false })}
        SELECT b.prodi, b.tahun_masuk AS tahun,
               count(*)::int AS pendaftar,
               coalesce(sum(b.flag_lulus), 0)::int AS diterima,
               coalesce(sum(b.flag_regist), 0)::int AS registrasi
        FROM base b
        WHERE b.prodi IS NOT NULL
        GROUP BY b.prodi, b.tahun_masuk
        ORDER BY b.prodi`,
        [historic],
      ),
    ]);

    const k = kpiQ.rows[0];
    const prodi = toProdiRows(prodiQ.rows as PerProdiSqlRow[]);
    const years = (k.tahun as number[]).filter((y) => y >= 2020 && y <= 2025);
    const berdata = prodi.filter((r) => r.pendaftar > 0);

    const byScores = <T>(rows: T[], score: (r: T) => number | null) =>
      rows
        .filter((r) => score(r) !== null && score(r)! > 0)
        .sort((a, b) => score(b)! - score(a)!)
        .slice(0, 10);

    // Urutan tetap seperti grafik distribusi jalur di sheet Dashboard.
    const jalur = [...jalurQ.rows].sort(
      (a, b) =>
        (JALUR_ORDER.indexOf(a.label) + 1 || 99) - (JALUR_ORDER.indexOf(b.label) + 1 || 99),
    );

    return {
      kpi: {
        pendaftar: k.pendaftar,
        diterima: k.diterima,
        registrasi: k.registrasi,
        dayaTampung: k.daya_tampung,
        rataKeketatan: berdata.length
          ? berdata.reduce((a, r) => a + r.keketatan!, 0) / berdata.length
          : null,
        keketatanGabungan: k.pendaftar > 0 ? k.diterima / k.pendaftar : null,
        pctRegistrasi: k.diterima > 0 ? k.registrasi / k.diterima : null,
        tahunAcuan: refYear,
        prodiScope: k.prodi_scope,
        prodiBerdata: berdata.length,
        duplikat: k.duplikat,
      },
      tahun: years,
      jalur,
      fakultas: fakultasQ.rows,
      prodi,
      topFavorit: byScores(prodi, (r) => r.pendaftar),
      topRasio: byScores(prodi, (r) => r.rasio),
      matrix: toMatrix(matrixQ.rows, years, prodi.map((p) => p.prodi)),
    };
  } catch {
    return getMockSmupData(f);
  }
}

// PMB sengaja tidak memakai filter Tahun dan tidak membuang baris tahun-teks,
// persis seperti COUNTIFS di sheet Calc (tanpa kriteria PTahunMasuk).
const pmbBase = (teks: boolean) => `
WITH f AS (SELECT $1::jsonb AS v),
base AS (
  SELECT p.id, p.prodi_id, p.tgl_daftar, p.status_verifikasi, p.flag_tahun_teks
  FROM pendaftaran p
  JOIN jenjang j ON j.id = p.jenjang_id
  JOIN jalur_masuk jm ON jm.id = p.jalur_id
  LEFT JOIN fakultas fa ON fa.id = p.fakultas_id
  LEFT JOIN program_studi ps ON ps.id = p.prodi_id
  CROSS JOIN f
  WHERE true
    ${teks ? "AND p.flag_tahun_teks = 0" : ""}
    AND ((f.v->>'jenjang') = '' OR j.nama = f.v->>'jenjang')
    AND ((f.v->>'jalur') = '' OR jm.nama = f.v->>'jalur')
    AND ((f.v->>'fakultas') = '' OR fa.nama_lengkap = f.v->>'fakultas')
    AND ((f.v->>'prodi') = '' OR ps.label = f.v->>'prodi')
    AND ((f.v->>'mode') <> 'dedup' OR p.dup_keep = 1)
)`;

export async function getPmbData(f: Filters): Promise<PmbData> {
  if (!(await isDbConnected())) {
    return getMockPmbData(f);
  }
  try {
    const all = json(f, 0, ["tahun"]);

    const [kpiQ, harianQ, verifQ] = await Promise.all([
      pool.query(
        `${pmbBase(false)},
        mx AS (SELECT max(tgl_daftar::date) AS d FROM base)
        SELECT
          (SELECT count(*)::int FROM base WHERE tgl_daftar::date = (SELECT d FROM mx)) AS hari_ini,
          (SELECT d::text FROM mx) AS tanggal_terakhir,
          (SELECT sum(CASE WHEN status_verifikasi LIKE 'Terverifikasi%' THEN 1 ELSE 0 END)::int FROM base) AS terverifikasi,
          (SELECT sum(CASE WHEN status_verifikasi LIKE 'Menunggu%' THEN 1 ELSE 0 END)::int FROM base) AS menunggu,
          (SELECT sum(CASE WHEN status_verifikasi LIKE 'Ditolak%' THEN 1 ELSE 0 END)::int FROM base) AS ditolak,
          (SELECT count(*)::int FROM base WHERE flag_tahun_teks = 0) AS total_pendaftar`,
        [all],
      ),
      pool.query(
        `${pmbBase(false)},
        mx AS (SELECT max(tgl_daftar::date) AS d FROM base)
        SELECT g::date::text AS tanggal, count(b.id)::int AS value
        FROM generate_series(((SELECT d FROM mx) - 29)::timestamp,
                             (SELECT d FROM mx)::timestamp,
                             interval '1 day') g
        LEFT JOIN base b ON b.tgl_daftar >= g AND b.tgl_daftar < g + interval '1 day'
        GROUP BY g
        ORDER BY g`,
        [all],
      ),
      pool.query(
        `${pmbBase(false)}
        SELECT ps.label AS prodi,
               sum(CASE WHEN b.status_verifikasi LIKE 'Menunggu%' THEN 1 ELSE 0 END)::int AS menunggu,
               sum(CASE WHEN b.status_verifikasi LIKE 'Terverifikasi%' THEN 1 ELSE 0 END)::int AS terverifikasi,
               sum(CASE WHEN b.status_verifikasi LIKE 'Ditolak%' THEN 1 ELSE 0 END)::int AS ditolak
        FROM program_studi ps
        JOIN jenjang j ON j.id = ps.jenjang_id
        JOIN fakultas fa ON fa.id = ps.fakultas_id
        CROSS JOIN f
        LEFT JOIN base b ON b.prodi_id = ps.id
        WHERE ((f.v->>'jenjang') = '' OR j.nama = f.v->>'jenjang')
          AND ((f.v->>'fakultas') = '' OR fa.nama_lengkap = f.v->>'fakultas')
        GROUP BY ps.label
        ORDER BY sum(CASE WHEN b.status_verifikasi LIKE 'Menunggu%'
                            OR b.status_verifikasi LIKE 'Terverifikasi%'
                            OR b.status_verifikasi LIKE 'Ditolak%' THEN 1 ELSE 0 END) DESC`,
        [all],
      ),
    ]);

    const k = kpiQ.rows[0];
    const harian = harianQ.rows as { tanggal: string; value: number }[];
    const perProdi: VerifikasiRow[] = verifQ.rows.map((r) => ({
      prodi: r.prodi,
      menunggu: r.menunggu,
      terverifikasi: r.terverifikasi,
      ditolak: r.ditolak,
      total: r.menunggu + r.terverifikasi + r.ditolak,
    }));

    return {
      kpi: {
        hariIni: k.hari_ini,
        tanggalTerakhir: k.tanggal_terakhir,
        rataHarian: harian.length ? harian.reduce((a, d) => a + d.value, 0) / harian.length : null,
        terverifikasi: k.terverifikasi,
        menunggu: k.menunggu,
        ditolak: k.ditolak,
        totalPendaftar: k.total_pendaftar,
      },
      harian,
      perProdi,
    };
  } catch {
    return getMockPmbData(f);
  }
}
