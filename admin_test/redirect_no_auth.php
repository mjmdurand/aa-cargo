<?php
	if ((isset($validite_auth) AND !empty($validite_auth) AND $validite_auth != 1) OR !isset($validite_auth) OR (isset($validite_auth) AND empty($validite_auth)) )
	{
		header('Location:index.php');
		exit();
	}
?>