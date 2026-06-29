class Mobil {
  constructor(merk, warna) {
    this.merk = merk;
    this.warna = warna;
  }

  klakson() {
    return `${this.merk} berbunyi: Beep!`;
  }
}

const mobilSaya = new Mobil("Toyota", "Merah");
console.log(mobilSaya.klakson()); // Output: Toyota berbunyi: Beep!

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Mobil };
}