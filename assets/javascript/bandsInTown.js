// Querying the bandsintown artist info api to display pics of similar bands in carousel
function searchArtistInfo (artist, index) {
  console.log(count);
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var searchArtistPic = response.thumb_url;
        var carousel = $("<a id='"+index+"' class='carousel-item' href='#one!'><img src ='"+ searchArtistPic + "'></a>");
         $(".carousel").append(carousel);
         count++;
         if(count === 10){
           $('.carousel-item').first().addClass('active');
           $('.carousel').carousel();
         }
    });
}

function search(artist) {
  // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
  var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
  $.ajax({
  url: queryURL,
  method: "GET"
  }).then(function(response) {
      // Constructing HTML containing the artist information
       var artistURL = $("<a>").attr("href", response.url).append(artist);
       var upcomingEvents = $("<h2>").text(response.length + " upcoming events");
       var goToArtist = $("<a>").attr("href", response.url).text("See Tour Dates");
      // Empty the contents of the artist-div, append the new artist content
      $("#artist-div").empty();
      $("#artist-div").append(artistURL, upcomingEvents);
  });
}

function listener(response, marker) {
  //Vars for the date and event times
  var datetime = (response[marker.index].datetime);
  var datetimeSplit = datetime.split("T");
  var eventDate = datetimeSplit[0]; //EVENT DATE
  var eventTime = datetimeSplit[1];

  //Content to be displayed in the window when marker is clicked
  var markerWindow ="<ul>"+
  "<li>" + "Artist: "       + marker.artist + "<li>" +
  "<li>" + "Venue: "        + response[marker.index].venue.name    + "<li>" +
  "<li>" + "City: "         + response[marker.index].venue.city    + "<li>" +
  "<li>" + "Region: "       + response[marker.index].venue.region  + "<li>" +
  "<li>" + "Country: "      + response[marker.index].venue.country + "<li>" +
  "<li>" + "When: "         + eventDate                            + "<li>" +
  "<li>" + "Time: "         + eventTime                            + "<li>" +
  "<li>" + "Tickets: "      +"<a target='_blank' href='"
                            + response[marker.index].offers[0].url+"'>Get Tickets</a><li>"
                            + "</ul>";

 //Create a new content window and set it to be the content saved for that specific marker
  eventinfoWindow = new google.maps.InfoWindow({
    content: markerWindow
  });
  //On a click open the content window for the specified marker
  eventinfoWindow.open(map, marker);
}

function similarArtistDiv(response,artist) {
  var datetime = (response.datetime);
  var datetimeSplit = datetime.split("T");
  var eventDate = datetimeSplit[0]; //EVENT DATE
  var eventTime = datetimeSplit[1];

  var eventInfoDiv = $("<div>");
  eventInfoDiv.addClass("col s3 m6");

  var eventInfoDiv2 = $("<div>");
  eventInfoDiv2.addClass("card blue-grey darken-1");

  var eventInfoDiv3 = $("<div>");
  eventInfoDiv3.addClass("card-content white-text");

  var eventInfoSpan =
  $("<span class = 'card-title'>" + artist + "</span>"
  + "<p>Venue: "    + response.venue.name    + "</p>"
  + "<p>Location: " + response.venue.city    + ", "
                    + response.venue.region  + ", "
                    + response.venue.country + "</p>"
  + "<p>Date: "     + eventDate + "</p>"
  + "<p>Time: "     + eventTime + "</p>");

  var ticketInfoDiv = $("<div>");
  ticketInfoDiv.addClass("card-action");

  var ticketInfoA = $("<a>").text("BUY TICKETS");
  ticketInfoA.attr("target", "_blank");
  ticketInfoA.attr("href", response.offers[0].url);
  ticketInfoDiv.append(ticketInfoA);

  $("#similarArtistEvents").append(eventInfoDiv);
  eventInfoDiv.append(eventInfoDiv2);
  eventInfoDiv2.append(eventInfoDiv3, ticketInfoDiv);
  eventInfoDiv3.append(eventInfoSpan);
}

function searchEventsInTown(artist, isTrue) {
   var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
   var icon = 'https://maps.google.com/mapfiles/kml/paddle/wht-stars-lv.png';
   if(isTrue){
     icon = 'https://maps.google.com/mapfiles/kml/paddle/purple-stars-lv.png'
   }
   $.ajax({
       url: queryURL,
       method: "GET"
   }).then(function(response) {
       for (var i = 0; i < response.length; i++){
         var venueLatitudeString = (response[i].venue.latitude);
         var venueLongitudeString = (response[i].venue.longitude);
         var venueLat = Number(venueLatitudeString);
         var venueLong = Number(venueLongitudeString);
         var eventLocation = new google.maps.LatLng(venueLat,venueLong)

         //Check to see if the location is within the given radius
         if(bounds.contains(eventLocation) === true){
           //Create a marker for each event on the map save the index and artist name for later use
           var eventMarker = new google.maps.Marker({
               position: {lat: venueLat, lng: venueLong},
               map: map,
               icon: icon,
               index: i,
               artist: artist
           //Add a click listener to each marker
           }).addListener('click',function () {
             listener(response, this);
           });
            markers.push(eventMarker);
         }
         similarArtistDiv(response[i],artist);
       }
   });
}
