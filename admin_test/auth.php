<?php
session_start();
if ((isset($_POST['password']) AND !empty($_POST['password'])) AND (isset($_POST['login']) AND !empty($_POST['login'])))
{
    $submit_login = addslashes(htmlentities($_POST['login']));
    $submit_password = addslashes(htmlentities($_POST['password']));

    //on teste si le login existe bien
	include('../mysql.php');
	$correspondance_login_req=$bdd->query("SELECT COUNT(*) AS nbre FROM users WHERE (login='$submit_login' OR mail='$submit_login')");
	$correspondance_login = $correspondance_login_req->fetch();
	$correspondance_login_req -> closeCursor();

		//si le login existe bien
		if ($correspondance_login['nbre'] == '1')
		{
			$correspondance_password_req=$bdd->query("SELECT password FROM users WHERE (login='$submit_login' OR mail='$submit_login')");
			$correspondance_password = $correspondance_password_req->fetch();
			$correspondance_password_req -> closeCursor();

            include('salt.php');
			$submit_password = $salt.$submit_password.$salt2;
            $hash_bdd = $correspondance_password['password'];
			
			//test password
            if (password_verify($submit_password, $hash_bdd))
			{
                // si on a coché se souvenir, on crée le cookie
                if (isset($_POST['remember-me']) AND !empty($_POST['remember-me']) AND $_POST['remember-me'] == "true")
                {
                setcookie('login', $submit_login, time() + 31*24*3600, null, null, false, true);
                setcookie('password', $submit_password, time() + 31*24*3600, null, null, false, true);
                }
				else
                {
                $_SESSION['login'] = $submit_login;
                $_SESSION['password'] = $submit_password;
                }
                //redirection panel admin
                header('Location:dashboard.php');
                exit();
			} 
			else 
			{
				$validite_auth = '0';
			}


			
		}
		//si le login n'existe pas ou est en doublon
		else
		{
			$validite_auth = '0';
		}
}
?>