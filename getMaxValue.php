<?php
// ✅ Direct database connection
$host = 'localhost';
$user = 'root';
$pass = '';
$db = 'universitydb'; // <-- Confirmed from your phpMyAdmin screenshot

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// ✅ Fetch parameters from AJAX
$table = $_GET['table'];
$column = $_GET['column'];

// ✅ Sanitize inputs
$table = mysqli_real_escape_string($conn, $table);
$column = mysqli_real_escape_string($conn, $column);

// ✅ Run query
$sql = "SELECT MAX(`$column`) AS maxval FROM `$table`";
$res = mysqli_query($conn, $sql);

if ($res) {
    $row = mysqli_fetch_assoc($res);
    echo $row['maxval'];
} else {
    echo "Error running query.";
}

$conn->close();
?>