<?php
header('Content-Type: application/json');

// Connexion à votre base de données
$host = 'db';
$db   = 'archeageapp';
$user = 'archeageapp';
$pass = 'dev';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);

    $stmt = $pdo->query("SELECT id, timestamp, starting_point, server_description FROM timers WHERE available=1 ORDER BY server_description");
    $servers = $stmt->fetchAll();

    echo json_encode($servers);

} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
