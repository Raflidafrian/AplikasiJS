const {
  capitalize,
  buildEndpoint,
  buildSaveUrl,
  buildTableRowHtml,
  buildEmptyRowHtml
} = require('../Pertemuan_16/db_mahasiswa_05tple005/utils');

describe('Utils (Pertemuan_16)', () => {
  describe('capitalize', () => {
    test('capitalizes first letter', () => {
      expect(capitalize('mahasiswa')).toBe('Mahasiswa');
    });

    test('handles already capitalized string', () => {
      expect(capitalize('Mahasiswa')).toBe('Mahasiswa');
    });

    test('handles single character', () => {
      expect(capitalize('a')).toBe('A');
    });

    test('handles dosen', () => {
      expect(capitalize('dosen')).toBe('Dosen');
    });

    test('handles matkul', () => {
      expect(capitalize('matkul')).toBe('Matkul');
    });
  });

  describe('buildEndpoint', () => {
    test('returns list endpoint for mahasiswa', () => {
      expect(buildEndpoint('mahasiswa')).toBe('api.php?action=list');
    });

    test('returns list_dosen endpoint for dosen', () => {
      expect(buildEndpoint('dosen')).toBe('api.php?action=list_dosen');
    });

    test('returns list_matkul endpoint for matkul', () => {
      expect(buildEndpoint('matkul')).toBe('api.php?action=list_matkul');
    });

    test('returns list_jadwal endpoint for jadwal', () => {
      expect(buildEndpoint('jadwal')).toBe('api.php?action=list_jadwal');
    });
  });

  describe('buildSaveUrl', () => {
    test('returns save endpoint for mahasiswa', () => {
      expect(buildSaveUrl('mahasiswa')).toBe('api.php?action=save');
    });

    test('returns save_dosen endpoint for dosen', () => {
      expect(buildSaveUrl('dosen')).toBe('api.php?action=save_dosen');
    });

    test('returns save_matkul endpoint for matkul', () => {
      expect(buildSaveUrl('matkul')).toBe('api.php?action=save_matkul');
    });
  });

  describe('buildTableRowHtml', () => {
    test('builds mahasiswa row HTML', () => {
      const item = { id: 1, nim: '123', nama: 'Budi', jurusan: 'TI', email: 'budi@test.com' };
      const html = buildTableRowHtml(item, 'mahasiswa', 0);
      expect(html).toContain('<td>1</td>');
      expect(html).toContain('<td>123</td>');
      expect(html).toContain('<td>Budi</td>');
      expect(html).toContain('<td>TI</td>');
      expect(html).toContain('<td>budi@test.com</td>');
      expect(html).toContain("siapkanEdit('mahasiswa', 1)");
      expect(html).toContain("hapusData('mahasiswa', 1)");
    });

    test('builds dosen row HTML', () => {
      const item = { id: 2, nama: 'Dr. Andi', alamat: 'Jakarta' };
      const html = buildTableRowHtml(item, 'dosen', 0);
      expect(html).toContain('<td>Dr. Andi</td>');
      expect(html).toContain('<td>Jakarta</td>');
    });

    test('builds matkul row HTML', () => {
      const item = { id: 3, matkul: 'Algoritma', sks: 3 };
      const html = buildTableRowHtml(item, 'matkul', 0);
      expect(html).toContain('<td>Algoritma</td>');
      expect(html).toContain('<td>3</td>');
    });

    test('builds jadwal row HTML', () => {
      const item = { id: 4, nama_dosen: 'Dr. Andi', matkul: 'Algoritma', sks: 3, waktu: '08:00', ruang: 'A101' };
      const html = buildTableRowHtml(item, 'jadwal', 0);
      expect(html).toContain('<td>Dr. Andi</td>');
      expect(html).toContain('Algoritma (3 SKS)');
      expect(html).toContain('<td>08:00</td>');
      expect(html).toContain('<td>A101</td>');
    });

    test('index is 1-based in the row numbering', () => {
      const item = { id: 1, nim: '123', nama: 'A', jurusan: 'B', email: 'c@d.com' };
      const html = buildTableRowHtml(item, 'mahasiswa', 4);
      expect(html).toContain('<td>5</td>');
    });
  });

  describe('buildEmptyRowHtml', () => {
    test('returns an empty data row', () => {
      const html = buildEmptyRowHtml();
      expect(html).toContain('Belum ada data.');
      expect(html).toContain('colspan="6"');
    });
  });
});
