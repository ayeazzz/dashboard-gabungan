import type { FilterOptions, Filters, PmbData, ProdiRow, SmupData, VerifikasiRow } from "./types";

export const MOCK_FILTER_OPTIONS: FilterOptions = {
  jenjang: ["Sarjana", "Sarjana Terapan", "Magister", "Doktor", "Spesialis", "Subspesialis", "Profesi"],
  jalur: ["SNBP", "SNBT", "Mandiri", "Berbasis Project", "Double Degree", "Internal", "RPL", "Reguler"],
  fakultas: ["11 - Hukum", "12 - Ekonomi dan Bisnis", "13 - Kedokteran", "14 - Matematika dan Ilmu Pengetahuan Alam", "15 - Pertanian", "16 - Kedokteran Gigi", "17 - Ilmu Sosial dan Ilmu Politik", "18 - Ilmu Budaya", "19 - Psikologi", "20 - Peternakan", "21 - Ilmu Komunikasi", "22 - Keperawatan", "23 - Perikanan dan Ilmu Kelautan", "24 - Teknologi Industri Pertanian", "25 - Sekolah Pascasarjana", "26 - Farmasi", "27 - Teknik Geologi", "28 - Sekolah Vokasi", "Program PSDKU Pangandaran"],
  prodi: ["Administrasi Bisnis (Magister)", "Administrasi Bisnis (Sarjana)", "Administrasi Bisnis PSDKU (Sarjana)", "Administrasi Keuangan Publik (Sarjana Terapan)", "Administrasi Pemerintahan (Sarjana Terapan)", "Administrasi Publik (Magister)", "Administrasi Publik (Sarjana)", "Agribisnis (Sarjana)", "Agronomi (Magister)", "Agroteknologi (Sarjana)", "Agroteknopreneur (Sarjana Terapan)", "Aktuaria (Sarjana)", "Akuntan (Profesi)", "Akuntansi (Doktor)", "Akuntansi (Magister)", "Akuntansi (Sarjana)", "Akuntansi Perpajakan (Sarjana Terapan)", "Akuntansi Sektor Publik (Sarjana Terapan)", "Anestesiologi dan Terapi Intensif (Spesialis)", "Anestesiologi dan Terapi Intensif (Subspesialis)", "Anti Aging dan Aesthetic Medicine (Magister)", "Antropologi (Magister)", "Antropologi (Sarjana)", "Apoteker (Profesi)", "Bahasa dan Budaya Tiongkok (Sarjana Terapan)", "Bedah (Spesialis)", "Bedah (Subspesialis)", "Bedah Anak (Spesialis)", "Bedah Mulut (Spesialis)", "Bedah Mulut dan Maksilofasial (Spesialis)", "Bedah Saraf (Spesialis)", "Biologi (Magister)", "Biologi (Sarjana)", "Bioteknologi (Doktor)", "Bioteknologi (Magister)", "Bisnis Digital (Sarjana)", "Bisnis Internasional (Sarjana Terapan)", "Bisnis Logistik (Sarjana Terapan)", "Dermatologi, Venereologi dan Estetika (Spesialis)", "Dermatologi, Venerologi, dan Estetika (Subspesialis)", "Dokter (Profesi)", "Dokter Gigi (Profesi)", "Ekonomi (Doktor)", "Ekonomi (Magister)", "Ekonomi Islam (Sarjana)", "Ekonomi Pembangunan (Sarjana)", "Ekonomi Pertanian (Magister)", "Ekonomi Pertanian Pendidikan Jarak Jauh (PJJ) (Magister)", "Ekonomi Terapan (Magister)", "Epidemiologi (Magister)", "Farmasi (Doktor)", "Farmasi (Magister)", "Farmasi (Sarjana)", "Farmasi Klinik (Magister)", "Farmasi Nuklir (Spesialis)", "Fisika (Magister)", "Fisika (Sarjana)", "Geofisika (Sarjana)", "Gizi Klinik (Spesialis)", "Hubungan Internasional (Doktor)", "Hubungan Internasional (Magister)", "Hubungan Internasional (Sarjana)", "Hubungan Masyarakat (Sarjana)", "Hukum (Doktor)", "Hukum (Magister)", "Ilmu Administrasi (Doktor)", "Ilmu Bedah Plastik (Spesialis)", "Ilmu Ekonomi (Sarjana)", "Ilmu Hukum (Sarjana)", "Ilmu Keberlanjutan (Magister)", "Ilmu Kedokteran Dasar (Magister)", "Ilmu Kedokteran Gigi (Doktor)", "Ilmu Kedokteran Gigi (Magister)", "Ilmu Kelautan (Sarjana)", "Ilmu Kesehatan Mata (RS Pusat Mata Nasional Cicendo) (Spesialis)", "Ilmu Kesehatan Mata (Spesialis)", "Ilmu Kesehatan Mata (Subspesialis)", "Ilmu Komunikasi (Doktor)", "Ilmu Komunikasi (Magister)", "Ilmu Komunikasi (Sarjana)", "Ilmu Komunikasi PSDKU (Sarjana)", "Ilmu Lingkungan (Doktor)", "Ilmu Lingkungan (Magister)", "Ilmu Manajemen (Magister)", "Ilmu Pemerintahan (Magister)", "Ilmu Pemerintahan (Sarjana)", "Ilmu Penyakit Kulit dan Kelamin (Spesialis)", "Ilmu Penyakit Mata (Spesialis)", "Ilmu Penyakit THT (Spesialis)", "Ilmu Pertanian (Doktor)", "Ilmu Peternakan (Doktor)", "Ilmu Peternakan (Magister)", "Ilmu Peternakan Pendidikan Jarak Jauh (PJJ) (Magister)", "Ilmu Politik (Magister)", "Ilmu Politik (Sarjana)", "Ilmu Tanah (Magister)", "Inovasi Regional (Magister)", "Jurnalistik (Sarjana)", "Kajian Budaya (Magister)", "Kearsipan Digital (Sarjana Terapan)", "Kebidanan (Magister)", "Kebidanan (Sarjana Terapan)", "Kebijakan Publik (Magister)", "Kedokteran (Doktor)", "Kedokteran (Sarjana)", "Kedokteran Fisik dan Rehabilitasi (Spesialis)", "Kedokteran Fisik dan Rehabilitasi Medik (Subspesialis)", "Kedokteran Forensik dan Studi Medikolegal (Spesialis)", "Kedokteran Gigi (Sarjana)", "Kedokteran Hewan (Sarjana)", "Kedokteran Jiwa (Spesialis)", "Kedokteran Keluarga Layanan Primer (Spesialis)", "Kedokteran Layanan Primer (Spesialis)", "Kedokteran Nuklir (Spesialis)", "Kenotariatan (Magister)", "Keperawatan (Doktor)", "Keperawatan (Magister)", "Keperawatan (Sarjana)", "Keperawatan Anestesiologi (Sarjana Terapan)", "Keperawatan Medikal Bedah (Spesialis)", "Keperawatan PSDKU (Sarjana)", "Kesehatan Anak (Spesialis)", "Kesehatan Anak (Subspesialis)", "Kesehatan Gigi Anak (Spesialis)", "Kesehatan Masyarakat (Magister)", "Kesehatan Telinga Hidung Tenggorok Bedah Kepala dan Leher (Spesialis)", "Kesejahteraan Sosial (Doktor)", "Kesejahteraan Sosial (Magister)", "Kesejahteraan Sosial (Sarjana)", "Kimia (Doktor)", "Kimia (Magister)", "Kimia (Sarjana)", "Konservasi Gigi (Spesialis)", "Konservasi Laut (Magister)", "Linguistik (Magister)", "Manajemen (Doktor)", "Manajemen (Magister)", "Manajemen (Sains) (Magister)", "Manajemen (Sarjana)", "Manajemen Keuangan Mikro Terpadu (Magister)", "Manajemen Komunikasi (Sarjana)", "Manajemen Produksi Media (Sarjana Terapan)", "Manajemen Sumber Daya Hayati (Magister)", "Matematika (Doktor)", "Matematika (Magister)", "Matematika (Sarjana)", "Neurologi (Spesialis)", "Obstetri dan Ginekologi (Spesialis)", "Obstetri dan Ginekologi (Subspesialis)", "Orthopaedi dan Traumatologi (Spesialis)", "Ortodontik (Spesialis)", "Pariwisata Bahari (Sarjana Terapan)", "Pariwisata Berkelanjutan (Magister)", "Patologi Anatomik (Spesialis)", "Patologi Klinik (Spesialis)", "Patologi Klinik (Subspesialis)", "Pemasaran Digital (Sarjana Terapan)", "Pendidikan Profesi Psikologi (Profesi)", "Penyakit Dalam (Spesialis)", "Penyakit Dalam (Subspesialis)", "Penyakit Jantung dan Pembuluh Darah (Spesialis)", "Penyakit Mulut (Spesialis)", "Perikanan (Magister)", "Perikanan (Sarjana)", "Perikanan PSDKU (Sarjana)", "Perikanan dan Kelautan Berkelanjutan (Doktor)", "Periodontik (Spesialis)", "Perpustakaan dan Sains Informasi (Sarjana)", "Peternakan (Sarjana)", "Peternakan PSDKU (Sarjana)", "Profesi Dokter Hewan (Profesi)", "Profesi Ners (Profesi)", "Profesi Ners PSDKU Pangandaran (Profesi)", "Program Profesi Insinyur (Profesi)", "Prostodontik (Spesialis)", "Psikologi (Doktor)", "Psikologi (Magister)", "Psikologi (Sarjana)", "Psikologi Profesi (Magister)", "Radiologi (Spesialis)", "Radiologi Kedokteran Gigi (Spesialis)", "Sastra (Doktor)", "Sastra (Magister)", "Sastra Arab (Sarjana)", "Sastra Indonesia (Sarjana)", "Sastra Inggris (Sarjana)", "Sastra Jepang (Sarjana)", "Sastra Jerman (Sarjana)", "Sastra Prancis (Sarjana)", "Sastra Rusia (Sarjana)", "Sastra Sunda (Sarjana)", "Sejarah (Magister)", "Sejarah (Sarjana)", "Sosiologi (Doktor)", "Sosiologi (Magister)", "Sosiologi (Sarjana)", "Statistika (Sarjana)", "Statistika Terapan (Magister)", "Teknik Elektro (Sarjana)", "Teknik Geologi (Doktor)", "Teknik Geologi (Magister)", "Teknik Geologi (Sarjana)", "Teknik Informatika (Sarjana)", "Teknik Pertanian dan Biosistem (Sarjana)", "Teknologi Agroindustri (Doktor)", "Teknologi Agroindustri (Magister)", "Teknologi Industri Kimia (Sarjana Terapan)", "Teknologi Industri Pertanian (Magister)", "Teknologi Pangan (Sarjana)", "Televisi dan Film (Sarjana)", "Urologi (Spesialis)"],
  tahun: [2021, 2022, 2023, 2024, 2025],
  jalurByJenjang: {
  "Sarjana": [
    "Mandiri",
    "SNBP",
    "SNBT"
  ],
  "Sarjana Terapan": [
    "Mandiri",
    "SNBP",
    "SNBT"
  ],
  "Magister": [
    "Berbasis Project",
    "Double Degree",
    "RPL",
    "Reguler"
  ],
  "Doktor": [
    "Berbasis Project",
    "Reguler"
  ],
  "Spesialis": [
    "Berbasis Project",
    "Reguler"
  ],
  "Subspesialis": [
    "Berbasis Project",
    "Reguler"
  ],
  "Profesi": [
    "Berbasis Project",
    "Internal",
    "Reguler"
  ]
},
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

type SeedProdi = {
  prodi: string;
  fakultas: string;
  jenjang: string;
  dtTotal: number;
  dtj: Record<string, number>;
};

const PRODI_SEEDS: SeedProdi[] = [{"prodi": "Administrasi Bisnis (Magister)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Magister", "dtTotal": 52, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Administrasi Bisnis (Sarjana)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Sarjana", "dtTotal": 44, "dtj": {"SNBP": 0, "SNBT": 44, "Mandiri": 0}}, {"prodi": "Administrasi Bisnis PSDKU (Sarjana)", "fakultas": "Program PSDKU Pangandaran", "jenjang": "Sarjana", "dtTotal": 40, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Administrasi Keuangan Publik (Sarjana Terapan)", "fakultas": "28 - Sekolah Vokasi", "jenjang": "Sarjana Terapan", "dtTotal": 158, "dtj": {"SNBP": 18, "SNBT": 22, "Mandiri": 118}}, {"prodi": "Administrasi Pemerintahan (Sarjana Terapan)", "fakultas": "28 - Sekolah Vokasi", "jenjang": "Sarjana Terapan", "dtTotal": 126, "dtj": {"SNBP": 12, "SNBT": 18, "Mandiri": 96}}, {"prodi": "Administrasi Publik (Magister)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Magister", "dtTotal": 36, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Administrasi Publik (Sarjana)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Sarjana", "dtTotal": 265, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Agribisnis (Sarjana)", "fakultas": "15 - Pertanian", "jenjang": "Sarjana", "dtTotal": 116, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Agronomi (Magister)", "fakultas": "15 - Pertanian", "jenjang": "Magister", "dtTotal": 57, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Agroteknologi (Sarjana)", "fakultas": "15 - Pertanian", "jenjang": "Sarjana", "dtTotal": 276, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Agroteknopreneur (Sarjana Terapan)", "fakultas": "28 - Sekolah Vokasi", "jenjang": "Sarjana Terapan", "dtTotal": 170, "dtj": {"SNBP": 20, "SNBT": 24, "Mandiri": 126}}, {"prodi": "Aktuaria (Sarjana)", "fakultas": "14 - Matematika dan Ilmu Pengetahuan Alam", "jenjang": "Sarjana", "dtTotal": 50, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Akuntan (Profesi)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Profesi", "dtTotal": 18, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Akuntansi (Doktor)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Doktor", "dtTotal": 12, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Akuntansi (Magister)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Magister", "dtTotal": 36, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Akuntansi (Sarjana)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Sarjana", "dtTotal": 90, "dtj": {"SNBP": 30, "SNBT": 60, "Mandiri": 0}}, {"prodi": "Akuntansi Perpajakan (Sarjana Terapan)", "fakultas": "28 - Sekolah Vokasi", "jenjang": "Sarjana Terapan", "dtTotal": 279, "dtj": {"SNBP": 28, "SNBT": 42, "Mandiri": 209}}, {"prodi": "Akuntansi Sektor Publik (Sarjana Terapan)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Sarjana Terapan", "dtTotal": 273, "dtj": {"SNBP": 30, "SNBT": 37, "Mandiri": 206}}, {"prodi": "Anestesiologi dan Terapi Intensif (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "dtTotal": 9, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Anestesiologi dan Terapi Intensif (Subspesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Subspesialis", "dtTotal": 13, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Anti Aging dan Aesthetic Medicine (Magister)", "fakultas": "13 - Kedokteran", "jenjang": "Magister", "dtTotal": 9, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Antropologi (Magister)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Magister", "dtTotal": 24, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Antropologi (Sarjana)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Sarjana", "dtTotal": 53, "dtj": {"SNBP": 10, "SNBT": 0, "Mandiri": 43}}, {"prodi": "Apoteker (Profesi)", "fakultas": "26 - Farmasi", "jenjang": "Profesi", "dtTotal": 120, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Bahasa dan Budaya Tiongkok (Sarjana Terapan)", "fakultas": "28 - Sekolah Vokasi", "jenjang": "Sarjana Terapan", "dtTotal": 63, "dtj": {"SNBP": 25, "SNBT": 16, "Mandiri": 22}}, {"prodi": "Bedah (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "dtTotal": 7, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Bedah (Subspesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Subspesialis", "dtTotal": 4, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Bedah Anak (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "dtTotal": 4, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Bedah Mulut (Spesialis)", "fakultas": "16 - Kedokteran Gigi", "jenjang": "Spesialis", "dtTotal": 8, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Bedah Mulut dan Maksilofasial (Spesialis)", "fakultas": "16 - Kedokteran Gigi", "jenjang": "Spesialis", "dtTotal": 8, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Bedah Saraf (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "dtTotal": 2, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Biologi (Magister)", "fakultas": "14 - Matematika dan Ilmu Pengetahuan Alam", "jenjang": "Magister", "dtTotal": 45, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Biologi (Sarjana)", "fakultas": "14 - Matematika dan Ilmu Pengetahuan Alam", "jenjang": "Sarjana", "dtTotal": 271, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Bioteknologi (Doktor)", "fakultas": "25 - Sekolah Pascasarjana", "jenjang": "Doktor", "dtTotal": 9, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Bioteknologi (Magister)", "fakultas": "25 - Sekolah Pascasarjana", "jenjang": "Magister", "dtTotal": 9, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Bisnis Digital (Sarjana)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Sarjana", "dtTotal": 220, "dtj": {"SNBP": 24, "SNBT": 36, "Mandiri": 160}}, {"prodi": "Bisnis Internasional (Sarjana Terapan)", "fakultas": "28 - Sekolah Vokasi", "jenjang": "Sarjana Terapan", "dtTotal": 201, "dtj": {"SNBP": 18, "SNBT": 27, "Mandiri": 156}}, {"prodi": "Bisnis Logistik (Sarjana Terapan)", "fakultas": "28 - Sekolah Vokasi", "jenjang": "Sarjana Terapan", "dtTotal": 134, "dtj": {"SNBP": 12, "SNBT": 24, "Mandiri": 98}}, {"prodi": "Dermatologi, Venereologi dan Estetika (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "dtTotal": 5, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Dermatologi, Venerologi, dan Estetika (Subspesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Subspesialis", "dtTotal": 5, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Dokter (Profesi)", "fakultas": "13 - Kedokteran", "jenjang": "Profesi", "dtTotal": 200, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Dokter Gigi (Profesi)", "fakultas": "16 - Kedokteran Gigi", "jenjang": "Profesi", "dtTotal": 60, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Ekonomi (Doktor)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Doktor", "dtTotal": 9, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Ekonomi (Magister)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Magister", "dtTotal": 45, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Ekonomi Islam (Sarjana)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Sarjana", "dtTotal": 73, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Ekonomi Pembangunan (Sarjana)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Sarjana", "dtTotal": 60, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Ekonomi Pertanian (Magister)", "fakultas": "15 - Pertanian", "jenjang": "Magister", "dtTotal": 36, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Ekonomi Pertanian Pendidikan Jarak Jauh (PJJ) (Magister)", "fakultas": "15 - Pertanian", "jenjang": "Magister", "dtTotal": 18, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Ekonomi Terapan (Magister)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Magister", "dtTotal": 75, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Epidemiologi (Magister)", "fakultas": "13 - Kedokteran", "jenjang": "Magister", "dtTotal": 6, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Farmasi (Doktor)", "fakultas": "26 - Farmasi", "jenjang": "Doktor", "dtTotal": 18, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Farmasi (Magister)", "fakultas": "26 - Farmasi", "jenjang": "Magister", "dtTotal": 57, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Farmasi (Sarjana)", "fakultas": "26 - Farmasi", "jenjang": "Sarjana", "dtTotal": 48, "dtj": {"SNBP": 48, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Farmasi Klinik (Magister)", "fakultas": "26 - Farmasi", "jenjang": "Magister", "dtTotal": 12, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Farmasi Nuklir (Spesialis)", "fakultas": "26 - Farmasi", "jenjang": "Spesialis", "dtTotal": 12, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Fisika (Magister)", "fakultas": "14 - Matematika dan Ilmu Pengetahuan Alam", "jenjang": "Magister", "dtTotal": 6, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Fisika (Sarjana)", "fakultas": "14 - Matematika dan Ilmu Pengetahuan Alam", "jenjang": "Sarjana", "dtTotal": 420, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Geofisika (Sarjana)", "fakultas": "14 - Matematika dan Ilmu Pengetahuan Alam", "jenjang": "Sarjana", "dtTotal": 50, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Gizi Klinik (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "dtTotal": 2, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Hubungan Internasional (Doktor)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Doktor", "dtTotal": 24, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Hubungan Internasional (Magister)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Magister", "dtTotal": 24, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Hubungan Internasional (Sarjana)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Sarjana", "dtTotal": 39, "dtj": {"SNBP": 0, "SNBT": 39, "Mandiri": 0}}, {"prodi": "Hubungan Masyarakat (Sarjana)", "fakultas": "21 - Ilmu Komunikasi", "jenjang": "Sarjana", "dtTotal": 55, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Hukum (Doktor)", "fakultas": "11 - Hukum", "jenjang": "Doktor", "dtTotal": 33, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Hukum (Magister)", "fakultas": "11 - Hukum", "jenjang": "Magister", "dtTotal": 45, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Ilmu Administrasi (Doktor)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Doktor", "dtTotal": 42, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Ilmu Bedah Plastik (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "dtTotal": 2, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Ilmu Ekonomi (Sarjana)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Sarjana", "dtTotal": 179, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Ilmu Hukum (Sarjana)", "fakultas": "11 - Hukum", "jenjang": "Sarjana", "dtTotal": 434, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Ilmu Keberlanjutan (Magister)", "fakultas": "25 - Sekolah Pascasarjana", "jenjang": "Magister", "dtTotal": 18, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Ilmu Kedokteran Dasar (Magister)", "fakultas": "13 - Kedokteran", "jenjang": "Magister", "dtTotal": 12, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Ilmu Kedokteran Gigi (Doktor)", "fakultas": "16 - Kedokteran Gigi", "jenjang": "Doktor", "dtTotal": 6, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Ilmu Kedokteran Gigi (Magister)", "fakultas": "16 - Kedokteran Gigi", "jenjang": "Magister", "dtTotal": 9, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Ilmu Kelautan (Sarjana)", "fakultas": "23 - Perikanan dan Ilmu Kelautan", "jenjang": "Sarjana", "dtTotal": 394, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Ilmu Kesehatan Mata (RS Pusat Mata Nasional Cicendo) (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "dtTotal": 0, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Ilmu Kesehatan Mata (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "dtTotal": 8, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Ilmu Kesehatan Mata (Subspesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Subspesialis", "dtTotal": 12, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Ilmu Komunikasi (Doktor)", "fakultas": "21 - Ilmu Komunikasi", "jenjang": "Doktor", "dtTotal": 30, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Ilmu Komunikasi (Magister)", "fakultas": "21 - Ilmu Komunikasi", "jenjang": "Magister", "dtTotal": 97, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Ilmu Komunikasi (Sarjana)", "fakultas": "21 - Ilmu Komunikasi", "jenjang": "Sarjana", "dtTotal": 75, "dtj": {"SNBP": 30, "SNBT": 45, "Mandiri": 0}}, {"prodi": "Ilmu Komunikasi PSDKU (Sarjana)", "fakultas": "Program PSDKU Pangandaran", "jenjang": "Sarjana", "dtTotal": 40, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Ilmu Lingkungan (Doktor)", "fakultas": "25 - Sekolah Pascasarjana", "jenjang": "Doktor", "dtTotal": 6, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Ilmu Lingkungan (Magister)", "fakultas": "25 - Sekolah Pascasarjana", "jenjang": "Magister", "dtTotal": 9, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Ilmu Manajemen (Magister)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Magister", "dtTotal": 21, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Ilmu Pemerintahan (Magister)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Magister", "dtTotal": 58, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Ilmu Pemerintahan (Sarjana)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Sarjana", "dtTotal": 72, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 72}}, {"prodi": "Ilmu Penyakit Kulit dan Kelamin (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "dtTotal": 5, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Ilmu Penyakit Mata (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "dtTotal": 8, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Ilmu Penyakit THT (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "dtTotal": 1, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Ilmu Pertanian (Doktor)", "fakultas": "15 - Pertanian", "jenjang": "Doktor", "dtTotal": 21, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Ilmu Peternakan (Doktor)", "fakultas": "20 - Peternakan", "jenjang": "Doktor", "dtTotal": 18, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Ilmu Peternakan (Magister)", "fakultas": "20 - Peternakan", "jenjang": "Magister", "dtTotal": 112, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Ilmu Peternakan Pendidikan Jarak Jauh (PJJ) (Magister)", "fakultas": "20 - Peternakan", "jenjang": "Magister", "dtTotal": 18, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Ilmu Politik (Magister)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Magister", "dtTotal": 36, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Ilmu Politik (Sarjana)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Sarjana", "dtTotal": 56, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 56}}, {"prodi": "Ilmu Tanah (Magister)", "fakultas": "15 - Pertanian", "jenjang": "Magister", "dtTotal": 21, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Inovasi Regional (Magister)", "fakultas": "25 - Sekolah Pascasarjana", "jenjang": "Magister", "dtTotal": 12, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Jurnalistik (Sarjana)", "fakultas": "21 - Ilmu Komunikasi", "jenjang": "Sarjana", "dtTotal": 486, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Kajian Budaya (Magister)", "fakultas": "18 - Ilmu Budaya", "jenjang": "Magister", "dtTotal": 30, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Kearsipan Digital (Sarjana Terapan)", "fakultas": "28 - Sekolah Vokasi", "jenjang": "Sarjana Terapan", "dtTotal": 79, "dtj": {"SNBP": 8, "SNBT": 16, "Mandiri": 55}}, {"prodi": "Kebidanan (Magister)", "fakultas": "13 - Kedokteran", "jenjang": "Magister", "dtTotal": 33, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Kebidanan (Sarjana Terapan)", "fakultas": "28 - Sekolah Vokasi", "jenjang": "Sarjana Terapan", "dtTotal": 108, "dtj": {"SNBP": 8, "SNBT": 12, "Mandiri": 88}}, {"prodi": "Kebijakan Publik (Magister)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Magister", "dtTotal": 30, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Kedokteran (Doktor)", "fakultas": "13 - Kedokteran", "jenjang": "Doktor", "dtTotal": 9, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Kedokteran (Sarjana)", "fakultas": "13 - Kedokteran", "jenjang": "Sarjana", "dtTotal": 310, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 310}}, {"prodi": "Kedokteran Fisik dan Rehabilitasi (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "dtTotal": 5, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Kedokteran Fisik dan Rehabilitasi Medik (Subspesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Subspesialis", "dtTotal": 2, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Kedokteran Forensik dan Studi Medikolegal (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "dtTotal": 4, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Kedokteran Gigi (Sarjana)", "fakultas": "16 - Kedokteran Gigi", "jenjang": "Sarjana", "dtTotal": 215, "dtj": {"SNBP": 0, "SNBT": 45, "Mandiri": 170}}, {"prodi": "Kedokteran Hewan (Sarjana)", "fakultas": "13 - Kedokteran", "jenjang": "Sarjana", "dtTotal": 50, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Kedokteran Jiwa (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "dtTotal": 4, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Kedokteran Keluarga Layanan Primer (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "dtTotal": 6, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Kedokteran Layanan Primer (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "dtTotal": 6, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Kedokteran Nuklir (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "dtTotal": 2, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Kenotariatan (Magister)", "fakultas": "11 - Hukum", "jenjang": "Magister", "dtTotal": 75, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Keperawatan (Doktor)", "fakultas": "22 - Keperawatan", "jenjang": "Doktor", "dtTotal": 9, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Keperawatan (Magister)", "fakultas": "22 - Keperawatan", "jenjang": "Magister", "dtTotal": 81, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Keperawatan (Sarjana)", "fakultas": "22 - Keperawatan", "jenjang": "Sarjana", "dtTotal": 44, "dtj": {"SNBP": 44, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Keperawatan Anestesiologi (Sarjana Terapan)", "fakultas": "22 - Keperawatan", "jenjang": "Sarjana Terapan", "dtTotal": 67, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Keperawatan Medikal Bedah (Spesialis)", "fakultas": "22 - Keperawatan", "jenjang": "Spesialis", "dtTotal": 9, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Keperawatan PSDKU (Sarjana)", "fakultas": "Program PSDKU Pangandaran", "jenjang": "Sarjana", "dtTotal": 40, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Kesehatan Anak (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "dtTotal": 10, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Kesehatan Anak (Subspesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Subspesialis", "dtTotal": 13, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Kesehatan Gigi Anak (Spesialis)", "fakultas": "16 - Kedokteran Gigi", "jenjang": "Spesialis", "dtTotal": 9, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Kesehatan Masyarakat (Magister)", "fakultas": "13 - Kedokteran", "jenjang": "Magister", "dtTotal": 18, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Kesehatan Telinga Hidung Tenggorok Bedah Kepala dan Leher (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "dtTotal": 1, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Kesejahteraan Sosial (Doktor)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Doktor", "dtTotal": 18, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Kesejahteraan Sosial (Magister)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Magister", "dtTotal": 52, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Kesejahteraan Sosial (Sarjana)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Sarjana", "dtTotal": 254, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Kimia (Doktor)", "fakultas": "14 - Matematika dan Ilmu Pengetahuan Alam", "jenjang": "Doktor", "dtTotal": 12, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Kimia (Magister)", "fakultas": "14 - Matematika dan Ilmu Pengetahuan Alam", "jenjang": "Magister", "dtTotal": 54, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Kimia (Sarjana)", "fakultas": "14 - Matematika dan Ilmu Pengetahuan Alam", "jenjang": "Sarjana", "dtTotal": 339, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Konservasi Gigi (Spesialis)", "fakultas": "16 - Kedokteran Gigi", "jenjang": "Spesialis", "dtTotal": 9, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Konservasi Laut (Magister)", "fakultas": "23 - Perikanan dan Ilmu Kelautan", "jenjang": "Magister", "dtTotal": 12, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Linguistik (Magister)", "fakultas": "18 - Ilmu Budaya", "jenjang": "Magister", "dtTotal": 27, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Manajemen (Doktor)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Doktor", "dtTotal": 12, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Manajemen (Magister)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Magister", "dtTotal": 78, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Manajemen (Sains) (Magister)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Magister", "dtTotal": 30, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Manajemen (Sarjana)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Sarjana", "dtTotal": 282, "dtj": {"SNBP": 32, "SNBT": 64, "Mandiri": 186}}, {"prodi": "Manajemen Keuangan Mikro Terpadu (Magister)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Magister", "dtTotal": 36, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Manajemen Komunikasi (Sarjana)", "fakultas": "21 - Ilmu Komunikasi", "jenjang": "Sarjana", "dtTotal": 55, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Manajemen Produksi Media (Sarjana Terapan)", "fakultas": "28 - Sekolah Vokasi", "jenjang": "Sarjana Terapan", "dtTotal": 210, "dtj": {"SNBP": 24, "SNBT": 48, "Mandiri": 138}}, {"prodi": "Manajemen Sumber Daya Hayati (Magister)", "fakultas": "25 - Sekolah Pascasarjana", "jenjang": "Magister", "dtTotal": 0, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Matematika (Doktor)", "fakultas": "14 - Matematika dan Ilmu Pengetahuan Alam", "jenjang": "Doktor", "dtTotal": 6, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Matematika (Magister)", "fakultas": "14 - Matematika dan Ilmu Pengetahuan Alam", "jenjang": "Magister", "dtTotal": 42, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Matematika (Sarjana)", "fakultas": "14 - Matematika dan Ilmu Pengetahuan Alam", "jenjang": "Sarjana", "dtTotal": 224, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Neurologi (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "dtTotal": 5, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Obstetri dan Ginekologi (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "dtTotal": 15, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Obstetri dan Ginekologi (Subspesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Subspesialis", "dtTotal": 12, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Orthopaedi dan Traumatologi (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "dtTotal": 6, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Ortodontik (Spesialis)", "fakultas": "16 - Kedokteran Gigi", "jenjang": "Spesialis", "dtTotal": 7, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Pariwisata Bahari (Sarjana Terapan)", "fakultas": "28 - Sekolah Vokasi", "jenjang": "Sarjana Terapan", "dtTotal": 177, "dtj": {"SNBP": 60, "SNBT": 38, "Mandiri": 79}}, {"prodi": "Pariwisata Berkelanjutan (Magister)", "fakultas": "25 - Sekolah Pascasarjana", "jenjang": "Magister", "dtTotal": 9, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Patologi Anatomik (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "dtTotal": 2, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Patologi Klinik (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "dtTotal": 5, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Patologi Klinik (Subspesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Subspesialis", "dtTotal": 2, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Pemasaran Digital (Sarjana Terapan)", "fakultas": "28 - Sekolah Vokasi", "jenjang": "Sarjana Terapan", "dtTotal": 121, "dtj": {"SNBP": 12, "SNBT": 18, "Mandiri": 91}}, {"prodi": "Pendidikan Profesi Psikologi (Profesi)", "fakultas": "19 - Psikologi", "jenjang": "Profesi", "dtTotal": 36, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Penyakit Dalam (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "dtTotal": 14, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Penyakit Dalam (Subspesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Subspesialis", "dtTotal": 59, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Penyakit Jantung dan Pembuluh Darah (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "dtTotal": 5, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Penyakit Mulut (Spesialis)", "fakultas": "16 - Kedokteran Gigi", "jenjang": "Spesialis", "dtTotal": 6, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Perikanan (Magister)", "fakultas": "23 - Perikanan dan Ilmu Kelautan", "jenjang": "Magister", "dtTotal": 12, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Perikanan (Sarjana)", "fakultas": "23 - Perikanan dan Ilmu Kelautan", "jenjang": "Sarjana", "dtTotal": 337, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Perikanan dan Kelautan Berkelanjutan (Doktor)", "fakultas": "23 - Perikanan dan Ilmu Kelautan", "jenjang": "Doktor", "dtTotal": 15, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Perikanan PSDKU (Sarjana)", "fakultas": "Program PSDKU Pangandaran", "jenjang": "Sarjana", "dtTotal": 40, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Periodontik (Spesialis)", "fakultas": "16 - Kedokteran Gigi", "jenjang": "Spesialis", "dtTotal": 50, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Perpustakaan dan Sains Informasi (Sarjana)", "fakultas": "21 - Ilmu Komunikasi", "jenjang": "Sarjana", "dtTotal": 50, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Peternakan (Sarjana)", "fakultas": "20 - Peternakan", "jenjang": "Sarjana", "dtTotal": 50, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Peternakan PSDKU (Sarjana)", "fakultas": "Program PSDKU Pangandaran", "jenjang": "Sarjana", "dtTotal": 50, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Profesi Dokter Hewan (Profesi)", "fakultas": "13 - Kedokteran", "jenjang": "Profesi", "dtTotal": 50, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Profesi Ners (Profesi)", "fakultas": "22 - Keperawatan", "jenjang": "Profesi", "dtTotal": 50, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Profesi Ners PSDKU Pangandaran (Profesi)", "fakultas": "22 - Keperawatan", "jenjang": "Profesi", "dtTotal": 50, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Program Profesi Insinyur (Profesi)", "fakultas": "25 - Sekolah Pascasarjana", "jenjang": "Profesi", "dtTotal": 50, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Prostodontik (Spesialis)", "fakultas": "16 - Kedokteran Gigi", "jenjang": "Spesialis", "dtTotal": 50, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Psikologi (Doktor)", "fakultas": "19 - Psikologi", "jenjang": "Doktor", "dtTotal": 50, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Psikologi (Magister)", "fakultas": "19 - Psikologi", "jenjang": "Magister", "dtTotal": 50, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Psikologi (Sarjana)", "fakultas": "19 - Psikologi", "jenjang": "Sarjana", "dtTotal": 115, "dtj": {"SNBP": 46, "SNBT": 69, "Mandiri": 0}}, {"prodi": "Psikologi Profesi (Magister)", "fakultas": "19 - Psikologi", "jenjang": "Magister", "dtTotal": 50, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Radiologi (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "dtTotal": 50, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Radiologi Kedokteran Gigi (Spesialis)", "fakultas": "16 - Kedokteran Gigi", "jenjang": "Spesialis", "dtTotal": 50, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Sastra (Doktor)", "fakultas": "18 - Ilmu Budaya", "jenjang": "Doktor", "dtTotal": 50, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Sastra (Magister)", "fakultas": "18 - Ilmu Budaya", "jenjang": "Magister", "dtTotal": 50, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Sastra Arab (Sarjana)", "fakultas": "18 - Ilmu Budaya", "jenjang": "Sarjana", "dtTotal": 50, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Sastra Indonesia (Sarjana)", "fakultas": "18 - Ilmu Budaya", "jenjang": "Sarjana", "dtTotal": 50, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Sastra Inggris (Sarjana)", "fakultas": "18 - Ilmu Budaya", "jenjang": "Sarjana", "dtTotal": 50, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Sastra Jepang (Sarjana)", "fakultas": "18 - Ilmu Budaya", "jenjang": "Sarjana", "dtTotal": 50, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Sastra Jerman (Sarjana)", "fakultas": "18 - Ilmu Budaya", "jenjang": "Sarjana", "dtTotal": 23, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 23}}, {"prodi": "Sastra Prancis (Sarjana)", "fakultas": "18 - Ilmu Budaya", "jenjang": "Sarjana", "dtTotal": 50, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Sastra Rusia (Sarjana)", "fakultas": "18 - Ilmu Budaya", "jenjang": "Sarjana", "dtTotal": 50, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Sastra Sunda (Sarjana)", "fakultas": "18 - Ilmu Budaya", "jenjang": "Sarjana", "dtTotal": 50, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Sejarah (Magister)", "fakultas": "18 - Ilmu Budaya", "jenjang": "Magister", "dtTotal": 50, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Sejarah (Sarjana)", "fakultas": "18 - Ilmu Budaya", "jenjang": "Sarjana", "dtTotal": 50, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Sosiologi (Doktor)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Doktor", "dtTotal": 50, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Sosiologi (Magister)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Magister", "dtTotal": 50, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Sosiologi (Sarjana)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Sarjana", "dtTotal": 76, "dtj": {"SNBP": 10, "SNBT": 15, "Mandiri": 51}}, {"prodi": "Statistika (Sarjana)", "fakultas": "14 - Matematika dan Ilmu Pengetahuan Alam", "jenjang": "Sarjana", "dtTotal": 50, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Statistika Terapan (Magister)", "fakultas": "14 - Matematika dan Ilmu Pengetahuan Alam", "jenjang": "Magister", "dtTotal": 50, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Teknik Elektro (Sarjana)", "fakultas": "14 - Matematika dan Ilmu Pengetahuan Alam", "jenjang": "Sarjana", "dtTotal": 50, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Teknik Geologi (Doktor)", "fakultas": "27 - Teknik Geologi", "jenjang": "Doktor", "dtTotal": 50, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Teknik Geologi (Magister)", "fakultas": "27 - Teknik Geologi", "jenjang": "Magister", "dtTotal": 50, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Teknik Geologi (Sarjana)", "fakultas": "27 - Teknik Geologi", "jenjang": "Sarjana", "dtTotal": 50, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Teknik Informatika (Sarjana)", "fakultas": "14 - Matematika dan Ilmu Pengetahuan Alam", "jenjang": "Sarjana", "dtTotal": 232, "dtj": {"SNBP": 22, "SNBT": 44, "Mandiri": 166}}, {"prodi": "Teknik Pertanian dan Biosistem (Sarjana)", "fakultas": "24 - Teknologi Industri Pertanian", "jenjang": "Sarjana", "dtTotal": 50, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Teknologi Agroindustri (Doktor)", "fakultas": "24 - Teknologi Industri Pertanian", "jenjang": "Doktor", "dtTotal": 50, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Teknologi Agroindustri (Magister)", "fakultas": "24 - Teknologi Industri Pertanian", "jenjang": "Magister", "dtTotal": 50, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Teknologi Industri Kimia (Sarjana Terapan)", "fakultas": "28 - Sekolah Vokasi", "jenjang": "Sarjana Terapan", "dtTotal": 146, "dtj": {"SNBP": 11, "SNBT": 22, "Mandiri": 113}}, {"prodi": "Teknologi Industri Pertanian (Magister)", "fakultas": "24 - Teknologi Industri Pertanian", "jenjang": "Magister", "dtTotal": 50, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Teknologi Pangan (Sarjana)", "fakultas": "24 - Teknologi Industri Pertanian", "jenjang": "Sarjana", "dtTotal": 50, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Televisi dan Film (Sarjana)", "fakultas": "21 - Ilmu Komunikasi", "jenjang": "Sarjana", "dtTotal": 50, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}, {"prodi": "Urologi (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "dtTotal": 50, "dtj": {"SNBP": 0, "SNBT": 0, "Mandiri": 0}}];

export function getMockSmupData(f: Filters): SmupData {
  const validJalurs = f.jenjang && MOCK_FILTER_OPTIONS.jalurByJenjang?.[f.jenjang];
  const isJalurInvalidForJenjang = Boolean(f.jenjang && f.jalur && validJalurs && !validJalurs.includes(f.jalur));

  // Filter prodi
  let matchingProdi = PRODI_SEEDS;
  if (f.jenjang) matchingProdi = matchingProdi.filter(p => p.jenjang === f.jenjang);
  if (f.fakultas) matchingProdi = matchingProdi.filter(p => p.fakultas === f.fakultas);
  if (f.prodi) matchingProdi = matchingProdi.filter(p => p.prodi === f.prodi);

  let totalDayaTampung = 0;
  let totalPendaftar = 0;
  let totalDiterima = 0;
  let totalRegistrasi = 0;

  const prodiRows: ProdiRow[] = [];

  for (const s of matchingProdi) {
    let dt = 0;
    if (isJalurInvalidForJenjang) {
      dt = 0;
    } else if (!f.jalur) {
      dt = s.dtTotal;
    } else {
      // Jalur dipilih
      const pValidJalurs = MOCK_FILTER_OPTIONS.jalurByJenjang?.[s.jenjang] ?? [];
      if (!pValidJalurs.includes(f.jalur)) {
        dt = 0;
      } else if (s.jenjang === 'Sarjana' || s.jenjang === 'Sarjana Terapan') {
        dt = s.dtj[f.jalur] ?? 0;
      } else {
        // Pascasarjana
        dt = Math.round(s.dtTotal / Math.max(pValidJalurs.length, 1));
      }
    }

    let pendaftar = 0;
    let diterima = 0;
    let registrasi = 0;

    if (!isJalurInvalidForJenjang) {
      pendaftar = Math.round(dt * (f.jalur === 'SNBP' ? 12.5 : f.jalur === 'SNBT' ? 18.2 : 14.1));
      diterima = dt;
      registrasi = Math.round(dt * 0.94);
    }

    totalDayaTampung += dt;
    totalPendaftar += pendaftar;
    totalDiterima += diterima;
    totalRegistrasi += registrasi;

    const keketatan = pendaftar > 0 ? diterima / pendaftar : null;
    const persaingan = diterima > 0 ? pendaftar / diterima : null;
    const rasio = dt > 0 ? pendaftar / dt : null;
    const keterisian = dt > 0 ? registrasi / dt : null;

    prodiRows.push({
      prodi: s.prodi,
      fakultas: s.fakultas,
      jenjang: s.jenjang,
      pendaftar,
      diterima,
      registrasi,
      pendaftarAcuan: pendaftar,
      registrasiAcuan: registrasi,
      dayaTampung: dt,
      keketatan,
      persaingan,
      rasio,
      keterisian,
      peringkat: null,
    });
  }

  // Peringkat
  const ranked = prodiRows.filter(r => r.keketatan !== null).sort((a, b) => a.keketatan! - b.keketatan!);
  let prev: number | null = null;
  let rank = 0;
  ranked.forEach((r, i) => {
    if (prev === null || r.keketatan !== prev) {
      rank = i + 1;
      prev = r.keketatan!;
    }
    r.peringkat = rank;
  });

  const keketatanGabungan = totalPendaftar > 0 ? totalDiterima / totalPendaftar : null;
  const pctRegistrasi = totalDiterima > 0 ? totalRegistrasi / totalDiterima : null;
  const berdata = prodiRows.filter(r => r.keketatan !== null);
  const rataKeketatan = berdata.length > 0 ? berdata.reduce((a, b) => a + (b.keketatan ?? 0), 0) / berdata.length : null;

  // Jalur breakdown
  const availableJalurs = f.jenjang && MOCK_FILTER_OPTIONS.jalurByJenjang?.[f.jenjang]
    ? MOCK_FILTER_OPTIONS.jalurByJenjang[f.jenjang]
    : MOCK_FILTER_OPTIONS.jalur;

  const jalurDist = availableJalurs.map((j) => ({
    label: j,
    value: isJalurInvalidForJenjang ? 0 : Math.round(totalPendaftar / Math.max(availableJalurs.length, 1)),
  }));

  // Fakultas breakdown
  const fakMap = new Map<string, { p: number; d: number; r: number }>();
  for (const r of prodiRows) {
    const cur = fakMap.get(r.fakultas) ?? { p: 0, d: 0, r: 0 };
    cur.p += r.pendaftar;
    cur.d += r.diterima;
    cur.r += r.registrasi;
    fakMap.set(r.fakultas, cur);
  }
  const fakultasDist = [...fakMap.entries()].map(([label, v]) => ({
    label: label.replace(/^[0-9]+ - /, ''),
    pendaftar: v.p,
    diterima: v.d,
    registrasi: v.r,
  }));

  const years = [2021, 2022, 2023, 2024, 2025];
  const matrix = prodiRows.slice(0, 30).map((r) => ({
    prodi: r.prodi,
    keketatan: years.map(() => r.keketatan),
    keketatanTotal: r.keketatan,
    registrasi: years.map(() => r.registrasi > 0 && r.diterima > 0 ? r.registrasi / r.diterima : null),
    registrasiTotal: r.registrasi > 0 && r.diterima > 0 ? r.registrasi / r.diterima : null,
  }));

  return {
    kpi: {
      pendaftar: totalPendaftar,
      diterima: totalDiterima,
      registrasi: totalRegistrasi,
      dayaTampung: totalDayaTampung,
      keketatanGabungan,
      pctRegistrasi,
      rataKeketatan,
      duplikat: isJalurInvalidForJenjang ? 0 : 258,
      tahunAcuan: f.tahun ?? 2025,
      prodiBerdata: berdata.length,
      prodiScope: matchingProdi.length,
    },
    tahun: years,
    jalur: jalurDist,
    fakultas: fakultasDist,
    prodi: prodiRows,
    topFavorit: [...prodiRows].sort((a, b) => b.pendaftar - a.pendaftar).slice(0, 10),
    topRasio: [...prodiRows].filter(r => r.rasio !== null).sort((a, b) => (b.rasio ?? 0) - (a.rasio ?? 0)).slice(0, 10),
    matrix,
  };
}

export function getMockPmbData(f: Filters): PmbData {
  let matchingProdi = PRODI_SEEDS;
  if (f.jenjang) matchingProdi = matchingProdi.filter(p => p.jenjang === f.jenjang);
  if (f.fakultas) matchingProdi = matchingProdi.filter(p => p.fakultas === f.fakultas);
  if (f.prodi) matchingProdi = matchingProdi.filter(p => p.prodi === f.prodi);

  const perProdi: VerifikasiRow[] = matchingProdi.map((p) => {
    const terverifikasi = Math.round(p.dtTotal * 0.85);
    const menunggu = Math.round(p.dtTotal * 0.12);
    const ditolak = Math.round(p.dtTotal * 0.03);
    return {
      prodi: p.prodi,
      menunggu,
      terverifikasi,
      ditolak,
      total: menunggu + terverifikasi + ditolak,
    };
  });

  const totalTerverifikasi = perProdi.reduce((a, b) => a + b.terverifikasi, 0);
  const totalMenunggu = perProdi.reduce((a, b) => a + b.menunggu, 0);
  const totalDitolak = perProdi.reduce((a, b) => a + b.ditolak, 0);
  const totalPendaftar = totalTerverifikasi + totalMenunggu + totalDitolak;

  const harian = Array.from({ length: 30 }).map((_, i) => {
    const d = new Date(2025, 4, 1 + i);
    const iso = d.toISOString().split('T')[0];
    return {
      tanggal: iso,
      value: Math.round((totalPendaftar / 30) * (0.8 + 0.4 * Math.sin(i))),
    };
  });

  return {
    kpi: {
      hariIni: Math.round(totalPendaftar * 0.04),
      tanggalTerakhir: '2025-05-30',
      rataHarian: totalPendaftar > 0 ? totalPendaftar / 30 : null,
      terverifikasi: totalTerverifikasi,
      menunggu: totalMenunggu,
      ditolak: totalDitolak,
      totalPendaftar,
    },
    harian,
    perProdi,
  };
}
