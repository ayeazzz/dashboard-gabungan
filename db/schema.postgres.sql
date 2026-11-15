-- Skema Postgres untuk Dashboard Keketatan SMUP & Realtime PMB.
-- Port dari "dashboard smup sql/01_schema.sql" (MySQL) + "04_views.sql".
-- Jalankan lewat `npm run db:setup` (idempoten: drop + create).

DROP TABLE IF EXISTS pendaftaran, daya_tampung_jalur, daya_tampung, prodi_alias,
  program_studi, jalur_masuk, fakultas, jenjang CASCADE;

CREATE TABLE jenjang (
  id smallint PRIMARY KEY,
  nama varchar(30) NOT NULL UNIQUE
);

CREATE TABLE fakultas (
  id smallint PRIMARY KEY,
  nama_lengkap varchar(80) NOT NULL UNIQUE,  -- mis. '13 - Kedokteran' (dipakai filter)
  nama_singkat varchar(80) NOT NULL
);

CREATE TABLE jalur_masuk (
  id smallint PRIMARY KEY,
  nama varchar(40) NOT NULL UNIQUE
);

CREATE TABLE program_studi (
  id integer PRIMARY KEY,
  kode_prodi varchar(10),
  nama_prodi varchar(150) NOT NULL,
  jenjang_id smallint NOT NULL REFERENCES jenjang (id),
  fakultas_id smallint NOT NULL REFERENCES fakultas (id),
  label varchar(170) NOT NULL UNIQUE  -- 'Prodi (Jenjang)'
);

CREATE TABLE prodi_alias (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nama_prodi_raw varchar(170) NOT NULL,
  kode_prodi_raw varchar(10),
  prodi_id integer NOT NULL REFERENCES program_studi (id),
  cara_mapping varchar(10) NOT NULL CHECK (cara_mapping IN ('alias', 'kode')),
  jumlah_baris integer NOT NULL DEFAULT 0
);

CREATE TABLE daya_tampung (
  prodi_id integer NOT NULL REFERENCES program_studi (id),
  tahun smallint NOT NULL,
  daya_tampung integer NOT NULL,
  PRIMARY KEY (prodi_id, tahun)
);

CREATE TABLE daya_tampung_jalur (  -- rincian kuota per jalur; hanya sebagian prodi
  prodi_id integer NOT NULL REFERENCES program_studi (id),
  jalur_id smallint NOT NULL REFERENCES jalur_masuk (id),
  tahun smallint NOT NULL DEFAULT 2025,
  peminat integer NOT NULL,
  daya_tampung integer NOT NULL,
  pendaftar_proporsional numeric(10, 2),
  kelulusan_proporsional numeric(10, 2),
  rasio numeric(12, 6),
  PRIMARY KEY (prodi_id, jalur_id, tahun)
);

CREATE TABLE pendaftaran (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  no_pendaftaran bigint NOT NULL,  -- boleh ganda, lihat is_duplikat
  tahun_masuk smallint NOT NULL,
  gelombang smallint,
  jalur_detail varchar(150),
  jenjang_id smallint NOT NULL REFERENCES jenjang (id),
  jenis_pendidikan varchar(20),
  status_jalur_masuk varchar(30),
  jalur_id smallint NOT NULL REFERENCES jalur_masuk (id),
  status_kelulusan varchar(20),
  status_regist_final varchar(20),
  fakultas_id smallint REFERENCES fakultas (id),
  prodi_id integer REFERENCES program_studi (id),
  kode_prodi_raw varchar(10),
  nama_prodi_raw varchar(150),
  nama_pilihan1_detail varchar(200),
  flag_lulus smallint NOT NULL DEFAULT 0,
  flag_regist smallint NOT NULL DEFAULT 0,
  is_duplikat smallint NOT NULL DEFAULT 0,
  dup_keep smallint NOT NULL DEFAULT 1,
  tgl_daftar timestamp,
  status_verifikasi varchar(30),
  tgl_verifikasi timestamp,
  sumber varchar(20) NOT NULL CHECK (sumber IN ('pasca_asli', 'sarjana_dummy')),
  flag_tahun_teks smallint NOT NULL DEFAULT 0
);

-- Metrik Excel selalu memakai flag_tahun_teks = 0, jadi kolom itu jadi prefix index.
CREATE INDEX ix_p_excel ON pendaftaran (flag_tahun_teks, tahun_masuk);
CREATE INDEX ix_p_prodi ON pendaftaran (prodi_id, tahun_masuk);
CREATE INDEX ix_p_jenjang ON pendaftaran (jenjang_id);
CREATE INDEX ix_p_jalur ON pendaftaran (jalur_id);
CREATE INDEX ix_p_fakultas ON pendaftaran (fakultas_id);
CREATE INDEX ix_p_tgl ON pendaftaran (tgl_daftar);
CREATE INDEX ix_p_nodaf ON pendaftaran (no_pendaftaran);
