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


});
  alert('Train Added')

  $('#trainName').val('');
  $('#destination').val('');
  $('#firstTrain').val('');
  $('#freq').val('');


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

  // Add each train's data into the table
  $("#trainTable > tbody").append("<tr><td>" + tName + "</td><td>" + tDest + "</td><td>" + tFreq + "</td><td>" + tFirst);
})


   // + "</td><td>") + t + "</td><td>" + empRate + "</td><td>" + empBilled + "</td></tr>"





