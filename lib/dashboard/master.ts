// Aturan master: jalur masuk yang sah untuk tiap jenjang.
// Dipakai bersama oleh opsi dropdown, query SQL, dan data mock supaya tidak ada
// kombinasi tidak valid (mis. SNBP untuk Magister) yang ikut terhitung.
export const JALUR_BY_JENJANG: Record<string, string[]> = {
  Sarjana: ["Mandiri", "SNBP", "SNBT"],
  "Sarjana Terapan": ["Mandiri", "SNBP", "SNBT"],
  Magister: ["Berbasis Project", "Double Degree", "RPL", "Reguler"],
  Doktor: ["Berbasis Project", "Reguler"],
  Spesialis: ["Berbasis Project", "Reguler"],
  Subspesialis: ["Berbasis Project", "Reguler"],
  Profesi: ["Berbasis Project", "Internal", "Reguler"],
};

export const isJalurValid = (jenjang: string, jalur: string): boolean =>
  JALUR_BY_JENJANG[jenjang]?.includes(jalur) ?? false;

// Potongan SQL `(VALUES (...), (...))` untuk pasangan (jenjang, jalur) yang sah.
export const VALID_PAIRS_SQL = `(VALUES ${Object.entries(JALUR_BY_JENJANG)
  .flatMap(([j, list]) => list.map((m) => `('${j}','${m}')`))
  .join(", ")})`;
