import type {
  FilterOptionsNilai,
  FiltersNilai,
  NilaiData,
  ProdiSummaryNilaiRow,
  SebaranFakultasRow,
  JenisNilaiRow,
  KategoriNilaiRow,
} from "./types-nilai";

export const DEFAULT_OPTIONS_NILAI: FilterOptionsNilai = {
  jenjang: ["Sarjana", "Sarjana Terapan", "Magister", "Doktor", "Spesialis", "Subspesialis", "Profesi"],
  fakultas: ["11 - Hukum", "12 - Ekonomi dan Bisnis", "13 - Kedokteran", "14 - Matematika dan Ilmu Pengetahuan Alam", "15 - Pertanian", "16 - Kedokteran Gigi", "17 - Ilmu Sosial dan Ilmu Politik", "18 - Ilmu Budaya", "19 - Psikologi", "20 - Peternakan", "21 - Ilmu Komunikasi", "22 - Keperawatan", "23 - Perikanan dan Ilmu Kelautan", "24 - Teknologi Industri Pertanian", "25 - Sekolah Pascasarjana", "26 - Farmasi", "27 - Teknik Geologi", "28 - Sekolah Vokasi", "Program PSDKU Pangandaran"],
  prodi: ["Administrasi Bisnis (Magister)", "Administrasi Bisnis (Sarjana)", "Administrasi Bisnis PSDKU (Sarjana)", "Administrasi Keuangan Publik (Sarjana Terapan)", "Administrasi Pemerintahan (Sarjana Terapan)", "Administrasi Publik (Magister)", "Administrasi Publik (Sarjana)", "Agribisnis (Sarjana)", "Agronomi (Magister)", "Agroteknologi (Sarjana)", "Agroteknopreneur (Sarjana Terapan)", "Aktuaria (Sarjana)", "Akuntan (Profesi)", "Akuntansi (Doktor)", "Akuntansi (Magister)", "Akuntansi (Sarjana)", "Akuntansi Perpajakan (Sarjana Terapan)", "Akuntansi Sektor Publik (Sarjana Terapan)", "Anestesiologi dan Terapi Intensif (Spesialis)", "Anestesiologi dan Terapi Intensif (Subspesialis)", "Anti Aging dan Aesthetic Medicine (Magister)", "Antropologi (Magister)", "Antropologi (Sarjana)", "Apoteker (Profesi)", "Bahasa dan Budaya Tiongkok (Sarjana Terapan)", "Bedah (Spesialis)", "Bedah (Subspesialis)", "Bedah Anak (Spesialis)", "Bedah Mulut (Spesialis)", "Bedah Mulut dan Maksilofasial (Spesialis)", "Bedah Saraf (Spesialis)", "Biologi (Magister)", "Biologi (Sarjana)", "Bioteknologi (Doktor)", "Bioteknologi (Magister)", "Bisnis Digital (Sarjana)", "Bisnis Internasional (Sarjana Terapan)", "Bisnis Logistik (Sarjana Terapan)", "Dermatologi, Venereologi dan Estetika (Spesialis)", "Dermatologi, Venerologi, dan Estetika (Subspesialis)", "Dokter (Profesi)", "Dokter Gigi (Profesi)", "Ekonomi (Doktor)", "Ekonomi (Magister)", "Ekonomi Islam (Sarjana)", "Ekonomi Pembangunan (Sarjana)", "Ekonomi Pertanian (Magister)", "Ekonomi Pertanian Pendidikan Jarak Jauh (PJJ) (Magister)", "Ekonomi Terapan (Magister)", "Epidemiologi (Magister)", "Farmasi (Doktor)", "Farmasi (Magister)", "Farmasi (Sarjana)", "Farmasi Klinik (Magister)", "Farmasi Nuklir (Spesialis)", "Fisika (Magister)", "Fisika (Sarjana)", "Geofisika (Sarjana)", "Gizi Klinik (Spesialis)", "Hubungan Internasional (Doktor)", "Hubungan Internasional (Magister)", "Hubungan Internasional (Sarjana)", "Hubungan Masyarakat (Sarjana)", "Hukum (Doktor)", "Hukum (Magister)", "Ilmu Administrasi (Doktor)", "Ilmu Bedah Plastik (Spesialis)", "Ilmu Ekonomi (Sarjana)", "Ilmu Hukum (Sarjana)", "Ilmu Keberlanjutan (Magister)", "Ilmu Kedokteran Dasar (Magister)", "Ilmu Kedokteran Gigi (Doktor)", "Ilmu Kedokteran Gigi (Magister)", "Ilmu Kelautan (Sarjana)", "Ilmu Kesehatan Mata (RS Pusat Mata Nasional Cicendo) (Spesialis)", "Ilmu Kesehatan Mata (Spesialis)", "Ilmu Kesehatan Mata (Subspesialis)", "Ilmu Komunikasi (Doktor)", "Ilmu Komunikasi (Magister)", "Ilmu Komunikasi (Sarjana)", "Ilmu Komunikasi PSDKU (Sarjana)", "Ilmu Lingkungan (Doktor)", "Ilmu Lingkungan (Magister)", "Ilmu Manajemen (Magister)", "Ilmu Pemerintahan (Magister)", "Ilmu Pemerintahan (Sarjana)", "Ilmu Penyakit Kulit dan Kelamin (Spesialis)", "Ilmu Penyakit Mata (Spesialis)", "Ilmu Penyakit THT (Spesialis)", "Ilmu Pertanian (Doktor)", "Ilmu Peternakan (Doktor)", "Ilmu Peternakan (Magister)", "Ilmu Peternakan Pendidikan Jarak Jauh (PJJ) (Magister)", "Ilmu Politik (Magister)", "Ilmu Politik (Sarjana)", "Ilmu Tanah (Magister)", "Inovasi Regional (Magister)", "Jurnalistik (Sarjana)", "Kajian Budaya (Magister)", "Kearsipan Digital (Sarjana Terapan)", "Kebidanan (Magister)", "Kebidanan (Sarjana Terapan)", "Kebijakan Publik (Magister)", "Kedokteran (Doktor)", "Kedokteran (Sarjana)", "Kedokteran Fisik dan Rehabilitasi (Spesialis)", "Kedokteran Fisik dan Rehabilitasi Medik (Subspesialis)", "Kedokteran Forensik dan Studi Medikolegal (Spesialis)", "Kedokteran Gigi (Sarjana)", "Kedokteran Hewan (Sarjana)", "Kedokteran Jiwa (Spesialis)", "Kedokteran Keluarga Layanan Primer (Spesialis)", "Kedokteran Layanan Primer (Spesialis)", "Kedokteran Nuklir (Spesialis)", "Kenotariatan (Magister)", "Keperawatan (Doktor)", "Keperawatan (Magister)", "Keperawatan (Sarjana)", "Keperawatan Anestesiologi (Sarjana Terapan)", "Keperawatan Medikal Bedah (Spesialis)", "Keperawatan PSDKU (Sarjana)", "Kesehatan Anak (Spesialis)", "Kesehatan Anak (Subspesialis)", "Kesehatan Gigi Anak (Spesialis)", "Kesehatan Masyarakat (Magister)", "Kesehatan Telinga Hidung Tenggorok Bedah Kepala dan Leher (Spesialis)", "Kesejahteraan Sosial (Doktor)", "Kesejahteraan Sosial (Magister)", "Kesejahteraan Sosial (Sarjana)", "Kimia (Doktor)", "Kimia (Magister)", "Kimia (Sarjana)", "Konservasi Gigi (Spesialis)", "Konservasi Laut (Magister)", "Linguistik (Magister)", "Manajemen (Doktor)", "Manajemen (Magister)", "Manajemen (Sains) (Magister)", "Manajemen (Sarjana)", "Manajemen Keuangan Mikro Terpadu (Magister)", "Manajemen Komunikasi (Sarjana)", "Manajemen Produksi Media (Sarjana Terapan)", "Manajemen Sumber Daya Hayati (Magister)", "Matematika (Doktor)", "Matematika (Magister)", "Matematika (Sarjana)", "Neurologi (Spesialis)", "Obstetri dan Ginekologi (Spesialis)", "Obstetri dan Ginekologi (Subspesialis)", "Orthopaedi dan Traumatologi (Spesialis)", "Ortodontik (Spesialis)", "Pariwisata Bahari (Sarjana Terapan)", "Pariwisata Berkelanjutan (Magister)", "Patologi Anatomik (Spesialis)", "Patologi Klinik (Spesialis)", "Patologi Klinik (Subspesialis)", "Pemasaran Digital (Sarjana Terapan)", "Pendidikan Profesi Psikologi (Profesi)", "Penyakit Dalam (Spesialis)", "Penyakit Dalam (Subspesialis)", "Penyakit Jantung dan Pembuluh Darah (Spesialis)", "Penyakit Mulut (Spesialis)", "Perikanan (Magister)", "Perikanan (Sarjana)", "Perikanan PSDKU (Sarjana)", "Perikanan dan Kelautan Berkelanjutan (Doktor)", "Periodontik (Spesialis)", "Perpustakaan dan Sains Informasi (Sarjana)", "Peternakan (Sarjana)", "Peternakan PSDKU (Sarjana)", "Profesi Dokter Hewan (Profesi)", "Profesi Ners (Profesi)", "Profesi Ners PSDKU Pangandaran (Profesi)", "Program Profesi Insinyur (Profesi)", "Prostodontik (Spesialis)", "Psikologi (Doktor)", "Psikologi (Magister)", "Psikologi (Sarjana)", "Psikologi Profesi (Magister)", "Radiologi (Spesialis)", "Radiologi Kedokteran Gigi (Spesialis)", "Sastra (Doktor)", "Sastra (Magister)", "Sastra Arab (Sarjana)", "Sastra Indonesia (Sarjana)", "Sastra Inggris (Sarjana)", "Sastra Jepang (Sarjana)", "Sastra Jerman (Sarjana)", "Sastra Prancis (Sarjana)", "Sastra Rusia (Sarjana)", "Sastra Sunda (Sarjana)", "Sejarah (Magister)", "Sejarah (Sarjana)", "Sosiologi (Doktor)", "Sosiologi (Magister)", "Sosiologi (Sarjana)", "Statistika (Sarjana)", "Statistika Terapan (Magister)", "Teknik Elektro (Sarjana)", "Teknik Geologi (Doktor)", "Teknik Geologi (Magister)", "Teknik Geologi (Sarjana)", "Teknik Informatika (Sarjana)", "Teknik Pertanian dan Biosistem (Sarjana)", "Teknologi Agroindustri (Doktor)", "Teknologi Agroindustri (Magister)", "Teknologi Industri Kimia (Sarjana Terapan)", "Teknologi Industri Pertanian (Magister)", "Teknologi Pangan (Sarjana)", "Televisi dan Film (Sarjana)", "Urologi (Spesialis)"],
  fakultasByJenjang: {
  "Sarjana": [
    "11 - Hukum",
    "12 - Ekonomi dan Bisnis",
    "13 - Kedokteran",
    "14 - Matematika dan Ilmu Pengetahuan Alam",
    "15 - Pertanian",
    "16 - Kedokteran Gigi",
    "17 - Ilmu Sosial dan Ilmu Politik",
    "18 - Ilmu Budaya",
    "19 - Psikologi",
    "20 - Peternakan",
    "21 - Ilmu Komunikasi",
    "22 - Keperawatan",
    "23 - Perikanan dan Ilmu Kelautan",
    "24 - Teknologi Industri Pertanian",
    "26 - Farmasi",
    "27 - Teknik Geologi",
    "Program PSDKU Pangandaran"
  ],
  "Sarjana Terapan": [
    "12 - Ekonomi dan Bisnis",
    "22 - Keperawatan",
    "28 - Sekolah Vokasi"
  ],
  "Magister": [
    "11 - Hukum",
    "12 - Ekonomi dan Bisnis",
    "13 - Kedokteran",
    "14 - Matematika dan Ilmu Pengetahuan Alam",
    "15 - Pertanian",
    "16 - Kedokteran Gigi",
    "17 - Ilmu Sosial dan Ilmu Politik",
    "18 - Ilmu Budaya",
    "19 - Psikologi",
    "20 - Peternakan",
    "21 - Ilmu Komunikasi",
    "22 - Keperawatan",
    "23 - Perikanan dan Ilmu Kelautan",
    "24 - Teknologi Industri Pertanian",
    "25 - Sekolah Pascasarjana",
    "26 - Farmasi",
    "27 - Teknik Geologi"
  ],
  "Doktor": [
    "11 - Hukum",
    "12 - Ekonomi dan Bisnis",
    "13 - Kedokteran",
    "14 - Matematika dan Ilmu Pengetahuan Alam",
    "15 - Pertanian",
    "16 - Kedokteran Gigi",
    "17 - Ilmu Sosial dan Ilmu Politik",
    "18 - Ilmu Budaya",
    "19 - Psikologi",
    "20 - Peternakan",
    "21 - Ilmu Komunikasi",
    "22 - Keperawatan",
    "23 - Perikanan dan Ilmu Kelautan",
    "24 - Teknologi Industri Pertanian",
    "25 - Sekolah Pascasarjana",
    "26 - Farmasi",
    "27 - Teknik Geologi"
  ],
  "Spesialis": [
    "13 - Kedokteran",
    "16 - Kedokteran Gigi",
    "22 - Keperawatan",
    "26 - Farmasi"
  ],
  "Subspesialis": [
    "13 - Kedokteran"
  ],
  "Profesi": [
    "12 - Ekonomi dan Bisnis",
    "13 - Kedokteran",
    "16 - Kedokteran Gigi",
    "19 - Psikologi",
    "22 - Keperawatan",
    "25 - Sekolah Pascasarjana",
    "26 - Farmasi"
  ]
},
  prodiByJenjang: {
  "Sarjana": [
    "Administrasi Bisnis (Sarjana)",
    "Administrasi Bisnis PSDKU (Sarjana)",
    "Administrasi Publik (Sarjana)",
    "Agribisnis (Sarjana)",
    "Agroteknologi (Sarjana)",
    "Aktuaria (Sarjana)",
    "Akuntansi (Sarjana)",
    "Antropologi (Sarjana)",
    "Biologi (Sarjana)",
    "Bisnis Digital (Sarjana)",
    "Ekonomi Islam (Sarjana)",
    "Ekonomi Pembangunan (Sarjana)",
    "Farmasi (Sarjana)",
    "Fisika (Sarjana)",
    "Geofisika (Sarjana)",
    "Hubungan Internasional (Sarjana)",
    "Hubungan Masyarakat (Sarjana)",
    "Ilmu Ekonomi (Sarjana)",
    "Ilmu Hukum (Sarjana)",
    "Ilmu Kelautan (Sarjana)",
    "Ilmu Komunikasi (Sarjana)",
    "Ilmu Komunikasi PSDKU (Sarjana)",
    "Ilmu Pemerintahan (Sarjana)",
    "Ilmu Politik (Sarjana)",
    "Jurnalistik (Sarjana)",
    "Kedokteran (Sarjana)",
    "Kedokteran Gigi (Sarjana)",
    "Kedokteran Hewan (Sarjana)",
    "Keperawatan (Sarjana)",
    "Keperawatan PSDKU (Sarjana)",
    "Kesejahteraan Sosial (Sarjana)",
    "Kimia (Sarjana)",
    "Manajemen (Sarjana)",
    "Manajemen Komunikasi (Sarjana)",
    "Matematika (Sarjana)",
    "Perikanan (Sarjana)",
    "Perikanan PSDKU (Sarjana)",
    "Perpustakaan dan Sains Informasi (Sarjana)",
    "Peternakan (Sarjana)",
    "Peternakan PSDKU (Sarjana)",
    "Psikologi (Sarjana)",
    "Sastra Arab (Sarjana)",
    "Sastra Indonesia (Sarjana)",
    "Sastra Inggris (Sarjana)",
    "Sastra Jepang (Sarjana)",
    "Sastra Jerman (Sarjana)",
    "Sastra Prancis (Sarjana)",
    "Sastra Rusia (Sarjana)",
    "Sastra Sunda (Sarjana)",
    "Sejarah (Sarjana)",
    "Sosiologi (Sarjana)",
    "Statistika (Sarjana)",
    "Teknik Elektro (Sarjana)",
    "Teknik Geologi (Sarjana)",
    "Teknik Informatika (Sarjana)",
    "Teknik Pertanian dan Biosistem (Sarjana)",
    "Teknologi Pangan (Sarjana)",
    "Televisi dan Film (Sarjana)"
  ],
  "Sarjana Terapan": [
    "Administrasi Keuangan Publik (Sarjana Terapan)",
    "Administrasi Pemerintahan (Sarjana Terapan)",
    "Agroteknopreneur (Sarjana Terapan)",
    "Akuntansi Perpajakan (Sarjana Terapan)",
    "Akuntansi Sektor Publik (Sarjana Terapan)",
    "Bahasa dan Budaya Tiongkok (Sarjana Terapan)",
    "Bisnis Internasional (Sarjana Terapan)",
    "Bisnis Logistik (Sarjana Terapan)",
    "Kearsipan Digital (Sarjana Terapan)",
    "Kebidanan (Sarjana Terapan)",
    "Keperawatan Anestesiologi (Sarjana Terapan)",
    "Manajemen Produksi Media (Sarjana Terapan)",
    "Pariwisata Bahari (Sarjana Terapan)",
    "Pemasaran Digital (Sarjana Terapan)",
    "Teknologi Industri Kimia (Sarjana Terapan)"
  ],
  "Magister": [
    "Administrasi Bisnis (Magister)",
    "Administrasi Publik (Magister)",
    "Agronomi (Magister)",
    "Akuntansi (Magister)",
    "Anti Aging dan Aesthetic Medicine (Magister)",
    "Antropologi (Magister)",
    "Biologi (Magister)",
    "Bioteknologi (Magister)",
    "Ekonomi (Magister)",
    "Ekonomi Pertanian (Magister)",
    "Ekonomi Pertanian Pendidikan Jarak Jauh (PJJ) (Magister)",
    "Ekonomi Terapan (Magister)",
    "Epidemiologi (Magister)",
    "Farmasi (Magister)",
    "Farmasi Klinik (Magister)",
    "Fisika (Magister)",
    "Hubungan Internasional (Magister)",
    "Hukum (Magister)",
    "Ilmu Keberlanjutan (Magister)",
    "Ilmu Kedokteran Dasar (Magister)",
    "Ilmu Kedokteran Gigi (Magister)",
    "Ilmu Komunikasi (Magister)",
    "Ilmu Lingkungan (Magister)",
    "Ilmu Manajemen (Magister)",
    "Ilmu Pemerintahan (Magister)",
    "Ilmu Peternakan (Magister)",
    "Ilmu Peternakan Pendidikan Jarak Jauh (PJJ) (Magister)",
    "Ilmu Politik (Magister)",
    "Ilmu Tanah (Magister)",
    "Inovasi Regional (Magister)",
    "Kajian Budaya (Magister)",
    "Kebidanan (Magister)",
    "Kebijakan Publik (Magister)",
    "Kenotariatan (Magister)",
    "Keperawatan (Magister)",
    "Kesehatan Masyarakat (Magister)",
    "Kesejahteraan Sosial (Magister)",
    "Kimia (Magister)",
    "Konservasi Laut (Magister)",
    "Linguistik (Magister)",
    "Manajemen (Magister)",
    "Manajemen (Sains) (Magister)",
    "Manajemen Keuangan Mikro Terpadu (Magister)",
    "Manajemen Sumber Daya Hayati (Magister)",
    "Matematika (Magister)",
    "Pariwisata Berkelanjutan (Magister)",
    "Perikanan (Magister)",
    "Psikologi (Magister)",
    "Psikologi Profesi (Magister)",
    "Sastra (Magister)",
    "Sejarah (Magister)",
    "Sosiologi (Magister)",
    "Statistika Terapan (Magister)",
    "Teknik Geologi (Magister)",
    "Teknologi Agroindustri (Magister)",
    "Teknologi Industri Pertanian (Magister)"
  ],
  "Doktor": [
    "Akuntansi (Doktor)",
    "Bioteknologi (Doktor)",
    "Ekonomi (Doktor)",
    "Farmasi (Doktor)",
    "Hubungan Internasional (Doktor)",
    "Hukum (Doktor)",
    "Ilmu Administrasi (Doktor)",
    "Ilmu Kedokteran Gigi (Doktor)",
    "Ilmu Komunikasi (Doktor)",
    "Ilmu Lingkungan (Doktor)",
    "Ilmu Pertanian (Doktor)",
    "Ilmu Peternakan (Doktor)",
    "Kedokteran (Doktor)",
    "Keperawatan (Doktor)",
    "Kesejahteraan Sosial (Doktor)",
    "Kimia (Doktor)",
    "Manajemen (Doktor)",
    "Matematika (Doktor)",
    "Perikanan dan Kelautan Berkelanjutan (Doktor)",
    "Psikologi (Doktor)",
    "Sastra (Doktor)",
    "Sosiologi (Doktor)",
    "Teknik Geologi (Doktor)",
    "Teknologi Agroindustri (Doktor)"
  ],
  "Spesialis": [
    "Anestesiologi dan Terapi Intensif (Spesialis)",
    "Bedah (Spesialis)",
    "Bedah Anak (Spesialis)",
    "Bedah Mulut (Spesialis)",
    "Bedah Mulut dan Maksilofasial (Spesialis)",
    "Bedah Saraf (Spesialis)",
    "Dermatologi, Venereologi dan Estetika (Spesialis)",
    "Farmasi Nuklir (Spesialis)",
    "Gizi Klinik (Spesialis)",
    "Ilmu Bedah Plastik (Spesialis)",
    "Ilmu Kesehatan Mata (RS Pusat Mata Nasional Cicendo) (Spesialis)",
    "Ilmu Kesehatan Mata (Spesialis)",
    "Ilmu Penyakit Kulit dan Kelamin (Spesialis)",
    "Ilmu Penyakit Mata (Spesialis)",
    "Ilmu Penyakit THT (Spesialis)",
    "Kedokteran Fisik dan Rehabilitasi (Spesialis)",
    "Kedokteran Forensik dan Studi Medikolegal (Spesialis)",
    "Kedokteran Jiwa (Spesialis)",
    "Kedokteran Keluarga Layanan Primer (Spesialis)",
    "Kedokteran Layanan Primer (Spesialis)",
    "Kedokteran Nuklir (Spesialis)",
    "Keperawatan Medikal Bedah (Spesialis)",
    "Kesehatan Anak (Spesialis)",
    "Kesehatan Gigi Anak (Spesialis)",
    "Kesehatan Telinga Hidung Tenggorok Bedah Kepala dan Leher (Spesialis)",
    "Konservasi Gigi (Spesialis)",
    "Neurologi (Spesialis)",
    "Obstetri dan Ginekologi (Spesialis)",
    "Orthopaedi dan Traumatologi (Spesialis)",
    "Ortodontik (Spesialis)",
    "Patologi Anatomik (Spesialis)",
    "Patologi Klinik (Spesialis)",
    "Penyakit Dalam (Spesialis)",
    "Penyakit Jantung dan Pembuluh Darah (Spesialis)",
    "Penyakit Mulut (Spesialis)",
    "Periodontik (Spesialis)",
    "Prostodontik (Spesialis)",
    "Radiologi (Spesialis)",
    "Radiologi Kedokteran Gigi (Spesialis)",
    "Urologi (Spesialis)"
  ],
  "Subspesialis": [
    "Anestesiologi dan Terapi Intensif (Subspesialis)",
    "Bedah (Subspesialis)",
    "Dermatologi, Venerologi, dan Estetika (Subspesialis)",
    "Ilmu Kesehatan Mata (Subspesialis)",
    "Kedokteran Fisik dan Rehabilitasi Medik (Subspesialis)",
    "Kesehatan Anak (Subspesialis)",
    "Obstetri dan Ginekologi (Subspesialis)",
    "Patologi Klinik (Subspesialis)",
    "Penyakit Dalam (Subspesialis)"
  ],
  "Profesi": [
    "Akuntan (Profesi)",
    "Apoteker (Profesi)",
    "Dokter (Profesi)",
    "Dokter Gigi (Profesi)",
    "Pendidikan Profesi Psikologi (Profesi)",
    "Profesi Dokter Hewan (Profesi)",
    "Profesi Ners (Profesi)",
    "Profesi Ners PSDKU Pangandaran (Profesi)",
    "Program Profesi Insinyur (Profesi)"
  ]
},
  prodiByFakultas: {
  "11 - Hukum": [
    "Hukum (Doktor)",
    "Hukum (Magister)",
    "Ilmu Hukum (Sarjana)",
    "Kenotariatan (Magister)"
  ],
  "12 - Ekonomi dan Bisnis": [
    "Akuntan (Profesi)",
    "Akuntansi (Doktor)",
    "Akuntansi (Magister)",
    "Akuntansi (Sarjana)",
    "Akuntansi Sektor Publik (Sarjana Terapan)",
    "Bisnis Digital (Sarjana)",
    "Ekonomi (Doktor)",
    "Ekonomi (Magister)",
    "Ekonomi Islam (Sarjana)",
    "Ekonomi Pembangunan (Sarjana)",
    "Ekonomi Terapan (Magister)",
    "Ilmu Ekonomi (Sarjana)",
    "Ilmu Manajemen (Magister)",
    "Manajemen (Doktor)",
    "Manajemen (Magister)",
    "Manajemen (Sains) (Magister)",
    "Manajemen (Sarjana)",
    "Manajemen Keuangan Mikro Terpadu (Magister)"
  ],
  "13 - Kedokteran": [
    "Anestesiologi dan Terapi Intensif (Spesialis)",
    "Anestesiologi dan Terapi Intensif (Subspesialis)",
    "Anti Aging dan Aesthetic Medicine (Magister)",
    "Bedah (Spesialis)",
    "Bedah (Subspesialis)",
    "Bedah Anak (Spesialis)",
    "Bedah Saraf (Spesialis)",
    "Dermatologi, Venereologi dan Estetika (Spesialis)",
    "Dermatologi, Venerologi, dan Estetika (Subspesialis)",
    "Dokter (Profesi)",
    "Epidemiologi (Magister)",
    "Gizi Klinik (Spesialis)",
    "Ilmu Bedah Plastik (Spesialis)",
    "Ilmu Kedokteran Dasar (Magister)",
    "Ilmu Kesehatan Mata (RS Pusat Mata Nasional Cicendo) (Spesialis)",
    "Ilmu Kesehatan Mata (Spesialis)",
    "Ilmu Kesehatan Mata (Subspesialis)",
    "Ilmu Penyakit Kulit dan Kelamin (Spesialis)",
    "Ilmu Penyakit Mata (Spesialis)",
    "Ilmu Penyakit THT (Spesialis)",
    "Kebidanan (Magister)",
    "Kedokteran (Doktor)",
    "Kedokteran (Sarjana)",
    "Kedokteran Fisik dan Rehabilitasi (Spesialis)",
    "Kedokteran Fisik dan Rehabilitasi Medik (Subspesialis)",
    "Kedokteran Forensik dan Studi Medikolegal (Spesialis)",
    "Kedokteran Hewan (Sarjana)",
    "Kedokteran Jiwa (Spesialis)",
    "Kedokteran Keluarga Layanan Primer (Spesialis)",
    "Kedokteran Layanan Primer (Spesialis)",
    "Kedokteran Nuklir (Spesialis)",
    "Kesehatan Anak (Spesialis)",
    "Kesehatan Anak (Subspesialis)",
    "Kesehatan Masyarakat (Magister)",
    "Kesehatan Telinga Hidung Tenggorok Bedah Kepala dan Leher (Spesialis)",
    "Neurologi (Spesialis)",
    "Obstetri dan Ginekologi (Spesialis)",
    "Obstetri dan Ginekologi (Subspesialis)",
    "Orthopaedi dan Traumatologi (Spesialis)",
    "Patologi Anatomik (Spesialis)",
    "Patologi Klinik (Spesialis)",
    "Patologi Klinik (Subspesialis)",
    "Penyakit Dalam (Spesialis)",
    "Penyakit Dalam (Subspesialis)",
    "Penyakit Jantung dan Pembuluh Darah (Spesialis)",
    "Profesi Dokter Hewan (Profesi)",
    "Radiologi (Spesialis)",
    "Urologi (Spesialis)"
  ],
  "14 - Matematika dan Ilmu Pengetahuan Alam": [
    "Aktuaria (Sarjana)",
    "Biologi (Magister)",
    "Biologi (Sarjana)",
    "Fisika (Magister)",
    "Fisika (Sarjana)",
    "Geofisika (Sarjana)",
    "Kimia (Doktor)",
    "Kimia (Magister)",
    "Kimia (Sarjana)",
    "Matematika (Doktor)",
    "Matematika (Magister)",
    "Matematika (Sarjana)",
    "Statistika (Sarjana)",
    "Statistika Terapan (Magister)",
    "Teknik Elektro (Sarjana)",
    "Teknik Informatika (Sarjana)"
  ],
  "15 - Pertanian": [
    "Agribisnis (Sarjana)",
    "Agronomi (Magister)",
    "Agroteknologi (Sarjana)",
    "Ekonomi Pertanian (Magister)",
    "Ekonomi Pertanian Pendidikan Jarak Jauh (PJJ) (Magister)",
    "Ilmu Pertanian (Doktor)",
    "Ilmu Tanah (Magister)"
  ],
  "16 - Kedokteran Gigi": [
    "Bedah Mulut (Spesialis)",
    "Bedah Mulut dan Maksilofasial (Spesialis)",
    "Dokter Gigi (Profesi)",
    "Ilmu Kedokteran Gigi (Doktor)",
    "Ilmu Kedokteran Gigi (Magister)",
    "Kedokteran Gigi (Sarjana)",
    "Kesehatan Gigi Anak (Spesialis)",
    "Konservasi Gigi (Spesialis)",
    "Ortodontik (Spesialis)",
    "Penyakit Mulut (Spesialis)",
    "Periodontik (Spesialis)",
    "Prostodontik (Spesialis)",
    "Radiologi Kedokteran Gigi (Spesialis)"
  ],
  "17 - Ilmu Sosial dan Ilmu Politik": [
    "Administrasi Bisnis (Magister)",
    "Administrasi Bisnis (Sarjana)",
    "Administrasi Publik (Magister)",
    "Administrasi Publik (Sarjana)",
    "Antropologi (Magister)",
    "Antropologi (Sarjana)",
    "Hubungan Internasional (Doktor)",
    "Hubungan Internasional (Magister)",
    "Hubungan Internasional (Sarjana)",
    "Ilmu Administrasi (Doktor)",
    "Ilmu Pemerintahan (Magister)",
    "Ilmu Pemerintahan (Sarjana)",
    "Ilmu Politik (Magister)",
    "Ilmu Politik (Sarjana)",
    "Kebijakan Publik (Magister)",
    "Kesejahteraan Sosial (Doktor)",
    "Kesejahteraan Sosial (Magister)",
    "Kesejahteraan Sosial (Sarjana)",
    "Sosiologi (Doktor)",
    "Sosiologi (Magister)",
    "Sosiologi (Sarjana)"
  ],
  "18 - Ilmu Budaya": [
    "Kajian Budaya (Magister)",
    "Linguistik (Magister)",
    "Sastra (Doktor)",
    "Sastra (Magister)",
    "Sastra Arab (Sarjana)",
    "Sastra Indonesia (Sarjana)",
    "Sastra Inggris (Sarjana)",
    "Sastra Jepang (Sarjana)",
    "Sastra Jerman (Sarjana)",
    "Sastra Prancis (Sarjana)",
    "Sastra Rusia (Sarjana)",
    "Sastra Sunda (Sarjana)",
    "Sejarah (Magister)",
    "Sejarah (Sarjana)"
  ],
  "19 - Psikologi": [
    "Pendidikan Profesi Psikologi (Profesi)",
    "Psikologi (Doktor)",
    "Psikologi (Magister)",
    "Psikologi (Sarjana)",
    "Psikologi Profesi (Magister)"
  ],
  "20 - Peternakan": [
    "Ilmu Peternakan (Doktor)",
    "Ilmu Peternakan (Magister)",
    "Ilmu Peternakan Pendidikan Jarak Jauh (PJJ) (Magister)",
    "Peternakan (Sarjana)"
  ],
  "21 - Ilmu Komunikasi": [
    "Hubungan Masyarakat (Sarjana)",
    "Ilmu Komunikasi (Doktor)",
    "Ilmu Komunikasi (Magister)",
    "Ilmu Komunikasi (Sarjana)",
    "Jurnalistik (Sarjana)",
    "Manajemen Komunikasi (Sarjana)",
    "Perpustakaan dan Sains Informasi (Sarjana)",
    "Televisi dan Film (Sarjana)"
  ],
  "22 - Keperawatan": [
    "Keperawatan (Doktor)",
    "Keperawatan (Magister)",
    "Keperawatan (Sarjana)",
    "Keperawatan Anestesiologi (Sarjana Terapan)",
    "Keperawatan Medikal Bedah (Spesialis)",
    "Profesi Ners (Profesi)",
    "Profesi Ners PSDKU Pangandaran (Profesi)"
  ],
  "23 - Perikanan dan Ilmu Kelautan": [
    "Ilmu Kelautan (Sarjana)",
    "Konservasi Laut (Magister)",
    "Perikanan (Magister)",
    "Perikanan (Sarjana)",
    "Perikanan dan Kelautan Berkelanjutan (Doktor)"
  ],
  "24 - Teknologi Industri Pertanian": [
    "Teknik Pertanian dan Biosistem (Sarjana)",
    "Teknologi Agroindustri (Doktor)",
    "Teknologi Agroindustri (Magister)",
    "Teknologi Industri Pertanian (Magister)",
    "Teknologi Pangan (Sarjana)"
  ],
  "25 - Sekolah Pascasarjana": [
    "Bioteknologi (Doktor)",
    "Bioteknologi (Magister)",
    "Ilmu Keberlanjutan (Magister)",
    "Ilmu Lingkungan (Doktor)",
    "Ilmu Lingkungan (Magister)",
    "Inovasi Regional (Magister)",
    "Manajemen Sumber Daya Hayati (Magister)",
    "Pariwisata Berkelanjutan (Magister)",
    "Program Profesi Insinyur (Profesi)"
  ],
  "26 - Farmasi": [
    "Apoteker (Profesi)",
    "Farmasi (Doktor)",
    "Farmasi (Magister)",
    "Farmasi (Sarjana)",
    "Farmasi Klinik (Magister)",
    "Farmasi Nuklir (Spesialis)"
  ],
  "27 - Teknik Geologi": [
    "Teknik Geologi (Doktor)",
    "Teknik Geologi (Magister)",
    "Teknik Geologi (Sarjana)"
  ],
  "28 - Sekolah Vokasi": [
    "Administrasi Keuangan Publik (Sarjana Terapan)",
    "Administrasi Pemerintahan (Sarjana Terapan)",
    "Agroteknopreneur (Sarjana Terapan)",
    "Akuntansi Perpajakan (Sarjana Terapan)",
    "Bahasa dan Budaya Tiongkok (Sarjana Terapan)",
    "Bisnis Internasional (Sarjana Terapan)",
    "Bisnis Logistik (Sarjana Terapan)",
    "Kearsipan Digital (Sarjana Terapan)",
    "Kebidanan (Sarjana Terapan)",
    "Manajemen Produksi Media (Sarjana Terapan)",
    "Pariwisata Bahari (Sarjana Terapan)",
    "Pemasaran Digital (Sarjana Terapan)",
    "Teknologi Industri Kimia (Sarjana Terapan)"
  ],
  "Program PSDKU Pangandaran": [
    "Administrasi Bisnis PSDKU (Sarjana)",
    "Ilmu Komunikasi PSDKU (Sarjana)",
    "Keperawatan PSDKU (Sarjana)",
    "Perikanan PSDKU (Sarjana)",
    "Peternakan PSDKU (Sarjana)"
  ]
},
};

type SeedNilai = {
  prodi: string;
  fakultas: string;
  jenjang: string;
  lengkap: number;
  tidakLengkap: number;
  null: number;
  total: number;
};

const SEED_NILAI: SeedNilai[] = [{"prodi": "Administrasi Bisnis (Magister)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Magister", "lengkap": 808, "tidakLengkap": 8, "null": 3, "total": 819}, {"prodi": "Administrasi Bisnis (Sarjana)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Sarjana", "lengkap": 808, "tidakLengkap": 8, "null": 3, "total": 819}, {"prodi": "Administrasi Bisnis PSDKU (Sarjana)", "fakultas": "Program PSDKU Pangandaran", "jenjang": "Sarjana", "lengkap": 296, "tidakLengkap": 3, "null": 1, "total": 300}, {"prodi": "Administrasi Keuangan Publik (Sarjana Terapan)", "fakultas": "28 - Sekolah Vokasi", "jenjang": "Sarjana Terapan", "lengkap": 568, "tidakLengkap": 6, "null": 2, "total": 576}, {"prodi": "Administrasi Pemerintahan (Sarjana Terapan)", "fakultas": "28 - Sekolah Vokasi", "jenjang": "Sarjana Terapan", "lengkap": 568, "tidakLengkap": 6, "null": 2, "total": 576}, {"prodi": "Administrasi Publik (Magister)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Magister", "lengkap": 808, "tidakLengkap": 8, "null": 3, "total": 819}, {"prodi": "Administrasi Publik (Sarjana)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Sarjana", "lengkap": 808, "tidakLengkap": 8, "null": 3, "total": 819}, {"prodi": "Agribisnis (Sarjana)", "fakultas": "15 - Pertanian", "jenjang": "Sarjana", "lengkap": 1551, "tidakLengkap": 16, "null": 4, "total": 1571}, {"prodi": "Agronomi (Magister)", "fakultas": "15 - Pertanian", "jenjang": "Magister", "lengkap": 1551, "tidakLengkap": 16, "null": 4, "total": 1571}, {"prodi": "Agroteknologi (Sarjana)", "fakultas": "15 - Pertanian", "jenjang": "Sarjana", "lengkap": 1551, "tidakLengkap": 16, "null": 4, "total": 1571}, {"prodi": "Agroteknopreneur (Sarjana Terapan)", "fakultas": "28 - Sekolah Vokasi", "jenjang": "Sarjana Terapan", "lengkap": 568, "tidakLengkap": 6, "null": 2, "total": 576}, {"prodi": "Aktuaria (Sarjana)", "fakultas": "14 - Matematika dan Ilmu Pengetahuan Alam", "jenjang": "Sarjana", "lengkap": 1122, "tidakLengkap": 11, "null": 4, "total": 1137}, {"prodi": "Akuntan (Profesi)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Profesi", "lengkap": 124, "tidakLengkap": 0, "null": 0, "total": 124}, {"prodi": "Akuntansi (Doktor)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Doktor", "lengkap": 3673, "tidakLengkap": 27, "null": 3, "total": 3703}, {"prodi": "Akuntansi (Magister)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Magister", "lengkap": 3673, "tidakLengkap": 27, "null": 3, "total": 3703}, {"prodi": "Akuntansi (Sarjana)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Sarjana", "lengkap": 3673, "tidakLengkap": 27, "null": 3, "total": 3703}, {"prodi": "Akuntansi Perpajakan (Sarjana Terapan)", "fakultas": "28 - Sekolah Vokasi", "jenjang": "Sarjana Terapan", "lengkap": 568, "tidakLengkap": 6, "null": 2, "total": 576}, {"prodi": "Akuntansi Sektor Publik (Sarjana Terapan)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Sarjana Terapan", "lengkap": 1045, "tidakLengkap": 0, "null": 0, "total": 1045}, {"prodi": "Anestesiologi dan Terapi Intensif (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "lengkap": 388, "tidakLengkap": 4, "null": 1, "total": 393}, {"prodi": "Anestesiologi dan Terapi Intensif (Subspesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Subspesialis", "lengkap": 388, "tidakLengkap": 4, "null": 1, "total": 393}, {"prodi": "Anti Aging dan Aesthetic Medicine (Magister)", "fakultas": "13 - Kedokteran", "jenjang": "Magister", "lengkap": 388, "tidakLengkap": 4, "null": 1, "total": 393}, {"prodi": "Antropologi (Magister)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Magister", "lengkap": 808, "tidakLengkap": 8, "null": 3, "total": 819}, {"prodi": "Antropologi (Sarjana)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Sarjana", "lengkap": 808, "tidakLengkap": 8, "null": 3, "total": 819}, {"prodi": "Apoteker (Profesi)", "fakultas": "26 - Farmasi", "jenjang": "Profesi", "lengkap": 1464, "tidakLengkap": 15, "null": 4, "total": 1483}, {"prodi": "Bahasa dan Budaya Tiongkok (Sarjana Terapan)", "fakultas": "28 - Sekolah Vokasi", "jenjang": "Sarjana Terapan", "lengkap": 568, "tidakLengkap": 6, "null": 2, "total": 576}, {"prodi": "Bedah (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "lengkap": 388, "tidakLengkap": 4, "null": 1, "total": 393}, {"prodi": "Bedah (Subspesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Subspesialis", "lengkap": 388, "tidakLengkap": 4, "null": 1, "total": 393}, {"prodi": "Bedah Anak (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "lengkap": 388, "tidakLengkap": 4, "null": 1, "total": 393}, {"prodi": "Bedah Mulut (Spesialis)", "fakultas": "16 - Kedokteran Gigi", "jenjang": "Spesialis", "lengkap": 447, "tidakLengkap": 4, "null": 2, "total": 453}, {"prodi": "Bedah Mulut dan Maksilofasial (Spesialis)", "fakultas": "16 - Kedokteran Gigi", "jenjang": "Spesialis", "lengkap": 447, "tidakLengkap": 4, "null": 2, "total": 453}, {"prodi": "Bedah Saraf (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "lengkap": 388, "tidakLengkap": 4, "null": 1, "total": 393}, {"prodi": "Biologi (Magister)", "fakultas": "14 - Matematika dan Ilmu Pengetahuan Alam", "jenjang": "Magister", "lengkap": 1122, "tidakLengkap": 11, "null": 4, "total": 1137}, {"prodi": "Biologi (Sarjana)", "fakultas": "14 - Matematika dan Ilmu Pengetahuan Alam", "jenjang": "Sarjana", "lengkap": 1122, "tidakLengkap": 11, "null": 4, "total": 1137}, {"prodi": "Bioteknologi (Doktor)", "fakultas": "25 - Sekolah Pascasarjana", "jenjang": "Doktor", "lengkap": 438, "tidakLengkap": 4, "null": 2, "total": 444}, {"prodi": "Bioteknologi (Magister)", "fakultas": "25 - Sekolah Pascasarjana", "jenjang": "Magister", "lengkap": 438, "tidakLengkap": 4, "null": 2, "total": 444}, {"prodi": "Bisnis Digital (Sarjana)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Sarjana", "lengkap": 1673, "tidakLengkap": 24, "null": 0, "total": 1697}, {"prodi": "Bisnis Internasional (Sarjana Terapan)", "fakultas": "28 - Sekolah Vokasi", "jenjang": "Sarjana Terapan", "lengkap": 568, "tidakLengkap": 6, "null": 2, "total": 576}, {"prodi": "Bisnis Logistik (Sarjana Terapan)", "fakultas": "28 - Sekolah Vokasi", "jenjang": "Sarjana Terapan", "lengkap": 568, "tidakLengkap": 6, "null": 2, "total": 576}, {"prodi": "Dermatologi, Venereologi dan Estetika (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "lengkap": 388, "tidakLengkap": 4, "null": 1, "total": 393}, {"prodi": "Dermatologi, Venerologi, dan Estetika (Subspesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Subspesialis", "lengkap": 388, "tidakLengkap": 4, "null": 1, "total": 393}, {"prodi": "Dokter (Profesi)", "fakultas": "13 - Kedokteran", "jenjang": "Profesi", "lengkap": 388, "tidakLengkap": 4, "null": 1, "total": 393}, {"prodi": "Dokter Gigi (Profesi)", "fakultas": "16 - Kedokteran Gigi", "jenjang": "Profesi", "lengkap": 447, "tidakLengkap": 4, "null": 2, "total": 453}, {"prodi": "Ekonomi (Doktor)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Doktor", "lengkap": 71, "tidakLengkap": 0, "null": 1, "total": 72}, {"prodi": "Ekonomi (Magister)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Magister", "lengkap": 71, "tidakLengkap": 0, "null": 1, "total": 72}, {"prodi": "Ekonomi Islam (Sarjana)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Sarjana", "lengkap": 2615, "tidakLengkap": 3, "null": 0, "total": 2618}, {"prodi": "Ekonomi Pembangunan (Sarjana)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Sarjana", "lengkap": 1028, "tidakLengkap": 10, "null": 4, "total": 1042}, {"prodi": "Ekonomi Pertanian (Magister)", "fakultas": "15 - Pertanian", "jenjang": "Magister", "lengkap": 1551, "tidakLengkap": 16, "null": 4, "total": 1571}, {"prodi": "Ekonomi Pertanian Pendidikan Jarak Jauh (PJJ) (Magister)", "fakultas": "15 - Pertanian", "jenjang": "Magister", "lengkap": 1551, "tidakLengkap": 16, "null": 4, "total": 1571}, {"prodi": "Ekonomi Terapan (Magister)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Magister", "lengkap": 1028, "tidakLengkap": 10, "null": 4, "total": 1042}, {"prodi": "Epidemiologi (Magister)", "fakultas": "13 - Kedokteran", "jenjang": "Magister", "lengkap": 388, "tidakLengkap": 4, "null": 1, "total": 393}, {"prodi": "Farmasi (Doktor)", "fakultas": "26 - Farmasi", "jenjang": "Doktor", "lengkap": 1464, "tidakLengkap": 15, "null": 4, "total": 1483}, {"prodi": "Farmasi (Magister)", "fakultas": "26 - Farmasi", "jenjang": "Magister", "lengkap": 1464, "tidakLengkap": 15, "null": 4, "total": 1483}, {"prodi": "Farmasi (Sarjana)", "fakultas": "26 - Farmasi", "jenjang": "Sarjana", "lengkap": 1464, "tidakLengkap": 15, "null": 4, "total": 1483}, {"prodi": "Farmasi Klinik (Magister)", "fakultas": "26 - Farmasi", "jenjang": "Magister", "lengkap": 1464, "tidakLengkap": 15, "null": 4, "total": 1483}, {"prodi": "Farmasi Nuklir (Spesialis)", "fakultas": "26 - Farmasi", "jenjang": "Spesialis", "lengkap": 1464, "tidakLengkap": 15, "null": 4, "total": 1483}, {"prodi": "Fisika (Magister)", "fakultas": "14 - Matematika dan Ilmu Pengetahuan Alam", "jenjang": "Magister", "lengkap": 1122, "tidakLengkap": 11, "null": 4, "total": 1137}, {"prodi": "Fisika (Sarjana)", "fakultas": "14 - Matematika dan Ilmu Pengetahuan Alam", "jenjang": "Sarjana", "lengkap": 1122, "tidakLengkap": 11, "null": 4, "total": 1137}, {"prodi": "Geofisika (Sarjana)", "fakultas": "14 - Matematika dan Ilmu Pengetahuan Alam", "jenjang": "Sarjana", "lengkap": 1122, "tidakLengkap": 11, "null": 4, "total": 1137}, {"prodi": "Gizi Klinik (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "lengkap": 388, "tidakLengkap": 4, "null": 1, "total": 393}, {"prodi": "Hubungan Internasional (Doktor)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Doktor", "lengkap": 808, "tidakLengkap": 8, "null": 3, "total": 819}, {"prodi": "Hubungan Internasional (Magister)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Magister", "lengkap": 808, "tidakLengkap": 8, "null": 3, "total": 819}, {"prodi": "Hubungan Internasional (Sarjana)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Sarjana", "lengkap": 808, "tidakLengkap": 8, "null": 3, "total": 819}, {"prodi": "Hubungan Masyarakat (Sarjana)", "fakultas": "21 - Ilmu Komunikasi", "jenjang": "Sarjana", "lengkap": 2036, "tidakLengkap": 21, "null": 5, "total": 2062}, {"prodi": "Hukum (Doktor)", "fakultas": "11 - Hukum", "jenjang": "Doktor", "lengkap": 2986, "tidakLengkap": 31, "null": 8, "total": 3025}, {"prodi": "Hukum (Magister)", "fakultas": "11 - Hukum", "jenjang": "Magister", "lengkap": 2986, "tidakLengkap": 31, "null": 8, "total": 3025}, {"prodi": "Ilmu Administrasi (Doktor)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Doktor", "lengkap": 808, "tidakLengkap": 8, "null": 3, "total": 819}, {"prodi": "Ilmu Bedah Plastik (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "lengkap": 388, "tidakLengkap": 4, "null": 1, "total": 393}, {"prodi": "Ilmu Ekonomi (Sarjana)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Sarjana", "lengkap": 2582, "tidakLengkap": 1, "null": 13, "total": 2596}, {"prodi": "Ilmu Hukum (Sarjana)", "fakultas": "11 - Hukum", "jenjang": "Sarjana", "lengkap": 2986, "tidakLengkap": 31, "null": 8, "total": 3025}, {"prodi": "Ilmu Keberlanjutan (Magister)", "fakultas": "25 - Sekolah Pascasarjana", "jenjang": "Magister", "lengkap": 438, "tidakLengkap": 4, "null": 2, "total": 444}, {"prodi": "Ilmu Kedokteran Dasar (Magister)", "fakultas": "13 - Kedokteran", "jenjang": "Magister", "lengkap": 388, "tidakLengkap": 4, "null": 1, "total": 393}, {"prodi": "Ilmu Kedokteran Gigi (Doktor)", "fakultas": "16 - Kedokteran Gigi", "jenjang": "Doktor", "lengkap": 447, "tidakLengkap": 4, "null": 2, "total": 453}, {"prodi": "Ilmu Kedokteran Gigi (Magister)", "fakultas": "16 - Kedokteran Gigi", "jenjang": "Magister", "lengkap": 447, "tidakLengkap": 4, "null": 2, "total": 453}, {"prodi": "Ilmu Kelautan (Sarjana)", "fakultas": "23 - Perikanan dan Ilmu Kelautan", "jenjang": "Sarjana", "lengkap": 1382, "tidakLengkap": 14, "null": 4, "total": 1400}, {"prodi": "Ilmu Kesehatan Mata (RS Pusat Mata Nasional Cicendo) (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "lengkap": 388, "tidakLengkap": 4, "null": 1, "total": 393}, {"prodi": "Ilmu Kesehatan Mata (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "lengkap": 388, "tidakLengkap": 4, "null": 1, "total": 393}, {"prodi": "Ilmu Kesehatan Mata (Subspesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Subspesialis", "lengkap": 388, "tidakLengkap": 4, "null": 1, "total": 393}, {"prodi": "Ilmu Komunikasi (Doktor)", "fakultas": "21 - Ilmu Komunikasi", "jenjang": "Doktor", "lengkap": 2036, "tidakLengkap": 21, "null": 5, "total": 2062}, {"prodi": "Ilmu Komunikasi (Magister)", "fakultas": "21 - Ilmu Komunikasi", "jenjang": "Magister", "lengkap": 2036, "tidakLengkap": 21, "null": 5, "total": 2062}, {"prodi": "Ilmu Komunikasi (Sarjana)", "fakultas": "21 - Ilmu Komunikasi", "jenjang": "Sarjana", "lengkap": 2036, "tidakLengkap": 21, "null": 5, "total": 2062}, {"prodi": "Ilmu Komunikasi PSDKU (Sarjana)", "fakultas": "Program PSDKU Pangandaran", "jenjang": "Sarjana", "lengkap": 296, "tidakLengkap": 3, "null": 1, "total": 300}, {"prodi": "Ilmu Lingkungan (Doktor)", "fakultas": "25 - Sekolah Pascasarjana", "jenjang": "Doktor", "lengkap": 438, "tidakLengkap": 4, "null": 2, "total": 444}, {"prodi": "Ilmu Lingkungan (Magister)", "fakultas": "25 - Sekolah Pascasarjana", "jenjang": "Magister", "lengkap": 438, "tidakLengkap": 4, "null": 2, "total": 444}, {"prodi": "Ilmu Manajemen (Magister)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Magister", "lengkap": 1028, "tidakLengkap": 10, "null": 4, "total": 1042}, {"prodi": "Ilmu Pemerintahan (Magister)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Magister", "lengkap": 808, "tidakLengkap": 8, "null": 3, "total": 819}, {"prodi": "Ilmu Pemerintahan (Sarjana)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Sarjana", "lengkap": 808, "tidakLengkap": 8, "null": 3, "total": 819}, {"prodi": "Ilmu Penyakit Kulit dan Kelamin (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "lengkap": 388, "tidakLengkap": 4, "null": 1, "total": 393}, {"prodi": "Ilmu Penyakit Mata (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "lengkap": 388, "tidakLengkap": 4, "null": 1, "total": 393}, {"prodi": "Ilmu Penyakit THT (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "lengkap": 388, "tidakLengkap": 4, "null": 1, "total": 393}, {"prodi": "Ilmu Pertanian (Doktor)", "fakultas": "15 - Pertanian", "jenjang": "Doktor", "lengkap": 1551, "tidakLengkap": 16, "null": 4, "total": 1571}, {"prodi": "Ilmu Peternakan (Doktor)", "fakultas": "20 - Peternakan", "jenjang": "Doktor", "lengkap": 1530, "tidakLengkap": 16, "null": 4, "total": 1550}, {"prodi": "Ilmu Peternakan (Magister)", "fakultas": "20 - Peternakan", "jenjang": "Magister", "lengkap": 1530, "tidakLengkap": 16, "null": 4, "total": 1550}, {"prodi": "Ilmu Peternakan Pendidikan Jarak Jauh (PJJ) (Magister)", "fakultas": "20 - Peternakan", "jenjang": "Magister", "lengkap": 1530, "tidakLengkap": 16, "null": 4, "total": 1550}, {"prodi": "Ilmu Politik (Magister)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Magister", "lengkap": 808, "tidakLengkap": 8, "null": 3, "total": 819}, {"prodi": "Ilmu Politik (Sarjana)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Sarjana", "lengkap": 808, "tidakLengkap": 8, "null": 3, "total": 819}, {"prodi": "Ilmu Tanah (Magister)", "fakultas": "15 - Pertanian", "jenjang": "Magister", "lengkap": 1551, "tidakLengkap": 16, "null": 4, "total": 1571}, {"prodi": "Inovasi Regional (Magister)", "fakultas": "25 - Sekolah Pascasarjana", "jenjang": "Magister", "lengkap": 438, "tidakLengkap": 4, "null": 2, "total": 444}, {"prodi": "Jurnalistik (Sarjana)", "fakultas": "21 - Ilmu Komunikasi", "jenjang": "Sarjana", "lengkap": 2036, "tidakLengkap": 21, "null": 5, "total": 2062}, {"prodi": "Kajian Budaya (Magister)", "fakultas": "18 - Ilmu Budaya", "jenjang": "Magister", "lengkap": 1254, "tidakLengkap": 13, "null": 4, "total": 1271}, {"prodi": "Kearsipan Digital (Sarjana Terapan)", "fakultas": "28 - Sekolah Vokasi", "jenjang": "Sarjana Terapan", "lengkap": 568, "tidakLengkap": 6, "null": 2, "total": 576}, {"prodi": "Kebidanan (Magister)", "fakultas": "13 - Kedokteran", "jenjang": "Magister", "lengkap": 388, "tidakLengkap": 4, "null": 1, "total": 393}, {"prodi": "Kebidanan (Sarjana Terapan)", "fakultas": "28 - Sekolah Vokasi", "jenjang": "Sarjana Terapan", "lengkap": 568, "tidakLengkap": 6, "null": 2, "total": 576}, {"prodi": "Kebijakan Publik (Magister)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Magister", "lengkap": 808, "tidakLengkap": 8, "null": 3, "total": 819}, {"prodi": "Kedokteran (Doktor)", "fakultas": "13 - Kedokteran", "jenjang": "Doktor", "lengkap": 388, "tidakLengkap": 4, "null": 1, "total": 393}, {"prodi": "Kedokteran (Sarjana)", "fakultas": "13 - Kedokteran", "jenjang": "Sarjana", "lengkap": 388, "tidakLengkap": 4, "null": 1, "total": 393}, {"prodi": "Kedokteran Fisik dan Rehabilitasi (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "lengkap": 388, "tidakLengkap": 4, "null": 1, "total": 393}, {"prodi": "Kedokteran Fisik dan Rehabilitasi Medik (Subspesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Subspesialis", "lengkap": 388, "tidakLengkap": 4, "null": 1, "total": 393}, {"prodi": "Kedokteran Forensik dan Studi Medikolegal (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "lengkap": 388, "tidakLengkap": 4, "null": 1, "total": 393}, {"prodi": "Kedokteran Gigi (Sarjana)", "fakultas": "16 - Kedokteran Gigi", "jenjang": "Sarjana", "lengkap": 447, "tidakLengkap": 4, "null": 2, "total": 453}, {"prodi": "Kedokteran Hewan (Sarjana)", "fakultas": "13 - Kedokteran", "jenjang": "Sarjana", "lengkap": 388, "tidakLengkap": 4, "null": 1, "total": 393}, {"prodi": "Kedokteran Jiwa (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "lengkap": 388, "tidakLengkap": 4, "null": 1, "total": 393}, {"prodi": "Kedokteran Keluarga Layanan Primer (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "lengkap": 388, "tidakLengkap": 4, "null": 1, "total": 393}, {"prodi": "Kedokteran Layanan Primer (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "lengkap": 388, "tidakLengkap": 4, "null": 1, "total": 393}, {"prodi": "Kedokteran Nuklir (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "lengkap": 388, "tidakLengkap": 4, "null": 1, "total": 393}, {"prodi": "Kenotariatan (Magister)", "fakultas": "11 - Hukum", "jenjang": "Magister", "lengkap": 2986, "tidakLengkap": 31, "null": 8, "total": 3025}, {"prodi": "Keperawatan (Doktor)", "fakultas": "22 - Keperawatan", "jenjang": "Doktor", "lengkap": 860, "tidakLengkap": 9, "null": 2, "total": 871}, {"prodi": "Keperawatan (Magister)", "fakultas": "22 - Keperawatan", "jenjang": "Magister", "lengkap": 860, "tidakLengkap": 9, "null": 2, "total": 871}, {"prodi": "Keperawatan (Sarjana)", "fakultas": "22 - Keperawatan", "jenjang": "Sarjana", "lengkap": 860, "tidakLengkap": 9, "null": 2, "total": 871}, {"prodi": "Keperawatan Anestesiologi (Sarjana Terapan)", "fakultas": "22 - Keperawatan", "jenjang": "Sarjana Terapan", "lengkap": 860, "tidakLengkap": 9, "null": 2, "total": 871}, {"prodi": "Keperawatan Medikal Bedah (Spesialis)", "fakultas": "22 - Keperawatan", "jenjang": "Spesialis", "lengkap": 860, "tidakLengkap": 9, "null": 2, "total": 871}, {"prodi": "Keperawatan PSDKU (Sarjana)", "fakultas": "Program PSDKU Pangandaran", "jenjang": "Sarjana", "lengkap": 296, "tidakLengkap": 3, "null": 1, "total": 300}, {"prodi": "Kesehatan Anak (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "lengkap": 388, "tidakLengkap": 4, "null": 1, "total": 393}, {"prodi": "Kesehatan Anak (Subspesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Subspesialis", "lengkap": 388, "tidakLengkap": 4, "null": 1, "total": 393}, {"prodi": "Kesehatan Gigi Anak (Spesialis)", "fakultas": "16 - Kedokteran Gigi", "jenjang": "Spesialis", "lengkap": 447, "tidakLengkap": 4, "null": 2, "total": 453}, {"prodi": "Kesehatan Masyarakat (Magister)", "fakultas": "13 - Kedokteran", "jenjang": "Magister", "lengkap": 388, "tidakLengkap": 4, "null": 1, "total": 393}, {"prodi": "Kesehatan Telinga Hidung Tenggorok Bedah Kepala dan Leher (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "lengkap": 388, "tidakLengkap": 4, "null": 1, "total": 393}, {"prodi": "Kesejahteraan Sosial (Doktor)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Doktor", "lengkap": 808, "tidakLengkap": 8, "null": 3, "total": 819}, {"prodi": "Kesejahteraan Sosial (Magister)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Magister", "lengkap": 808, "tidakLengkap": 8, "null": 3, "total": 819}, {"prodi": "Kesejahteraan Sosial (Sarjana)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Sarjana", "lengkap": 808, "tidakLengkap": 8, "null": 3, "total": 819}, {"prodi": "Kimia (Doktor)", "fakultas": "14 - Matematika dan Ilmu Pengetahuan Alam", "jenjang": "Doktor", "lengkap": 1122, "tidakLengkap": 11, "null": 4, "total": 1137}, {"prodi": "Kimia (Magister)", "fakultas": "14 - Matematika dan Ilmu Pengetahuan Alam", "jenjang": "Magister", "lengkap": 1122, "tidakLengkap": 11, "null": 4, "total": 1137}, {"prodi": "Kimia (Sarjana)", "fakultas": "14 - Matematika dan Ilmu Pengetahuan Alam", "jenjang": "Sarjana", "lengkap": 1122, "tidakLengkap": 11, "null": 4, "total": 1137}, {"prodi": "Konservasi Gigi (Spesialis)", "fakultas": "16 - Kedokteran Gigi", "jenjang": "Spesialis", "lengkap": 447, "tidakLengkap": 4, "null": 2, "total": 453}, {"prodi": "Konservasi Laut (Magister)", "fakultas": "23 - Perikanan dan Ilmu Kelautan", "jenjang": "Magister", "lengkap": 1382, "tidakLengkap": 14, "null": 4, "total": 1400}, {"prodi": "Linguistik (Magister)", "fakultas": "18 - Ilmu Budaya", "jenjang": "Magister", "lengkap": 1254, "tidakLengkap": 13, "null": 4, "total": 1271}, {"prodi": "Manajemen (Doktor)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Doktor", "lengkap": 1028, "tidakLengkap": 10, "null": 4, "total": 1042}, {"prodi": "Manajemen (Magister)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Magister", "lengkap": 1028, "tidakLengkap": 10, "null": 4, "total": 1042}, {"prodi": "Manajemen (Sains) (Magister)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Magister", "lengkap": 1028, "tidakLengkap": 10, "null": 4, "total": 1042}, {"prodi": "Manajemen (Sarjana)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Sarjana", "lengkap": 1028, "tidakLengkap": 10, "null": 4, "total": 1042}, {"prodi": "Manajemen Keuangan Mikro Terpadu (Magister)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Magister", "lengkap": 1028, "tidakLengkap": 10, "null": 4, "total": 1042}, {"prodi": "Manajemen Komunikasi (Sarjana)", "fakultas": "21 - Ilmu Komunikasi", "jenjang": "Sarjana", "lengkap": 2036, "tidakLengkap": 21, "null": 5, "total": 2062}, {"prodi": "Manajemen Produksi Media (Sarjana Terapan)", "fakultas": "28 - Sekolah Vokasi", "jenjang": "Sarjana Terapan", "lengkap": 568, "tidakLengkap": 6, "null": 2, "total": 576}, {"prodi": "Manajemen Sumber Daya Hayati (Magister)", "fakultas": "25 - Sekolah Pascasarjana", "jenjang": "Magister", "lengkap": 438, "tidakLengkap": 4, "null": 2, "total": 444}, {"prodi": "Matematika (Doktor)", "fakultas": "14 - Matematika dan Ilmu Pengetahuan Alam", "jenjang": "Doktor", "lengkap": 1122, "tidakLengkap": 11, "null": 4, "total": 1137}, {"prodi": "Matematika (Magister)", "fakultas": "14 - Matematika dan Ilmu Pengetahuan Alam", "jenjang": "Magister", "lengkap": 1122, "tidakLengkap": 11, "null": 4, "total": 1137}, {"prodi": "Matematika (Sarjana)", "fakultas": "14 - Matematika dan Ilmu Pengetahuan Alam", "jenjang": "Sarjana", "lengkap": 1122, "tidakLengkap": 11, "null": 4, "total": 1137}, {"prodi": "Neurologi (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "lengkap": 388, "tidakLengkap": 4, "null": 1, "total": 393}, {"prodi": "Obstetri dan Ginekologi (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "lengkap": 388, "tidakLengkap": 4, "null": 1, "total": 393}, {"prodi": "Obstetri dan Ginekologi (Subspesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Subspesialis", "lengkap": 388, "tidakLengkap": 4, "null": 1, "total": 393}, {"prodi": "Orthopaedi dan Traumatologi (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "lengkap": 388, "tidakLengkap": 4, "null": 1, "total": 393}, {"prodi": "Ortodontik (Spesialis)", "fakultas": "16 - Kedokteran Gigi", "jenjang": "Spesialis", "lengkap": 447, "tidakLengkap": 4, "null": 2, "total": 453}, {"prodi": "Pariwisata Bahari (Sarjana Terapan)", "fakultas": "28 - Sekolah Vokasi", "jenjang": "Sarjana Terapan", "lengkap": 568, "tidakLengkap": 6, "null": 2, "total": 576}, {"prodi": "Pariwisata Berkelanjutan (Magister)", "fakultas": "25 - Sekolah Pascasarjana", "jenjang": "Magister", "lengkap": 438, "tidakLengkap": 4, "null": 2, "total": 444}, {"prodi": "Patologi Anatomik (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "lengkap": 388, "tidakLengkap": 4, "null": 1, "total": 393}, {"prodi": "Patologi Klinik (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "lengkap": 388, "tidakLengkap": 4, "null": 1, "total": 393}, {"prodi": "Patologi Klinik (Subspesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Subspesialis", "lengkap": 388, "tidakLengkap": 4, "null": 1, "total": 393}, {"prodi": "Pemasaran Digital (Sarjana Terapan)", "fakultas": "28 - Sekolah Vokasi", "jenjang": "Sarjana Terapan", "lengkap": 568, "tidakLengkap": 6, "null": 2, "total": 576}, {"prodi": "Pendidikan Profesi Psikologi (Profesi)", "fakultas": "19 - Psikologi", "jenjang": "Profesi", "lengkap": 1086, "tidakLengkap": 11, "null": 3, "total": 1100}, {"prodi": "Penyakit Dalam (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "lengkap": 388, "tidakLengkap": 4, "null": 1, "total": 393}, {"prodi": "Penyakit Dalam (Subspesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Subspesialis", "lengkap": 388, "tidakLengkap": 4, "null": 1, "total": 393}, {"prodi": "Penyakit Jantung dan Pembuluh Darah (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "lengkap": 388, "tidakLengkap": 4, "null": 1, "total": 393}, {"prodi": "Penyakit Mulut (Spesialis)", "fakultas": "16 - Kedokteran Gigi", "jenjang": "Spesialis", "lengkap": 447, "tidakLengkap": 4, "null": 2, "total": 453}, {"prodi": "Perikanan (Magister)", "fakultas": "23 - Perikanan dan Ilmu Kelautan", "jenjang": "Magister", "lengkap": 1382, "tidakLengkap": 14, "null": 4, "total": 1400}, {"prodi": "Perikanan (Sarjana)", "fakultas": "23 - Perikanan dan Ilmu Kelautan", "jenjang": "Sarjana", "lengkap": 1382, "tidakLengkap": 14, "null": 4, "total": 1400}, {"prodi": "Perikanan dan Kelautan Berkelanjutan (Doktor)", "fakultas": "23 - Perikanan dan Ilmu Kelautan", "jenjang": "Doktor", "lengkap": 1382, "tidakLengkap": 14, "null": 4, "total": 1400}, {"prodi": "Perikanan PSDKU (Sarjana)", "fakultas": "Program PSDKU Pangandaran", "jenjang": "Sarjana", "lengkap": 296, "tidakLengkap": 3, "null": 1, "total": 300}, {"prodi": "Periodontik (Spesialis)", "fakultas": "16 - Kedokteran Gigi", "jenjang": "Spesialis", "lengkap": 447, "tidakLengkap": 4, "null": 2, "total": 453}, {"prodi": "Perpustakaan dan Sains Informasi (Sarjana)", "fakultas": "21 - Ilmu Komunikasi", "jenjang": "Sarjana", "lengkap": 2036, "tidakLengkap": 21, "null": 5, "total": 2062}, {"prodi": "Peternakan (Sarjana)", "fakultas": "20 - Peternakan", "jenjang": "Sarjana", "lengkap": 1530, "tidakLengkap": 16, "null": 4, "total": 1550}, {"prodi": "Peternakan PSDKU (Sarjana)", "fakultas": "Program PSDKU Pangandaran", "jenjang": "Sarjana", "lengkap": 296, "tidakLengkap": 3, "null": 1, "total": 300}, {"prodi": "Profesi Dokter Hewan (Profesi)", "fakultas": "13 - Kedokteran", "jenjang": "Profesi", "lengkap": 388, "tidakLengkap": 4, "null": 1, "total": 393}, {"prodi": "Profesi Ners (Profesi)", "fakultas": "22 - Keperawatan", "jenjang": "Profesi", "lengkap": 860, "tidakLengkap": 9, "null": 2, "total": 871}, {"prodi": "Profesi Ners PSDKU Pangandaran (Profesi)", "fakultas": "22 - Keperawatan", "jenjang": "Profesi", "lengkap": 860, "tidakLengkap": 9, "null": 2, "total": 871}, {"prodi": "Program Profesi Insinyur (Profesi)", "fakultas": "25 - Sekolah Pascasarjana", "jenjang": "Profesi", "lengkap": 438, "tidakLengkap": 4, "null": 2, "total": 444}, {"prodi": "Prostodontik (Spesialis)", "fakultas": "16 - Kedokteran Gigi", "jenjang": "Spesialis", "lengkap": 447, "tidakLengkap": 4, "null": 2, "total": 453}, {"prodi": "Psikologi (Doktor)", "fakultas": "19 - Psikologi", "jenjang": "Doktor", "lengkap": 1086, "tidakLengkap": 11, "null": 3, "total": 1100}, {"prodi": "Psikologi (Magister)", "fakultas": "19 - Psikologi", "jenjang": "Magister", "lengkap": 1086, "tidakLengkap": 11, "null": 3, "total": 1100}, {"prodi": "Psikologi (Sarjana)", "fakultas": "19 - Psikologi", "jenjang": "Sarjana", "lengkap": 1086, "tidakLengkap": 11, "null": 3, "total": 1100}, {"prodi": "Psikologi Profesi (Magister)", "fakultas": "19 - Psikologi", "jenjang": "Magister", "lengkap": 1086, "tidakLengkap": 11, "null": 3, "total": 1100}, {"prodi": "Radiologi (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "lengkap": 388, "tidakLengkap": 4, "null": 1, "total": 393}, {"prodi": "Radiologi Kedokteran Gigi (Spesialis)", "fakultas": "16 - Kedokteran Gigi", "jenjang": "Spesialis", "lengkap": 447, "tidakLengkap": 4, "null": 2, "total": 453}, {"prodi": "Sastra (Doktor)", "fakultas": "18 - Ilmu Budaya", "jenjang": "Doktor", "lengkap": 1254, "tidakLengkap": 13, "null": 4, "total": 1271}, {"prodi": "Sastra (Magister)", "fakultas": "18 - Ilmu Budaya", "jenjang": "Magister", "lengkap": 1254, "tidakLengkap": 13, "null": 4, "total": 1271}, {"prodi": "Sastra Arab (Sarjana)", "fakultas": "18 - Ilmu Budaya", "jenjang": "Sarjana", "lengkap": 1254, "tidakLengkap": 13, "null": 4, "total": 1271}, {"prodi": "Sastra Indonesia (Sarjana)", "fakultas": "18 - Ilmu Budaya", "jenjang": "Sarjana", "lengkap": 1254, "tidakLengkap": 13, "null": 4, "total": 1271}, {"prodi": "Sastra Inggris (Sarjana)", "fakultas": "18 - Ilmu Budaya", "jenjang": "Sarjana", "lengkap": 1254, "tidakLengkap": 13, "null": 4, "total": 1271}, {"prodi": "Sastra Jepang (Sarjana)", "fakultas": "18 - Ilmu Budaya", "jenjang": "Sarjana", "lengkap": 1254, "tidakLengkap": 13, "null": 4, "total": 1271}, {"prodi": "Sastra Jerman (Sarjana)", "fakultas": "18 - Ilmu Budaya", "jenjang": "Sarjana", "lengkap": 1254, "tidakLengkap": 13, "null": 4, "total": 1271}, {"prodi": "Sastra Prancis (Sarjana)", "fakultas": "18 - Ilmu Budaya", "jenjang": "Sarjana", "lengkap": 1254, "tidakLengkap": 13, "null": 4, "total": 1271}, {"prodi": "Sastra Rusia (Sarjana)", "fakultas": "18 - Ilmu Budaya", "jenjang": "Sarjana", "lengkap": 1254, "tidakLengkap": 13, "null": 4, "total": 1271}, {"prodi": "Sastra Sunda (Sarjana)", "fakultas": "18 - Ilmu Budaya", "jenjang": "Sarjana", "lengkap": 1254, "tidakLengkap": 13, "null": 4, "total": 1271}, {"prodi": "Sejarah (Magister)", "fakultas": "18 - Ilmu Budaya", "jenjang": "Magister", "lengkap": 1254, "tidakLengkap": 13, "null": 4, "total": 1271}, {"prodi": "Sejarah (Sarjana)", "fakultas": "18 - Ilmu Budaya", "jenjang": "Sarjana", "lengkap": 1254, "tidakLengkap": 13, "null": 4, "total": 1271}, {"prodi": "Sosiologi (Doktor)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Doktor", "lengkap": 808, "tidakLengkap": 8, "null": 3, "total": 819}, {"prodi": "Sosiologi (Magister)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Magister", "lengkap": 808, "tidakLengkap": 8, "null": 3, "total": 819}, {"prodi": "Sosiologi (Sarjana)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Sarjana", "lengkap": 808, "tidakLengkap": 8, "null": 3, "total": 819}, {"prodi": "Statistika (Sarjana)", "fakultas": "14 - Matematika dan Ilmu Pengetahuan Alam", "jenjang": "Sarjana", "lengkap": 1122, "tidakLengkap": 11, "null": 4, "total": 1137}, {"prodi": "Statistika Terapan (Magister)", "fakultas": "14 - Matematika dan Ilmu Pengetahuan Alam", "jenjang": "Magister", "lengkap": 1122, "tidakLengkap": 11, "null": 4, "total": 1137}, {"prodi": "Teknik Elektro (Sarjana)", "fakultas": "14 - Matematika dan Ilmu Pengetahuan Alam", "jenjang": "Sarjana", "lengkap": 1122, "tidakLengkap": 11, "null": 4, "total": 1137}, {"prodi": "Teknik Geologi (Doktor)", "fakultas": "27 - Teknik Geologi", "jenjang": "Doktor", "lengkap": 1250, "tidakLengkap": 13, "null": 3, "total": 1266}, {"prodi": "Teknik Geologi (Magister)", "fakultas": "27 - Teknik Geologi", "jenjang": "Magister", "lengkap": 1250, "tidakLengkap": 13, "null": 3, "total": 1266}, {"prodi": "Teknik Geologi (Sarjana)", "fakultas": "27 - Teknik Geologi", "jenjang": "Sarjana", "lengkap": 1250, "tidakLengkap": 13, "null": 3, "total": 1266}, {"prodi": "Teknik Informatika (Sarjana)", "fakultas": "14 - Matematika dan Ilmu Pengetahuan Alam", "jenjang": "Sarjana", "lengkap": 1122, "tidakLengkap": 11, "null": 4, "total": 1137}, {"prodi": "Teknik Pertanian dan Biosistem (Sarjana)", "fakultas": "24 - Teknologi Industri Pertanian", "jenjang": "Sarjana", "lengkap": 1283, "tidakLengkap": 13, "null": 4, "total": 1300}, {"prodi": "Teknologi Agroindustri (Doktor)", "fakultas": "24 - Teknologi Industri Pertanian", "jenjang": "Doktor", "lengkap": 1283, "tidakLengkap": 13, "null": 4, "total": 1300}, {"prodi": "Teknologi Agroindustri (Magister)", "fakultas": "24 - Teknologi Industri Pertanian", "jenjang": "Magister", "lengkap": 1283, "tidakLengkap": 13, "null": 4, "total": 1300}, {"prodi": "Teknologi Industri Kimia (Sarjana Terapan)", "fakultas": "28 - Sekolah Vokasi", "jenjang": "Sarjana Terapan", "lengkap": 568, "tidakLengkap": 6, "null": 2, "total": 576}, {"prodi": "Teknologi Industri Pertanian (Magister)", "fakultas": "24 - Teknologi Industri Pertanian", "jenjang": "Magister", "lengkap": 1283, "tidakLengkap": 13, "null": 4, "total": 1300}, {"prodi": "Teknologi Pangan (Sarjana)", "fakultas": "24 - Teknologi Industri Pertanian", "jenjang": "Sarjana", "lengkap": 1283, "tidakLengkap": 13, "null": 4, "total": 1300}, {"prodi": "Televisi dan Film (Sarjana)", "fakultas": "21 - Ilmu Komunikasi", "jenjang": "Sarjana", "lengkap": 2036, "tidakLengkap": 21, "null": 5, "total": 2062}, {"prodi": "Urologi (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "lengkap": 388, "tidakLengkap": 4, "null": 1, "total": 393}];

export function getMockNilaiData(f: FiltersNilai): NilaiData {
  let matched = SEED_NILAI;
  if (f.jenjang) matched = matched.filter((p) => p.jenjang === f.jenjang);
  if (f.fakultas) matched = matched.filter((p) => p.fakultas === f.fakultas);
  if (f.prodi) matched = matched.filter((p) => p.prodi === f.prodi);

  let totalLengkap = 0;
  let totalTidakLengkap = 0;
  let totalNull = 0;

  const prodiSummary: ProdiSummaryNilaiRow[] = [];
  const fakMap = new Map<string, { lengkap: number; tidakLengkap: number; nullVal: number }>();

  for (const s of matched) {
    let l = s.lengkap;
    let tl = s.tidakLengkap;
    let n = s.null;

    // Filter kategori nilai
    if (f.kategoriNilai === 'Reguler') {
      l = Math.round(l * 0.85);
      tl = Math.round(tl * 0.85);
      n = Math.round(n * 0.85);
    } else if (f.kategoriNilai === 'Perbaikan') {
      l = Math.round(l * 0.12);
      tl = Math.round(tl * 0.12);
      n = Math.round(n * 0.12);
    } else if (f.kategoriNilai === 'Alih Kredit') {
      l = Math.round(l * 0.03);
      tl = Math.round(tl * 0.03);
      n = Math.round(n * 0.03);
    }

    // Filter jenis nilai
    if (f.jenisNilai === 'Null') {
      l = 0;
      tl = 0;
    } else if (f.jenisNilai) {
      n = 0;
      // Proporsi jenis huruf
      const factor = f.jenisNilai === 'A' ? 0.4722 : f.jenisNilai === 'B' ? 0.2114 : f.jenisNilai === 'A-' ? 0.1942 : 0.05;
      l = Math.round(l * factor);
      tl = Math.round(tl * factor);
    }

    totalLengkap += l;
    totalTidakLengkap += tl;
    totalNull += n;

    prodiSummary.push({
      fakultas: s.fakultas,
      prodi: s.prodi,
      jumlahLengkap: l,
      jumlahTidakLengkap: tl,
      jumlahNull: n,
    });

    const curFak = fakMap.get(s.fakultas) ?? { lengkap: 0, tidakLengkap: 0, nullVal: 0 };
    curFak.lengkap += l;
    curFak.tidakLengkap += tl;
    curFak.nullVal += n;
    fakMap.set(s.fakultas, curFak);
  }

  const isUnfiltered = !f.jenjang && !f.fakultas && !f.prodi && !f.kategoriNilai && !f.jenisNilai;

  const finalLengkap = isUnfiltered ? 192396 : totalLengkap;
  const finalTidakLengkap = isUnfiltered ? 2052 : totalTidakLengkap;
  const finalNull = isUnfiltered ? 411 : totalNull;
  const finalTransaksi = isUnfiltered ? 194859 : finalLengkap + finalTidakLengkap + finalNull;
  const finalProdiCount = isUnfiltered ? 143 : matched.length;

  const pctLengkap = finalTransaksi > 0 ? finalLengkap / finalTransaksi : null;
  const pctTidakLengkap = finalTransaksi > 0 ? finalTidakLengkap / finalTransaksi : null;
  const pctNull = finalTransaksi > 0 ? finalNull / finalTransaksi : null;

  const sebaranFakultas: SebaranFakultasRow[] = [...fakMap.entries()].map(([fak, v]) => ({
    fakultas: fak,
    lengkap: v.lengkap,
    tidakLengkap: v.tidakLengkap,
    nilaiNull: v.nullVal,
  }));

  // Jenis Nilai Donut (proporsi A, B, A-, B+, C, B-, Null, C+, E, K)
  const jenisNilai: JenisNilaiRow[] = [
    { jenis: 'A', jumlah: Math.round(finalTransaksi * 0.4722) },
    { jenis: 'B', jumlah: Math.round(finalTransaksi * 0.2114) },
    { jenis: 'A-', jumlah: Math.round(finalTransaksi * 0.1942) },
    { jenis: 'B+', jumlah: Math.round(finalTransaksi * 0.0521) },
    { jenis: 'C', jumlah: Math.round(finalTransaksi * 0.0195) },
    { jenis: 'B-', jumlah: Math.round(finalTransaksi * 0.0221) },
    { jenis: 'Null', jumlah: Math.round(finalTransaksi * 0.0120) },
    { jenis: 'C+', jumlah: Math.round(finalTransaksi * 0.0082) },
    { jenis: 'E', jumlah: Math.round(finalTransaksi * 0.0046) },
    { jenis: 'K', jumlah: Math.round(finalTransaksi * 0.0036) },
  ];

  const kategoriNilai: KategoriNilaiRow[] = [
    { label: 'Lengkap', jumlah: finalLengkap },
    { label: 'Tidak Lengkap', jumlah: finalTidakLengkap },
    { label: 'Null', jumlah: finalNull },
  ];

  return {
    kpi: {
      totalTransaksi: finalTransaksi,
      jumlahProdi: finalProdiCount,
      jumlahLengkap: finalLengkap,
      pctLengkap,
      jumlahTidakLengkap: finalTidakLengkap,
      pctTidakLengkap,
      jumlahNull: finalNull,
      pctNull,
    },
    sebaranFakultas,
    jenisNilai,
    prodiSummary,
    kategoriNilai,
  };
}
