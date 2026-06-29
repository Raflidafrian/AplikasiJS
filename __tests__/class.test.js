const { Mobil } = require('../Pertemuan_17/class');

describe('Mobil class (Pertemuan_17/class.js)', () => {
  test('constructor sets merk and warna properties', () => {
    const mobil = new Mobil('Toyota', 'Merah');
    expect(mobil.merk).toBe('Toyota');
    expect(mobil.warna).toBe('Merah');
  });

  test('klakson returns correct formatted string', () => {
    const mobil = new Mobil('Toyota', 'Merah');
    expect(mobil.klakson()).toBe('Toyota berbunyi: Beep!');
  });

  test('klakson works with different merk values', () => {
    const honda = new Mobil('Honda', 'Hitam');
    expect(honda.klakson()).toBe('Honda berbunyi: Beep!');

    const bmw = new Mobil('BMW', 'Putih');
    expect(bmw.klakson()).toBe('BMW berbunyi: Beep!');
  });

  test('constructor handles empty strings', () => {
    const mobil = new Mobil('', '');
    expect(mobil.merk).toBe('');
    expect(mobil.warna).toBe('');
    expect(mobil.klakson()).toBe(' berbunyi: Beep!');
  });

  test('multiple instances are independent', () => {
    const m1 = new Mobil('Toyota', 'Merah');
    const m2 = new Mobil('Honda', 'Biru');
    expect(m1.merk).not.toBe(m2.merk);
    expect(m1.warna).not.toBe(m2.warna);
  });
});
