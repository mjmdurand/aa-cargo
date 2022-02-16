<?php
include ('salt.php');
$password = addslashes(htmlentities($salt.'test'.$salt2));
$hash = password_hash($password, PASSWORD_DEFAULT);
echo 'pass : '.$password.'</br> hash : '.$hash.'<br/>';

//login-
if (password_verify($password, $hash)) {
    //echo 'Le mot de passe est valide !';
} else {
    //echo 'Le mot de passe est invalide.';
}

//reset
$token = uniqid();
echo 'token : '.$token;
?>