// 1. Load Data
function loadData(tipe = 'mahasiswa') {
    let tempatData = document.getElementById(`tempat-${tipe}`);
    if (!tempatData) return;

    let endpoint = (tipe === 'mahasiswa') ? 'api.php?action=list' : `api.php?action=list_${tipe}`;

    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            let html = '';
            if (data.length === 0) {
                html = `<tr><td colspan="6" class="text-center text-muted p-3">Belum ada data.</td></tr>`;
            } else {
                data.forEach((item, index) => {
                    html += `<tr><td>${index + 1}</td>`;
                    
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
                });
            }
            tempatData.innerHTML = html;
        });
}

// 2. Fungsi Hapus Data
function hapusData(table, id) {
    if (confirm('Yakin ingin menghapus data ini?')) {
        let formData = new FormData();
        formData.append('id', id);
        formData.append('table', table);

        fetch('api.php?action=delete', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success') {
                loadData(table);
            } else {
                alert('Gagal: ' + data.message);
            }
        });
    }
}

// 3. Fungsi Siapkan Edit (Dilengkapi untuk matkul & jadwal)
function siapkanEdit(table, id) {
    fetch(`api.php?action=get_single&id=${id}&table=${table}`)
        .then(res => res.json())
        .then(data => {
            let modal = new bootstrap.Modal(document.getElementById(`${table}Modal`));
            
            // Isi form (Sesuaikan ID input dengan yang ada di index.php)
            document.getElementById(`${table}_id`).value = data.id;

            if(table === 'mahasiswa') {
                document.getElementById('nim').value = data.nim;
                document.getElementById('nama').value = data.nama;
                document.getElementById('jurusan').value = data.jurusan;
                document.getElementById('email').value = data.email;
            } else if (table === 'dosen') {
                document.getElementById('nama_dosen').value = data.nama;
                document.getElementById('alamat_dosen').value = data.alamat;
            } else if (table === 'matkul') {
                document.getElementById('nama_matkul').value = data.matkul; // Sesuaikan ID input matkul Anda
                document.getElementById('sks').value = data.sks;
            } else if (table === 'jadwal') {
                // Pastikan dropdown terisi dulu sebelum memilih value
                muatOpsiDropdown().then(() => {
                    document.getElementById('id_dosen').value = data.id_dosen;
                    document.getElementById('id_matkul').value = data.id_matkul;
                    document.getElementById('waktu').value = data.waktu;
                    document.getElementById('ruang').value = data.ruang;
                });
            }
            
            modal.show();
        });
}

// 4. Fungsi Simpan (Create & Update)
function simpanData(event, jenis) {
    event.preventDefault();
    
    let actionUrl = '';
    let formId = '';
    
    if (jenis === 'mahasiswa') {
        actionUrl = 'api.php?action=save';
        formId = 'formMahasiswa';
    } else if (jenis === 'dosen') {
        actionUrl = 'api.php?action=save_dosen';
        formId = 'formDosen';
    } else if (jenis === 'matkul') {
        actionUrl = 'api.php?action=save_matkul';
        formId = 'formMatkul';
    } else if (jenis === 'jadwal') {
        actionUrl = 'api.php?action=save_jadwal';
        formId = 'formJadwal';
    }

    let formData = new FormData(document.getElementById(formId));

    fetch(actionUrl, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            let modalEl = document.querySelector('.modal.show');
            let modal = bootstrap.Modal.getInstance(modalEl);
            if (modal) modal.hide();
            
            loadData(jenis);
        } else {
            alert('Gagal menyimpan data: ' + data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}

// Listener Tab
document.querySelectorAll('button[data-bs-toggle="tab"]').forEach(tabButton => {
    tabButton.addEventListener('shown.bs.tab', (e) => {
        let tipe = e.target.getAttribute('data-bs-target').replace('#panel-', '');
        loadData(tipe);
    });
});

window.onload = () => loadData('mahasiswa');

function siapkanTambah(table) {
    let form = document.getElementById(`form${capitalize(table)}`);
    if (form) form.reset();
    
    let hiddenId = document.getElementById(`${table}_id`);
    if (hiddenId) hiddenId.value = '';

    // Panggil muat dropdown otomatis jika membuka form tambah jadwal
    if (table === 'jadwal') {
        muatOpsiDropdown();
    }
}

// Fungsi bantu untuk kapitalisasi huruf pertama
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// 5. Muat Opsi Dropdown (Dibuat mengembalikan Promise agar bisa disinkronkan dengan Edit)
function muatOpsiDropdown() {
    return Promise.all([
        // Muat Dosen
        fetch('api.php?action=list_dosen')
            .then(response => response.json())
            .then(data => {
                let selectDosen = document.getElementById('id_dosen');
                if (selectDosen) {
                    selectDosen.innerHTML = '<option value="" selected disabled>Pilih Dosen</option>';
                    data.forEach(item => {
                        selectDosen.innerHTML += `<option value="${item.id}">${item.nama}</option>`;
                    });
                }
            }),

        // Muat Mata Kuliah
        fetch('api.php?action=list_matkul')
            .then(response => response.json())
            .then(data => {
                let selectMatkul = document.getElementById('id_matkul');
                if (selectMatkul) {
                    selectMatkul.innerHTML = '<option value="" selected disabled>Pilih Mata Kuliah</option>';
                    data.forEach(item => {
                        selectMatkul.innerHTML += `<option value="${item.id}">${item.matkul}</option>`;
                    });
                }
            })
    ]).catch(error => console.error('Gagal memuat opsi dropdown:', error));
}

// Tambahkan kode ini di bawah script.js Anda
let jadwalModal = document.getElementById('jadwalModal'); // Sesuaikan ID modal Anda (misal: jadwalModal atau formJadwalModal)
if (jadwalModal) {
    jadwalModal.addEventListener('show.bs.modal', function (event) {
        muatOpsiDropdown();
    });
}