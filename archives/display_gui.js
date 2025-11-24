/*
=> Values for starting point are : 
1 = Sailing to Solis
2 = Docked at Solis
3 = Sailing to Two Crown
4 = Docked at Two Crown

!!! USE UTC TIME !!!
YYYY-MM-DDTHH:MM:SSZ => T char separate date and hour ; Z char mean UTC Time
YYYY-MM-DDTHH:MM:SS+05:00 => T char separate date and hour ; +05:00 mean UTC +5
*/
const selectElement = document.getElementById("server");
selectElement.addEventListener('change', (event) => {
  server = "settingDateServer"+event.target.value;
  point = "startingPointServer"+event.target.value;
  error = "";
    //for russian language
    if (server == 'settingDateServer6')
    {
      russian = 1;
    }
    else if (server != 'settingDateServer6')
    {
      russian = 0;
    }
    document.cookie = "defaultServer="+event.target.value+";max-age=31536000";
  //debug.textContent = "settingDateServer"+event.target.value;
  
});

var russian = 0;

if (document.cookie.split(';').some(function(item) {return item.indexOf('defaultServer=6') >= 0})) 
{
  russian = 1;
}
else
{
  russian = 0;
}

var settingDate;
var startingDate;
//var startingDate = new Date("2020-12-29T14:04:10+01:00");
//var startingDate = new Date("2020-12-11T22:19:20Z");
//var startingPoint = 1;
var startingPoint;

var error;

var globalDate = new Date();
var startingTimestamp;
var i = 0;

var nowDay = globalDate.getDate();
var nowMonth = globalDate.getMonth();
var nowYear = globalDate.getFullYear();
var nowHour = globalDate.getHours();
var nowMins = globalDate.getMinutes();
var nowSecs = globalDate.getSeconds();

nowMonth++;
var nowFullDay = nowYear + "-" + nowMonth + "-" + nowDay;

var elem = document.getElementById("myBar");
var elem2 = document.getElementById("leavingTime");
var statusShip = document.getElementById("actualStatus");
var debug = document.getElementById("debug");
var nbreLoop = 0;
var status = 0;

var loop;
var currentFrame;
var currentFrameCheck;

var dtHours;
var dtMinutes;
var dtSeconds;
var ajustTimer;
var abort;
var secondsElapsed;
var nombreCycles;
var positionActuelle;
var newFullDay;
var newHour;
var newMins;
var newSecs;
var newStart;
var nowTimestamp;


var calcLeavingTime;
var calcArrivingTime;
var leavingTime;
var arrivingTime;

var id;
var width = 0;
var timeLeft;

var nextArrivalSolis;
var nextArrivalTwoCrown;

var calcNextArrivalSolis;
var calcNextArrivalTwoCrown;
var calcNextArrivalSolisRemainingTime;
var calcNextArrivalTwoCrownRemainingTime;

function autostart() {
  abort = false;
  start();
  move();
}

function start() {
  //debug.textContent = document.getElementById(server).value; + " " + document.getElementById(point).value;;
  globalDate = new Date();
  nowTimestamp = Date.parse(globalDate);
  settingDate= document.getElementById(server).value;
  startingDate = new Date(settingDate);
  startingPoint = document.getElementById(point).value;
  startingTimestamp = Date.parse(startingDate);

  secondsElapsed = (nowTimestamp - startingTimestamp) / 1000;
  nombreCycles = Math.trunc(secondsElapsed / 3669);
  positionActuelle = secondsElapsed - (nombreCycles * 3669);
  ajustTimer = Math.trunc(nombreCycles / 2);

  if (loop == undefined)
  {
    loop = startingPoint;     
  }

  if (settingDate == "1970-01-01T00:00:00Z")
  {
    error = "unset";    
    //debug.textContent = "unset "+settingDate;
  }


  currentFrame = positionActuelle+ ajustTimer;;

  //Loop start from sailing to solis
  if (currentFrame <= 648 && startingPoint == 1) { loop = 1; }
  else if (currentFrame > 648 && currentFrame <= 1848 && startingPoint == 1) { loop = 2; currentFrame = currentFrame - 648; }
  else if (currentFrame > 1848 && currentFrame <= 2469 && startingPoint == 1) { loop = 3; currentFrame = currentFrame - 1848; }
  else if (currentFrame > 2469 && currentFrame <= 3669 && startingPoint == 1) { loop = 4; currentFrame = currentFrame - 2469; }
  else if (currentFrame > 3669 && startingPoint == 1) { loop = 1; currentFrame = currentFrame - 3669; }

  //Loop start from docked at solis
  if (currentFrame <= 1200 && startingPoint == 2) { loop = 2; }
  else if (currentFrame > 1200 && currentFrame <= 1821 && startingPoint == 2) { loop = 3; currentFrame = currentFrame - 1200; }
  else if (currentFrame > 1821 && currentFrame <= 3021 && startingPoint == 2) { loop = 4; currentFrame = currentFrame - 1821; }
  else if (currentFrame > 3021 && currentFrame <= 3669 && startingPoint == 2) { loop = 1; currentFrame = currentFrame - 3021; }
  else if (currentFrame > 3669 && startingPoint == 2) { loop = 2; currentFrame = currentFrame - 3669; }

  //Loop start from sailing to  two crown
  if (currentFrame <= 621 && startingPoint == 3) { loop = 3; }
  else if (currentFrame > 621 && currentFrame <= 1821 && startingPoint == 3) { loop = 4; currentFrame = currentFrame - 621; }
  else if (currentFrame > 1821 && currentFrame <= 2469 && startingPoint == 3) { loop = 1; currentFrame = currentFrame - 1821; }
  else if (currentFrame > 2469 && currentFrame <= 3669 && startingPoint == 3) { loop = 2; currentFrame = currentFrame - 2469; }
  else if (currentFrame > 3669 && startingPoint == 3) { loop = 3; currentFrame = currentFrame - 3669; }

  //Loop start from docked at two crown  
  if (currentFrame <= 1200 && startingPoint == 4) { loop = 4; }
  else if (currentFrame > 1200 && currentFrame <= 1848 && startingPoint == 4) { loop = 1; currentFrame = currentFrame - 1200; }
  else if (currentFrame > 1848 && currentFrame <= 3048 && startingPoint == 4) { loop = 2; currentFrame = currentFrame - 1848; }
  else if (currentFrame > 3048 && currentFrame <= 3669 && startingPoint == 4) { loop = 3; currentFrame = currentFrame - 3048; }
  else if (currentFrame > 3669 && startingPoint == 4) { loop = 4; currentFrame = currentFrame - 3669; }
}

function displayHour(dt, htmlToUpdate) {
  dtHours = (dt.getHours() < 10 ? '0' : '') + dt.getHours();
  dtMinutes = (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes();
  dtSeconds = (dt.getSeconds() < 10 ? '0' : '') + dt.getSeconds();

  htmlToUpdate.innerHTML = dtHours + ":" + dtMinutes + ":" + dtSeconds;
}

function displayTimers() {
  start();

  //debug.innerHTML = "Current status = " + loop + " <br/>Current loop = " + (currentFrame + ajustTimer) + "<br/>Reference starting time :  " + startingDate + "<br/>Reference starting point: " + startingPoint;

  //arrival timestamp for current loop
  calcArrivingTime = nowTimestamp - (currentFrame* 1000);

  //Calculate differents timers for all ship trips/positions
  switch (loop) {
    case 1:
      calcLeavingTime = calcArrivingTime + 648000;
      calcNextArrivalSolis = calcLeavingTime;
      calcNextArrivalTwoCrown = calcLeavingTime + 1821000;
      break;

    case 2:
      calcLeavingTime = calcArrivingTime + 1200000;
      calcNextArrivalSolis = calcLeavingTime + 2469000;
      calcNextArrivalTwoCrown = calcLeavingTime + 621000;
      break;

    case 3:
      calcLeavingTime = calcArrivingTime + 621000;
      calcNextArrivalSolis = calcLeavingTime + 1848000;
      calcNextArrivalTwoCrown = calcLeavingTime;
      break;

    case 4:
      calcLeavingTime = calcArrivingTime + 1200000;
      calcNextArrivalSolis = calcLeavingTime + 648000;
      calcNextArrivalTwoCrown = calcLeavingTime + 2469000;
      break;
  }
  arrivingTime = new Date(calcArrivingTime);
  leavingTime = new Date(calcLeavingTime);

  nextArrivalSolis = new Date(calcNextArrivalSolis);
  nextArrivalTwoCrown = new Date(calcNextArrivalTwoCrown);

  calcNextArrivalSolis = Math.trunc((calcNextArrivalSolis - nowTimestamp) / 1000 / 60);
  calcNextArrivalTwoCrown = Math.trunc((calcNextArrivalTwoCrown - nowTimestamp) / 1000 / 60);
  timeLeft = Math.trunc((calcLeavingTime - nowTimestamp) / 1000 / 60);

  statusShip.style.backgroundColor = "transparent";
  elem2.style.backgroundColor = "transparent";


  if (russian == 0)
  {
  currentServerName.textContent = "Current server : "+selectElement.options[selectElement.selectedIndex].innerHTML;
  mainTitle.innerHTML = 'Actual cargo ship location';
  currentShipLocationTitle.innerHTML = 'Current Ship location : ';
  currentArrivalTime.innerHTML = 'Arrival : <h2 id="arrivalTime">No arrival informations</h2>';
  currentDepartureTime.innerHTML = 'Departure : <h2 id="departureTime">No departure informations</h2>';
  nextArrivalTwoCrownTitle.innerHTML = 'Next arrival in Two Crowns (Nuia) : ';
  nextArrivalSolisTitle.innerHTML = 'Next arrival in Solis (Haranya) : ';
  }
  else if (russian == 1)

  { 
    currentServerName.textContent = "текущий сервер : "+selectElement.options[selectElement.selectedIndex].innerHTML;
    mainTitle.innerHTML = 'Фактическое местонахождение грузового судна';
    currentShipLocationTitle.innerHTML = 'Текущее местоположение корабля : ';
    currentArrivalTime.innerHTML = 'отъезд : <h2 id="arrivalTime">нет информации о прибытии </h2>';
    currentDepartureTime.innerHTML = 'прибытие : <h2 id="departureTime">нет информации об отправлении</h2>';
    nextArrivalTwoCrownTitle.innerHTML = 'Следующее прибытие в Две Короны (Нуя) : ';
    nextArrivalSolisTitle.innerHTML = 'Следующее прибытие в Полуостров Рассвета (Харния) : ';
  }


    //displaying ETA of ship 
    switch (loop) {
      case 1:
        if (russian == 0)
        { 
        statusShip.innerHTML = "Sailing to Solis";
        }
        else if (russian == 1)
        {
          statusShip.innerHTML = "плывущий к Полуостров Рассвета";
        }
        statusShip.style.color = "#1e90ff";
        arrivalTime.style.color = "#1e90ff";
        departureTime.style.color = "#1e90ff";
        currentShipLocation.style.borderColor = "#1e90ff";
        elem2.style.color = "#1e90ff";
        break;
  
      case 2:
        if (russian == 0)
        { 
        statusShip.innerHTML = "Docked at Solis";
        }
        else if (russian == 1)
        {
          statusShip.innerHTML = "пристыкован к Полуостров Рассвета";
        }
        statusShip.style.color = "red";
        arrivalTime.style.color = "red";
        departureTime.style.color = "red";
        currentShipLocation.style.borderColor = "red";
        elem2.style.color = "red";
        break;
  
      case 3:
        if (russian == 0)
        { 
        statusShip.innerHTML = "Sailing to Two Crown";
        }
        else if (russian == 1)
        {
          statusShip.innerHTML = "плывущий к Две Короны";
        }
        statusShip.style.color = "#1e90ff";
        arrivalTime.style.color = "#1e90ff";
        departureTime.style.color = "#1e90ff";
        currentShipLocation.style.borderColor = "#1e90ff";
        elem2.style.color = "#1e90ff";
        break;
  
      case 4:
        if (russian == 0)
        { 
        statusShip.innerHTML = "Docked at Two Crown"
        }
        else if (russian == 1)
        {
          statusShip.innerHTML = "пристыкован к Две Короны";
        }
        statusShip.style.color = "green";
        arrivalTime.style.color = "green";
        departureTime.style.color = "green";
        currentShipLocation.style.borderColor = "green";
        elem2.style.color = "green";
        break;
    }
  
    if (error == "unset" && russian == 0) { lastUpdate.innerHTML = "Last update : Not set"; statusShip.innerHTML = "Not updated since last maintenance<br>Please share your current timer in <a href=\"https://discord.gg/Fhfe98S346\" class=\"text-decoration-none\">the discord server</a>.";}
    if (error == "unset" && russian == 1) { lastUpdate.innerHTML = "Last update : Not set"; statusShip.innerHTML = "Not updated since last maintenance<br>Please share your current timer in <a href=\"https://discord.gg/Fhfe98S346\" class=\"text-decoration-none\">the discord server</a>.";}
    else { 
      if (russian == 0) 
      {lastUpdate.innerHTML = "Last update : "+startingDate;}
      else if (russian == 1) 
      {lastUpdate.innerHTML = "последнее обновление : "+startingDate;}
    }
  

  //Displaying clock
  if (error != "unset")
  {
  //Current trip
  displayHour(arrivingTime, arrivalTime);
  displayHour(leavingTime, departureTime);
  //Next ship clock
  displayHour(nextArrivalSolis, nextArrivalSolisTime);
  displayHour(nextArrivalTwoCrown, nextArrivalTwoCrownTime);
  //Progress bar
  displayHour(arrivingTime, departureTimeProgress);
  displayHour(leavingTime, arrivalTimeProgress);
  }
  else
  {
    arrivalTime.innerHTML = "Not set";
    departureTime.innerHTML = "Not set";
    nextArrivalSolisTime.innerHTML = "Not set";
    nextArrivalTwoCrownTime.innerHTML = "Not set";
    departureTimeProgress.innerHTML = "Not set";
    arrivalTimeProgress.innerHTML = "Not set";
  }


  //displaying timers in mins
  //Current timer
  if (timeLeft != 0 && timeLeft != 1 && error != "unset" && russian == 0) { elem2.innerHTML = "in " + timeLeft + " minutes"; elem.innerHTML = "in " + timeLeft + " minutes";}
  else if (timeLeft == 1 && error != "unset"  && russian == 0) { elem2.innerHTML = "in 1 minute"; elem.innerHTML = "in 1 minute"; }
  else if (timeLeft == 0 && error != "unset"  && russian == 0) { elem2.innerHTML = "less than 1 minute"; elem.innerHTML = "less than 1 minute"; }
  else if (error == "unset") { elem2.innerHTML = "Not set"; }

  //Current timer russian display
  else if (timeLeft != 0 && timeLeft != 1 && error != "unset" && russian == 1) { elem2.innerHTML = "через " + timeLeft + " минут "; elem.innerHTML = "через " + timeLeft + " минут ";}
  else if (timeLeft == 1 && error != "unset"  && russian == 1) { elem2.innerHTML = "через 1 минуту"; elem.innerHTML = "через 1 минуту"; }
  else if (timeLeft == 0 && error != "unset"  && russian == 1) { elem2.innerHTML = "менее 1 минуты"; elem.innerHTML = "менее 1 минуты"; }

  //Next ship timer next solis
  if (calcNextArrivalSolis != 0 && calcNextArrivalSolis != 1 && error != "unset"  && russian == 0) { nextArrivalSolisRemainingTime.innerHTML = "in " + calcNextArrivalSolis + " minutes"; }
  else if (calcNextArrivalSolis == 1 && error != "unset"  && russian == 0) { nextArrivalSolisRemainingTime.innerHTML = "in 1 minute"; }
  else if (calcNextArrivalSolis == 0 && error != "unset"  && russian == 0) { nextArrivalSolisRemainingTime.innerHTML = "less than 1 minute"; }
  else if (error == "unset") { nextArrivalSolisRemainingTime.innerHTML = "Not set"; }
  
  //Next ship timer next solis russian display
  else if (calcNextArrivalSolis != 0 && calcNextArrivalSolis != 1 && error != "unset"  && russian == 1) { nextArrivalSolisRemainingTime.innerHTML = "через " + calcNextArrivalSolis + " минут"; }
  else if (calcNextArrivalSolis == 1 && error != "unset"  && russian == 1) { nextArrivalSolisRemainingTime.innerHTML = "через 1 минуту"; }
  else if (calcNextArrivalSolis == 0 && error != "unset"  && russian == 1) { nextArrivalSolisRemainingTime.innerHTML = "менее 1 минуты"; }

 //Next ship timer next 2 crown
  if (calcNextArrivalTwoCrown != 0 && calcNextArrivalTwoCrown != 1 && error != "unset" && russian == 0) { nextArrivalTwoCrownRemainingTime.innerHTML = "in " + calcNextArrivalTwoCrown + " minutes"; }
  else if (calcNextArrivalTwoCrown == 1 && error != "unset" && russian == 0) { nextArrivalTwoCrownRemainingTime.innerHTML = "in 1 minute"; }
  else if (calcNextArrivalTwoCrown == 0 && error != "unset" && russian == 0) { nextArrivalTwoCrownRemainingTime.innerHTML = "less than 1 minute"; }
  else if (error == "unset") { nextArrivalTwoCrownRemainingTime.innerHTML = "Not set"; }


 //Next ship timer next 2 crown russian display
 else if (calcNextArrivalTwoCrown != 0 && calcNextArrivalTwoCrown != 1 && error != "unset" && russian == 1) { nextArrivalTwoCrownRemainingTime.innerHTML = "через " + calcNextArrivalTwoCrown + " минут"; }
 else if (calcNextArrivalTwoCrown == 1 && error != "unset" && russian == 1) { nextArrivalTwoCrownRemainingTime.innerHTML = "через 1 минуту"; }
 else if (calcNextArrivalTwoCrown == 0 && error != "unset" && russian == 1) { nextArrivalTwoCrownRemainingTime.innerHTML = "менее 1 минуты"; }


  //progress bar 
  if ((loop == 1 && currentFrame >= 648) || (loop == 2 && currentFrame >= 1200) || (loop == 3 && currentFrame >= 621) || (loop == 4 && currentFrame >= 1200) || (error == "unset")) {
    width = 0;
  }

  else {
    if (loop == 1 && currentFrame <= 648) { width = currentFrame * 100 / 648; }
    else if (loop == 2 && currentFrame <= 1200) { width = currentFrame * 100 / 1200; }
    else if (loop == 3 && currentFrame <= 621) { width = currentFrame* 100 /621; }
    else if (loop == 4  && currentFrame <= 1200) { width = currentFrame* 100 / 1200; }
    else { width = 100; }
  }


  elem.style.width = width + "%";
  //elem.innerHTML = Math.trunc(width) + "%";


  //map display
  
  if ((loop == 1 && currentFrame <= 630) || (loop == 3 && currentFrame <= 595)){
    
    var  nbrePicture= Math.trunc(currentFrame/5);
    if (loop == 1){}
    if (loop == 3){ nbrePicture = nbrePicture + 126;}


    var urlPicture = "url('ship/"+nbrePicture+".jpg')";
    document.getElementById("mapDisplay").style.backgroundImage = urlPicture;
  }

  if (loop == 2  || loop == 4){
    
    var  nbrePicture;
    if (loop == 2){ nbrePicture = 126;}
    if (loop == 4){ nbrePicture = 1;}


    var urlPicture = "url('ship/"+nbrePicture+".jpg')";
    document.getElementById("mapDisplay").style.backgroundImage = urlPicture;

  }
  
  /*var nbrePicture = 100;
  var urlPicture = "url('ship/"+nbrePicture+".jpg')";
  document.getElementById("mapDisplay").style.backgroundImage = urlPicture;*/
}

function move() {
  if (i == 0) {
    i = 1;

    //1000 = 1 exe per second
    id = setInterval(frame, 1000);

    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      }

      else {
        displayTimers();
        

      }
    }
  }
}


/* globals Chart:false, feather:false */

(function () {
  'use strict'

  feather.replace()


})()
