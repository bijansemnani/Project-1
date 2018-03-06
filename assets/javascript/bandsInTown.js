// Querying the bandsintown artist info api to display pics of similar bands in carousel
function searchArtistInfo (artist) {
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var searchArtistPic = response.thumb_url;
        console.log(searchArtistPic);
        var carouselPic = $("<a class = 'carousel-item'><img src = '" + searchArtistPic + "'><a>");
        $(".carousel").append(carouselPic);
    });
}

function searchBandsInTown(artist) {
    //console.log(similarArtists);
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        var results = response;
        for (var i = 0; i < results.length; i++) {
            console.log(results[i].venue.name);
            console.log(results[i].venue.city);
            console.log(results[i].venue.region);
            console.log(results[i].venue.country);
            console.log(results[i].offers[0].url);
            console.log("/////////////////////////////");
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
       var artistURL = $("<a>").attr("href", response.url).append(artistName);
       var upcomingEvents = $("<h2>").text(response.length + " upcoming events");
       var goToArtist = $("<a>").attr("href", response.url).text("See Tour Dates");
      // Empty the contents of the artist-div, append the new artist content
      $("#artist-div").empty();
      $("#artist-div").append(artistURL, upcomingEvents);
  });
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
         var datetime = (response[i].datetime);
         var datetimeSplit = datetime.split("T");
         //--------------------------------Concert & Artist Information------------------------//
         //BELOW ARE THE USEFUL VARIABLES
         var venueName = (response[i].venue.name); //EVENT VENUE NAME
         var venueCity = (response[i].venue.city); //EVENT CITY
         var venueState = (response[i].venue.region); //EVENT STATE OR REGION
         var venueCountry = (response[i].venue.country); //EVENT COUNTRY

         var eventDate = datetimeSplit[0]; //EVENT DATE
         var eventTime = datetimeSplit[1]; //EVENT TIME

         var venueLat = Number(venueLatitudeString); //EVENT LATITUDE
         var venueLong = Number(venueLongitudeString); //EVENT LONGITUDE

         //Set the eventLocation as a google maps LatLong location
         var eventLocation = new google.maps.LatLng(venueLat,venueLong)

         var eventTicket = (response[i].offers[0].url); //LINK TO PURCHASE TICKETS
         var eventTicketStatus = (response[i].offers[0].status); //EVENT TICKET AVAILABILITY

         //--------------------------------Event Marker Creation-------------------------------//
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
             //Vars for the date and event times
             var datetime = (response[this.index].datetime);
             var datetimeSplit = datetime.split("T");
             var eventDate = datetimeSplit[0]; //EVENT DATE
             var eventTime = datetimeSplit[1];

           //Content to be displayed in the window when marker is clicked
           var markerWindow ="<ul>"+
           "<li>" + "Artist: "       + this.artist + "<li>" +
           "<li>" + "Venue: "        + response[this.index].venue.name    + "<li>" +
           "<li>" + "City: "         + response[this.index].venue.city    + "<li>" +
           "<li>" + "Region: "      + response[this.index].venue.region  + "<li>" +
           "<li>" + "Country: "      + response[this.index].venue.country + "<li>" +
           "<li>" + "When: "         + eventDate                          + "<li>" +
           "<li>" + "Time: "         + eventTime                          + "<li>" +
           "<li>" + "Tickets: "      +"<a target='_blank' href='"+ response[this.index].offers[0].url+"'>Get Tickets</a><li>"
                                     + "</ul>";

            //Create a new content window and set it to be the content saved for that specific marker
             eventinfoWindow = new google.maps.InfoWindow({
               content: markerWindow
             });
             //On a click open the content window for the specified marker
             eventinfoWindow.open(map, this);
           });
           eventinfoWindow.open(map, this);
         
            markers.push(eventMarker);
         }
         //------------------------------------------------------------------------------------------------------
         var eventInfoDiv = $("<div>");
         eventInfoDiv.addClass("col s12 m3");
         
         var eventInfoDiv2 = $("<div>");
         eventInfoDiv2.addClass("card blue-grey darken-1");
        
         var eventInfoDiv3 = $("<div>");
         eventInfoDiv3.addClass("card-content white-text");
         
         var eventInfoSpan = $("<span class = 'card-title'>" + artist + "</span>"
         + "<p>Venue: " + venueName + "</p>"
         + "<p>Location: " + venueCity + ", " + venueState + ", " + venueCountry + "</p>"
         + "<p>Date & Time: " + eventDate + ", " + eventTime + "</p>");

         var ticketInfoDiv = $("<div>");
         ticketInfoDiv.addClass("card-action");
         var ticketInfoA = $("<a>").text("BUY TICKETS");
         ticketInfoA.attr("target", "_blank");
         ticketInfoA.attr("href", eventTicket);
         ticketInfoDiv.append(ticketInfoA);
        
         
        //  $("<p>").text("#" + (i + 1) + ":"
        //   + "<span class = 'card-title'>INSERT BAND NAME</span>"
        //   + "<p>Venue: " + venueName + "</p>"
        //   + "<p>Location: " + venueCity + ", " + venueState + ", " + venueCountry + "</p>"
        //   + "<p>Date $ Time: " + eventDate + ", " + eventTime + "</p>"

        // var ticketInfo = $("div");
        // ticketInfo.addClass("card-action");
        // ticketInfo.attr("<a> href = " + eventTicket + "</a>");
        


        //  + "<p>" + "Venue: " + venueName
        //  + "<p>" + "City: " + venueCity
        //  + " - " + "State/Region: "  + venueState
        // //  + " - " + "Country: "  + venueCountry
        //  + "<p>" + "When: " + eventDate
        //  + " - " + "Time: " + eventTime
        //  + "<p>" + "Tickets: " + eventTicketStatus
        //  + "<p>" + "Purchase tickets: " + eventTicket
        //  );
        // $("#upcoming-events-div").append(eventInfo);
        $("#similarArtistEvents").append(eventInfoDiv);
        eventInfoDiv.append(eventInfoDiv2);
        eventInfoDiv2.append(eventInfoDiv3, ticketInfoDiv);
        eventInfoDiv3.append(eventInfoSpan);

        
        
       }
   });
}
