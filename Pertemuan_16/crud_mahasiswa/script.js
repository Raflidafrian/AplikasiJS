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

// 3. Fungsi Siapkan Edit (Mengambil data ke form)
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
            }
            // Tambahkan else if untuk matkul & jadwal sesuai kebutuhan
            
            modal.show();
        });
}

// 4. Fungsi Simpan (Create & Update)
function simpanData(event, table) {
    event.preventDefault();
    let formData = new FormData(event.target);
    formData.append('table', table);

    fetch('api.php?action=save', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === 'success') {
            bootstrap.Modal.getInstance(document.getElementById(`${table}Modal`)).hide();
            loadData(table);
            event.target.reset();
        } else {
            alert('Gagal simpan: ' + data.message);
        }
    });
}

// Listener Tab
document.querySelectorAll('button[data-bs-toggle="tab"]').forEach(tabButton => {
    tabButton.addEventListener('shown.bs.tab', (e) => {
        let tipe = e.target.getAttribute('data-bs-target').replace('#panel-', '');
        loadData(tipe);
    });
});

window.onload = () => loadData('mahasiswa');