// Query functions untuk Dashboard Herregistrasi dan KRS.
// Semua kalkulasi di SQL — bila database offline, fallback ke data mockup otomatis.
import { pool } from "./db";
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

  if (f.fakultas) {
    conditions.push(`fa.nama_lengkap = $${idx++}`);
    params.push(f.fakultas);
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

const DEFAULT_FAKULTAS = [
  "11 - Hukum",
  "12 - Ekonomi dan Bisnis",
  "13 - Kedokteran",
  "14 - Matematika dan Ilmu Pengetahuan Alam",
  "15 - Pertanian",
  "16 - Kedokteran Gigi",
  "17 - Ilmu Sosial dan Ilmu Politik",
  "18 - Ilmu Budaya",
  "19 - Psikologi",
  "20 - Peternakan",
  "21 - Ilmu Komunikasi",
  "22 - Keperawatan",
  "23 - Perikanan dan Ilmu Kelautan",
  "24 - Teknologi Industri Pertanian",
  "25 - Farmasi",
];

async function isDbConnected(): Promise<boolean> {
  try {
    const client = await pool.connect();
    client.release();
    return true;
  } catch {
    return false;
  }
}

export async function getFilterOptionsHerregistrasi(): Promise<FilterOptionsHerregistrasi> {
  if (!(await isDbConnected())) {
    return { fakultas: DEFAULT_FAKULTAS };
  }
  try {
    const { rows } = await pool.query(`
      SELECT json_agg(nama_lengkap ORDER BY id) AS fakultas
      FROM fakultas
    `);
    return { fakultas: (rows[0]?.fakultas as string[]) ?? DEFAULT_FAKULTAS };
  } catch {
    return { fakultas: DEFAULT_FAKULTAS };
  }
}

// Data Mockup Sesuai Gambar 2 bila DB offline
const MOCK_HERREGISTRASI: HerregistrasiData = {
  kpi: {
    jumlahMahasiswa: 31770,
    jumlahHerregistrasi: 30130,
    pctHerregistrasi: 0.9483,
    jumlahKrs: 28800,
    pctKrs: 0.9399,
  },
  statusHerregistrasi: [
    { label: "Herregistrasi", jumlah: 30130 },
    { label: "Tidak Herregistrasi", jumlah: 1640 },
  ],
  jenisHerregistrasi: [
    { label: "Bayar Mandiri", jumlah: 25300 },
    { label: "Beasiswa", jumlah: 4650 },
    { label: "Cuti", jumlah: 75 },
    { label: "Rp. 0 Pembebasan", jumlah: 54 },
    { label: "Penangguhan", jumlah: 36 },
  ],
  statusKrs: [
    { label: "KRS", jumlah: 28800 },
    { label: "Tidak KRS", jumlah: 1900 },
  ],
  distribusiFakultas: [
    { fakultas: "11 - Hukum", jumlahMahasiswa: 2150, herregistrasi: 2040, krs: 1920 },
    { fakultas: "12 - Ekonomi dan Bisnis", jumlahMahasiswa: 3500, herregistrasi: 3340, krs: 3150 },
    { fakultas: "13 - Kedokteran", jumlahMahasiswa: 3400, herregistrasi: 3230, krs: 3060 },
    { fakultas: "14 - MIPA", jumlahMahasiswa: 2800, herregistrasi: 2660, krs: 2520 },
    { fakultas: "15 - Pertanian", jumlahMahasiswa: 2600, herregistrasi: 2470, krs: 2340 },
    { fakultas: "16 - Kedokteran Gigi", jumlahMahasiswa: 1200, herregistrasi: 1140, krs: 1080 },
    { fakultas: "17 - FISIP", jumlahMahasiswa: 3300, herregistrasi: 3130, krs: 2970 },
    { fakultas: "18 - Ilmu Budaya", jumlahMahasiswa: 3100, herregistrasi: 2940, krs: 2790 },
    { fakultas: "19 - Psikologi", jumlahMahasiswa: 1100, herregistrasi: 1040, krs: 990 },
    { fakultas: "20 - Peternakan", jumlahMahasiswa: 1700, herregistrasi: 1610, krs: 1530 },
    { fakultas: "21 - Ilmu Komunikasi", jumlahMahasiswa: 3200, herregistrasi: 3040, krs: 2880 },
    { fakultas: "22 - Keperawatan", jumlahMahasiswa: 1400, herregistrasi: 1330, krs: 1260 },
    { fakultas: "23 - FPIK", jumlahMahasiswa: 2000, herregistrasi: 1900, krs: 1800 },
    { fakultas: "24 - FTIP", jumlahMahasiswa: 1800, herregistrasi: 1710, krs: 1620 },
    { fakultas: "25 - Farmasi", jumlahMahasiswa: 1520, herregistrasi: 1440, krs: 1390 },
  ],
  prodiSummary: [
    { prodi: "Administrasi Bisnis", jenjang: "Magister", pctHerregistrasi: 0.8913, pctKrs: 0.8696 },
    { prodi: "Administrasi Bisnis", jenjang: "Sarjana", pctHerregistrasi: 0.9870, pctKrs: 0.9870 },
    { prodi: "Administrasi Bisnis K. Pangandaran", jenjang: "Sarjana", pctHerregistrasi: 0.9333, pctKrs: 0.9067 },
    { prodi: "Administrasi Keuangan Publik", jenjang: "Sarjana Terapan", pctHerregistrasi: 0.8505, pctKrs: 0.8505 },
    { prodi: "Administrasi Pemerintahan", jenjang: "Sarjana Terapan", pctHerregistrasi: 0.9241, pctKrs: 0.9241 },
    { prodi: "Administrasi Publik", jenjang: "Magister", pctHerregistrasi: 0.6630, pctKrs: 0.6304 },
    { prodi: "Administrasi Publik", jenjang: "Sarjana", pctHerregistrasi: 0.9511, pctKrs: 0.9511 },
    { prodi: "Agribisnis", jenjang: "Sarjana", pctHerregistrasi: 0.9619, pctKrs: 0.9619 },
    { prodi: "Agronomi", jenjang: "Magister", pctHerregistrasi: 0.9500, pctKrs: 0.9500 },
    { prodi: "Agroteknologi", jenjang: "Sarjana", pctHerregistrasi: 0.9482, pctKrs: 0.9482 },
    { prodi: "Agroteknopreneur", jenjang: "Sarjana Terapan", pctHerregistrasi: 0.9112, pctKrs: 0.9112 },
  ],
  pctHerregistrasiTotal: 0.9483,
  pctKrsTotal: 0.9399,
};

export async function getHerregistrasiData(f: FiltersHerregistrasi): Promise<HerregistrasiData> {
  if (!(await isDbConnected())) {
    return MOCK_HERREGISTRASI;
  }
  try {
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
          ps.nama_prodi                                                                   AS prodi,
          j.nama                                                                          AS jenjang,
          count(*)::int                                                                   AS total,
          sum(CASE WHEN ma.status_herregistrasi = 'Herregistrasi' THEN 1 ELSE 0 END)::int AS herregistrasi,
          sum(CASE WHEN ma.status_herregistrasi = 'Herregistrasi'
                    AND ma.jenis_herregistrasi <> 'Cuti' THEN 1 ELSE 0 END)::int        AS basis_krs,
          sum(CASE WHEN ma.status_krs = 'KRS' THEN 1 ELSE 0 END)::int                   AS krs
        ${JOINS}
        ${where}
        AND ps.nama_prodi IS NOT NULL
        GROUP BY ps.id, ps.nama_prodi, j.nama
        ORDER BY ps.nama_prodi, j.nama`,
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
      statusHerregistrasi: statusHQ.rows as { label: string; jumlah: number }[],
      jenisHerregistrasi: jenisHQ.rows as { label: string; jumlah: number }[],
      statusKrs: statusKrsQ.rows as { label: string; jumlah: number }[],
      distribusiFakultas: (
        distribusiQ.rows as {
          fakultas: string;
          jumlah_mahasiswa: number;
          herregistrasi: number;
          krs: number;
        }[]
      ).map((r) => ({
        fakultas: r.fakultas,
        jumlahMahasiswa: r.jumlah_mahasiswa,
        herregistrasi: r.herregistrasi,
        krs: r.krs,
      })),
      prodiSummary,
      pctHerregistrasiTotal: pctHerregistrasi,
      pctKrsTotal: pctKrs,
    };
  } catch {
    return MOCK_HERREGISTRASI;
  }
}
