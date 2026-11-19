// Memastikan semua donut/KPI Nilai saling konsisten di berbagai kombinasi filter.
// Menguji data mock (tanpa database): total donut harus sama dengan KPI.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import ts from "typescript";

const src = readFileSync(new URL("../lib/dashboard/mock-nilai.ts", import.meta.url), "utf8");
const out = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } });
const dir = mkdtempSync(join(tmpdir(), "nilai-"));
writeFileSync(join(dir, "mock-nilai.mjs"), out.outputText);
const { getMockNilaiData } = await import(join(dir, "mock-nilai.mjs"));

const base = { jenjang: "", fakultas: "", prodi: "", kategoriNilai: "", jenisNilai: "" };
const sum = (rows, key) => rows.reduce((a, r) => a + r[key], 0);

const cases = [
  {},
  { jenjang: "Magister" },
  { jenjang: "Sarjana", fakultas: "14 - Matematika dan Ilmu Pengetahuan Alam" },
  { fakultas: "18 - Ilmu Budaya" },
  { kategoriNilai: "Perbaikan" },
  { jenisNilai: "A" },
  { jenisNilai: "Null" },
  { jenjang: "Sarjana", kategoriNilai: "Reguler", jenisNilai: "B" },
];

for (const c of cases) {
  test(`donut = KPI untuk filter ${JSON.stringify(c)}`, () => {
    const d = getMockNilaiData({ ...base, ...c });
    const k = d.kpi;
    assert.equal(k.jumlahLengkap + k.jumlahTidakLengkap + k.jumlahNull, k.totalTransaksi);
    assert.equal(sum(d.jenisNilai, "jumlah"), k.totalTransaksi, "Jenis Nilai");
    assert.equal(sum(d.kategoriNilai, "jumlah"), k.totalTransaksi, "Kategori Nilai");
    assert.equal(sum(d.sebaranFakultas, "lengkap"), k.jumlahLengkap);
    assert.equal(sum(d.prodiSummary, "jumlahNull"), k.jumlahNull);
    if (!c.jenisNilai) {
      const nullRow = d.jenisNilai.find((r) => r.jenis === "Null");
      assert.equal(nullRow?.jumlah ?? 0, k.jumlahNull, "Null jenis = KPI");
    }
  });
}

test("filter fakultas mengubah angka", () => {
  const all = getMockNilaiData(base).kpi.totalTransaksi;
  const fak = getMockNilaiData({ ...base, fakultas: "18 - Ilmu Budaya" }).kpi.totalTransaksi;
  assert.ok(fak > 0 && fak < all);
});
