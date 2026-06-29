/**
 * SIAKAD Premium - Main Script
 * Refactored to use shared utilities from /shared/utils/
 * Dependencies: ../shared/utils/dom.js, ../shared/utils/api.js
 */

// 1. Load Data - Uses shared fetchJSON utility
function loadData(tipe) {
    if (tipe === undefined) tipe = 'mahasiswa';
    let tempatData = getElement('tempat-' + tipe);
    if (!tempatData) return;

    let endpoint = (tipe === 'mahasiswa') ? 'api.php?action=list' : 'api.php?action=list_' + tipe;

    fetchJSON(endpoint).then(function(data) {
        let html = '';
        if (data.length === 0) {
            html = '<tr><td colspan="6" class="text-center text-muted p-3">Belum ada data.</td></tr>';
        } else {
            data.forEach(function(item, index) {
                html += '<tr><td>' + (index + 1) + '</td>';
                
                if (tipe === 'mahasiswa') {
                    html += '<td>' + item.nim + '</td><td>' + item.nama + '</td><td>' + item.jurusan + '</td><td>' + item.email + '</td>';
                } else if (tipe === 'dosen') {
                    html += '<td>' + item.nama + '</td><td>' + item.alamat + '</td>';
                } else if (tipe === 'matkul') {
                    html += '<td>' + item.matkul + '</td><td>' + item.sks + '</td>';
                } else if (tipe === 'jadwal') {
                    html += '<td>' + item.nama_dosen + '</td><td>' + item.matkul + ' (' + item.sks + ' SKS)</td><td>' + item.waktu + '</td><td>' + item.ruang + '</td>';
                }

                html += '<td class="text-center">' +
                    '<button class="btn btn-action-edit btn-sm me-1" onclick="siapkanEdit(\'' + tipe + '\', ' + item.id + ')">Edit</button>' +
                    '<button class="btn btn-action-delete btn-sm" onclick="hapusData(\'' + tipe + '\', ' + item.id + ')">Hapus</button>' +
                    '</td></tr>';
            });
        }
        tempatData.innerHTML = html;
    });
}

// 2. Fungsi Hapus Data - Uses shared confirmDelete utility
function hapusData(table, id) {
    confirmDelete(
        'api.php?action=delete',
        { id: id, table: table },
        function() { loadData(table); }
    );
}

// 3. Fungsi Siapkan Edit - Uses shared DOM utilities
function siapkanEdit(table, id) {
    fetchJSON('api.php?action=get_single&id=' + id + '&table=' + table)
        .then(function(data) {
            var modal = new bootstrap.Modal(getElement(table + 'Modal'));
            
            setInputValue(table + '_id', data.id);

            if (table === 'mahasiswa') {
                setInputValue('nim', data.nim);
                setInputValue('nama', data.nama);
                setInputValue('jurusan', data.jurusan);
                setInputValue('email', data.email);
            } else if (table === 'dosen') {
                setInputValue('nama_dosen', data.nama);
                setInputValue('alamat_dosen', data.alamat);
            } else if (table === 'matkul') {
                setInputValue('nama_matkul', data.matkul);
                setInputValue('sks', data.sks);
            } else if (table === 'jadwal') {
                muatOpsiDropdown().then(function() {
                    setInputValue('id_dosen', data.id_dosen);
                    setInputValue('id_matkul', data.id_matkul);
                    setInputValue('waktu', data.waktu);
                    setInputValue('ruang', data.ruang);
                });
            }
            
            modal.show();
        });
}

// 4. Fungsi Simpan (Create & Update) - Uses shared postFormData utility
function simpanData(event, jenis) {
    event.preventDefault();
    
    var formId = 'form' + capitalize(jenis);
    var formElement = getElement(formId);
    
    if (!formElement) {
        console.error("Form tidak ditemukan: " + formId);
        return;
    }

    var formData = new FormData(formElement);
    var actionUrl = (jenis === 'mahasiswa') ? 'api.php?action=save' : 'api.php?action=save_' + jenis;

    postFormData(actionUrl, formData)
        .then(function(data) {
            if (data.status === 'success') {
                var modalEl = getElement(jenis + 'Modal');
                var modal = bootstrap.Modal.getInstance(modalEl);
                if (modal) modal.hide();
                
                formElement.reset();
                loadData(jenis);
            } else {
                alert('Gagal menyimpan data: ' + (data.message || 'Terjadi kesalahan'));
            }
        })
        .catch(function(error) { console.error('Error:', error); });
}

// Listener Tab
document.querySelectorAll('button[data-bs-toggle="tab"]').forEach(function(tabButton) {
    tabButton.addEventListener('shown.bs.tab', function(e) {
        var tipe = e.target.getAttribute('data-bs-target').replace('#panel-', '');
        loadData(tipe);
    });
});

window.onload = function() { loadData('mahasiswa'); };

function siapkanTambah(table) {
    var form = getElement('form' + capitalize(table));
    if (form) form.reset();
    
    var hiddenId = getElement(table + '_id');
    if (hiddenId) hiddenId.value = '';

    if (table === 'jadwal') {
        muatOpsiDropdown();
    }
}

// Fungsi bantu untuk kapitalisasi huruf pertama
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// 5. Muat Opsi Dropdown - Uses shared fetchJSON utility
function muatOpsiDropdown() {
    return Promise.all([
        fetchJSON('api.php?action=list_dosen')
            .then(function(data) {
                var selectDosen = getElement('id_dosen');
                if (selectDosen) {
                    selectDosen.innerHTML = '<option value="" selected disabled>Pilih Dosen</option>';
                    data.forEach(function(item) {
                        selectDosen.innerHTML += '<option value="' + item.id + '">' + item.nama + '</option>';
                    });
                }
            }),

        fetchJSON('api.php?action=list_matkul')
            .then(function(data) {
                var selectMatkul = getElement('id_matkul');
                if (selectMatkul) {
                    selectMatkul.innerHTML = '<option value="" selected disabled>Pilih Mata Kuliah</option>';
                    data.forEach(function(item) {
                        selectMatkul.innerHTML += '<option value="' + item.id + '">' + item.matkul + '</option>';
                    });
                }
            })
    ]).catch(function(error) { console.error('Gagal memuat opsi dropdown:', error); });
}

// Auto-load dropdown saat modal jadwal dibuka
var jadwalModal = getElement('jadwalModal');
if (jadwalModal) {
    jadwalModal.addEventListener('show.bs.modal', function() {
        muatOpsiDropdown();
    });
}
