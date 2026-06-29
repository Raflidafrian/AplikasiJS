const dataTransaksi = [
  { id: 1, item: "Laptop", harga: 8000000, kategori: "Elektronik" },
  { id: 2, item: "Kemeja", harga: 250000, kategori: "Pakaian" },
  { id: 3, item: "Mouse", harga: 300000, kategori: "Elektronik" }
];

function cetakGarisPembatas() {
  console.log("========================================");
}

function saringTransaksi(kategoriTarget, hargaMaksimal) {
  let hasilSaring = [];

  for (let i = 0; i < dataTransaksi.length; i++) {
    let produk = dataTransaksi[i];

    if (produk.kategori === kategoriTarget && produk.harga <= hargaMaksimal) {
      hasilSaring.push(produk);
    }
  }

  return hasilSaring;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { dataTransaksi, cetakGarisPembatas, saringTransaksi };
}
