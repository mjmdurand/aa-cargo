<?php
include('auth.php');
include('check_auth.php');
include('add_user.php');

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
    <title>Admin panel · Register</title>
   

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
  <form method="POST" class="needs-validation" novalidate>
    <img class="mb-4" src="aa-logo.png" alt="" width="105" height="105">
    <h1 class="h3 mb-3 fw-normal">Sign up</h1>

    <label for="inputEmail" class="visually-hidden">Email adress</label>
    <div class="input-group has-validation">
      <span class="input-group-text">@</span>
      <input type="email" id="inputEmail" name="inputEmail" class="form-control" placeholder="Email adress" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required autofocus>
    </div>
    
    <label for="discordTag" class="visually-hidden">Discord tag</label>
    <div class="input-group has-validation">
      <span class="input-group-text">#</span>
      <input type="text" id="discordTag" name="discordTag" class="form-control" placeholder="Discord tag : Nickname#1234" pattern="[A-Za-z0-9+]+#[0-9]{2,4}$" required>
    </div>
    <br/>
    <label for="inputPassword" class="visually-hidden">Password</label>
    <div class="form-group has-validation">
      <input type="password" id="inputPassword" name="inputPassword" class="form-control" placeholder="Password" pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{8,}$" required>
    </div>

    <label for="confirmInputPassword" class="visually-hidden">Confirm password</label>
    <div class="form-group has-validation">
      <input type="password" id="confirmInputPassword" name="confirmInputPassword" class="form-control" placeholder="Confirm password" pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{8,}$" required>
    </div>
    
    <small id="passwordHelpBlock" class="form-text text-muted">8 characters, at least one number, one uppercase and one lowercase.</small>
    
    <br/><br/>


    
    
    <button class="w-100 btn btn-lg btn-primary" type="submit">Sign up</button>
    Already have an account ? <a href="index.php">Log In</a>
    <p class="mt-5 mb-3 text-muted">&copy; 2021</p>
  </form>
</main>

<script src="../assets/dist/js/bootstrap.bundle.min.js"></script>

<script>
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()

(function () {
  'use strict'

  feather.replace()


})()
</script>
    
<script src="https://cdn.jsdelivr.net/npm/feather-icons@4.28.0/dist/feather.min.js" integrity="sha384-uO3SXW5IuS1ZpFPKugNNWqTZRRglnUJK6UAZ/gxOX80nxEkN9NcGZTftn6RzhGWE" crossorigin="anonymous"></script><script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js" integrity="sha384-zNy6FEbO50N+Cg5wap8IKA4M/ZnLJgzc6w2NqACZaK0u0FXfOWRRJOnQtpZun8ha" crossorigin="anonymous"></script>

  </body>
</html>
