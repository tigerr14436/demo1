<?php
session_start();
require_once 'config.php';
require_once 'functions.php';

if (is_logged_in()) {
    redirect('dashboard.php');
}

$error = '';
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = sanitize_input($_POST['username']);
    $password = sanitize_input($_POST['password']);

    try {
        $stmt = $conn->prepare("SELECT id, username, password FROM users WHERE username = :username");
        $stmt->execute(['username' => $username]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            redirect('index.html');
        } else {
            $error = 'Tên đăng nhập hoặc mật khẩu không đúng';
        }
    } catch (PDOException $e) {
        $error = 'Đã xảy ra lỗi: ' . $e->getMessage();
    }
}
?>

<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đăng nhập - NATURE GIFT</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600&display=swap" rel="stylesheet">
</head>
<body>
    <div class="login-container">
        <div class="login-logo">
            <img src="logo1.png" alt="Nature Gift Logo">
            <h1>NATURE GIFT</h1>
        </div>
        
        <form class="login-form" action="login.php" method="POST">
            <?php if ($error): ?>
                <div class="error-message"><?php echo $error; ?></div>
            <?php endif; ?>
            
            <div class="form-group">
                <label for="username">Tên đăng nhập</label>
                <input type="text" id="username" name="username" required>
            </div>
            
            <div class="form-group">
                <label for="password">Mật khẩu</label>
                <input type="password" id="password" name="password" required>
            </div>
            
            <button type="submit" class="login-btn">Đăng nhập</button>
            
            <div class="login-links">
                <a href="register.php">Đăng ký tài khoản</a>
                <a href="#">Quên mật khẩu?</a>
            </div>
        </form>
    </div>
</body>
</html>