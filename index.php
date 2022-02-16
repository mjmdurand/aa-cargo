<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <title>Actual Cargo Ship Location</title> 
    <link rel="stylesheet" href="style.css">
    <link rel="icon" type="image/png" href="favicon.png" />

    <!-- Bootstrap core CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>


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
  <body onload="autostart()">

<?php 
try
{
	$bdd = new PDO('mysql:host=localhost;dbname=archeageapp', 'archeageapp', '7NrsXnmmkhmT');
}
catch (Exception $e)
{
        die('Erreur : ' . $e->getMessage());
}

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

    <!-- <div class="card w-auto" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">Important</h5>
        <h6 class="card-subtitle mb-2 text-muted">2021-12-10</h6>
        <ul class="list-group list-group-flush">
          <li class="list-group-item list-group-item-danger"><span data-feather="chevron-right"></span>BUG</li>
          <li class="list-group-item list-group-item-danger"><span data-feather="chevron-right"></span>There is a cookie management issue at 1st load.</li>
          <li class="list-group-item list-group-item-warning"><span data-feather="chevron-right"></span>To fix it, just reload (F5) the website.</li>
          <li class="list-group-item list-group-item-success"><span data-feather="chevron-right"></span>Seems fixed now.</li>
        </ul>
      </div>
    </div> -->


      <div class="card w-auto" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">Last news</h5>

        <h6 class="card-subtitle mb-2 text-muted">2021-12-25</h6>
        <ul class="list-group list-group-flush">
          <li class="list-group-item"><span data-feather="chevron-right"></span>Merry christmas ! May Nebe bless you.</li>
        </ul>
<br/>
        <h6 class="card-subtitle mb-2 text-muted">2021-11-22</h6>
        <ul class="list-group list-group-flush">
          <li class="list-group-item"><span data-feather="chevron-right"></span>Server list update for Kakao Games</li>
        </ul>
      </div>
    </div> 

     <div class="card w-auto" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">Last script update</h5>

        <h6 class="card-subtitle mb-2 text-muted">2021-12-25</h6>
        <ul class="list-group list-group-flush">
          <li class="list-group-item"><span data-feather="chevron-right"></span>Finally fix all the cookies issues</li>
          <li class="list-group-item"><span data-feather="chevron-right"></span>Servers can now be splitted/merged without any cookie issue</li>
          <li class="list-group-item"><span data-feather="chevron-right"></span>1st Load cookie issue is now fixed</li>
        </ul>
        <br/>

        <h6 class="card-subtitle mb-2 text-muted">2021-11-22</h6>
        <ul class="list-group list-group-flush">
          <li class="list-group-item"><span data-feather="chevron-right"></span>Adding new Kakao Games servers</li>
          <li class="list-group-item"><span data-feather="chevron-right"></span>Gamigo servers will be removed when 1st update is done for new servers</li>
          <li class="list-group-item"><span data-feather="chevron-right"></span>Adding discord link</li>
        </ul>
        <br/>

        <h6 class="card-subtitle mb-2 text-muted">2021-03-24</h6>
        <ul class="list-group list-group-flush">
          <li class="list-group-item"><span data-feather="chevron-right"></span> Keep last selected server in memory</li>
          <li class="list-group-item"><span data-feather="chevron-right"></span> Adding russian language</li>
          <li class="list-group-item"><span data-feather="chevron-right"></span> Adding russian server</li>
        </ul>
      </div>
    </div>

    <div class="position-sticky pt-3">
        <ul class="nav flex-column">
          <!--- <li class="nav-item">
            <a class="nav-link" aria-current="page" href="#">
              <span data-feather="user"></span>
              Sign In to update 
            </a>
          </li> -->
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="https://discord.gg/Fhfe98S346" target="_blank">
              <span data-feather="message-square"></span>
              Feel free to join <b>the developpement discord</b> if you wanna submit timers.
            </a>
          </li>
          
        </ul>
      </div>


  </nav>


    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2" id="mainTitle">Actual cargo ship location</h1>
        <div class="form-group">
    <label for="server" class="visually-hidden">Choose a server :</label>
  <select id="server" class="form-select">

  <?php

$recup_infos_server_req=$bdd->query("SELECT * FROM timers WHERE available =1 ORDER BY server_description");
$loop = 0;
while($recup_infos_server = $recup_infos_server_req->fetch())
{
    //set the default server
    if (!isset($_COOKIE['defaultServer']) OR (isset($_COOKIE['defaultServer']) AND empty ($_COOKIE['defaultServer'])))
    {
      $_COOKIE['defaultServer'] = $recup_infos_server['id'];
    }

  if (isset($_COOKIE['defaultServer']) AND !empty ($_COOKIE['defaultServer']) AND $_COOKIE['defaultServer'] == $recup_infos_server['id'] ){echo '<option value="'.$recup_infos_server['id'].'" selected>'.$recup_infos_server['server_description'].'</option>'; $loop++;}
  else {echo '<option value="'.$recup_infos_server['id'].'">'.$recup_infos_server['server_description'].'</option>';}
}
$recup_infos_server_req -> closeCursor();

?> 
</select>

<?php
//set the default values in hidden input
$recup_infos_server_req=$bdd->query("SELECT * FROM timers WHERE available =1 ORDER BY server_description");
while($recup_infos_server = $recup_infos_server_req->fetch())
{
  $starting_date= date('Y-m-d\TH:i:s\Z',  $recup_infos_server['timestamp']);
  echo '<input type="hidden" id="settingDateServer'.$recup_infos_server['id'].'" value="'.$starting_date.'"/> <input type="hidden" id="startingPointServer'.$recup_infos_server['id'].'" value="'.$recup_infos_server['starting_point'].'"/>';
}
$recup_infos_server_req -> closeCursor();


//set the default displayed server
$recup_infos_server_req=$bdd->query("SELECT * FROM timers WHERE available =1 ORDER BY server_description");
$loop = 0;
while($recup_infos_server = $recup_infos_server_req->fetch())
{
  if (isset($_COOKIE['defaultServer']) AND !empty ($_COOKIE['defaultServer']) AND $_COOKIE['defaultServer'] == $recup_infos_server['id'])
  {
  echo '
  <script>
  var server = "settingDateServer'.$_COOKIE['defaultServer'].'";
  var point = "startingPointServer'.$_COOKIE['defaultServer'].'";
  </script>
  ';
  $loop++;
  }
}
$recup_infos_server_req -> closeCursor();


if ($loop == 0)
{
    $recup_infos_server_req=$bdd->query("SELECT * FROM timers WHERE available =1 ORDER BY server_description");
    $recup_infos_server = $recup_infos_server_req->fetch();
    echo '
    <script>
    //test
    var server = "settingDateServer'.$recup_infos_server['id'].'";
    var point = "startingPointServer'.$recup_infos_server['id'].'";
    </script>
    ';
}
$recup_infos_server_req -> closeCursor();

?> 
</div> 
      </div>
        <div id="displayGui" class="fs-6 text">
        <div id="debug"></div>
        <div id="serverName">
          <h5 id="currentServerName">Server Name</h5>
          <div id="lastUpdate">Last update : no informations</div>
        </div>
        <div id="currentShipLocation">        
          <span id="currentShipLocationTitle">Current Ship location : </span><h2 id="actualStatus">No informations</h2>
          <div id="currentLoop">
            <div id="currentArrivalTime">Arrival : <h2 id="arrivalTime">No arrival informations</h2></div>
            <div id="currentDepartureTime">Departure : <h2 id="departureTime">No departure informations</h2></div>
            <div id="leavingTime">No informations</div>
          </div>
        </div>
    
    
        <div id="nextArrivals">
          <div id="nextLoop">
            <div id="nextArrivalTwoCrown"><span id="nextArrivalTwoCrownTitle">Next arrival in Two Crowns (Nuia) : </span><h2 id="nextArrivalTwoCrownTime">No arrival informations </h2></div>
            <div id="nextArrivalSolis"><span id="nextArrivalSolisTitle">Next arrival in Solis (Haranya) : </span><h2 id="nextArrivalSolisTime">No departure informations </h2></div>
          </div>

          <div id="nextRemainingTimers">
            <div id="nextArrivalTwoCrownRemainingTime">No informations</div>
            <div id="nextArrivalSolisRemainingTime">No informations</div>
          </div>
        </div>
        
        <div id="progressBar" >  
          <ul id="movingInformations">
            <li id="departureTimeProgress">No arrival informations</li>
            <li id="arrivalTimeProgress">No departure informations</li>
          </ul>
          <div id="myProgress" class="progress">
            <div id="myBar" class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
      </div>
      

      <button class="btn btn-dark" type="button" data-bs-toggle="collapse" data-bs-target="#mapCollapse" aria-expanded="false" aria-controls="mapDisplay2">Show/Hide live map</button>
      <div class="collapse img-fluid" id="mapCollapse">
<div id="mapDisplay" class="img-fluid"></div>
  
      </div>
    </main>

     <script src="https://cdn.jsdelivr.net/npm/feather-icons@4.28.0/dist/feather.min.js" integrity="sha384-uO3SXW5IuS1ZpFPKugNNWqTZRRglnUJK6UAZ/gxOX80nxEkN9NcGZTftn6RzhGWE" crossorigin="anonymous"></script><script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js" integrity="sha384-zNy6FEbO50N+Cg5wap8IKA4M/ZnLJgzc6w2NqACZaK0u0FXfOWRRJOnQtpZun8ha" crossorigin="anonymous"></script>
 <script src="display_gui.js"></script>
  </body>
</html>
