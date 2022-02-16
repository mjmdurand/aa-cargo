/* globals Chart:false, feather:false */

(function () {
  'use strict'

  feather.replace()


})()

var timeControl = document.querySelector('input[type="time"]');
var dateControl = document.querySelector('input[type="date"]');
var currentTime = new Date();
var testdate = new Date(2021, 02, 09, 20, 32, 00);
//debug.textContent = "timezone = " + currentTime.getTimezoneOffset()*60 + " seconds :: Current timestamp  = " + Math.trunc(testdate.getTime()/1000+(currentTime.getTimezoneOffset()*60));
settingTimezone.value = currentTime.getTimezoneOffset()*60;


var nowDay = currentTime.getDate();
var nowMonth = currentTime.getMonth();
var nowYear = currentTime.getFullYear();
var nowHour = currentTime.getHours();
var nowMins = currentTime.getMinutes();
var nowSecs = currentTime.getSeconds();
nowMonth++;

dtMonth = (nowMonth < 10 ? '0' : '') + nowMonth;
dtDay = (nowDay < 10 ? '0' : '') + nowDay;
dtHours = (nowHour < 10 ? '0' : '') + nowHour;
dtMinutes = (nowMins < 10 ? '0' : '') + nowMins;
dtSeconds = (nowSecs < 10 ? '0' : '') + nowSecs;



timeControl.value = dtHours+':'+dtMinutes+':'+dtSeconds;
dateControl.value= nowYear + "-" + dtMonth + "-" + dtDay;
