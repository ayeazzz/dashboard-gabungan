// Types untuk Dashboard Herregistrasi dan KRS

export type FiltersHerregistrasi = {
  fakultas: string;
  statusHerregistrasi: string; // '' | 'Herregistrasi' | 'Tidak Herregistrasi'
  statusKrs: string;            // '' | 'KRS' | 'Tidak KRS'
};

export type FilterOptionsHerregistrasi = {
  fakultas: string[];
};

export type HerregistrasiKpi = {
  jumlahMahasiswa: number;
  jumlahHerregistrasi: number;
  pctHerregistrasi: number | null;
  jumlahKrs: number;
  pctKrs: number | null;
};

export type StatusHerregistrasiRow = {
  label: string;   // 'Herregistrasi' | 'Tidak Herregistrasi'
  jumlah: number;
};

export type JenisHerregistrasiRow = {
  label: string;   // 'Bayar Mandiri' | 'Beasiswa' | 'Cuti' | 'Rp. 0 Pembebasan' | 'Penangguhan'
  jumlah: number;
};

export type StatusKrsRow = {
  label: string;   // 'KRS' | 'Tidak KRS'
  jumlah: number;
};

export type FakultasDistribusiRow = {
  fakultas: string;
  jumlahMahasiswa: number;
  herregistrasi: number;
  krs: number;
};

export type ProdiSummaryRow = {
  prodi: string;
  jenjang: string;
  pctHerregistrasi: number | null;
  pctKrs: number | null;
};

export type HerregistrasiData = {
  kpi: HerregistrasiKpi;
  statusHerregistrasi: StatusHerregistrasiRow[];
  jenisHerregistrasi: JenisHerregistrasiRow[];
  statusKrs: StatusKrsRow[];
  distribusiFakultas: FakultasDistribusiRow[];
  prodiSummary: ProdiSummaryRow[];
  pctHerregistrasiTotal: number | null;
  pctKrsTotal: number | null;
};
