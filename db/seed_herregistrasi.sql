-- Seed data dummy untuk Dashboard Herregistrasi dan KRS.
-- Tabel mahasiswa_aktif: ~31.770 baris terdistribusi ke 19 fakultas & berbagai prodi.
-- Proporsi mengikuti mockup: 94,83% Herregistrasi, 5,17% Tidak Herregistrasi.
-- Dari yang herregistrasi: 84,02% Bayar Mandiri, 15,43% Beasiswa, 0,25% Cuti,
--   0,18% Rp. 0 Pembebasan, 0,12% Penangguhan.
-- Dari yang herregistrasi (kecuali Cuti): 93,99% KRS.
--
-- Jalankan SETELAH schema (mahasiswa_aktif sudah dibuat oleh db/schema.postgres.sql
-- atau db/schema_herregistrasi.sql).

-- Pastikan tabel ada (guard idempoten)
CREATE TABLE IF NOT EXISTS mahasiswa_aktif (
  id                   integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nim                  varchar(20) NOT NULL,
  tahun_masuk          smallint NOT NULL,
  prodi_id             integer REFERENCES program_studi(id),
  fakultas_id          smallint REFERENCES fakultas(id),
  jenjang_id           smallint REFERENCES jenjang(id),
  status_herregistrasi varchar(30) NOT NULL,
  jenis_herregistrasi  varchar(30),
  status_krs           varchar(20) NOT NULL,
  semester             smallint NOT NULL DEFAULT 1
);

-- Bersihkan data lama (idempoten)
TRUNCATE mahasiswa_aktif RESTART IDENTITY;

-- ─────────────────────────────────────────────────────────────────────────────
-- Pembangkitan data menggunakan generate_series + ekspresi deterministik.
-- Total baris = 31770 (target mockup).
-- Distribusi antar fakultas dilakukan lewat modulo id prodi yang ada.
-- ─────────────────────────────────────────────────────────────────────────────

INSERT INTO mahasiswa_aktif (nim, tahun_masuk, prodi_id, fakultas_id, jenjang_id,
                              status_herregistrasi, jenis_herregistrasi, status_krs, semester)
WITH
  -- 31770 baris dasar; i = 1..31770
  seq AS (
    SELECT generate_series AS i
    FROM generate_series(1, 31770)
  ),

  -- Ambil daftar prodi beserta fakultas & jenjang (hanya yang ada di DB)
  prodi_list AS (
    SELECT ps.id AS prodi_id, ps.fakultas_id, ps.jenjang_id,
           row_number() OVER (ORDER BY ps.id) AS rn,
           count(*) OVER ()                    AS total_prodi
    FROM program_studi ps
  ),

  -- Petakan setiap baris ke satu prodi (round-robin deterministik)
  mapped AS (
    SELECT
      s.i,
      pl.prodi_id,
      pl.fakultas_id,
      pl.jenjang_id,
      -- Status herregistrasi: 94,83% Herregistrasi → ambang 94,83 / 100 * 1000 = 948
      CASE WHEN (s.i * 7 + 13) % 1000 < 948
           THEN 'Herregistrasi'
           ELSE 'Tidak Herregistrasi'
      END AS status_herregistrasi
    FROM seq s
    JOIN prodi_list pl
      ON pl.rn = ((s.i - 1) % pl.total_prodi) + 1
  ),

  -- Jenis herregistrasi: hanya untuk yang berstatus Herregistrasi
  -- 840 Bayar Mandiri, 154 Beasiswa, 2 Cuti, 2 Rp.0 Pembebasan, 1 Penangguhan / 999 total
  with_jenis AS (
    SELECT
      m.*,
      CASE
        WHEN m.status_herregistrasi = 'Tidak Herregistrasi' THEN NULL
        WHEN (m.i * 3 + 7) % 1000 < 840 THEN 'Bayar Mandiri'
        WHEN (m.i * 3 + 7) % 1000 < 994 THEN 'Beasiswa'
        WHEN (m.i * 3 + 7) % 1000 < 996 THEN 'Cuti'
        WHEN (m.i * 3 + 7) % 1000 < 998 THEN 'Rp. 0 Pembebasan'
        ELSE                                  'Penangguhan'
      END AS jenis_herregistrasi
    FROM mapped m
  ),

  -- Status KRS: dari yang herregistrasi kecuali Cuti → 93,99% KRS
  -- Cuti → selalu Tidak KRS.  Tidak Herregistrasi → selalu Tidak KRS.
  with_krs AS (
    SELECT
      wj.*,
      CASE
        WHEN wj.status_herregistrasi = 'Tidak Herregistrasi' THEN 'Tidak KRS'
        WHEN wj.jenis_herregistrasi  = 'Cuti'               THEN 'Tidak KRS'
        WHEN (wj.i * 11 + 5) % 10000 < 9399                 THEN 'KRS'
        ELSE                                                       'Tidak KRS'
      END AS status_krs,
      -- Tahun masuk: campuran 2021-2024 deterministik
      (2021 + (wj.i % 4))::smallint AS tahun_masuk,
      -- Semester: 1-8 deterministik
      (1 + (wj.i % 8))::smallint AS semester
    FROM with_jenis wj
  )

SELECT
  -- NIM: format deterministik
  lpad(w.i::text, 10, '0')               AS nim,
  w.tahun_masuk,
  w.prodi_id,
  w.fakultas_id::smallint,
  w.jenjang_id::smallint,
  w.status_herregistrasi,
  w.jenis_herregistrasi,
  w.status_krs,
  w.semester
FROM with_krs w;

-- ─── Indeks untuk performa query dashboard ───────────────────────────────────
CREATE INDEX IF NOT EXISTS ix_ma_fakultas   ON mahasiswa_aktif (fakultas_id);
CREATE INDEX IF NOT EXISTS ix_ma_prodi      ON mahasiswa_aktif (prodi_id);
CREATE INDEX IF NOT EXISTS ix_ma_status_her ON mahasiswa_aktif (status_herregistrasi);
CREATE INDEX IF NOT EXISTS ix_ma_status_krs ON mahasiswa_aktif (status_krs);
CREATE INDEX IF NOT EXISTS ix_ma_jenis      ON mahasiswa_aktif (jenis_herregistrasi);
