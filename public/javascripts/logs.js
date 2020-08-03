"use strict";

var map;

var lats = [];
var longs = [];
var times = [];
var diff = [];
var count = [];
var diffL = [];
var ts = [];
var temp;
var tempL;
var tempCount;
var index = 0;

var lt = [];
var lg = [];
var tt = [];

var avg = [];
var avgL = [];
var counter = [];
var timeArr = [];

var inWindow;

fetch('http://localhost:3000/logs/missiles').then(function (response) {
  response.text().then(function (text) {
    const missileLogs = JSON.parse(text);
    //console.log(missileLogs);
    missileLogs.forEach(missile => {
      const { location, time } = missile;
      const lat = parseFloat(location.substring(1, location.indexOf(",")));
      const long = parseFloat(location.substring(location.indexOf(",") + 1, location.indexOf(")")));

      lats.push(lat);
      longs.push(long);
      times.push(time.substring(time.indexOf(",") + 2, time.indexOf("M") - 2));
      ts.push(time.substring(time.indexOf(",") + 2, time.length));
      diff.push(0);
      diffL.push(0);
      count.push(0);

      placeMarker(lat, long, time);

    });
    stats();
  });
});

function initMap() {

  const start = {
    lat: 25,
    lng: 0
  };
  
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 2,
    center: start
  });
  inWindow = new google.maps.InfoWindow;
}

function placeMarker(lat, long, time) {

  const contentString =
      //here we set the message when u hover over the pointer
      '<div id="content">' +
      '<div id="siteNotice">' +
      "</div>" +
      `<h1 id="firstHeading" class="firstHeading">${ time }</h1>` +
      "</div>";
  
  const infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  const pin = {
    lat: lat,
    lng: long
  }

  var marker = new google.maps.Marker({
      position: pin,
      map,
      title: "Missle"
  });

    marker.addListener("mouseover", () => {
      infowindow.open(map, marker);
    });
    
    marker.addListener("mouseout", () => {
      infowindow.close();
    });
  
}

// it looks right to me
function stats() {

  var x = 0;

  for (var i = 0; i < lats.length; i++) {

    for (var j = 0; j < lats.length; j++) {

      if ((Math.abs(lats[i] - lats[j]) < 5 && Math.abs(lats[i] - lats[j]) != 0) && (Math.abs(longs[i] - longs[j]) < 5 && Math.abs(longs[i] - longs[j]) != 0)) {

        if (times[i][0] === times[j][0]) {

          console.log("Estimated strike: " + ts[j] + " at " + ((lats[i]+lats[j])/2) + ", " + ((longs[i]+longs[j])/2));
  
          var ltlg = {
            lat: ((lats[i]+lats[j])/2),
            lng: (longs[i]+longs[j])/2
          }

          inWindow.setPosition(ltlg);
          inWindow.setContent(`Estimated Strike at ${ts[j]} EST`);
          inWindow.open(map);

        }

        if (tempCount == 0) {

          tempCount += 1;
          temp = lats[i];
          tempL = longs[i];

        } 
          
        tempCount += 1;
        temp += lats[j];
        tempL += longs[j];

        if (tempCount > count[i]) {

          diff[i] = temp;
          diffL[i] = tempL;
          count[i] = tempCount;
        
        }

      } else {

      }

    }

    tempCount = 0;
    temp = 0;
    tempL = 0;

  }

  for (var x = 0; x < count.length; x++) {

    if (count[x] > 2) {

      index = x;

      var loc = [diff[index]/count[index], diffL[index]/count[index]];

      var lati = parseFloat(loc.toString().substring(0, loc.toString().indexOf(",")));
      var longi = parseFloat(loc.toString().substring(loc.toString().indexOf(",") + 1, loc.toString().length));

      //draw a circle of radius 10latLng

      var dense = {
        locate: {
          center: {
            lat: lati,
            lng: longi
          },
          rad: count[index]
        }
      };

      for (const locate in dense) {
        // Add the circle for this city to the map.
        const circle = new google.maps.Circle({
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.35,
          map,
          center: dense[locate].center,
          radius: Math.sqrt(dense[locate].rad) * 120000
        });
      }

    }

  }



  //placeMarker(lati, longi, "MOST POPULAR MISSLE LOCATION!!!!! TEST !!!!!!!!!!!");

}

