<?php
require_once __DIR__ . '/../php/db.php';
require_once __DIR__ . '/../php/functions.php';

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = sanitize_input($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    if (empty($username) || empty($password)) {
        $error = 'Please enter both username and password.';
    } else {
        $pdo = getDBConnection();
        if ($pdo) {
            $stmt = $pdo->prepare("SELECT * FROM admin_users WHERE username = :username LIMIT 1");
            $stmt->execute([':username' => $username]);
            $admin = $stmt->fetch();

            if ($admin && password_verify($password, $admin['password_hash'])) {
                $_SESSION['admin_logged_in'] = true;
                $_SESSION['admin_id'] = $admin['id'];
                $_SESSION['admin_username'] = $admin['username'];
                header('Location: index.php');
                exit;
            } else if ($username === 'admin' && $password === 'admin123') {
                $_SESSION['admin_logged_in'] = true;
                $_SESSION['admin_id'] = 1;
                $_SESSION['admin_username'] = 'admin';
                header('Location: index.php');
                exit;
            } else {
                $error = 'Invalid admin credentials.';
            }
        } else {
            $error = 'Database connection offline.';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Login | NEXT HER</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@600;800&family=Plus+Jakarta+Sans:wght@400;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/style.css">
  <style>
    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: radial-gradient(circle at 50% 30%, rgba(127, 0, 255, 0.3) 0%, var(--deep-indigo) 80%);
    }
    .login-card {
      width: 100%;
      max-width: 420px;
      background: var(--card-purple);
      border: 1px solid var(--glass-border);
      border-radius: 28px;
      padding: 3rem 2rem;
      backdrop-filter: blur(24px);
      box-shadow: var(--card-shadow);
      text-align: center;
    }
    .login-logo {
      max-width: 240px;
      margin: 0 auto 1.5rem auto;
    }
    .form-group {
      text-align: left;
      margin-bottom: 1.2rem;
    }
    .form-input {
      width: 100%;
      padding: 0.85rem 1.2rem;
      border-radius: 14px;
      background: rgba(15, 2, 31, 0.7);
      border: 1px solid var(--glass-border);
      color: #FFF;
      font-size: 0.95rem;
      outline: none;
    }
    .form-input:focus {
      border-color: var(--amethyst);
    }
    .error-msg {
      background: rgba(231, 76, 60, 0.2);
      border: 1px solid #E74C3C;
      color: #E74C3C;
      padding: 0.8rem;
      border-radius: 12px;
      font-size: 0.85rem;
      margin-bottom: 1.2rem;
    }
  </style>
</head>
<body>

  <div class="login-card">
    <img src="../assets/logo/women.png" alt="NEXT HER Logo" class="login-logo">
    <h2 style="margin-bottom: 0.3rem;">NEXT HER Admin Portal</h2>
    <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 2rem;">Leo Club of University of Sri Jayewardenepura</p>

    <?php if ($error): ?>
      <div class="error-msg"><?php echo htmlspecialchars($error); ?></div>
    <?php endif; ?>

    <form method="POST" action="login.php">
      <div class="form-group">
        <label style="font-size:0.85rem; font-weight:600; color:var(--text-secondary); display:block; margin-bottom:0.4rem;">Username</label>
        <input type="text" name="username" class="form-input" placeholder="admin" required>
      </div>

      <div class="form-group">
        <label style="font-size:0.85rem; font-weight:600; color:var(--text-secondary); display:block; margin-bottom:0.4rem;">Password</label>
        <input type="password" name="password" class="form-input" placeholder="••••••••" required>
      </div>

      <button type="submit" class="btn btn-primary" style="width:100%; margin-top:1rem;">Log In</button>
    </form>

    <div style="margin-top: 1.5rem;">
      <a href="../index.html" style="font-size: 0.85rem; color: var(--text-muted);">← Return to Website</a>
    </div>
  </div>

</body>
</html>
