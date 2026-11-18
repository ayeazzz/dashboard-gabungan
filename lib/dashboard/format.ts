import type { Filters } from "./types";

// Warna seri diambil apa adanya dari mockup Figma.
export const SERIES = {
  s1: "#E3C744",
  s2: "#EFE08F",
  s3: "#EC8F63",
  s4: "#BFA73C",
};

// Palet donut dengan banyak kategori: kontras antar-segmen dijaga, kuning tema tetap di depan.
export const DONUT_COLORS = [
  "#E3C744", "#EC8F63", "#5B8DB8", "#8E6C8A", "#7BAE7F",
  "#9CA3AF", "#C0504D", "#4F5D75", "#D4A5A5", "#BFA73C",
];

// Merah "Ditolak" dari mockup — beda dari --color-accent-red (#b0061c).
export const DANGER = "#D64045";

const nf = new Intl.NumberFormat("id-ID");
const id = (digits: number) =>
  new Intl.NumberFormat("id-ID", { minimumFractionDigits: digits, maximumFractionDigits: digits });

export const int = (n: number) => nf.format(n);

// Rasio 0..1 → persen. Semua angka persen di data layer disimpan sebagai rasio.
export const pct = (n: number | null, digits = 1) => (n === null ? "-" : `${id(digits).format(n * 100)}%`);

export const dec = (n: number | null, digits = 2) => (n === null ? "-" : id(digits).format(n));

export const SEMUA = "Semua";

const one = (v: string | string[] | undefined) => (typeof v === "string" ? v : "");

export function parseFilters(sp: Record<string, string | string[] | undefined>): Filters {
  const tahun = Number(one(sp.tahun));
  return {
    jenjang: one(sp.jenjang),
    jalur: one(sp.jalur),
    fakultas: one(sp.fakultas),
    prodi: one(sp.prodi),
    tahun: Number.isInteger(tahun) && tahun > 0 ? tahun : null,
    mode: one(sp.mode) === "dedup" ? "dedup" : "apa-adanya",
  };
}

export function toQuery(f: Filters): string {
  const q = new URLSearchParams();
  if (f.jenjang) q.set("jenjang", f.jenjang);
  if (f.jalur) q.set("jalur", f.jalur);
  if (f.fakultas) q.set("fakultas", f.fakultas);
  if (f.prodi) q.set("prodi", f.prodi);
  if (f.tahun) q.set("tahun", String(f.tahun));
  const s = q.toString();
  return s ? `?${s}` : "";
}
