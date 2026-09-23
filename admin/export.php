<?php
require_once __DIR__ . '/../php/db.php';
require_once __DIR__ . '/../php/functions.php';

require_admin_login();

$pdo = getDBConnection();

if (!$pdo) {
    die("Database connection offline.");
}

$filename = "women_empowerment_registrations_" . date('Y-m-d') . ".csv";

header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename=' . $filename);

$output = fopen('php://output', 'w');

// Header row
fputcsv($output, ['ID', 'Full Name', 'Email', 'Phone', 'Age', 'Category', 'Institution', 'District', 'Interests', 'Message', 'Status', 'Registered Date']);

$stmt = $pdo->query("SELECT * FROM registrations ORDER BY created_at DESC");

while ($row = $stmt->fetch()) {
    fputcsv($output, [
        $row['id'],
        $row['full_name'],
        $row['email'],
        $row['phone'],
        $row['age'],
        $row['category'],
        $row['institution'],
        $row['district'],
        $row['interests'],
        $row['message'],
        $row['status'],
        $row['created_at']
    ]);
}

fclose($output);
exit;
