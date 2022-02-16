<?php
//check si cookie login + password existent + pas vide
if ((isset($_COOKIE['login']) AND !empty($_COOKIE['login'])) AND (isset($_COOKIE['password']) AND !empty($_COOKIE['password'])))
{
	$login = $_COOKIE['login'];
	$password = $_COOKIE['password'];
	
	//on teste si le login existe bien
	include('../mysql.php');
	$correspondance_login_req=$bdd->query("SELECT COUNT(*) AS nbre FROM users WHERE (login='$login' OR mail='$login')");
	$correspondance_login = $correspondance_login_req->fetch();
	$correspondance_login_req -> closeCursor();

		//si le login existe bien
		if ($correspondance_login['nbre'] == '1')
		{
			$correspondance_password_req=$bdd->query("SELECT password FROM users WHERE (login='$login' OR mail='$login')");
			$correspondance_password = $correspondance_password_req->fetch();
			$correspondance_password_req -> closeCursor();

			$hash_bdd = $correspondance_password['password'];
			
			//test password
			if (password_verify($password, $hash_bdd)) 
			{
				$validite_auth = '1';
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


//check si session login + password existent + pas vide
if ((isset($_SESSION['login']) AND !empty($_SESSION['login'])) AND (isset($_SESSION['password']) AND !empty($_SESSION['password'])))
{
	$login = $_SESSION['login'];
	$password = $_SESSION['password'];
	
	//on teste si le login existe bien
	include('../mysql.php');
	$correspondance_login_req=$bdd->query("SELECT COUNT(*) AS nbre FROM users WHERE (login='$login' OR mail='$login')");
	$correspondance_login = $correspondance_login_req->fetch();
	$correspondance_login_req -> closeCursor();

		//si le login existe bien
		if ($correspondance_login['nbre'] == '1')
		{
			$correspondance_password_req=$bdd->query("SELECT password FROM users WHERE (login='$login' OR mail='$login')");
			$correspondance_password = $correspondance_password_req->fetch();
			$correspondance_password_req -> closeCursor();

			$hash_bdd = $correspondance_password['password'];
			
			//test password
			if (password_verify($password, $hash_bdd)) 
			{
				$validite_auth = '1';
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


else
{
	$validite_auth = '0';
}
?>