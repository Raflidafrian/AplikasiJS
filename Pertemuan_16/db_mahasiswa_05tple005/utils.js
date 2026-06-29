function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function buildEndpoint(tipe) {
  return (tipe === 'mahasiswa') ? 'api.php?action=list' : `api.php?action=list_${tipe}`;
}

function buildSaveUrl(jenis) {
  return (jenis === 'mahasiswa') ? 'api.php?action=save' : `api.php?action=save_${jenis}`;
}

function buildTableRowHtml(item, tipe, index) {
  let html = `<tr><td>${index + 1}</td>`;

  if (tipe === 'mahasiswa') {
    html += `<td>${item.nim}</td><td>${item.nama}</td><td>${item.jurusan}</td><td>${item.email}</td>`;
  } else if (tipe === 'dosen') {
    html += `<td>${item.nama}</td><td>${item.alamat}</td>`;
  } else if (tipe === 'matkul') {
    html += `<td>${item.matkul}</td><td>${item.sks}</td>`;
  } else if (tipe === 'jadwal') {
    html += `<td>${item.nama_dosen}</td><td>${item.matkul} (${item.sks} SKS)</td><td>${item.waktu}</td><td>${item.ruang}</td>`;
  }

  html += `<td class="text-center">
      <button class="btn btn-action-edit btn-sm me-1" onclick="siapkanEdit('${tipe}', ${item.id})">Edit</button>
      <button class="btn btn-action-delete btn-sm" onclick="hapusData('${tipe}', ${item.id})">Hapus</button>
  </td></tr>`;

  return html;
}

function buildEmptyRowHtml() {
  return `<tr><td colspan="6" class="text-center text-muted p-3">Belum ada data.</td></tr>`;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { capitalize, buildEndpoint, buildSaveUrl, buildTableRowHtml, buildEmptyRowHtml };
}
