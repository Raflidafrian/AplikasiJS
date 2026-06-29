const { dataTransaksi, cetakGarisPembatas, saringTransaksi } = require('../Pertemuan_14/saringTransaksi');

describe('saringTransaksi (Pertemuan_14)', () => {
  describe('dataTransaksi global data', () => {
    test('contains 3 items', () => {
      expect(dataTransaksi).toHaveLength(3);
    });

    test('each item has id, item, harga, kategori', () => {
      dataTransaksi.forEach((d) => {
        expect(d).toHaveProperty('id');
        expect(d).toHaveProperty('item');
        expect(d).toHaveProperty('harga');
        expect(d).toHaveProperty('kategori');
      });
    });
  });

  describe('cetakGarisPembatas', () => {
    test('logs a separator line', () => {
      const spy = jest.spyOn(console, 'log').mockImplementation();
      cetakGarisPembatas();
      expect(spy).toHaveBeenCalledWith('========================================');
      spy.mockRestore();
    });
  });

  describe('saringTransaksi filtering', () => {
    test('filters Elektronik with harga <= 500000 returns only Mouse', () => {
      const result = saringTransaksi('Elektronik', 500000);
      expect(result).toHaveLength(1);
      expect(result[0].item).toBe('Mouse');
    });

    test('filters Elektronik with high max returns Laptop and Mouse', () => {
      const result = saringTransaksi('Elektronik', 10000000);
      expect(result).toHaveLength(2);
      expect(result.map(r => r.item)).toEqual(['Laptop', 'Mouse']);
    });

    test('filters Pakaian returns Kemeja', () => {
      const result = saringTransaksi('Pakaian', 500000);
      expect(result).toHaveLength(1);
      expect(result[0].item).toBe('Kemeja');
    });

    test('filters non-existent category returns empty array', () => {
      const result = saringTransaksi('Makanan', 1000000);
      expect(result).toHaveLength(0);
    });

    test('filters with very low max price returns empty', () => {
      const result = saringTransaksi('Elektronik', 100);
      expect(result).toHaveLength(0);
    });

    test('exact price boundary is included', () => {
      const result = saringTransaksi('Elektronik', 300000);
      expect(result).toHaveLength(1);
      expect(result[0].item).toBe('Mouse');
    });

    test('price just below boundary excludes item', () => {
      const result = saringTransaksi('Elektronik', 299999);
      expect(result).toHaveLength(0);
    });
  });
});
