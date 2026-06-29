const { Kendaraan, Mobil } = require('../Pertemuan_17/class_inheritance');

describe('Kendaraan and Mobil inheritance (Pertemuan_17/class_inheritance.js)', () => {
  describe('Kendaraan base class', () => {
    test('constructor sets nama property', () => {
      const k = new Kendaraan('Motor');
      expect(k.nama).toBe('Motor');
    });

    test('bergerak logs correct message', () => {
      const k = new Kendaraan('Motor');
      const spy = jest.spyOn(console, 'log').mockImplementation();
      k.bergerak();
      expect(spy).toHaveBeenCalledWith('Motor sedang bergerak.');
      spy.mockRestore();
    });
  });

  describe('Mobil extends Kendaraan', () => {
    test('Mobil is an instance of Kendaraan', () => {
      const car = new Mobil('Avanza', 'MPV');
      expect(car).toBeInstanceOf(Kendaraan);
      expect(car).toBeInstanceOf(Mobil);
    });

    test('constructor sets both nama and tipe', () => {
      const car = new Mobil('Avanza', 'MPV');
      expect(car.nama).toBe('Avanza');
      expect(car.tipe).toBe('MPV');
    });

    test('inherits bergerak from Kendaraan', () => {
      const car = new Mobil('Avanza', 'MPV');
      const spy = jest.spyOn(console, 'log').mockImplementation();
      car.bergerak();
      expect(spy).toHaveBeenCalledWith('Avanza sedang bergerak.');
      spy.mockRestore();
    });

    test('different instances have independent properties', () => {
      const sedan = new Mobil('Camry', 'Sedan');
      const suv = new Mobil('Fortuner', 'SUV');
      expect(sedan.nama).toBe('Camry');
      expect(sedan.tipe).toBe('Sedan');
      expect(suv.nama).toBe('Fortuner');
      expect(suv.tipe).toBe('SUV');
    });
  });
});
