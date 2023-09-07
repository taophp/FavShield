<?php
session_start();

$pdo = new PDO("sqlite:db.sqlite");
$query = "SELECT phash FROM users WHERE user = :user";
$stmt = $pdo->prepare($query);
$stmt->bindParam(':user', $_POST['user'], PDO::PARAM_STR);
$stmt->execute();

$dbPhash = $stmt->fetch()['phash'];

if (hash('sha256', $dbPhash . $_SESSION['salt'])===$_POST['phash']) {
    echo 'Success !';
}else{
    echo 'Failure !';
}