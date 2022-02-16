<?php
include('auth.php');
include('check_auth.php');

if ($validite_auth == '1')
{
    header('Location:dashboard.php');
    exit();
}

?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <title>Admin panel · Login</title>
   

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
    <link href="signin.css" rel="stylesheet">
  </head>
  <body class="text-center">
    
<main class="form-signin">
  <form method="POST">
    <img class="mb-4" src="aa-logo.png" alt="" width="105" height="105">
    <h1 class="h3 mb-3 fw-normal">Sign in</h1>
    <a href="#">Forgot your password ?</a>
    <label for="login" class="visually-hidden">ID or email adress</label>
    <input type="text" id="login" name="login" class="form-control" placeholder="ID or email adress" required autofocus>
    <label for="Password" class="visually-hidden">Password</label>
    <input type="password" id="password" name="password" class="form-control" placeholder="Password" required>
    <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
    <div class="checkbox mb-3">
      <label>
        <input type="checkbox" value="true" name="remember-me"> Remember me
      </label>
    </div>
    Need an account ? <a href="register.php">Register</a>
    <p class="mt-5 mb-3 text-muted">&copy; 2021</p>
  </form>
</main>


    
  </body>
</html>
