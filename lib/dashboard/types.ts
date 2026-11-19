export type Mode = "apa-adanya" | "dedup";

// Nilai kosong = "Semua". Disimpan begitu di URL supaya bersih dan bisa dibagikan.
export type Filters = {
  jenjang: string;
  jalur: string;
  fakultas: string;
  prodi: string;
  tahun: number | null;
  mode: Mode;
};

export type FilterOptions = {
  jenjang: string[];
  jalur: string[];
  fakultas: string[];
  prodi: string[];
  tahun: number[];
  jalurByJenjang?: Record<string, string[]>;
  fakultasByJenjang?: Record<string, string[]>;
  prodiByJenjang?: Record<string, string[]>;
  prodiByFakultas?: Record<string, string[]>;
};

export type ProdiRow = {
  prodi: string;
  fakultas: string;
  jenjang: string;
  pendaftar: number;
  diterima: number;
  registrasi: number;
  pendaftarAcuan: number;
  registrasiAcuan: number;
  dayaTampung: number;
  keketatan: number | null; // 0..1, makin kecil makin ketat
  persaingan: number | null;
  rasio: number | null;
  keterisian: number | null;
  peringkat: number | null; // 1 = paling ketat
};

export type MatrixRow = {
  prodi: string;
  keketatan: (number | null)[];
  keketatanTotal: number | null;
  registrasi: (number | null)[];
  registrasiTotal: number | null;
};

export type SmupData = {
  kpi: {
    pendaftar: number;
    diterima: number;
    registrasi: number;
    dayaTampung: number;
    rataKeketatan: number | null;
    keketatanGabungan: number | null;
    pctRegistrasi: number | null;
    tahunAcuan: number;
    prodiScope: number;
    prodiBerdata: number;
    duplikat: number;
  };
  tahun: number[];
  jalur: { label: string; value: number }[];
  fakultas: { label: string; pendaftar: number; diterima: number; registrasi: number }[];
  prodi: ProdiRow[];
  topFavorit: ProdiRow[];
  topRasio: ProdiRow[];
  matrix: MatrixRow[];
};

export type VerifikasiRow = {
  prodi: string;
  menunggu: number;
  terverifikasi: number;
  ditolak: number;
  total: number;
};

export type PmbData = {
  kpi: {
    hariIni: number;
    tanggalTerakhir: string | null;
    rataHarian: number | null;
    terverifikasi: number;
    menunggu: number;
    ditolak: number;
    totalPendaftar: number;
  };
  harian: { tanggal: string; value: number }[];
  perProdi: VerifikasiRow[];
};
