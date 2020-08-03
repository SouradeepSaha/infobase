"use strict";

let missileLog = {};
var marker;

// This example displays a marker at the center of Australia.
// When the user clicks the marker, an info window opens.
function initMap() {

  const start = {
    lat: 25,
    lng: 0
  };

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 2,
    center: start
  });

  google.maps.event.addListener(map, "click", event => {

    const curTime = new Date().toLocaleString();
    console.log(curTime);
    missileLog = {
      location: event.latLng,
      time: curTime
    };
    addMarker(event.latLng, map);
  });
}


function addMarker(location, map) {
  // Add the marker at the clicked location, and add the next-available label
  // from the array of alphabetical characters.
  if (!marker || !marker.setPosition) {
    marker = new google.maps.Marker({
      position: location,
      map: map,
    });
  } else {
    marker.setPosition(location);
  }
}

function logMissles() {

  if (missileLog.location === undefined || missileLog.time === undefined) {
    alert("Please select a location");
  }
  else {
    document.getElementById('location').value = missileLog.location;
    document.getElementById('time').value = missileLog.time;
    document.getElementById('missileSubmit').submit();
  }
}
