# Dashboard SMUP & PMB

Dua dashboard read-only yang menghitung angka langsung dari Postgres:

- `/` — Keketatan SMUP (pendaftar, diterima, registrasi, daya tampung, rasio, historis)
- `/pmb` — Snapshot PMB (tren harian, status verifikasi berkas)

Bentuk mengikuti sheet `Dashboard` pada
`V2_FiturBaru_DataBaru_SMUP_PMB_Dummy (2).xlsx`; arti tiap metrik mengikuti sheet
`Calc` / `Calc_Prodi` di workbook yang sama.

## Menjalankan

```bash
npm install
npm run db:up      # Postgres 17 di Docker, port 55432
npm run db:setup   # skema + seed + validasi jumlah baris (idempoten)
npm run dev
```

`DATABASE_URL` opsional; default-nya
`postgres://smup:smup@localhost:55432/dashboard_smup`.

## Pindah ke Supabase

Skema dan semua query murni Postgres (driver `pg`), jadi tidak ada kode yang perlu
diubah — cukup ganti `DATABASE_URL`.

```bash
# 1. muat skema + seed ke project Supabase (pakai host pooler, port 5432 = session mode)
DATABASE_URL='postgresql://postgres.<ref>:<password>@aws-0-<region>.pooler.supabase.com:5432/postgres?sslmode=require' \
  npm run db:setup

# 2. jalankan aplikasi
DATABASE_URL='...:5432/postgres?sslmode=require' npm run dev
```

- `db:setup` **drop + create** tabel. Jangan arahkan ke project yang sudah berisi data lain.
- Pakai port **6543 (transaction pooler)** saat deploy serverless agar koneksi tidak
  habis; `max: 5` di `lib/dashboard/db.ts` sudah cukup untuk itu.
- `?sslmode=require` wajib; tanpa itu koneksi ditolak.
- Tabel dibuat di schema `public` sebagai user `postgres`, jadi RLS tidak aktif. Kalau
  nanti dibaca lewat `supabase-js`/anon key, tambahkan policy dulu.
- Aplikasi hanya butuh `SELECT`; untuk produksi sebaiknya pakai role read-only.

## Filter

Enam filter, semuanya tersimpan di URL sehingga bisa dibagikan:

| Param      | Nilai                                                 |
| ---------- | ----------------------------------------------------- |
| `jenjang`  | nama jenjang, kosong = semua                          |
| `jalur`    | nama jalur masuk                                      |
| `fakultas` | `nama_lengkap` (mis. `13 - Kedokteran`)               |
| `prodi`    | label `Prodi (Jenjang)`                               |
| `tahun`    | angka tahun masuk                                     |
| `mode`     | `dedup` untuk membuang nomor pendaftaran ganda        |

## Arsitektur

- `lib/dashboard/query.ts` adalah satu-satunya tempat angka dihitung. Semua agregasi
  terjadi di SQL; browser hanya menerima hasil jadi (tidak ada 43.832 baris ke klien).
- Halaman adalah server component. `app/page.tsx` dan `app/pmb/page.tsx` merender
  shell statis + `<Suspense>`; data di-stream karena `cacheComponents` aktif.
- `components/dashboard/FilterBar.tsx` satu-satunya client component yang mengubah
  URL; chart memakai div/SVG tanpa library.
- `tests/` mengunci angka acuan workbook lewat `npm test` (butuh database aktif).

## Arti angka

- **KPI & chart SMUP** memakai baris dengan `flag_tahun_teks = 0`, sehingga totalnya
  40.049 (bukan 43.832).
- **Tabel 211 prodi, peringkat, dan matriks historis** memakai seluruh baris — sama
  seperti `Calc_Prodi` di workbook. Karena itu total kolomnya bisa melebihi KPI.
- **Daya tampung efektif** = jumlah kuota per jalur bila ada, kalau tidak kuota
  tahunan (`daya_tampung`). Untuk 2025 hasilnya 14.471.
- **Mode Dedup** hanya membuang baris dengan `dup_keep = 0` (27 baris).
- **Status verifikasi** dicocokkan dengan awalan `Terverifikasi*`, `Menunggu*`,
  `Ditolak*`. Tiga kategori ini mencakup seluruh baris (termasuk tahun-teks) dan
  berjumlah 43.157; 675 baris berstatus lain tidak dihitung.

## Selisih yang diketahui terhadap workbook

1. Sebagian baris di workbook punya label prodi alias yang tidak masuk tabel
   `Calc_Prodi`, sehingga total tabelnya 42.980 (bukan 43.830) dan rata-rata
   keketatan 54,49%. Dari database hasilnya 54,6%.
2. Tanggal pendaftaran pada data dummy dibangkitkan acak, jadi tren harian tidak
   bisa sama persis dengan `Calc!B100:B129`. Angka dihitung dari `tgl_daftar`.
3. Chart fakultas di workbook hanya memuat 17 dari 19 fakultas; di sini semua
   fakultas berdata ditampilkan.
4. Dua baris tanpa `prodi_id` (`Kebidanan`, `Kearsipan Digital`) tidak punya
   pemetaan di tabel master, jadi tidak masuk tabel per prodi.

## Di luar cakupan P0

Autentikasi, aksi tulis, ekspor, pencarian/sortir/paginasi, dan deploy Supabase.
