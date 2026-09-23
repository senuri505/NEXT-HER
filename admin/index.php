<?php
require_once __DIR__ . '/../php/db.php';
require_once __DIR__ . '/../php/functions.php';

require_admin_login();

$pdo = getDBConnection();

$search = sanitize_input($_GET['search'] ?? '');
$filterCategory = sanitize_input($_GET['category'] ?? '');

$stats = [
    'total' => 0,
    'school' => 0,
    'university' => 0,
    'volunteer' => 0,
    'mentor' => 0,
    'partner' => 0
];

if ($pdo) {
    $stmtStats = $pdo->query("SELECT category, COUNT(*) as count FROM registrations GROUP BY category");
    while ($row = $stmtStats->fetch()) {
        $cat = strtolower($row['category']);
        $stats[$cat] = (int)$row['count'];
        $stats['total'] += (int)$row['count'];
    }

    $where = [];
    $params = [];

    if (!empty($search)) {
        $where[] = "(full_name LIKE :search OR email LIKE :search OR institution LIKE :search OR phone LIKE :search)";
        $params[':search'] = "%$search%";
    }

    if (!empty($filterCategory)) {
        $where[] = "category = :filterCat";
        $params[':filterCat'] = $filterCategory;
    }

    $whereSql = !empty($where) ? "WHERE " . implode(" AND ", $where) : "";
    $sql = "SELECT * FROM registrations $whereSql ORDER BY created_at DESC LIMIT 100";
    
    $stmtRegs = $pdo->prepare($sql);
    $stmtRegs->execute($params);
    $registrations = $stmtRegs->fetchAll();
} else {
    $registrations = [];
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NEXT HER Admin Dashboard</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@600;800&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/style.css">
  <style>
    .admin-layout {
      min-height: 100vh;
      background: var(--deep-indigo);
      padding: 2rem 0 5rem 0;
    }
    .admin-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2.5rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid var(--glass-border);
    }
    .stats-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 1.2rem;
      margin-bottom: 2.5rem;
    }
    .admin-stat-card {
      background: var(--card-purple);
      border: 1px solid var(--glass-border);
      border-radius: 20px;
      padding: 1.5rem;
      backdrop-filter: blur(16px);
    }
    .stat-val {
      font-family: var(--font-display);
      font-size: 2.2rem;
      font-weight: 800;
      color: var(--gold-accent);
    }
    .stat-lbl {
      font-size: 0.85rem;
      color: var(--text-muted);
      text-transform: uppercase;
    }
    .controls-bar {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.8rem;
      flex-wrap: wrap;
    }
    .search-input {
      flex: 1;
      min-width: 240px;
      padding: 0.75rem 1.2rem;
      border-radius: 30px;
      background: rgba(15, 2, 31, 0.7);
      border: 1px solid var(--glass-border);
      color: #FFF;
    }
    .filter-select {
      padding: 0.75rem 1.2rem;
      border-radius: 30px;
      background: rgba(15, 2, 31, 0.7);
      border: 1px solid var(--glass-border);
      color: #FFF;
    }
    .table-wrapper {
      background: var(--card-purple);
      border: 1px solid var(--glass-border);
      border-radius: 24px;
      overflow-x: auto;
      backdrop-filter: blur(16px);
    }
    table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 0.9rem;
    }
    th, td {
      padding: 1.2rem 1.4rem;
      border-bottom: 1px solid var(--glass-border);
      color: var(--text-secondary);
    }
    th {
      font-family: var(--font-display);
      font-weight: 700;
      color: var(--text-primary);
      background: rgba(255, 255, 255, 0.04);
    }
    tr:hover {
      background: rgba(255, 255, 255, 0.03);
    }
    .cat-badge {
      display: inline-block;
      padding: 0.25rem 0.7rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
    }
    .cat-school { background: rgba(153, 102, 204, 0.3); color: var(--lavender); }
    .cat-university { background: rgba(127, 0, 255, 0.3); color: #FFF; }
    .cat-volunteer { background: rgba(46, 204, 113, 0.2); color: #2ECC71; }
    .cat-mentor { background: rgba(255, 215, 0, 0.2); color: var(--gold-accent); }
    .cat-partner { background: rgba(52, 152, 219, 0.2); color: #3498DB; }
  </style>
</head>
<body>

  <div class="admin-layout">
    <div class="container">
      <div class="admin-header">
        <div>
          <h1 style="font-size: 1.8rem;">NEXT HER Registrations</h1>
          <p style="color: var(--text-muted); font-size: 0.9rem;">Leo Club of University of Sri Jayewardenepura • District 306 D2</p>
        </div>
        <div style="display: flex; gap: 1rem;">
          <a href="export.php" class="btn btn-gold" style="padding: 0.6rem 1.2rem; font-size: 0.85rem;">📥 Export CSV</a>
          <a href="logout.php" class="btn btn-secondary" style="padding: 0.6rem 1.2rem; font-size: 0.85rem;">Log Out</a>
        </div>
      </div>

      <!-- Stats Summary -->
      <div class="stats-row">
        <div class="admin-stat-card">
          <div class="stat-val"><?php echo $stats['total']; ?></div>
          <div class="stat-lbl">Total Registrations</div>
        </div>
        <div class="admin-stat-card">
          <div class="stat-val"><?php echo $stats['school']; ?></div>
          <div class="stat-lbl">School Students</div>
        </div>
        <div class="admin-stat-card">
          <div class="stat-val"><?php echo $stats['university']; ?></div>
          <div class="stat-lbl">Uni Undergrads</div>
        </div>
        <div class="admin-stat-card">
          <div class="stat-val"><?php echo $stats['volunteer']; ?></div>
          <div class="stat-lbl">Volunteers</div>
        </div>
        <div class="admin-stat-card">
          <div class="stat-val"><?php echo $stats['mentor']; ?></div>
          <div class="stat-lbl">Mentors</div>
        </div>
      </div>

      <!-- Controls -->
      <form method="GET" action="index.php" class="controls-bar">
        <input type="text" name="search" class="search-input" placeholder="Search by name, email, institution..." value="<?php echo htmlspecialchars($search); ?>">
        <select name="category" class="filter-select" onchange="this.form.submit()">
          <option value="">All Categories</option>
          <option value="school" <?php echo $filterCategory === 'school' ? 'selected' : ''; ?>>School Students</option>
          <option value="university" <?php echo $filterCategory === 'university' ? 'selected' : ''; ?>>University Students</option>
          <option value="volunteer" <?php echo $filterCategory === 'volunteer' ? 'selected' : ''; ?>>Volunteers</option>
          <option value="mentor" <?php echo $filterCategory === 'mentor' ? 'selected' : ''; ?>>Mentors</option>
          <option value="partner" <?php echo $filterCategory === 'partner' ? 'selected' : ''; ?>>Partners</option>
        </select>
        <button type="submit" class="btn btn-primary" style="padding: 0.6rem 1.4rem;">Search</button>
      </form>

      <!-- Table View -->
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Category</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Institution</th>
              <th>District</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <?php if (!empty($registrations)): ?>
              <?php foreach ($registrations as $reg): ?>
                <tr>
                  <td>#<?php echo $reg['id']; ?></td>
                  <td style="font-weight: 600; color: #FFF;"><?php echo htmlspecialchars($reg['full_name']); ?></td>
                  <td>
                    <span class="cat-badge cat-<?php echo htmlspecialchars(strtolower($reg['category'])); ?>">
                      <?php echo htmlspecialchars(ucfirst($reg['category'])); ?>
                    </span>
                  </td>
                  <td><?php echo htmlspecialchars($reg['email']); ?></td>
                  <td><?php echo htmlspecialchars($reg['phone']); ?></td>
                  <td><?php echo htmlspecialchars($reg['institution'] ?: '-'); ?></td>
                  <td><?php echo htmlspecialchars($reg['district'] ?: '-'); ?></td>
                  <td style="font-size: 0.8rem; color: var(--text-muted);"><?php echo date('M d, Y', strtotime($reg['created_at'])); ?></td>
                </tr>
              <?php endforeach; ?>
            <?php else: ?>
              <tr>
                <td colspan="8" style="text-align: center; padding: 3rem; color: var(--text-muted);">
                  No registrations found matching criteria.
                </td>
              </tr>
            <?php endif; ?>
          </tbody>
        </table>
      </div>
    </div>
  </div>

</body>
</html>
