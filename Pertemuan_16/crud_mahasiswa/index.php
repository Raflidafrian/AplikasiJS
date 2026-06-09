<?php
session_start();
if (!isset($_SESSION['login'])) {
    header("Location: login.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - SIAKAD Premium</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <style>
    body {
        background-color: #0b0f19;
        color: #f1f5f9;
        min-height: 100vh;
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
    }

    .navbar {
        background: rgba(15, 23, 42, 0.8) !important;
        backdrop-filter: blur(12px);
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    .navbar-brand {
        letter-spacing: 0.5px;
        background: linear-gradient(45deg, #38bdf8, #818cf8);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .nav-tabs {
        border-bottom: none;
        background: #111827;
        padding: 6px;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.05);
    }

    .nav-tabs .nav-link {
        border: none;
        color: #94a3b8;
        padding: 10px 18px;
        border-radius: 8px;
        font-weight: 500;
        transition: all 0.25s ease;
    }

    .nav-tabs .nav-link i {
        margin-right: 8px;
    }

    .nav-tabs .nav-link:hover {
        color: #38bdf8;
        background: rgba(56, 189, 248, 0.05);
    }

    .nav-tabs .nav-link.active {
        background-color: #38bdf8 !important;
        color: #0b0f19 !important;
        font-weight: 600;
        box-shadow: 0 4px 20px rgba(56, 189, 248, 0.4);
    }

    .table-container-wrapper {
        background: #111827;
        border-radius: 16px;
        border: 1px solid rgba(255, 255, 255, 0.05);
        padding: 28px;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
    }

    .table {
        color: #e2e8f0 !important;
    }

    .table-dark {
        background: #1f2937 !important;
    }

    .table-dark th {
        border: none;
        padding: 16px;
        font-size: 0.85rem;
        color: #38bdf8;
        letter-spacing: 0.8px;
        text-transform: uppercase;
    }

    tbody tr {
        border-bottom: 1px solid rgba(255, 255, 255, 0.03);
        transition: all 0.2s ease;
    }

    tbody tr:hover {
        background-color: rgba(255, 255, 255, 0.02) !important;
        transform: translateX(3px);
    }

    tbody td {
        padding: 14px 16px !important;
    }

    .btn-primary {
        background: linear-gradient(135deg, #38bdf8 0%, #2563eb 100%);
        border: none;
        font-weight: 500;
        transition: all 0.25s ease;
    }

    .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 0 15px rgba(56, 189, 248, 0.5);
    }

    /* Gaya Tombol Aksi Premium */
    .btn-action-edit {
        background: rgba(234, 179, 8, 0.1) !important;
        color: #fbbf24 !important;
        border: 1px solid rgba(234, 179, 8, 0.2) !important;
    }

    .btn-action-edit:hover {
        background: #eab308 !important;
        color: #000 !important;
    }

    .btn-action-delete {
        background: rgba(239, 68, 68, 0.1) !important;
        color: #f87171 !important;
        border: 1px solid rgba(239, 68, 68, 0.2) !important;
    }

    .btn-action-delete:hover {
        background: #ef4444 !important;
        color: #fff !important;
        box-shadow: 0 0 10px rgba(239, 68, 68, 0.4);
    }

    .modal-content {
        background-color: #111827;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
    }

    .modal-header {
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        background: #1f2937;
    }

    .modal-footer {
        border-top: 1px solid rgba(255, 255, 255, 0.05);
        background: #1f2937;
    }

    .form-control,
    .form-select {
        background-color: #1f2937;
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: #f1f5f9;
    }

    .form-control:focus,
    .form-select:focus {
        background-color: #1f2937;
        border-color: #38bdf8;
        color: #f1f5f9;
        box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.2);
    }
    </style>
</head>

<body>

    <nav class="navbar navbar-expand-lg navbar-dark sticky-top">
        <div class="container">
            <a class="navbar-brand fw-bold fs-4" href="#">
                <i class="fa-solid fa-graduation-cap me-2"></i>SIAKAD UNPAM
            </a>
            <div class="d-flex align-items-center">
                <span class="text-secondary me-3">
                    <i class="fa-regular fa-user me-1"></i> User: <strong
                        class="text-light"><?= htmlspecialchars($_SESSION['username'] ?? 'Admin'); ?></strong>
                </span>
                <a href="logout.php" class="btn btn-action-delete btn-sm px-3"
                    onclick="return confirm('Apakah Anda yakin ingin keluar?')">
                    <i class="fa-solid fa-right-from-bracket me-1"></i> Keluar
                </a>
            </div>
        </div>
    </nav>

    <div class="container my-5">
        <ul class="nav nav-tabs mb-4 shadow" id="myTab" role="tablist">
            <li class="nav-item">
                <button class="nav-link active" id="mahasiswa-tab" data-bs-toggle="tab"
                    data-bs-target="#panel-mahasiswa" type="button" onclick="loadData('mahasiswa')">
                    <i class="fa-solid fa-user-graduate"></i>Mahasiswa
                </button>
            </li>
            <li class="nav-item">
                <button class="nav-link" id="dosen-tab" data-bs-toggle="tab" data-bs-target="#panel-dosen" type="button"
                    onclick="loadData('dosen')">
                    <i class="fa-solid fa-chalkboard-user"></i>Dosen
                </button>
            </li>
            <li class="nav-item">
                <button class="nav-link" id="matkul-tab" data-bs-toggle="tab" data-bs-target="#panel-matkul"
                    type="button" onclick="loadData('matkul')">
                    <i class="fa-solid fa-book"></i>Matakuliah
                </button>
            </li>
            <li class="nav-item">
                <button class="nav-link" id="jadwal-tab" data-bs-toggle="tab" data-bs-target="#panel-jadwal"
                    type="button" onclick="loadData('jadwal')">
                    <i class="fa-regular fa-calendar-days"></i>Jadwal Kuliah
                </button>
            </li>
        </ul>

        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="panel-mahasiswa">
                <div class="table-container-wrapper">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h5 class="fw-bold mb-0 text-light"><i class="fa-solid fa-list me-2 text-info"></i>Data
                            Mahasiswa</h5>
                        <button class="btn btn-primary btn-sm px-3 fw-semibold" data-bs-toggle="modal"
                            data-bs-target="#mahasiswaModal" onclick="siapkanTambah('mahasiswa')">
                            <i class="fa-solid fa-plus me-1"></i> Tambah Mahasiswa
                        </button>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-hover align-middle mb-0">
                            <thead class="table-blue-dark">
                                <tr>
                                    <th width="80">No</th>
                                    <th>NIM</th>
                                    <th>Nama Lengkap</th>
                                    <th>Jurusan</th>
                                    <th>Email</th>
                                    <th class="text-center" width="180">Aksi</th>
                                </tr>
                            </thead>
                            <tbody id="tempat-mahasiswa"></tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="tab-pane fade" id="panel-dosen">
                <div class="table-container-wrapper">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h5 class="fw-bold mb-0 text-light"><i class="fa-solid fa-list me-2 text-info"></i>Data Dosen
                        </h5>
                        <button class="btn btn-primary btn-sm px-3 fw-semibold" data-bs-toggle="modal"
                            data-bs-target="#dosenModal" onclick="siapkanTambah('dosen')">
                            <i class="fa-solid fa-plus me-1"></i> Tambah Dosen
                        </button>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-hover align-middle mb-0">
                            <thead class="table-dark">
                                <tr>
                                    <th width="80">No</th>
                                    <th>Nama Dosen</th>
                                    <th>Alamat</th>
                                    <th class="text-center" width="180">Aksi</th>
                                </tr>
                            </thead>
                            <tbody id="tempat-dosen"></tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="tab-pane fade" id="panel-matkul">
                <div class="table-container-wrapper">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h5 class="fw-bold mb-0 text-light"><i class="fa-solid fa-list me-2 text-info"></i>Daftar Mata
                            Kuliah</h5>
                        <button class="btn btn-primary btn-sm px-3 fw-semibold" data-bs-toggle="modal"
                            data-bs-target="#matkulModal" onclick="siapkanTambah('matkul')">
                            <i class="fa-solid fa-plus me-1"></i> Tambah Matkul
                        </button>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-hover align-middle mb-0">
                            <thead class="table-dark">
                                <tr>
                                    <th width="80">No</th>
                                    <th>Nama Mata Kuliah</th>
                                    <th>SKS</th>
                                    <th class="text-center" width="180">Aksi</th>
                                </tr>
                            </thead>
                            <tbody id="tempat-matkul"></tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="tab-pane fade" id="panel-jadwal">
                <div class="table-container-wrapper">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h5 class="fw-bold mb-0 text-light"><i class="fa-solid fa-list me-2 text-info"></i>Jadwal Kuliah
                        </h5>
                        <button class="btn btn-primary btn-sm px-3 fw-semibold" data-bs-toggle="modal"
                            data-bs-target="#jadwalModal" onclick="siapkanTambahJadwal()">
                            <i class="fa-solid fa-plus me-1"></i> Tambah Jadwal
                        </button>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-hover align-middle mb-0">
                            <thead class="table-dark">
                                <tr>
                                    <th width="80">No</th>
                                    <th>Dosen</th>
                                    <th>Matakuliah (SKS)</th>
                                    <th>Waktu</th>
                                    <th>Ruang</th>
                                    <th class="text-center" width="180">Aksi</th>
                                </tr>
                            </thead>
                            <tbody id="tempat-jadwal"></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="mahasiswaModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title fw-bold text-light"><i class="fa-solid fa-user-pen me-2 text-info"></i>Form
                        Mahasiswa</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <form id="formMahasiswa" onsubmit="simpanData(event, 'mahasiswa')">
                    <div class="modal-body p-4">
                        <input type="hidden" id="mahasiswa_id" name="id">
                        <div class="mb-3">
                            <label class="form-label text-secondary fw-semibold">NIM</label>
                            <input type="text" class="form-control" id="nim" name="nim" required
                                placeholder="Masukkan NIM">
                        </div>
                        <div class="mb-3">
                            <label class="form-label text-secondary fw-semibold">Nama Lengkap</label>
                            <input type="text" class="form-control" id="nama" name="nama" required
                                placeholder="Masukkan Nama">
                        </div>
                        <div class="mb-3">
                            <label class="form-label text-secondary fw-semibold">Jurusan</label>
                            <input type="text" class="form-control" id="jurusan" name="jurusan" required
                                placeholder="Masukkan Jurusan">
                        </div>
                        <div class="mb-3">
                            <label class="form-label text-secondary fw-semibold">Email</label>
                            <input type="email" class="form-control" id="email" name="email" required
                                placeholder="Masukkan Email">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Batal</button>
                        <button type="submit" class="btn btn-primary btn-sm"><i
                                class="fa-regular fa-floppy-disk me-1"></i> Simpan</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="modal fade" id="dosenModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title fw-bold text-light"><i
                            class="fa-solid fa-chalkboard-user me-2 text-info"></i>Form Dosen</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <form id="formDosen" onsubmit="simpanData(event, 'dosen')">
                    <div class="modal-body p-4">
                        <input type="hidden" id="dosen_id" name="id">
                        <div class="mb-3">
                            <label class="form-label text-secondary fw-semibold">Nama Dosen</label>
                            <input type="text" class="form-control" id="nama_dosen" name="nama" required
                                placeholder="Masukkan Nama Dosen">
                        </div>
                        <div class="mb-3">
                            <label class="form-label text-secondary fw-semibold">Alamat</label>
                            <textarea class="form-control" id="alamat_dosen" name="alamat" rows="3" required
                                placeholder="Masukkan Alamat"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Batal</button>
                        <button type="submit" class="btn btn-primary btn-sm"><i
                                class="fa-regular fa-floppy-disk me-1"></i> Simpan</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="modal fade" id="matkulModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title fw-bold text-light"><i class="fa-solid fa-book me-2 text-info"></i>Form Mata
                        Kuliah</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <form id="formMatkul" onsubmit="simpanData(event, 'matkul')">
                    <div class="modal-body p-4">
                        <input type="hidden" id="matkul_id" name="id">
                        <div class="mb-3">
                            <label class="form-label text-secondary fw-semibold">Nama Mata Kuliah</label>
                            <input type="text" class="form-control" id="matkul" name="matkul" required
                                placeholder="Masukkan Nama Matkul">
                        </div>
                        <div class="mb-3">
                            <label class="form-label text-secondary fw-semibold">SKS</label>
                            <input type="number" class="form-control" id="sks" name="sks" min="1" max="6" required
                                placeholder="Contoh: 3">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Batal</button>
                        <button type="submit" class="btn btn-primary btn-sm"><i
                                class="fa-regular fa-floppy-disk me-1"></i> Simpan</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="modal fade" id="jadwalModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title fw-bold text-light"><i
                            class="fa-regular fa-calendar-days me-2 text-info"></i>Form Jadwal Kuliah</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <form id="formJadwal" onsubmit="simpanData(event, 'jadwal')">
                    <div class="modal-body p-4">
                        <input type="hidden" id="jadwal_id" name="id">
                        <div class="mb-3">
                            <label class="form-label text-secondary fw-semibold">Dosen</label>
                            <select class="form-select" id="id_dosen" name="id_dosen" required></select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label text-secondary fw-semibold">Mata Kuliah</label>
                            <select class="form-select" id="id_matkul" name="id_matkul" required></select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label text-secondary fw-semibold">Waktu / Jam</label>
                            <input type="text" class="form-control" id="waktu" name="waktu" required
                                placeholder="Contoh: Senin, 08:00 - 10:30">
                        </div>
                        <div class="mb-3">
                            <label class="form-label text-secondary fw-semibold">Ruangan</label>
                            <input type="text" class="form-control" id="ruang" name="ruang" required
                                placeholder="Contoh: V.402">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Batal</button>
                        <button type="submit" class="btn btn-primary btn-sm"><i
                                class="fa-regular fa-floppy-disk me-1"></i> Simpan</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="script.js"></script>
</body>

</html>