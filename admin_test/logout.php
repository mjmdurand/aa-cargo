<?php
session_start();
session_destroy();
unset($_COOKIE['login']);
unset($_COOKIE['password']);
setcookie(login, '', time() - 3600);
setcookie(password, '', time() - 3600);
header('Location: index.php');
exit();
?>
