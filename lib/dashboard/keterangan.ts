// Penjelasan singkat tiap kategori yang tampil di tooltip donut.
// Nilai huruf mengikuti skala mutu umum (bobot 4,0 - 0); sesuaikan bila aturan akademik berbeda.

export const KET_JENIS_NILAI: Record<string, string> = {
  A: "Mutu sangat baik. Bobot 4,0.",
  "A-": "Mutu baik sekali. Bobot 3,7.",
  "B+": "Mutu lebih dari baik. Bobot 3,3.",
  B: "Mutu baik. Bobot 3,0.",
  "B-": "Mutu cukup baik. Bobot 2,7.",
  "C+": "Mutu lebih dari cukup. Bobot 2,3.",
  C: "Mutu cukup. Bobot 2,0.",
  D: "Mutu kurang. Bobot 1,0.",
  E: "Tidak lulus. Bobot 0.",
  K: "Kosong: nilai belum diisi atau belum dapat dinilai.",
  Null: "Transaksi tercatat tetapi nilai huruf belum terisi di sistem.",
};

export const KET_KATEGORI_NILAI: Record<string, string> = {
  Reguler: "Nilai dari pengambilan mata kuliah pertama pada semester berjalan.",
  Perbaikan: "Nilai dari pengulangan mata kuliah untuk memperbaiki nilai sebelumnya.",
  "Alih Kredit": "Nilai hasil konversi mata kuliah dari program atau institusi lain.",
};

export const KET_STATUS_NILAI: Record<string, string> = {
  Lengkap: "Seluruh komponen nilai sudah terisi.",
  "Tidak Lengkap": "Sebagian komponen nilai belum terisi.",
  Null: "Belum ada nilai sama sekali.",
};

export const KET_SMUP: Record<string, string> = {
  Lulus: "Pendaftar yang dinyatakan diterima pada seleksi.",
  "Tidak Lulus": "Pendaftar yang tidak diterima (pendaftar dikurangi diterima).",
  Registrasi: "Peserta diterima yang sudah melakukan daftar ulang.",
  "Belum Registrasi": "Peserta diterima yang belum melakukan daftar ulang.",
};

export const KET_PMB: Record<string, string> = {
  Menunggu: "Berkas sudah dikirim dan menunggu proses verifikasi.",
  Terverifikasi: "Berkas sudah diperiksa dan dinyatakan sesuai.",
  Ditolak: "Berkas diperiksa dan dinyatakan tidak memenuhi syarat.",
};

export const KET_HERREG: Record<string, string> = {
  Herregistrasi: "Mahasiswa aktif yang sudah melakukan herregistrasi semester ini.",
  "Tidak Herregistrasi": "Mahasiswa aktif yang belum melakukan herregistrasi.",
  "Bayar Mandiri": "Herregistrasi dengan pembayaran UKT secara mandiri.",
  Beasiswa: "Herregistrasi yang UKT-nya ditanggung beasiswa.",
  Cuti: "Mahasiswa yang mengajukan cuti akademik semester ini.",
  "Rp. 0 Pembebasan": "Herregistrasi dengan pembebasan biaya (UKT Rp 0).",
  Penangguhan: "Herregistrasi dengan penangguhan pembayaran.",
};
