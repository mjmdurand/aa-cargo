<?php
//test si user loggué
session_start();
include('check_auth.php');
include('redirect_no_auth.php');
?>
Server : <?php echo $_POST['server']; ?><br/>
Timestamp : <?php echo (strtotime($_POST['starting-date'].' '.$_POST['starting-time'])+$_POST['settingTimezone']); ?><br/>
Starting point : <?php echo $_POST['starting-position']; ?><br/>



