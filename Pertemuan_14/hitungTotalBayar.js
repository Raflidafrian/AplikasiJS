function hitungTotalBayar(totalBelanja, statusMember, metodePembayaran) {
  let diskon = 0;

  if (statusMember === "Platinum" && totalBelanja >= 500000) {
    diskon = 0.20;
  } else if (statusMember === "Gold" || totalBelanja >= 300000) {
    diskon = 0.10;
  } else if (statusMember === "Silver" && totalBelanja >= 150000) {
    diskon = 0.05;
  } else {
    diskon = 0;
  }

  let totalSetelahDiskon = totalBelanja - (totalBelanja * diskon);

  let biayaAdmin = 0;
  let pesanInfo = "";

  switch (metodePembayaran.toLowerCase()) {
    case "e-wallet":
      biayaAdmin = 0;
      pesanInfo = "Mendapatkan cashback 2% berupa poin!";
      break;
    case "credit_card":
      biayaAdmin = 5000;
      pesanInfo = "Dikenakan biaya penanganan CC.";
      break;
    case "transfer_bank":
      biayaAdmin = 1000;
      pesanInfo = "Gunakan kode unik saat transfer.";
      break;
    default:
      biayaAdmin = 0;
      pesanInfo = "Metode pembayaran reguler.";
  }

  let totalAkhir = totalSetelahDiskon + biayaAdmin;

  return {
    diskonDidapat: (diskon * 100) + "%",
    biayaTambahan: biayaAdmin,
    catatan: pesanInfo,
    totalAkhir: totalAkhir
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { hitungTotalBayar };
}
