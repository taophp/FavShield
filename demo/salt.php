<?php
session_start();
$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
$salt = '';
for ($i = 0; $i < 16; $i++) {
    $salt .= $characters[rand(0, strlen($characters) - 1)];
}
echo $_SESSION['salt'] = $salt;