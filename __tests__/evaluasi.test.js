const { hitungNilaiAkhir, tentukanStatus } = require('../Pertemuan_11/evaluasi');

describe('Evaluasi Kelulusan (Pertemuan_11)', () => {
  describe('hitungNilaiAkhir', () => {
    test('calculates weighted average with bonus', () => {
      // (80 * 0.4) + (90 * 0.6) + 3 = 32 + 54 + 3 = 89
      expect(hitungNilaiAkhir(80, 90)).toBe(89);
    });

    test('returns null for NaN tugas', () => {
      expect(hitungNilaiAkhir(NaN, 90)).toBeNull();
    });

    test('returns null for NaN ujian', () => {
      expect(hitungNilaiAkhir(80, NaN)).toBeNull();
    });

    test('returns null when both are NaN', () => {
      expect(hitungNilaiAkhir(NaN, NaN)).toBeNull();
    });

    test('handles zero values', () => {
      // (0 * 0.4) + (0 * 0.6) + 3 = 3
      expect(hitungNilaiAkhir(0, 0)).toBe(3);
    });

    test('handles perfect scores', () => {
      // (100 * 0.4) + (100 * 0.6) + 3 = 40 + 60 + 3 = 103
      expect(hitungNilaiAkhir(100, 100)).toBe(103);
    });

    test('includes 3 point bonus absen', () => {
      // (50 * 0.4) + (50 * 0.6) + 3 = 20 + 30 + 3 = 53
      expect(hitungNilaiAkhir(50, 50)).toBe(53);
    });

    test('weights tugas at 40% and ujian at 60%', () => {
      // (100 * 0.4) + (0 * 0.6) + 3 = 40 + 0 + 3 = 43
      expect(hitungNilaiAkhir(100, 0)).toBe(43);
      // (0 * 0.4) + (100 * 0.6) + 3 = 0 + 60 + 3 = 63
      expect(hitungNilaiAkhir(0, 100)).toBe(63);
    });
  });

  describe('tentukanStatus', () => {
    test('returns LULUS for nilaiAkhir >= 70', () => {
      expect(tentukanStatus(70)).toBe('LULUS');
      expect(tentukanStatus(85)).toBe('LULUS');
      expect(tentukanStatus(100)).toBe('LULUS');
    });

    test('returns REVISI for nilaiAkhir < 70', () => {
      expect(tentukanStatus(69)).toBe('REVISI');
      expect(tentukanStatus(50)).toBe('REVISI');
      expect(tentukanStatus(0)).toBe('REVISI');
    });

    test('boundary: exactly 70 is LULUS', () => {
      expect(tentukanStatus(70)).toBe('LULUS');
    });

    test('boundary: 69.9 is REVISI', () => {
      expect(tentukanStatus(69.9)).toBe('REVISI');
    });
  });
});
