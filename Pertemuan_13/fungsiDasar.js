function sapa(nama) {
  return "hallo" + nama;
}

function tambah(a, b) {
  return a + b;
}

function cekKelulusan(nilai) {
  if (nilai >= 75) {
    return "LULUS";
  }
  return "TIDAK LULUS";
}

function konversiNilai(nilai) {
  if (nilai >= 90) {
    return "A, sangat memuaskan";
  } else if (nilai >= 75) {
    return "B, memuaskan";
  } else if (nilai >= 70) {
    return "C, tidak memuaskan";
  } else if (nilai >= 60) {
    return "D";
  } else {
    return "E";
  }
}

function konversiNilaiSwitch(nilai) {
  switch (true) {
    case (nilai >= 90):
      return "A";
    case (nilai >= 80):
      return "B";
    case (nilai >= 70):
      return "C";
    case (nilai >= 60):
      return "D";
    default:
      return "E";
  }
}

function terjemahkanWarna(warna) {
  switch (warna) {
    case "merah":
      return "Warna Merah";
    case "biru":
      return "Warna Biru";
    case "hijau":
      return "Warna Hijau";
    default:
      return "Warna Tidak Valid";
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    sapa,
    tambah,
    cekKelulusan,
    konversiNilai,
    konversiNilaiSwitch,
    terjemahkanWarna
  };
}
