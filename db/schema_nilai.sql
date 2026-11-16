-- Skema Postgres khusus untuk Database Nilai Mahasiswa.
-- Jalankan lewat `npm run db:setup:nilai` (idempoten: drop + create).

DROP TABLE IF EXISTS nilai_mahasiswa, program_studi, fakultas, jenjang CASCADE;

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

CREATE TABLE nilai_mahasiswa (
  id             integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  prodi_id       integer REFERENCES program_studi(id),
  fakultas_id    smallint REFERENCES fakultas(id),
  jenjang_id     smallint REFERENCES jenjang(id),
  mata_kuliah    varchar(100) NOT NULL,
  kategori_nilai varchar(30) NOT NULL DEFAULT 'Reguler',
  jenis_nilai    varchar(10),
  status_nilai   varchar(20) NOT NULL,
  tahun_ajaran   varchar(10) NOT NULL DEFAULT '2024/2025',
  semester       varchar(10) NOT NULL DEFAULT 'Ganjil'
);

CREATE INDEX ix_nm_prodi ON nilai_mahasiswa (prodi_id);
CREATE INDEX ix_nm_fakultas ON nilai_mahasiswa (fakultas_id);
CREATE INDEX ix_nm_status ON nilai_mahasiswa (status_nilai);
CREATE INDEX ix_nm_jenis ON nilai_mahasiswa (jenis_nilai);
CREATE INDEX ix_nm_kategori ON nilai_mahasiswa (kategori_nilai);
