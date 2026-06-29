const { appendValue, clearDisplay, deleteLast, calculateResult } = require('../Pertemuan_14/kalkulator');

describe('Kalkulator functions (Pertemuan_14)', () => {
  describe('appendValue', () => {
    test('appends digit to empty display', () => {
      expect(appendValue('', '5')).toBe('5');
    });

    test('appends digit to existing display', () => {
      expect(appendValue('12', '3')).toBe('123');
    });

    test('appends operator', () => {
      expect(appendValue('12', '+')).toBe('12+');
    });

    test('appends decimal point', () => {
      expect(appendValue('12', '.')).toBe('12.');
    });
  });

  describe('clearDisplay', () => {
    test('returns empty string', () => {
      expect(clearDisplay()).toBe('');
    });
  });

  describe('deleteLast', () => {
    test('removes last character', () => {
      expect(deleteLast('123')).toBe('12');
    });

    test('returns empty when single character', () => {
      expect(deleteLast('5')).toBe('');
    });

    test('handles empty string', () => {
      expect(deleteLast('')).toBe('');
    });

    test('removes operator', () => {
      expect(deleteLast('12+')).toBe('12');
    });
  });

  describe('calculateResult', () => {
    test('evaluates simple addition', () => {
      expect(calculateResult('2+3')).toBe('5');
    });

    test('evaluates subtraction', () => {
      expect(calculateResult('10-4')).toBe('6');
    });

    test('evaluates multiplication', () => {
      expect(calculateResult('3*4')).toBe('12');
    });

    test('evaluates division', () => {
      expect(calculateResult('10/2')).toBe('5');
    });

    test('evaluates complex expression', () => {
      expect(calculateResult('2+3*4')).toBe('14');
    });

    test('evaluates decimal numbers', () => {
      expect(calculateResult('1.5+2.5')).toBe('4');
    });

    test('returns empty string for empty input', () => {
      expect(calculateResult('')).toBe('');
    });

    test('returns Error for invalid expression', () => {
      expect(calculateResult('2++3')).toBe('Error');
    });
  });
});
