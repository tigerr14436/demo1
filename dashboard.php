<?php
session_start();
require_once 'config.php';
require_once 'functions.php';

if (!is_logged_in()) {
    redirect('login.php');
}
?>

<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - NATURE GIFT</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600&display=swap" rel="stylesheet">
</head>
<body>
    <div class="dashboard-container">
        <header class="dashboard-header">
            <div class="logo">
                <img src="logo1.png" alt="Nature Gift Logo">
                <h1>NATURE GIFT</h1>
            </div>
            <nav>
                <a href="index.html">Trang chủ</a>
                <a href="logout.php">Đăng xuất</a>
            </nav>
        </header>
        
        <main class="dashboard-content">
            <h2>Xin chào, <?php echo htmlspecialchars($_SESSION['username']); ?>!</h2>
            <p>Đây là trang quản trị của NATURE GIFT.</p>
            
            <div class="dashboard-cards">
                <div class="card">
                    <h3>Sản phẩm</h3>
                    <p>Quản lý sản phẩm</p>
                </div>
                
                <div class="card">
                    <h3>Đơn hàng</h3>
                    <p>Quản lý đơn hàng</p>
                </div>
                
                <div class="card">
                    <h3>Khách hàng</h3>
                    <p>Quản lý khách hàng</p>
                </div>
            </div>
        </main>
    </div>
</body>
</html>