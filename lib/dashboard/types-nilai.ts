// Types untuk Dashboard Nilai Mahasiswa (Kelengkapan Data Nilai)

export type FiltersNilai = {
  jenjang: string;
  fakultas: string;
  prodi: string;
  kategoriNilai: string; // '' | 'Reguler' | 'Perbaikan' | 'Alih Kredit'
  jenisNilai: string;    // '' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'D' | 'E' | 'K' | 'Null'
};

export type FilterOptionsNilai = {
  jenjang: string[];
  fakultas: string[];
  prodi: string[];
  fakultasByJenjang?: Record<string, string[]>;
  prodiByJenjang?: Record<string, string[]>;
  prodiByFakultas?: Record<string, string[]>;
};

export type NilaiKpi = {
  totalTransaksi: number;
  jumlahProdi: number;
  jumlahLengkap: number;
  pctLengkap: number | null;
  jumlahTidakLengkap: number;
  pctTidakLengkap: number | null;
  jumlahNull: number;
  pctNull: number | null;
};

export type SebaranFakultasRow = {
  fakultas: string;
  lengkap: number;
  tidakLengkap: number;
  nilaiNull: number;
};

export type JenisNilaiRow = {
  jenis: string; // 'A' | 'B' | 'A-' | 'B+' | 'C' | 'K' | 'B-' | 'E' | 'C+' | 'Null'
  jumlah: number;
};

export type ProdiSummaryNilaiRow = {
  fakultas: string;
  prodi: string;
  jumlahLengkap: number;
  jumlahTidakLengkap: number;
  jumlahNull: number;
};

export type KategoriNilaiRow = {
  label: string; // 'Lengkap' | 'Tidak Lengkap' | 'Null'
  jumlah: number;
};

export type NilaiData = {
  kpi: NilaiKpi;
  sebaranFakultas: SebaranFakultasRow[];
  jenisNilai: JenisNilaiRow[];
  prodiSummary: ProdiSummaryNilaiRow[];
  kategoriNilai: KategoriNilaiRow[];
};
