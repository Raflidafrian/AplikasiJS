<?php
// Sesuaikan nama database Anda (contoh di bawah: db_mahasiswa)
$host = "localhost";
$user = "root";
$pass = "";
$db   = "db_mahasiswa_05tple005"; 

$conn = mysqli_connect($host, $user, $pass, $db);

// Cek apakah koneksi berhasil
if (!$conn) {
    die("Koneksi database gagal: " . mysqli_connect_error());
}
?>