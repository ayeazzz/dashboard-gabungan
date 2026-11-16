-- Seed data dummy untuk Dashboard Nilai Mahasiswa
-- Menghasilkan 194.859 baris sesuai angka pasti pada mockup.
-- Menggunakan set-based INSERT (generate_series) agar instan (< 2 detik).

TRUNCATE nilai_mahasiswa RESTART IDENTITY;

INSERT INTO nilai_mahasiswa (
  prodi_id, fakultas_id, jenjang_id, mata_kuliah,
  kategori_nilai, jenis_nilai, status_nilai, tahun_ajaran, semester
)
WITH
  seq AS (
    SELECT generate_series AS i
    FROM generate_series(1, 194859)
  ),
  prodi_list AS (
    SELECT ps.id AS prodi_id, ps.fakultas_id, ps.jenjang_id,
           row_number() OVER (ORDER BY ps.id) AS rn,
           count(*) OVER () AS total_prodi
    FROM program_studi ps
  ),
  mapped AS (
    SELECT
      s.i,
      p.prodi_id,
      p.fakultas_id,
      p.jenjang_id,
      -- Status Nilai (mockup: Lengkap 192.396, Tidak Lengkap 2.052, Null 411)
      CASE
        WHEN s.i <= 192396 THEN 'Lengkap'
        WHEN s.i <= 192396 + 2052 THEN 'Tidak Lengkap'
        ELSE 'Null'
      END AS status_nilai,
      -- Kategori Nilai (Reguler, Perbaikan, Alih Kredit)
      CASE
        WHEN (s.i * 17) % 100 < 85 THEN 'Reguler'
        WHEN (s.i * 17) % 100 < 97 THEN 'Perbaikan'
        ELSE 'Alih Kredit'
      END AS kategori_nilai,
      -- Pseudo-random hash untuk jenis nilai (1..10000)
      ((s.i * 7919 + (s.i / 211) * 31) % 10000) AS r_jenis
    FROM seq s
    JOIN prodi_list p ON p.rn = ((s.i - 1) % p.total_prodi) + 1
  )
SELECT
  m.prodi_id,
  m.fakultas_id,
  m.jenjang_id,
  'Mata Kuliah ' || (((m.i - 1) % 50) + 1) AS mata_kuliah,
  m.kategori_nilai,
  -- Jenis Nilai: jika status Null maka NULL, selain itu sesuai bobot mockup:
  -- A=47.22%, B=21.14%, A-=19.42%, B+=5.21%, C=1.95%, K=0.36%, B-=2.21%, E=0.46%, C+=0.82%, Null=1.20%
  CASE
    WHEN m.status_nilai = 'Null' THEN NULL
    WHEN m.r_jenis < 4722 THEN 'A'
    WHEN m.r_jenis < 6836 THEN 'B'
    WHEN m.r_jenis < 8778 THEN 'A-'
    WHEN m.r_jenis < 9299 THEN 'B+'
    WHEN m.r_jenis < 9494 THEN 'C'
    WHEN m.r_jenis < 9530 THEN 'K'
    WHEN m.r_jenis < 9751 THEN 'B-'
    WHEN m.r_jenis < 9797 THEN 'E'
    WHEN m.r_jenis < 9879 THEN 'C+'
    ELSE NULL
  END AS jenis_nilai,
  m.status_nilai,
  CASE WHEN (m.i % 3) = 0 THEN '2023/2024' ELSE '2024/2025' END AS tahun_ajaran,
  CASE WHEN (m.i % 2) = 0 THEN 'Genap' ELSE 'Ganjil' END AS semester
FROM mapped m;
