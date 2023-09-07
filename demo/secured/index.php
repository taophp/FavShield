<?php
  session_start();
  header("Content-Security-Policy: frame-ancestors 'self'");
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>FavShield Demo - Secured Page</title>
  <script src="salt.js" integrity="sha256-<?= base64_encode(hex2bin(hash_file('sha256','salt.js')))?>"></script>
</head>
<body>
  <img src="favshield-logo-with-text.svg" style="width: 150px;">
  <h1>Secured Page</h1>
  <form method="post" action="../login.php" id="loginform">
    <label for="user">User:</label>
    <input type="text" id="user" name="user" data-js-secured="true">
    <br>
    <label for="password">Password:</label>
    <input type="password" id="password" data-js-secured="true">
    <br>
    <input type="hidden" id="phash" name="phash">
    <input type="submit" id="unlockButton" data-js-secured="true">
  </form>
  
</body>
</html>
