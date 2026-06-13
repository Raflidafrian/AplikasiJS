class Kendaraan {
  constructor(nama) {
    this.nama = nama;
  }
  bergerak() {
    console.log(`${this.nama} sedang bergerak.`);
  }
}

// Mobil mewarisi Kendaraan
class Mobil extends Kendaraan {
  constructor(nama, tipe) {
    super(nama); // Memanggil constructor parent
    this.tipe = tipe;
  }
}

const myCar = new Mobil("Avanza", "MPV");
myCar.bergerak(); // Output: Avanza sedang bergerak.