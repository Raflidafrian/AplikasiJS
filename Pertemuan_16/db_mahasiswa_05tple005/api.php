<?php
session_start();
header('Content-Type: application/json');

// Proteksi API: Jika tidak ada session login, cegah akses
if (!isset($_SESSION['login'])) {
    echo json_encode(['status' => 'error', 'message' => 'Akses ilegal terdeteksi. Silakan login.']);
    exit;
}

include 'koneksi.php';

// Pastikan variabel $conn aman digunakan
if (!isset($conn)) {
    echo json_encode(['status' => 'error', 'message' => 'Koneksi database ke api.php terputus.']);
    exit;
}

$action = $_GET['action'] ?? '';

// ==========================================
// 1. ACTION: READ (Mengambil Seluruh Data)
// ==========================================

// List Mahasiswa
if ($action == 'list') {
    $query = mysqli_query($conn, "SELECT * FROM mahasiswa ORDER BY id ASC");
    $data = [];
    while ($row = mysqli_fetch_assoc($query)) { $data[] = $row; }
    echo json_encode($data);
    exit;
}

// List Dosen
if ($action == 'list_dosen') {
    $query = mysqli_query($conn, "SELECT * FROM dosen ORDER BY id ASC");
    $data = [];
    while ($row = mysqli_fetch_assoc($query)) { $data[] = $row; }
    echo json_encode($data);
    exit;
}

// List Mata Kuliah
if ($action == 'list_matkul') {
    $query = mysqli_query($conn, "SELECT * FROM matkul ORDER BY id ASC");
    $data = [];
    while ($row = mysqli_fetch_assoc($query)) { $data[] = $row; }
    echo json_encode($data);
    exit;
}

// List Jadwal (Menggunakan INNER JOIN agar nama dosen dan matkul muncul)
if ($action == 'list_jadwal') {
    $sql = "SELECT jadwal.*, dosen.nama AS nama_dosen, matkul.matkul, matkul.sks 
            FROM jadwal
            JOIN dosen ON jadwal.id_dosen = dosen.id
            JOIN matkul ON jadwal.id_matkul = matkul.id
            ORDER BY jadwal.id ASC";
    $query = mysqli_query($conn, $sql);
    $data = [];
    while ($row = mysqli_fetch_assoc($query)) { $data[] = $row; }
    echo json_encode($data);
    exit;
}

// ==========================================
// 2. ACTION: GET SINGLE (Untuk Form Edit)
// ==========================================
if ($action == 'get_single') {
    $id = intval($_GET['id']);
    $table = $_GET['table'] ?? 'mahasiswa';
    
    // Validasi whitelist nama tabel demi keamanan
    if (in_array($table, ['mahasiswa', 'dosen', 'matkul', 'jadwal'])) {
        $query = mysqli_query($conn, "SELECT * FROM $table WHERE id = $id");
        $data = mysqli_fetch_assoc($query);
        echo json_encode($data ? $data : []);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Tabel tidak valid']);
    }
    exit;
}

// ==========================================
// 3. ACTION: CREATE & UPDATE (Simpan Data)
// ==========================================

// Simpan Mahasiswa
if ($_GET['action'] == 'save') {
    $id = $_POST['id'];
    $nim = $_POST['nim'];
    $nama = $_POST['nama'];
    $jurusan = $_POST['jurusan'];
    $email = $_POST['email'];

    if (empty($id)) {
        $sql = "INSERT INTO mahasiswa (nim, nama, jurusan, email) VALUES ('$nim', '$nama', '$jurusan', '$email')";
    } else {
        $id  = intval($id); // Konversi ID menjadi Integer agar query aman & valid
        $sql = "UPDATE mahasiswa SET nim='$nim', nama='$nama', jurusan='$jurusan', email='$email' WHERE id=$id";
    }

    if (mysqli_query($conn, $sql)) { echo json_encode(['status' => 'success']); } 
    else { echo json_encode(['status' => 'error', 'message' => mysqli_error($conn)]); }
    exit;
}

// Simpan Dosen
if ($action == 'save_dosen') {
    $id     = $_POST['id'] ?? '';
    $nama   = mysqli_real_escape_string($conn, $_POST['nama']);
    $alamat = mysqli_real_escape_string($conn, $_POST['alamat']);

    if (empty($id)) {
        $sql = "INSERT INTO dosen (nama, alamat) VALUES ('$nama', '$alamat')";
    } else {
        $id  = intval($id); // Konversi ID menjadi Integer agar query aman & valid
        $sql = "UPDATE dosen SET nama='$nama', alamat='$alamat' WHERE id=$id";
    }

    if (mysqli_query($conn, $sql)) { echo json_encode(['status' => 'success']); } 
    else { echo json_encode(['status' => 'error', 'message' => mysqli_error($conn)]); }
    exit;
}

// Simpan Mata Kuliah
if ($action == 'save_matkul') {
    $id     = $_POST['id'] ?? '';
    $matkul = mysqli_real_escape_string($conn, $_POST['matkul']);
    $sks    = intval($_POST['sks']);

    if (empty($id)) {
        $sql = "INSERT INTO matkul (matkul, sks) VALUES ('$matkul', $sks)";
    } else {
        $id  = intval($id); // Konversi ID menjadi Integer agar query aman & valid
        $sql = "UPDATE matkul SET matkul='$matkul', sks=$sks WHERE id=$id";
    }

    if (mysqli_query($conn, $sql)) { echo json_encode(['status' => 'success']); } 
    else { echo json_encode(['status' => 'error', 'message' => mysqli_error($conn)]); }
    exit;
}

// Simpan Jadwal Kuliah
if ($action == 'save_jadwal') {
    $id        = $_POST['id'] ?? '';
    $id_dosen  = intval($_POST['id_dosen']);
    $id_matkul = intval($_POST['id_matkul']);
    $waktu     = mysqli_real_escape_string($conn, $_POST['waktu']);
    $ruang     = mysqli_real_escape_string($conn, $_POST['ruang']);

    if (empty($id)) {
        $sql = "INSERT INTO jadwal (id_dosen, id_matkul, waktu, ruang) VALUES ($id_dosen, $id_matkul, '$waktu', '$ruang')";
    } else {
        $id  = intval($id); // Konversi ID menjadi Integer agar query aman & valid
        $sql = "UPDATE jadwal SET id_dosen=$id_dosen, id_matkul=$id_matkul, waktu='$waktu', ruang='$ruang' WHERE id=$id";
    }

    if (mysqli_query($conn, $sql)) { echo json_encode(['status' => 'success']); } 
    else { echo json_encode(['status' => 'error', 'message' => mysqli_error($conn)]); }
    exit;
}

// ==========================================
// 4. ACTION: DELETE (Menghapus Data Dinamis)
// ==========================================
if ($action == 'delete') {
    $id = intval($_POST['id']);
    $table = $_POST['table'] ?? 'mahasiswa';

    // Validasi nama tabel demi keamanan database Anda
    if (in_array($table, ['mahasiswa', 'dosen', 'matkul', 'jadwal'])) {
        $sql = "DELETE FROM $table WHERE id = $id";
        if (mysqli_query($conn, $sql)) {
            echo json_encode(['status' => 'success']);
        } else {
            echo json_encode(['status' => 'error', 'message' => mysqli_error($conn)]);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Nama tabel tidak valid.']);
    }
    exit;
}
?>