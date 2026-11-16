// Query functions untuk Dashboard Nilai Mahasiswa (Kelengkapan Data Nilai).
// Semua kalkulasi di SQL — bila database offline, fallback ke data mockup otomatis.
import { pool } from "./db";
import type {
  FilterOptionsNilai,
  FiltersNilai,
  JenisNilaiRow,
  KategoriNilaiRow,
  NilaiData,
  NilaiKpi,
  ProdiSummaryNilaiRow,
  SebaranFakultasRow,
} from "./types-nilai";

function nvl(v: string): string {
  return v.trim();
}

function whereClause(f: FiltersNilai): { sql: string; params: (string | null)[] } {
  const conditions: string[] = [];
  const params: (string | null)[] = [];

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
    ps.label        AS prodi
  FROM nilai_mahasiswa nm
  LEFT JOIN fakultas fa ON fa.id = nm.fakultas_id
  LEFT JOIN program_studi ps ON ps.id = nm.prodi_id
  ${where}
)`;
}

const DEFAULT_OPTIONS_NILAI: FilterOptionsNilai = {
  fakultas: [
    "Ekonomi dan Bisnis", "Farmasi", "Hukum", "Ilmu Budaya",
    "Ilmu Komunikasi", "Ilmu Sosial dan Ilmu Politik", "Kedokteran",
    "Kedokteran Gigi", "Keperawatan", "Matematika dan Ilmu Pengetahuan Alam",
  ],
  prodi: [
    "Akuntan", "Akuntansi", "Akuntansi Perpajakan", "Akuntansi Sektor Publik",
    "Bisnis Digital", "Bisnis Internasional", "Ekonomi", "Ekonomi Islam",
    "Ekonomi Syariah", "Ilmu Ekonomi",
  ],
};

async function isDbConnected(): Promise<boolean> {
  try {
    const client = await pool.connect();
    client.release();
    return true;
  } catch {
    return false;
  }
}

export async function getFilterOptionsNilai(): Promise<FilterOptionsNilai> {
  if (!(await isDbConnected())) {
    return DEFAULT_OPTIONS_NILAI;
  }
  try {
    const { rows } = await pool.query(`
      SELECT json_build_object(
        'fakultas', (SELECT json_agg(nama_lengkap ORDER BY id) FROM fakultas),
        'prodi',    (SELECT json_agg(label ORDER BY label) FROM program_studi)
      ) AS options
    `);
    return (rows[0]?.options as FilterOptionsNilai) ?? DEFAULT_OPTIONS_NILAI;
  } catch {
    return DEFAULT_OPTIONS_NILAI;
  }
}

// Data Mockup Sesuai Gambar 1 bila DB offline
const MOCK_NILAI: NilaiData = {
  kpi: {
    totalTransaksi: 194859,
    jumlahProdi: 143,
    jumlahLengkap: 192396,
    pctLengkap: 0.9874,
    jumlahTidakLengkap: 2052,
    pctTidakLengkap: 0.0105,
    jumlahNull: 411,
    pctNull: 0.0021,
  },
  sebaranFakultas: [
    { fakultas: "Ekonomi dan Bisnis", lengkap: 18500, tidakLengkap: 220, nilaiNull: 45 },
    { fakultas: "Farmasi", lengkap: 8900, tidakLengkap: 85, nilaiNull: 18 },
    { fakultas: "Hukum", lengkap: 12100, tidakLengkap: 110, nilaiNull: 22 },
    { fakultas: "Ilmu Budaya", lengkap: 17800, tidakLengkap: 190, nilaiNull: 38 },
    { fakultas: "Ilmu Komunikasi", lengkap: 16500, tidakLengkap: 175, nilaiNull: 35 },
    { fakultas: "FISIP", lengkap: 17200, tidakLengkap: 180, nilaiNull: 37 },
    { fakultas: "Kedokteran", lengkap: 18900, tidakLengkap: 195, nilaiNull: 40 },
    { fakultas: "Kedokteran Gigi", lengkap: 5900, tidakLengkap: 60, nilaiNull: 12 },
    { fakultas: "Keperawatan", lengkap: 6100, tidakLengkap: 65, nilaiNull: 14 },
    { fakultas: "MIPA", lengkap: 18200, tidakLengkap: 190, nilaiNull: 39 },
  ],
  jenisNilai: [
    { jenis: "A", jumlah: 92020 },
    { jenis: "B", jumlah: 41200 },
    { jenis: "A-", jumlah: 37840 },
    { jenis: "B+", jumlah: 10160 },
    { jenis: "C", jumlah: 3800 },
    { jenis: "B-", jumlah: 4300 },
    { jenis: "Null", jumlah: 2340 },
    { jenis: "C+", jumlah: 1600 },
    { jenis: "E", jumlah: 900 },
    { jenis: "K", jumlah: 700 },
  ],
  prodiSummary: [
    { fakultas: "Ekonomi dan Bisnis", prodi: "Akuntan", jumlahLengkap: 124, jumlahTidakLengkap: 0, jumlahNull: 0 },
    { fakultas: "Ekonomi dan Bisnis", prodi: "Akuntansi", jumlahLengkap: 3673, jumlahTidakLengkap: 27, jumlahNull: 3 },
    { fakultas: "Ekonomi dan Bisnis", prodi: "Akuntansi Perpajakan", jumlahLengkap: 1118, jumlahTidakLengkap: 1, jumlahNull: 0 },
    { fakultas: "Ekonomi dan Bisnis", prodi: "Akuntansi Sektor Publik", jumlahLengkap: 1045, jumlahTidakLengkap: 0, jumlahNull: 0 },
    { fakultas: "Ekonomi dan Bisnis", prodi: "Bisnis Digital", jumlahLengkap: 1673, jumlahTidakLengkap: 24, jumlahNull: 0 },
    { fakultas: "Ekonomi dan Bisnis", prodi: "Bisnis Internasional", jumlahLengkap: 682, jumlahTidakLengkap: 0, jumlahNull: 0 },
    { fakultas: "Ekonomi dan Bisnis", prodi: "Ekonomi", jumlahLengkap: 71, jumlahTidakLengkap: 0, jumlahNull: 1 },
    { fakultas: "Ekonomi dan Bisnis", prodi: "Ekonomi Islam", jumlahLengkap: 2615, jumlahTidakLengkap: 3, jumlahNull: 0 },
    { fakultas: "Ekonomi dan Bisnis", prodi: "Ekonomi Syariah", jumlahLengkap: 388, jumlahTidakLengkap: 72, jumlahNull: 0 },
    { fakultas: "Ekonomi dan Bisnis", prodi: "Ilmu Ekonomi", jumlahLengkap: 2582, jumlahTidakLengkap: 1, jumlahNull: 13 },
  ],
  kategoriNilai: [
    { label: "Lengkap", jumlah: 192400 },
    { label: "Tidak Lengkap", jumlah: 2050 },
    { label: "Null", jumlah: 410 },
  ],
};

export async function getNilaiData(f: FiltersNilai): Promise<NilaiData> {
  if (!(await isDbConnected())) {
    return MOCK_NILAI;
  }
  try {
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
          (SELECT count(DISTINCT ps2.id) FROM program_studi ps2)                         AS jumlah_prodi,
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
        SELECT status_nilai AS label, count(*)::int AS jumlah
        FROM base
        GROUP BY status_nilai
        ORDER BY
          CASE status_nilai
            WHEN 'Lengkap'        THEN 1
            WHEN 'Tidak Lengkap'  THEN 2
            WHEN 'Null'           THEN 3
            ELSE 4
          END`,
        params,
      ),
    ]);

    const k = kpiQ.rows[0];
    const total = k?.total_transaksi || 1;

    const kpi: NilaiKpi = {
      totalTransaksi: k?.total_transaksi ?? 0,
      jumlahProdi: k?.jumlah_prodi ?? 0,
      jumlahLengkap: k?.jumlah_lengkap ?? 0,
      pctLengkap: total > 0 ? (k?.jumlah_lengkap ?? 0) / total : null,
      jumlahTidakLengkap: k?.jumlah_tidak_lengkap ?? 0,
      pctTidakLengkap: total > 0 ? (k?.jumlah_tidak_lengkap ?? 0) / total : null,
      jumlahNull: k?.jumlah_null ?? 0,
      pctNull: total > 0 ? (k?.jumlah_null ?? 0) / total : null,
    };

    const sebaranFakultas: SebaranFakultasRow[] = sebaranQ.rows.map((r) => ({
      fakultas: r.fakultas,
      lengkap: r.lengkap,
      tidakLengkap: r.tidak_lengkap,
      nilaiNull: r.null_val,
    }));

    const jenisNilai: JenisNilaiRow[] = jenisQ.rows.map((r) => ({
      jenis: r.jenis,
      jumlah: r.jumlah,
    }));

    const prodiSummary: ProdiSummaryNilaiRow[] = prodiQ.rows.map((r) => ({
      fakultas: r.fakultas,
      prodi: r.prodi,
      jumlahLengkap: r.jumlah_lengkap,
      jumlahTidakLengkap: r.jumlah_tidak_lengkap,
      jumlahNull: r.jumlah_null,
    }));

    const kategoriNilai: KategoriNilaiRow[] = kategoriQ.rows.map((r) => ({
      label: r.label,
      jumlah: r.jumlah,
    }));

    return { kpi, sebaranFakultas, jenisNilai, prodiSummary, kategoriNilai };
  } catch {
    return MOCK_NILAI;
  }
}
