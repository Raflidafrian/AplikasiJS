const {
  sapa,
  tambah,
  cekKelulusan,
  konversiNilai,
  konversiNilaiSwitch,
  terjemahkanWarna
} = require('../Pertemuan_13/fungsiDasar');

describe('fungsiDasar (Pertemuan_13)', () => {
  describe('sapa', () => {
    test('greets with name', () => {
      expect(sapa('Budi')).toBe('halloBudi');
    });

    test('handles empty name', () => {
      expect(sapa('')).toBe('hallo');
    });
  });

  describe('tambah', () => {
    test('adds two positive numbers', () => {
      expect(tambah(5, 3)).toBe(8);
    });

    test('adds negative numbers', () => {
      expect(tambah(-2, -3)).toBe(-5);
    });

    test('adds zero', () => {
      expect(tambah(5, 0)).toBe(5);
    });

    test('adds decimal numbers', () => {
      expect(tambah(1.5, 2.5)).toBe(4);
    });
  });

  describe('cekKelulusan', () => {
    test('returns LULUS for nilai >= 75', () => {
      expect(cekKelulusan(80)).toBe('LULUS');
    });

    test('returns LULUS for exactly 75', () => {
      expect(cekKelulusan(75)).toBe('LULUS');
    });

    test('returns TIDAK LULUS for below 75', () => {
      expect(cekKelulusan(60)).toBe('TIDAK LULUS');
    });

    test('returns LULUS for 100', () => {
      expect(cekKelulusan(100)).toBe('LULUS');
    });

    test('returns TIDAK LULUS for 0', () => {
      expect(cekKelulusan(0)).toBe('TIDAK LULUS');
    });
  });

  describe('konversiNilai (if-else grading)', () => {
    test('returns A for >= 90', () => {
      expect(konversiNilai(95)).toBe('A, sangat memuaskan');
      expect(konversiNilai(90)).toBe('A, sangat memuaskan');
    });

    test('returns B for >= 75', () => {
      expect(konversiNilai(85)).toBe('B, memuaskan');
      expect(konversiNilai(75)).toBe('B, memuaskan');
    });

    test('returns C for >= 70', () => {
      expect(konversiNilai(74)).toBe('C, tidak memuaskan');
      expect(konversiNilai(70)).toBe('C, tidak memuaskan');
    });

    test('returns D for >= 60', () => {
      expect(konversiNilai(65)).toBe('D');
      expect(konversiNilai(60)).toBe('D');
    });

    test('returns E for below 60', () => {
      expect(konversiNilai(50)).toBe('E');
      expect(konversiNilai(0)).toBe('E');
    });
  });

  describe('konversiNilaiSwitch (switch-case grading)', () => {
    test('returns A for >= 90', () => {
      expect(konversiNilaiSwitch(95)).toBe('A');
    });

    test('returns B for >= 80', () => {
      expect(konversiNilaiSwitch(85)).toBe('B');
    });

    test('returns C for >= 70', () => {
      expect(konversiNilaiSwitch(75)).toBe('C');
    });

    test('returns D for >= 60', () => {
      expect(konversiNilaiSwitch(65)).toBe('D');
    });

    test('returns E for below 60', () => {
      expect(konversiNilaiSwitch(50)).toBe('E');
    });
  });

  describe('terjemahkanWarna', () => {
    test('translates merah', () => {
      expect(terjemahkanWarna('merah')).toBe('Warna Merah');
    });

    test('translates biru', () => {
      expect(terjemahkanWarna('biru')).toBe('Warna Biru');
    });

    test('translates hijau', () => {
      expect(terjemahkanWarna('hijau')).toBe('Warna Hijau');
    });

    test('returns invalid for unknown color', () => {
      expect(terjemahkanWarna('kuning')).toBe('Warna Tidak Valid');
    });
  });
});
