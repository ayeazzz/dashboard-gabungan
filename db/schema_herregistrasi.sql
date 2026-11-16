-- Skema Postgres khusus untuk Database Herregistrasi & KRS.
-- Jalankan lewat `npm run db:setup:herreg` (idempoten: drop + create).

DROP TABLE IF EXISTS mahasiswa_aktif, program_studi, fakultas, jenjang CASCADE;

CREATE TABLE jenjang (
  id smallint PRIMARY KEY,
  nama varchar(30) NOT NULL UNIQUE
);

CREATE TABLE fakultas (
  id smallint PRIMARY KEY,
  nama_lengkap varchar(80) NOT NULL UNIQUE,
  nama_singkat varchar(80) NOT NULL
);

CREATE TABLE program_studi (
  id integer PRIMARY KEY,
  kode_prodi varchar(10),
  nama_prodi varchar(150) NOT NULL,
  jenjang_id smallint NOT NULL REFERENCES jenjang (id),
  fakultas_id smallint NOT NULL REFERENCES fakultas (id),
  label varchar(170) NOT NULL UNIQUE
);

CREATE TABLE mahasiswa_aktif (
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

CREATE INDEX ix_ma_fakultas ON mahasiswa_aktif (fakultas_id);
CREATE INDEX ix_ma_prodi ON mahasiswa_aktif (prodi_id);
CREATE INDEX ix_ma_status_h ON mahasiswa_aktif (status_herregistrasi);
CREATE INDEX ix_ma_status_krs ON mahasiswa_aktif (status_krs);
