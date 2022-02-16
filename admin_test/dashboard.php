<?php
//test si user loggué
session_start();
include('check_auth.php');
include('redirect_no_auth.php');
?>

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <title>Admin panel · Dashboard</title>
    <link rel="icon" type="image/png" href="../favicon.png" />



    

    <!-- Bootstrap core CSS -->
<link href="../assets/dist/css/bootstrap.min.css" rel="stylesheet">

    <style>
      .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }
    </style>

    
    <!-- Custom styles for this template -->
    <link href="dashboard.css" rel="stylesheet">
  </head>
  <body>
<?php 
include('../mysql.php');

$recup_user_info_req=$bdd->query("SELECT * FROM users WHERE (login='$login' OR mail='$login')");
$recup_user_info = $recup_user_info_req->fetch();

$rights = explode(',', $recup_user_info['rights']);
$login = $recup_user_info['login'];




$recup_user_info_req-> closeCursor();  


?>

<header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
  <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Archeage cargo timer</a>
  <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
</header>

<div class="container-fluid">
  <div class="row">
      <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div class="position-sticky pt-3">
        <ul class="nav flex-column">
        <li class="nav-item">
            <a class="nav-link" aria-current="page" href="#">
              <span data-feather="user"></span>
              Welcome <?php echo $login; ?>
            </a>
          </li>


          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">
              <span data-feather="home"></span>
              Dashboard
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="logout.php">
              <span data-feather="log-out"></span>
              Sign out
            </a>
          </li>

          
        </ul>
      </div>
    </nav>

    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Dashboard</h1>

      </div>

      <div class="form-signin">
  <form action="update.php" method="post">
    <h1 class="h3 mb-3 fw-normal">Update timer (use your local time)</h1>
    <div id="debug"></div>
    <div class="form-group">
    <label for="server" class="visually-hidden">Choose a server :</label>
  <select id="server" name="server" class="form-select">

  <?php
$recup_infos_req=$bdd->query("SELECT * FROM timers ORDER BY server_description");
$loop = 0;
while($recup_infos = $recup_infos_req->fetch())
{
  $check_right = "";
  $check_right = array_search($recup_infos['id'], $rights);
  

  if ($check_right != FALSE) 
    { 
      if ($loop == 0){echo '<option value="'.$recup_infos['id'].'" selected>'.$recup_infos['server_description'].'</option>'; $loop++;}
      else {echo '<option value="'.$recup_infos['id'].'">'.$recup_infos['server_description'].'</option>';}
    }
  else
    {
      //echo 'No Access for server '.$recup_infos['id'];
    }
}
$recup_infos_req -> closeCursor();

?> 
</select></div> 

<div class="form-group">
<label for="starting-date" class="visually-hidden">Start date :</label>
<input class="form-control" type="date" value="2021-01-08" id="starting-date" name="starting-date">

<label for="starting-time" class="visually-hidden">starting-time :</label>
<input type="time" id="starting-time" name="starting-time" step="1" value="00:00:00" class="form-control">
</div>

<div class="form-group">
    <label for="starting-position" class="visually-hidden">Choose a starting position :</label>
  <select id="starting-position" name="starting-position" class="form-select">
  <option value="1" selected>Sailing to Solis</option>
  <option value="2">Docked at Solis</option>
  <option value="3">Sailing to Two Crown</option>
  <option value="4">Docked at Two Crown</option>
</select></div> 
<input type="hidden" id="settingTimezone" name="settingTimezone" value="0"/>
    <button class="w-100 btn btn-lg btn-primary" type="submit">Update</button>
  </form>
    </div>

      <h2>Currents timers</h2>
      <div class="table-responsive">
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th>Server</th>
              <th>Setted start time</th>
              <th>Setted start position</th>
              <th>Setted by</th>
            </tr>
          </thead>
          <tbody>
          <?php
$recup_timers_req=$bdd->query("SELECT * FROM timers WHERE available =1 ORDER BY server_description ");
while($recup_timers = $recup_timers_req->fetch())
{
  $server = $recup_timers['id'];
  $starting_point = $recup_timers['starting_point'];
  $user = $recup_timers['user'];

  switch ($starting_point){
    case 1:
      $starting_point = 'Sailing to Solis';
    break;
    case 2:
      $starting_point = 'Docked at Solis';
    break;
    case 3:
      $starting_point = 'Sailing to Two Crown';
    break;
    case 4:
      $starting_point = 'Docked at Two Crown';
    break;
  }

  
  $recup_user_info_req=$bdd->query("SELECT * FROM users WHERE id=$user");
  $recup_user_info = $recup_user_info_req->fetch();

  if ($recup_timers['timestamp'] == 0) 
    {
      echo '<tr>';
      echo '<td>'.$recup_timers['server_description'].'</td>';
      echo '<td>Not Set</td>';
      echo '<td>Not Set</td>';
      echo '<td>Not Set</td>';
      echo '</tr>';
    }
  else 
    {
      echo '<tr>';
      echo '<td>'.$recup_timers['server_description'].'</td>';
      echo '<td>'.$starting_date= date('Y-m-d H:i:s',  $recup_timers['timestamp']).' UTC</td>';
      echo '<td>'.$starting_point.'</td>';
      echo '<td>'.$recup_user_info['login'].'</td>';
      echo '</tr>';
    }  

  
  $recup_user_info_req-> closeCursor();  
}
$recup_timers_req -> closeCursor();

?> 
          </tbody>
        </table>
      </div>
    </main>
  </div>
</div>


    <script src="../assets/dist/js/bootstrap.bundle.min.js"></script>

      <script src="https://cdn.jsdelivr.net/npm/feather-icons@4.28.0/dist/feather.min.js" integrity="sha384-uO3SXW5IuS1ZpFPKugNNWqTZRRglnUJK6UAZ/gxOX80nxEkN9NcGZTftn6RzhGWE" crossorigin="anonymous"></script><script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js" integrity="sha384-zNy6FEbO50N+Cg5wap8IKA4M/ZnLJgzc6w2NqACZaK0u0FXfOWRRJOnQtpZun8ha" crossorigin="anonymous"></script><script src="dashboard.js"></script>
  </body>
</html>
