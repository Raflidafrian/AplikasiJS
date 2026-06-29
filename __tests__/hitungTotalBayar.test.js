const { hitungTotalBayar } = require('../Pertemuan_14/hitungTotalBayar');

describe('hitungTotalBayar (Pertemuan_14)', () => {
  describe('discount logic (if-else)', () => {
    test('Platinum member with >= 500000 gets 20% discount', () => {
      const result = hitungTotalBayar(600000, 'Platinum', 'cash');
      expect(result.diskonDidapat).toBe('20%');
      expect(result.totalAkhir).toBe(480000);
    });

    test('Gold member gets 10% discount', () => {
      const result = hitungTotalBayar(350000, 'Gold', 'cash');
      expect(result.diskonDidapat).toBe('10%');
      expect(result.totalAkhir).toBe(315000);
    });

    test('Non-member with >= 300000 gets 10% discount (Gold condition fallthrough)', () => {
      const result = hitungTotalBayar(300000, 'Non-Member', 'cash');
      expect(result.diskonDidapat).toBe('10%');
      expect(result.totalAkhir).toBe(270000);
    });

    test('Silver member with >= 150000 gets 5% discount', () => {
      const result = hitungTotalBayar(200000, 'Silver', 'cash');
      expect(result.diskonDidapat).toBe('5%');
      expect(result.totalAkhir).toBe(190000);
    });

    test('Silver member below 150000 gets no discount', () => {
      const result = hitungTotalBayar(100000, 'Silver', 'cash');
      expect(result.diskonDidapat).toBe('0%');
      expect(result.totalAkhir).toBe(100000);
    });

    test('Non-member below 300000 gets no discount', () => {
      const result = hitungTotalBayar(100000, 'Non-Member', 'cash');
      expect(result.diskonDidapat).toBe('0%');
      expect(result.totalAkhir).toBe(100000);
    });

    test('Platinum member below 500000 falls to Gold condition due to OR', () => {
      const result = hitungTotalBayar(400000, 'Platinum', 'cash');
      expect(result.diskonDidapat).toBe('10%');
    });
  });

  describe('payment method logic (switch-case)', () => {
    test('e-wallet has no admin fee and cashback message', () => {
      const result = hitungTotalBayar(600000, 'Platinum', 'e-wallet');
      expect(result.biayaTambahan).toBe(0);
      expect(result.catatan).toBe('Mendapatkan cashback 2% berupa poin!');
      expect(result.totalAkhir).toBe(480000);
    });

    test('credit_card has 5000 admin fee', () => {
      const result = hitungTotalBayar(350000, 'Gold', 'credit_card');
      expect(result.biayaTambahan).toBe(5000);
      expect(result.catatan).toBe('Dikenakan biaya penanganan CC.');
      expect(result.totalAkhir).toBe(320000);
    });

    test('transfer_bank has 1000 admin fee', () => {
      const result = hitungTotalBayar(200000, 'Silver', 'transfer_bank');
      expect(result.biayaTambahan).toBe(1000);
      expect(result.catatan).toBe('Gunakan kode unik saat transfer.');
      expect(result.totalAkhir).toBe(191000);
    });

    test('unknown payment method uses default (no admin fee)', () => {
      const result = hitungTotalBayar(100000, 'Non-Member', 'cash');
      expect(result.biayaTambahan).toBe(0);
      expect(result.catatan).toBe('Metode pembayaran reguler.');
    });

    test('payment method is case-insensitive', () => {
      const result = hitungTotalBayar(600000, 'Platinum', 'E-Wallet');
      expect(result.biayaTambahan).toBe(0);
      expect(result.catatan).toBe('Mendapatkan cashback 2% berupa poin!');
    });
  });

  describe('return structure', () => {
    test('returns object with all expected keys', () => {
      const result = hitungTotalBayar(100000, 'Non-Member', 'cash');
      expect(result).toHaveProperty('diskonDidapat');
      expect(result).toHaveProperty('biayaTambahan');
      expect(result).toHaveProperty('catatan');
      expect(result).toHaveProperty('totalAkhir');
    });
  });
});
