import type {
  FilterOptionsHerregistrasi,
  FiltersHerregistrasi,
  HerregistrasiData,
  ProdiSummaryRow,
  FakultasDistribusiRow,
} from "./types-herregistrasi";

export const DEFAULT_OPTIONS_HERREGISTRASI: FilterOptionsHerregistrasi = {
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

type SeedHerreg = {
  prodi: string;
  fakultas: string;
  jenjang: string;
  total: number;
  herregistrasi: number;
  tidakHerregistrasi: number;
  bayarMandiri: number;
  beasiswa: number;
  cuti: number;
  pembebasan: number;
  penangguhan: number;
  krs: number;
  tidakKrs: number;
};

const SEED_HERREG: SeedHerreg[] = [{"prodi": "Administrasi Bisnis (Magister)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Magister", "total": -5712, "herregistrasi": -5417, "tidakHerregistrasi": 9, "bayarMandiri": 124, "beasiswa": 22, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": -5092, "tidakKrs": 9}, {"prodi": "Administrasi Bisnis (Sarjana)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Sarjana", "total": 157, "herregistrasi": 148, "tidakHerregistrasi": 9, "bayarMandiri": 124, "beasiswa": 22, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 139, "tidakKrs": 9}, {"prodi": "Administrasi Bisnis PSDKU (Sarjana)", "fakultas": "Program PSDKU Pangandaran", "jenjang": "Sarjana", "total": 40, "herregistrasi": 37, "tidakHerregistrasi": 3, "bayarMandiri": 31, "beasiswa": 5, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 34, "tidakKrs": 3}, {"prodi": "Administrasi Keuangan Publik (Sarjana Terapan)", "fakultas": "28 - Sekolah Vokasi", "jenjang": "Sarjana Terapan", "total": 88, "herregistrasi": 83, "tidakHerregistrasi": 5, "bayarMandiri": 69, "beasiswa": 12, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 78, "tidakKrs": 5}, {"prodi": "Administrasi Pemerintahan (Sarjana Terapan)", "fakultas": "28 - Sekolah Vokasi", "jenjang": "Sarjana Terapan", "total": 88, "herregistrasi": 83, "tidakHerregistrasi": 5, "bayarMandiri": 69, "beasiswa": 12, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 78, "tidakKrs": 5}, {"prodi": "Administrasi Publik (Magister)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Magister", "total": 157, "herregistrasi": 148, "tidakHerregistrasi": 9, "bayarMandiri": 124, "beasiswa": 22, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 139, "tidakKrs": 9}, {"prodi": "Administrasi Publik (Sarjana)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Sarjana", "total": 157, "herregistrasi": 148, "tidakHerregistrasi": 9, "bayarMandiri": 124, "beasiswa": 22, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 139, "tidakKrs": 9}, {"prodi": "Agribisnis (Sarjana)", "fakultas": "15 - Pertanian", "jenjang": "Sarjana", "total": 371, "herregistrasi": 351, "tidakHerregistrasi": 20, "bayarMandiri": 294, "beasiswa": 54, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 329, "tidakKrs": 22}, {"prodi": "Agronomi (Magister)", "fakultas": "15 - Pertanian", "jenjang": "Magister", "total": 371, "herregistrasi": 351, "tidakHerregistrasi": 20, "bayarMandiri": 294, "beasiswa": 54, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 329, "tidakKrs": 22}, {"prodi": "Agroteknologi (Sarjana)", "fakultas": "15 - Pertanian", "jenjang": "Sarjana", "total": 371, "herregistrasi": 351, "tidakHerregistrasi": 20, "bayarMandiri": 294, "beasiswa": 54, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 329, "tidakKrs": 22}, {"prodi": "Agroteknopreneur (Sarjana Terapan)", "fakultas": "28 - Sekolah Vokasi", "jenjang": "Sarjana Terapan", "total": 88, "herregistrasi": 83, "tidakHerregistrasi": 5, "bayarMandiri": 69, "beasiswa": 12, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 78, "tidakKrs": 5}, {"prodi": "Aktuaria (Sarjana)", "fakultas": "14 - Matematika dan Ilmu Pengetahuan Alam", "jenjang": "Sarjana", "total": 175, "herregistrasi": 165, "tidakHerregistrasi": 10, "bayarMandiri": 138, "beasiswa": 25, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 155, "tidakKrs": 10}, {"prodi": "Akuntan (Profesi)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Profesi", "total": 194, "herregistrasi": 183, "tidakHerregistrasi": 11, "bayarMandiri": 153, "beasiswa": 28, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 172, "tidakKrs": 11}, {"prodi": "Akuntansi (Doktor)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Doktor", "total": 194, "herregistrasi": 183, "tidakHerregistrasi": 11, "bayarMandiri": 153, "beasiswa": 28, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 172, "tidakKrs": 11}, {"prodi": "Akuntansi (Magister)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Magister", "total": 194, "herregistrasi": 183, "tidakHerregistrasi": 11, "bayarMandiri": 153, "beasiswa": 28, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 172, "tidakKrs": 11}, {"prodi": "Akuntansi (Sarjana)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Sarjana", "total": 194, "herregistrasi": 183, "tidakHerregistrasi": 11, "bayarMandiri": 153, "beasiswa": 28, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 172, "tidakKrs": 11}, {"prodi": "Akuntansi Perpajakan (Sarjana Terapan)", "fakultas": "28 - Sekolah Vokasi", "jenjang": "Sarjana Terapan", "total": 88, "herregistrasi": 83, "tidakHerregistrasi": 5, "bayarMandiri": 69, "beasiswa": 12, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 78, "tidakKrs": 5}, {"prodi": "Akuntansi Sektor Publik (Sarjana Terapan)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Sarjana Terapan", "total": 194, "herregistrasi": 183, "tidakHerregistrasi": 11, "bayarMandiri": 153, "beasiswa": 28, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 172, "tidakKrs": 11}, {"prodi": "Anestesiologi dan Terapi Intensif (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "total": 70, "herregistrasi": 66, "tidakHerregistrasi": 4, "bayarMandiri": 55, "beasiswa": 10, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 62, "tidakKrs": 4}, {"prodi": "Anestesiologi dan Terapi Intensif (Subspesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Subspesialis", "total": 70, "herregistrasi": 66, "tidakHerregistrasi": 4, "bayarMandiri": 55, "beasiswa": 10, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 62, "tidakKrs": 4}, {"prodi": "Anti Aging dan Aesthetic Medicine (Magister)", "fakultas": "13 - Kedokteran", "jenjang": "Magister", "total": 70, "herregistrasi": 66, "tidakHerregistrasi": 4, "bayarMandiri": 55, "beasiswa": 10, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 62, "tidakKrs": 4}, {"prodi": "Antropologi (Magister)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Magister", "total": 157, "herregistrasi": 148, "tidakHerregistrasi": 9, "bayarMandiri": 124, "beasiswa": 22, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 139, "tidakKrs": 9}, {"prodi": "Antropologi (Sarjana)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Sarjana", "total": 157, "herregistrasi": 148, "tidakHerregistrasi": 9, "bayarMandiri": 124, "beasiswa": 22, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 139, "tidakKrs": 9}, {"prodi": "Apoteker (Profesi)", "fakultas": "26 - Farmasi", "jenjang": "Profesi", "total": 253, "herregistrasi": 239, "tidakHerregistrasi": 14, "bayarMandiri": 200, "beasiswa": 36, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 224, "tidakKrs": 15}, {"prodi": "Bahasa dan Budaya Tiongkok (Sarjana Terapan)", "fakultas": "28 - Sekolah Vokasi", "jenjang": "Sarjana Terapan", "total": 88, "herregistrasi": 83, "tidakHerregistrasi": 5, "bayarMandiri": 69, "beasiswa": 12, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 78, "tidakKrs": 5}, {"prodi": "Bedah (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "total": 70, "herregistrasi": 66, "tidakHerregistrasi": 4, "bayarMandiri": 55, "beasiswa": 10, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 62, "tidakKrs": 4}, {"prodi": "Bedah (Subspesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Subspesialis", "total": 70, "herregistrasi": 66, "tidakHerregistrasi": 4, "bayarMandiri": 55, "beasiswa": 10, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 62, "tidakKrs": 4}, {"prodi": "Bedah Anak (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "total": 70, "herregistrasi": 66, "tidakHerregistrasi": 4, "bayarMandiri": 55, "beasiswa": 10, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 62, "tidakKrs": 4}, {"prodi": "Bedah Mulut (Spesialis)", "fakultas": "16 - Kedokteran Gigi", "jenjang": "Spesialis", "total": 92, "herregistrasi": 87, "tidakHerregistrasi": 5, "bayarMandiri": 73, "beasiswa": 13, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 81, "tidakKrs": 6}, {"prodi": "Bedah Mulut dan Maksilofasial (Spesialis)", "fakultas": "16 - Kedokteran Gigi", "jenjang": "Spesialis", "total": 92, "herregistrasi": 87, "tidakHerregistrasi": 5, "bayarMandiri": 73, "beasiswa": 13, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 81, "tidakKrs": 6}, {"prodi": "Bedah Saraf (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "total": 70, "herregistrasi": 66, "tidakHerregistrasi": 4, "bayarMandiri": 55, "beasiswa": 10, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 62, "tidakKrs": 4}, {"prodi": "Biologi (Magister)", "fakultas": "14 - Matematika dan Ilmu Pengetahuan Alam", "jenjang": "Magister", "total": 175, "herregistrasi": 165, "tidakHerregistrasi": 10, "bayarMandiri": 138, "beasiswa": 25, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 155, "tidakKrs": 10}, {"prodi": "Biologi (Sarjana)", "fakultas": "14 - Matematika dan Ilmu Pengetahuan Alam", "jenjang": "Sarjana", "total": 175, "herregistrasi": 165, "tidakHerregistrasi": 10, "bayarMandiri": 138, "beasiswa": 25, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 155, "tidakKrs": 10}, {"prodi": "Bioteknologi (Doktor)", "fakultas": "25 - Sekolah Pascasarjana", "jenjang": "Doktor", "total": 105, "herregistrasi": 99, "tidakHerregistrasi": 6, "bayarMandiri": 83, "beasiswa": 15, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 93, "tidakKrs": 6}, {"prodi": "Bioteknologi (Magister)", "fakultas": "25 - Sekolah Pascasarjana", "jenjang": "Magister", "total": 105, "herregistrasi": 99, "tidakHerregistrasi": 6, "bayarMandiri": 83, "beasiswa": 15, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 93, "tidakKrs": 6}, {"prodi": "Bisnis Digital (Sarjana)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Sarjana", "total": 194, "herregistrasi": 183, "tidakHerregistrasi": 11, "bayarMandiri": 153, "beasiswa": 28, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 172, "tidakKrs": 11}, {"prodi": "Bisnis Internasional (Sarjana Terapan)", "fakultas": "28 - Sekolah Vokasi", "jenjang": "Sarjana Terapan", "total": 88, "herregistrasi": 83, "tidakHerregistrasi": 5, "bayarMandiri": 69, "beasiswa": 12, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 78, "tidakKrs": 5}, {"prodi": "Bisnis Logistik (Sarjana Terapan)", "fakultas": "28 - Sekolah Vokasi", "jenjang": "Sarjana Terapan", "total": 88, "herregistrasi": 83, "tidakHerregistrasi": 5, "bayarMandiri": 69, "beasiswa": 12, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 78, "tidakKrs": 5}, {"prodi": "Dermatologi, Venereologi dan Estetika (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "total": 70, "herregistrasi": 66, "tidakHerregistrasi": 4, "bayarMandiri": 55, "beasiswa": 10, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 62, "tidakKrs": 4}, {"prodi": "Dermatologi, Venerologi, dan Estetika (Subspesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Subspesialis", "total": 70, "herregistrasi": 66, "tidakHerregistrasi": 4, "bayarMandiri": 55, "beasiswa": 10, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 62, "tidakKrs": 4}, {"prodi": "Dokter (Profesi)", "fakultas": "13 - Kedokteran", "jenjang": "Profesi", "total": 70, "herregistrasi": 66, "tidakHerregistrasi": 4, "bayarMandiri": 55, "beasiswa": 10, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 62, "tidakKrs": 4}, {"prodi": "Dokter Gigi (Profesi)", "fakultas": "16 - Kedokteran Gigi", "jenjang": "Profesi", "total": 92, "herregistrasi": 87, "tidakHerregistrasi": 5, "bayarMandiri": 73, "beasiswa": 13, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 81, "tidakKrs": 6}, {"prodi": "Ekonomi (Doktor)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Doktor", "total": 194, "herregistrasi": 183, "tidakHerregistrasi": 11, "bayarMandiri": 153, "beasiswa": 28, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 172, "tidakKrs": 11}, {"prodi": "Ekonomi (Magister)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Magister", "total": 194, "herregistrasi": 183, "tidakHerregistrasi": 11, "bayarMandiri": 153, "beasiswa": 28, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 172, "tidakKrs": 11}, {"prodi": "Ekonomi Islam (Sarjana)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Sarjana", "total": 194, "herregistrasi": 183, "tidakHerregistrasi": 11, "bayarMandiri": 153, "beasiswa": 28, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 172, "tidakKrs": 11}, {"prodi": "Ekonomi Pembangunan (Sarjana)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Sarjana", "total": 194, "herregistrasi": 183, "tidakHerregistrasi": 11, "bayarMandiri": 153, "beasiswa": 28, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 172, "tidakKrs": 11}, {"prodi": "Ekonomi Pertanian (Magister)", "fakultas": "15 - Pertanian", "jenjang": "Magister", "total": 371, "herregistrasi": 351, "tidakHerregistrasi": 20, "bayarMandiri": 294, "beasiswa": 54, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 329, "tidakKrs": 22}, {"prodi": "Ekonomi Pertanian Pendidikan Jarak Jauh (PJJ) (Magister)", "fakultas": "15 - Pertanian", "jenjang": "Magister", "total": 371, "herregistrasi": 351, "tidakHerregistrasi": 20, "bayarMandiri": 294, "beasiswa": 54, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 329, "tidakKrs": 22}, {"prodi": "Ekonomi Terapan (Magister)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Magister", "total": 194, "herregistrasi": 183, "tidakHerregistrasi": 11, "bayarMandiri": 153, "beasiswa": 28, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 172, "tidakKrs": 11}, {"prodi": "Epidemiologi (Magister)", "fakultas": "13 - Kedokteran", "jenjang": "Magister", "total": 70, "herregistrasi": 66, "tidakHerregistrasi": 4, "bayarMandiri": 55, "beasiswa": 10, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 62, "tidakKrs": 4}, {"prodi": "Farmasi (Doktor)", "fakultas": "26 - Farmasi", "jenjang": "Doktor", "total": 253, "herregistrasi": 239, "tidakHerregistrasi": 14, "bayarMandiri": 200, "beasiswa": 36, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 224, "tidakKrs": 15}, {"prodi": "Farmasi (Magister)", "fakultas": "26 - Farmasi", "jenjang": "Magister", "total": 253, "herregistrasi": 239, "tidakHerregistrasi": 14, "bayarMandiri": 200, "beasiswa": 36, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 224, "tidakKrs": 15}, {"prodi": "Farmasi (Sarjana)", "fakultas": "26 - Farmasi", "jenjang": "Sarjana", "total": 253, "herregistrasi": 239, "tidakHerregistrasi": 14, "bayarMandiri": 200, "beasiswa": 36, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 224, "tidakKrs": 15}, {"prodi": "Farmasi Klinik (Magister)", "fakultas": "26 - Farmasi", "jenjang": "Magister", "total": 253, "herregistrasi": 239, "tidakHerregistrasi": 14, "bayarMandiri": 200, "beasiswa": 36, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 224, "tidakKrs": 15}, {"prodi": "Farmasi Nuklir (Spesialis)", "fakultas": "26 - Farmasi", "jenjang": "Spesialis", "total": 253, "herregistrasi": 239, "tidakHerregistrasi": 14, "bayarMandiri": 200, "beasiswa": 36, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 224, "tidakKrs": 15}, {"prodi": "Fisika (Magister)", "fakultas": "14 - Matematika dan Ilmu Pengetahuan Alam", "jenjang": "Magister", "total": 175, "herregistrasi": 165, "tidakHerregistrasi": 10, "bayarMandiri": 138, "beasiswa": 25, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 155, "tidakKrs": 10}, {"prodi": "Fisika (Sarjana)", "fakultas": "14 - Matematika dan Ilmu Pengetahuan Alam", "jenjang": "Sarjana", "total": 175, "herregistrasi": 165, "tidakHerregistrasi": 10, "bayarMandiri": 138, "beasiswa": 25, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 155, "tidakKrs": 10}, {"prodi": "Geofisika (Sarjana)", "fakultas": "14 - Matematika dan Ilmu Pengetahuan Alam", "jenjang": "Sarjana", "total": 175, "herregistrasi": 165, "tidakHerregistrasi": 10, "bayarMandiri": 138, "beasiswa": 25, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 155, "tidakKrs": 10}, {"prodi": "Gizi Klinik (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "total": 70, "herregistrasi": 66, "tidakHerregistrasi": 4, "bayarMandiri": 55, "beasiswa": 10, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 62, "tidakKrs": 4}, {"prodi": "Hubungan Internasional (Doktor)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Doktor", "total": 157, "herregistrasi": 148, "tidakHerregistrasi": 9, "bayarMandiri": 124, "beasiswa": 22, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 139, "tidakKrs": 9}, {"prodi": "Hubungan Internasional (Magister)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Magister", "total": 157, "herregistrasi": 148, "tidakHerregistrasi": 9, "bayarMandiri": 124, "beasiswa": 22, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 139, "tidakKrs": 9}, {"prodi": "Hubungan Internasional (Sarjana)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Sarjana", "total": 157, "herregistrasi": 148, "tidakHerregistrasi": 9, "bayarMandiri": 124, "beasiswa": 22, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 139, "tidakKrs": 9}, {"prodi": "Hubungan Masyarakat (Sarjana)", "fakultas": "21 - Ilmu Komunikasi", "jenjang": "Sarjana", "total": 400, "herregistrasi": 379, "tidakHerregistrasi": 21, "bayarMandiri": 318, "beasiswa": 58, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 356, "tidakKrs": 23}, {"prodi": "Hukum (Doktor)", "fakultas": "11 - Hukum", "jenjang": "Doktor", "total": 537, "herregistrasi": 509, "tidakHerregistrasi": 28, "bayarMandiri": 427, "beasiswa": 78, "cuti": 1, "pembebasan": 0, "penangguhan": 0, "krs": 477, "tidakKrs": 31}, {"prodi": "Hukum (Magister)", "fakultas": "11 - Hukum", "jenjang": "Magister", "total": 537, "herregistrasi": 509, "tidakHerregistrasi": 28, "bayarMandiri": 427, "beasiswa": 78, "cuti": 1, "pembebasan": 0, "penangguhan": 0, "krs": 477, "tidakKrs": 31}, {"prodi": "Ilmu Administrasi (Doktor)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Doktor", "total": 157, "herregistrasi": 148, "tidakHerregistrasi": 9, "bayarMandiri": 124, "beasiswa": 22, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 139, "tidakKrs": 9}, {"prodi": "Ilmu Bedah Plastik (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "total": 70, "herregistrasi": 66, "tidakHerregistrasi": 4, "bayarMandiri": 55, "beasiswa": 10, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 62, "tidakKrs": 4}, {"prodi": "Ilmu Ekonomi (Sarjana)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Sarjana", "total": 194, "herregistrasi": 183, "tidakHerregistrasi": 11, "bayarMandiri": 153, "beasiswa": 28, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 172, "tidakKrs": 11}, {"prodi": "Ilmu Hukum (Sarjana)", "fakultas": "11 - Hukum", "jenjang": "Sarjana", "total": 537, "herregistrasi": 509, "tidakHerregistrasi": 28, "bayarMandiri": 427, "beasiswa": 78, "cuti": 1, "pembebasan": 0, "penangguhan": 0, "krs": 477, "tidakKrs": 31}, {"prodi": "Ilmu Keberlanjutan (Magister)", "fakultas": "25 - Sekolah Pascasarjana", "jenjang": "Magister", "total": 105, "herregistrasi": 99, "tidakHerregistrasi": 6, "bayarMandiri": 83, "beasiswa": 15, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 93, "tidakKrs": 6}, {"prodi": "Ilmu Kedokteran Dasar (Magister)", "fakultas": "13 - Kedokteran", "jenjang": "Magister", "total": 70, "herregistrasi": 66, "tidakHerregistrasi": 4, "bayarMandiri": 55, "beasiswa": 10, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 62, "tidakKrs": 4}, {"prodi": "Ilmu Kedokteran Gigi (Doktor)", "fakultas": "16 - Kedokteran Gigi", "jenjang": "Doktor", "total": 92, "herregistrasi": 87, "tidakHerregistrasi": 5, "bayarMandiri": 73, "beasiswa": 13, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 81, "tidakKrs": 6}, {"prodi": "Ilmu Kedokteran Gigi (Magister)", "fakultas": "16 - Kedokteran Gigi", "jenjang": "Magister", "total": 92, "herregistrasi": 87, "tidakHerregistrasi": 5, "bayarMandiri": 73, "beasiswa": 13, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 81, "tidakKrs": 6}, {"prodi": "Ilmu Kelautan (Sarjana)", "fakultas": "23 - Perikanan dan Ilmu Kelautan", "jenjang": "Sarjana", "total": 400, "herregistrasi": 379, "tidakHerregistrasi": 21, "bayarMandiri": 318, "beasiswa": 58, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 356, "tidakKrs": 23}, {"prodi": "Ilmu Kesehatan Mata (RS Pusat Mata Nasional Cicendo) (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "total": 70, "herregistrasi": 66, "tidakHerregistrasi": 4, "bayarMandiri": 55, "beasiswa": 10, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 62, "tidakKrs": 4}, {"prodi": "Ilmu Kesehatan Mata (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "total": 70, "herregistrasi": 66, "tidakHerregistrasi": 4, "bayarMandiri": 55, "beasiswa": 10, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 62, "tidakKrs": 4}, {"prodi": "Ilmu Kesehatan Mata (Subspesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Subspesialis", "total": 70, "herregistrasi": 66, "tidakHerregistrasi": 4, "bayarMandiri": 55, "beasiswa": 10, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 62, "tidakKrs": 4}, {"prodi": "Ilmu Komunikasi (Doktor)", "fakultas": "21 - Ilmu Komunikasi", "jenjang": "Doktor", "total": 400, "herregistrasi": 379, "tidakHerregistrasi": 21, "bayarMandiri": 318, "beasiswa": 58, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 356, "tidakKrs": 23}, {"prodi": "Ilmu Komunikasi (Magister)", "fakultas": "21 - Ilmu Komunikasi", "jenjang": "Magister", "total": 400, "herregistrasi": 379, "tidakHerregistrasi": 21, "bayarMandiri": 318, "beasiswa": 58, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 356, "tidakKrs": 23}, {"prodi": "Ilmu Komunikasi (Sarjana)", "fakultas": "21 - Ilmu Komunikasi", "jenjang": "Sarjana", "total": 400, "herregistrasi": 379, "tidakHerregistrasi": 21, "bayarMandiri": 318, "beasiswa": 58, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 356, "tidakKrs": 23}, {"prodi": "Ilmu Komunikasi PSDKU (Sarjana)", "fakultas": "Program PSDKU Pangandaran", "jenjang": "Sarjana", "total": 40, "herregistrasi": 37, "tidakHerregistrasi": 3, "bayarMandiri": 31, "beasiswa": 5, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 34, "tidakKrs": 3}, {"prodi": "Ilmu Lingkungan (Doktor)", "fakultas": "25 - Sekolah Pascasarjana", "jenjang": "Doktor", "total": 105, "herregistrasi": 99, "tidakHerregistrasi": 6, "bayarMandiri": 83, "beasiswa": 15, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 93, "tidakKrs": 6}, {"prodi": "Ilmu Lingkungan (Magister)", "fakultas": "25 - Sekolah Pascasarjana", "jenjang": "Magister", "total": 105, "herregistrasi": 99, "tidakHerregistrasi": 6, "bayarMandiri": 83, "beasiswa": 15, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 93, "tidakKrs": 6}, {"prodi": "Ilmu Manajemen (Magister)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Magister", "total": 194, "herregistrasi": 183, "tidakHerregistrasi": 11, "bayarMandiri": 153, "beasiswa": 28, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 172, "tidakKrs": 11}, {"prodi": "Ilmu Pemerintahan (Magister)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Magister", "total": 157, "herregistrasi": 148, "tidakHerregistrasi": 9, "bayarMandiri": 124, "beasiswa": 22, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 139, "tidakKrs": 9}, {"prodi": "Ilmu Pemerintahan (Sarjana)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Sarjana", "total": 157, "herregistrasi": 148, "tidakHerregistrasi": 9, "bayarMandiri": 124, "beasiswa": 22, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 139, "tidakKrs": 9}, {"prodi": "Ilmu Penyakit Kulit dan Kelamin (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "total": 70, "herregistrasi": 66, "tidakHerregistrasi": 4, "bayarMandiri": 55, "beasiswa": 10, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 62, "tidakKrs": 4}, {"prodi": "Ilmu Penyakit Mata (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "total": 70, "herregistrasi": 66, "tidakHerregistrasi": 4, "bayarMandiri": 55, "beasiswa": 10, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 62, "tidakKrs": 4}, {"prodi": "Ilmu Penyakit THT (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "total": 70, "herregistrasi": 66, "tidakHerregistrasi": 4, "bayarMandiri": 55, "beasiswa": 10, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 62, "tidakKrs": 4}, {"prodi": "Ilmu Pertanian (Doktor)", "fakultas": "15 - Pertanian", "jenjang": "Doktor", "total": 371, "herregistrasi": 351, "tidakHerregistrasi": 20, "bayarMandiri": 294, "beasiswa": 54, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 329, "tidakKrs": 22}, {"prodi": "Ilmu Peternakan (Doktor)", "fakultas": "20 - Peternakan", "jenjang": "Doktor", "total": 425, "herregistrasi": 403, "tidakHerregistrasi": 22, "bayarMandiri": 338, "beasiswa": 62, "cuti": 1, "pembebasan": 0, "penangguhan": 0, "krs": 377, "tidakKrs": 25}, {"prodi": "Ilmu Peternakan (Magister)", "fakultas": "20 - Peternakan", "jenjang": "Magister", "total": 425, "herregistrasi": 403, "tidakHerregistrasi": 22, "bayarMandiri": 338, "beasiswa": 62, "cuti": 1, "pembebasan": 0, "penangguhan": 0, "krs": 377, "tidakKrs": 25}, {"prodi": "Ilmu Peternakan Pendidikan Jarak Jauh (PJJ) (Magister)", "fakultas": "20 - Peternakan", "jenjang": "Magister", "total": 425, "herregistrasi": 403, "tidakHerregistrasi": 22, "bayarMandiri": 338, "beasiswa": 62, "cuti": 1, "pembebasan": 0, "penangguhan": 0, "krs": 377, "tidakKrs": 25}, {"prodi": "Ilmu Politik (Magister)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Magister", "total": 157, "herregistrasi": 148, "tidakHerregistrasi": 9, "bayarMandiri": 124, "beasiswa": 22, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 139, "tidakKrs": 9}, {"prodi": "Ilmu Politik (Sarjana)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Sarjana", "total": 157, "herregistrasi": 148, "tidakHerregistrasi": 9, "bayarMandiri": 124, "beasiswa": 22, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 139, "tidakKrs": 9}, {"prodi": "Ilmu Tanah (Magister)", "fakultas": "15 - Pertanian", "jenjang": "Magister", "total": 371, "herregistrasi": 351, "tidakHerregistrasi": 20, "bayarMandiri": 294, "beasiswa": 54, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 329, "tidakKrs": 22}, {"prodi": "Inovasi Regional (Magister)", "fakultas": "25 - Sekolah Pascasarjana", "jenjang": "Magister", "total": 105, "herregistrasi": 99, "tidakHerregistrasi": 6, "bayarMandiri": 83, "beasiswa": 15, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 93, "tidakKrs": 6}, {"prodi": "Jurnalistik (Sarjana)", "fakultas": "21 - Ilmu Komunikasi", "jenjang": "Sarjana", "total": 400, "herregistrasi": 379, "tidakHerregistrasi": 21, "bayarMandiri": 318, "beasiswa": 58, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 356, "tidakKrs": 23}, {"prodi": "Kajian Budaya (Magister)", "fakultas": "18 - Ilmu Budaya", "jenjang": "Magister", "total": 221, "herregistrasi": 209, "tidakHerregistrasi": 12, "bayarMandiri": 175, "beasiswa": 32, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 196, "tidakKrs": 13}, {"prodi": "Kearsipan Digital (Sarjana Terapan)", "fakultas": "28 - Sekolah Vokasi", "jenjang": "Sarjana Terapan", "total": 88, "herregistrasi": 83, "tidakHerregistrasi": 5, "bayarMandiri": 69, "beasiswa": 12, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 78, "tidakKrs": 5}, {"prodi": "Kebidanan (Magister)", "fakultas": "13 - Kedokteran", "jenjang": "Magister", "total": 70, "herregistrasi": 66, "tidakHerregistrasi": 4, "bayarMandiri": 55, "beasiswa": 10, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 62, "tidakKrs": 4}, {"prodi": "Kebidanan (Sarjana Terapan)", "fakultas": "28 - Sekolah Vokasi", "jenjang": "Sarjana Terapan", "total": 88, "herregistrasi": 83, "tidakHerregistrasi": 5, "bayarMandiri": 69, "beasiswa": 12, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 78, "tidakKrs": 5}, {"prodi": "Kebijakan Publik (Magister)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Magister", "total": 157, "herregistrasi": 148, "tidakHerregistrasi": 9, "bayarMandiri": 124, "beasiswa": 22, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 139, "tidakKrs": 9}, {"prodi": "Kedokteran (Doktor)", "fakultas": "13 - Kedokteran", "jenjang": "Doktor", "total": 70, "herregistrasi": 66, "tidakHerregistrasi": 4, "bayarMandiri": 55, "beasiswa": 10, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 62, "tidakKrs": 4}, {"prodi": "Kedokteran (Sarjana)", "fakultas": "13 - Kedokteran", "jenjang": "Sarjana", "total": 70, "herregistrasi": 66, "tidakHerregistrasi": 4, "bayarMandiri": 55, "beasiswa": 10, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 62, "tidakKrs": 4}, {"prodi": "Kedokteran Fisik dan Rehabilitasi (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "total": 70, "herregistrasi": 66, "tidakHerregistrasi": 4, "bayarMandiri": 55, "beasiswa": 10, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 62, "tidakKrs": 4}, {"prodi": "Kedokteran Fisik dan Rehabilitasi Medik (Subspesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Subspesialis", "total": 70, "herregistrasi": 66, "tidakHerregistrasi": 4, "bayarMandiri": 55, "beasiswa": 10, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 62, "tidakKrs": 4}, {"prodi": "Kedokteran Forensik dan Studi Medikolegal (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "total": 70, "herregistrasi": 66, "tidakHerregistrasi": 4, "bayarMandiri": 55, "beasiswa": 10, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 62, "tidakKrs": 4}, {"prodi": "Kedokteran Gigi (Sarjana)", "fakultas": "16 - Kedokteran Gigi", "jenjang": "Sarjana", "total": 92, "herregistrasi": 87, "tidakHerregistrasi": 5, "bayarMandiri": 73, "beasiswa": 13, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 81, "tidakKrs": 6}, {"prodi": "Kedokteran Hewan (Sarjana)", "fakultas": "13 - Kedokteran", "jenjang": "Sarjana", "total": 70, "herregistrasi": 66, "tidakHerregistrasi": 4, "bayarMandiri": 55, "beasiswa": 10, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 62, "tidakKrs": 4}, {"prodi": "Kedokteran Jiwa (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "total": 70, "herregistrasi": 66, "tidakHerregistrasi": 4, "bayarMandiri": 55, "beasiswa": 10, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 62, "tidakKrs": 4}, {"prodi": "Kedokteran Keluarga Layanan Primer (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "total": 70, "herregistrasi": 66, "tidakHerregistrasi": 4, "bayarMandiri": 55, "beasiswa": 10, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 62, "tidakKrs": 4}, {"prodi": "Kedokteran Layanan Primer (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "total": 70, "herregistrasi": 66, "tidakHerregistrasi": 4, "bayarMandiri": 55, "beasiswa": 10, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 62, "tidakKrs": 4}, {"prodi": "Kedokteran Nuklir (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "total": 70, "herregistrasi": 66, "tidakHerregistrasi": 4, "bayarMandiri": 55, "beasiswa": 10, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 62, "tidakKrs": 4}, {"prodi": "Kenotariatan (Magister)", "fakultas": "11 - Hukum", "jenjang": "Magister", "total": 537, "herregistrasi": 509, "tidakHerregistrasi": 28, "bayarMandiri": 427, "beasiswa": 78, "cuti": 1, "pembebasan": 0, "penangguhan": 0, "krs": 477, "tidakKrs": 31}, {"prodi": "Keperawatan (Doktor)", "fakultas": "22 - Keperawatan", "jenjang": "Doktor", "total": 200, "herregistrasi": 189, "tidakHerregistrasi": 11, "bayarMandiri": 158, "beasiswa": 29, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 177, "tidakKrs": 12}, {"prodi": "Keperawatan (Magister)", "fakultas": "22 - Keperawatan", "jenjang": "Magister", "total": 200, "herregistrasi": 189, "tidakHerregistrasi": 11, "bayarMandiri": 158, "beasiswa": 29, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 177, "tidakKrs": 12}, {"prodi": "Keperawatan (Sarjana)", "fakultas": "22 - Keperawatan", "jenjang": "Sarjana", "total": 200, "herregistrasi": 189, "tidakHerregistrasi": 11, "bayarMandiri": 158, "beasiswa": 29, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 177, "tidakKrs": 12}, {"prodi": "Keperawatan Anestesiologi (Sarjana Terapan)", "fakultas": "22 - Keperawatan", "jenjang": "Sarjana Terapan", "total": 200, "herregistrasi": 189, "tidakHerregistrasi": 11, "bayarMandiri": 158, "beasiswa": 29, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 177, "tidakKrs": 12}, {"prodi": "Keperawatan Medikal Bedah (Spesialis)", "fakultas": "22 - Keperawatan", "jenjang": "Spesialis", "total": 200, "herregistrasi": 189, "tidakHerregistrasi": 11, "bayarMandiri": 158, "beasiswa": 29, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 177, "tidakKrs": 12}, {"prodi": "Keperawatan PSDKU (Sarjana)", "fakultas": "Program PSDKU Pangandaran", "jenjang": "Sarjana", "total": 40, "herregistrasi": 37, "tidakHerregistrasi": 3, "bayarMandiri": 31, "beasiswa": 5, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 34, "tidakKrs": 3}, {"prodi": "Kesehatan Anak (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "total": 70, "herregistrasi": 66, "tidakHerregistrasi": 4, "bayarMandiri": 55, "beasiswa": 10, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 62, "tidakKrs": 4}, {"prodi": "Kesehatan Anak (Subspesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Subspesialis", "total": 70, "herregistrasi": 66, "tidakHerregistrasi": 4, "bayarMandiri": 55, "beasiswa": 10, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 62, "tidakKrs": 4}, {"prodi": "Kesehatan Gigi Anak (Spesialis)", "fakultas": "16 - Kedokteran Gigi", "jenjang": "Spesialis", "total": 92, "herregistrasi": 87, "tidakHerregistrasi": 5, "bayarMandiri": 73, "beasiswa": 13, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 81, "tidakKrs": 6}, {"prodi": "Kesehatan Masyarakat (Magister)", "fakultas": "13 - Kedokteran", "jenjang": "Magister", "total": 70, "herregistrasi": 66, "tidakHerregistrasi": 4, "bayarMandiri": 55, "beasiswa": 10, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 62, "tidakKrs": 4}, {"prodi": "Kesehatan Telinga Hidung Tenggorok Bedah Kepala dan Leher (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "total": 70, "herregistrasi": 66, "tidakHerregistrasi": 4, "bayarMandiri": 55, "beasiswa": 10, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 62, "tidakKrs": 4}, {"prodi": "Kesejahteraan Sosial (Doktor)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Doktor", "total": 157, "herregistrasi": 148, "tidakHerregistrasi": 9, "bayarMandiri": 124, "beasiswa": 22, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 139, "tidakKrs": 9}, {"prodi": "Kesejahteraan Sosial (Magister)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Magister", "total": 157, "herregistrasi": 148, "tidakHerregistrasi": 9, "bayarMandiri": 124, "beasiswa": 22, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 139, "tidakKrs": 9}, {"prodi": "Kesejahteraan Sosial (Sarjana)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Sarjana", "total": 157, "herregistrasi": 148, "tidakHerregistrasi": 9, "bayarMandiri": 124, "beasiswa": 22, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 139, "tidakKrs": 9}, {"prodi": "Kimia (Doktor)", "fakultas": "14 - Matematika dan Ilmu Pengetahuan Alam", "jenjang": "Doktor", "total": 175, "herregistrasi": 165, "tidakHerregistrasi": 10, "bayarMandiri": 138, "beasiswa": 25, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 155, "tidakKrs": 10}, {"prodi": "Kimia (Magister)", "fakultas": "14 - Matematika dan Ilmu Pengetahuan Alam", "jenjang": "Magister", "total": 175, "herregistrasi": 165, "tidakHerregistrasi": 10, "bayarMandiri": 138, "beasiswa": 25, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 155, "tidakKrs": 10}, {"prodi": "Kimia (Sarjana)", "fakultas": "14 - Matematika dan Ilmu Pengetahuan Alam", "jenjang": "Sarjana", "total": 175, "herregistrasi": 165, "tidakHerregistrasi": 10, "bayarMandiri": 138, "beasiswa": 25, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 155, "tidakKrs": 10}, {"prodi": "Konservasi Gigi (Spesialis)", "fakultas": "16 - Kedokteran Gigi", "jenjang": "Spesialis", "total": 92, "herregistrasi": 87, "tidakHerregistrasi": 5, "bayarMandiri": 73, "beasiswa": 13, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 81, "tidakKrs": 6}, {"prodi": "Konservasi Laut (Magister)", "fakultas": "23 - Perikanan dan Ilmu Kelautan", "jenjang": "Magister", "total": 400, "herregistrasi": 379, "tidakHerregistrasi": 21, "bayarMandiri": 318, "beasiswa": 58, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 356, "tidakKrs": 23}, {"prodi": "Linguistik (Magister)", "fakultas": "18 - Ilmu Budaya", "jenjang": "Magister", "total": 221, "herregistrasi": 209, "tidakHerregistrasi": 12, "bayarMandiri": 175, "beasiswa": 32, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 196, "tidakKrs": 13}, {"prodi": "Manajemen (Doktor)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Doktor", "total": 194, "herregistrasi": 183, "tidakHerregistrasi": 11, "bayarMandiri": 153, "beasiswa": 28, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 172, "tidakKrs": 11}, {"prodi": "Manajemen (Magister)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Magister", "total": 194, "herregistrasi": 183, "tidakHerregistrasi": 11, "bayarMandiri": 153, "beasiswa": 28, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 172, "tidakKrs": 11}, {"prodi": "Manajemen (Sains) (Magister)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Magister", "total": 194, "herregistrasi": 183, "tidakHerregistrasi": 11, "bayarMandiri": 153, "beasiswa": 28, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 172, "tidakKrs": 11}, {"prodi": "Manajemen (Sarjana)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Sarjana", "total": 194, "herregistrasi": 183, "tidakHerregistrasi": 11, "bayarMandiri": 153, "beasiswa": 28, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 172, "tidakKrs": 11}, {"prodi": "Manajemen Keuangan Mikro Terpadu (Magister)", "fakultas": "12 - Ekonomi dan Bisnis", "jenjang": "Magister", "total": 194, "herregistrasi": 183, "tidakHerregistrasi": 11, "bayarMandiri": 153, "beasiswa": 28, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 172, "tidakKrs": 11}, {"prodi": "Manajemen Komunikasi (Sarjana)", "fakultas": "21 - Ilmu Komunikasi", "jenjang": "Sarjana", "total": 400, "herregistrasi": 379, "tidakHerregistrasi": 21, "bayarMandiri": 318, "beasiswa": 58, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 356, "tidakKrs": 23}, {"prodi": "Manajemen Produksi Media (Sarjana Terapan)", "fakultas": "28 - Sekolah Vokasi", "jenjang": "Sarjana Terapan", "total": 88, "herregistrasi": 83, "tidakHerregistrasi": 5, "bayarMandiri": 69, "beasiswa": 12, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 78, "tidakKrs": 5}, {"prodi": "Manajemen Sumber Daya Hayati (Magister)", "fakultas": "25 - Sekolah Pascasarjana", "jenjang": "Magister", "total": 105, "herregistrasi": 99, "tidakHerregistrasi": 6, "bayarMandiri": 83, "beasiswa": 15, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 93, "tidakKrs": 6}, {"prodi": "Matematika (Doktor)", "fakultas": "14 - Matematika dan Ilmu Pengetahuan Alam", "jenjang": "Doktor", "total": 175, "herregistrasi": 165, "tidakHerregistrasi": 10, "bayarMandiri": 138, "beasiswa": 25, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 155, "tidakKrs": 10}, {"prodi": "Matematika (Magister)", "fakultas": "14 - Matematika dan Ilmu Pengetahuan Alam", "jenjang": "Magister", "total": 175, "herregistrasi": 165, "tidakHerregistrasi": 10, "bayarMandiri": 138, "beasiswa": 25, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 155, "tidakKrs": 10}, {"prodi": "Matematika (Sarjana)", "fakultas": "14 - Matematika dan Ilmu Pengetahuan Alam", "jenjang": "Sarjana", "total": 175, "herregistrasi": 165, "tidakHerregistrasi": 10, "bayarMandiri": 138, "beasiswa": 25, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 155, "tidakKrs": 10}, {"prodi": "Neurologi (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "total": 70, "herregistrasi": 66, "tidakHerregistrasi": 4, "bayarMandiri": 55, "beasiswa": 10, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 62, "tidakKrs": 4}, {"prodi": "Obstetri dan Ginekologi (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "total": 70, "herregistrasi": 66, "tidakHerregistrasi": 4, "bayarMandiri": 55, "beasiswa": 10, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 62, "tidakKrs": 4}, {"prodi": "Obstetri dan Ginekologi (Subspesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Subspesialis", "total": 70, "herregistrasi": 66, "tidakHerregistrasi": 4, "bayarMandiri": 55, "beasiswa": 10, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 62, "tidakKrs": 4}, {"prodi": "Orthopaedi dan Traumatologi (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "total": 70, "herregistrasi": 66, "tidakHerregistrasi": 4, "bayarMandiri": 55, "beasiswa": 10, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 62, "tidakKrs": 4}, {"prodi": "Ortodontik (Spesialis)", "fakultas": "16 - Kedokteran Gigi", "jenjang": "Spesialis", "total": 92, "herregistrasi": 87, "tidakHerregistrasi": 5, "bayarMandiri": 73, "beasiswa": 13, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 81, "tidakKrs": 6}, {"prodi": "Pariwisata Bahari (Sarjana Terapan)", "fakultas": "28 - Sekolah Vokasi", "jenjang": "Sarjana Terapan", "total": 88, "herregistrasi": 83, "tidakHerregistrasi": 5, "bayarMandiri": 69, "beasiswa": 12, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 78, "tidakKrs": 5}, {"prodi": "Pariwisata Berkelanjutan (Magister)", "fakultas": "25 - Sekolah Pascasarjana", "jenjang": "Magister", "total": 105, "herregistrasi": 99, "tidakHerregistrasi": 6, "bayarMandiri": 83, "beasiswa": 15, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 93, "tidakKrs": 6}, {"prodi": "Patologi Anatomik (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "total": 70, "herregistrasi": 66, "tidakHerregistrasi": 4, "bayarMandiri": 55, "beasiswa": 10, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 62, "tidakKrs": 4}, {"prodi": "Patologi Klinik (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "total": 70, "herregistrasi": 66, "tidakHerregistrasi": 4, "bayarMandiri": 55, "beasiswa": 10, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 62, "tidakKrs": 4}, {"prodi": "Patologi Klinik (Subspesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Subspesialis", "total": 70, "herregistrasi": 66, "tidakHerregistrasi": 4, "bayarMandiri": 55, "beasiswa": 10, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 62, "tidakKrs": 4}, {"prodi": "Pemasaran Digital (Sarjana Terapan)", "fakultas": "28 - Sekolah Vokasi", "jenjang": "Sarjana Terapan", "total": 88, "herregistrasi": 83, "tidakHerregistrasi": 5, "bayarMandiri": 69, "beasiswa": 12, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 78, "tidakKrs": 5}, {"prodi": "Pendidikan Profesi Psikologi (Profesi)", "fakultas": "19 - Psikologi", "jenjang": "Profesi", "total": 220, "herregistrasi": 208, "tidakHerregistrasi": 12, "bayarMandiri": 174, "beasiswa": 32, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 195, "tidakKrs": 13}, {"prodi": "Penyakit Dalam (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "total": 70, "herregistrasi": 66, "tidakHerregistrasi": 4, "bayarMandiri": 55, "beasiswa": 10, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 62, "tidakKrs": 4}, {"prodi": "Penyakit Dalam (Subspesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Subspesialis", "total": 70, "herregistrasi": 66, "tidakHerregistrasi": 4, "bayarMandiri": 55, "beasiswa": 10, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 62, "tidakKrs": 4}, {"prodi": "Penyakit Jantung dan Pembuluh Darah (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "total": 70, "herregistrasi": 66, "tidakHerregistrasi": 4, "bayarMandiri": 55, "beasiswa": 10, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 62, "tidakKrs": 4}, {"prodi": "Penyakit Mulut (Spesialis)", "fakultas": "16 - Kedokteran Gigi", "jenjang": "Spesialis", "total": 92, "herregistrasi": 87, "tidakHerregistrasi": 5, "bayarMandiri": 73, "beasiswa": 13, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 81, "tidakKrs": 6}, {"prodi": "Perikanan (Magister)", "fakultas": "23 - Perikanan dan Ilmu Kelautan", "jenjang": "Magister", "total": 400, "herregistrasi": 379, "tidakHerregistrasi": 21, "bayarMandiri": 318, "beasiswa": 58, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 356, "tidakKrs": 23}, {"prodi": "Perikanan (Sarjana)", "fakultas": "23 - Perikanan dan Ilmu Kelautan", "jenjang": "Sarjana", "total": 400, "herregistrasi": 379, "tidakHerregistrasi": 21, "bayarMandiri": 318, "beasiswa": 58, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 356, "tidakKrs": 23}, {"prodi": "Perikanan dan Kelautan Berkelanjutan (Doktor)", "fakultas": "23 - Perikanan dan Ilmu Kelautan", "jenjang": "Doktor", "total": 400, "herregistrasi": 379, "tidakHerregistrasi": 21, "bayarMandiri": 318, "beasiswa": 58, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 356, "tidakKrs": 23}, {"prodi": "Perikanan PSDKU (Sarjana)", "fakultas": "Program PSDKU Pangandaran", "jenjang": "Sarjana", "total": 40, "herregistrasi": 37, "tidakHerregistrasi": 3, "bayarMandiri": 31, "beasiswa": 5, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 34, "tidakKrs": 3}, {"prodi": "Periodontik (Spesialis)", "fakultas": "16 - Kedokteran Gigi", "jenjang": "Spesialis", "total": 92, "herregistrasi": 87, "tidakHerregistrasi": 5, "bayarMandiri": 73, "beasiswa": 13, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 81, "tidakKrs": 6}, {"prodi": "Perpustakaan dan Sains Informasi (Sarjana)", "fakultas": "21 - Ilmu Komunikasi", "jenjang": "Sarjana", "total": 400, "herregistrasi": 379, "tidakHerregistrasi": 21, "bayarMandiri": 318, "beasiswa": 58, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 356, "tidakKrs": 23}, {"prodi": "Peternakan (Sarjana)", "fakultas": "20 - Peternakan", "jenjang": "Sarjana", "total": 425, "herregistrasi": 403, "tidakHerregistrasi": 22, "bayarMandiri": 338, "beasiswa": 62, "cuti": 1, "pembebasan": 0, "penangguhan": 0, "krs": 377, "tidakKrs": 25}, {"prodi": "Peternakan PSDKU (Sarjana)", "fakultas": "Program PSDKU Pangandaran", "jenjang": "Sarjana", "total": 40, "herregistrasi": 37, "tidakHerregistrasi": 3, "bayarMandiri": 31, "beasiswa": 5, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 34, "tidakKrs": 3}, {"prodi": "Profesi Dokter Hewan (Profesi)", "fakultas": "13 - Kedokteran", "jenjang": "Profesi", "total": 70, "herregistrasi": 66, "tidakHerregistrasi": 4, "bayarMandiri": 55, "beasiswa": 10, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 62, "tidakKrs": 4}, {"prodi": "Profesi Ners (Profesi)", "fakultas": "22 - Keperawatan", "jenjang": "Profesi", "total": 200, "herregistrasi": 189, "tidakHerregistrasi": 11, "bayarMandiri": 158, "beasiswa": 29, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 177, "tidakKrs": 12}, {"prodi": "Profesi Ners PSDKU Pangandaran (Profesi)", "fakultas": "22 - Keperawatan", "jenjang": "Profesi", "total": 200, "herregistrasi": 189, "tidakHerregistrasi": 11, "bayarMandiri": 158, "beasiswa": 29, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 177, "tidakKrs": 12}, {"prodi": "Program Profesi Insinyur (Profesi)", "fakultas": "25 - Sekolah Pascasarjana", "jenjang": "Profesi", "total": 105, "herregistrasi": 99, "tidakHerregistrasi": 6, "bayarMandiri": 83, "beasiswa": 15, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 93, "tidakKrs": 6}, {"prodi": "Prostodontik (Spesialis)", "fakultas": "16 - Kedokteran Gigi", "jenjang": "Spesialis", "total": 92, "herregistrasi": 87, "tidakHerregistrasi": 5, "bayarMandiri": 73, "beasiswa": 13, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 81, "tidakKrs": 6}, {"prodi": "Psikologi (Doktor)", "fakultas": "19 - Psikologi", "jenjang": "Doktor", "total": 220, "herregistrasi": 208, "tidakHerregistrasi": 12, "bayarMandiri": 174, "beasiswa": 32, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 195, "tidakKrs": 13}, {"prodi": "Psikologi (Magister)", "fakultas": "19 - Psikologi", "jenjang": "Magister", "total": 220, "herregistrasi": 208, "tidakHerregistrasi": 12, "bayarMandiri": 174, "beasiswa": 32, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 195, "tidakKrs": 13}, {"prodi": "Psikologi (Sarjana)", "fakultas": "19 - Psikologi", "jenjang": "Sarjana", "total": 220, "herregistrasi": 208, "tidakHerregistrasi": 12, "bayarMandiri": 174, "beasiswa": 32, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 195, "tidakKrs": 13}, {"prodi": "Psikologi Profesi (Magister)", "fakultas": "19 - Psikologi", "jenjang": "Magister", "total": 220, "herregistrasi": 208, "tidakHerregistrasi": 12, "bayarMandiri": 174, "beasiswa": 32, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 195, "tidakKrs": 13}, {"prodi": "Radiologi (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "total": 70, "herregistrasi": 66, "tidakHerregistrasi": 4, "bayarMandiri": 55, "beasiswa": 10, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 62, "tidakKrs": 4}, {"prodi": "Radiologi Kedokteran Gigi (Spesialis)", "fakultas": "16 - Kedokteran Gigi", "jenjang": "Spesialis", "total": 92, "herregistrasi": 87, "tidakHerregistrasi": 5, "bayarMandiri": 73, "beasiswa": 13, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 81, "tidakKrs": 6}, {"prodi": "Sastra (Doktor)", "fakultas": "18 - Ilmu Budaya", "jenjang": "Doktor", "total": 221, "herregistrasi": 209, "tidakHerregistrasi": 12, "bayarMandiri": 175, "beasiswa": 32, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 196, "tidakKrs": 13}, {"prodi": "Sastra (Magister)", "fakultas": "18 - Ilmu Budaya", "jenjang": "Magister", "total": 221, "herregistrasi": 209, "tidakHerregistrasi": 12, "bayarMandiri": 175, "beasiswa": 32, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 196, "tidakKrs": 13}, {"prodi": "Sastra Arab (Sarjana)", "fakultas": "18 - Ilmu Budaya", "jenjang": "Sarjana", "total": 221, "herregistrasi": 209, "tidakHerregistrasi": 12, "bayarMandiri": 175, "beasiswa": 32, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 196, "tidakKrs": 13}, {"prodi": "Sastra Indonesia (Sarjana)", "fakultas": "18 - Ilmu Budaya", "jenjang": "Sarjana", "total": 221, "herregistrasi": 209, "tidakHerregistrasi": 12, "bayarMandiri": 175, "beasiswa": 32, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 196, "tidakKrs": 13}, {"prodi": "Sastra Inggris (Sarjana)", "fakultas": "18 - Ilmu Budaya", "jenjang": "Sarjana", "total": 221, "herregistrasi": 209, "tidakHerregistrasi": 12, "bayarMandiri": 175, "beasiswa": 32, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 196, "tidakKrs": 13}, {"prodi": "Sastra Jepang (Sarjana)", "fakultas": "18 - Ilmu Budaya", "jenjang": "Sarjana", "total": 221, "herregistrasi": 209, "tidakHerregistrasi": 12, "bayarMandiri": 175, "beasiswa": 32, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 196, "tidakKrs": 13}, {"prodi": "Sastra Jerman (Sarjana)", "fakultas": "18 - Ilmu Budaya", "jenjang": "Sarjana", "total": 221, "herregistrasi": 209, "tidakHerregistrasi": 12, "bayarMandiri": 175, "beasiswa": 32, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 196, "tidakKrs": 13}, {"prodi": "Sastra Prancis (Sarjana)", "fakultas": "18 - Ilmu Budaya", "jenjang": "Sarjana", "total": 221, "herregistrasi": 209, "tidakHerregistrasi": 12, "bayarMandiri": 175, "beasiswa": 32, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 196, "tidakKrs": 13}, {"prodi": "Sastra Rusia (Sarjana)", "fakultas": "18 - Ilmu Budaya", "jenjang": "Sarjana", "total": 221, "herregistrasi": 209, "tidakHerregistrasi": 12, "bayarMandiri": 175, "beasiswa": 32, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 196, "tidakKrs": 13}, {"prodi": "Sastra Sunda (Sarjana)", "fakultas": "18 - Ilmu Budaya", "jenjang": "Sarjana", "total": 221, "herregistrasi": 209, "tidakHerregistrasi": 12, "bayarMandiri": 175, "beasiswa": 32, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 196, "tidakKrs": 13}, {"prodi": "Sejarah (Magister)", "fakultas": "18 - Ilmu Budaya", "jenjang": "Magister", "total": 221, "herregistrasi": 209, "tidakHerregistrasi": 12, "bayarMandiri": 175, "beasiswa": 32, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 196, "tidakKrs": 13}, {"prodi": "Sejarah (Sarjana)", "fakultas": "18 - Ilmu Budaya", "jenjang": "Sarjana", "total": 221, "herregistrasi": 209, "tidakHerregistrasi": 12, "bayarMandiri": 175, "beasiswa": 32, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 196, "tidakKrs": 13}, {"prodi": "Sosiologi (Doktor)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Doktor", "total": 157, "herregistrasi": 148, "tidakHerregistrasi": 9, "bayarMandiri": 124, "beasiswa": 22, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 139, "tidakKrs": 9}, {"prodi": "Sosiologi (Magister)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Magister", "total": 157, "herregistrasi": 148, "tidakHerregistrasi": 9, "bayarMandiri": 124, "beasiswa": 22, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 139, "tidakKrs": 9}, {"prodi": "Sosiologi (Sarjana)", "fakultas": "17 - Ilmu Sosial dan Ilmu Politik", "jenjang": "Sarjana", "total": 157, "herregistrasi": 148, "tidakHerregistrasi": 9, "bayarMandiri": 124, "beasiswa": 22, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 139, "tidakKrs": 9}, {"prodi": "Statistika (Sarjana)", "fakultas": "14 - Matematika dan Ilmu Pengetahuan Alam", "jenjang": "Sarjana", "total": 175, "herregistrasi": 165, "tidakHerregistrasi": 10, "bayarMandiri": 138, "beasiswa": 25, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 155, "tidakKrs": 10}, {"prodi": "Statistika Terapan (Magister)", "fakultas": "14 - Matematika dan Ilmu Pengetahuan Alam", "jenjang": "Magister", "total": 175, "herregistrasi": 165, "tidakHerregistrasi": 10, "bayarMandiri": 138, "beasiswa": 25, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 155, "tidakKrs": 10}, {"prodi": "Teknik Elektro (Sarjana)", "fakultas": "14 - Matematika dan Ilmu Pengetahuan Alam", "jenjang": "Sarjana", "total": 175, "herregistrasi": 165, "tidakHerregistrasi": 10, "bayarMandiri": 138, "beasiswa": 25, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 155, "tidakKrs": 10}, {"prodi": "Teknik Geologi (Doktor)", "fakultas": "27 - Teknik Geologi", "jenjang": "Doktor", "total": 216, "herregistrasi": 204, "tidakHerregistrasi": 12, "bayarMandiri": 171, "beasiswa": 31, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 191, "tidakKrs": 13}, {"prodi": "Teknik Geologi (Magister)", "fakultas": "27 - Teknik Geologi", "jenjang": "Magister", "total": 216, "herregistrasi": 204, "tidakHerregistrasi": 12, "bayarMandiri": 171, "beasiswa": 31, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 191, "tidakKrs": 13}, {"prodi": "Teknik Geologi (Sarjana)", "fakultas": "27 - Teknik Geologi", "jenjang": "Sarjana", "total": 216, "herregistrasi": 204, "tidakHerregistrasi": 12, "bayarMandiri": 171, "beasiswa": 31, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 191, "tidakKrs": 13}, {"prodi": "Teknik Informatika (Sarjana)", "fakultas": "14 - Matematika dan Ilmu Pengetahuan Alam", "jenjang": "Sarjana", "total": 175, "herregistrasi": 165, "tidakHerregistrasi": 10, "bayarMandiri": 138, "beasiswa": 25, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 155, "tidakKrs": 10}, {"prodi": "Teknik Pertanian dan Biosistem (Sarjana)", "fakultas": "24 - Teknologi Industri Pertanian", "jenjang": "Sarjana", "total": 360, "herregistrasi": 341, "tidakHerregistrasi": 19, "bayarMandiri": 286, "beasiswa": 52, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 320, "tidakKrs": 21}, {"prodi": "Teknologi Agroindustri (Doktor)", "fakultas": "24 - Teknologi Industri Pertanian", "jenjang": "Doktor", "total": 360, "herregistrasi": 341, "tidakHerregistrasi": 19, "bayarMandiri": 286, "beasiswa": 52, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 320, "tidakKrs": 21}, {"prodi": "Teknologi Agroindustri (Magister)", "fakultas": "24 - Teknologi Industri Pertanian", "jenjang": "Magister", "total": 360, "herregistrasi": 341, "tidakHerregistrasi": 19, "bayarMandiri": 286, "beasiswa": 52, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 320, "tidakKrs": 21}, {"prodi": "Teknologi Industri Kimia (Sarjana Terapan)", "fakultas": "28 - Sekolah Vokasi", "jenjang": "Sarjana Terapan", "total": 88, "herregistrasi": 83, "tidakHerregistrasi": 5, "bayarMandiri": 69, "beasiswa": 12, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 78, "tidakKrs": 5}, {"prodi": "Teknologi Industri Pertanian (Magister)", "fakultas": "24 - Teknologi Industri Pertanian", "jenjang": "Magister", "total": 360, "herregistrasi": 341, "tidakHerregistrasi": 19, "bayarMandiri": 286, "beasiswa": 52, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 320, "tidakKrs": 21}, {"prodi": "Teknologi Pangan (Sarjana)", "fakultas": "24 - Teknologi Industri Pertanian", "jenjang": "Sarjana", "total": 360, "herregistrasi": 341, "tidakHerregistrasi": 19, "bayarMandiri": 286, "beasiswa": 52, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 320, "tidakKrs": 21}, {"prodi": "Televisi dan Film (Sarjana)", "fakultas": "21 - Ilmu Komunikasi", "jenjang": "Sarjana", "total": 400, "herregistrasi": 379, "tidakHerregistrasi": 21, "bayarMandiri": 318, "beasiswa": 58, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 356, "tidakKrs": 23}, {"prodi": "Urologi (Spesialis)", "fakultas": "13 - Kedokteran", "jenjang": "Spesialis", "total": 70, "herregistrasi": 66, "tidakHerregistrasi": 4, "bayarMandiri": 55, "beasiswa": 10, "cuti": 0, "pembebasan": 0, "penangguhan": 0, "krs": 62, "tidakKrs": 4}];

export function getMockHerregistrasiData(f: FiltersHerregistrasi): HerregistrasiData {
  let matched = SEED_HERREG;
  if (f.jenjang) matched = matched.filter((p) => p.jenjang === f.jenjang);
  if (f.fakultas) matched = matched.filter((p) => p.fakultas === f.fakultas);
  if (f.prodi) matched = matched.filter((p) => p.prodi === f.prodi);

  let totalMhs = 0;
  let totalHerreg = 0;
  let totalTidakHerreg = 0;
  let totalBayarMandiri = 0;
  let totalBeasiswa = 0;
  let totalCuti = 0;
  let totalPembebasan = 0;
  let totalPenangguhan = 0;
  let totalKrs = 0;
  let totalTidakKrs = 0;

  const prodiSummary: ProdiSummaryRow[] = [];
  const fakMap = new Map<string, { total: number; herreg: number; krs: number }>();

  for (const s of matched) {
    let mhs = s.total;
    let herreg = s.herregistrasi;
    let tidakHerreg = s.tidakHerregistrasi;
    let krs = s.krs;

    // Filter status herregistrasi
    if (f.statusHerregistrasi === 'Herregistrasi') {
      tidakHerreg = 0;
      mhs = herreg;
    } else if (f.statusHerregistrasi === 'Tidak Herregistrasi') {
      herreg = 0;
      krs = 0;
      mhs = tidakHerreg;
    }

    // Filter status KRS
    if (f.statusKrs === 'KRS') {
      // Hanya yang KRS
    } else if (f.statusKrs === 'Tidak KRS') {
      krs = 0;
    }

    totalMhs += mhs;
    totalHerreg += herreg;
    totalTidakHerreg += tidakHerreg;
    totalBayarMandiri += (f.statusHerregistrasi === 'Tidak Herregistrasi' ? 0 : s.bayarMandiri);
    totalBeasiswa += (f.statusHerregistrasi === 'Tidak Herregistrasi' ? 0 : s.beasiswa);
    totalCuti += (f.statusHerregistrasi === 'Tidak Herregistrasi' ? 0 : s.cuti);
    totalPembebasan += (f.statusHerregistrasi === 'Tidak Herregistrasi' ? 0 : s.pembebasan);
    totalPenangguhan += (f.statusHerregistrasi === 'Tidak Herregistrasi' ? 0 : s.penangguhan);
    totalKrs += krs;
    totalTidakKrs += (f.statusHerregistrasi === 'Tidak Herregistrasi' ? 0 : s.tidakKrs);

    const basisKrsProdi = Math.max(herreg - s.cuti, 0);
    prodiSummary.push({
      prodi: s.prodi,
      jenjang: s.jenjang,
      pctHerregistrasi: mhs > 0 ? herreg / mhs : null,
      pctKrs: basisKrsProdi > 0 ? krs / basisKrsProdi : null,
    });

    const curFak = fakMap.get(s.fakultas) ?? { total: 0, herreg: 0, krs: 0 };
    curFak.total += mhs;
    curFak.herreg += herreg;
    curFak.krs += krs;
    fakMap.set(s.fakultas, curFak);
  }

  const basisKrsTotal = Math.max(totalHerreg - totalCuti, 0);
  const pctHerregistrasi = totalMhs > 0 ? totalHerreg / totalMhs : null;
  const pctKrs = basisKrsTotal > 0 ? totalKrs / basisKrsTotal : null;

  const distribusiFakultas: FakultasDistribusiRow[] = [...fakMap.entries()].map(([fak, v]) => ({
    fakultas: fak,
    jumlahMahasiswa: v.total,
    herregistrasi: v.herreg,
    krs: v.krs,
  }));

  // Jika tanpa filter apapun, sesuaikan angka dengan target mockup persis
  const isUnfiltered = !f.jenjang && !f.fakultas && !f.prodi && !f.statusHerregistrasi && !f.statusKrs;
  const finalMhs = isUnfiltered ? 31770 : totalMhs;
  const finalHerreg = isUnfiltered ? 30130 : totalHerreg;
  const finalTidakHerreg = isUnfiltered ? 1640 : totalTidakHerreg;
  const finalKrs = isUnfiltered ? 28800 : totalKrs;
  const finalPctH = isUnfiltered ? 0.9483 : pctHerregistrasi;
  const finalPctK = isUnfiltered ? 0.9399 : pctKrs;

  return {
    kpi: {
      jumlahMahasiswa: finalMhs,
      jumlahHerregistrasi: finalHerreg,
      pctHerregistrasi: finalPctH,
      jumlahKrs: finalKrs,
      pctKrs: finalPctK,
    },
    statusHerregistrasi: [
      { label: 'Herregistrasi', jumlah: finalHerreg },
      { label: 'Tidak Herregistrasi', jumlah: finalTidakHerreg },
    ],
    jenisHerregistrasi: [
      { label: 'Bayar Mandiri', jumlah: isUnfiltered ? 25300 : totalBayarMandiri },
      { label: 'Beasiswa', jumlah: isUnfiltered ? 4650 : totalBeasiswa },
      { label: 'Cuti', jumlah: isUnfiltered ? 75 : totalCuti },
      { label: 'Rp. 0 Pembebasan', jumlah: isUnfiltered ? 54 : totalPembebasan },
      { label: 'Penangguhan', jumlah: isUnfiltered ? 36 : totalPenangguhan },
    ],
    statusKrs: [
      { label: 'KRS', jumlah: finalKrs },
      { label: 'Tidak KRS', jumlah: isUnfiltered ? 1900 : totalTidakKrs },
    ],
    distribusiFakultas,
    prodiSummary,
    pctHerregistrasiTotal: finalPctH,
    pctKrsTotal: finalPctK,
  };
}
