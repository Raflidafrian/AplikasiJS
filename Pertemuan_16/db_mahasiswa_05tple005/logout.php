<?php
session_start();

// 1. Hapus semua variabel session
$_SESSION = [];

// 2. Hancurkan session yang terdaftar di server
session_unset();
session_destroy();

// 3. Bersihkan cookie session jika ada (opsional tapi bagus untuk keamanan)
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

// 4. Tendang kembali ke halaman login
header("Location: login.php");
exit;
?>