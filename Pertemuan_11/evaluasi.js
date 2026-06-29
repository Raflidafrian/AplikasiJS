function hitungNilaiAkhir(tugas, ujian) {
  if (isNaN(tugas) || isNaN(ujian)) {
    return null;
  }

  let nilaiAkhir = (tugas * 0.4) + (ujian * 0.6);

  let bonusAbsen = 3;
  nilaiAkhir += bonusAbsen;

  return nilaiAkhir;
}

function tentukanStatus(nilaiAkhir) {
  let kkm = 70;
  if (nilaiAkhir >= kkm) {
    return "LULUS";
  }
  return "REVISI";
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { hitungNilaiAkhir, tentukanStatus };
}
