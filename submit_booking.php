<?php
// ============================================================
//  Polished Beauty — submit_booking.php
//  Web Programming 
//  Handles appointment booking form submissions
// ============================================================

// Only process POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.html');
    exit;
}

// ---------- SANITIZE & VALIDATE INPUTS ----------
function sanitize($input) {
    return htmlspecialchars(strip_tags(trim($input)));
}

$fname   = sanitize($_POST['fname']   ?? '');
$lname   = sanitize($_POST['lname']   ?? '');
$service = sanitize($_POST['service'] ?? '');
$date    = sanitize($_POST['date']    ?? '');
$time    = sanitize($_POST['time']    ?? '');
$phone   = sanitize($_POST['phone']   ?? '');

$errors = [];

if (empty($fname))   $errors[] = "First name is required.";
if (empty($lname))   $errors[] = "Last name is required.";
if (empty($service)) $errors[] = "Please select a service.";
if (empty($date))    $errors[] = "Date is required.";
if (empty($phone))   $errors[] = "Phone number is required.";

// Validate date (must be today or future)
if (!empty($date)) {
    $selected = new DateTime($date);
    $today    = new DateTime('today');
    if ($selected < $today) {
        $errors[] = "Date must be today or in the future.";
    }
}

// Validate phone (at least 10 digits)
$phoneDigits = preg_replace('/\D/', '', $phone);
if (strlen($phoneDigits) < 10) {
    $errors[] = "Please enter a valid phone number.";
}

// ---------- IF ERRORS, REDIRECT BACK ----------
if (!empty($errors)) {
    $errorMsg = urlencode(implode(' | ', $errors));
    header("Location: index.html?error=$errorMsg");
    exit;
}

// ---------- SAVE BOOKING TO FILE ----------
// In a real project this would go to a database.
// For the course demo we write to a text log file.

$logFile = 'bookings.txt';
$entry   = sprintf(
    "[%s] Name: %s %s | Service: %s | Date: %s | Time: %s | Phone: %s\n",
    date('Y-m-d H:i:s'),
    $fname, $lname,
    $service,
    $date,
    $time,
    $phone
);

file_put_contents($logFile, $entry, FILE_APPEND | LOCK_EX);

// ---------- SUCCESS RESPONSE ----------
// Redirect with success flag
header("Location: index.html?booking=success&name=" . urlencode($fname));
exit;
?>
