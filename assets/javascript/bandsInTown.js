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
      //---------------------------------this specific part needs work vvv------------------------------------------------
      // Printing the entire object to console
      console.log(response);
      // Constructing HTML containing the artist information
      var artistName = $("<h1>").text(artist);
      var artistURL = $("<a>").attr("href", response.url).append(artistName);
      var upcomingEvents = $("<h2>").text(response.length + " upcoming events");
      var goToArtist = $("<a>").attr("href", response.url).text("See Tour Dates");
      // Empty the contents of the artist-div, append the new artist content
      $("#artist-div").empty();
      $("#artist-div").append(artistURL, upcomingEvents, goToArtist);
  });
}

function searchEventsInTown(artist, isTrue) {
   var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
   var icon = 'https://maps.google.com/mapfiles/kml/paddle/grn-diamond-lv.png';
   if(isTrue){
     icon = 'https://maps.google.com/mapfiles/kml/paddle/purple-diamond-lv.png'
   }
   $.ajax({
       url: queryURL,
       method: "GET"
   }).then(function(response) {
       console.log(response);
       for (var i = 0; i < response.length; i++){
         var venueLatitudeString = (response[i].venue.latitude);
         var venueLongitudeString = (response[i].venue.longitude);
         var datetime = (response[i].datetime);
         var datetimeSplit = datetime.split("T");
         //------------------------------------------------------------------------------------------------------
         //BELOW ARE THE USEFUL VARIABLES
         var venueName = (response[i].venue.name); //EVENT VENUE NAME
         var venueCity = (response[i].venue.city); //EVENT CITY
         var venueState = (response[i].venue.region); //EVENT STATE OR REGION
         var venueCountry = (response[i].venue.country); //EVENT COUNTRY

         var eventDate = datetimeSplit[0]; //EVENT DATE
         var eventTime = datetimeSplit[1]; //EVENT TIME

         var venueLatitude = Number(venueLatitudeString); //EVENT LATITUDE
         var venueLongitude = Number(venueLongitudeString); //EVENT LONGITUDE

         var eventTicket = (response[i].offers[0].url); //LINK TO PURCHASE TICKETS
         var eventTicketStatus = (response[i].offers[0].status); //EVENT TICKET AVAILABILITY
         //------------------------------------------------------------------------------------------------------
         var eventMarker = new google.maps.Marker({
             position: {lat: venueLatitude, lng: venueLongitude},
             map: map,
             icon: icon
         });
         markers.push(eventMarker); 
        //-----------------------------------------------------
        for (i = 0; i < markers.length; i++){
            var eventcontentString = 
            '<div>' +
            '<p>' + artist + '</p>' +
            '<p>' + eventDate + '</p>' +
            '<p>' + eventTime + '</p>' +
            '<p>' + venueName + '</p>' +
            '<p>' + venueCity + "," + " " + venueState + '</p>' +
            '<p>' + venueCountry + '</p>' +
            '</div>';    
        }
        //-----------------------------------------------------
        eventinfoWindow = new google.maps.InfoWindow({                    
        content: eventcontentString                                            
        });                   
                                
        for (var i = 0; i < markers.length; i++) { 
            var marker = markers[i];                                      
            google.maps.event.addListener(marker, 'click', function () {  
            eventinfoWindow.open(map, this);                                  
            });                                                           
        }                                                                  
         //------------------------------------------------------------------------------------------------------
         var eventInfo = $("<p>").text("#" + (i) + ":"
         + " " + "Artist: " + artist
         + " " + "Venue: " + venueName
         + " - " + "City: " + venueCity
         + " - " + "State/Region: "  + venueState
         + " - " + "Country: "  + venueCountry
         + " - " + "When: " + eventDate
         + " - " + "Time: " + eventTime
         + " - " + "Tickets: " + eventTicketStatus
         + " - " + "Purchase tickets: " + eventTicket
         );
         $("#upcoming-events-div").append(eventInfo);
       }
   });
   }
