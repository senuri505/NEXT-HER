<?php
/**
 * Registration Submission Backend Processor
 * Leo Club of University of Sri Jayewardenepura - NEXT HER
 */

require_once __DIR__ . '/php/db.php';
require_once __DIR__ . '/php/functions.php';

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(false, 'Invalid request method.', [], 405);
}

// Extract and sanitize input data
$csrfToken   = $_POST['csrf_token'] ?? '';
$fullName    = sanitize_input($_POST['full_name'] ?? '');
$email       = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$phone       = sanitize_input($_POST['phone'] ?? '');
$category    = sanitize_input($_POST['category'] ?? 'school');
$institution = sanitize_input($_POST['institution'] ?? '');
$district    = sanitize_input($_POST['district'] ?? '');
$age         = !empty($_POST['age']) ? (int)$_POST['age'] : null;
$interests   = sanitize_input($_POST['interests'] ?? 'App Dev Competition');
$message     = sanitize_input($_POST['message'] ?? '');

// Verify CSRF Token if present
if (!empty($csrfToken) && !verify_csrf_token($csrfToken)) {
    json_response(false, 'Security token validation failed. Please refresh the page and try again.', [], 403);
}

// Server-side field validation
if (empty($fullName)) {
    json_response(false, 'Full Name is required.', [], 400);
}

if (!$email) {
    json_response(false, 'Please provide a valid email address.', [], 400);
}

if (empty($phone)) {
    json_response(false, 'Phone / WhatsApp contact number is required.', [], 400);
}

// Database Connection
$pdo = getDBConnection();

if (!$pdo) {
    json_response(false, 'Database connection error. Please ensure XAMPP MySQL service is running.', [], 500);
}

try {
    // Check for duplicate registration by email
    $stmtCheck = $pdo->prepare("SELECT id FROM registrations WHERE email = :email LIMIT 1");
    $stmtCheck->execute([':email' => $email]);
    if ($stmtCheck->fetch()) {
        json_response(false, 'This email address has already been registered for NEXT HER.', [], 409);
    }

    // Insert new registration record using Prepared Statement
    $sql = "INSERT INTO registrations (full_name, email, phone, age, category, institution, district, interests, message, status) 
            VALUES (:full_name, :email, :phone, :age, :category, :institution, :district, :interests, :message, 'pending')";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':full_name'   => $fullName,
        ':email'       => $email,
        ':phone'       => $phone,
        ':age'         => $age,
        ':category'    => $category,
        ':institution' => $institution,
        ':district'    => $district,
        ':interests'   => $interests,
        ':message'     => $message
    ]);

    $registrationId = $pdo->lastInsertId();

    json_response(true, '🎉 Registration Successful! Thank you for registering for NEXT HER. Your team leader will receive the briefing by email.', [
        'registration_id' => $registrationId,
        'category' => $category
    ]);

} catch (PDOException $e) {
    error_log("Database Registration Error: " . $e->getMessage());
    json_response(false, 'An unexpected server error occurred while saving your registration.', [], 500);
}
