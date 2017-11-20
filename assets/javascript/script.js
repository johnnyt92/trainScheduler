var config = {
	apiKey: "AIzaSyAyk0-iznXLFIaWt3jz5YmkvC5i7YSZ78Y",
	authDomain: "fireb-fa3dd.firebaseapp.com",
	databaseURL: "https://fireb-fa3dd.firebaseio.com",
	projectId: "fireb-fa3dd",
	storageBucket: "",
	messagingSenderId: "433710964435"
};


firebase.initializeApp(config);

var database = firebase.database();

// Button for adding trains
$("#submit").on("click", function(event) {
	event.preventDefault();

  // Grabs user input
  var tName = $("#trainName").val().trim();
  var tDest = $("#destination").val().trim();
  var tFirst= moment($("#firstTrain").val().trim(), 'HH:MM').format('HH:MM');
  var tFreq = $("#freq").val().trim();

  var tNew = {
  	name: tName,
  	role: tDest,
  	start: tFirst,
  	freq: tFreq
  };


  database.ref().push(tNew);

  console.log(tNew.name);
  console.log(tNew.role);
  console.log(tNew.start);
  console.log(tNew.freq);


alert('Train Added')

$('#trainName').val('');
$('#destination').val('');
$('#firstTrain').val('');
$('#freq').val('');

});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var tName = childSnapshot.val().name;
  var tDest = childSnapshot.val().role;
  var tFirst = childSnapshot.val().start;
  var tFreq = childSnapshot.val().freq;

  // Employee Info
  console.log(tName);
  console.log(tFreq);
  console.log(tFirst);
  console.log(tFreq);


  var tArriv = moment().diff(moment.unix(tFreq, 'X'), "MM");


 // //Giving values to these variables
 

 var tFrequency= tFreq;
 var firstTrain= tFirst;

  // First time (pushed back 1 day to make sure it comes before current time and convert time)
  var firstTimeConverted = moment(tFirst, "hh:mm").subtract(1, "days");
  console.log(firstTimeConverted);
  //current time

  var currentTime = moment();
  console.log("Current Time: " + moment(currentTime).format("hh:mm"));
  // Difference between the times

  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("Difference in time: " + diffTime);

  var tRemainder = diffTime % tFrequency;
  console.log(tRemainder);

  var tMinutesTillTrain= tFrequency - tRemainder;
  console.log("Minutes till train: " + tMinutesTillTrain);


  $("#trainTable > tbody").append("<tr><td>" + tName + "</td><td>" + tDest + "</td><td>" + tFreq 
   + "</td><td>" + tFirst + "</td></tr>" + tMinutesTillTrain);

});